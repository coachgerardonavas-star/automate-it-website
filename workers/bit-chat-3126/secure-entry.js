import bit from "./index.js";

const MAX_BODY_BYTES = 64 * 1024;

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") return bit.fetch(request, env, ctx);

    const origin = request.headers.get("Origin");
    const allowed = (env.ALLOWED_ORIGIN || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (!origin || !allowed.includes(origin)) {
      return new Response(JSON.stringify({ error: "Origin not allowed" }), {
        status: 403,
        headers: { "Content-Type": "application/json", Vary: "Origin" },
      });
    }

    const ip = request.headers.get("CF-Connecting-IP");
    if (env.RATE_LIMITER && ip && !(await env.RATE_LIMITER.limit({ key: ip })).success) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": origin, Vary: "Origin" },
      });
    }

    const declaredLength = Number(request.headers.get("Content-Length") ?? "0");
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return new Response(JSON.stringify({ error: "Request body too large" }), {
        status: 413,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": origin, Vary: "Origin" },
      });
    }

    const copy = request.clone();
    const raw = await copy.arrayBuffer();
    if (raw.byteLength > MAX_BODY_BYTES) {
      return new Response(JSON.stringify({ error: "Request body too large" }), {
        status: 413,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": origin, Vary: "Origin" },
      });
    }

    return bit.fetch(request, env, ctx);
  },
};
