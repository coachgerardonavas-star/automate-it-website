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
  /** Formato de presentación. `hours` añade la "h". */
  format: "count" | "hours";
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

/** Fila del Admin Center. */
export interface AdminOrgRow {
  id: string;
  name: string;
  slug: string;
  status: OrgStatus;
  automationCount: number;
  openAlerts: number;
  lastActivityAt: string | null;
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
