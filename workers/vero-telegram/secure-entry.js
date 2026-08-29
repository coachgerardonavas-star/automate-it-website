import vero from "./index.js";

function constantTimeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export default {
  async fetch(request, env, ctx) {
    // Keep GET probes working. Telegram update delivery always uses POST.
    if (request.method !== "POST") return vero.fetch(request, env, ctx);

    if (!env.TELEGRAM_WEBHOOK_SECRET) {
      console.error("TELEGRAM_WEBHOOK_SECRET not configured");
      return new Response("Server not configured", { status: 500 });
    }

    const supplied = request.headers.get("X-Telegram-Bot-Api-Secret-Token") || "";
    if (!constantTimeEqual(supplied, env.TELEGRAM_WEBHOOK_SECRET)) {
      console.warn("vero-telegram: rejected unauthenticated webhook request");
      return new Response("Unauthorized", { status: 401 });
    }

    return vero.fetch(request, env, ctx);
  },
};
