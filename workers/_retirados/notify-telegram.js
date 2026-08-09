/**
 * notify-telegram — RETIRADO el 9-ago-2026.
 *
 * Qué hacía: recibía el POST del formulario de diagnóstico y mandaba un aviso
 * a Telegram. Lo llamaba `public/diagnostico.html`, el HTML estático que se
 * eliminó el 7-ago-2026 tras descubrir que llevaba 2.5 meses tapando la ruta
 * real de Astro.
 *
 * Por qué se retira: cero referencias en el código de ambos repos, y el
 * health-check no lo vigilaba. Su función la absorbió `diagnostico-intake`,
 * que además escribe en HubSpot por CRM API en vez de por la Forms API v3.
 *
 * Se conserva el código aquí porque no existía fuente en ningún repo — solo
 * vivía desplegado en Cloudflare. Si alguna vez hace falta, se redespliega
 * con `wrangler deploy` y un secreto TELEGRAM_TOKEN.
 *
 * Nota de la época: esperaba los campos `firstName`, `lastName`, `bizType` y
 * `mainProblem`, que NO son los que mandaba el formulario estático (`message`,
 * `urgency`, `hipaa`). Es decir, los avisos de Telegram probablemente salían
 * con campos vacíos o "undefined". No verificado, pero la forma no coincide.
 */

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const data = await request.json();
    const TELEGRAM_TOKEN = env.TELEGRAM_TOKEN;
    const CHAT_ID = '8348522203';

    const hipaaBadge = data.hipaa === 'true' ? '🔒 HIPAA requerido' : '';

    const mensaje = `
🔔 *Nuevo lead — Diagnóstico Gratuito*

👤 *Nombre:* ${data.firstName} ${data.lastName}
📧 *Email:* ${data.email}
📞 *Teléfono:* ${data.phone || 'No proporcionó'}
🏢 *Tipo de negocio:* ${data.bizType}
⚡ *Problema principal:* ${data.mainProblem}
🗓 *Urgencia:* ${data.urgency}
${hipaaBadge}

💬 *Mensaje:* ${data.message || 'Sin mensaje adicional'}

🔗 [Ver contacto en HubSpot](https://app.hubspot.com/contacts/245810986/objects/0-1/views/all/list)

📍 Fuente: ${data.source || 'direct'}
🕐 ${new Date().toLocaleString('es-US', { timeZone: 'America/New_York' })}
    `.trim();

    const tgRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: mensaje,
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        }),
      }
    );

    const tgBody = await tgRes.json();

    return new Response(JSON.stringify({ ok: true, tg: tgBody }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
};
