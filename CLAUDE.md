# CLAUDE.md — automate-it-website

## Proyecto
Sitio web one-page en Astro de Automate IT (yourbizupgraded.com): genera leads orgánicos de dueños de pequeños y medianos negocios (foco de mensaje: hispanos en Florida) para servicios de mejora operativa: entender la operación, encontrar dónde se pierde tiempo, información o dinero, y construir la mejora. La solución puede ser automatización, integración, simplificación de proceso, captura de datos, reporting o dashboard. **La IA es capacidad de entrega, no el posicionamiento** (Manual Maestro §2). Bilingüe ES/EN, sin scroll cinematográfico, foco en claridad, performance y deploy continuo.

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
- **El copy de interfaz se actualiza en ES y EN juntos — nunca uno solo.** Esto no cambió.
- 🧊 **El blog en inglés está congelado desde el 20-sep-2026** (decisión del CEO). Había 24 artículos en español contra 1 en inglés, y sostener la paridad costaba trabajo en cada cambio sin tráfico que lo justificara. Los artículos nuevos van **solo en español**. Las páginas principales en inglés (`/en/`, `/en/diagnostic`, `/en/about`, legales) se mantienen: sirven a quien llegue en inglés, y `Perfil_de_Cliente_Ideal.md` §6 prohíbe que el idioma sea un filtro. Descongelarlo es decisión del CEO.
- **Al traducir una página nueva, agregar el par en `src/i18n/alternates.ts`.** Esa tabla alimenta los `hreflang` y el selector de idioma. Si el par no está, la página no declara traducción y el selector lleva al home del otro idioma — que es lo correcto, pero no es lo que quieres si la traducción sí existe.
- Nunca editar archivos compilados (`dist/`, `.astro/`) directamente.
- Componentes reciben `lang` prop (default `"es"`). ES en root, EN bajo `/en/`.

## Workers activos
Cada uno tiene su `wrangler.toml` en `workers/<nombre>/`:
- **bit-chat-3126** — chatbot BIT (Claude Haiku vía proxy seguro). `main = index.js`. CORS: yourbizupgraded.com + localhost:4321. Sin preview URLs. URL pública: `https://bit-chat-3126.coachgerardonavas.workers.dev`.
- **health-check** — health check de URLs Tier 0 (cron `*/15 * * * *`). KV `STATE`; service bindings a `bit-chat-3126` y `stripe-checkout-automate`. `workers_dev=false`, sin preview URLs. account_id configurado.
- **stripe-checkout** — pagos Stripe (worker `stripe-checkout-automate`). `main = src/index.ts`. Secret: `STRIPE_SECRET_KEY`. `workers_dev=true`.
- **stripe-webhook** — webhook de Stripe (worker `stripe-webhook-automate`). `main = src/index.ts`. Secrets: `STRIPE_WEBHOOK_SECRET`, `TELEGRAM_BOT_TOKEN`. Avisa por Telegram al completarse un checkout. Registrado en Stripe como endpoint `we_1TzFZcAHnOzMvXBg9DrZxbdG`, escuchando solo `checkout.session.completed`.
- **vero-telegram** — bot de Telegram que recibe del CEO, llama a la API de Anthropic con el prompt de Vero y responde. `main = index.js`. KV `APPROVALS`. `ALLOWED_CHAT_ID` fijo al chat del CEO. Es la base sobre la que se montan los agentes por departamento cuando se retomen (ver Reglas críticas, regla de n8n).
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
- ⚠️ **El Manual Maestro vigente NO está en este repo.** Es `MANUAL_MAESTRO.md` (v7.2, 11-sep-2026) en la carpeta **ADN** de Google Drive. El `MANUAL_MAESTRO_v4_9.md` de este repo es de julio-2026 y quedó atrás: describe un modelo comercial por plataforma de voz (Retell/VoiceAIWrapper según número de clientes) que ya no aplica, y posiciona la IA como el producto. El manual vigente dice lo contrario: **"AI es una capacidad de delivery, no el producto ni el posicionamiento"**. Leer Drive antes de tomar cualquier decisión de mensaje, precio o alcance.
- **Jerarquía de fuentes de verdad (Manual Maestro §6, todas en ADN/Drive):** mensaje y claims → `BrandScript_Automate_IT.md` · identidad → `Quienes_Somos.md` · a quién se le vende → `Perfil_de_Cliente_Ideal.md` · precios y SOW → `Manual_de_Pricing.md` · diagnóstico → `Protocolo_Diagnostico.md` · diseño de la intervención → `Arquitectura_de_Intervencion.md` · adopción → `Manual_de_Adopcion.md` · continuidad → `Ritual_de_Continuidad.md` · sitio → `WEBSITE_BRIEF.md`.
- **Una sola versión vigente por manual (Manual Maestro §7.1-§7.2).** En ADN no se crean adendas, parches ni copias `v2/v3`: se edita el manual vigente en su sitio. Los nombres con número de versión que hay en este repo son copias históricas, no la fuente.
- **El Manual de Instagram vigente es `Manual_Instagram_Automate_IT_v2_7.md`** (en el repo `automate-it`, NO en este).
- ⚠️ **IntersectionObserver:** el observer que activa **todas** las animaciones `.reveal-on-scroll` vive dentro de `SeccionDolor.astro`. Si ese componente se elimina, mueve o condiciona su render, **todas** las animaciones de reveal dejan de funcionar. Antes de tocarlo, mover primero el observer a `BaseLayout.astro`.

## Documentos de referencia en este repo
- `MANUAL_MAESTRO_v4_9.md` — copia histórica (julio-2026). **NO es el vigente**: el vigente es `MANUAL_MAESTRO.md` v7.2 en ADN/Drive. Se conserva por trazabilidad.
- `BrandScript_Automate_IT_v1_1.md` — copia en repo. La fuente vigente es `BrandScript_Automate_IT.md` en ADN/Drive.
- `Manual_de_Marca_v2_5.docx` — manual de marca visual/verbal (vigente).
- `Quienes_Somos_v2_9.docx` — copia en repo, con el precio corregido al catálogo vigente el 21-sep-2026. **No es la fuente vigente**: la fuente vigente es `Quienes_Somos.md` v3.2 en ADN/Drive, que ya no lista precios y los delega a `Manual_de_Pricing.md`.
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
- **Google Analytics 4** — `G-PCJWLQ97K6` en `src/config/site.ts` (propiedad del CEO; reemplazó a la vieja `G-82JWGNDTLG` el 23-jul-2026 — esa propiedad ya no recibe nada). Eventos de conversión vía `window.trackEvent()`, definido en `BaseLayout.astro`.
- **Telegram interno** — Chat ID `8348522203`.
- 👥 **Sin techo de tamaño de cliente** (decisión del CEO, 20-sep-2026). No se rechaza un negocio por número de empleados: el filtro es la fricción real y el impacto potencial (`Perfil_de_Cliente_Ideal.md` §3-§4). Cierra el pendiente que §8 de ese manual dejaba abierto.
- 🤝 **El responsable interno va en el acta de entrega, no en el SOW** (decisión del CEO, 20-sep-2026, revisada el mismo día). El contrato no se complica, pero al entregar el sistema el cliente firma el acta con el nombre de la persona que queda a cargo. Cierra el pendiente de `Manual_de_Adopcion.md` §10. El acta ya existe: `Automate IT — Acta de Aceptación y Go-Live` en Drive.
- ☎️ **Teléfono público único: (407) 404-9495** (decisión del CEO, 20-sep-2026). El mismo número para llamadas, WhatsApp, el sitio, el schema `ProfessionalService` y la ficha de Google. Antes convivía con el (407) 214-5114, que ya no se usa en ninguna parte. El SEO local exige que nombre, dirección y teléfono sean idénticos en todos lados: si este número cambia, cambia en los cinco sitios a la vez.

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

### Catálogo — tres planes (fuente de verdad: `Manual_de_Pricing.md` en ADN/Drive)
> ⚠️ Hasta el 20-sep-2026 esta sección describía un catálogo muerto (Starter $99/mes, Professional $179/mes y módulos de canal Voz/WhatsApp/Messenger/CRM). Ese catálogo no existe. Si algún archivo del repo todavía lo menciona, está desactualizado.

| Plan | La frase | Incorporación | Mensual |
|---|---|---|---|
| **Asistente** | Hace por ti. | $1,000 | $200/mes |
| **Estratega** | Piensa contigo. | $2,000 | $400/mes |
| **Manager** | Coordina para ti. | $3,000 | $600/mes |

- **Regla mnemotécnica:** la mensualidad es siempre el 20% de la incorporación. Cada escalón sube +$1,000 de instalación y +$200 de mensualidad.
- **Compra sin mensualidad:** Asistente $2,500 · Estratega $5,000 · Manager $7,500. Deliberadamente por encima de incorporación + 3 meses.
- **Condiciones:** 50% al firmar · 50% al pasar la Revisión de Aceptación · primera mensualidad a los 30 días del arranque · compromiso mínimo 3 meses · garantía 7 días o hasta el arranque en vivo.
- **El plan no es el SOW.** El plan fija el nivel de intervención; el SOW fija el trabajo exacto. Nada es exigible hasta estar en el SOW firmado.
- **El sitio ya no vende por autoservicio.** El CTA de cada plan lleva al diagnóstico (ver `SeccionServicios.astro`).
- **Precios en el sitio:** `translations.ts` → `servicios.plans`. ES y EN juntos, siempre.

### Ofertas de entrada — una sola puerta por prospecto, elegida por origen
| Puerta | Precio | Para quién |
|---|---|---|
| Diagnóstico | $0 | Inbound tibio del sitio (`/diagnostico`) |
| Radiografía de tu Operación | $1 | Frío, outreach (`/ia` — `noindex`, sin enlaces internos: solo funciona si mandas el link) |
| Consultoría para Emprendedores | $500 de lista, gratis con código `NEGOCIOS` | Emprendedores y creadores (`/consultoria`) |

Nunca dos puertas al mismo prospecto. Nunca ofrecer la de $1 después de haber ofrecido la gratis.

> **`/empresas` se retiró el 20-sep-2026** (decisión del CEO). Publicaba "La Memoria Operativa", que `Manual_de_Pricing.md` §5 define como catálogo cerrado y cuyo canal, según `Perfil_de_Cliente_Ideal.md` §7, es "LinkedIn, referidos, outreach — **nunca** por la home". La ruta redirige 301 al home (`astro.config.mjs`). No volver a publicar esa oferta en el sitio sin que el CEO lo diga.

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
