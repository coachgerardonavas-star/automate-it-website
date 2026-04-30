# Automate IT — Website (Astro)

## Quién soy
CEO y dueño de Automate IT (yourbizupgraded.com). Empresa de automatización empresarial con agentes de IA en n8n.

## Qué estamos construyendo
Sitio web one-page en Astro. Sin scroll cinematográfico Three.js. Foco en claridad de mensaje, performance y deploy continuo.

## Stack — no negociable
- **Framework:** Astro 4.x (última estable usada hoy: 4.16)
- **Estilos:** Tailwind CSS 3 vía `@astrojs/tailwind` 5.x
- **Animaciones:** CSS puro + Intersection Observer. **Sin GSAP. Sin Three.js. Sin Vite directo.**
- **Blog:** Astro Content Collections (sprint futuro)
- **i18n:** built-in Astro 4 i18n + estructura de carpetas. ES en root, EN en `/en/`. Strings centralizadas en `src/i18n/translations.ts` (objeto `{ es, en }`). Componentes aceptan `lang` prop con default `"es"`. Rutas: `/`, `/diagnostico`, `/privacidad`, `/terminos` y sus equivalentes EN `/en/`, `/en/diagnostic`, `/en/privacy`, `/en/terms`.
- **Deploy:** Cloudflare Pages — push a `main` = deploy automático
- Si en algún momento se considera agregar una librería JS pesada, **detenerse** y buscar primero solución CSS pura. Solo proponer la librería al CEO antes de instalar.

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
6. **Sección Paquetes** — Starter / Growth / Scale / Enterprise (cada tier con `id` para anchor: `#starter`, `#growth`, `#scale`, `#enterprise`).
7. **Sección Para quién** — Grid por rubro.
8. **CTA final** — Form inline 3 campos.
9. **Footer** — Email, switcher idioma activo, links legales (con noindex hasta revisión legal).

### Catálogo de dos capas
- **Servicios individuales** (Sec 5): contratables sueltos. Precios desde $199/mes hasta $399/mes.
- **Paquetes** (Sec 6): bundles con descuento implícito + servicios adicionales (Starter $449 / Growth $649 / Scale $899 / Enterprise cotización).

## BIT — Mascota / copiloto del sistema
BIT es la cara visible del sistema multi-agente. Aparece en:
- Nav: avatar 28px con tooltip "Hola, soy BIT".
- Hero: avatar 36px + línea "Conoce a BIT, tu copiloto de operación →" con anchor a `#scale`.
- Componente reutilizable: `src/components/BitAvatar.astro` (acepta `lang`, `size`, `showTooltip`).
- Avatar usa placeholder con iniciales "BIT" en cyan sobre navy. Cuando exista `public/assets/mascota.png`, swap a `<img>` (TODO).
- Copy oficial en `translations.bit`: descripción, tooltip, anchorLabel, alt.

## Reglas de copy y mensaje
- Cero jerga hueca. Sustantivos concretos, verbos directos.
- **No prometer números no verificados.** Si no hay dato verificado, copy cualitativo. Si no hay dato, mecanismo.
- Sin testimonios inventados. Si no hay testimonio real, esa sección no existe.
- Voz: incertidumbre honesta. "Ahorramos 10 horas/semana al cliente" ✓ · "Desbloqueamos el poder transformador de la IA" ✗

## Nota crítica — Sistema modular
**No todos los clientes necesitan los 16+ agentes.** El sistema es modular según paquete (Starter / Growth / Scale / Enterprise).
**No mencionar "16 agentes" como número fijo en copy.** Hablar de "equipos especializados" / "agentes" sin comprometer un número que no aplica a todos los paquetes. Solo en la card de Enterprise se puede referenciar "sistema multi-agente custom" o similar.

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
  components/      # Nav, Hero, Seccion*.astro, DiagnosticoForm, LegalContent
  i18n/            # translations.ts (todas las strings ES/EN), utils.ts
  layouts/         # BaseLayout.astro (acepta lang prop)
  pages/
    index.astro          # ES home
    diagnostico.astro    # ES /diagnostico
    privacidad.astro     # ES /privacidad
    terminos.astro       # ES /terminos
    en/
      index.astro        # EN home
      diagnostic.astro   # EN /en/diagnostic
      privacy.astro      # EN /en/privacy
      terms.astro        # EN /en/terms
  styles/          # global.css con tokens
public/
  assets/          # video, logo, imágenes estáticas
astro.config.mjs
tailwind.config.mjs
```

## Email corporativo
automateit@yourbizupgraded.com (lead notifications futuras vía HubSpot).
