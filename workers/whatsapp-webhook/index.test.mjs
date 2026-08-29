import assert from "node:assert/strict";
import test from "node:test";
import worker from "./index.js";

async function signature(body, secret) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return "sha256=" + Array.from(new Uint8Array(mac), (b) => b.toString(16).padStart(2, "0")).join("");
}

test("rejects an unsigned payload without forwarding it", async () => {
  const originalFetch = globalThis.fetch;
  let forwarded = false;
  globalThis.fetch = async () => { forwarded = true; return new Response(null, { status: 200 }); };
  try {
    const response = await worker.fetch(
      new Request("https://worker.example/", { method: "POST", body: "{}" }),
      { META_APP_SECRET: "secret", MAKE_WEBHOOK_URL: "https://example.invalid", MAKE_WEBHOOK_KEY: "key" },
      { waitUntil() {} },
    );
    assert.equal(response.status, 401);
    assert.equal(forwarded, false);
  } finally { globalThis.fetch = originalFetch; }
});

test("forwards an authentic payload", async () => {
  const body = '{"object":"whatsapp_business_account"}';
  const secret = "meta-secret";
  const originalFetch = globalThis.fetch;
  let forwarded;
  globalThis.fetch = async (url, init) => { forwarded = { url, init }; return new Response(null, { status: 202 }); };
  let pending;
  try {
    const response = await worker.fetch(
      new Request("https://worker.example/", { method: "POST", body, headers: { "X-Hub-Signature-256": await signature(body, secret) } }),
      { META_APP_SECRET: secret, MAKE_WEBHOOK_URL: "https://example.invalid/hook", MAKE_WEBHOOK_KEY: "key" },
      { waitUntil(promise) { pending = promise; } },
    );
    await pending;
    assert.equal(response.status, 200);
    assert.equal(forwarded.url, "https://example.invalid/hook");
    assert.equal(forwarded.init.body, body);
  } finally { globalThis.fetch = originalFetch; }
});
