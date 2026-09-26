# Mapa de datos personales — yourbizupgraded.com

**Última verificación:** 26-sep-2026 · **Método:** lectura del código de este repo (sitio + `workers/`) y lectura, solo consulta, de los escenarios de Make activos (5148358, 5637378) y de la lista de escenarios del equipo 2245368.
**Uso:** documento interno. No es asesoría legal. Lo que dice la Política de privacidad pública (`src/i18n/translations.ts` → `legal.privacy`) tiene que coincidir con este mapa.

## 0. Cambios del 26-sep-2026 (decisiones del CEO tras la auditoría)

- **Llamada automática con IA retirada.** Se quitó el módulo de Retell (llamada saliente "Gaby") del escenario Make 5148358. El resto del flujo sigue igual: Telegram, correo de confirmación, HubSpot y deal. La configuración del módulo quedó respaldada fuera del repo; también está en el historial de versiones del escenario en Make.
- **Sexo inferido y nacionalidad retirados** de la nota de HubSpot y de las variables del escenario Make 5637378. Pendiente del CEO: quitarlos también del análisis del agente en el panel de Retell.
- **Confirmado por el CEO:** ningún número de la empresa lo contesta una IA (el agente entrante "Alejandro" no está en uso); WhatsApp se responde a mano; Retell **grababa y guardaba transcripciones** de las llamadas hechas; el CEO **a veces** pasa datos de leads o respuestas de la consultoría por Claude o Vero (Anthropic).
- Las tablas de abajo ya reflejan estos cambios.

> Regla: si cambias un formulario, un worker, un escenario de Make o agregas un proveedor, actualiza este archivo y la política en el mismo commit.

Convenciones:
- ✅ verificado en código o en el blueprint de Make.
- ❓ no se puede verificar desde el repo → **NEEDS OWNER INPUT**.
- No se anotan secretos, tokens, URLs de webhook ni números de origen de llamadas.

---

## 1. Puntos de captura activos en el sitio público

| Punto | Ruta | Destino inmediato | Estado |
|---|---|---|---|
| Formulario de diagnóstico | `/diagnostico`, `/en/diagnostic` (`DiagnosticoForm.astro`) | Worker `diagnostico-intake` | ✅ activo |
| Cuestionario de consultoría | `/consultoria` (`ConsultoriaForm.astro`) | Worker `consultoria-intake` | ✅ activo (`noindex`) |
| Firma del acuerdo de colaboración | `/acuerdo-colaboracion` | Worker `consultoria-intake` ruta `/acuerdo` | ✅ activo (`noindex`) |
| Botón de WhatsApp | todas las páginas con `BaseLayout` (`WhatsAppButton.astro`) | Abre `wa.me` → WhatsApp (Meta) | ✅ activo |
| Enlaces `mailto:` | footer, quiénes somos, términos | Correo de la empresa | ✅ activo |
| Pago de $1 (Radiografía) | `/ia` → `book.stripe.com` | Stripe (checkout alojado) | ✅ activo (`noindex`) |
| Consultoría gratis con código | link `buy.stripe.com` (fuera del sitio) | Stripe → `/consultoria?ref=` | ✅ activo |
| Portal de clientes | `/portal/*` | Supabase Auth + PostgREST | ✅ activo, privado |
| Google Analytics 4 | todas las páginas con `BaseLayout` | Google | ✅ activo (`G-PCJWLQ97K6`) |

**Código muerto (no se renderiza en ninguna página):** `SeccionCtaFinal.astro` (usa HubSpot Forms v3 y el copy `ctaFinal`), `Hero.astro`, `SeccionPaquetes.astro`, `SeccionServicios.astro`, `SeccionDolor.astro`, `SeccionResultados.astro`, `SeccionAgentes.astro`, `SeccionParaQuien.astro`, `SeccionTransformacion.astro`, `BandaHeuristicas.astro`, `RibbonStat.astro`, y el bloque `diagnosticoPage` de `translations.ts` (formulario viejo con dirección, tamaño de equipo y pregunta HIPAA). Verificado con búsqueda de imports el 26-sep-2026. Si alguno vuelve a usarse, revisar su copy de privacidad antes.

> Nota: el handoff de auditoría describía un formulario con dirección, tamaño del equipo y pregunta sobre pacientes/HIPAA. **Ese formulario ya no está en producción**: es el bloque `diagnosticoPage`, que no usa ningún componente. El formulario vivo es el de la sección 2.

---

## 2. Inventario de campos — formulario de diagnóstico (`DiagnosticoForm.astro`)

Todos los campos viajan juntos por `POST` JSON a `diagnostico-intake` (Cloudflare Worker). Además se envía `lang` (`es`/`en`), que no escribe la persona.

| Campo (`name`) | Qué pregunta | Requerido | Destino | Propósito | ¿Pasa por IA? |
|---|---|---|---|---|---|
| `name` | Tu nombre | Sí | HubSpot (firstname/lastname), nota HubSpot, Telegram, Make → Gmail, Make → Retell | Identificar y contactar | Puede, de forma manual (Claude/Vero) |
| `email` | Email | Sí (validado en worker) | HubSpot (llave del upsert), Telegram, Make → Gmail (correo de confirmación) | Contacto | No |
| `phone` | Teléfono o WhatsApp | No | HubSpot, Make → **Retell (llamada automática con IA)** | Contacto | No (llamada con IA retirada el 26-sep-2026) |
| `business_name` | Nombre del negocio | No | Nota HubSpot, Telegram, Make (dentro de `message`) | Contexto | Puede, de forma manual |
| `public_url` | Website o perfil público | No | HubSpot `website`, nota, Make (campo `address`) | Contexto | No |
| `role` | Tu rol | Sí | Nota HubSpot, Make `message` | Calificación | Puede, de forma manual |
| `business_type` | Qué vende tu negocio (texto libre) | Sí | HubSpot `tipo_de_negocio`, nota, Make `industry` → Retell `tipo_negocio` | Calificación | Puede, de forma manual. **Omitido** en propiedades de HubSpot, Telegram y Make si es ruta regulada |
| `weekly_demand` | Volumen semanal | Sí | Nota HubSpot, Telegram, Make `message` | Calificación | Puede, de forma manual |
| `entry_channels[]` | Canales de entrada | No | Nota, Make `message` | Diagnóstico | Puede, de forma manual |
| `friction` | Qué cuesta más | Sí | Nota, Telegram, Make `message`, GA4 (evento `generate_lead`, valor de categoría) | Diagnóstico; medición | Puede, de forma manual |
| `frequency` | Frecuencia | Sí | Nota, Telegram, Make `message`; se usa para `hs_lead_status` | Calificación | Puede, de forma manual |
| `desired_outcome` | Qué notarías primero | Sí | Nota, Telegram, Make `message` | Diagnóstico | Puede, de forma manual |
| `key_person_dependency` | Si falta una persona clave | Sí | Nota, Make `message` | Diagnóstico | Puede, de forma manual |
| `urgency` | Cuándo revisar | Sí | HubSpot `urgencia`, nota, Telegram, Make `message`, GA4 (valor de categoría) | Calificación; medición | Puede, de forma manual |
| `regulated` | ¿Datos con requisitos especiales? (No/Sí/No estoy seguro) | Sí | Nota HubSpot | **Enrutamiento de privacidad**: Sí o No estoy seguro → sin Make, sin Retell, sin texto libre en Telegram ni en propiedades | No |
| `context` | Qué te hizo buscar ayuda (texto libre) | Sí | HubSpot `descripcion`, nota, Telegram (400 chars), Make `message` → Retell | Diagnóstico | Puede, de forma manual. **Omitido** si es ruta regulada |

**Retención:** no hay regla de retención en código ni en Make. HubSpot conserva indefinidamente. ❓ Retención en Telegram, Gmail (enviados), historial de ejecuciones de Make y Retell → **NEEDS OWNER INPUT**.

**Logs:** si HubSpot falla, el worker registra en Cloudflare solo email, nombres de campos llenos y la bandera regulada (no el contenido). `observability.enabled = true`.

**Datos técnicos:** `CF-Connecting-IP` se usa como llave del rate limiter (5/min). No se guarda en HubSpot.

---

## 3. Flujo detallado del diagnóstico

```
Navegador ──POST JSON──▶ diagnostico-intake (Cloudflare)
   ├─▶ HubSpot CRM API: upsert contacto + nota asociada           (siempre)
   ├─▶ Telegram: aviso al chat interno 8348522203                 (siempre; sin texto libre si regulado)
   ├─▶ GA4 (desde el navegador): evento generate_lead {urgency, friction}
   └─▶ Make webhook → escenario 5148358 "Lead Diagnóstico"        (solo si NO regulado)
          ├─▶ Telegram: aviso con nombre, email, teléfono, sitio, tipo, mensaje
          ├─▶ Gmail (google-email): correo de confirmación al lead
          └─▶ HubSpot: upsert contacto (lead_status CALIENTE), busca deals
                 └─▶ HubSpot: crea deal si no existe

(Hasta el 26-sep-2026 había además una LLAMADA SALIENTE CON AGENTE DE VOZ IA de Retell ("Gaby"),
 con nombre, tipo de negocio y descripción completa. Retirada por decisión del CEO.)
```

Hasta el 26-sep-2026, después de cada llamada Retell enviaba el análisis a Make → escenario **5637378 "Retell — Post-Call Score"** (sigue activo, pero ya no le llegan llamadas nuevas):
- Guarda en HubSpot: teléfono, lead status, lifecycle stage, canal, idioma, y una **nota** con nombre, contacto dado en la llamada, negocio, hora, score, razón, necesidad principal y resumen de la llamada (1000 chars). Hasta el 26-sep-2026 la nota incluía también "sexo inferido" y "nacionalidad": retirados. **Las notas ya creadas siguen en HubSpot con esos datos** (ver auditoría, ítem 4b).
- Envía a Telegram: nombre, teléfono, negocio, idioma, necesidad, razón y resumen.

Confirmado por el CEO: Retell **grababa y guardaba transcripciones**; ningún número de la empresa lo atiende una IA. ❓ Cuánto tiempo conserva Retell esas grabaciones → **NEEDS OWNER INPUT** (panel de Retell).

---

## 4. Consultoría para emprendedores (`ConsultoriaForm.astro` → `consultoria-intake`)

Campos: `ref` (id de sesión de Stripe, oculto), `nombre`, `email`, `telefono`, `negocio`, `tipo_negocio`, `tamano`, `urgencia`, `problema[]`, `problema_otro`, `como_contesta`, `llamadas_perdidas`, `tiene_web`, `estilo_web[]`, `paleta`, `complica[]`, `redes[]`, `automatizar`, `algo_mas`, `terminos` (checkbox requerido), `permiso_marketing` (checkbox opcional).

Destinos ✅: HubSpot CRM API (contacto + nota + deal en pipeline "Ventas"), Telegram (aviso), GA4 desde el navegador (`form_submit_consultoria` con `tipo_negocio`, `urgencia`, `tamano`, `problemas`; sin nombre/email/teléfono).
IA: los términos (cláusula 7) dicen que **se pueden** usar herramientas de IA. Confirmado por el CEO: **a veces** pasa respuestas por Claude o Vero (Anthropic). La política lo dice así, nombrando a Anthropic.

## 5. Firma del acuerdo (`/acuerdo-colaboracion` → `consultoria-intake/acuerdo`)

Campos: `nombre`, `email`, `cuenta`, `firma`, `acepta`, `aceptaFtc`, `aceptaElectronica`, `version`.
Metadatos agregados por el worker ✅: fecha UTC, **IP** (`CF-Connecting-IP`), **User-Agent** (180 chars).
Destinos: HubSpot (contacto + nota con todo lo anterior), Telegram (nombre, email, cuenta, versión, **IP**).
Propósito: evidencia de la firma. El formulario ya avisa que se registran fecha, hora, IP y (desde este cambio) tipo de navegador.

## 6. WhatsApp

Flujo ✅: botón `wa.me` → app de WhatsApp → número WhatsApp Business (Meta Cloud API) → worker `whatsapp-webhook` → webhook de Make (hook 2466172) → escenario 5414594 **"Marc — WhatsApp Agent"**.
Estado verificado: el escenario **está inactivo** (`isActive: false`, 0 ejecuciones). Confirmado por el CEO: los mensajes **se responden a mano**. ❓ Mientras está inactivo, Make puede encolar los webhooks que llegan (revisar si hay cola acumulada).
Si "Marc" se reactiva y usa un modelo de IA para responder, la sección de IA de la política debe decirlo **antes** de activarlo.

## 7. Pagos (Stripe)

Checkout alojado en `buy.stripe.com` / `book.stripe.com`: el sitio nunca toca datos de tarjeta ✅. El worker `stripe-webhook` recibe `checkout.session.completed` y envía a Telegram nombre, email, total y si fue cortesía. Make escenario 5182085 (activo) también escucha pagos y envía correo por Gmail + upsert en HubSpot.

## 8. Portal de clientes (`/portal`)

Supabase Auth (email + contraseña) y datos de la organización con RLS. Cookies propias `httpOnly` `ait_at` y `ait_rt` (tokens de sesión, necesarias). No usa `localStorage` (lo dice `src/lib/portal/session.ts`). `PortalLayout.astro` no extiende `BaseLayout` y no carga GA ni WhatsApp ✅. No se indexa.

## 9. Datos técnicos automáticos y terceros en el navegador

| Tercero | Qué recibe | Dónde | Estado |
|---|---|---|---|
| Cloudflare (Pages + Workers) | IP, user agent, URL, referer de cada solicitud; logs de Workers con `observability` activo | Todo el sitio y los workers | ✅ |
| Google Analytics 4 | Cookies `_ga*`, page_view, eventos de conversión con valores de categoría | `BaseLayout.astro` (se carga ~2s tras `load`) | ✅ `anonymize_ip: true` |
| flagcdn.com | IP/user agent/referer al cargar las banderas del selector de idioma | `Nav.astro`, `Home2026.astro` | ✅ (recomendación: autoalojar las 2 SVG) |
| Google Search Console | Solo meta tag de verificación; no carga script | `BaseLayout.astro` | ✅ |
| Píxeles publicitarios (Meta, LinkedIn, TikTok), Clarity, Hotjar, GTM contenedor, grabación de sesión | — | Búsqueda en `src/` sin resultados | ✅ no existen |
| HubSpot tracking (`hubspotutk`) | El helper lo lee si existe, pero el sitio no carga el script de HubSpot y el único llamador (`SeccionCtaFinal`) es código muerto | `src/lib/hubspot.ts` | ✅ inactivo |
| Cloudflare Web Analytics / Bot Management | ❓ se configuran en el panel, no en el repo | — | **NEEDS OWNER INPUT** |
| Google Signals / vinculación de GA4 con Google Ads | ❓ se configura en GA4 | — | **NEEDS OWNER INPUT** (afecta si el uso de GA cuenta como "compartir para publicidad") |

## 10. Workers que NO reciben datos del público

- `bit-chat-3126`: sigue desplegado pero el sitio no lo llama desde el 14-ago-2026.
- `ai-committee`: proxy interno a Anthropic para una herramienta local; CORS solo localhost.
- `vero-telegram`: bot del CEO; `ALLOWED_CHAT_ID` fijo. Confirmado: el CEO a veces le pasa datos de leads → procesamiento manual con IA (Anthropic), declarado en la política.
- `health-check`: consulta URLs propias.

## 11. Inventario de proveedores

| Proveedor | Categoría | Datos que recibe | Dónde se invoca | ¿Aparece en la política? | ¿IA? | Pendiente |
|---|---|---|---|---|---|---|
| Cloudflare | Hosting, workers, rate limit, logs | Datos técnicos + todo el payload de formularios en tránsito | `astro.config.mjs`, `workers/*` | Sí | No | Retención de logs de Workers |
| HubSpot | CRM | Contacto, respuestas, notas, deals, resúmenes de llamadas, IP y UA de firmas | `diagnostico-intake`, `consultoria-intake`, Make | Sí | No (❓ funciones de IA de HubSpot activadas) | Retención |
| Make | Automatización | Payload de 6 campos del diagnóstico, datos de Retell post-llamada, pagos, WhatsApp (encolado) | Make 5148358, 5637378, 5182085, 5414594 | Sí | Orquesta llamadas a Retell | Retención del historial de ejecuciones |
| Telegram | Avisos internos | Nombre, email, negocio, urgencia, contexto (400 chars), IP de firma, resúmenes de llamada, pagos | Workers + Make | Sí | No | Borrado del historial del chat |
| Google (Workspace/Gmail) | Correo | Email y nombre (confirmación del diagnóstico; confirmación de pagos) | Make 5148358, 5182085 | Sí | No | — |
| Google Analytics | Analítica | Cookies, páginas, eventos de categoría | `BaseLayout.astro` | Sí | No | Signals/Ads linking |
| Retell AI | Llamadas con agente de voz IA (retiradas el 26-sep-2026) | Histórico: nombre, teléfono, tipo de negocio, descripción del diagnóstico; grabación y transcripción | Make 5637378 (post-llamada, ya sin llamadas nuevas) | Sí, como histórico | **Sí** | Retención de grabaciones; borrar el análisis de sexo/nacionalidad del agente |
| Meta / WhatsApp | Mensajería | Mensajes y número de quien escribe | `whatsapp-webhook` | Sí | No (Marc inactivo) | Cómo se responde hoy |
| Stripe | Pagos | Tarjeta (solo Stripe), nombre, email, monto | `/ia`, links de pago, `stripe-webhook` | Sí | No | — |
| Supabase | Base de datos del portal | Cuentas y datos de clientes contratados | `src/lib/portal/*` | Sí | No | — |
| flagcdn.com | Imágenes externas | Datos técnicos de la solicitud | `Nav.astro`, `Home2026.astro` | Sí | No | Autoalojar |
| Anthropic | IA | Nada automático desde formularios públicos (verificado). Uso manual: el CEO a veces pasa datos de leads y respuestas de consultoría por Claude o Vero | `vero-telegram`, uso manual | Sí | Sí | Revisar la configuración de retención/entrenamiento de la cuenta |
