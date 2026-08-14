/**
 * Copy del portal, español e inglés.
 *
 * Va en su propio archivo y no dentro de `src/i18n/translations.ts` por dos
 * razones: ese archivo es la fuente de verdad del sitio público y ya pesa 1300
 * líneas, y el portal tiene un ciclo de cambio distinto. Misma convención de
 * siempre: nada de texto incrustado en los componentes, y ES y EN se editan
 * juntos.
 */

import type { Lang } from "../../i18n/translations";

export type PortalLang = Lang;

const es = {
  brand: "Automate IT",
  tagline: "Tu negocio, mejor gestionado.",

  login: {
    welcome: "Bienvenido de vuelta.",
    email: "Correo",
    password: "Contraseña",
    submit: "Entrar",
    forgot: "¿Olvidaste tu contraseña?",
    error: "Correo o contraseña incorrectos.",
    unconfigured:
      "El portal todavía no está conectado a su base de datos. Si eres de Automate IT, falta configurar SUPABASE_URL y SUPABASE_ANON_KEY.",
    backToSite: "Volver al sitio",
    resetOk: "Tu contraseña quedó cambiada. Entra con la nueva.",
  },

  reset: {
    // Modo 1: pedir el correo
    requestTitle: "Recuperar tu contraseña",
    requestIntro:
      "Escribe el correo con el que entras al portal y te mandamos un enlace para elegir una contraseña nueva.",
    email: "Correo",
    requestSubmit: "Enviarme el enlace",
    // Mismo mensaje exista o no la cuenta: no se confirma quién es cliente.
    requestDone:
      "Si ese correo tiene una cuenta, ya va en camino un enlace para cambiar la contraseña. Revisa también la carpeta de spam.",

    // Modo 2: elegir la contraseña nueva
    updateTitle: "Elige tu contraseña nueva",
    password: "Contraseña nueva",
    passwordConfirm: "Repite la contraseña",
    updateSubmit: "Guardar contraseña",
    hint: "Mínimo 8 caracteres.",

    mismatch: "Las dos contraseñas no coinciden.",
    weak: "Esa contraseña no sirve: usa al menos 8 caracteres y que no sea la anterior.",
    expired:
      "Este enlace ya caducó o se usó. Pide uno nuevo y ábrelo dentro de la hora siguiente.",
    failed: "No pudimos cambiar la contraseña. Intenta de nuevo en un momento.",
    // El enlace del correo trae el token en el fragmento de la URL. Si no
    // viene, la persona entró a la ruta a mano.
    noToken:
      "Abre esta pantalla desde el enlace que te llegó por correo. Si el enlace ya no sirve, pide uno nuevo aquí abajo.",
    backToLogin: "Volver a entrar",
  },

  nav: {
    overview: "Resumen",
    leads: "Prospectos",
    conversations: "Conversaciones",
    appointments: "Citas",
    customers: "Clientes",
    automations: "Automatizaciones",
    activity: "Actividad",
    reports: "Reportes",
    insights: "Hallazgos",
    files: "Archivos",
    settings: "Ajustes",
    admin: "Centro de administración",
    signOut: "Cerrar sesión",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },

  greeting: {
    morning: "Buenos días",
    afternoon: "Buenas tardes",
    evening: "Buenas noches",
    subtitle: "Esto es lo que está pasando en tu negocio.",
  },

  range: {
    today: "Hoy",
    "7d": "Últimos 7 días",
    "30d": "Últimos 30 días",
    month: "Este mes",
    label: "Período",
  },

  demoBanner: {
    title: "Datos de demostración",
    body: "Esta cuenta todavía no está conectada a tus herramientas. Los números de abajo son de ejemplo y no describen tu negocio.",
  },

  kpi: {
    // "Tiempo de respuesta" a secas invita a preguntar "¿de quién, a qué?".
    // Nombrar las dos puntas hace que el número se explique solo.
    responseTime: "Tiempo hasta la primera respuesta",
    afterHours: "Consultas atendidas fuera de horario",
    revenueAttributed: "Trabajo cerrado por el sistema",
    hoursSaved: "Horas que recuperaste",
    appointmentsBooked: "Citas agendadas",
    vsPrevious: "vs período anterior",
    noComparison: "Sin período anterior para comparar",
    estimated: "Estimado con tu ticket promedio",
  },

  sections: {
    customerActivity: "Actividad de clientes",
    yourAutomations: "Tus automatizaciones",
    needsAttention: "Necesita tu atención",
    recentActivity: "Actividad reciente",
    businessInsights: "Cómo va tu negocio",
    quickActions: "Acciones rápidas",
    integrations: "Herramientas conectadas",
    workHandled: "Trabajo resuelto automáticamente",
    workHandledSuffix: "tareas resueltas sin que tuvieras que hacerlas",
    viewAll: "Ver todo",
    viewReport: "Ver reporte",
    manage: "Gestionar",
  },

  automationState: {
    running: "Funcionando con normalidad",
    needs_attention: "Necesita atención",
    unavailable: "No disponible por ahora",
  },

  integrationState: {
    connected: "Conectado",
    degraded: "Con demoras",
    disconnected: "Desconectado",
  },

  temperature: { hot: "Caliente", warm: "Tibio", cold: "Frío", unclassified: "Sin clasificar" },

  units: {
    conversations: "Conversaciones",
    followUps: "Seguimientos",
    appointments: "Citas",
    records: "Registros actualizados",
    crmUpdates: "Actualizaciones al CRM",
    appointmentActions: "Acciones sobre citas",
    customerNotifications: "Avisos a clientes",
    otherTasks: "Otras tareas",
  },

  metrics: {
    showRate: "Citas a las que sí vinieron",
    leadToAppointment: "De prospecto a cita",
    unansweredLeads: "Consultas que nadie contestó",
    vsLastMonth: "vs mes anterior",
    // El "antes". Se muestra junto al valor actual porque un porcentaje sin
    // punto de partida no prueba ninguna mejora.
    baselineLabel: "Antes",
    baselineMeasured: "medido",
    baselineClient: "declarado por vos",
    noBaseline: "Sin medición previa para comparar",
  },

  quickActions: {
    createFollowUp: "Crear seguimiento",
    sendMessage: "Enviar mensaje",
    addLead: "Agregar prospecto",
    scheduleAppointment: "Agendar cita",
    uploadDocument: "Subir documento",
    soon: "Disponible pronto",
  },

  support: {
    title: "¿Necesitas ayuda?",
    body: "Estamos para lo que haga falta.",
    cta: "Escribir a soporte",
    managerLabel: "Tu contacto en Automate IT",
    message: "Enviar mensaje",
  },

  leads: {
    title: "Prospectos",
    question: "¿Quién necesita tu atención?",
    name: "Nombre",
    status: "Estado",
    source: "Origen",
    interest: "Interés",
    lastActivity: "Última actividad",
    nextStep: "Siguiente paso",
    owner: "Responsable",
    openInCrm: "Abrir en el CRM",
    all: "Todos",
  },

  demo: {
    interestBathroom: "Remodelación de baño",
    interestWaterHeater: "Cambio de calentador",
    interestLeak: "Fuga de agua",
    interestInspection: "Inspección",
    interestRemodel: "Remodelación",
    summaryEstimate: "Preguntó disponibilidad y pidió un presupuesto para esta semana.",
    summaryFinancing: "Preguntó si hay opciones de pago en cuotas.",
    summaryBooking: "Quiere agendar una visita lo antes posible.",
    summaryServiceArea: "Preguntó hasta dónde llegan y pidió presupuesto.",
    summaryBrowsing: "Pidió información general, sin fecha definida.",
    actionCall: "Llamar",
    actionQuote: "Enviar presupuesto",
    actionBook: "Agendar visita",
    actionNurture: "Dejar en seguimiento",
    attentionEstimate: "Pidió un presupuesto",
    attentionFinancing: "Preguntó por formas de pago",
    attentionBooking: "Quiere agendar una cita",
    activityNewLead: "Prospecto nuevo por WhatsApp",
    activityFollowUp: "Seguimiento enviado",
    activityCallAnswered: "Llamada contestada",
    activityAppointment: "Cita agendada",
    activityCrmUpdate: "Registro actualizado en el CRM",
    msgWednesday: "«¿Puede pasar alguien el miércoles?»",
    msgCallCompleted: "Llamada completada",
    msgFinancing: "«¿Tienen financiamiento?»",
    apptEstimate: "Visita para presupuesto",
    apptRepair: "Reparación",
    apptInspection: "Inspección",
    apptRemodel: "Remodelación",
    serviceMaintenance: "Mantenimiento",
    serviceRepair: "Reparación",
    serviceInstall: "Instalación",
    docProposal: "Propuesta",
    docAgreement: "Acuerdo firmado",
    docOnboarding: "Documento de arranque",
    insightResponseTime: "Tu tiempo de respuesta bajó 42% respecto del mes pasado.",
    evidenceResponseTime: "Promedio de 18 s en 143 conversaciones, contra 31 s el mes anterior.",
    insightWhatsappWindow: "La mayoría de tus prospectos escribe por WhatsApp entre las 4 y las 7 de la tarde.",
    evidenceWhatsappWindow: "61 de 143 conversaciones del período cayeron en esa franja.",
    insightUnattended: "6 prospectos calientes todavía no recibieron respuesta de una persona.",
    evidenceUnattended: "Marcados como calientes hace más de 24 h, sin actividad humana registrada.",
  },

  empty: {
    leads: "Todavía no hay prospectos",
    leadsBody: "Aparecerán aquí en cuanto tus canales conectados reciban una consulta.",
    insights: "Todavía no hay hallazgos",
    insightsBody: "Necesitamos más actividad antes de poder señalar algo útil. Preferimos no decir nada a decir algo sin fundamento.",
    appointments: "No hubo citas en este período",
    appointmentsBody: "Las citas creadas por tus automatizaciones aparecerán aquí.",
    conversations: "Todavía no hay conversaciones",
    conversationsBody: "Aquí verás lo que preguntan tus clientes, por cada canal conectado.",
    customers: "Todavía no hay clientes registrados",
    customersBody: "Un prospecto pasa a esta lista cuando se convierte en cliente.",
    activity: "Sin actividad en este período",
    activityBody: "Aquí se registra lo que hace el sistema por ti.",
    documents: "Todavía no hay documentos",
    documentsBody: "Aquí vivirán tus propuestas, acuerdos y documentación del proyecto.",
    automations: "Todavía no hay automatizaciones instaladas",
    automationsBody: "Cuando Automate IT instale la primera, la verás aquí con su estado.",
    generic: "Todavía no hay datos",
  },

  error: {
    partial: "Algunos datos no están disponibles en este momento. El resto de tu sistema sigue funcionando con normalidad.",
    sourceUnavailable: "Esta información no está disponible por ahora.",
  },

  pages: {
    conversations: { title: "Conversaciones", question: "¿Qué están preguntando tus clientes?" },
    appointments: {
      title: "Citas",
      question: "¿Qué tienes próximo?",
      bookedByAutomation: "Agendada por el sistema",
    },
    customers: { title: "Clientes", question: "¿Cómo está tu base de clientes?" },
    automations: { title: "Automatizaciones", question: "¿Está funcionando tu sistema?" },
    activity: { title: "Actividad", question: "¿Qué hizo Automate IT por ti?" },
    reports: { title: "Reportes", question: "¿Cómo vas evolucionando?" },
    insights: { title: "Hallazgos", question: "¿Qué deberías notar?" },
    files: { title: "Archivos y documentos", question: "¿Dónde están tus documentos?" },
    settings: { title: "Ajustes", question: "Tu cuenta y tus herramientas" },
  },

  settings: {
    account: "Cuenta",
    name: "Nombre",
    email: "Correo",
    organization: "Negocio",
    language: "Idioma",
    role: "Rol",
    roleClient: "Cliente",
    roleAdmin: "Automate IT",
    dataMode: "Origen de los datos",
    dataModeDemo: "Demostración",
    dataModeLive: "Datos reales",
  },

  admin: {
    title: "Centro de administración",
    question: "¿Cuál de tus clientes necesita que intervengas?",
    client: "Cliente",
    status: "Estado",
    automations: "Automatizaciones",
    alerts: "Alertas",
    lastActivity: "Última actividad",
    healthy: "Todo en orden",
    needs_attention: "Necesita atención",
    critical: "Algo dejó de funcionar",
    noAlerts: "Sin alertas abiertas",
    openClient: "Abrir cliente",
    technicalDetail: "Detalle técnico",
    provider: "Proveedor",
    lastSuccess: "Último evento correcto",
    lastFailure: "Último fallo",
    errorCount: "Errores",
    retryState: "Reintentos",
    backToList: "Volver a la lista",
    summaryHealthy: "en orden",
    summaryAttention: "necesitan atención",
    summaryCritical: "con algo roto",

    // --- Comercial. Espejo de Stripe, nunca la fuente. ---
    plan: "Plan",
    mrr: "Por mes",
    renewal: "Renueva",
    renewsInDays: "en {n} días",
    renewsToday: "hoy",
    renewalOverdue: "vencido hace {n} días",
    cancelling: "No renueva",
    noContract: "Sin contrato cargado",
    syncedAgo: "Stripe sincronizado {t}",
    syncNever: "Nunca sincronizado con Stripe",
    syncStale: "Dato viejo: sin sincronizar hace más de 24 h",
    syncFailed: "Falló la última sincronización con Stripe",
    mrrTotal: "ingreso mensual",
    renewingSoon: "renuevan en 30 días",

    // --- Salud e interés ---
    failures7d: "Fallos (7 d)",
    lastLogin: "Último ingreso",
    neverEntered: "Nunca entró",
    sawReports: "Vio sus reportes",
    notSeenReports: "No abrió reportes en 30 días",
    allHealthy: "Todos tus clientes están en orden. No hay nada que revisar ahora mismo.",
    systemsTitle: "Sistemas de Automate IT",
    systemsSubtitle: "Tu propia infraestructura — no la de tus clientes.",
    systemsOk: "Operativo",
    systemsDown: "Caído",
    systemsUnknown: "Sin dato",
    systemsTier0: "Tier 0",
    systemsSince: "desde",
    systemsUnavailable:
      "El estado de los sistemas no está disponible: falta el binding de KV «STATE» en el proyecto de Cloudflare Pages.",
  },

  time: {
    now: "hace un momento",
    minute: "hace {n} min",
    hour: "hace {n} h",
    day: "hace {n} d",
    inHours: "en {n} h",
    inDays: "en {n} d",
  },
} as const;

const en: typeof es = {
  brand: "Automate IT",
  tagline: "Your business, upgraded.",

  login: {
    welcome: "Welcome back.",
    email: "Email",
    password: "Password",
    submit: "Sign in",
    forgot: "Forgot your password?",
    error: "Incorrect email or password.",
    unconfigured:
      "The portal is not connected to its database yet. If you're from Automate IT, SUPABASE_URL and SUPABASE_ANON_KEY still need to be set.",
    backToSite: "Back to the site",
    resetOk: "Your password has been changed. Sign in with the new one.",
  },

  reset: {
    requestTitle: "Reset your password",
    requestIntro:
      "Enter the email you use for the portal and we'll send you a link to choose a new password.",
    email: "Email",
    requestSubmit: "Send me the link",
    requestDone:
      "If that email has an account, a link to change the password is on its way. Check your spam folder too.",

    updateTitle: "Choose your new password",
    password: "New password",
    passwordConfirm: "Repeat the password",
    updateSubmit: "Save password",
    hint: "At least 8 characters.",

    mismatch: "The two passwords don't match.",
    weak: "That password won't work: use at least 8 characters, and not your previous one.",
    expired:
      "This link has expired or was already used. Request a new one and open it within the hour.",
    failed: "We couldn't change the password. Please try again in a moment.",
    noToken:
      "Open this screen from the link we emailed you. If the link no longer works, request a new one below.",
    backToLogin: "Back to sign in",
  },

  nav: {
    overview: "Overview",
    leads: "Leads",
    conversations: "Conversations",
    appointments: "Appointments",
    customers: "Customers",
    automations: "Automations",
    activity: "Activity",
    reports: "Reports",
    insights: "Insights",
    files: "Files",
    settings: "Settings",
    admin: "Admin Center",
    signOut: "Sign out",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  greeting: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    subtitle: "Here's what's happening in your business.",
  },

  range: {
    today: "Today",
    "7d": "Last 7 days",
    "30d": "Last 30 days",
    month: "This month",
    label: "Period",
  },

  demoBanner: {
    title: "Demo data",
    body: "This account isn't connected to your tools yet. The numbers below are examples and don't describe your business.",
  },

  kpi: {
    responseTime: "Time to first reply",
    afterHours: "Enquiries answered after hours",
    revenueAttributed: "Work closed by the system",
    hoursSaved: "Hours you got back",
    appointmentsBooked: "Appointments booked",
    estimated: "Estimated from your average ticket",
    vsPrevious: "vs previous period",
    noComparison: "No previous period to compare against",
  },

  sections: {
    customerActivity: "Customer activity",
    yourAutomations: "Your automations",
    needsAttention: "Needs your attention",
    recentActivity: "Recent activity",
    businessInsights: "How your business is doing",
    quickActions: "Quick actions",
    integrations: "Connected tools",
    workHandled: "Work handled automatically",
    workHandledSuffix: "tasks handled without you having to do them",
    viewAll: "View all",
    viewReport: "View report",
    manage: "Manage",
  },

  automationState: {
    running: "Running normally",
    needs_attention: "Needs attention",
    unavailable: "Temporarily unavailable",
  },

  integrationState: {
    connected: "Connected",
    degraded: "Delayed",
    disconnected: "Disconnected",
  },

  temperature: { hot: "Hot", warm: "Warm", cold: "Cold", unclassified: "Unclassified" },

  units: {
    conversations: "Conversations",
    followUps: "Follow-ups",
    appointments: "Appointments",
    records: "Records updated",
    crmUpdates: "CRM updates",
    appointmentActions: "Appointment actions",
    customerNotifications: "Customer notifications",
    otherTasks: "Other tasks",
  },

  metrics: {
    showRate: "Appointments they showed up to",
    leadToAppointment: "Lead to appointment",
    unansweredLeads: "Enquiries nobody answered",
    vsLastMonth: "vs last month",
    baselineLabel: "Before",
    baselineMeasured: "measured",
    baselineClient: "as you reported it",
    noBaseline: "No prior measurement to compare against",
  },

  quickActions: {
    createFollowUp: "Create follow-up",
    sendMessage: "Send message",
    addLead: "Add lead",
    scheduleAppointment: "Schedule appointment",
    uploadDocument: "Upload document",
    soon: "Coming soon",
  },

  support: {
    title: "Need help?",
    body: "We're here for you.",
    cta: "Contact support",
    managerLabel: "Your contact at Automate IT",
    message: "Send a message",
  },

  leads: {
    title: "Leads",
    question: "Who needs your attention?",
    name: "Name",
    status: "Status",
    source: "Source",
    interest: "Interest",
    lastActivity: "Last activity",
    nextStep: "Next step",
    owner: "Owner",
    openInCrm: "Open in CRM",
    all: "All",
  },

  demo: {
    interestBathroom: "Bathroom remodel",
    interestWaterHeater: "Water heater replacement",
    interestLeak: "Water leak",
    interestInspection: "Inspection",
    interestRemodel: "Remodel",
    summaryEstimate: "Asked about availability and requested an estimate this week.",
    summaryFinancing: "Asked whether there are installment options.",
    summaryBooking: "Wants to book a visit as soon as possible.",
    summaryServiceArea: "Asked about the service area and requested an estimate.",
    summaryBrowsing: "Asked for general information, no date set.",
    actionCall: "Call",
    actionQuote: "Send estimate",
    actionBook: "Book a visit",
    actionNurture: "Keep in follow-up",
    attentionEstimate: "Requested an estimate",
    attentionFinancing: "Asked about payment options",
    attentionBooking: "Wants to book an appointment",
    activityNewLead: "New lead from WhatsApp",
    activityFollowUp: "Follow-up sent",
    activityCallAnswered: "Incoming call answered",
    activityAppointment: "Appointment booked",
    activityCrmUpdate: "CRM record updated",
    msgWednesday: "“Can someone come Wednesday?”",
    msgCallCompleted: "Call completed",
    msgFinancing: "“Do you offer financing?”",
    apptEstimate: "Estimate visit",
    apptRepair: "Repair",
    apptInspection: "Inspection",
    apptRemodel: "Remodel",
    serviceMaintenance: "Maintenance",
    serviceRepair: "Repair",
    serviceInstall: "Installation",
    docProposal: "Proposal",
    docAgreement: "Signed agreement",
    docOnboarding: "Onboarding document",
    insightResponseTime: "Your response time dropped 42% compared with last month.",
    evidenceResponseTime: "18 s average across 143 conversations, against 31 s the previous month.",
    insightWhatsappWindow: "Most of your leads write on WhatsApp between 4 and 7 PM.",
    evidenceWhatsappWindow: "61 of the period's 143 conversations landed in that window.",
    insightUnattended: "6 hot leads haven't received a reply from a person yet.",
    evidenceUnattended: "Marked hot more than 24 h ago, with no human activity recorded.",
  },

  empty: {
    leads: "No leads yet",
    leadsBody: "They'll show up here as soon as your connected channels receive an inquiry.",
    insights: "No insights yet",
    insightsBody: "We need more activity before we can point at something useful. We'd rather say nothing than say something unfounded.",
    appointments: "No appointments in this period",
    appointmentsBody: "Appointments created by your automations will appear here.",
    conversations: "No conversations yet",
    conversationsBody: "Here you'll see what your customers are asking, across every connected channel.",
    customers: "No customers recorded yet",
    customersBody: "A lead moves to this list once they become a customer.",
    activity: "No activity in this period",
    activityBody: "This is where the work the system does for you gets recorded.",
    documents: "No documents yet",
    documentsBody: "Your proposals, agreements and project documentation will live here.",
    automations: "No automations installed yet",
    automationsBody: "Once Automate IT installs the first one, you'll see it here with its status.",
    generic: "No data yet",
  },

  error: {
    partial: "Some data isn't available right now. The rest of your system is running normally.",
    sourceUnavailable: "This information isn't available right now.",
  },

  pages: {
    conversations: { title: "Conversations", question: "What are your customers asking?" },
    appointments: {
      title: "Appointments",
      question: "What's coming up?",
      bookedByAutomation: "Booked by the system",
    },
    customers: { title: "Customers", question: "How is your customer base doing?" },
    automations: { title: "Automations", question: "Is your system working?" },
    activity: { title: "Activity", question: "What did Automate IT do for you?" },
    reports: { title: "Reports", question: "How are you trending?" },
    insights: { title: "Insights", question: "What should you notice?" },
    files: { title: "Files & docs", question: "Where are your documents?" },
    settings: { title: "Settings", question: "Your account and your tools" },
  },

  settings: {
    account: "Account",
    name: "Name",
    email: "Email",
    organization: "Business",
    language: "Language",
    role: "Role",
    roleClient: "Client",
    roleAdmin: "Automate IT",
    dataMode: "Data source",
    dataModeDemo: "Demo",
    dataModeLive: "Live data",
  },

  admin: {
    title: "Admin Center",
    question: "Which of your clients needs you to step in?",
    client: "Client",
    status: "Status",
    automations: "Automations",
    alerts: "Alerts",
    lastActivity: "Last activity",
    healthy: "Everything healthy",
    needs_attention: "Needs attention",
    critical: "Something is broken",
    noAlerts: "No open alerts",
    openClient: "Open client",
    technicalDetail: "Technical detail",
    provider: "Provider",
    lastSuccess: "Last successful event",
    lastFailure: "Last failure",
    errorCount: "Errors",
    retryState: "Retries",
    backToList: "Back to the list",
    plan: "Plan",
    mrr: "Per month",
    renewal: "Renews",
    renewsInDays: "in {n} days",
    renewsToday: "today",
    renewalOverdue: "overdue by {n} days",
    cancelling: "Not renewing",
    noContract: "No contract on file",
    syncedAgo: "Stripe synced {t}",
    syncNever: "Never synced with Stripe",
    syncStale: "Stale: not synced in over 24 h",
    syncFailed: "Last Stripe sync failed",
    mrrTotal: "monthly revenue",
    renewingSoon: "renew within 30 days",
    failures7d: "Failures (7 d)",
    lastLogin: "Last sign-in",
    neverEntered: "Never signed in",
    sawReports: "Viewed their reports",
    notSeenReports: "Hasn't opened reports in 30 days",

    summaryHealthy: "healthy",
    summaryAttention: "need attention",
    summaryCritical: "broken",
    allHealthy: "All your clients are healthy. There's nothing to review right now.",
    systemsTitle: "Automate IT systems",
    systemsSubtitle: "Your own infrastructure — not your clients'.",
    systemsOk: "Operational",
    systemsDown: "Down",
    systemsUnknown: "No data",
    systemsTier0: "Tier 0",
    systemsSince: "since",
    systemsUnavailable:
      "System status isn't available: the KV binding “STATE” is missing on the Cloudflare Pages project.",
  },

  time: {
    now: "just now",
    minute: "{n} min ago",
    hour: "{n} h ago",
    day: "{n} d ago",
    inHours: "in {n} h",
    inDays: "in {n} d",
  },
};

const dict = { es, en };

export function portalCopy(lang: PortalLang) {
  return dict[lang] ?? dict.es;
}

export type PortalCopy = typeof es;

/** Clave de demo → texto traducido. Devuelve la clave si no existe, para que un hueco se vea. */
export function demoText(copy: PortalCopy, key: string): string {
  return (copy.demo as Record<string, string>)[key] ?? key;
}

/**
 * Resuelve un texto que puede venir como clave (modo demo) o ya escrito (modo real).
 *
 * Los datos sembrados guardan claves de traducción para poder mostrarse en los
 * dos idiomas; los datos reales llegan con el texto que produjo la telemetría,
 * que ya viene redactado en el idioma del cliente. Esta función es el único
 * lugar donde esa diferencia se resuelve.
 */
export function maybeDemo(
  copy: PortalCopy,
  mode: "demo" | "live",
  value: string
): string {
  return mode === "demo" ? demoText(copy, value) : value;
}

/** Tiempo relativo, sin librería de fechas. */
export function relativeTime(copy: PortalCopy, iso: string, now: Date): string {
  const diffMin = Math.round((now.getTime() - new Date(iso).getTime()) / 60_000);
  if (diffMin < 0) {
    const ahead = Math.abs(diffMin);
    if (ahead < 60 * 24) return copy.time.inHours.replace("{n}", String(Math.max(1, Math.round(ahead / 60))));
    return copy.time.inDays.replace("{n}", String(Math.round(ahead / 1440)));
  }
  if (diffMin < 2) return copy.time.now;
  if (diffMin < 60) return copy.time.minute.replace("{n}", String(diffMin));
  if (diffMin < 1440) return copy.time.hour.replace("{n}", String(Math.round(diffMin / 60)));
  return copy.time.day.replace("{n}", String(Math.round(diffMin / 1440)));
}
