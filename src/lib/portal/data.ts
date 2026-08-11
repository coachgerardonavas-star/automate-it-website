/**
 * Proveedor de datos del portal.
 *
 * Única puerta por la que las pantallas piden información. Decide entre datos
 * sembrados y datos reales mirando `organization.dataMode`, y devuelve siempre
 * un `DataEnvelope` que lleva el modo consigo. Ninguna pantalla vuelve a tomar
 * esa decisión, y ninguna puede mostrar un número sin saber de dónde salió.
 *
 * Estado de V1: `live` todavía no tiene consultas reales para la mayoría de las
 * entidades. En vez de inventarlas, devuelve vacío y anota la fuente en
 * `failedSources` — la UI pinta el estado vacío honesto que pide el handoff
 * (§41) en lugar de fingir actividad.
 */

import {
  demoAppointments, demoConversations, demoCustomers, demoDocuments,
  demoLeads, demoOverview,
} from "./demo-data";
import { restSelect, type SupabaseEnv } from "./supabase";
import type {
  AdminAutomationDetail, AdminOrgRow, Appointment, Conversation, Customer,
  DataEnvelope, Lead, Organization, OverviewData, PortalDocument, PortalRole,
  RangeKey,
} from "./types";

export interface DataContext {
  org: Organization;
  role: PortalRole;
  env: SupabaseEnv | null;
  accessToken: string | null;
  now: Date;
}

function envelope<T>(mode: Organization["dataMode"], data: T, failed: string[] = []): DataEnvelope<T> {
  return { mode, data, failedSources: failed };
}

/** Overview: la pantalla que más pesa, servida en una sola llamada. */
export async function getOverview(
  ctx: DataContext,
  _range: RangeKey
): Promise<DataEnvelope<OverviewData>> {
  if (ctx.org.dataMode === "demo") {
    return envelope("demo", demoOverview(ctx.now));
  }

  // Modo real. Cada bloque se pide por separado y falla por separado: que
  // Calendar no responda no debe dejar la pantalla en blanco (handoff §42).
  const failed: string[] = [];
  const empty: OverviewData = {
    kpis: [], activity: [], automations: [], attention: [],
    recentActivity: [], workHandled: { total: 0, breakdown: [] },
    integrations: [], businessMetrics: [], insights: [],
  };

  if (!ctx.env || !ctx.accessToken) {
    return envelope("live", empty, ["supabase"]);
  }

  const [automations, integrations, activity] = await Promise.all([
    safe(() => restSelect<any>(ctx.env!, ctx.accessToken!,
      `automations?select=id,name,icon,state,volume_this_period,unit_label,last_activity_at&organization_id=eq.${ctx.org.id}`), failed, "automations"),
    safe(() => restSelect<any>(ctx.env!, ctx.accessToken!,
      `integrations?select=id,name,state&organization_id=eq.${ctx.org.id}`), failed, "integrations"),
    // Columnas nombradas a propósito: `automation_events.metadata` guarda el
    // payload técnico y no debe salir hacia el cliente. RLS protege la fila,
    // no la columna, así que el filtro se aplica acá.
    safe(() => restSelect<any>(ctx.env!, ctx.accessToken!,
      `automation_events?select=id,occurred_at,human_summary,source,status&organization_id=eq.${ctx.org.id}&order=occurred_at.desc&limit=8`), failed, "activity"),
  ]);

  return envelope("live", {
    ...empty,
    automations: (automations ?? []).map((a: any) => ({
      id: a.id, name: a.name, icon: a.icon ?? "workflow", state: a.state,
      volume: a.volume_this_period ?? 0, unitLabel: a.unit_label ?? "",
      lastActivityAt: a.last_activity_at,
    })),
    integrations: (integrations ?? []).map((i: any) => ({
      id: i.id, name: i.name, state: i.state,
    })),
    recentActivity: (activity ?? []).map((e: any) => ({
      id: e.id, at: e.occurred_at, summary: e.human_summary,
      channel: e.source, status: e.status,
    })),
  }, failed);
}

export async function getLeads(ctx: DataContext): Promise<DataEnvelope<Lead[]>> {
  if (ctx.org.dataMode === "demo") return envelope("demo", demoLeads(ctx.now));
  const failed: string[] = [];
  if (!ctx.env || !ctx.accessToken) return envelope("live", [], ["supabase"]);

  const rows = await safe(() => restSelect<any>(ctx.env!, ctx.accessToken!,
    `leads?select=*&organization_id=eq.${ctx.org.id}&order=last_activity_at.desc`), failed, "leads");

  return envelope("live", (rows ?? []).map((l: any) => ({
    id: l.id, name: l.name, temperature: l.temperature, source: l.source ?? "",
    interest: l.interest ?? "", summary: l.summary ?? "", nextAction: l.next_action ?? "",
    owner: l.owner, status: l.status ?? "", crmUrl: l.crm_url,
    lastActivityAt: l.last_activity_at, createdAt: l.created_at,
  })), failed);
}

export async function getConversations(ctx: DataContext): Promise<DataEnvelope<Conversation[]>> {
  if (ctx.org.dataMode === "demo") return envelope("demo", demoConversations(ctx.now));
  return envelope("live", [], ctx.env ? [] : ["supabase"]);
}

export async function getAppointments(ctx: DataContext): Promise<DataEnvelope<Appointment[]>> {
  if (ctx.org.dataMode === "demo") return envelope("demo", demoAppointments(ctx.now));
  return envelope("live", [], ctx.env ? [] : ["supabase"]);
}

export async function getCustomers(ctx: DataContext): Promise<DataEnvelope<Customer[]>> {
  if (ctx.org.dataMode === "demo") return envelope("demo", demoCustomers(ctx.now));
  return envelope("live", [], ctx.env ? [] : ["supabase"]);
}

export async function getDocuments(ctx: DataContext): Promise<DataEnvelope<PortalDocument[]>> {
  if (ctx.org.dataMode === "demo") return envelope("demo", demoDocuments(ctx.now));
  return envelope("live", [], ctx.env ? [] : ["supabase"]);
}

/**
 * Filas del Admin Center.
 *
 * Management by exception (handoff §24): lo que importa es qué cliente está
 * roto, no el detalle de los que están bien. Por eso se piden solo los recuentos
 * que permiten ordenar por urgencia.
 *
 * `orgs` llega ya filtrada por RLS: si quien consulta no es admin, la lista
 * contiene únicamente sus propias organizaciones. El rol se comprueba igual
 * antes de renderizar la pantalla — dos cierres para la misma puerta.
 */
export async function getAdminRows(
  orgs: Organization[],
  env: SupabaseEnv | null,
  accessToken: string | null
): Promise<DataEnvelope<AdminOrgRow[]>> {
  const base: AdminOrgRow[] = orgs.map((o) => ({
    id: o.id,
    name: o.name,
    slug: o.slug,
    status: o.status,
    automationCount: 0,
    openAlerts: 0,
    lastActivityAt: null,
  }));

  if (!env || !accessToken) return { mode: "live", data: base, failedSources: ["supabase"] };

  const failed: string[] = [];

  // Una consulta por colección y no una por cliente: con veinte clientes, el
  // patrón "un fetch por fila" son veinte viajes de ida y vuelta.
  const [automations, alerts] = await Promise.all([
    safe(() => restSelect<any>(env, accessToken,
      "automations?select=id,organization_id,last_activity_at"), failed, "automations"),
    safe(() => restSelect<any>(env, accessToken,
      "alerts?select=id,organization_id,level&resolved_at=is.null"), failed, "alerts"),
  ]);

  const byOrg = new Map(base.map((r) => [r.id, r]));

  for (const a of automations ?? []) {
    const row = byOrg.get(a.organization_id);
    if (!row) continue;
    row.automationCount += 1;
    if (a.last_activity_at && (!row.lastActivityAt || a.last_activity_at > row.lastActivityAt)) {
      row.lastActivityAt = a.last_activity_at;
    }
  }

  for (const al of alerts ?? []) {
    const row = byOrg.get(al.organization_id);
    if (row) row.openAlerts += 1;
  }

  // Lo roto primero: es el orden que hace útil la pantalla.
  const RANK = { critical: 0, needs_attention: 1, healthy: 2 } as const;
  const data = [...byOrg.values()].sort(
    (a, b) => RANK[a.status] - RANK[b.status] || a.name.localeCompare(b.name)
  );

  return { mode: "live", data, failedSources: failed };
}

/** Detalle técnico de un cliente. Solo se llama desde la ruta de admin. */
export async function getAdminAutomationDetail(
  orgId: string,
  env: SupabaseEnv | null,
  accessToken: string | null
): Promise<DataEnvelope<AdminAutomationDetail[]>> {
  if (!env || !accessToken) return { mode: "live", data: [], failedSources: ["supabase"] };
  const failed: string[] = [];

  const rows = await safe(() => restSelect<any>(env, accessToken,
    `automations?select=id,name,state,automation_internals(provider,external_id,last_success_at,last_failure_at,error_count,retry_state)&organization_id=eq.${orgId}`),
    failed, "automations");

  return {
    mode: "live",
    data: (rows ?? []).map((a: any) => {
      const i = Array.isArray(a.automation_internals)
        ? a.automation_internals[0]
        : a.automation_internals;
      return {
        id: a.id,
        name: a.name,
        state: a.state,
        provider: i?.provider ?? null,
        externalId: i?.external_id ?? null,
        lastSuccessAt: i?.last_success_at ?? null,
        lastFailureAt: i?.last_failure_at ?? null,
        errorCount: i?.error_count ?? 0,
        retryState: i?.retry_state ?? null,
      };
    }),
    failedSources: failed,
  };
}

/**
 * Ejecuta y absorbe el fallo, anotando la fuente.
 *
 * Devuelve null en vez de propagar: una fuente caída degrada su tarjeta, no la
 * pantalla entera.
 */
async function safe<T>(fn: () => Promise<T>, failed: string[], source: string): Promise<T | null> {
  try {
    return await fn();
  } catch {
    failed.push(source);
    return null;
  }
}
