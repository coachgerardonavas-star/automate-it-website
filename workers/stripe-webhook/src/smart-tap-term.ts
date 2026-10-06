/**
 * Smart Tap: fin automático del compromiso mínimo de 3 mensualidades.
 *
 * El payment link de Smart Tap crea una suscripción mensual de $79 que, sin
 * intervención, cobra para siempre. Los Términos (punto 7) dicen que el
 * servicio NO continúa solo al terminar los 3 meses: si el negocio quiere
 * seguir, firma un Anexo de Extensión. Un payment link no permite fijar el fin
 * de la suscripción, así que se fija aquí, al completarse el checkout.
 *
 * Cobros resultantes: el del checkout (instalación + mes 1), mes 2 y mes 3.
 * `cancel_at` cae exactamente en el fin del tercer período, así que Stripe no
 * genera una cuarta factura ni prorrateos.
 */

export interface SmartTapTermEnv {
  /** Payment link de Smart Tap ($199 + $79/mes). */
  SMART_TAP_PAYMENT_LINK?: string;
  /** Llave restringida de Stripe con permiso de escritura SOLO en Subscriptions. */
  STRIPE_SUBSCRIPTIONS_KEY?: string;
}

export const SMART_TAP_TERM_MONTHS = 3;

/**
 * Suma meses en UTC igual que Stripe calcula los períodos mensuales: mismo día
 * y hora; si el mes destino es más corto, el último día de ese mes.
 */
export function addMonthsLikeStripe(anchorSeconds: number, months: number): number {
  const anchor = new Date(anchorSeconds * 1000);
  const year = anchor.getUTCFullYear();
  const month = anchor.getUTCMonth() + months;
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const day = Math.min(anchor.getUTCDate(), lastDay);
  return Math.floor(
    Date.UTC(
      year,
      month,
      day,
      anchor.getUTCHours(),
      anchor.getUTCMinutes(),
      anchor.getUTCSeconds()
    ) / 1000
  );
}

export type TermResult =
  | { kind: "not_smart_tap" }
  | { kind: "missing_key"; subscriptionId: string }
  | { kind: "already_set"; subscriptionId: string; cancelAt: number }
  | { kind: "scheduled"; subscriptionId: string; cancelAt: number }
  | { kind: "error"; subscriptionId: string; detail: string };

async function stripeRequest(
  key: string,
  method: "GET" | "POST",
  path: string,
  body?: URLSearchParams,
  idempotencyKey?: string
): Promise<{ ok: boolean; status: number; json: Record<string, unknown> }> {
  const headers: Record<string, string> = { Authorization: `Bearer ${key}` };
  if (body) headers["Content-Type"] = "application/x-www-form-urlencoded";
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method,
    headers,
    body: body?.toString(),
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { ok: res.ok, status: res.status, json };
}

/** Fija el fin a 3 meses de una suscripción nacida del payment link de Smart Tap. */
export async function scheduleSmartTapTermEnd(
  env: SmartTapTermEnv,
  session: Record<string, unknown>
): Promise<TermResult> {
  if (!env.SMART_TAP_PAYMENT_LINK || session.payment_link !== env.SMART_TAP_PAYMENT_LINK) {
    return { kind: "not_smart_tap" };
  }
  const subscriptionId = typeof session.subscription === "string" ? session.subscription : "";
  if (session.mode !== "subscription" || !subscriptionId) return { kind: "not_smart_tap" };
  if (!env.STRIPE_SUBSCRIPTIONS_KEY) return { kind: "missing_key", subscriptionId };

  try {
    const current = await stripeRequest(
      env.STRIPE_SUBSCRIPTIONS_KEY,
      "GET",
      `subscriptions/${encodeURIComponent(subscriptionId)}`
    );
    if (!current.ok) {
      return { kind: "error", subscriptionId, detail: `GET ${current.status}` };
    }
    // Ya tiene fin (reintento de Stripe, o alguien lo fijó/extendió a mano):
    // no se toca. Una extensión firmada nunca debe quedar pisada por esto.
    if (typeof current.json.cancel_at === "number") {
      return { kind: "already_set", subscriptionId, cancelAt: current.json.cancel_at };
    }
    const anchor = current.json.billing_cycle_anchor;
    if (typeof anchor !== "number") {
      return { kind: "error", subscriptionId, detail: "sin billing_cycle_anchor" };
    }

    const cancelAt = addMonthsLikeStripe(anchor, SMART_TAP_TERM_MONTHS);
    const body = new URLSearchParams({
      cancel_at: String(cancelAt),
      proration_behavior: "none",
      "metadata[smart_tap_term]": "3_meses",
    });
    const updated = await stripeRequest(
      env.STRIPE_SUBSCRIPTIONS_KEY,
      "POST",
      `subscriptions/${encodeURIComponent(subscriptionId)}`,
      body,
      `smart-tap-term-${subscriptionId}`
    );
    if (!updated.ok) {
      return { kind: "error", subscriptionId, detail: `POST ${updated.status}` };
    }
    return { kind: "scheduled", subscriptionId, cancelAt };
  } catch (e) {
    return { kind: "error", subscriptionId, detail: String(e).slice(0, 200) };
  }
}

function floridaDate(seconds: number): string {
  return new Date(seconds * 1000).toLocaleDateString("es-US", {
    timeZone: "America/New_York",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Texto de Telegram para cada resultado; null si no hay nada que avisar. */
export function termAlert(result: TermResult, escape: (v: unknown) => string): string | null {
  switch (result.kind) {
    case "not_smart_tap":
      return null;
    case "scheduled":
      return [
        "🗓️ <b>Smart Tap: fin del compromiso programado</b>",
        "",
        `La suscripción <code>${escape(result.subscriptionId)}</code> cobra 3 mensualidades`,
        `y termina el <b>${escape(floridaDate(result.cancelAt))}</b>.`,
        "Si el negocio firma un Anexo de Extensión, hay que mover esa fecha en Stripe.",
      ].join("\n");
    case "already_set":
      return [
        "ℹ️ <b>Smart Tap: la suscripción ya tenía fecha de fin</b>",
        "",
        `<code>${escape(result.subscriptionId)}</code> termina el ${escape(floridaDate(result.cancelAt))}. No se cambió.`,
      ].join("\n");
    case "missing_key":
      return [
        "⚠️ <b>Smart Tap: falta programar el fin a 3 meses</b>",
        "",
        `El Worker no tiene la llave de Stripe. Pon la fecha de fin a mano en`,
        `<code>${escape(result.subscriptionId)}</code>, o seguirá cobrando $79 cada mes.`,
      ].join("\n");
    case "error":
      return [
        "⚠️ <b>Smart Tap: no se pudo programar el fin a 3 meses</b>",
        "",
        `<b>Suscripción:</b> <code>${escape(result.subscriptionId)}</code>`,
        `<b>Detalle:</b> ${escape(result.detail)}`,
        "Pon la fecha de fin a mano en Stripe, o seguirá cobrando $79 cada mes.",
      ].join("\n");
  }
}
