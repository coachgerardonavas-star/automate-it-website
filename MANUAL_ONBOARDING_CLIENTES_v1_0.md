# MANUAL DE ONBOARDING Y CICLO DE VIDA DEL CLIENTE — v1.0

**Vigente desde:** 13 de agosto, 2026
**Dueño del documento:** CEO, Automate IT
**Alcance:** todo cliente que contrata un plan de Automate IT (Starter / Professional + módulos). No cubre la oferta "Consultoría de Negocios para Emprendedores" (esa vive en `/consultoria` y `/acuerdo-colaboracion`, documentada aparte en `CLAUDE.md`).

## Propósito

Este documento responde una sola pregunta: **¿qué pasa, en orden, desde que un prospecto paga hasta que su contrato termina?**

No existía antes de esta versión. Se construyó juntando lo que sí está confirmado en el código, los workers y `MANUAL_MAESTRO_v4_9.md` — y marcando explícitamente lo que **todavía no está definido**, en vez de inventarlo. Regla del proyecto: "verificable sobre inteligente" (`MANUAL_MAESTRO_v4_9.md`, sección 5).

Cada etapa indica:
- **Qué pasa** — el mecanismo real, con el archivo/worker que lo ejecuta.
- **Quién lo hace** — humano (CEO/Arquitecto) o automatizado.
- **Estado** — ✅ confirmado y en uso · ⚠️ parcial/manual · 🔴 sin definir.

---

## Vista rápida (7 etapas)

1. Diagnóstico (pre-venta)
2. Propuesta
3. Cierre y pago
4. Setup técnico y acceso
5. Go-live
6. Servicio activo
7. Renovación o fin de contrato

---

## 1. Diagnóstico — ✅ confirmado

**Qué pasa:** el prospecto entra por `/diagnostico` (o `/en/diagnostic`), llena `DiagnosticoForm`. El lead se registra en HubSpot.
**Quién lo hace:** automatizado (formulario del sitio).
**Dónde vive:** `src/components/DiagnosticoForm.astro`, `src/lib/hubspot.ts` (Forms API v3 — solo para los 3 formularios legacy de pre-venta; todo lo nuevo va por CRM API, ver `CLAUDE.md`).

## 2. Propuesta — ⚠️ parcial (manual)

**Qué pasa:** el CEO o el Arquitecto arma la propuesta comercial a partir del catálogo (plan base + módulos, ver `CLAUDE.md` → "Catálogo").
**Quién lo hace:** humano. Nivel 2 de revisión según `MANUAL_MAESTRO_v4_9.md` sección "Niveles de participación" (CEO revisa borrador y ajusta).
**Gap:** no hay plantilla ni checklist estandarizado de propuesta en este repo. 🔴 **Pendiente de definir.**

## 3. Cierre y pago — ⚠️ parcial

**Qué pasa confirmado:** el worker `stripe-checkout-automate` procesa el pago; `stripe-webhook-automate` escucha `checkout.session.completed` y avisa por Telegram. Un deal existe en el pipeline HubSpot **"Ventas"**, etapa de entrada **"Calificado"** (`presentationscheduled`).
**Quién lo hace:** automatizado en el cobro; el deal se mueve manualmente por etapas de venta.
**Gap:** el catálogo estándar (Starter/Professional + módulos) no tiene, en este repo, un link de checkout público equivalente al de `/consultoria` (`prefilled_promo_code`). No está documentado cómo se genera el cobro para un cliente nuevo del catálogo estándar (¿invoice manual en Stripe? ¿link ad hoc?). 🔴 **Pendiente de definir.**
**Regla crítica ya vigente:** un cobro de $0 por cupón 100% reporta `payment_status: "paid"` en Stripe — nunca filtrar por `payment_status` para distinguir cortesía de pago real; usar `amount_total === 0`.

## 4. Setup técnico y acceso — ✅ confirmado (parte técnica) + procedimiento nuevo (aislamiento por cliente)

**Qué pasa:** por cada cliente se configura, según el plan contratado:
- Retell AI (voz) — agente propio, número E.164 propio, BAA firmado si es sector salud (HIPAA).
- WhatsApp — Meta Cloud API directa (no WATI).
- HubSpot CRM — contacto, deal, propiedades custom.
- Make — escenarios de automatización propios del cliente.

**Quién lo hace:** el Arquitecto (agente) o el CEO, vía Claude Code o Cowork según la Regla de Enrutamiento (`MANUAL_MAESTRO_v4_9.md`, sección 18).

**Procedimiento de aislamiento — NUEVO, definido 13-ago-2026:**
Cuando el trabajo de setup/mantenimiento se hace con Claude Code, **nunca se usa la cuenta de Claude del cliente ni se mezclan credenciales de varios clientes en una sesión**. La separación se hace por configuración, no por login:

```
~/clientes/
  <cliente>/
    .mcp.json      ← MCP y credenciales SOLO de este cliente (HubSpot, Stripe, Supabase, etc. — las de ellos)
    .env           ← secrets de este cliente, no compartidos
    CLAUDE.md      ← contexto específico de este cliente
```

- MCP genéricos (GitHub, herramientas internas de Automate IT) → scope de usuario, disponibles siempre.
- MCP con credenciales propias del cliente → scope de proyecto, solo dentro de la carpeta de ese cliente.
- Para monitorear varios clientes a la vez: una sesión de Claude Code por cliente, cada una apuntando a su carpeta — nunca una sesión mezclando credenciales de dos clientes.
- ⚠️ Regla equivalente a la de RLS en el portal (`CLAUDE.md` → "Client Portal"): el aislamiento es por diseño de la configuración, no por cuidado manual de quien opera la sesión.

**Estado:** el patrón queda definido aquí; falta aplicarlo retroactivamente si ya existen sesiones/MCP mezclados entre clientes actuales. 🔴 **Verificar y migrar si aplica.**

## 5. Go-live — ⚠️ parcial

**Qué pasa:** el sistema del cliente queda respondiendo en vivo (voz/WhatsApp/chat según módulos contratados).
**Gap:** no hay checklist formal de "listo para go-live" en este repo más allá del "Checklist de Resiliencia" general (`MANUAL_MAESTRO_v4_9.md`, sección 12), que es sobre calidad de entregable, no sobre criterios de salida de setup. 🔴 **Pendiente de definir.**

## 6. Servicio activo — ✅ confirmado

**Qué pasa:** el worker `health-check` corre cada 15 minutos (`*/15 * * * *`) contra las URLs Tier 0 del cliente, con KV `STATE` y service bindings a `bit-chat-3126` y `stripe-checkout-automate`. Regla dura: si un Tier 0 no tiene fallback, no se continúa el setup — un sistema sin fallback Tier 0 genera churn.
**Quién lo hace:** automatizado (cron). Revisión humana cuando el health-check alerta.

## 7. Renovación o fin de contrato — 🔴 sin definir

**No hay ningún documento en este repo** que describa: cuándo se renueva, cómo se cancela, qué pasa con los datos del cliente en Supabase/HubSpot al terminar, ni si hay un acuerdo firmado equivalente al de `/acuerdo-colaboracion` para el catálogo estándar (ese acuerdo es solo para el trueque de creadores).

**Esto necesita definirse con el CEO antes de que el primer cliente estándar llegue a esta etapa.** Preguntas abiertas mínimas:
- ¿Hay contrato firmado (Docusign/similar) para clientes estándar, o solo para la oferta de creadores?
- ¿Proceso de cobro recurrente automatizado o facturación manual mes a mes?
- ¿Qué pasa con los workers/agentes del cliente al cancelar — se desactivan, se borran, cuánto tiempo se conservan los datos?

---

## Qué falta para que este manual esté completo

Listado explícito, no implícito, de los 4 gaps 🔴 identificados arriba:
1. Plantilla/checklist de propuesta comercial (Etapa 2).
2. Mecanismo de cobro para el catálogo estándar, fuera de la oferta de consultoría (Etapa 3).
3. Checklist formal de criterios de salida para go-live (Etapa 5).
4. Proceso completo de renovación y fin de contrato (Etapa 7).

Hasta que el CEO los defina, cualquier persona ejecutando estas etapas debe tratarlas como **decisión caso por caso**, no como proceso estandarizado.

---

## Control de versiones

| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | 13-ago-2026 | Primera versión. Documenta las 7 etapas del ciclo de vida del cliente estándar (no consultoría). Define el procedimiento de aislamiento Claude Code/MCP por cliente. Marca 4 gaps pendientes de definición por el CEO. |
