const MODEL = "claude-sonnet-5";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const MAX_TOKENS = 1000;
const MAX_SYSTEM_LENGTH = 8000;
const MAX_MESSAGE_LENGTH = 8000;

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const allowedOrigins = (env.ALLOWED_ORIGIN || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const allowOrigin =
      origin && allowedOrigins.includes(origin) ? origin : null;

    const corsHeaders = {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Committee-Key",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
      ...(allowOrigin ? { "Access-Control-Allow-Origin": allowOrigin } : {}),
    };

    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/health") {
      return json({ status: "ok" }, 200, corsHeaders);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, corsHeaders);
    }

    if (!env.ANTHROPIC_KEY) {
      return json({ error: "Server misconfigured: ANTHROPIC_KEY not set" }, 500, corsHeaders);
    }

    if (!env.COMMITTEE_KEY) {
      return json({ error: "Server misconfigured: COMMITTEE_KEY not set" }, 500, corsHeaders);
    }

    const providedKey = request.headers.get("X-Committee-Key");
    if (providedKey !== env.COMMITTEE_KEY) {
      return json({ error: "Unauthorized" }, 401, corsHeaders);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400, corsHeaders);
    }

    const { system, message } = body || {};

    if (typeof system !== "string" || system.length === 0) {
      return json({ error: "Missing or empty 'system' field" }, 400, corsHeaders);
    }
    if (typeof message !== "string" || message.length === 0) {
      return json({ error: "Missing or empty 'message' field" }, 400, corsHeaders);
    }
    if (system.length > MAX_SYSTEM_LENGTH) {
      return json({ error: `'system' exceeds ${MAX_SYSTEM_LENGTH} characters` }, 400, corsHeaders);
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return json({ error: `'message' exceeds ${MAX_MESSAGE_LENGTH} characters` }, 400, corsHeaders);
    }

    let upstream;
    try {
      upstream = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_KEY,
          "anthropic-version": ANTHROPIC_VERSION,
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system,
          messages: [{ role: "user", content: message }],
        }),
      });
    } catch {
      return json({ error: "Failed to reach Anthropic API" }, 502, corsHeaders);
    }

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      return json(
        {
          error: `Anthropic API returned ${upstream.status}`,
          detail: detail.slice(0, 500),
        },
        502,
        corsHeaders,
      );
    }

    let data;
    try {
      data = await upstream.json();
    } catch {
      return json({ error: "Invalid JSON response from Anthropic" }, 502, corsHeaders);
    }

    const reply = Array.isArray(data.content)
      ? data.content
          .filter((b) => b && b.type === "text" && typeof b.text === "string")
          .map((b) => b.text)
          .join("")
      : "";

    if (!reply) {
      return json({ error: "Empty reply from Anthropic" }, 502, corsHeaders);
    }

    return json({ reply }, 200, corsHeaders);
  },
};

function json(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}
