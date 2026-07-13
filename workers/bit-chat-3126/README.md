# bit-chat-3126

Cloudflare Worker que sirve el chatbot BIT. Recibe el historial de conversación, lo pasa a Claude Haiku 4.5 con un system prompt embebido, y devuelve la respuesta.

## Endpoints

| Método | Path | Descripción |
|---|---|---|
| `POST` | `/` | Body `{messages: [{role, content}]}` → respuesta `{reply: string}` |
| `GET` | `/health` | Returns `{status: "ok"}` con 200. Lo usa `health-check` para monitoreo |
| `OPTIONS` | cualquier | Preflight CORS |

## Configuración

| Tipo | Nombre | Valor |
|---|---|---|
| Secret | `ANTHROPIC_KEY` | API key de Anthropic |
| Var | `ALLOWED_ORIGIN` | CSV de orígenes permitidos para CORS |
| Constante | Modelo | `claude-haiku-4-5-20251001` |
| Constante | `MAX_TOKENS` | `1024` (output) |
| Constante | `MAX_HISTORY` | `10` (mensajes pasados que se envían a Anthropic) |

`ALLOWED_ORIGIN` actual: `https://yourbizupgraded.com,http://localhost:4321,http://127.0.0.1:4321`.

## Comportamiento

- **Modelo:** Claude Haiku 4.5. Speed/cost optimizado, sin extended thinking (no soportado en Haiku).
- **Historial:** se truncan los mensajes a los últimos 10 antes de enviar. Si el primero queda en `role: "assistant"`, se descarta hasta que el array empiece con `role: "user"` (requisito de Anthropic).
- **System prompt:** array de tres bloques en `index.js` — `VOICE_PROFILE`, `ANTI_AI_WRITING_STYLE` (contenido embebido de los .md homónimos en esta carpeta) y `SYSTEM_PROMPT` (planes, módulos, escalation a humano, ventana de soporte 24h/4h, política de cancelación). Cualquier cambio requiere redeploy.
- **Cache control:** `ephemeral` en los tres bloques del system array (breakpoints independientes). Haiku 4.5 tiene minimum cacheable de 4096 tokens; con los tres bloques combinados el prompt ya lo supera, así que el cache sí activa.
- **Sin streaming:** el widget cliente espera respuesta completa. Latency típica: 2-5s.

## Cliente que consume

Widget [ChatbotWidget.astro](../../src/components/ChatbotWidget.astro) usa la constante `BIT_WORKER_URL` en [src/config/site.ts](../../src/config/site.ts) que apunta a este worker.

## Deploy

```powershell
$env:NODE_OPTIONS = "--use-system-ca"
cd workers/bit-chat-3126
npx -y wrangler@latest deploy
```

## Smoke tests

```powershell
# Health endpoint
curl https://bit-chat-3126.coachgerardonavas.workers.dev/health
# Esperado: {"status":"ok"}

# Flow completo (Origin debe estar en ALLOWED_ORIGIN)
curl -X POST https://bit-chat-3126.coachgerardonavas.workers.dev `
  -H "Content-Type: application/json" `
  -H "Origin: http://localhost:4321" `
  -d '{"messages":[{"role":"user","content":"Hola"}]}'
# Esperado: {"reply":"..."}
```

## Operaciones

```powershell
# Logs en vivo
npx -y wrangler@latest tail bit-chat-3126

# Rotar API key
npx -y wrangler@latest secret put ANTHROPIC_KEY --name bit-chat-3126

# Listar secrets
npx -y wrangler@latest secret list --name bit-chat-3126
```

## Modificar el system prompt

Está como template literal al inicio de `index.js`. Para cambios:

1. Editar la constante `SYSTEM_PROMPT` en `index.js`
2. Redeploy con `npx wrangler@latest deploy`
3. La nueva versión recibe la próxima request — no hay invalidación de caché que esperar

El archivo [SYSTEM_PROMPT_draft.md](./SYSTEM_PROMPT_draft.md) es la versión histórica/draft. **No se carga automáticamente** — es solo referencia para revisar antes de editar el embedded.

[voice-profile.md](./voice-profile.md) y [anti-ai-writing-style.md](./anti-ai-writing-style.md) tampoco se cargan automáticamente (Cloudflare Workers no lee archivos en runtime) — su contenido está duplicado como las constantes `VOICE_PROFILE` y `ANTI_AI_WRITING_STYLE` en `index.js`. Si se edita uno de estos .md, hay que copiar el cambio a la constante correspondiente y redeploy.

## Costo estimado

| Item | Cantidad por exchange |
|---|---|
| Input tokens | ~1.5K (system prompt + history capeado a 10 msgs) |
| Output tokens | ~200 (replies cortas por design) |
| Costo Haiku 4.5 | ~$0.0025 por exchange |

A 1000 exchanges/mes ≈ $2.50 en Anthropic.

## Limitaciones conocidas

- Plan Free de Cloudflare: 100K requests/día. El widget = 1 request por mensaje.
- Si la conversación crece >10 mensajes, los anteriores se truncan server-side. El widget client-side no muestra eso — el usuario no nota la pérdida de contexto.
- Sin auth/rate-limit por usuario. Cualquiera con un Origin permitido puede invocar. Para producción agresiva habría que agregar rate-limit por IP en el worker.
