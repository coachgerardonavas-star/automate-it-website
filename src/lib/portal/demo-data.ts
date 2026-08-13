/**
 * Datos de demostración del portal.
 *
 * Existen para poder construir y revisar la interfaz antes de que haya
 * integraciones reales. Tres reglas los gobiernan:
 *
 * 1. Solo se sirven a organizaciones con `data_mode = 'demo'`. Nunca se mezclan
 *    con datos reales, porque el modo es propiedad de la organización y no de
 *    la consulta.
 * 2. La UI siempre avisa cuando muestra esto. El aviso sale del campo `mode`
 *    del envoltorio, no de una bandera suelta que alguien pueda olvidar.
 * 3. Son deterministas: ningún `Math.random()`. Dos cargas seguidas muestran lo
 *    mismo, que es lo que hace revisable una pantalla.
 *
 * Los textos son claves de traducción, no frases: se resuelven en `copy.ts`
 * para que la demo funcione en español y en inglés.
 */

import type {
  ActivityItem, Appointment, AttentionItem, AutomationSummary, BusinessMetric,
  Conversation, Customer, Insight, IntegrationStatus, Kpi, Lead, OverviewData,
  PortalDocument, SeriesPoint, WorkHandled,
} from "./types";
import { hoursSaved } from "./hours-saved";

/** Desplazamiento fijo respecto de la hora del request: el offset es estable, el instante no. */
const ago = (now: Date, min: number) => new Date(now.getTime() - min * 60_000).toISOString();
const ahead = (now: Date, h: number) => new Date(now.getTime() + h * 3_600_000).toISOString();

// Va antes que KPIS a propósito: la tarjeta de horas ahorradas se calcula a
// partir de este desglose, así que tiene que existir primero.
const WORK: WorkHandled = {
  total: 287,
  breakdown: [
    { key: "conversations", count: 143 },
    { key: "crmUpdates", count: 47 },
    { key: "followUps", count: 39 },
    { key: "appointmentActions", count: 26 },
    { key: "customerNotifications", count: 18 },
    { key: "otherTasks", count: 14 },
  ],
};

/**
 * Las cuatro tarjetas de arriba.
 *
 * Cada una cuelga de una de las tres formas en que una automatización hace
 * crecer un negocio de servicios: gana trabajos que antes perdía, pierde menos
 * de los que ya tenía, o hace lo mismo con menos horas. Lo que no cuelga de
 * ninguna de las tres no va en la pantalla del cliente.
 *
 * Quedaron afuera a propósito "prospectos nuevos" y "resuelto automáticamente":
 * miden el volumen del robot, no el resultado del negocio. Un conteo de
 * mensajes enviados prueba que el sistema corrió, no que el cliente ganó algo,
 * y entrena al dueño a ignorar el tablero.
 */
const KPIS: Kpi[] = [
  // La métrica que mejor defiende la factura. Se guarda en segundos y la
  // tarjeta elige la unidad. `betterWhen: "down"` es lo que hace que una caída
  // se pinte de verde.
  { key: "responseTime", value: 42, delta: -71, format: "duration", betterWhen: "down" },

  // "Estas 23 consultas antes se perdían mientras dormías." Es la métrica más
  // fácil de entender del tablero, porque el "antes" era literalmente cero.
  { key: "afterHours", value: 23, delta: 28, format: "count" },

  // El resultado que el dueño reconoce como plata. Estimado a partir del
  // ticket promedio, y la tarjeta lo declara.
  { key: "revenueAttributed", value: 14_400, delta: 22, format: "money", estimated: true },

  // `hoursSaved` no se escribe a mano: sale de la fórmula aplicada al mismo
  // desglose de trabajo que se muestra abajo en la pantalla. Así el número de
  // la tarjeta y el del bloque "Trabajo resuelto automáticamente" no pueden
  // contradecirse — es imposible que uno cambie sin el otro.
  {
    key: "hoursSaved",
    value: hoursSaved(WORK.breakdown) ?? 0,
    delta: 16,
    format: "hours",
  },
];

// Curva escrita a mano, no generada: una serie aleatoria distinta en cada build
// hace imposible notar si un cambio en el gráfico rompió algo.
const CURVE = [
  8, 11, 9, 14, 12, 17, 15, 13, 18, 16, 21, 19, 24, 22, 20, 26, 23, 28, 25, 30,
  27, 24, 29, 26, 31, 28, 33, 30, 27, 32, 34,
];

const AUTOMATIONS: AutomationSummary[] = [
  { id: "d-wa", name: "WhatsApp Assistant", icon: "message-circle", state: "running", volume: 143, unitLabel: "conversations", lastActivityAt: null },
  { id: "d-fu", name: "Lead Follow-up", icon: "mail", state: "running", volume: 26, unitLabel: "followUps", lastActivityAt: null },
  { id: "d-bk", name: "Appointment Booking", icon: "calendar-check", state: "running", volume: 18, unitLabel: "appointments", lastActivityAt: null },
  { id: "d-crm", name: "CRM Sync", icon: "database", state: "running", volume: 47, unitLabel: "records", lastActivityAt: null },
];

const INTEGRATIONS: IntegrationStatus[] = [
  { id: "hubspot", name: "HubSpot", state: "connected" },
  { id: "gcal", name: "Google Calendar", state: "connected" },
  { id: "whatsapp", name: "WhatsApp", state: "connected" },
  { id: "gdrive", name: "Google Drive", state: "connected" },
  { id: "quickbooks", name: "QuickBooks", state: "connected" },
];

// Comparadas contra el propio negocio, nunca contra un "promedio de industria":
// ese benchmark no existe verificado, así que no se afirma (handoff §22).
//
// `baseline` es el "antes" capturado en el onboarding. Es lo que convierte un
// número suelto en un argumento: "38%" no dice nada; "38%, antes 19%" sí. La
// ventana para capturarlo se cierra apenas el sistema entra en funcionamiento,
// por eso el onboarding lo pregunta y la tabla `baselines` lo guarda con su
// origen declarado.
const METRICS: BusinessMetric[] = [
  {
    key: "showRate", value: "92%", delta: 14,
    series: [78, 80, 79, 83, 85, 88, 90, 92],
    baseline: { value: "78%", source: "baselineMeasured" },
  },
  {
    key: "leadToAppointment", value: "38%", delta: 12,
    series: [22, 24, 27, 29, 31, 34, 36, 38],
    baseline: { value: "19%", source: "baselineClient" },
  },
  // La única del bloque donde subir es una mala noticia. Debe tender a cero, y
  // cuando sube es una alarma de verdad, no un adorno.
  {
    key: "unansweredLeads", value: "2", delta: -60,
    series: [14, 12, 11, 8, 7, 5, 4, 2],
    betterWhen: "down",
    baseline: { value: "14", source: "baselineMeasured" },
  },
];

const INSIGHTS: Insight[] = [
  { id: "d-i1", body: "insightResponseTime", evidence: "evidenceResponseTime" },
  { id: "d-i2", body: "insightWhatsappWindow", evidence: "evidenceWhatsappWindow" },
  { id: "d-i3", body: "insightUnattended", evidence: "evidenceUnattended" },
];

export function demoOverview(now: Date): OverviewData {
  const activity: SeriesPoint[] = CURVE.map((value, i) => ({
    date: new Date(now.getTime() - (CURVE.length - 1 - i) * 86_400_000)
      .toISOString()
      .slice(0, 10),
    value,
  }));

  return {
    kpis: KPIS,
    activity,
    automations: AUTOMATIONS.map((a, i) => ({ ...a, lastActivityAt: ago(now, 4 + i * 17) })),
    attention: [
      { id: "d-l1", name: "María G.", temperature: "hot", reason: "attentionEstimate", at: ago(now, 8) },
      { id: "d-l2", name: "José R.", temperature: "warm", reason: "attentionFinancing", at: ago(now, 60) },
      { id: "d-l3", name: "Ana P.", temperature: "hot", reason: "attentionBooking", at: ago(now, 120) },
    ] satisfies AttentionItem[],
    recentActivity: [
      { id: "d-a1", at: ago(now, 12), summary: "activityNewLead", channel: "whatsapp", status: "new" },
      { id: "d-a2", at: ago(now, 23), summary: "activityFollowUp", channel: "email", status: "sent" },
      { id: "d-a3", at: ago(now, 58), summary: "activityCallAnswered", channel: "phone", status: "completed" },
      { id: "d-a4", at: ago(now, 97), summary: "activityAppointment", channel: "calendar", status: "confirmed" },
      { id: "d-a5", at: ago(now, 131), summary: "activityCrmUpdate", channel: "crm", status: "updated" },
    ] satisfies ActivityItem[],
    workHandled: WORK,
    integrations: INTEGRATIONS,
    businessMetrics: METRICS,
    insights: INSIGHTS,
  };
}

export function demoLeads(now: Date): Lead[] {
  return [
    { id: "d-l1", name: "María G.", temperature: "hot", source: "WhatsApp", interest: "interestBathroom", summary: "summaryEstimate", nextAction: "actionCall", owner: "Carlos", status: "qualified", crmUrl: null, lastActivityAt: ago(now, 8), createdAt: ago(now, 45) },
    { id: "d-l2", name: "José R.", temperature: "warm", source: "Google", interest: "interestWaterHeater", summary: "summaryFinancing", nextAction: "actionQuote", owner: "Carlos", status: "qualified", crmUrl: null, lastActivityAt: ago(now, 60), createdAt: ago(now, 320) },
    { id: "d-l3", name: "Ana P.", temperature: "hot", source: "WhatsApp", interest: "interestLeak", summary: "summaryBooking", nextAction: "actionBook", owner: null, status: "new", crmUrl: null, lastActivityAt: ago(now, 120), createdAt: ago(now, 140) },
    { id: "d-l4", name: "David S.", temperature: "warm", source: "Phone", interest: "interestInspection", summary: "summaryServiceArea", nextAction: "actionCall", owner: "Carlos", status: "contacted", crmUrl: null, lastActivityAt: ago(now, 260), createdAt: ago(now, 1400) },
    { id: "d-l5", name: "Linda O.", temperature: "cold", source: "Facebook", interest: "interestRemodel", summary: "summaryBrowsing", nextAction: "actionNurture", owner: null, status: "unqualified", crmUrl: null, lastActivityAt: ago(now, 4300), createdAt: ago(now, 8600) },
  ];
}

export function demoConversations(now: Date): Conversation[] {
  return [
    { id: "d-c1", contactName: "María G.", channel: "whatsapp", lastMessage: "msgWednesday", status: "waiting_business", durationSeconds: null, summary: null, lastMessageAt: ago(now, 8) },
    { id: "d-c2", contactName: "David S.", channel: "phone", lastMessage: "msgCallCompleted", status: "completed", durationSeconds: 222, summary: "summaryServiceArea", lastMessageAt: ago(now, 58) },
    { id: "d-c3", contactName: "José R.", channel: "whatsapp", lastMessage: "msgFinancing", status: "handled", durationSeconds: null, summary: null, lastMessageAt: ago(now, 60) },
  ];
}

export function demoAppointments(now: Date): Appointment[] {
  return [
    { id: "d-ap1", title: "apptEstimate", contactName: "María G.", state: "confirmed", createdByAutomation: true, startsAt: ahead(now, 20) },
    { id: "d-ap2", title: "apptRepair", contactName: "Ana P.", state: "scheduled", createdByAutomation: true, startsAt: ahead(now, 28) },
    { id: "d-ap3", title: "apptInspection", contactName: "David S.", state: "scheduled", createdByAutomation: false, startsAt: ahead(now, 52) },
    { id: "d-ap4", title: "apptRemodel", contactName: "Linda O.", state: "cancelled", createdByAutomation: true, startsAt: ahead(now, -30) },
  ];
}

export function demoCustomers(now: Date): Customer[] {
  return [
    { id: "d-cu1", name: "Robert K.", service: "serviceMaintenance", status: "active", notes: null, lastInteractionAt: ago(now, 2880), nextAppointmentAt: ahead(now, 144) },
    { id: "d-cu2", name: "Sandra R.", service: "serviceRepair", status: "active", notes: null, lastInteractionAt: ago(now, 10080), nextAppointmentAt: null },
    { id: "d-cu3", name: "Miguel T.", service: "serviceInstall", status: "inactive", notes: null, lastInteractionAt: ago(now, 86400), nextAppointmentAt: null },
  ];
}

export function demoDocuments(now: Date): PortalDocument[] {
  return [
    { id: "d-d1", title: "docProposal", category: "proposal", url: "#", createdAt: ago(now, 86400) },
    { id: "d-d2", title: "docAgreement", category: "agreement", url: "#", createdAt: ago(now, 80000) },
    { id: "d-d3", title: "docOnboarding", category: "onboarding", url: "#", createdAt: ago(now, 74000) },
  ];
}
