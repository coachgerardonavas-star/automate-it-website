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
  /**
   * Webhook del escenario de Make 5148358, que manda el email de confirmacion,
   * dispara la llamada de Retell y abre el deal. Ese escenario se disparaba con
   * `WatchFormSubmissions` hasta el 7-ago-2026, cuando este formulario dejo de
   * postear a HubSpot Forms: desde entonces no se ejecutaba para ningun lead.
   *
   * Va como secreto, no como var: la URL es la unica credencial del webhook, y
   * quien la tenga puede disparar llamadas de Retell, que cuestan dinero.
   *   wrangler secret put MAKE_LEAD_WEBHOOK_URL
   */
  MAKE_LEAD_WEBHOOK_URL?: string;
  // Rate limiter nativo de Cloudflare. Cierra lo que el filtro de Origin no
  // puede: un cliente que no manda cabecera Origin (curl, un script) pasaba
  // el filtro porque las llamadas servidor-a-servidor tampoco la mandan.
  RATE_LIMITER?: { limit: (opts: { key: string }) => Promise<{ success: boolean }> };
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
 * Un lead que marca HIPAA no es basura: es un lead que entra por otra puerta.
 * Se le trata como cualquier otro para efectos de temperatura y se le rutea a
 * conversación manual. Lo que NO se hace es guardarle el texto libre — ver
 * `phiRisk`.
 */
function isPhiRisk(p: Payload): boolean {
  return p.hipaa === "yes";
}

/**
 * Lead temperature. Deliberately conservative: urgency alone does not make a
 * lead hot, because "para ayer" is free to say. A disqualified team size
 * overrides everything.
 */
function leadStatus(p: Payload): string {
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

  // Ni HubSpot ni Telegram tienen BAA firmado hoy. Mientras eso siga así, el
  // texto libre de un negocio de salud no entra: es el único campo donde puede
  // aparecer un dato de paciente, y una vez escrito ya no se "des-guarda".
  // El lead no se pierde — se atiende por conversación, que es justo lo que la
  // respuesta le dice a la persona.
  if (p.problem && !isPhiRisk(p)) props.descripcion = p.problem.slice(0, 65000);
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
    isPhiRisk(p)
      ? "🟡 <b>MANEJA DATOS DE PACIENTES (HIPAA).</b> Sí se cotiza, pero primero hay que firmar BAA con cada herramienta que toque los datos. Contactar por conversación, no por el flujo normal."
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
    // Mismo motivo que en `upsertContact`: sin BAA, el texto libre de un
    // negocio de salud no se guarda en HubSpot.
    isPhiRisk(p)
      ? "(no se guardó — el negocio maneja datos de pacientes y no hay BAA firmado con HubSpot. Pedírselo en la llamada.)"
      : p.problem || "(sin respuesta)",
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

/**
 * No bloquea la respuesta —un hipo de Telegram no debe costarnos el lead— pero
 * el `fetch` se devuelve para que quien llama lo pase por `ctx.waitUntil`.
 *
 * Antes esto era `void fetch(...)` sin mas. En Workers eso es una carrera que
 * se pierde: al devolver la respuesta, el runtime cancela lo que quedo en
 * vuelo. Con Telegram colaba casi siempre porque responde rapido; con el
 * webhook de Make no colaba nunca, y por eso el escenario no se ejecutaba.
 */
function notifyTelegram(env: Env, p: Payload): Promise<unknown> | null {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return null;
  const member = p.pain ? MEMBER_BY_PAIN[p.pain] : "sin determinar";
  const flag = isPhiRisk(p)
    ? "\n🟡 HIPAA — sí se cotiza, pero primero BAA. Llamar."
    : p.team_size === "30_plus"
      ? "\n🔴 Más de 30 empleados — fuera de alcance"
      : "";
  // Telegram no tiene BAA y es el canal más fácil de filtrar de todo el stack:
  // el texto libre de un negocio de salud no sale por aquí. El resto del lead
  // sí, porque son datos del dueño del negocio, no de un paciente.
  const body = isPhiRisk(p)
    ? "(texto libre omitido — maneja datos de pacientes)"
    : (p.problem || "").slice(0, 400);
  const text =
    `🩺 <b>Diagnóstico nuevo</b>\n` +
    `${p.name || "sin nombre"} · ${p.email}\n` +
    `<b>${member}</b> · ${p.team_size ? TEAM_LABEL[p.team_size] ?? p.team_size : "—"} · ${p.urgency ? URGENCIA_HS[p.urgency] ?? p.urgency : "—"}` +
    flag +
    `\n\n${body}`;

  return fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  }).catch((e) => console.error("[diagnostico-intake] Telegram error", e));
}

/**
 * Dispara el escenario de Make que atiende al lead: email de confirmacion,
 * llamada del agente de Retell y deal.
 *
 * El payload va envuelto en `fields` a proposito. El escenario leia
 * `1.fields.email`, `1.fields.message`, etc. cuando el trigger era un
 * formulario de HubSpot; mandandolo con esa misma forma, el cambio de trigger
 * no obligo a retocar ni uno solo de los mapeos de aguas abajo.
 *
 * No se dispara en dos casos:
 *  - Negocios con datos de pacientes: `message` es texto libre y Make no tiene
 *    BAA. Ademas, a esa persona el formulario le acaba de decir que su caso
 *    empieza con una conversacion, no con una llamada automatica.
 *  - Equipos de mas de 30: se les rechaza en la misma respuesta. Llamarlos
 *    seria contradecirnos.
 */
function notifyMakeLeadFlow(env: Env, p: Payload): Promise<unknown> | null {
  if (!env.MAKE_LEAD_WEBHOOK_URL) {
    console.warn("[diagnostico-intake] MAKE_LEAD_WEBHOOK_URL sin configurar");
    return null;
  }
  if (isPhiRisk(p) || p.team_size === "30_plus") return null;

  const parts = (p.name || "").trim().split(/\s+/);
  return fetch(env.MAKE_LEAD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        firstname: parts[0] || "",
        email: p.email,
        phone: p.phone || "",
        address: p.address || "",
        industry: p.business_type || "",
        message: p.problem || "",
      },
    }),
  }).catch((e) => console.error("[diagnostico-intake] Make webhook error", e));
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin, env);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    // Sonda para `health-check`, que hace GET /health cada 5 minutos. Este es
    // el unico camino por el que un lead llega al CRM: si se cae, los leads
    // desaparecen en silencio — que es exactamente lo que paso durante dos
    // meses y medio con el formulario estatico.
    if (new URL(request.url).pathname.replace(/\/+$/, "") === "/health") {
      return json({ ok: true, service: "diagnostico-intake" }, 200, cors);
    }

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

    // Lo que cierra el hueco que el filtro de Origin deja abierto a proposito.
    // Va por IP: una persona real llena este formulario una vez, dos si se
    // equivoco. Un script que quiera ensuciar el CRM necesita volumen, y ahi
    // es donde topa. El limite se define en wrangler.toml, no aqui.
    // Si el binding no existe (despliegue viejo), NO se bloquea: perder un
    // lead real por una proteccion mal configurada es peor que el abuso que
    // evita, y este worker es la unica puerta al CRM.
    const ip = request.headers.get("CF-Connecting-IP");
    if (env.RATE_LIMITER && ip) {
      const { success } = await env.RATE_LIMITER.limit({ key: ip });
      if (!success) {
        console.log(`[diagnostico-intake] rate limited ${ip}`);
        return json({ error: "Demasiados intentos. Espera un momento." }, 429, cors);
      }
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

      // `waitUntil` mantiene vivo el worker hasta que estas dos salgan, sin
      // hacer esperar a la persona que envio el formulario. Sin esto el
      // runtime las cancela al devolver la respuesta.
      const pending = [notifyTelegram(env, p), notifyMakeLeadFlow(env, p)];
      for (const task of pending) if (task) ctx.waitUntil(task);

      // The person still gets a real answer, not a generic thanks. `outOfScope`
      // dispara el mensaje a medida en el formulario; para HIPAA ese mensaje ya
      // no es un rechazo sino "tu caso empieza con una conversación". Los de
      // tamaño sí siguen siendo un no.
      return json(
        {
          ok: true,
          outOfScope: isPhiRisk(p) || p.team_size === "30_plus" ? true : false,
          reason: isPhiRisk(p) ? "hipaa" : p.team_size === "30_plus" ? "size" : null,
        },
        200,
        cors
      );
    } catch (e) {
      console.error("[diagnostico-intake] failed", e);
      // Antes esto volcaba el payload entero. El motivo era bueno —poder
      // recuperar un lead si HubSpot falla— pero metía nombre, teléfono,
      // dirección y texto libre en los logs de Cloudflare, que no son un
      // almacén con control de acceso. Se conserva la recuperabilidad con la
      // llave mínima (el email) y el mapa de qué venía lleno; el contenido, no.
      console.error(
        "[diagnostico-intake] recuperable",
        JSON.stringify({
          email: p.email,
          campos: Object.keys(p).filter((k) => (p as Record<string, unknown>)[k]),
          phiRisk: isPhiRisk(p),
        })
      );
      return json({ error: "No pudimos guardar tus respuestas" }, 502, cors);
    }
  },
};
