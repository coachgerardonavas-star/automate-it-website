/**
 * consultoria-intake
 *
 * Receives the post-purchase intake form from /consultoria and, server-side:
 *   1. upserts the contact in HubSpot (by email),
 *   2. attaches a note with every answer, verbatim,
 *   3. opens a deal in "WhatsApp Leads" at the "Calificado" stage,
 *   4. pings Telegram so Gerardo knows without checking anything.
 *
 * Why a Worker instead of posting to HubSpot from the browser like
 * DiagnosticoForm does:
 *   - the Telegram token cannot live in client JS,
 *   - the alert must not depend on the tab staying open,
 *   - the Forms API v3 silently drops any field that is not defined on the
 *     form, so we use the CRM API, which fails loudly instead.
 *
 * This form is POST-SALE. It deliberately writes through a different path
 * than the pre-sale /diagnostico form so no outbound workflow keyed to that
 * form ever fires for these people.
 */

export interface Env {
  HUBSPOT_TOKEN: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  ALLOWED_ORIGINS: string;
  DEAL_PIPELINE: string;
  DEAL_STAGE: string;
  // Rate limiter nativo de Cloudflare. Cierra lo que el filtro de Origin no
  // puede: un cliente sin cabecera Origin (curl, un script) lo pasa a
  // proposito. Importa mas aqui que en diagnostico-intake, porque el endpoint
  // de acuerdo registra firmas con nombre, IP y timestamp como evidencia legal.
  RATE_LIMITER?: { limit: (opts: { key: string }) => Promise<{ success: boolean }> };
}

const HUBSPOT_API = "https://api.hubapi.com";

/** HubSpot default association type IDs. */
const ASSOC_NOTE_TO_CONTACT = 202;
const ASSOC_DEAL_TO_CONTACT = 3;

interface Payload {
  nombre?: string;
  email?: string;
  telefono?: string;
  negocio?: string;
  tipo_negocio?: string;
  tamano?: string;
  urgencia?: string;
  problema?: string[];
  problema_otro?: string;
  automatizar?: string;
  como_contesta?: string;
  llamadas_perdidas?: string;
  tiene_web?: string;
  estilo_web?: string[];
  marca_3_palabras?: string;
  complica?: string[];
  redes?: string[];
  paleta?: string;
  algo_mas?: string;
  terminos?: boolean;
  permiso_marketing?: boolean;
  ref?: string;
}

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
  const ok = origin && allowed.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin : allowed[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function json(
  body: unknown,
  status: number,
  extra: Record<string, string>
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extra },
  });
}

function list(values: string[] | undefined): string {
  if (!values || !values.length) return "—";
  return values.join(", ");
}

/** Human-readable transcript of the interview, stored as a HubSpot note. */
function buildNote(p: Payload): string {
  const rows: Array<[string, string]> = [
    ["Problema principal", list(p.problema)],
    ["Otro (en sus palabras)", p.problema_otro || "—"],
    ["Actividad que automatizaría", p.automatizar || "—"],
    ["Cómo contesta hoy", p.como_contesta || "—"],
    ["Se le escapan por semana", p.llamadas_perdidas || "—"],
    ["Tiene página web", p.tiene_web || "—"],
    ["Estilo que quiere", list(p.estilo_web)],
    ["Marca en 3 palabras", p.marca_3_palabras || "—"],
    ["Qué se le complica (redes)", list(p.complica)],
    ["Redes donde está", list(p.redes)],
    ["Paleta de colores", p.paleta || "—"],
    ["Tipo de negocio", p.tipo_negocio || "—"],
    ["Tamaño del equipo", p.tamano || "—"],
    ["Urgencia", p.urgencia || "—"],
    ["Algo más que quiera contar", p.algo_mas || "—"],
    [
      "Permiso para usar su caso en marketing",
      p.permiso_marketing ? "SÍ" : "no",
    ],
    ["Sesión de Stripe", p.ref || "—"],
  ];

  return [
    "ENTREVISTA — Consultoría de Negocios para Emprendedores",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");
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

/** Upsert by email so a returning client updates instead of duplicating. */
async function upsertContact(env: Env, p: Payload): Promise<string> {
  const props: Record<string, string> = {
    email: String(p.email),
    // Post-sale intake: these people are not cold leads.
    lifecyclestage: "opportunity",
  };
  if (p.nombre) {
    const parts = p.nombre.trim().split(/\s+/);
    props.firstname = parts[0];
    if (parts.length > 1) props.lastname = parts.slice(1).join(" ");
  }
  if (p.telefono) props.phone = p.telefono;
  if (p.negocio) props.company = p.negocio;
  if (p.tipo_negocio) props.industry = p.tipo_negocio;

  const out = await hubspot(env, "/crm/v3/objects/contacts/batch/upsert", "POST", {
    inputs: [{ idProperty: "email", id: String(p.email), properties: props }],
  });

  const results = out.results as Array<{ id: string }> | undefined;
  const id = results?.[0]?.id;
  if (!id) throw new Error("HubSpot upsert returned no contact id");
  return id;
}

async function createNote(
  env: Env,
  contactId: string,
  p: Payload
): Promise<void> {
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

async function createDeal(
  env: Env,
  contactId: string,
  p: Payload
): Promise<void> {
  const name = p.negocio || p.nombre || String(p.email);
  await hubspot(env, "/crm/v3/objects/deals", "POST", {
    properties: {
      dealname: `Consultoría Emprendedores — ${name}`,
      pipeline: env.DEAL_PIPELINE,
      dealstage: env.DEAL_STAGE,
      amount: "0",
    },
    associations: [
      {
        to: { id: contactId },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED",
            associationTypeId: ASSOC_DEAL_TO_CONTACT,
          },
        ],
      },
    ],
  });
}

function escapeHtml(v: unknown): string {
  return String(v ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function notifyTelegram(env: Env, p: Payload): Promise<void> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.warn("[consultoria-intake] Telegram not configured");
    return;
  }
  const text = [
    "📝 <b>Entrevista completada</b>",
    "",
    `<b>Nombre:</b> ${escapeHtml(p.nombre)}`,
    `<b>Negocio:</b> ${escapeHtml(p.negocio)} — ${escapeHtml(p.tipo_negocio)}`,
    `<b>Email:</b> ${escapeHtml(p.email)}`,
    `<b>Teléfono:</b> ${escapeHtml(p.telefono)}`,
    "",
    `<b>Problema:</b> ${escapeHtml(list(p.problema))}`,
    `<b>Automatizaría:</b> ${escapeHtml(p.automatizar)}`,
    `<b>Urgencia:</b> ${escapeHtml(p.urgencia)}`,
    `<b>Permiso de marketing:</b> ${p.permiso_marketing ? "SÍ" : "no"}`,
    "",
    "Las respuestas completas quedaron como nota en HubSpot.",
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );
    if (!res.ok) {
      console.error("[consultoria-intake] Telegram", res.status, await res.text());
    }
  } catch (e) {
    console.error("[consultoria-intake] Telegram error", e);
  }
}

/* ------------------------------------------------------------------ *
 * Firma del Acuerdo de Colaboración (ruta /acuerdo)
 *
 * ESIGN Act y UETA no exigen un garabato: exigen intención de firmar,
 * consentimiento para hacerlo por medios electrónicos, que la firma quede
 * asociada al documento, y que el firmante pueda conservar una copia. Un
 * nombre escrito a mano alzada por teclado, con casillas explícitas, fecha,
 * IP y la VERSIÓN del texto aceptado cumple eso — y a diferencia de una
 * imagen de firma, cabe entero en una nota y no se pierde.
 * ------------------------------------------------------------------ */

interface FirmaPayload {
  nombre?: string;
  email?: string;
  cuenta?: string;
  firma?: string;
  acepta?: boolean;
  aceptaFtc?: boolean;
  aceptaElectronica?: boolean;
  version?: string;
}

function buildFirmaNote(p: FirmaPayload, meta: Record<string, string>): string {
  return [
    "ACUERDO DE COLABORACIÓN — FIRMADO",
    "",
    `Nombre legal: ${p.nombre ?? "—"}`,
    `Firma escrita: ${p.firma ?? "—"}`,
    `Email: ${p.email ?? "—"}`,
    `Cuenta / red: ${p.cuenta ?? "—"}`,
    "",
    `Acepta el acuerdo: ${p.acepta ? "SÍ" : "no"}`,
    `Acepta divulgar la colaboración (FTC): ${p.aceptaFtc ? "SÍ" : "no"}`,
    `Consiente firmar electrónicamente: ${p.aceptaElectronica ? "SÍ" : "no"}`,
    "",
    `Versión del documento: ${p.version ?? "—"}`,
    `Fecha y hora (UTC): ${meta.fecha}`,
    `IP: ${meta.ip}`,
    `Navegador: ${meta.ua}`,
  ].join("\n");
}

async function handleFirma(
  request: Request,
  env: Env,
  cors: Record<string, string>
): Promise<Response> {
  let p: FirmaPayload;
  try {
    p = (await request.json()) as FirmaPayload;
  } catch {
    return json({ error: "Invalid JSON" }, 400, cors);
  }

  if (!p.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) {
    return json({ error: "Email inválido" }, 400, cors);
  }
  if (!p.nombre || !p.firma) {
    return json({ error: "Falta el nombre o la firma" }, 400, cors);
  }
  // La firma escrita debe coincidir con el nombre legal: es lo que demuestra
  // que el acto de firmar fue deliberado y no un clic distraído.
  if (p.firma.trim().toLowerCase() !== p.nombre.trim().toLowerCase()) {
    return json({ error: "La firma debe coincidir con tu nombre completo" }, 400, cors);
  }
  if (!p.acepta || !p.aceptaFtc || !p.aceptaElectronica) {
    return json({ error: "Faltan aceptaciones obligatorias" }, 400, cors);
  }

  const meta = {
    fecha: new Date().toISOString(),
    ip: request.headers.get("CF-Connecting-IP") ?? "—",
    ua: (request.headers.get("User-Agent") ?? "—").slice(0, 180),
  };

  try {
    const contactId = await upsertContact(env, {
      email: p.email,
      nombre: p.nombre,
      negocio: p.cuenta,
    });
    await hubspot(env, "/crm/v3/objects/notes", "POST", {
      properties: {
        hs_note_body: buildFirmaNote(p, meta),
        hs_timestamp: meta.fecha,
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

    ctxSafeTelegram(env, [
      "✍️ <b>Acuerdo de Colaboración firmado</b>",
      "",
      `<b>Nombre:</b> ${escapeHtml(p.nombre)}`,
      `<b>Email:</b> ${escapeHtml(p.email)}`,
      `<b>Cuenta:</b> ${escapeHtml(p.cuenta)}`,
      `<b>Versión:</b> ${escapeHtml(p.version)}`,
      `<b>IP:</b> ${escapeHtml(meta.ip)}`,
    ].join("\n"));

    return json({ ok: true, fecha: meta.fecha }, 200, cors);
  } catch (e) {
    console.error("[consultoria-intake] firma fallida", e);
    // La firma es evidencia legal, así que perderla es caro — pero volcarla
    // entera al log metía nombre, email e IP en Cloudflare, que no es un
    // almacén con control de acceso. Se conserva lo mínimo para reconstruirla.
    console.error(
      "[consultoria-intake] firma recuperable",
      JSON.stringify({ email: p.email, version: p.version, fecha: meta.fecha })
    );
    return json({ error: "No pudimos registrar tu firma" }, 502, cors);
  }
}

/** Telegram sin bloquear la respuesta ni tumbarla si falla. */
function ctxSafeTelegram(env: Env, text: string): void {
  void (async () => {
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
    try {
      await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        }
      );
    } catch (e) {
      console.error("[consultoria-intake] Telegram error", e);
    }
  })();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // Sonda para `health-check`. Este worker recibe la entrevista post-venta y
    // la firma del acuerdo: si se cae, una persona que ya pagó llena un
    // formulario largo y lo pierde, o una firma legal no queda registrada.
    // Iba sin vigilancia hasta hoy.
    if (new URL(request.url).pathname.replace(/\/+$/, "") === "/health") {
      return json({ ok: true, service: "consultoria-intake" }, 200, cors);
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }

    // Las cabeceras CORS solo le dicen al navegador qué permitir — no bloquean
    // nada del lado del servidor. Este worker no tenía ningún filtro: cualquiera
    // podía postear contactos al CRM y, peor, falsificar un registro de firma
    // en /acuerdo (que guarda nombre, IP y timestamp como evidencia legal).
    // Va antes del enrutado a /acuerdo a propósito, para que cubra ambos caminos.
    // Mismo patrón que `diagnostico-intake`. Rechazar un Origin presente y no
    // permitido corta el abuso desde navegador; un cliente que no manda Origin
    // (curl, un script) todavía pasa, y eso solo se cierra con rate limiting o
    // un token compartido. Es una mitigación, no una puerta cerrada.
    const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
    if (origin && !allowed.includes(origin)) {
      return json({ error: "Origin not allowed" }, 403, cors);
    }

    // Limite por IP, tambien antes del enrutado para que cubra la firma del
    // acuerdo. Si el binding no existe (despliegue viejo), NO se bloquea:
    // perder un intake real o una firma legitima por una proteccion mal
    // configurada es peor que el abuso que evita.
    const ip = request.headers.get("CF-Connecting-IP");
    if (env.RATE_LIMITER && ip) {
      const { success } = await env.RATE_LIMITER.limit({ key: ip });
      if (!success) {
        console.log(`[consultoria-intake] rate limited ${ip}`);
        return json({ error: "Demasiados intentos. Espera un momento." }, 429, cors);
      }
    }

    if (!env.HUBSPOT_TOKEN) {
      console.error("[consultoria-intake] HUBSPOT_TOKEN missing");
      return json({ error: "Server not configured" }, 500, cors);
    }

    if (new URL(request.url).pathname.replace(/\/+$/, "") === "/acuerdo") {
      return handleFirma(request, env, cors);
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
    if (!p.terminos) {
      return json({ error: "Falta aceptar los términos" }, 400, cors);
    }

    try {
      // Contact and note carry the actual value: who they are and what they
      // answered. Both must succeed or the person is told to retry.
      const contactId = await upsertContact(env, p);
      await createNote(env, contactId, p);

      // The deal is bookkeeping. It needs scopes the contact/note path does
      // not, so it can 403 on its own — and a person who just filled a long
      // form must never see an error because a pipeline card failed to open.
      // Log it and move on; the interview is already safe in the note.
      try {
        await createDeal(env, contactId, p);
      } catch (e) {
        console.error("[consultoria-intake] deal skipped", e);
      }

      await notifyTelegram(env, p);
      return json({ ok: true }, 200, cors);
    } catch (e) {
      // The person already "paid" and filled a long form — never lose the
      // answers to a HubSpot hiccup. Log them so they are recoverable.
      console.error("[consultoria-intake] failed", e);
      // Mismo cambio que en la firma y que en `diagnostico-intake`: la
      // recuperabilidad se mantiene con la llave y el mapa de campos llenos,
      // sin volcar las respuestas de la entrevista a los logs.
      console.error(
        "[consultoria-intake] recuperable",
        JSON.stringify({
          email: p.email,
          campos: Object.keys(p).filter((k) => (p as Record<string, unknown>)[k]),
        })
      );
      return json({ error: "No pudimos guardar tus respuestas" }, 502, cors);
    }
  },
};
