function toHex(buffer) {
  return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function verifyMetaSignature(rawBody, signatureHeader, appSecret) {
  if (!signatureHeader?.startsWith("sha256=") || !appSecret) return false;
  const supplied = signatureHeader.slice("sha256=".length).toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(supplied)) return false;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(appSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  return constantTimeEqual(supplied, toHex(mac));
}

export default {
  async fetch(request, env, ctx) {
    const verifyToken = env.META_VERIFY_TOKEN;
    const url = new URL(request.url);

    if (url.pathname.replace(/\/+$/, "") === "/health") {
      return new Response(JSON.stringify({ ok: true, service: "whatsapp-webhook" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (request.method === "GET") {
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");
      if (mode === "subscribe" && verifyToken && token === verifyToken) {
        return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } });
      }
      return new Response(null, { status: 403 });
    }

    if (request.method === "POST") {
      if (!env.META_APP_SECRET || !env.MAKE_WEBHOOK_URL || !env.MAKE_WEBHOOK_KEY) {
        console.error("whatsapp-webhook required secrets are not configured");
        return new Response(null, { status: 500 });
      }

      const declaredLength = Number(request.headers.get("Content-Length") ?? "0");
      if (Number.isFinite(declaredLength) && declaredLength > 1024 * 1024) {
        return new Response(null, { status: 413 });
      }

      const body = await request.text();
      if (new TextEncoder().encode(body).byteLength > 1024 * 1024) {
        return new Response(null, { status: 413 });
      }

      const valid = await verifyMetaSignature(
        body,
        request.headers.get("X-Hub-Signature-256"),
        env.META_APP_SECRET,
      );
      if (!valid) {
        console.warn("Rejected WhatsApp webhook with invalid signature");
        return new Response(null, { status: 401 });
      }

      ctx.waitUntil(
        fetch(env.MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-make-apikey": env.MAKE_WEBHOOK_KEY,
          },
          body,
        }).then((res) => {
          if (!res.ok) console.error("Make forwarding failed", res.status);
        }).catch((err) => console.error("Make forwarding error", err?.message || err)),
      );

      return new Response(null, { status: 200 });
    }

    return new Response(null, { status: 405 });
  },
};
