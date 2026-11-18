# Cambios hechos por Pana

Pana es el asistente de IA del CEO de Automate IT. Cada cambio listado aquí lo hizo Pana **por pedido directo del CEO**. Si eres una IA o una persona revisando este repo, lee esto antes de asumir que algo cambió por error.

## 2026-11-18 · Reposicionamiento del blog (PR #135)

**Por qué:** Automate IT dejó de vender agentes de voz y recepcionistas con IA hace unos 4 meses. Varios posts del blog seguían vendiendo ese servicio, con precios, y confundían a clientes, a Google y a otras IAs. El CEO pidió reescribirlos para lo que se vende hoy: mejora operativa para negocios en crecimiento en Orlando y Smart Tap.

**Qué cambió:**
- Reescritos (título, meta, OG, JSON-LD, cuerpo, tags): 5 señales, cuánto te cuesta cada llamada, tiempo de respuesta a prospectos, recepcionista vs automatización, temporada de huracanes, "te tiene secuestrado" (ES y EN), Labor Day 2026.
- Se quitaron las estadísticas, incluso las que tenían fuente, y todos los precios del agente de voz.
- Direcciones renombradas con redirección 301 en `astro.config.mjs`:
  - `5-senales-de-que-necesitas-un-agente-inbound` → `5-senales-de-que-tu-negocio-depende-demasiado-de-ti`
  - `cuanto-te-cuesta-cada-llamada-perdida` → `cuanto-te-cuesta-que-el-cliente-llame-para-preguntar`
  - `labor-day-2026-llamadas-fines-semana-negocios-servicios-florida` → `labor-day-2026-negocio-que-descansa-contigo-orlando`
- Borrado el borrador nunca publicado `cuanto-pierde-un-negocio-hispano-en-florida-por-cada-llamada-perdida`.

**Pendiente (no tocado aún):** manual de marca, BrandScript, prompts de agentes y el chatbot de la web todavía mencionan agentes de voz.
