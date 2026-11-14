# WhatsApp webhook — runbook operativo

## Flujo

Meta Cloud API entrega el update al endpoint `workers.dev` de este Worker (sin ruta en el
dominio, ver comentario en `wrangler.toml`). El Worker verifica la firma y reenvía el body al
webhook de Make (hook 2466172, escenario "Marc — WhatsApp Agent").

## Seguridad — verificación de firma

Todo POST se autentica contra la cabecera `X-Hub-Signature-256` que manda Meta: HMAC-SHA256 del
body crudo con el App Secret de la app de Meta, comparado en tiempo constante. Si la firma no
coincide, el Worker responde `401` y no reenvía nada a Make. Si falta cualquiera de los tres
secretos requeridos, responde `500` (falla cerrado) en vez de reenviar sin validar.

Cualquier POST con `Content-Length` declarado o body real mayor a 1MB se rechaza con `413` antes
de calcular la firma, para no gastar CPU verificando HMAC sobre payloads abusivos. El reenvío a
Make queda instrumentado: si Make responde con error o la petición falla, el Worker lo deja en
los logs de Cloudflare (`console.error`), aunque la respuesta a Meta siga siendo `200` de inmediato
(Meta espera un 200 rápido; el reenvío corre en `ctx.waitUntil`).

## Despliegue

```bash
cd workers/whatsapp-webhook
npx wrangler secret put META_APP_SECRET     # App Secret de la app de Meta (Facebook for Developers)
npx wrangler secret put MAKE_WEBHOOK_URL    # URL del hook 2466172 de Make
npx wrangler secret put MAKE_WEBHOOK_KEY    # valor exigido en la cabecera x-make-apikey
npx wrangler deploy --config ./wrangler.toml
```

`META_VERIFY_TOKEN` también debe estar como secret: es el `hub.verify_token` que Meta usa al
suscribir el webhook (GET), y ya se requería antes de este cambio.
