# ai-committee

Cloudflare Worker que hace de proxy hacia Claude para el componente "Comité de Asesores IA" (`ai-committee-automate-it.jsx`, uso interno local). Recibe un system prompt y un mensaje, llama a Claude Sonnet, y devuelve la respuesta. La API key de Anthropic vive solo en el Worker — nunca en el navegador.

## Endpoints

| Método | Path | Descripción |
|---|---|---|
| `POST` | `/` | Body `{system: string, message: string}` → respuesta `{reply: string}` |
| `GET` | `/health` | Returns `{status: "ok"}` con 200 |
| `OPTIONS` | cualquier | Preflight CORS |

## Configuración

| Tipo | Nombre | Valor |
|---|---|---|
| Secret | `ANTHROPIC_KEY` | API key de Anthropic |
| Secret | `COMMITTEE_KEY` | Clave compartida que debe mandar el cliente en el header `X-Committee-Key`. Solo para evitar que alguien use el endpoint si la URL se filtra — no es autenticación de usuario. |
| Var | `ALLOWED_ORIGIN` | CSV de orígenes permitidos para CORS. Por defecto solo localhost (herramienta interna). |
| Constante | Modelo | `claude-sonnet-4-6` |
| Constante | `MAX_TOKENS` | `1000` (output) |

## Comportamiento

- Un solo turno por llamada (no historial) — cada asesor del comité es una consulta independiente con su propio system prompt.
- Requiere `X-Committee-Key` correcto en el header, además del Origin permitido. Sin este header, responde 401.
- Sin streaming.

## Deploy

```powershell
$env:NODE_OPTIONS = "--use-system-ca"
cd workers/ai-committee
npx -y wrangler@latest deploy
```

## Secrets (primera vez)

```powershell
npx -y wrangler@latest secret put ANTHROPIC_KEY --name ai-committee
npx -y wrangler@latest secret put COMMITTEE_KEY --name ai-committee
```

## Smoke tests

```powershell
curl https://ai-committee.coachgerardonavas.workers.dev/health
# Esperado: {"status":"ok"}

curl -X POST https://ai-committee.coachgerardonavas.workers.dev `
  -H "Content-Type: application/json" `
  -H "Origin: http://localhost:5173" `
  -H "X-Committee-Key: <la clave>" `
  -d '{"system":"Responde solo con la palabra OK.","message":"hola"}'
# Esperado: {"reply":"OK"}
```

## Cliente que consume

[ai-committee-automate-it.jsx](../../../Downloads/ai-committee-automate-it.jsx) (fuera del repo del sitio — herramienta interna, no parte de yourbizupgraded.com).

## Si cambia el puerto de desarrollo local

Agregar el origin nuevo a `ALLOWED_ORIGIN` en `wrangler.toml` y redeploy.
