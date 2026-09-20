# Qué haría yo si fuera tú — Análisis de venta y SEO

> **Fecha:** 20 de septiembre de 2026
> **Alcance:** estado real del negocio, cuello de botella de ventas, auditoría SEO del sitio.
> **Estado:** análisis y recomendación. No cambia código ni copy.

---

## 0. Qué revisé y qué no pude revisar

**Revisé (con evidencia directa):**

- Drive: `LEER_PRIMERO.md`, `Manual_de_Pricing.md` (v1.5, 11-sep-2026), `Protocolo_Diagnostico.md` (v1.8, 11-sep-2026), hoja `Sherlock — Cola Maestra Central Florida`, listado de archivos recientes.
- Repo: `CLAUDE.md`, `MANUAL_MAESTRO_v4_9.md` (secciones 8, 9, 16, 18), `BaseLayout.astro`, `astro.config.mjs`, `src/config/site.ts`, `robots.txt`, `_headers`, `SeoFaq.astro`, `SeccionServicios.astro`, `translations.ts`, `site-copy.ts`, las 25 entradas de `src/content/blog/`, títulos y `noindex` de todas las páginas.
- Gmail: correos enviados desde julio-2026 y bandeja de entrada desde el 1-sep-2026.
- HubSpot: todos los deals del portal 245810986.

**No pude revisar (y por qué):**

- **El sitio en vivo.** La red de esta sesión bloqueó la salida a `yourbizupgraded.com` (el proxy rechazó la conexión). Todo lo que digo de SEO sale del **código fuente del repo**, que es lo que se despliega, pero no verifiqué el HTML servido, ni tiempos de carga reales, ni el sitemap publicado.
- **Search Console y GA4.** No tengo acceso. No sé cuántas impresiones, clics o páginas indexadas tienes hoy. Eso lo tienes que mirar tú, y es lo primero que te pido más abajo.
- Manuales de Drive que no abrí: `MANUAL_MAESTRO.md` (versión 11-sep), `Arquitectura_de_Intervencion.md`, `Manual_de_Adopcion.md`, `Ritual_de_Continuidad.md`, `Perfil_de_Cliente_Ideal.md`. Si alguno contradice lo que digo aquí, ese manual gana.

---

## 1. El hallazgo principal

No tienes un problema de producto, ni de precio, ni de sitio web. **Tienes un problema de conversaciones.** Los números:

| Qué | Cuánto | Fuente |
|---|---|---|
| Dossiers Sherlock completados | **308** | Hoja Cola Maestra |
| Menciones de "no enviado" en esa hoja | **193** | Misma hoja |
| Correos fríos realmente enviados | **~50** (≈40 el 4-sep, 7 el 16-sep, 1 el 11-sep) | Gmail, carpeta Enviados |
| Respuestas de prospectos desde el 1-sep | **0** | Bandeja de entrada: 4 hilos no promocionales, todos proveedores (IONOS, imprenta NFC) |
| Deals en HubSpot | **8 totales** | HubSpot |
| Deals que son pruebas tuyas | **al menos 3** — `+14072145114` es el teléfono de la empresa, `+14074049495` es tu WhatsApp Business, y dos son de `gerardoreloaded@gmail.com` | HubSpot + `site.ts` |
| Deals cerrados ganados | **0** | HubSpot |
| Deals con dinero cobrado | **0** (el único con monto es $0 — consultoría de cortesía) | HubSpot |

Traducido: **investigaste 308 negocios, contactaste a 50, y nadie te respondió.** Y de los 8 registros que hay en el CRM, la mayoría los creaste tú probando el formulario.

Eso no es mala suerte. Es el resultado matemáticamente esperado de este canal:

- Dominio nuevo, sin calentar, enviando ~40 correos en un mismo minuto (los timestamps del 4-sep van de 18:14:42 a 18:27:47 — 40 correos en 13 minutos desde una cuenta de Google Workspace nueva). Una parte de eso ni llegó a bandeja de entrada.
- Asuntos largos y descriptivos ("A quick observation about R. Howe's after-hours service flow"). Leen a plantilla de agencia.
- **Sin secuencia.** Un solo toque. El estándar de cold email es 4-6 toques; el 80% de las respuestas llegan del segundo al quinto.
- Correos a `info@`, `admin@`, `support@` — buzones que el dueño no lee.

Y el dato más incómodo: en `MANUAL_MAESTRO_v4_9.md` §8, la lista de "Próximos Pasos — Orden de Prioridad" tiene **10 ítems y ninguno es hablar con un cliente**. Son Warren, Sheryl, WhatsApp API, CreatorFlow, Meta 2FA, GA4, Bitwarden, oficina virtual. La empresa está construida hacia adentro.

---

## 2. Qué haría yo, en este orden

### Semana 1 — Parar de construir, empezar a llamar

**1. Congela Sherlock.** No un dossier más. 308 es entre 10 y 30 veces lo que necesitas para validar. Cada dossier nuevo es una hora que no estás vendiendo, disfrazada de trabajo productivo.

**2. Cambia de canal: teléfono y puerta, no correo.** Tu ventaja real no es que investigas bien — es que eres un dueño hispano en Kissimmee que le habla en español a otro dueño hispano en Kissimmee. Eso no se transmite por email frío; se transmite por voz. Los 308 dossiers ya tienen el teléfono público (la columna existe y está llena).

Meta concreta: **10 llamadas al día, 5 días a la semana = 50 llamadas/semana.** Con una tasa de contacto del 20% y conversión a reunión del 20%, son ~2 diagnósticos por semana. No necesitas más que eso para empezar.

**3. Un guion de 30 segundos, no un dossier.** El dossier es para ti, no para él. Al teléfono:

> "¿Hablo con el dueño? Soy Gerardo, tengo una empresa aquí en Kissimmee. Le llamo por una razón concreta: revisé cómo entran los trabajos por su página y vi [el hallazgo]. Le tomo dos minutos: ¿cuando entra una solicitud por la web, quién la ve primero y en cuánto tiempo?"

Si contesta esa pregunta, ya tienes la conversación. Si no, cuelgas y sigues.

**4. Arregla el correo antes de volver a usarlo.** Si insistes con email: SPF/DKIM/DMARC verificados, máximo 20 envíos/día desde una cuenta, secuencia de 4 toques separados 3-4 días, asuntos de 3-5 palabras en minúsculas ("una pregunta", "duda rápida"), y buscar el correo personal del dueño, no `info@`. Pero para tu mercado, el teléfono rinde más.

### Semana 2-4 — Cerrar el primero

**5. Una sola puerta por prospecto, y para llamada fría la puerta es la Radiografía de $1** (Pricing §6). Pero ojo: `/ia` está en `noindex` y **no hay un solo enlace interno hacia ella en todo el sitio**. Es una página que solo existe si tú mandas el link. Eso está bien si es deliberado; está mal si creías que la gente la encuentra.

**6. Cobra el primer cliente a precio de catálogo.** Asistente: $1,000 de incorporación + $200/mes. Sin descuento de "cliente fundador". Un descuento en el primer cliente te fija un techo del que no sales, y el Manual de Pricing ya te da el ancla correcta: $200/mes contra $2,917/mes de un recepcionista bilingüe.

**7. La métrica de la semana no es "dossiers" ni "correos". Es conversaciones reales.** Un tablero de tres números: llamadas hechas / conversaciones con el dueño / diagnósticos agendados. Si el lunes no puedes decir esos tres números, la semana no se midió.

### Lo que NO haría ahora

- No construiría más agentes internos (Warren, Sheryl, CreatorFlow, DMs automáticos de Instagram). Son herramientas para operar un negocio que todavía no tiene clientes que operar.
- No pondría dinero en Google Ads ni Meta Ads. Con 0 clientes no sabes qué mensaje convierte, y vas a pagar por aprenderlo caro.
- No rediseñaría el sitio. El sitio no es el problema — lo demuestro abajo.

---

## 3. Auditoría SEO

Todo esto sale de leer el código fuente. **No pude verificar el sitio en vivo ni Search Console.**

### Lo que está bien (y es bastante)

- `sitemap` generado y filtrado correctamente (excluye `/portal`, `/pulso`, `/r/`, `/keystatic`).
- `robots.txt` correcto, con sitemap declarado. La decisión de **no** poner `Disallow: /d/` está bien razonada.
- Canonical emitido solo en páginas indexables — y **omitido a propósito en las `noindex`**. Eso está mejor hecho que en el 90% de los sitios.
- Schema `ProfessionalService` con NAP, `areaServed`, `@id` estable; `Service` por plan colgando del mismo `@id` sin duplicar entidad; `FAQPage` en el home; `Article` en el blog. Bien montado.
- Open Graph y Twitter Card completos, con imagen de 1200×630.
- GA4 diferido 2s tras `load`, con la cola armada de inmediato. Es la implementación correcta.
- Cabeceras de caché e inmutabilidad por tipo de asset. Fuentes self-hosted.
- 25 artículos de blog, con fechas reales y cadencia semanal sostenida desde abril. Eso es trabajo de verdad.

### Lo que está roto — por orden de impacto

**1. No existe un Google Business Profile.** En todo el repo no hay una sola referencia a `business.google.com`, `g.page` ni a una ficha de Google Maps; el `sameAs` del schema solo lleva Instagram, y el propio comentario en `BaseLayout.astro:73` dice "Agregar aquí LinkedIn y el perfil de Google Business **en cuanto existan**".

Para un negocio local de servicios en Orlando esto es *la* palanca de SEO local, y está en cero. El paquete local de Google (el mapa con 3 resultados) se lleva la mayoría de los clics comerciales locales, y no se puede aparecer ahí sin ficha. Tienes un artículo en el blog explicando cómo proteger un GBP — y no tienes GBP.

*Costo: gratis. Tiempo: 30 minutos + la postal de verificación.*

**2. El título del home no dice qué vendes ni dónde.** `index.astro` y `en/index.astro` no pasan `title` ni `description`, así que heredan el genérico: *"Automate IT — Operaciones que avanzan solas"*. Ese es el activo de SEO más valioso del sitio y no contiene ni el servicio, ni la ciudad, ni una palabra que alguien escriba en un buscador. Algo como *"Automatización de operaciones para negocios de servicios en Orlando | Automate IT"* compite; lo actual no.

**3. Los `hreflang` están mal en todas las páginas menos el home.** `BaseLayout.astro` emite siempre:

```
hreflang="es"        → /
hreflang="en"        → /en/
hreflang="x-default" → /
```

Hardcodeado. En `/blog/por-que-tu-negocio-te-tiene-secuestrado`, el `hreflang="en"` apunta al home en inglés, no al artículo equivalente. Los `hreflang` no recíprocos se ignoran, así que hoy no te sirven de nada. Hay que derivarlos de la URL actual.

**4. NAP inconsistente — tres teléfonos distintos para la misma empresa.**

| Número | Dónde aparece |
|---|---|
| (407) 214-5114 | Schema `ProfessionalService`, `quienes-somos`, `about` |
| (321) 217-1239 | Firma del correo automático de confirmación de diagnóstico |
| (407) 404-9495 | WhatsApp Business (`site.ts`) |

El SEO local se sostiene sobre que nombre, dirección y teléfono sean **idénticos** en todas partes. Tres números es tres entidades para Google. Elige uno como número público y que el resto sean canales internos.

**5. El sitio en inglés es una cáscara.** 24 artículos en español, **1 en inglés**. Existen `/en/`, el switcher de idioma y los `hreflang`, pero no hay contenido detrás. O decides llenarlo, o aceptas que inglés no compite y dejas de gastar esfuerzo en mantener dos versiones de todo.

**6. No hay una sola página que capture intención comercial.** El blog contesta preguntas informativas ("¿cuánto te cuesta cada llamada perdida?"). Nadie con tarjeta en la mano busca eso. Falta lo que sí se busca: **servicio × vertical × ciudad.**

Y aquí está lo interesante: las verticales ya las eligió tu propio outbound. De la Cola Maestra: **100 HVAC, 37 plomería, 36 roofing, 35 restauración, 20 couriers, 11 real estate, 11 electricistas, 10 limpieza comercial.** Esas son las páginas que faltan:

- "Contestar llamadas y agendar servicios para empresas de HVAC en Orlando"
- "Seguimiento de estimados para roofers en Central Florida"
- "Intake por WhatsApp para restauración de agua y moho en Kissimmee"

Es el único trabajo de SEO que se conecta directamente con lo que ya estás vendiendo por teléfono.

**7. `/empresas` contradice el Manual de Pricing vigente.** La página vende "La Memoria Operativa" públicamente y es indexable (no tiene `noindex`). Pricing §5 dice, en el manual actualizado el 11-sep: *"Catálogo cerrado: no se publica, no se ofrece de entrada. Se saca solo cuando el caso lo pide."* O la página sale del índice, o el manual se corrige. No pueden convivir.

**8. `CLAUDE.md` está desactualizado y va a hacer daño.** La sección "Catálogo" sigue diciendo *"Starter $99/mes · Professional $179/mes"* con módulos de canal (Voz +$149, WhatsApp +$99...). El sitio real ya vende **Asistente $200 / Estratega $400 / Manager $600** (`translations.ts:355-388`), alineado con Pricing §1. Cualquier agente que lea ese `CLAUDE.md` va a cotizar con precios muertos. Arreglarlo cuesta cinco minutos.

**9. Falta `BreadcrumbList`** en blog y páginas internas. Menor, pero es lo que produce la miga de pan en los resultados de búsqueda.

### Lo primero que tienes que mirar tú

Abre Search Console y dime tres números: **páginas indexadas, impresiones de los últimos 28 días, y clics.** Yo no tengo acceso. Sin esos tres números, todo lo de arriba es una auditoría de código, no una auditoría de rendimiento — y hay una diferencia entre "el sitio está bien construido" (lo está) y "el sitio trae gente" (no lo sé).

---

## 4. Orden de ejecución sugerido

**Esta semana (venta — es lo único que mueve la caja):**

1. Congelar Sherlock.
2. 10 llamadas diarias a la Cola Maestra, empezando por HVAC de Kissimmee y Orlando.
3. Tablero de 3 números: llamadas / conversaciones / diagnósticos agendados.

**Esta semana (SEO — costo casi cero, efecto acumulativo):**

4. Crear el Google Business Profile y pedir verificación.
5. Elegir **un** teléfono público y unificarlo en sitio, schema, firmas de correo y GBP.
6. Poner `title` y `description` propios al home ES y EN.
7. Corregir el `CLAUDE.md` (catálogo).
8. Decidir qué pasa con `/empresas`.

**Próximas 4 semanas:**

9. Arreglar los `hreflang` para que se deriven de la URL.
10. Publicar 3 páginas de servicio × vertical (HVAC, roofing, restauración), en español.
11. Decidir: ¿se llena el sitio en inglés o se congela?

**Cuando haya un cliente pagando:**

12. Retomar herramientas internas. No antes.

---

## 5. La frase que resume todo

Tienes una máquina de investigación sobredimensionada conectada a una máquina de contacto que casi no existe. 308 dossiers, 50 correos, 0 respuestas, 0 clientes. El trabajo que falta no es más análisis — es marcar un teléfono.
