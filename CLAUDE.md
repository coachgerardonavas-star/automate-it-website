# CLAUDE.md — automate-it-website

## Proyecto
Sitio web one-page en Astro de Automate IT (yourbizupgraded.com): genera leads orgánicos de dueños de pequeños negocios hispanos en Florida para el servicio de recepción/comunicación automatizada con IA. Bilingüe ES/EN, sin scroll cinematográfico, foco en claridad, performance y deploy continuo.

## Stack
- **Framework:** Astro `^4.16.0` (Astro 4.x) vía `@astrojs/cloudflare` 11.2.0
- **Estilos:** Tailwind CSS `^3.4.13` vía `@astrojs/tailwind` `^5.1.0`
- **UI/islas:** React 18.3.1 (`@astrojs/react` 3.6.3) — uso puntual
- **CMS:** Keystatic (`@keystatic/astro` 5.0.6 / `@keystatic/core` 0.5.50)
- **Iconos:** `lucide-astro` · **Fuentes:** `@fontsource/open-sans` (self-hosted)
- **Node:** sin `.nvmrc` ni campo `engines` en package.json — no hay versión fijada en el repo (usar LTS 18+, compatible con Astro 4)
- **Animaciones:** CSS puro + IntersectionObserver. **Sin GSAP. Sin Three.js.**
- **Deploy:** Cloudflare Pages — auto-deploy al hacer push a `main` desde GitHub.
- **Repo:** coachgerardonavas-star/automate-it-website · rama `main`

## Comandos
Definidos en `package.json` (todos vía Astro CLI):
- `npm run dev` — servidor de desarrollo (`astro dev`, también `npm start`)
- `npm run build` — build de producción (`astro build`)
- `npm run preview` — preview del build (`astro preview`)
- `npm run astro` — CLI de Astro directo

## Estructura clave
- `src/i18n/translations.ts` — **fuente de verdad de TODO el copy ES y EN** (objeto `{ es, en }`). Nunca hardcodear texto en componentes.
- `src/i18n/utils.ts` — helpers de i18n.
- `src/config/site.ts` — config global: `GA_ID`, `HUBSPOT_*`, `SEARCH_CONSOLE_VERIFICATION`.
- `src/components/` — Nav, Hero, `Seccion*.astro`, DiagnosticoForm, LegalContent, `BitAvatar.astro`, `ChatbotWidget.astro`.
- `src/layouts/BaseLayout.astro` — layout base (acepta `lang` prop; inyecta chatbot y GA/Search Console condicionales).
- `src/content/blog/` — posts Markdown (Astro Content Collections); schema en `src/content/config.ts`.
- `src/pages/` — rutas ES en root, EN bajo `/en/`.
- `src/lib/hubspot.ts` — integración HubSpot Forms API v3.
- `src/styles/global.css` — tokens de marca + `@font-face`.
- `public/assets/` — imágenes/mascota · `public/fonts/` — `manifold-cf-extrabold.woff2`.
- `workers/` — Cloudflare Workers (ver sección "Workers activos").
- Raíz: `astro.config.mjs`, `tailwind.config.mjs`, `keystatic.config.ts`.

## Reglas de i18n
- Todo el copy del sitio vive en `src/i18n/translations.ts`.
- Siempre actualizar ES y EN juntos — nunca uno solo.
- Nunca editar archivos compilados (`dist/`, `.astro/`) directamente.
- Componentes reciben `lang` prop (default `"es"`). ES en root, EN bajo `/en/`.

## Workers activos
Cada uno tiene su `wrangler.toml` en `workers/<nombre>/`:
- **bit-chat-3126** — chatbot BIT (Claude Haiku vía proxy seguro). `main = index.js`. CORS: yourbizupgraded.com + localhost:4321. Sin preview URLs. URL pública: `https://bit-chat-3126.coachgerardonavas.workers.dev`.
- **health-check** — health check de URLs Tier 0 (cron `*/15 * * * *`). KV `STATE`; service bindings a `bit-chat-3126` y `stripe-checkout-automate`. `workers_dev=false`, sin preview URLs. account_id configurado.
- **stripe-checkout** — pagos Stripe (worker `stripe-checkout-automate`). `main = src/index.ts`. Secret: `STRIPE_SECRET_KEY`. `workers_dev=true`.
- **stripe-webhook** — webhook de Stripe (worker `stripe-webhook-automate`). `main = src/index.ts`. Secrets: `STRIPE_WEBHOOK_SECRET`, `TELEGRAM_BOT_TOKEN`. Avisa por Telegram al completarse un checkout. Registrado en Stripe como endpoint `we_1TzFZcAHnOzMvXBg9DrZxbdG`, escuchando solo `checkout.session.completed`.
- **consultoria-intake** — recibe el formulario de `/consultoria` y la firma de `/acuerdo-colaboracion` (ruta `/acuerdo`). Escribe en HubSpot con la **CRM API** (contacto + nota + deal) y avisa por Telegram. Secrets: `HUBSPOT_TOKEN`, `TELEGRAM_BOT_TOKEN`.

## Client Portal (`/portal`) — agregado 11-ago-2026
Aplicación privada multi-tenant montada sobre el mismo repo. **No es parte del sitio público**: no se indexa, no lleva BIT, no aparece en el sitemap y usa su propio layout (`PortalLayout.astro`), no `BaseLayout`.

- **Rutas:** `/portal` (Resumen), `/leads`, `/conversations`, `/appointments`, `/customers`, `/automations`, `/activity`, `/reports`, `/insights`, `/files`, `/settings`, `/portal/admin` y `/portal/admin/[slug]`. Todas `prerender = false`. Entrada por `/portal/login`; salida por POST a `/portal/logout`.
- **Datos:** Supabase (proyecto `automate-it-core`, `tenfstsdobydtjmyfvqs`). Esquema en `supabase/migrations/0001_portal_schema.sql`.
- **Sin SDK de Supabase.** Auth y PostgREST se consumen con `fetch` desde `src/lib/portal/supabase.ts`. Se decidió así porque el SDK no aportaba nada que no se resolviera en ~150 líneas y este repo obliga a justificar cada librería nueva.
- **Aislamiento entre clientes = RLS en Postgres**, no código de aplicación. Cada consulta va con el JWT del usuario final. `auth_is_member()` y `auth_is_admin()` resuelven la pertenencia dentro de la base.
- ⚠️ **Nunca confiar en un `organization_id` que venga del frontend.** El slug de la URL se resuelve siempre contra la lista que RLS ya autorizó (`resolveActiveOrg`). Un cliente que escriba el id de otro recibe el suyo.
- ⚠️ **La `service_role` key no entra a este repo.** Salta RLS por diseño. Si la capa de telemetría la necesita, vive en un Worker aparte.
- ⚠️ **`automation_events.metadata` y la tabla `automation_internals` son detalle técnico.** RLS filtra filas, no columnas: por eso `src/lib/portal/data.ts` pide columnas nombradas para el rol client. Nunca usar `select=*` sobre `automation_events` en una vista de cliente.
- **Demo vs producción:** cada organización tiene `data_mode` (`demo` | `live`). El modo viaja *dentro* de la respuesta (`DataEnvelope.mode`) y `DemoBanner` lo pinta a partir de ahí. Nunca mostrar cifras sembradas sin ese aviso.
- **Copy:** `src/lib/portal/copy.ts`, ES y EN juntos. No usa `translations.ts` (ese archivo es del sitio público). El idioma sale del perfil del usuario, no de la URL.
- **Variables:** `SUPABASE_URL` y `SUPABASE_ANON_KEY` (ver `.env.example`). Sin ellas el portal muestra una pantalla de "no configurado" y **el sitio público sigue funcionando**.
- `src/pages/portal/preview-dev.astro` es una previsualización con datos sembrados que **solo responde en `astro dev`**: en producción devuelve 404 (`import.meta.env.DEV`). Sirve para revisar la UI sin base conectada. No lee cookies ni emite tokens.

## Reglas críticas del proyecto
- 🚫 **n8n queda FUERA por completo** (decisión del CEO, 31-jul-2026): ni como infraestructura interna **ni como producto para vender a clientes**. Esto revierte la regla anterior, que lo mantenía como producto vendible. No proponerlo, no cotizarlo, no reactivarlo sin que el CEO lo diga explícitamente. Para automatización interna se usa Make o Workers propios.
- **Los agentes por departamento NO se rehacen con n8n.** Cuando se retomen, se montan sobre el worker `vero-telegram`, que ya recibe de Telegram, llama a la API de Anthropic y responde. Un agente = ese worker escuchando otro grupo con otro prompt.
- ⚠️ **Cobros de $0 (cupón 100%): Stripe reporta `payment_status: "paid"`, NO `"no_payment_required"`.** Verificado contra sesiones reales en vivo. `amount_total === 0` es la única prueba confiable de que fue cortesía. Nunca filtrar por `payment_status` para distinguir un canje gratis de un pago real.
- ⚠️ **Dos webhooks de Stripe escuchan `checkout.session.completed`**: el worker propio y uno de Make ("Contrato C — Bienvenida post-pago", escenario `5182085`). El de Make manda un correo de bienvenida y **debe** conservar su filtro `amount_total > 0`; sin él le escribe "tu pago fue procesado" a quien canjea la consultoría gratis. Ya pasó con una persona real el 30-jul-2026.
- **Jotform está descartado como herramienta.** Su API no escribe condiciones ni propiedades de preguntas — devuelve `200` y descarta en silencio. El formulario `262096329984067` quedó archivado (no borrado). Todo formulario nuevo se construye en el sitio.
- **HubSpot: usar la CRM API, no Forms API v3.** Forms v3 descarta sin avisar cualquier campo que no esté definido en el formulario (verificado: `firstname` entró, `message` no, ambos con `200`). La CRM API falla ruidosamente.
- **Frase PROHIBIDA en todo copy: "sin humo"** (ej. "IA sin humo"). No usarla nunca en ningún archivo de este repo (copy, componentes, blog, workers, manuales).
- **El Manual Maestro vigente es `MANUAL_MAESTRO_v4_9.md`** (en este repo).
- **El Manual de Instagram vigente es `Manual_Instagram_Automate_IT_v2_7.md`** (en el repo `automate-it`, NO en este).
- ⚠️ **IntersectionObserver:** el observer que activa **todas** las animaciones `.reveal-on-scroll` vive dentro de `SeccionDolor.astro`. Si ese componente se elimina, mueve o condiciona su render, **todas** las animaciones de reveal dejan de funcionar. Antes de tocarlo, mover primero el observer a `BaseLayout.astro`.

## Documentos de referencia en este repo
- `MANUAL_MAESTRO_v4_9.md` — Manual Maestro del sistema multi-agente (vigente).
- `BrandScript_Automate_IT_v1_1.md` — BrandScript de marca (vigente).
- `Manual_de_Marca_v2_5.docx` — manual de marca visual/verbal (vigente).
- `Quienes_Somos_v2_9.docx` — documento de identidad corporativa (vigente).
- `WEBSITE_BRIEF.md` — brief del sitio web (fuente de verdad de diseño/mensaje).
- `README.md` — readme base del repo.
- `archive/` — versiones superadas de los manuales de arriba, conservadas por trazabilidad (no vigentes): `MANUAL_MAESTRO_v4.4.md`, `Automate_IT_Quienes_Somos_v2_5.md`, `plan_marketing_2026_v2_3.md`.

## Stack — detalle no negociable
- **Blog:** Astro Content Collections. Posts en `src/content/blog/*.md` con frontmatter `{ title, description, pubDate, lang, author, tags, draft }`. Listing en `/blog` y `/en/blog`; artículo dinámico `/blog/[slug]` y `/en/blog/[slug]` filtrado por `lang` en `getStaticPaths`.
- **i18n:** built-in Astro 4 i18n + carpetas. Strings centralizadas en `src/i18n/translations.ts`. Rutas: `/`, `/diagnostico`, `/privacidad`, `/terminos` y equivalentes EN `/en/`, `/en/diagnostic`, `/en/privacy`, `/en/terms`.
- **Analytics e integraciones:** placeholders en `src/config/site.ts`. BaseLayout emite scripts solo cuando `isGAEnabled()` / `isSearchConsoleEnabled()` son true.
- **Performance:** Lighthouse mobile baseline 98/96/100/100. FCP 1.6s, LCP 2.0s, TBT 0ms, CLS 0. Favicon SVG, mascota webp 320px, Open Sans self-hosted, Manifold CF preload.
- Antes de agregar una librería JS pesada, **detenerse** y buscar solución CSS pura; proponer al CEO antes de instalar.

## Integraciones activas
- **HubSpot Forms API v3** — 3 formularios (pre-venta). Portal ID `245810986`. Helper `src/lib/hubspot.ts`. Solo para los formularios viejos; lo nuevo va por CRM API desde `consultoria-intake`.
- **HubSpot CRM API** — vía `consultoria-intake`. Pipeline de deals: **"Ventas"** (`default`), etapa de entrada **"Calificado"** (`presentationscheduled`).
- **Worker `bit-chat-3126`** — chatbot BIT (Claude Haiku).
- **Worker `stripe-checkout-automate`** — pagos Stripe.
- **Google Analytics 4** — `G-82JWGNDTLG` en `src/config/site.ts`.
- **Telegram interno** — Chat ID `8348522203`.

## Oferta "Consultoría de Negocios para Emprendedores" (creada 30-jul-2026)
Entrada post-venta para emprendedores y creadores. Precio de lista $500 como anclaje; se entrega **gratis** con el código promocional `NEGOCIOS` (100%).

- Producto `prod_UydFV5nchoZszF` · precio `price_1TyfzRAHnOzMvXBguhKANBSS` · cupón `QUWSd8Lw` · código `promo_1Tyg0nAHnOzMvXBgYjgzTo9t` (compartido, tope 200 canjes).
- Link a repartir: `https://buy.stripe.com/4gM6oGeqEcFp9OF3JrafS03?prefilled_promo_code=NEGOCIOS` — el parámetro aplica el cupón solo, la persona ve $0 sin escribir nada.
- Al completar el checkout, Stripe redirige a `/consultoria?ref=<session_id>`.

**Rutas nuevas:**
- `/consultoria` — entrevista de 10 preguntas, `noindex`. Las ramas temáticas se muestran según lo marcado, y al ocultarse sus campos quedan **deshabilitados** (no solo invisibles): un `required` oculto bloquea el envío sin explicar por qué.
- `/acuerdo-colaboracion` — acuerdo de trueque con creadores + firma electrónica, `noindex`. Sube `VERSION` si cambias una palabra del texto, o no se puede demostrar qué se firmó.
- `/terminos-consultoria-emprendedores` y `/en/consulting-terms` — términos. Mantener ES y EN sincronizados.
- `/guias/*` — lead magnets públicos e indexables a propósito.
- `/d/*` — documentos de cliente. Nombre con sufijo aleatorio + `X-Robots-Tag: noindex` en `public/_headers`. **No es privacidad**: cualquiera con el link entra.

> No agregar `Disallow: /d/` al robots.txt: bloquear el rastreo impide que el buscador lea la cabecera `noindex`, y la URL podría indexarse igual si alguien la enlaza.

## Identidad de marca
Tokens como utilidades Tailwind (`bg-brand-cyan`, etc.) y CSS custom properties (`var(--color-cyan)`).

```
--color-bg:        #050A18   bg-brand-bg
--color-navy:      #003DA5   bg-brand-navy
--color-blue:      #0052CC   bg-brand-blue
--color-cyan:      #00D9FF   bg-brand-cyan      Acento principal en headlines/CTAs
--color-lime:      #AADD00   bg-brand-lime      SOLO estados activos / "live" / hover puntual
--color-white:     #FFFFFF
--color-gray-400:  #97A0AF   text-brand-gray-400
--color-gray-900:  #091E42   bg-brand-gray-900
```

Reglas estrictas del verde lima `#AADD00`: solo en estados "En vivo", "Activo", "Procesando", checks operativos, contadores en vivo. Prohibido en logo, fondos claros, cuerpo de texto, color dominante, junto a rojo de error.

### Design System v2.1 — tokens adicionales
- **Neutrales (azul frío):** `neutral-0/50/100/200/300/400/500/600/700/800/900`.
- **Semánticos:** `info` (`#0052CC` / bg `#E6EEFB`), `success` (`#AADD00` / bg `#F2FBD6`), `warning` (`#F5A524` / bg `#FEF3DC`), `danger` (`#E5484D` / bg `#FDECED`).
- **Lima extra:** `lime-300` `#D9F080`, `lime-400` `#C2EA40`, `lime` `#AADD00`, `lime-600` `#8BB800`. Alias `--live`.
- **Radii:** `rounded-xs` 4px, `rounded-sm` 6px, `rounded-md` 8px, `rounded-lg` 12px, `rounded-full` 999px.
- **Sombras:** `shadow-xs/sm/md/lg` + `shadow-neon` (cyan) + `shadow-lime`. CSS vars `--glow-cyan-sm/md`, `--glow-lime-sm/md`.
- **Rings de foco:** `--ring-cyan`, `--ring-lime`.
- **Motion:** hover `200ms cubic-bezier(0.2,0,0,1)` (`ease-brand`). Pulse 2s (`animate-pulse-live`). Entry fade+translateY(8px) 360ms (`animate-entry`). Sin scale en hover, sin bounce.
- **Iconos:** Lucide via `lucide-astro`. Trazo 2px, color default navy `#003DA5`. Tamaños 16/20/24/32/48px.

## Tipografía
- **Títulos:** **Manifold CF ExtraBold** (auto-hosteada en `/public/fonts/`) con `Montserrat` fallback. Stack `'Manifold CF', Montserrat, system-ui, sans-serif`. Utilidad `font-heading`.
- **Cuerpo:** Open Sans 400/600 self-hosted (`@fontsource/open-sans`).
- Archivo de fuente en `public/fonts/manifold-cf-extrabold.woff2`. `@font-face` en `src/styles/global.css` con `font-display: swap`.

## Sitemap (home one-page)
1. **Hero** — "Your business, upgraded." + H1 + CTA a `/diagnostico` + línea "Conoce a BIT".
2. **Resultados** (`#resultados`, `SeccionResultados.astro`).
3. **Dolor** (`#el-dolor`, `SeccionDolor.astro`) — ⚠️ contiene el IntersectionObserver global.
4. **Cómo funciona** (`#como-funciona`) — Timeline 4 pasos: Diagnóstico → Propuesta → Setup → Go-live.
5. **Agentes en acción** (`#agentes`) — terminal con typewriter CSS-only.
6. **Planes y canales** (`#planes`, `SeccionServicios.astro`) — único anchor de precios.
7. **FAQ** (`#faq`, `SeccionPaquetes.astro` — conserva el nombre por histórico).
8. **Para quién** (`#para-quien`).
9. **CTA final** (`#cta-form`).
10. **Footer** — email, switcher de idioma, links legales (noindex hasta revisión legal).

### Catálogo — plan base + módulos de canal (fuente de verdad: el sitio en vivo)
- **Planes base:** Starter $99/mes (setup $199, sin HIPAA) · Professional $179/mes (setup $349, salud HIPAA).
- **Módulos** (cada uno 300 min/mensajes/mes): Voz (Retell) +$149 · WhatsApp +$99 · Messenger/Web chat +$79 (no recomendado con Professional) · CRM & Leads +$99.
- **Ejemplos:** Solo WhatsApp $198/mes · Voz HIPAA $328/mes · Voz+WhatsApp+CRM $446/mes · Clínica HIPAA Voz+WhatsApp+CRM $526/mes.

## BIT — Mascota / copiloto
- Nav: avatar 28px con tooltip "Hola, soy BIT". Hero: avatar 36px + "Conoce a BIT…". Chatbot widget flotante (bottom-right).
- Componente `src/components/BitAvatar.astro` (`lang`, `size`, `showTooltip`) → `<img src="/assets/mascota.webp">`.
- Copy oficial en `translations.bit`.

## Chatbot widget
`src/components/ChatbotWidget.astro` (CSS-only + vanilla JS), inyectado por BaseLayout (prop `chatbot` default `true`). Estado via `data-open`. Quick actions a /diagnostico, /#planes, mailto. Input funcional pero **webhook pendiente** (muestra fallback por email).

## Reglas de copy y mensaje
- Cero jerga hueca. Sustantivos concretos, verbos directos.
- **No prometer números no verificados.** Sin dato → copy cualitativo; sin dato → mecanismo.
- Sin testimonios inventados.
- Voz: incertidumbre honesta.
- **Frase prohibida: "sin humo"** (ver Reglas críticas).

## Nota crítica — Sistema modular
No todos los clientes necesitan todos los agentes. **No mencionar "16 agentes" como número fijo.** Hablar de "equipos especializados" / "agentes".

## Reglas — qué NO hacer
- No WordPress, no Calendly, no widgets de chat de terceros. Todo en Astro + Cloudflare.
- No Three.js, no GSAP (archivado en rama `three-js-archive`).
- No testimonios falsos. No prometer "magia con IA".
- No emojis decorativos (Lucide sí).
- No copy genérico tipo "transformamos tu negocio con IA".
- No `WidthType.PERCENTAGE` en tablas docx — usar `DXA`.

## Reglas de trabajo
- Mobile-first (diseña a 375px primero).
- No pedir permiso para naming, estructura, clases Tailwind, orden CSS.
- Sí detenerse y reportar antes de: cambiar una sección completa, salirse de los colores del brief, agregar librería JS pesada, cambiar el stack.
- Lighthouse > 85 mobile = requisito de go-live.
- Cada cambio visible y testeable en browser antes de marcar completado.

## Fuente de verdad
Antes de tocar el sitio, leer en orden: 1) `WEBSITE_BRIEF.md` · 2) Manual de Marca (PDF) · 3) este `CLAUDE.md`. Si el código contradice el brief, **el brief gana** salvo que el CEO lo actualice.
