/**
 * stripe-webhook-automate
 *
 * Receives Stripe webhook events, verifies the signature, and logs the
 * relevant ones. Downstream integrations (HubSpot, Airtable, BIT) are added
 * in a later sprint.
 *
 * Configure the webhook endpoint in Stripe Dashboard pointing at this
 * worker's URL, and set STRIPE_WEBHOOK_SECRET via `wrangler secret put`.
 */

export interface Env {
  STRIPE_WEBHOOK_SECRET: string;
  /** Same bot as vero-telegram. Set with `wrangler secret put TELEGRAM_BOT_TOKEN`. */
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  /** Payment link for "Consultoría de Negocios para Emprendedores", to tag the alert. */
  CONSULTORIA_PAYMENT_LINK?: string;
}

interface StripeEvent {
  id: string;
  type: string;
  data?: { object?: Record<string, unknown> };
}

const HANDLED_EVENTS = new Set<string>([
  "checkout.session.completed",
  "invoice.payment_succeeded",
  "invoice.payment_failed",
  "customer.subscription.deleted",
]);

const SIGNATURE_TOLERANCE_SECONDS = 5 * 60;

function parseStripeSignature(
  header: string
): { timestamp: number; signatures: string[] } | null {
  const parts = header.split(",");
  let timestamp = 0;
  const signatures: string[] = [];
  for (const part of parts) {
    const [key, value] = part.split("=");
    if (!key || !value) continue;
    if (key === "t") timestamp = Number(value);
    else if (key === "v1") signatures.push(value);
  }
  if (!timestamp || signatures.length === 0) return null;
  return { timestamp, signatures };
}

function toHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(16).padStart(2, "0");
  }
  return out;
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function verifyStripeSignature(
  rawBody: string,
  header: string,
  secret: string
): Promise<boolean> {
  const parsed = parseStripeSignature(header);
  if (!parsed) return false;

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - parsed.timestamp) > SIGNATURE_TOLERANCE_SECONDS) {
    return false;
  }

  const signedPayload = `${parsed.timestamp}.${rawBody}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signedPayload)
  );
  const expected = toHex(mac);

  return parsed.signatures.some((sig) => constantTimeEqual(sig, expected));
}

function escapeHtml(value: unknown): string {
  return String(value ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatAmount(amount: unknown, currency: unknown): string {
  if (typeof amount !== "number") return "—";
  const code = String(currency ?? "usd").toUpperCase();
  return `$${(amount / 100).toFixed(2)} ${code}`;
}

async function notifyTelegram(env: Env, text: string): Promise<void> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.warn("[stripe-webhook] Telegram not configured, alert skipped");
    return;
  }
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
      console.error("[stripe-webhook] Telegram failed", res.status, await res.text());
    }
  } catch (e) {
    console.error("[stripe-webhook] Telegram error", e);
  }
}

/**
 * Builds the alert for a completed checkout.
 *
 * A 100% promo code brings the total to $0, and Stripe then creates NO
 * payment_intent and NO charge — `payment_status` arrives as
 * "no_payment_required", never "paid". So we must not gate on "paid" here or
 * every courtesy redemption would go unnoticed.
 */
function buildCheckoutAlert(obj: Record<string, unknown>, env: Env): string {
  const details = (obj.customer_details ?? {}) as Record<string, unknown>;
  const email = details.email ?? obj.customer_email;
  const paymentStatus = String(obj.payment_status ?? "");
  const isCourtesy = paymentStatus === "no_payment_required";
  const isConsultoria =
    !!env.CONSULTORIA_PAYMENT_LINK &&
    obj.payment_link === env.CONSULTORIA_PAYMENT_LINK;

  const heading = isConsultoria
    ? isCourtesy
      ? "🎟️ <b>Consultoría canjeada (cortesía)</b>"
      : "💵 <b>Consultoría pagada</b>"
    : isCourtesy
      ? "🎟️ <b>Checkout completado sin cobro</b>"
      : "💵 <b>Pago recibido</b>";

  const lines = [
    heading,
    "",
    `<b>Nombre:</b> ${escapeHtml(details.name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Teléfono:</b> ${escapeHtml(details.phone)}`,
    `<b>Total:</b> ${formatAmount(obj.amount_total, obj.currency)}`,
    `<b>Estado:</b> ${escapeHtml(paymentStatus)}`,
    `<b>Sesión:</b> <code>${escapeHtml(obj.id)}</code>`,
  ];

  if (isConsultoria) {
    lines.push("", "⏳ Falta que complete el formulario de diagnóstico.");
  }

  return lines.join("\n");
}

function logHandledEvent(event: StripeEvent): void {
  const obj = event.data?.object ?? {};
  const summary: Record<string, unknown> = {
    id: event.id,
    type: event.type,
  };

  if (event.type === "checkout.session.completed") {
    summary.session_id = obj.id;
    summary.customer = obj.customer;
    summary.customer_email = obj.customer_email ?? obj.customer_details;
    summary.amount_total = obj.amount_total;
    summary.currency = obj.currency;
    summary.metadata = obj.metadata;
  } else if (
    event.type === "invoice.payment_succeeded" ||
    event.type === "invoice.payment_failed"
  ) {
    summary.invoice_id = obj.id;
    summary.customer = obj.customer;
    summary.amount_paid = obj.amount_paid;
    summary.amount_due = obj.amount_due;
    summary.subscription = obj.subscription;
  } else if (event.type === "customer.subscription.deleted") {
    summary.subscription_id = obj.id;
    summary.customer = obj.customer;
    summary.status = obj.status;
  }

  console.log("[stripe-webhook]", JSON.stringify(summary));
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }
    if (!env.STRIPE_WEBHOOK_SECRET) {
      console.error("STRIPE_WEBHOOK_SECRET not configured");
      return new Response("Server not configured", { status: 500 });
    }

    const signature = request.headers.get("Stripe-Signature");
    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    const rawBody = await request.text();
    const valid = await verifyStripeSignature(
      rawBody,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
    if (!valid) {
      console.warn("Invalid Stripe signature");
      return new Response("Invalid signature", { status: 400 });
    }

    let event: StripeEvent;
    try {
      event = JSON.parse(rawBody) as StripeEvent;
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    if (HANDLED_EVENTS.has(event.type)) {
      logHandledEvent(event);

      if (event.type === "checkout.session.completed") {
        const obj = event.data?.object ?? {};
        // waitUntil so Stripe gets its 200 immediately and stops retrying,
        // regardless of how slow Telegram is.
        ctx.waitUntil(notifyTelegram(env, buildCheckoutAlert(obj, env)));
      }
    } else {
      console.log("[stripe-webhook] ignored", event.id, event.type);
    }

    // Always 200 once the signature is valid so Stripe stops retrying.
    return new Response("ok", { status: 200 });
  },
};
