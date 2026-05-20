const BIT_URL = "https://bit-chat-3126.coachgerardonavas.workers.dev";
const HUBSPOT_PORTAL_ID = "245810986";
const HUBSPOT_FORM_GUID = "c3800beb-7430-4f16-bb9e-c1989b9ebf37";
const HUBSPOT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;
const TELEGRAM_CHAT_ID = "8348522203";
const CHECK_TIMEOUT_MS = 10_000;

async function withTimeout(promise, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await promise(ctrl.signal);
  } finally {
    clearTimeout(t);
  }
}

async function checkBit() {
  try {
    const res = await withTimeout(
      (signal) =>
        fetch(BIT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: "healthcheck ping" }],
          }),
          signal,
        }),
      CHECK_TIMEOUT_MS
    );
    return res.ok ? "ok" : "fail";
  } catch {
    return "fail";
  }
}

async function checkHubspot() {
  try {
    const res = await withTimeout(
      (signal) =>
        fetch(HUBSPOT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fields: [] }),
          signal,
        }),
      CHECK_TIMEOUT_MS
    );
    // HubSpot returns 400 for an empty fields array, which proves the
    // endpoint is reachable. Only 5xx or network errors count as down.
    if (res.status >= 500) return "fail";
    return "ok";
  } catch {
    return "fail";
  }
}

function nowEst() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

async function sendTelegramAlert(env, service, timestampEst) {
  if (!env.TELEGRAM_BOT_TOKEN) return;
  const text =
    `🔴 HEALTH CHECK ALERT — Automate IT\n` +
    `Timestamp: ${timestampEst} EST\n` +
    `Service: ${service}\n` +
    `Status: DOWN\n` +
    `Action: Review immediately at dash.cloudflare.com`;
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      disable_web_page_preview: true,
    }),
  });
}

async function runChecks(env) {
  const [bit, hubspot] = await Promise.all([checkBit(), checkHubspot()]);
  const timestamp = nowEst();
  const failures = [];
  if (bit === "fail") failures.push("BIT");
  if (hubspot === "fail") failures.push("HubSpot");
  if (failures.length > 0) {
    await Promise.all(
      failures.map((service) => sendTelegramAlert(env, service, timestamp))
    );
  }
  return { bit, hubspot, timestamp };
}

export default {
  async fetch(_request, env) {
    const summary = await runChecks(env);
    return new Response(JSON.stringify(summary), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(runChecks(env));
  },
};
