const SERVICES = [
  {
    key: "yourbizupgraded",
    name: "yourbizupgraded.com",
    url: "https://yourbizupgraded.com",
    impact: "Sitio público inaccesible — leads y conversiones bloqueados.",
    fallback: "inactivo",
    action: "Revisar Cloudflare dashboard y logs del sitio.",
  },
  {
    key: "bit-chat-3126",
    name: "bit-chat-3126 (Worker BIT)",
    binding: "BIT_CHAT",
    path: "/health",
    impact:
      "Chatbot BIT no responde — los visitantes ven mensaje de error en el widget.",
    fallback:
      "activo (chatbot muestra mensaje de error con email automateit@yourbizupgraded.com).",
    action: "Revisar logs del worker en Cloudflare y estado de Anthropic.",
  },
  {
    key: "stripe-checkout",
    name: "Stripe Checkout Worker",
    binding: "STRIPE_CHECKOUT",
    path: "/health",
    impact:
      "Cobros en vivo bloqueados — no se pueden contratar nuevos planes.",
    fallback: "inactivo (sin checkout, no hay forma alternativa de cobrar).",
    action:
      "URGENTE (Tier 0) — revisar logs del worker, dashboard de Cloudflare y status de Stripe.",
  },
];

const TELEGRAM_CHAT_ID = "8348522203";
const FETCH_TIMEOUT_MS = 10000;
// Fallos consecutivos requeridos antes de alertar. Con cron */15, exige que el
// servicio falle 2 ticks seguidos (~15 min) y así evita falsos positivos por
// blips de red o edges fríos. Una caída real igual avisa, solo ~1 ciclo después.
const CONFIRMATION_THRESHOLD = 2;

export default {
  async scheduled(_event, env, _ctx) {
    await Promise.all(SERVICES.map((svc) => checkService(svc, env)));
  },
};

async function checkService(svc, env) {
  try {
    const result = await pingService(svc, env);
    const isDown = !result.ok;
    const stateKey = `state:${svc.key}`;
    const stored = await env.STATE.get(stateKey, { type: "json" });
    const previousState = stored?.status ?? "ok";
    const previousFails = stored?.fails ?? 0;
    const nowIso = new Date().toISOString();

    // El servicio estaba considerado operativo.
    if (previousState === "ok") {
      if (!isDown) {
        // Sigue sano: limpia cualquier racha de fallos pendiente.
        if (!stored || previousFails !== 0) {
          await env.STATE.put(
            stateKey,
            JSON.stringify({
              status: "ok",
              since: stored?.since ?? nowIso,
              fails: 0,
            }),
          );
        }
        return;
      }

      // Falló estando "ok": cuenta el fallo y solo alerta tras N consecutivos.
      const fails = previousFails + 1;
      if (fails >= CONFIRMATION_THRESHOLD) {
        await sendAlert(env, svc, result, nowIso);
        await env.STATE.put(
          stateKey,
          JSON.stringify({ status: "down", since: nowIso, fails }),
        );
      } else {
        // Fallo no confirmado todavía: registra la racha sin alertar.
        await env.STATE.put(
          stateKey,
          JSON.stringify({
            status: "ok",
            since: stored?.since ?? nowIso,
            fails,
          }),
        );
      }
      return;
    }

    // El servicio estaba considerado caído: solo actúa si se recuperó.
    if (!isDown) {
      await sendRecovery(env, svc, stored?.since, nowIso);
      await env.STATE.put(
        stateKey,
        JSON.stringify({ status: "ok", since: nowIso, fails: 0 }),
      );
    }
    // Sigue caído: ya se alertó, no se hace nada hasta que recupere.
  } catch (err) {
    console.error(
      `checkService failed for ${svc.key}: ${err?.message || err?.name || err}`,
    );
  }
}

async function pingService(svc, env) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    let resp;
    if (svc.binding) {
      const binding = env[svc.binding];
      if (!binding) {
        clearTimeout(timer);
        return {
          ok: false,
          status: 0,
          reason: `Service binding "${svc.binding}" not configured`,
        };
      }
      const req = new Request(`https://internal${svc.path || "/"}`, {
        method: "GET",
        signal: ctrl.signal,
      });
      resp = await binding.fetch(req);
    } else {
      resp = await fetch(svc.url, {
        method: "GET",
        signal: ctrl.signal,
        redirect: "follow",
        cf: { cacheTtl: 0, cacheEverything: false },
      });
    }
    clearTimeout(timer);
    return {
      ok: resp.status === 200,
      status: resp.status,
      reason: `HTTP ${resp.status}`,
    };
  } catch (err) {
    clearTimeout(timer);
    const reason =
      err.name === "AbortError"
        ? `Timeout (${FETCH_TIMEOUT_MS / 1000}s)`
        : `Network error: ${err.message || err.name}`;
    return { ok: false, status: 0, reason };
  }
}

function formatEst(iso) {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return `${formatter.format(new Date(iso))} EST`;
}

function formatDuration(ms) {
  if (!Number.isFinite(ms) || ms < 0) return "desconocido";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${totalSeconds}s`;
}

async function sendAlert(env, svc, result, nowIso) {
  const text = [
    `🔴 ALERTA — ${svc.name}`,
    `Timestamp: ${formatEst(nowIso)}`,
    `Qué falló: ${result.reason}`,
    `Impacto: ${svc.impact}`,
    `Estado fallback: ${svc.fallback}`,
    `Acción requerida: ${svc.action}`,
  ].join("\n");
  await sendTelegram(env, text);
}

async function sendRecovery(env, svc, previousSinceIso, nowIso) {
  const downtime = previousSinceIso
    ? formatDuration(new Date(nowIso) - new Date(previousSinceIso))
    : "desconocido";
  const text = [
    `🟢 RECUPERADO — ${svc.name}`,
    `Timestamp: ${formatEst(nowIso)}`,
    `Qué se recuperó: el servicio responde 200 OK`,
    `Tiempo caído: ${downtime}`,
    `Estado actual: operativo`,
  ].join("\n");
  await sendTelegram(env, text);
}

async function sendTelegram(env, text) {
  if (!env.TELEGRAM_BOT_TOKEN) {
    console.error("TELEGRAM_BOT_TOKEN not configured");
    return;
  }
  try {
    const resp = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          disable_web_page_preview: true,
        }),
      },
    );
    if (!resp.ok) {
      const detail = await resp.text().catch(() => "");
      console.error(
        `Telegram send failed: ${resp.status} ${detail.slice(0, 200)}`,
      );
    }
  } catch (err) {
    console.error(`Telegram send error: ${err.message || err.name}`);
  }
}
