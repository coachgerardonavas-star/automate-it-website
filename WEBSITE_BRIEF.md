# WEBSITE_BRIEF — Automate IT

> **Archivo de contexto persistente.** Claude Code lee este archivo (junto a `CLAUDE.md`) en cada sesión.
> No reescribir desde cero — solo agregar al final cuando haya decisiones nuevas confirmadas por el CEO.
> Última actualización: Abril 2026 (v2 — actualizado tras revisión del preview local).

---

## 1. Identidad del proyecto

- **Empresa:** Automate IT LLC (registro en curso)
- **Dominio:** yourbizupgraded.com (registrado en IONOS)
- **Email corporativo:** automateit@yourbizupgraded.com
- **Tagline oficial:** *Your business, upgraded.*
- **Stack actual:** Vite + JavaScript Vanilla + Three.js + GSAP ScrollTrigger
- **Hosting:** Cloudflare Pages (DNS apuntando desde IONOS). Confirmado.
- **Idioma:** Bilingüe ES/EN con switcher. Default por confirmar.

## 2. Estado actual del sitio

- Hero con animación cinematográfica funcional (isotipo neón trazándose).
- Estructura de carpetas: `src/scenes/`, `src/components/`, `src/assets/`.
- Fondo base: `#050A18`.
- Fuentes cargadas: Open Sans (cuerpo) + Montserrat 800 (títulos, confirmado).
- Falta: secciones 2 a 10 del sitemap, formulario, integraciones, i18n, deploy.

### Issues conocidos (reportados por el CEO en preview local localhost:5173)
- Animación corre demasiado rápido — sensación de cámara rápida. **Fix:** ajustar duración GSAP de cada escena (probablemente subir 1.5x-2x los valores `duration` actuales).
- Video de escena 5 (hombre parándose) luce a AI generation, no natural. **Fix:** reemplazar por stock real de Pexels o Pixabay (búsquedas sugeridas: "entrepreneur closing laptop", "father playing children", "remote work family").

## 3. Audiencia

**Cliente final** (no cliente de Automate IT, el usuario que llega al sitio):
- Dueño/a de pequeño negocio de servicios (dentista, abogado, plomero, salón, inmobiliaria, terapeuta).
- Opera con equipo reducido o solo.
- Carga operativa repetitiva alta.
- No técnico. No le interesa "cómo funciona la IA". Le interesa **recuperar tiempo y dejar de perder leads**.
- Llega vía: Google (SEO local Florida + nacional EE.UU.), referencias, redes.

**Mensaje central:** No vendemos automatización. Vendemos **tiempo recuperado y un negocio que funciona sin secuestrar al dueño**.

## 4. Sitemap definitivo

### Página 1 — Home (one-page cinematográfico)

| # | Sección | Propósito | CTA principal |
|---|---------|-----------|---------------|
| 1 | Hero | Impacto inicial. Isotipo neón trazándose. Tagline "Your business, upgraded." | Ver cómo funciona ↓ |
| 2 | El antes (caos) | Mostrar el dolor: emails, llamadas, notificaciones acumulándose. Texto: "Tu negocio te tiene secuestrado." | — (continuación scroll) |
| 3 | La transición (túnel fibra óptica) | Three.js cinematográfico. Transformación visual del caos al orden. | — |
| 4 | Los agentes | Nodos con conversaciones reales escribiéndose solas. "Equipos de IA especializados ejecutan tu back-office." Redacción genérica — el número de agentes varía por paquete (ver sección 11). | Conoce el equipo ↓ |
| 5 | El después (humano) | Emprendedor cerrando laptop, niños jugando al fondo. "Tu tiempo, recuperado." Cierre emocional. | — |
| 6 | Servicios | 5 individuales + 4 paquetes (extraer literal del Catálogo 2026). Cards con precio y "Más popular / Mejor valor". | Ver paquetes / Diagnóstico gratuito |
| 7 | Cómo funciona | 4 pasos: Diagnóstico → Propuesta → Setup → Go-live. Visual numérica simple. | Empezar diagnóstico |
| 8 | Para quién es esto | Tabla de catálogo: tipo de negocio → problema → solución → paquete recomendado. | — |
| 9 | CTA final | "Diagnóstico gratuito de 30 minutos. Sin compromiso." Formulario corto inline (3 campos máx). | Solicitar diagnóstico |
| 10 | Footer | Email, tagline, switcher idioma, links a /diagnostico, /privacidad, /terminos. | — |

### Página 2 — /diagnostico
- Formulario detallado (nombre, email, teléfono, tipo de negocio, problema principal, urgencia).
- Submit → HubSpot CRM como nuevo lead + email confirmación al usuario + alerta interna a `automateit@yourbizupgraded.com`.

### Página 3 — /privacidad y /terminos
- Necesario para vender a healthcare (HIPAA) y por compliance estándar.
- Generación inicial con plantilla, revisión legal antes de publicar.

## 5. Identidad visual (extraída del Manual de Marca v2.1)

### Colores oficiales — Sistema modo claro (v3, junio 2026)

> El sitio migró a **fondo blanco**. La fuente de verdad de color son los CSS custom properties (`:root`) en `src/styles/global.css`. Ver "Decisiones de identidad visual" al final.

**Fondos**
- Fondo principal `--color-bg`: `#FFFFFF`
- Fondo suave `--color-bg-soft` / `--color-surface-soft`: `#F4F5F7`
- Superficie `--color-surface`: `#FFFFFF`
- Fondo oscuro (solo islas intencionales) `--color-bg-dark`: `#050A18`

**Texto**
- Primario `--color-text-primary`: `#050A18`
- Secundario `--color-text-secondary`: `#344563`
- Atenuado `--color-text-muted`: `#5E6C84`
- Sutil `--color-text-subtle`: `#97A0AF`
- Blanco (sobre islas oscuras/azules) `--color-white`: `#FFFFFF`

**Marca — el acento de TEXTO es blue; el cyan es SOLO decorativo**
- Azul principal `--color-blue`: `#0052CC` ← acento primario de texto (eyebrows, links, destacados, labels de íconos)
- Navy `--color-navy`: `#003DA5` ← hover de botones/links, énfasis
- Cyan `--color-cyan`: `#0099BB` ← **SOLO decorativo** (bordes de cards, íconos sin texto, separadores). Nunca como texto sobre fondo claro.
- Lima `--color-lime`: `#7AB000` ← éxito (oscurecido desde `#AADD00` para legibilidad sobre blanco)

**Bordes**
- `--color-border`: `#E1E4E8`
- `--color-border-strong`: `#C1C7D0`

**Semánticos:** info `#0052CC` · success `#36B37E` · warning `#FF991F` · danger `#E5484D`

**Sombras (neutras, sin neón):** `--shadow-card`, `--shadow-nav` (ver `:root`).

### Tipografía (CONFIRMADO)
- **Títulos:** Montserrat 800 (Google Fonts, gratis). Tracking justo.
- **Cuerpo:** Open Sans (ya cargada).
- **Tagline lockup:** "Your business, upgraded." nunca menor a 11pt.

### Logo
- 3 versiones: Primaria/Color (fondos claros), Neón (fondos oscuros), Sharp/Técnica (monocromo).
- Hero usa versión Neón sobre `#050A18`.

### Verde Lima — reglas estrictas
- Solo en estados "En vivo", "Activo", "Procesando", hover de bordes, contadores en vivo, nodo activo en animaciones.
- **Prohibido:** logo teñido, fondos claros, cuerpo de texto, color dominante, junto a rojo de error.

### Voz y tono
- Cero jerga hueca. Sustantivos concretos, verbos directos.
- Números con fuente. Si no hay número, mecanismo.
- Incertidumbre honesta. Ejemplo válido: "Ahorramos 10 horas/semana al cliente." Ejemplo prohibido: "Desbloqueamos el poder transformador de la IA."

## 6. Integraciones requeridas

| Integración | Propósito | Estado |
|-------------|-----------|--------|
| HubSpot CRM | Recibir leads del formulario | Pendiente conectar |
| Email automateit@yourbizupgraded.com | Notificación interna por nuevo lead | Pendiente |
| Google Analytics o Plausible | Métricas básicas | Pendiente decisión |
| Sin chatbot en sitio | Decisión: el bot de Retell vive en el flujo de venta, no en el sitio público | Confirmado |

## 7. Restricciones técnicas

- **Mobile:** WebGL/Three.js es pesado. Reemplazar con video pregrabado en mobile o reducir complejidad de escenas.
- **SEO:** sitio cinematográfico debe tener fallback de contenido HTML accesible. No depender solo de WebGL para texto.
- **Performance:** carga de hero < 2 segundos en 4G. Lazy-load del resto de escenas.
- **Accesibilidad:** contraste WCAG AA mínimo. Animaciones con `prefers-reduced-motion` respetadas.
- **Compliance:** privacy policy y terms vigentes antes de aceptar leads.

## 8. Lo que NO hacemos (decisiones explícitas)

- **No usamos WordPress.** Plugin Amelia queda descartado. Reservaciones nativas en n8n.
- **No usamos Calendly.** Por costo y por coherencia con el mensaje.
- **No usamos chatbot en el sitio público.** El bot de venta es Retell vía llamada o formulario directo.
- **No metemos testimonios falsos.** Si no hay testimonios reales todavía, esa sección no existe.
- **No prometemos "magia con IA".** Cero jerga hueca. Cada claim sustantivo necesita un mecanismo o número detrás.
- **No usamos video AI generado que se note.** Si parece IA, no va. Stock real (Pexels/Pixabay/Storyblocks) o filmación propia.

## 9. Criterio de "listo" — definición operativa

El sitio está listo para go-live cuando:
- [ ] Las 10 secciones de la home están construidas y conectadas con scroll a velocidad correcta (no cámara rápida).
- [ ] Bilingüe ES/EN funciona sin recargar página.
- [ ] Mobile renderiza sin Three.js pesado o con fallback de video.
- [ ] Formulario `/diagnostico` envía a HubSpot y notifica por email.
- [ ] Privacy policy y terms publicados.
- [ ] Lighthouse Performance > 80 en mobile.
- [ ] DNS apuntado desde IONOS al hosting (Cloudflare Pages).
- [ ] HTTPS activo y verificado.
- [ ] Todos los videos pasan el test "no parece IA".

## 10. Pendientes para el CEO antes de cierre

- Confirmar idioma default (ES o EN).
- Decidir si quiere hero alternativo en mobile (video o estático).
- Aprobar sitemap final o pedir ajustes.
- Definir qué hacer con sección "Servicios" para Enterprise (tiene precio "según alcance").
- Conseguir o autorizar generación de assets visuales:
  - Reemplazo del video escena 5 (Pexels gratis recomendado).
  - Validar que el resto de assets cumplan "no parece IA".

## 11. NOTA CRÍTICA — Sistema modular, NO los 16 agentes para todos

Decisión registrada por el CEO: **no todos los clientes necesitan los 16 agentes**. El sistema es modular según paquete:

- **Starter:** subset mínimo (probable: Tony + Veronica + Marc).
- **Growth:** subset medio.
- **Scale:** subset alto.
- **Enterprise:** los 16 completos (sistema multi-agente custom).

**Implicación para el website:** la sección 4 ("Los agentes") **NO debe decir "16 agentes" como número fijo**. Debe hablar de "equipos especializados" en plural sin comprometer un número que no aplica a todos los paquetes. Para Enterprise sí se puede mencionar "hasta 16+ agentes" en la card específica.

**Implicación para el Arquitecto (futura tarea, no en este sprint):** el Arquitecto debe modelar configuraciones variables, no construir un sistema fijo. Su primera tarea cuando arranquemos será mapear qué subset de agentes corresponde a cada paquete (Starter/Growth/Scale/Enterprise) según rubro del cliente.

## 12. Deuda técnica

**Deuda técnica — Performance**
- [ ] Critical CSS inline para LCP del <h1> hero
  - Contexto: LCP actual 7.5s en mobile, render delay 1,350ms. CSS de Astro (41KB) bloquea el paint inicial.
  - Fix: extraer clases Tailwind críticas del Hero y <h1>, inyectarlas inline en <head>, cargar el resto non-blocking.
  - Impacto estimado: Performance 75 → 85+, LCP 7.5s → ~4s
  - Commits previos relacionados: e168d9a, 03dbf5f
  - Prioridad: media — no bloquea ningún cliente ni conversión actual

---

## 12. Decisiones de identidad visual

### Junio 2026 — Migración a modo claro total
- **Decisión:** Migración a modo claro total (fondo blanco).
- **Motivo:** El sitio oscuro con neón no comunicaba confianza al segmento objetivo (dueños de pequeños negocios hispanos). Fondo blanco con acentos azules transmite profesionalismo y claridad.
- **Excepciones intencionales (islas):** BandaHeuristicas (azul), SeccionCtaFinal (azul), Footer (oscuro), terminal de SeccionAgentes (oscuro), ChatbotWidget (oscuro), tooltip de BitAvatar (oscuro).
- **Tokens eliminados:** `--color-bg:#050A18` como fondo principal; neón puro `#00D9FF` como texto; `#AADD00` como acento de texto.
- **Tokens añadidos:** `--color-bg-soft`, `--color-surface`, `--color-border`, `--color-border-strong`, `--color-text-primary` / `secondary` / `muted` / `subtle`, `--shadow-card`, `--shadow-nav`.
- **Regla de cyan:** `--color-cyan` (#0099BB) queda restringido a uso decorativo (bordes, íconos sin texto, separadores). El acento de texto pasa a `--color-blue` (#0052CC) y el hover a `--color-navy` (#003DA5).

---

*Este documento es la fuente de verdad. Si Claude Code en alguna sesión propone algo que contradiga este brief, el brief gana — salvo que el CEO actualice este archivo explícitamente.*
