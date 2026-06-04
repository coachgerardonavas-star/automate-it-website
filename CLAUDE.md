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
- **stripe-webhook** — webhook de Stripe (worker `stripe-webhook-automate`). `main = src/index.ts`. Secret: `STRIPE_WEBHOOK_SECRET`. `workers_dev=true`.

## Reglas críticas del proyecto
- **n8n NO es infraestructura interna** — es un producto que Automate IT vende e implementa para clientes (cuenta cloud cancelada, ZIP archivado). Nunca sugerir n8n para flujos internos de Automate IT; para automatización interna se usa Make cuando aplica.
- **Frase PROHIBIDA en todo copy: "sin humo"** (ej. "IA sin humo"). No usarla nunca en ningún archivo de este repo (copy, componentes, blog, workers, manuales).
- **El Manual Maestro vigente es `MANUAL_MAESTRO_v4.4.md`** (en este repo).
- **El Manual de Instagram vigente es `Manual_Instagram_Automate_IT_v2_3.md`** (en el repo `automate-it`, NO en este).
- ⚠️ **IntersectionObserver:** el observer que activa **todas** las animaciones `.reveal-on-scroll` vive dentro de `SeccionDolor.astro`. Si ese componente se elimina, mueve o condiciona su render, **todas** las animaciones de reveal dejan de funcionar. Antes de tocarlo, mover primero el observer a `BaseLayout.astro`.

## Documentos de referencia en este repo
- `MANUAL_MAESTRO_v4.4.md` — Manual Maestro del sistema multi-agente (vigente).
- `WEBSITE_BRIEF.md` — brief del sitio web (fuente de verdad de diseño/mensaje).
- `Automate_IT_Quienes_Somos_v2_5.md` — documento de identidad corporativa.
- `plan_marketing_2026_v2_3.md` — plan de marketing 2026.
- `README.md` — readme base del repo.

## Stack — detalle no negociable
- **Blog:** Astro Content Collections. Posts en `src/content/blog/*.md` con frontmatter `{ title, description, pubDate, lang, author, tags, draft }`. Listing en `/blog` y `/en/blog`; artículo dinámico `/blog/[slug]` y `/en/blog/[slug]` filtrado por `lang` en `getStaticPaths`.
- **i18n:** built-in Astro 4 i18n + carpetas. Strings centralizadas en `src/i18n/translations.ts`. Rutas: `/`, `/diagnostico`, `/privacidad`, `/terminos` y equivalentes EN `/en/`, `/en/diagnostic`, `/en/privacy`, `/en/terms`.
- **Analytics e integraciones:** placeholders en `src/config/site.ts`. BaseLayout emite scripts solo cuando `isGAEnabled()` / `isSearchConsoleEnabled()` son true.
- **Performance:** Lighthouse mobile baseline 98/96/100/100. FCP 1.6s, LCP 2.0s, TBT 0ms, CLS 0. Favicon SVG, mascota webp 320px, Open Sans self-hosted, Manifold CF preload.
- Antes de agregar una librería JS pesada, **detenerse** y buscar solución CSS pura; proponer al CEO antes de instalar.

## Integraciones activas
- **HubSpot Forms API v3** — 3 formularios. Portal ID `245810986`. Helper `src/lib/hubspot.ts`.
- **Worker `bit-chat-3126`** — chatbot BIT (Claude Haiku).
- **Worker `stripe-checkout-automate`** — pagos Stripe.
- **Google Analytics 4** — `G-82JWGNDTLG` en `src/config/site.ts`.
- **Telegram interno** — Chat ID `8348522203`.

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

## Skills de diseño (contexto permanente)
Instalados bajo `.claude/skills/` como contexto de diseño del proyecto. Auto-descubribles por Claude Code e invocables como slash-commands. **No reemplazan el brief ni el Design System v2.1** — son herramientas de criterio que se aplican _dentro_ de los tokens y reglas de marca de Automate IT (cyan acento, lima solo "live", Manifold CF, sin GSAP/Three.js, mobile-first 375px).

- **`impeccable`** (Paul Bakaus · `pbakaus/impeccable`, v3.5.0) — fluidez de diseño frontend production-grade. SKILL.md + 28 referencias en `reference/` (craft, shape, audit, critique, polish, animate, bolder, colorize, delight, layout, typeset, clarify, distill, harden, optimize, etc.) + tooling de iteración live en navegador y detección de anti-patrones en `scripts/`. Útil para: jerarquía visual, contraste/accesibilidad, tipografía, color, layout, micro-interacciones, auditar UI. Invocar p.ej. `/impeccable polish`, `/impeccable critique`, `/impeccable audit`.
- **`design-motion-principles`** (Kyle Zantos · `kylezantos/design-motion-principles`) — motion/interaction design destilado de Emil Kowalski, Jakub Krehel y Jhey Tompkins. Dos modos: *create* (componentes con motion intencional) y *audit* (detecta motion "AI-slop"). SKILL.md + `references/` (por diseñador, motion-cookbook, performance, accessibility) + `workflows/`. Alinea con la regla del repo: motion CSS puro + IntersectionObserver, ease-out exponencial, sin bounce, respetar `prefers-reduced-motion`.

> Origen del segundo repo: el pedido citaba `carlzentos/design-motion-principles` (no existe); el repo real y vigente es `kylezantos/design-motion-principles`.

## Fuente de verdad
Antes de tocar el sitio, leer en orden: 1) `WEBSITE_BRIEF.md` · 2) Manual de Marca (PDF) · 3) este `CLAUDE.md`. Si el código contradice el brief, **el brief gana** salvo que el CEO lo actualice.
