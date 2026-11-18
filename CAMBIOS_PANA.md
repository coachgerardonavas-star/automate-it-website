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

## 18-nov-2026 — Arreglo del build del PR #135
- Quitada la redirección duplicada con barra final de `labor-day-2026-llamadas-fines-semana-negocios-servicios-florida/` en `astro.config.mjs`: chocaba con la versión sin barra (colisión de ruta en Astro) y rompía el build de Workers. La redirección sin barra sigue cubriendo el slug viejo.
- `npm audit` falla también en `main` (dependencias vulnerables previas); no es de este PR y no se tocó.

## 18-nov-2026 — Slug del post "Antes de contratar a alguien más"
- Renombrado `recepcionista-vs-automatizacion-costo-real-florida-2026` → `antes-de-contratar-que-revisar-en-tu-operacion` para que la dirección coincida con el título nuevo y no hable de recepcionistas.
- Una sola redirección 301 (sin duplicado con barra final) en `astro.config.mjs`. No había enlaces internos al slug viejo.

## 2026-11-18 · Limpieza de posicionamiento de voz en docs y prompts (PR #136)

**Quién lo pidió:** el CEO. Pana hizo este cambio por pedido del CEO.

**Por qué:** Automate IT dejó de vender agentes de voz / recepcionistas con IA hace ~4 meses. Docs internos y el prompt del chatbot seguían presentando ese servicio. Oferta actual: mejora operativa (el negocio deja de depender del dueño) + Smart Tap. "No contestamos tus llamadas por ti."

**Qué cambió:**
- `workers/bit-chat-3126/index.js`: BIT ya no usa heurísticas de llamadas ni la comparación con recepcionista; dice claro que no contestamos llamadas ni vendemos agentes de voz. Precios sin cambio. Requiere `wrangler deploy` manual para llegar a producción.
- `workers/bit-chat-3126/SYSTEM_PROMPT_draft.md`: marcado como borrador obsoleto, líneas de voz retiradas.
- `src/i18n/translations.ts`: secciones heredadas (resultados, banda, agentes, bit, FAQ, para quién) sin cifras de llamadas perdidas, sin `agent.tony@receptionist`, sin Retell ni precio de voz.
- `generar-banco.js`: prompts de imágenes de llamadas/recepción reemplazados por temas de operación.
- `BrandScript_Automate_IT_v1_1.md`, `GUION_DE_ENTRADA.md`, `MANUAL_MAESTRO_v4_9.md`, `Manual_de_Marca_v2_5.docx`, `Quienes_Somos_v2_9.docx`: one-liner, problema, plan, heurísticas y "lo que somos" alineados a la oferta actual.

**PR:** https://github.com/coachgerardonavas-star/automate-it-website/pull/136
