/**
 * Tipos del Client Portal.
 *
 * Estos tipos son el contrato entre la capa de datos y la UI. La UI no sabe si
 * lo que recibe salió de Supabase o de los datos sembrados: recibe siempre la
 * misma forma, con `mode` indicando de dónde vino.
 */

export type PortalRole = "client" | "admin";
export type DataMode = "demo" | "live";

export type RangeKey = "today" | "7d" | "30d" | "month";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  status: OrgStatus;
  dataMode: DataMode;
  accountManager: string | null;
}

export type OrgStatus = "healthy" | "needs_attention" | "critical";

export interface PortalUser {
  id: string;
  email: string;
  fullName: string | null;
  role: PortalRole;
  /** El idioma es de la persona, no del negocio: dos socios pueden preferir distinto. */
  locale: "es" | "en";
}

/** Sesión ya resuelta contra la base. `orgs` son las que este usuario puede ver. */
export interface PortalSession {
  user: PortalUser;
  orgs: Organization[];
  activeOrg: Organization | null;
}

/**
 * Métrica con comparación contra el período anterior.
 *
 * `delta` es null cuando no hay período anterior con el que comparar. La UI
 * muestra "—" en ese caso: un 0% implicaría que medimos y no cambió, que es
 * una afirmación distinta a "todavía no sabemos".
 */
export interface Kpi {
  key: string;
  value: number;
  /** Variación porcentual vs período anterior. null = sin base de comparación. */
  delta: number | null;
  /** Formato de presentación. `duration` recibe segundos y elige la unidad. */
  format: "count" | "hours" | "duration" | "percent" | "money";
  /**
   * Hacia qué lado es "mejor".
   *
   * Sin esto la tarjeta pintaría de rojo una caída del tiempo de respuesta, que
   * es justamente el resultado que estamos vendiendo. La dirección es propiedad
   * de la métrica, no del signo del número.
   */
  betterWhen?: "up" | "down";
  /**
   * El valor sale de una estimación declarada (ej. ticket promedio) y no de
   * cifras medidas una por una. La UI lo dice en pantalla: un número estimado
   * presentado como medido se cae en la primera reunión y se lleva puesta la
   * relación con el cliente.
   */
  estimated?: boolean;
}

export interface SeriesPoint {
  date: string;
  value: number;
}

export interface AutomationSummary {
  id: string;
  name: string;
  icon: string;
  state: "running" | "needs_attention" | "unavailable";
  volume: number;
  unitLabel: string;
  lastActivityAt: string | null;
}

export interface AttentionItem {
  id: string;
  name: string;
  temperature: "hot" | "warm" | "cold" | "unclassified";
  reason: string;
  at: string;
}

export interface ActivityItem {
  id: string;
  at: string;
  summary: string;
  channel: string;
  status: string | null;
}

export interface WorkBreakdownItem {
  key: string;
  count: number;
}

export interface WorkHandled {
  total: number;
  breakdown: WorkBreakdownItem[];
}

export interface IntegrationStatus {
  id: string;
  name: string;
  state: "connected" | "degraded" | "disconnected";
}

/**
 * Un insight sin evidencia no se renderiza.
 *
 * `evidence` no es decorativo: es la razón por la que podemos afirmar la frase.
 * El handoff (§16) prohíbe inventar recomendaciones, así que el tipo obliga a
 * cargar la prueba junto con la afirmación.
 */
export interface Insight {
  id: string;
  body: string;
  evidence: string;
}

export interface BusinessMetric {
  key: string;
  value: string;
  /** Comparación contra el propio negocio, nunca contra un "promedio de industria". */
  delta: number | null;
  series: number[];
  /** Igual que en Kpi: hay métricas donde bajar es ganar. */
  betterWhen?: "up" | "down";
  /**
   * El "antes", capturado en el onboarding. Es lo que convierte un número
   * suelto en una historia: "tardabas 4 horas, ahora tardás 3 minutos". Sin
   * línea base la tarjeta muestra el valor y calla — no inventa una mejora.
   */
  baseline?: { value: string; source: string } | null;
}

export interface Lead {
  id: string;
  name: string;
  temperature: "hot" | "warm" | "cold" | "unclassified";
  source: string;
  interest: string;
  summary: string;
  nextAction: string;
  owner: string | null;
  status: string;
  crmUrl: string | null;
  lastActivityAt: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  contactName: string;
  channel: string;
  lastMessage: string;
  status: string;
  durationSeconds: number | null;
  summary: string | null;
  lastMessageAt: string;
}

export interface Appointment {
  id: string;
  title: string;
  contactName: string;
  state: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show";
  createdByAutomation: boolean;
  startsAt: string;
}

export interface Customer {
  id: string;
  name: string;
  service: string;
  status: string;
  notes: string | null;
  lastInteractionAt: string | null;
  nextAppointmentAt: string | null;
}

export interface PortalDocument {
  id: string;
  title: string;
  category: string;
  url: string;
  createdAt: string;
}

/** Datos del Overview. Todo lo que la pantalla principal necesita, en una llamada. */
export interface OverviewData {
  kpis: Kpi[];
  activity: SeriesPoint[];
  automations: AutomationSummary[];
  attention: AttentionItem[];
  recentActivity: ActivityItem[];
  workHandled: WorkHandled;
  integrations: IntegrationStatus[];
  businessMetrics: BusinessMetric[];
  insights: Insight[];
}

/**
 * Envoltorio de toda respuesta de la capa de datos.
 *
 * `mode` viaja con los datos, no aparte. Es lo que impide que un número
 * sembrado se muestre como si fuera real: la UI pinta el aviso a partir de
 * este campo, no de una variable global que alguien pueda olvidar.
 */
export interface DataEnvelope<T> {
  mode: DataMode;
  data: T;
  /** Fuentes que no respondieron. La UI degrada esa tarjeta, no la pantalla. */
  failedSources: string[];
}

/**
 * Lo comercial de un cliente. Solo existe para rol admin.
 *
 * Es un ESPEJO de Stripe, no la fuente. `syncedAt` viaja con los datos a
 * propósito: sin esa fecha, "este cliente no paga" y "hace seis días que no
 * sincronizo" se ven idénticos en pantalla, y se toman decisiones de cobro
 * sobre datos muertos. La UI muestra la antigüedad, no la esconde.
 */
export interface AdminCommercial {
  plan: string | null;
  mrrCents: number | null;
  billingStatus: string | null;
  renewsAt: string | null;
  daysToRenewal: number | null;
  cancelAtPeriodEnd: boolean;
  customerSince: string | null;
  syncedAt: string | null;
  syncError: string | null;
}

/** Señales de que un cliente se está por ir antes de avisar que se va. */
export interface AdminEngagement {
  lastLoginAt: string | null;
  sawReports30d: boolean;
}

/** Fila del Admin Center. */
export interface AdminOrgRow {
  id: string;
  name: string;
  slug: string;
  status: OrgStatus;
  automationCount: number;
  openAlerts: number;
  lastActivityAt: string | null;
  /** Fallos de los últimos 7 días, no solo el estado de este instante. */
  failures7d: number;
  /** null cuando no hay espejo de Stripe todavía para este cliente. */
  commercial: AdminCommercial | null;
  engagement: AdminEngagement;
}

export interface AdminAlert {
  id: string;
  level: "info" | "warning" | "critical";
  title: string;
  detail: string | null;
  occurrences: number;
  lastSeenAt: string;
}

/** Detalle técnico de una automatización. Solo se construye para rol admin. */
export interface AdminAutomationDetail {
  id: string;
  name: string;
  state: "running" | "needs_attention" | "unavailable";
  provider: string | null;
  externalId: string | null;
  lastSuccessAt: string | null;
  lastFailureAt: string | null;
  errorCount: number;
  retryState: string | null;
}
