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
  async fetch(request: Request, env: Env): Promise<Response> {
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
    } else {
      console.log("[stripe-webhook] ignored", event.id, event.type);
    }

    // Always 200 once the signature is valid so Stripe stops retrying.
    return new Response("ok", { status: 200 });
  },
};
