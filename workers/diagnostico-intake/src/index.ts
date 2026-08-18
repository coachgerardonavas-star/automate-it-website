/** Public diagnostic intake: HubSpot, Telegram and Make scenario 5148358. */
export interface Env {
  HUBSPOT_TOKEN: string; TELEGRAM_BOT_TOKEN?: string; TELEGRAM_CHAT_ID?: string;
  ALLOWED_ORIGINS: string; MAKE_LEAD_WEBHOOK_URL?: string;
  RATE_LIMITER?: { limit: (opts: { key: string }) => Promise<{ success: boolean }> };
}
interface Payload {
  name?: string; email?: string; phone?: string; business_name?: string; public_url?: string;
  role?: string; business_type?: string; weekly_demand?: string; entry_channels?: string[];
  friction?: string; frequency?: string; desired_outcome?: string; key_person_dependency?: string;
  urgency?: string; regulated?: string; context?: string; lang?: string;
}
const HUBSPOT_API = "https://api.hubapi.com";
const ASSOC_NOTE_TO_CONTACT = 202;

function norm(v?: string): string {
  return (v || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}
/** Yes and unsure both take the privacy-safe manual route. */
function isRegulatedRisk(p: Payload): boolean {
  return ["si", "yes", "no estoy seguro", "not sure"].includes(norm(p.regulated));
}
function urgencyLabel(v?: string): string {
  const map: Record<string, string> = {
    "esta semana": "Esta semana", "this week": "Esta semana", "este mes": "Este mes",
    "this month": "Este mes", "proximo mes": "El próximo mes", "next month": "El próximo mes",
    "solo estoy explorando": "Solo estoy explorando", "just exploring": "Solo estoy explorando",
  };
  return map[norm(v)] || v || "—";
}
function leadStatus(p: Payload): string {
  const u = norm(p.urgency), f = norm(p.frequency);
  const frequent = ["varias veces al dia", "todos los dias", "several times a day", "every day"].includes(f);
  if (["esta semana", "this week"].includes(u) && frequent) return "CALIENTE";
  if (["esta semana", "this week", "este mes", "this month"].includes(u)) return "TIBIO";
  if (["solo estoy explorando", "just exploring"].includes(u)) return "FRIO";
  return "SIN_CLASIFICAR";
}
function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
  return { "Access-Control-Allow-Origin": origin && allowed.includes(origin) ? origin : allowed[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400" };
}
function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...cors } });
}
async function hubspot(env: Env, path: string, method: string, body: unknown): Promise<Record<string, unknown>> {
  const res = await fetch(`${HUBSPOT_API}${path}`, { method, headers: {
    Authorization: `Bearer ${env.HUBSPOT_TOKEN}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok) throw new Error(`HubSpot ${method} ${path} -> ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) as Record<string, unknown> : {};
}
async function upsertContact(env: Env, p: Payload): Promise<string> {
  const props: Record<string, string> = { email: String(p.email), lifecyclestage: "lead", hs_lead_status: leadStatus(p) };
  const parts = (p.name || "").trim().split(/\s+/).filter(Boolean);
  if (parts[0]) props.firstname = parts[0];
  if (parts.length > 1) props.lastname = parts.slice(1).join(" ");
  if (p.phone) props.phone = p.phone;
  if (p.public_url) props.website = p.public_url;
  // business_type and context are user-authored text, so regulated/unsure leads never send them to HubSpot.
  if (!isRegulatedRisk(p) && p.business_type) props.tipo_de_negocio = p.business_type;
  if (p.urgency) props.urgencia = urgencyLabel(p.urgency);
  if (!isRegulatedRisk(p) && p.context) props.descripcion = p.context.slice(0, 65000);
  if (p.lang) props.idioma_conversacion = p.lang === "en" ? "Inglés" : "Español";
  const out = await hubspot(env, "/crm/v3/objects/contacts/batch/upsert", "POST", {
    inputs: [{ idProperty: "email", id: String(p.email), properties: props }] });
  const id = (out.results as Array<{ id: string }> | undefined)?.[0]?.id;
  if (!id) throw new Error("HubSpot upsert returned no contact id");
  return id;
}
function esc(v?: string): string {
  return (v || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}
function list(v?: string[]): string { return Array.isArray(v) && v.length ? v.map(esc).join(", ") : "—"; }
function buildNote(p: Payload): string {
  const risk = isRegulatedRisk(p);
  return [
    risk ? "🟡 <b>RUTA MANUAL — privacidad/regulación afirmada o incierta.</b> No disparar automatizaciones ni pedir datos sensibles hasta confirmar requisitos y BAA aplicables." : "<b>Diagnóstico operativo público</b>",
    `Negocio: ${esc(p.business_name) || "—"}`, `Website/perfil: ${esc(p.public_url) || "—"}`,
    `Rol: ${esc(p.role) || "—"}`, `Demanda semanal: ${esc(p.weekly_demand) || "—"}`,
    `Canales: ${list(p.entry_channels)}`, `Fricción: ${esc(p.friction) || "—"}`,
    `Frecuencia: ${esc(p.frequency) || "—"}`, `Resultado deseado: ${esc(p.desired_outcome) || "—"}`,
    `Dependencia de persona clave: ${esc(p.key_person_dependency) || "—"}`,
    `Urgencia: ${esc(p.urgency) || "—"}`, `Regulado: ${esc(p.regulated) || "—"}`,
    risk ? "Tipo de negocio y contexto: (omitidos por privacidad; obtener en conversación manual segura)" : `Tipo de negocio: ${esc(p.business_type) || "—"}`,
    risk ? "" : `Contexto: ${esc(p.context) || "—"}`,
  ].filter(Boolean).join("<br>");
}
async function createNote(env: Env, contactId: string, p: Payload): Promise<void> {
  await hubspot(env, "/crm/v3/objects/notes", "POST", { properties: {
    hs_note_body: buildNote(p), hs_timestamp: new Date().toISOString() }, associations: [{ to: { id: contactId },
    types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: ASSOC_NOTE_TO_CONTACT }] }] });
}
function notifyTelegram(env: Env, p: Payload): Promise<unknown> | null {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return null;
  const risk = isRegulatedRisk(p);
  const detail = risk ? "🟡 RUTA MANUAL por privacidad/regulación. Texto libre omitido; no disparar automatizaciones."
    : [`Demanda: ${p.weekly_demand || "—"} · ${p.frequency || "—"}`, `Fricción: ${p.friction || "—"}`,
       `Resultado: ${p.desired_outcome || "—"}`, `Contexto: ${(p.context || "—").slice(0, 400)}`].join("\n");
  const text = `🩺 <b>Diagnóstico nuevo</b>\n${esc(p.name) || "sin nombre"} · ${esc(p.email)}\n${esc(p.business_name) || "sin negocio"} · ${esc(p.urgency) || "—"}\n\n${esc(detail)}`;
  return fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, { method: "POST",
    headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, parse_mode: "HTML" })
  }).catch(e => console.error("[diagnostico-intake] Telegram error", e));
}
/** Preserve the exact six-field contract consumed by Make scenario 5148358. */
function notifyMakeLeadFlow(env: Env, p: Payload): Promise<unknown> | null {
  if (!env.MAKE_LEAD_WEBHOOK_URL) { console.warn("[diagnostico-intake] MAKE_LEAD_WEBHOOK_URL sin configurar"); return null; }
  if (isRegulatedRisk(p)) return null;
  const message = [`Negocio: ${p.business_name || "—"}`, `Rol: ${p.role || "—"}`,
    `Demanda semanal: ${p.weekly_demand || "—"}`, `Canales: ${Array.isArray(p.entry_channels) ? p.entry_channels.join(", ") : "—"}`,
    `Fricción: ${p.friction || "—"}`, `Frecuencia: ${p.frequency || "—"}`,
    `Resultado deseado: ${p.desired_outcome || "—"}`, `Dependencia clave: ${p.key_person_dependency || "—"}`,
    `Urgencia: ${p.urgency || "—"}`, `Contexto: ${p.context || "—"}`].join("\n");
  return fetch(env.MAKE_LEAD_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields: { firstname: (p.name || "").trim().split(/\s+/)[0] || "", email: p.email,
      phone: p.phone || "", address: p.public_url || "", industry: p.business_type || "", message } })
  }).catch(e => console.error("[diagnostico-intake] Make webhook error", e));
}

export default { async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const origin = request.headers.get("Origin"), cors = corsHeaders(origin, env);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (new URL(request.url).pathname.replace(/\/+$/, "") === "/health") return json({ ok: true, service: "diagnostico-intake" }, 200, cors);
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, cors);
  const allowed = env.ALLOWED_ORIGINS.split(",").map(o => o.trim());
  if (origin && !allowed.includes(origin)) return json({ error: "Origin not allowed" }, 403, cors);
  const ip = request.headers.get("CF-Connecting-IP");
  if (env.RATE_LIMITER && ip && !(await env.RATE_LIMITER.limit({ key: ip })).success)
    return json({ error: "Demasiados intentos. Espera un momento." }, 429, cors);
  if (!env.HUBSPOT_TOKEN) return json({ error: "Server not configured" }, 500, cors);
  let p: Payload;
  try { p = await request.json() as Payload; } catch { return json({ error: "Invalid JSON" }, 400, cors); }
  if (!p.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) return json({ error: "Email inválido" }, 400, cors);
  if (p.entry_channels !== undefined && !Array.isArray(p.entry_channels)) return json({ error: "entry_channels debe ser una lista" }, 400, cors);
  try {
    const contactId = await upsertContact(env, p); await createNote(env, contactId, p);
    for (const task of [notifyTelegram(env, p), notifyMakeLeadFlow(env, p)]) if (task) ctx.waitUntil(task);
    const manual = isRegulatedRisk(p);
    return json({ ok: true, outOfScope: manual, reason: manual ? "regulated" : null }, 200, cors);
  } catch (e) {
    console.error("[diagnostico-intake] failed", e);
    console.error("[diagnostico-intake] recuperable", JSON.stringify({ email: p.email,
      campos: Object.keys(p).filter(k => (p as Record<string, unknown>)[k]), regulatedRisk: isRegulatedRisk(p) }));
    return json({ error: "No pudimos guardar tus respuestas" }, 502, cors);
  }
} };
