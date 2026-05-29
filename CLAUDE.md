# Automate IT — Website (Astro)

## Proyecto
- **Nombre:** Automate IT — yourbizupgraded.com
- **Repo:** coachgerardonavas-star/automate-it-website
- **Rama principal:** `main`
- **Deploy:** Cloudflare Pages — automático en cada push a `main`

## Quién soy
CEO y dueño de Automate IT (yourbizupgraded.com). Empresa de automatización empresarial con agentes de IA en n8n.

## Qué estamos construyendo
Sitio web one-page en Astro. Sin scroll cinematográfico Three.js. Foco en claridad de mensaje, performance y deploy continuo.

## Stack — no negociable
- **Framework:** Astro 4.x (última estable usada hoy: 4.16)
- **Estilos:** Tailwind CSS 3 vía `@astrojs/tailwind` 5.x
- **Animaciones:** CSS puro + Intersection Observer. **Sin GSAP. Sin Three.js. Sin Vite directo.**
- **Blog:** Astro Content Collections. Schema en `src/content/config.ts`. Posts en `src/content/blog/*.md` con frontmatter `{ title, description, pubDate, lang, author, tags, draft }`. Listing en `/blog` y `/en/blog`, artículo dinámico en `/blog/[slug]` y `/en/blog/[slug]` filtrado por `lang` en `getStaticPaths`.
- **i18n:** built-in Astro 4 i18n + estructura de carpetas. ES en root, EN en `/en/`. Strings centralizadas en `src/i18n/translations.ts` (objeto `{ es, en }`). Componentes aceptan `lang` prop con default `"es"`. Rutas: `/`, `/diagnostico`, `/privacidad`, `/terminos` y sus equivalentes EN `/en/`, `/en/diagnostic`, `/en/privacy`, `/en/terms`.
- **Analytics e integraciones:** placeholders centralizados en `src/config/site.ts` con `GA_ID`, `SEARCH_CONSOLE_VERIFICATION`, `HUBSPOT_*`. BaseLayout solo emite las etiquetas/scripts cuando `isGAEnabled()` / `isSearchConsoleEnabled()` retornan true. Reemplazar los placeholders activa todo automáticamente.
- **Performance:** Lighthouse mobile baseline 98/96/100/100 (Performance / Accessibility / Best Practices / SEO). FCP 1.6s, LCP 2.0s, TBT 0ms, CLS 0. Optimizaciones aplicadas: favicon SVG (no PNG 783KB), mascotas a webp 320px (110KB → 18KB), Open Sans self-hosted vía `@fontsource/open-sans` (sin Google Fonts third-party), Manifold CF preload, prose-blog scoped + `:global()` para no bundle globalmente.
- **Deploy:** Cloudflare Pages — push a `main` = deploy automático
- Si en algún momento se considera agregar una librería JS pesada, **detenerse** y buscar primero solución CSS pura. Solo proponer la librería al CEO antes de instalar.

## Integraciones activas
- **HubSpot Forms API v3** — 3 formularios activos. Portal ID: `245810986`. Helper en `src/lib/hubspot.ts`.
- **Cloudflare Worker `bit-chat-3126`** — chatbot BIT (Claude Haiku vía proxy seguro). Código en `workers/bit-chat-3126/`.
- **Cloudflare Worker `stripe-checkout`** — pagos Stripe.
- **Google Analytics 4** — `G-82JWGNDTLG`. Configurado en `src/config/site.ts`.
- **Telegram interno** — Chat ID: `8348522203` (notificaciones internas).

## Advertencia crítica — IntersectionObserver
El `IntersectionObserver` que activa **todas** las animaciones `.reveal-on-scroll` del sitio vive dentro de `SeccionDolor.astro`. Si ese componente se elimina, se mueve fuera del homepage, o se condiciona su render, **todas** las animaciones de reveal del sitio dejarán de funcionar.

**Antes de tocar `SeccionDolor.astro` (eliminarlo, moverlo, lazy-load, etc.):** mover primero el observer al `BaseLayout.astro` para que viva globalmente. No tocar el componente hasta hacer ese paso.

## Identidad de marca
Tokens disponibles como utilidades Tailwind (`bg-brand-cyan`, etc.) y como CSS custom properties (`var(--color-cyan)`).

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
Disponibles como utilidades Tailwind y/o CSS vars:

- **Neutrales (azul frío):** `neutral-0/50/100/200/300/400/500/600/700/800/900` (`bg-neutral-700`, `text-neutral-400`, etc.)
- **Semánticos:** `info` (`#0052CC` / bg `#E6EEFB`), `success` (`#AADD00` / bg `#F2FBD6`), `warning` (`#F5A524` / bg `#FEF3DC`), `danger` (`#E5484D` / bg `#FDECED`)
- **Lima extra:** `lime-300` `#D9F080`, `lime-400` `#C2EA40`, `lime` `#AADD00`, `lime-600` `#8BB800`. Alias semántico: `--live`.
- **Radii:** `rounded-xs` 4px, `rounded-sm` 6px, `rounded-md` 8px, `rounded-lg` 12px, `rounded-full` 999px.
- **Sombras:** `shadow-xs/sm/md/lg` (capas) + `shadow-neon` (cyan glow) + `shadow-lime` (lima glow). CSS vars: `--glow-cyan-sm/md`, `--glow-lime-sm/md`.
- **Rings de foco:** `--ring-cyan`, `--ring-lime`.
- **Motion:** transición de hover estándar `200ms cubic-bezier(0.2, 0, 0, 1)` (utilidad Tailwind: `ease-brand`). Pulse 2s para alertas en vivo (`animate-pulse-live`). Entry fade+translate-Y(8px) 360ms (`animate-entry`). Sin scale en hover, sin bounce.
- **Iconos:** Lucide via `lucide-astro`. Trazo 2px, color default navy `#003DA5`. Tamaños 16/20/24/32/48px.

## Tipografía
- **Títulos:** **Manifold CF ExtraBold** (auto-hosteada en `/public/fonts/`) con `Montserrat` como fallback. Stack: `'Manifold CF', Montserrat, system-ui, sans-serif`. Utilidad Tailwind: `font-heading`.
- **Cuerpo:** Open Sans 400/600 (Google Fonts) — utilidad por defecto.
- Si en el futuro se actualiza el archivo de fuente, debe quedar en `public/fonts/manifold-cf-extrabold.woff2`. El @font-face vive en `src/styles/global.css` con `font-display: swap`.

## Sitemap (home one-page)
1. **Hero** — Tagline "Your business, upgraded." + H1 + CTAs + línea "Conoce a BIT" con anchor a `#scale`.
2. **Sección Dolor** — 3 cards cualitativas. Sin números no verificados.
3. **Sección Transformación / Cómo funciona** — Timeline de 4 pasos: Diagnóstico → Propuesta → Setup → Go-live.
4. **Sección Agentes en acción** — Mockup terminal con typewriter CSS-only mostrando agentes operando.
5. **Sección Servicios individuales** — 5 servicios con SKU (AIT-SVC-001 a 005) y precio individual.
<!-- TODO: renombrar #growth → #professional antes de distribuir URLs públicas -->
6. **Sección Paquetes** — Starter / Growth / Scale / Enterprise (cada tier con `id` para anchor: `#starter`, `#growth`, `#scale`, `#enterprise`).
7. **Sección Para quién** — Grid por rubro.
8. **CTA final** — Form inline 3 campos.
9. **Footer** — Email, switcher idioma activo, links legales (con noindex hasta revisión legal).

### Catálogo — plan base + módulos de canal (fuente de verdad: el sitio en vivo)
- **Planes base:** Plan Starter $99/mes (setup único $199, negocios generales sin HIPAA) · Plan Professional $179/mes (setup único $349, sector salud HIPAA-compliant).
- **Módulos de canal** (se suman a cualquier plan; cada módulo incluye 300 min/mensajes al mes): Voz (Retell AI) +$149/mes · WhatsApp +$99/mes · Messenger / Web chat +$79/mes (no recomendado con Professional) · CRM & Leads +$99/mes.
- **Ejemplos de precio total:** Solo WhatsApp $198/mes · Voz HIPAA $328/mes · Voz+WhatsApp+CRM $446/mes · Clínica HIPAA Voz+WhatsApp+CRM $526/mes.

## BIT — Mascota / copiloto del sistema
BIT es la cara visible del sistema multi-agente. Aparece en:
- Nav: avatar 28px con tooltip "Hola, soy BIT".
- Hero: avatar 36px + línea "Conoce a BIT, tu copiloto de operación →" con anchor a `#scale`.
- Sección Paquetes / Tier Scale: `mascota1.png` (BIT recostado) como elemento decorativo overflow top-right.
- Chatbot widget flotante (bottom-right, todas las páginas): trigger con avatar BIT + glow cyan + pulse.
- Componente reutilizable: `src/components/BitAvatar.astro` (acepta `lang`, `size`, `showTooltip`). Renderiza `<img src="/assets/mascota.png">` con fondo transparente.
- Activos:
  - `public/assets/mascota.png` — BIT de pie (Nav, Hero, Chatbot)
  - `public/assets/mascota1.png` — BIT recostado (Tier Scale)
- Copy oficial en `translations.bit`: descripción, tooltip, anchorLabel, alt.

## Chatbot widget
Widget flotante CSS-only + vanilla JS en `src/components/ChatbotWidget.astro`. Inyectado vía BaseLayout.astro (prop `chatbot` default `true`; se puede desactivar por página). Estado open/closed via atributo `data-open`. Quick actions a /diagnostico, /#paquetes, mailto. Input funcional pero **webhook pendiente Sprint 6+**: por ahora muestra mensaje "Este chat todavía no está conectado. Te respondemos por email a la brevedad."

## Reglas de copy y mensaje
- Cero jerga hueca. Sustantivos concretos, verbos directos.
- **No prometer números no verificados.** Si no hay dato verificado, copy cualitativo. Si no hay dato, mecanismo.
- Sin testimonios inventados. Si no hay testimonio real, esa sección no existe.
- Voz: incertidumbre honesta. "Ahorramos 10 horas/semana al cliente" ✓ · "Desbloqueamos el poder transformador de la IA" ✗

## Nota crítica — Sistema modular
**No todos los clientes necesitan los 16+ agentes.** El sistema es modular según paquete (Starter / Growth / Scale / Enterprise).
**No mencionar "16 agentes" como número fijo en copy.** Hablar de "equipos especializados" / "agentes" sin comprometer un número que no aplica a todos los paquetes. Solo en la card de Enterprise se puede referenciar "sistema multi-agente custom" o similar.

## Reglas — qué NO hacer
- **No WordPress, no Calendly, no widgets de chat de terceros.** Todo se hostea en Astro + Cloudflare.
- **No Three.js, no GSAP.** Stack archivado en rama `three-js-archive`.
- **No testimonios falsos.** La sección de testimonios no existe hasta tener clientes reales con autorización.
- **No prometer "magia con IA".** Cada claim necesita mecanismo concreto o número verificado.
- **No emojis decorativos.** Iconografía vectorial (Lucide) sí.
- **No copy genérico** tipo "transformamos tu negocio con IA". Sustantivos concretos, verbos directos.
- **No `WidthType.PERCENTAGE` en tablas docx** — usar siempre `DXA` (regla para generadores de informes/propuestas).

## Reglas de trabajo
- **Mobile-first.** Diseña a 375px primero, escala a desktop.
- **No pedir permiso** para naming de archivos, estructura de carpetas, clases Tailwind, orden de CSS.
- **Sí detenerse y reportar** antes de: cambiar una sección completa, salirse de los colores del brief, agregar una librería JS pesada, cambiar el stack.
- **Lighthouse > 85 mobile** es requisito de go-live.
- **Cada cambio debe ser visible y testeable en browser** antes de marcar como completado.
- Cuando termina una tarea, reportar con formato:
  - ✅ COMPLETADO: [una línea por item]
  - 🔄 SIGUIENTE: [siguiente sprint/item]
  - ⚠️ DECISIÓN PROPIA: [decisiones técnicas tomadas sin preguntar]
  - ❓ NECESITO CONFIRMAR: [solo si bloquea sin input del CEO]

## Estructura de carpetas
```
src/
  components/      # Nav, Hero, Seccion*.astro, DiagnosticoForm, LegalContent, BitAvatar, ChatbotWidget
  config/
    site.ts        # GA_ID, HUBSPOT_*, Search Console — configuración global
  content/
    blog/          # posts Markdown (ver Astro Content Collections en Stack)
    config.ts      # schema de la colección blog
  i18n/
    translations.ts  # TODAS las strings ES/EN — NUNCA hardcodear texto en componentes
    utils.ts
  layouts/         # BaseLayout.astro (acepta lang prop)
  lib/
    hubspot.ts     # integración HubSpot Forms API v3
  pages/
    index.astro          # ES home
    diagnostico.astro    # ES /diagnostico
    privacidad.astro     # ES /privacidad
    terminos.astro       # ES /terminos
    blog/                # ES /blog + /blog/[slug]
    en/
      index.astro        # EN home
      diagnostic.astro   # EN /en/diagnostic
      privacy.astro      # EN /en/privacy
      terms.astro        # EN /en/terms
      blog/              # EN /en/blog + /en/blog/[slug]
  styles/          # global.css con tokens
public/
  assets/          # video, logo, imágenes estáticas
  fonts/           # manifold-cf-extrabold.woff2
workers/
  bit-chat-3126/   # Cloudflare Worker — chatbot BIT (Claude Haiku proxy)
  health-check/    # Cloudflare Worker — health check
astro.config.mjs
tailwind.config.mjs
```

## Email corporativo
automateit@yourbizupgraded.com (lead notifications futuras vía HubSpot).

## gstack
Skills instaladas globalmente desde [garrytan/gstack](https://github.com/garrytan/gstack) en `~/.claude/skills/`.

**Browsing web — preferir `/browse` de gstack.** Para cualquier navegación web (abrir páginas, scraping, screenshots, QA visual) usar el skill `/browse` por default. Si `/browse` no está disponible o falla en una tarea concreta, se permite caer a `mcp__claude-in-chrome__*` como respaldo — pero `/browse` es la primera opción siempre.

**Skills disponibles (cuando relevantes a la tarea):**
`/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`, `/design-shotgun`, `/design-html`, `/review`, `/ship`, `/land-and-deploy`, `/canary`, `/benchmark`, `/browse`, `/connect-chrome`, `/qa`, `/qa-only`, `/design-review`, `/setup-browser-cookies`, `/setup-deploy`, `/setup-gbrain`, `/retro`, `/investigate`, `/document-release`, `/codex`, `/cso`, `/autoplan`, `/plan-devex-review`, `/devex-review`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade`, `/learn`.

## Fuente de verdad
Antes de tocar el sitio, leer en este orden:
1. `WEBSITE_BRIEF_ASTRO_v2_2.md`
2. `Manual_de_Marca_from_claude___Automate_IT.pdf`
3. Este archivo `CLAUDE.md`

Si algo en el código contradice el brief, **el brief gana** — salvo que el CEO actualice el brief explícitamente.
