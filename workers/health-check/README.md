# health-check

Cloudflare Worker que monitorea 3 servicios cada 15 minutos. Si alguno deja de responder con 200, alerta a Telegram. Cuando vuelve a responder, manda un mensaje de recuperación con el tiempo de caída.

## Servicios monitoreados

| Servicio | Cómo se chequea |
|---|---|
| `yourbizupgraded.com` | GET público |
| `bit-chat-3126` | Service binding `BIT_CHAT`, path `/health` |
| `stripe-checkout-automate` | Service binding `STRIPE_CHECKOUT`, path `/health` |

Los dos workers internos usan service bindings porque Cloudflare bloquea worker-to-worker fetch vía `workers.dev` en la misma cuenta (devuelve 404).

## Configuración

| Tipo | Nombre | Valor |
|---|---|---|
| Secret | `TELEGRAM_BOT_TOKEN` | Token del bot que envía alertas |
| KV binding | `STATE` | Namespace `8306bbe9f0314af5aa44172601442a21` |
| Service binding | `BIT_CHAT` | Worker `bit-chat-3126` |
| Service binding | `STRIPE_CHECKOUT` | Worker `stripe-checkout-automate` |
| Constante en código | `TELEGRAM_CHAT_ID` | `8348522203` |
| Constante en código | `FETCH_TIMEOUT_MS` | `10000` |

## KV state machine

Una key por servicio: `state:<key>` con valor `{status: "ok"|"down", since: ISO8601}`.

Transiciones:
- `ok → down` → envía 🔴 ALERTA, persiste `{status: "down", since: now}`
- `down → ok` → envía 🟢 RECUPERADO con downtime calculado, persiste `{status: "ok", since: now}`
- Sin transición → no escribe (preserva el `since` original durante outage)
- Primera ejecución de un servicio (sin estado previo) → asume `ok`, escribe inicial

## Formato de mensajes (Manual Maestro 12D)

```
🔴 ALERTA — [servicio]
Timestamp: [hora EST]
Qué falló: HTTP X / Timeout / Network error
Impacto: [...]
Estado fallback: activo / inactivo
Acción requerida: [...]
```

```
🟢 RECUPERADO — [servicio]
Timestamp: [hora EST]
Qué se recuperó: el servicio responde 200 OK
Tiempo caído: Xh Ym
Estado actual: operativo
```

## Schedule

Cron `*/15 * * * *`. Mínimo del plan Free de Cloudflare.

## Deploy

```powershell
$env:NODE_OPTIONS = "--use-system-ca"
cd workers/health-check
npx -y wrangler@latest deploy
```

## Inspección operativa

```powershell
# Estado actual del KV (--remote = producción, sin él = local emulator)
npx -y wrangler@latest kv key list --binding STATE --remote
npx -y wrangler@latest kv key get --binding STATE --remote "state:yourbizupgraded"

# Logs en vivo
npx -y wrangler@latest tail health-check

# Forzar trigger inmediato (sin esperar 15 min):
# Cloudflare dashboard → Workers & Pages → health-check → Settings → Triggers
# → "Send test scheduled event"
```

## Notas

- `workers_dev = false` + `preview_urls = false` — sin URL pública. Solo cron o test manual.
- Plan Free: 100K KV reads + 1K writes/día. Uso real: ~192 reads + 0-192 writes/día.
- Chat_id de Telegram hardcoded. Para multi-destinatario habría que fan-out en `sendTelegram()`.
