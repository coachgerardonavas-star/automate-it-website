import assert from "node:assert/strict";

const base = (process.env.SMOKE_BASE_URL || "http://127.0.0.1:8788").replace(/\/$/, "");
const realArticle = "/blog/labor-day-2026-llamadas-fines-semana-negocios-servicios-florida/";

async function request(path) {
  return fetch(base + path, { redirect: "manual" });
}

async function expectStatus(path, status) {
  const response = await request(path);
  assert.equal(response.status, status, `${path}: expected ${status}, got ${response.status}`);
  return response;
}

function expectSecurityHeaders(response, path) {
  assert.equal(response.headers.get("x-content-type-options"), "nosniff", `${path}: missing nosniff`);
  assert.ok(response.headers.get("strict-transport-security"), `${path}: missing HSTS`);
  assert.ok(response.headers.get("referrer-policy"), `${path}: missing referrer policy`);
  assert.ok(response.headers.get("permissions-policy"), `${path}: missing permissions policy`);
}

expectSecurityHeaders(await expectStatus("/", 200), "/");
await expectStatus("/blog/", 200);
await expectStatus(realArticle, 200);

const portal = await expectStatus("/portal/", 302);
assert.equal(new URL(portal.headers.get("location"), base).pathname, "/portal/login");
const login = await expectStatus("/portal/login", 200);
expectSecurityHeaders(login, "/portal/login");
assert.match(login.headers.get("cache-control") || "", /no-store/);
assert.equal(login.headers.get("x-frame-options"), "DENY");

// Representative protected SSR routes must resolve through the Worker and
// redirect unauthenticated requests, never disappear into a static 404.
for (const path of [
  "/portal/activity",
  "/portal/appointments",
  "/portal/automations",
  "/portal/customers",
  "/portal/files",
  "/portal/insights",
  "/portal/leads",
  "/portal/reports",
  "/portal/settings",
]) {
  const response = await expectStatus(path, 302);
  assert.equal(new URL(response.headers.get("location"), base).pathname, "/portal/login");
}

console.log(`Cloudflare runtime smoke passed against ${base}`);
