/**
 * diagnostico-intake
 *
 * Receives the pre-sale diagnostic form from /diagnostico and /en/diagnostic and,
 * server-side:
 *   1. disqualifies HIPAA businesses before anything else,
 *   2. upserts the contact in HubSpot (by email) into the REAL custom properties,
 *   3. attaches a note that opens with the suggested digital team member,
 *   4. pings Telegram so Gerardo knows without checking anything.
 *
 * Why a Worker instead of posting to HubSpot from the browser, which is what
 * this form did until 7-aug-2026:
 *   - The Forms API v3 silently drops any field not defined on the form. That
 *     is not a theory: `tipo_de_negocio` and `urgencia` were empty on every
 *     contact in the CRM because the browser was posting to `industry` and to a
 *     text blob appended to `message`. Nobody noticed because nothing errored.
 *   - The CRM API fails loudly instead, which is the whole point.
 *   - The Telegram token cannot live in client JS.
 *
 * Same pattern as `consultoria-intake`, deliberately. That worker already
 * documented this exact trap; this one just stops paying for it.
 */

export interface Env {
  HUBSPOT_TOKEN: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  ALLOWED_ORIGINS: string;
}

const HUBSPOT_API = "https://api.hubapi.com";
const ASSOC_NOTE_TO_CONTACT = 202;

interface Payload {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  business_type?: string;
  problem?: string;
  /** Where it hurts — this is what decides the plan. */
  pain?: "solo_yo" | "prioridad" | "coordinacion";
  team_size?: string;
  urgency?: "now" | "month" | "quarter" | "exploring";
  hipaa?: string;
  lang?: string;
}

/**
 * The pain answer maps straight onto the autonomy rule:
 * does the work just get DONE, does something have to be DECIDED, or does a
 * whole operation have to be COORDINATED.
 */
const MEMBER_BY_PAIN: Record<string, string> = {
  solo_yo: "Asistente",
  prioridad: "Estratega",
  coordinacion: "Manager",
};

/**
 * HubSpot enumerations reject values that are not defined exactly.
 * These maps exist because the form used to send `now` / `Dental` and HubSpot
 * expects `Esta semana` / `Clínica dental` — so the data was being thrown away.
 */
const URGENCIA_HS: Record<string, string> = {
  now: "Esta semana",
  month: "Este mes",
  quarter: "El próximo mes",
  exploring: "Solo estoy explorando",
};

/** Team size buckets. Anything above 30 is out of scope by the CEO's call. */
const TEAM_LABEL: Record<string, string> = {
  solo: "Solo yo",
  "2_5": "2 a 5",
  "6_15": "6 a 15",
  "16_30": "16 a 30",
  "30_plus": "Más de 30",
};

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
  const ok = origin && allowed.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? (origin as string) : allowed[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

async function hubspot(
  env: Env,
  path: string,
  method: string,
  body: unknown
): Promise<Record<string, unknown>> {
  const res = await fetch(`${HUBSPOT_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${env.HUBSPOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`HubSpot ${method} ${path} -> ${res.status}: ${text.slice(0, 300)}`);
  }
  return text ? (JSON.parse(text) as Record<string, unknown>) : {};
}

/**
 * Lead temperature. Deliberately conservative: urgency alone does not make a
 * lead hot, because "para ayer" is free to say. A disqualified team size or a
 * HIPAA yes overrides everything.
 */
function leadStatus(p: Payload): string {
  if (p.hipaa === "yes") return "UNQUALIFIED";
  if (p.team_size === "30_plus") return "UNQUALIFIED";
  if (p.urgency === "now" && p.pain) return "CALIENTE";
  if (p.urgency === "month") return "TIBIO";
  if (p.urgency === "exploring") return "FRIO";
  return "SIN_CLASIFICAR";
}

async function upsertContact(env: Env, p: Payload): Promise<string> {
  const props: Record<string, string> = {
    email: String(p.email),
    lifecyclestage: "lead",
    hs_lead_status: leadStatus(p),
  };

  if (p.name) {
    const parts = p.name.trim().split(/\s+/);
    props.firstname = parts[0];
    if (parts.length > 1) props.lastname = parts.slice(1).join(" ");
  }
  if (p.phone) props.phone = p.phone;
  if (p.address) props.address = p.address;

  // The two that were silently going nowhere until today.
  if (p.business_type) props.tipo_de_negocio = p.business_type;
  if (p.urgency && URGENCIA_HS[p.urgency]) props.urgencia = URGENCIA_HS[p.urgency];

  if (p.problem) props.descripcion = p.problem.slice(0, 65000);
  if (p.lang) props.idioma_conversacion = p.lang === "en" ? "Inglés" : "Español";

  const out = await hubspot(env, "/crm/v3/objects/contacts/batch/upsert", "POST", {
    inputs: [{ idProperty: "email", id: String(p.email), properties: props }],
  });
  const results = out.results as Array<{ id: string }> | undefined;
  const id = results?.[0]?.id;
  if (!id) throw new Error("HubSpot upsert returned no contact id");
  return id;
}

/**
 * The note opens with the suggested member and the disqualifiers, because that
 * is the part that decides what happens next. HubSpot's free tier has no room
 * for a `miembro_sugerido` property, so it lives here — where it actually gets
 * read — instead of nowhere.
 */
function buildNote(p: Payload): string {
  const member = p.pain ? MEMBER_BY_PAIN[p.pain] : "sin determinar";
  const lines = [
    `<b>Miembro sugerido: ${member}</b>`,
    p.hipaa === "yes"
      ? "🔴 <b>FUERA DE ALCANCE — maneja datos de pacientes (HIPAA).</b> No cotizar."
      : "",
    p.team_size === "30_plus"
      ? "🔴 <b>FUERA DE ALCANCE — más de 30 empleados.</b>"
      : "",
    "",
    `Equipo: ${p.team_size ? TEAM_LABEL[p.team_size] ?? p.team_size : "—"}`,
    `Urgencia: ${p.urgency ? URGENCIA_HS[p.urgency] ?? p.urgency : "—"}`,
    `Tipo de negocio: ${p.business_type || "—"}`,
    `Ubicación: ${p.address || "—"}`,
    `Teléfono: ${p.phone || "—"}`,
    "",
    "<b>Lo que dijo, textual:</b>",
    p.problem || "(sin respuesta)",
  ];
  return lines.filter((l) => l !== "").join("<br>");
}

async function createNote(env: Env, contactId: string, p: Payload): Promise<void> {
  await hubspot(env, "/crm/v3/objects/notes", "POST", {
    properties: {
      hs_note_body: buildNote(p),
      hs_timestamp: new Date().toISOString(),
    },
    associations: [
      {
        to: { id: contactId },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: ASSOC_NOTE_TO_CONTACT,
          },
        ],
      },
    ],
  });
}

/** Fire-and-forget: a Telegram hiccup must never cost us the lead. */
function notifyTelegram(env: Env, p: Payload): void {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  const member = p.pain ? MEMBER_BY_PAIN[p.pain] : "sin determinar";
  const flag =
    p.hipaa === "yes"
      ? "\n🔴 HIPAA — fuera de alcance, no cotizar"
      : p.team_size === "30_plus"
        ? "\n🔴 Más de 30 empleados — fuera de alcance"
        : "";
  const text =
    `🩺 <b>Diagnóstico nuevo</b>\n` +
    `${p.name || "sin nombre"} · ${p.email}\n` +
    `<b>${member}</b> · ${p.team_size ? TEAM_LABEL[p.team_size] ?? p.team_size : "—"} · ${p.urgency ? URGENCIA_HS[p.urgency] ?? p.urgency : "—"}` +
    flag +
    `\n\n${(p.problem || "").slice(0, 400)}`;

  void fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  }).catch((e) => console.error("[diagnostico-intake] Telegram error", e));
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin, env);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, cors);

    // Las cabeceras CORS solo le dicen al navegador qué permitir — no bloquean
    // nada del lado del servidor. Sin esto, cualquiera puede postear contactos
    // basura al CRM desde curl. Rechazar un Origin presente y no permitido corta
    // el abuso desde navegador; un cliente que no manda Origin (curl, un script)
    // todavía pasa, y eso solo se cierra con rate limiting o un token compartido.
    // Documentado a propósito: es una mitigación, no una puerta cerrada.
    const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
    if (origin && !allowed.includes(origin)) {
      return json({ error: "Origin not allowed" }, 403, cors);
    }
    if (!env.HUBSPOT_TOKEN) {
      console.error("[diagnostico-intake] HUBSPOT_TOKEN missing");
      return json({ error: "Server not configured" }, 500, cors);
    }

    let p: Payload;
    try {
      p = (await request.json()) as Payload;
    } catch {
      return json({ error: "Invalid JSON" }, 400, cors);
    }

    if (!p.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) {
      return json({ error: "Email inválido" }, 400, cors);
    }

    try {
      const contactId = await upsertContact(env, p);
      await createNote(env, contactId, p);
      notifyTelegram(env, p);

      // The person still gets a real answer, not a generic thanks. If they are
      // out of scope we say so here instead of letting them wait for a call
      // that is never coming — that is cheaper for them and for us.
      return json(
        {
          ok: true,
          outOfScope: p.hipaa === "yes" || p.team_size === "30_plus" ? true : false,
          reason:
            p.hipaa === "yes" ? "hipaa" : p.team_size === "30_plus" ? "size" : null,
        },
        200,
        cors
      );
    } catch (e) {
      console.error("[diagnostico-intake] failed", e);
      console.error("[diagnostico-intake] payload", JSON.stringify(p));
      return json({ error: "No pudimos guardar tus respuestas" }, 502, cors);
    }
  },
};
