/**
 * stripe-checkout-automate
 *
 * Creates a Stripe Checkout Session combining a one-time setup fee with a
 * monthly subscription, then returns the hosted Checkout URL.
 *
 * Request:  POST /
 *   {
 *     "priceIdMonthly": "price_...",   // recurring price
 *     "priceIdSetup":   "price_...",   // one-time price
 *     "planName":       "Starter + WhatsApp",  // shown in metadata
 *     "lang":           "es" | "en"     // optional, default "es"
 *   }
 *
 * Response:  { "url": "https://checkout.stripe.com/..." }  // 200
 *            { "error": "..." }                            // 4xx / 5xx
 */

export interface Env {
  STRIPE_SECRET_KEY: string;
  ALLOWED_ORIGINS?: string;
}

interface CheckoutPayload {
  priceIdMonthly?: unknown;
  priceIdSetup?: unknown;
  planName?: unknown;
  lang?: unknown;
}

const DEFAULT_ALLOWED_ORIGINS = [
  "https://yourbizupgraded.com",
  "https://www.yourbizupgraded.com",
  "https://automate-it-website.pages.dev",
];

const STRIPE_API = "https://api.stripe.com/v1/checkout/sessions";
const PRICE_ID_PATTERN = /^price_[A-Za-z0-9]+$/;

function resolveAllowedOrigins(env: Env): string[] {
  if (env.ALLOWED_ORIGINS) {
    return env.ALLOWED_ORIGINS.split(",")
      .map((o) => o.trim())
      .filter(Boolean);
  }
  return DEFAULT_ALLOWED_ORIGINS;
}

function corsHeaders(origin: string | null, allowed: string[]): HeadersInit {
  const match = origin && allowed.includes(origin) ? origin : allowed[0];
  return {
    "Access-Control-Allow-Origin": match,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(
  body: unknown,
  status: number,
  cors: HeadersInit
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

function successAndCancelUrls(lang: "es" | "en"): {
  success_url: string;
  cancel_url: string;
} {
  if (lang === "en") {
    return {
      success_url:
        "https://yourbizupgraded.com/en/thanks?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://yourbizupgraded.com/en/#planes",
    };
  }
  return {
    success_url:
      "https://yourbizupgraded.com/gracias?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://yourbizupgraded.com/#planes",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowed = resolveAllowedOrigins(env);
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin, allowed);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, cors);
    }

    if (!env.STRIPE_SECRET_KEY) {
      return jsonResponse(
        { error: "Stripe is not configured on the server." },
        500,
        cors
      );
    }

    // Trim invisible whitespace/newlines that may have been pasted into the
    // secret. A trailing \n in the secret would corrupt the Authorization
    // header at the HTTP layer and Stripe's edge rejects it with an empty 400.
    const apiKey = env.STRIPE_SECRET_KEY.trim();

    let payload: CheckoutPayload;
    try {
      payload = (await request.json()) as CheckoutPayload;
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400, cors);
    }

    const priceIdMonthly =
      typeof payload.priceIdMonthly === "string"
        ? payload.priceIdMonthly
        : "";
    const priceIdSetup =
      typeof payload.priceIdSetup === "string" ? payload.priceIdSetup : "";
    const planName =
      typeof payload.planName === "string" && payload.planName.length <= 120
        ? payload.planName
        : "";
    const lang: "es" | "en" = payload.lang === "en" ? "en" : "es";

    if (
      !PRICE_ID_PATTERN.test(priceIdMonthly) ||
      !PRICE_ID_PATTERN.test(priceIdSetup)
    ) {
      return jsonResponse(
        { error: "Missing or malformed priceIdMonthly / priceIdSetup." },
        400,
        cors
      );
    }
    if (!planName) {
      return jsonResponse({ error: "Missing planName." }, 400, cors);
    }

    const { success_url, cancel_url } = successAndCancelUrls(lang);

    // Stripe API expects application/x-www-form-urlencoded with bracketed keys.
    const form = new URLSearchParams();
    form.set("mode", "subscription");
    form.set("success_url", success_url);
    form.set("cancel_url", cancel_url);
    form.set("allow_promotion_codes", "true");
    form.set("line_items[0][price]", priceIdSetup);
    form.set("line_items[0][quantity]", "1");
    form.set("line_items[1][price]", priceIdMonthly);
    form.set("line_items[1][quantity]", "1");
    form.set("metadata[plan_name]", planName);
    form.set("metadata[lang]", lang);
    form.set("subscription_data[metadata][plan_name]", planName);

    const requestBody = form.toString();

    let stripeRes: Response;
    try {
      stripeRes = await fetch(STRIPE_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "User-Agent": "stripe-checkout-automate/1.0",
        },
        body: requestBody,
      });
    } catch (err) {
      console.error("stripe fetch failed", err);
      return jsonResponse(
        { error: "Could not reach Stripe. Try again." },
        502,
        cors
      );
    }

    const rawText = await stripeRes.text();
    const responseHeaders: Record<string, string> = {};
    stripeRes.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });
    const contentType = responseHeaders["content-type"] ?? "";
    let data:
      | {
          url?: string;
          error?: {
            message?: string;
            type?: string;
            code?: string;
            param?: string;
          };
        }
      | null = null;
    try {
      data = JSON.parse(rawText) as typeof data;
    } catch {
      data = null;
    }

    if (!stripeRes.ok || !data?.url) {
      // Single-string log so wrangler tail --format pretty doesn't truncate.
      const debugBlob = JSON.stringify({
        status: stripeRes.status,
        statusText: stripeRes.statusText,
        contentType,
        responseHeaders,
        bodyLength: rawText.length,
        body: rawText.slice(0, 1500),
      });
      console.error(`STRIPE_DEBUG ${debugBlob}`);
      return jsonResponse(
        { error: "Could not start checkout. Try again." },
        502,
        cors
      );
    }

    return jsonResponse({ url: data.url }, 200, cors);
  },
};
