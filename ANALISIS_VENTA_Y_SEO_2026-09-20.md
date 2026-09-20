# Qué haría yo si fuera tú — Análisis de venta y SEO

> **Fecha:** 20 de septiembre de 2026
> **Alcance:** estado real del negocio, cuello de botella de ventas, auditoría SEO del sitio.
> **Estado:** análisis, recomendación y correcciones aplicadas.
> **Segunda pasada (20-sep):** revisión contra los manuales vigentes de ADN. Ver §6, §7 y §8.

---

## 0. Qué revisé y qué no pude revisar

**Revisé (con evidencia directa):**

- Drive: `LEER_PRIMERO.md`, `Manual_de_Pricing.md` (v1.5, 11-sep-2026), `Protocolo_Diagnostico.md` (v1.8, 11-sep-2026), hoja `Sherlock — Cola Maestra Central Florida`, listado de archivos recientes.
- Repo: `CLAUDE.md`, `MANUAL_MAESTRO_v4_9.md` (secciones 8, 9, 16, 18), `BaseLayout.astro`, `astro.config.mjs`, `src/config/site.ts`, `robots.txt`, `_headers`, `SeoFaq.astro`, `SeccionServicios.astro`, `translations.ts`, `site-copy.ts`, las 25 entradas de `src/content/blog/`, títulos y `noindex` de todas las páginas.
- Gmail: correos enviados desde julio-2026 y bandeja de entrada desde el 1-sep-2026.
- HubSpot: todos los deals del portal 245810986.

**No pude revisar (y por qué):**

- **El sitio en vivo.** La red de esta sesión bloquea la salida a `yourbizupgraded.com`: el gateway responde **403 al CONNECT**. No es el dominio — también rechazó `telemetry.astro.build`, así que es la política de red del entorno. Se reintentó el 20-sep y sigue igual. Para revisar el sitio servido hay que permitir el dominio en la política de red del entorno (ver https://code.claude.com/docs/en/claude-code-on-the-web). Todo lo que digo de SEO sale del **HTML que produce el build**, que es lo que Cloudflare publica.
- **Search Console y GA4.** No tengo acceso. No sé cuántas impresiones, clics o páginas indexadas tienes hoy. Eso lo tienes que mirar tú, y es lo primero que te pido más abajo.
- `Ritual_de_Continuidad.md` sigue sin abrir. Si contradice algo de aquí, ese manual gana.

> **Actualización del 20-sep (segunda pasada).** A pedido del CEO se leyeron completos `MANUAL_MAESTRO.md` (v7.2, 11-sep-2026), `Arquitectura_de_Intervencion.md` (v1.0, 11-sep), `Manual_de_Adopcion.md` (v1.1, 11-sep) y `Perfil_de_Cliente_Ideal.md` (v1.0, 15-ago). El resultado está en las secciones 6, 7 y 8. **Dos de mis recomendaciones anteriores quedaron corregidas por esos manuales** y así se marcan.

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


---

# SEGUNDA PASADA — Revisión contra los manuales vigentes

Leídos completos el 20-sep-2026: `MANUAL_MAESTRO.md` v7.2, `Arquitectura_de_Intervencion.md` v1.0, `Manual_de_Adopcion.md` v1.1 y `Perfil_de_Cliente_Ideal.md` v1.0.

## 6. Contradicciones encontradas

### 6.1 Las que contradicen al repo y al sitio

| # | Contradicción | Quién manda | Estado |
|---|---|---|---|
| C-1 | `CLAUDE.md` declaraba `MANUAL_MAESTRO_v4_9.md` (repo, julio) como el manual vigente. El vigente es **v7.2 en ADN/Drive**. El del repo posiciona la IA como producto y describe un modelo comercial por plataforma de voz (Retell directo 0-4 clientes, VoiceAIWrapper 5+) que ya no existe. | Manual Maestro §2 y §6 | **Resuelto** |
| C-2 | `CLAUDE.md` describía el negocio como *"servicio de recepción/comunicación automatizada con IA"*. El manual vigente dice: **"AI es una capacidad de delivery, no el producto ni el posicionamiento"**. El copy del sitio ya estaba alineado con el manual nuevo; solo `CLAUDE.md` seguía en el viejo. | Manual Maestro §2 | **Resuelto** |
| C-3 | `CLAUDE.md` traía el catálogo muerto (Starter $99 / Professional $179 + módulos de canal). Vigente: Asistente / Estratega / Manager. | Pricing §1 | **Resuelto** |
| C-4 | `/empresas` publica "La Memoria Operativa", indexable y sin `noindex`. Pricing §5: *"catálogo cerrado: no se publica, no se ofrece de entrada"*. ICP §7: su canal es *"LinkedIn, referidos, outreach — **nunca** por la home"*. **Dos manuales vigentes, no uno.** | Pricing §5 + ICP §7 | **Abierto — decisión del CEO** |
| C-5 | Nombres de manual versionados en el repo (`MANUAL_MAESTRO_v4_9.md`, `BrandScript_..._v1_1.md`, `Manual_de_Marca_v2_5.docx`, `Quienes_Somos_v2_9.docx`) contra la regla de "un solo archivo por manual, nombre estable, sin número de versión". La regla gobierna ADN, no el repo — pero mientras `CLAUDE.md` los declarara "vigentes", el repo funcionaba como una ADN paralela que se desincroniza. | Manual Maestro §7.1-§7.2 | **Resuelto** (marcados como copia histórica) |

### 6.2 Las que corrigen mi propio análisis

| # | Lo que yo dije | Lo que dicen los manuales | Corrección |
|---|---|---|---|
| M-1 | Páginas SEO por vertical: "HVAC, roofing, restauración". | Hipótesis Comercial v1: concentrar el aprendizaje **primero en HVAC y plumbing / home services con dispatch**. | **HVAC y plomería primero.** Roofing y restauración después, no en la primera tanda. |
| M-2 | "Tu ventaja es ser un dueño hispano en Kissimmee hablándole a otro dueño hispano en Kissimmee." | ICP §6, regla permanente: geografía e idioma **nunca** son filtro. Son foco de mensaje y de targeting de marketing, no condición de elegibilidad. | La frase vale como *targeting*. Pero queda explícito: **nunca rechazar ni redirigir un lead por estar fuera de Florida o por hablar inglés.** El Manual Maestro v4.9 §16-bis documenta que eso ya pasó con un lead real. |
| M-3 | Meta: "~2 diagnósticos por semana" y "cerrar el primer cliente". | Manual Maestro §2.1 e ICP §1-bis ya fijan la métrica de esta fase: **20-30 conversaciones comerciales útiles**, y al llegar ahí se revisa la hipótesis. | Adopto la métrica de la empresa, no la mía. El objetivo de Operación Pulso no es "un cliente", es **evidencia suficiente para validar o tumbar la hipótesis**. |

### 6.3 Lo que los manuales confirman (no contradicen)

- **Congelar Sherlock** no es opinión: es aplicar el **Cost Efficiency Gate** (Manual Maestro §10.4), que trata tokens, ejecuciones y APIs como dinero de la compañía y obliga a *"detener una estrategia de prueba cuando los fallos demuestren que seguir ejecutando no aporta nueva evidencia"*. 308 dossiers contra 0 conversaciones es exactamente el caso que la regla describe.
- **Teléfono y presencial sobre correo frío**: Manual Maestro §2.1 e ICP §1-bis dicen *"preferencia por reuniones y observación presencial cuando aporte valor"*.
- **ICP §3, regla dura:** *"nadie automatiza lo que no está vendiendo. Primero hay que vender; automatizar viene después."* Es la regla que Automate IT le aplica a sus prospectos, escrita también en el copy del sitio, y es la que la propia empresa no se está aplicando.

---

## 7. El hallazgo nuevo: Operación Pulso ya está construida y sin usar

Esto no se veía en la primera pasada porque solo aparece al cruzar el Manual Maestro con el repo.

**Manual Maestro §2.2** le pone nombre y ventana a la campaña: *"Operación Pulso — Central Florida 2026"*, agosto-diciembre de 2026, para *"generar evidencia sobre ICP, mensaje, buying group e intervenciones repetibles"*.

**En el repo ya existe la máquina completa:**

- `src/lib/pulso/` — **40 prospectos** con dossier reducido a formato de página: hallazgos con fuentes verificables, un apartado de "lo que desconozco" y un cierre que invita a llamar.
- `src/pages/pulso/[slug].astro` — una página personalizada por prospecto.
- `src/pages/r/[prospect].ts` — redirección corta que etiqueta la visita con `source: "qr"` y `campaign: "pulso_print"`.

Ese `pulso_print` + `qr` dice para qué fue diseñada la campaña: **material impreso con código QR, entregado en persona.** Y encaja con las cotizaciones de tarjetas NFC metálicas que estás pidiendo por correo desde el 16-sep.

**La conclusión incomoda:** el canal correcto ya estaba elegido, aprobado en el manual y construido en código. Los ~50 correos fríos del 4-sep fueron un desvío al canal más débil, con la infraestructura del canal fuerte terminada y apagada.

Esto **cambia mi recomendación de la primera pasada**. No es "empezar a llamar por teléfono" a secas. Es **encender Operación Pulso como fue diseñada**: impreso o NFC + QR + visita o llamada, con la página personalizada de `/pulso/<slug>` como el material que deja la conversación abierta. El teléfono es el primer toque; la página es lo que queda.

---

## 8. La cola

### 8.1 Resuelto en esta pasada

| # | Qué | Archivo | Verificación |
|---|---|---|---|
| R-1 | **`hreflang` arreglado.** Antes apuntaba siempre a `/` y `/en/` desde toda página. Ahora sale de una tabla explícita de equivalencias reales, y **no se emite nada** cuando la página no tiene contraparte en el otro idioma — declarar una traducción inexistente es peor que no declarar. Se suprime también en páginas `noindex`. | `src/i18n/alternates.ts` (nuevo), `src/layouts/BaseLayout.astro` | Build OK. Verificado en el HTML generado: `/diagnostico/` → `/en/diagnostic/`; el artículo con par ES/EN los declara recíprocos; los 23 artículos solo-ES no declaran ninguno; `/ia` (noindex) no declara ni canonical ni alternates. |
| R-2 | **`hreflang` alineado con `canonical`.** El build genera un directorio por página, así que las URLs servidas llevan barra final. Los `hreflang` ahora la llevan también; si no, la autorreferencia y el canonical son URLs distintas y la reciprocidad puede fallar. | `src/i18n/alternates.ts` | Verificado: canonical y `hreflang` self coinciden carácter por carácter. |
| R-3 | **Home con título y descripción propios**, ES y EN. Antes heredaba el genérico *"Automate IT — Operaciones que avanzan solas"*: sin servicio, sin ciudad, sin intención de búsqueda. Sin la palabra "IA", por Manual Maestro §2. | `src/i18n/translations.ts`, `src/pages/index.astro`, `src/pages/en/index.astro` | ES: *"Automatización y mejora de procesos para negocios en Orlando \| Automate IT"*. EN: *"Business process automation and improvement in Orlando, FL \| Automate IT"*. |
| R-4 | **Bug en la redirección de Pulso.** El flag `?qa=1` se aplicaba **después** del `return`, así que nunca se ejecutaba: abrir `/r/<slug>?qa=1` no propagaba nada a la página destino. | `src/pages/r/[prospect].ts` | Código muerto movido antes del `return`. |
| R-5 | **`CLAUDE.md` corregido** en tres frentes: catálogo vigente (C-3), posicionamiento (C-2) y punteros a los manuales reales de ADN con su jerarquía de fuentes de verdad (C-1, C-5). Se añadió la tabla de puertas de entrada y la nota de la contradicción C-4. | `CLAUDE.md` | — |

### 8.2 Decisiones que solo el CEO puede cerrar

Cuatro, y dos las dejan abiertas los propios manuales.

| # | Decisión | Quién la abrió | Por qué importa ya |
|---|---|---|---|
| D-1 | **`/empresas`: ¿sale del índice o se corrige el manual?** Hoy publica una oferta que dos manuales vigentes marcan como catálogo cerrado. | Contradicción C-4 | Sacar una página del índice es difícil de revertir rápido en SEO. No lo hago sin tu palabra. |
| D-2 | **¿Cuál es el teléfono público único?** Hoy circulan tres: (407) 214-5114 en el schema y en Quiénes Somos, (321) 217-1239 en la firma del correo automático, (407) 404-9495 en WhatsApp. | Auditoría SEO §3, punto 4 | Bloquea el Google Business Profile: la ficha se crea con un número, y ese número tiene que ser el mismo en todas partes desde el día uno. |
| D-3 | **¿Sigue vigente el techo de ~30 empleados?** `Perfil_de_Cliente_Ideal.md` §8 lo dice con todas sus letras: *"Sin cifra vigente que lo confirme (…) hace falta que el CEO lo confirme y se escriba aquí con la razón"*. | ICP §8 | Decide a quién se llama mañana. |
| D-4 | **¿El responsable interno entra como cláusula estándar en los SOW?** `Manual_de_Adopcion.md` §10 lo deja pendiente de revisión legal. | Adopción §10 | Adopción §1: la mensualidad se pierde entre "instalado" y "en uso". El responsable interno es el seguro contra eso. |

### 8.3 Cola de ejecución

**Ventas — esta semana.** Es lo único que mueve la caja.

| # | Acción | Fundamento |
|---|---|---|
| V-1 | Congelar Sherlock. Ni un dossier más hasta tener 20-30 conversaciones. | Manual Maestro §10.4 |
| V-2 | **Encender Operación Pulso como fue diseñada**: impreso/NFC + QR + contacto directo, con `/pulso/<slug>` como material. Los 40 prospectos ya están cargados. | Manual Maestro §2.2 + `src/lib/pulso/` |
| V-3 | Empezar por **HVAC y plomería** de Kissimmee y Orlando. | Manual Maestro §2.1, ICP §1-bis (corrige M-1) |
| V-4 | Métrica de la fase: **20-30 conversaciones comerciales útiles**, registrando los campos que pide `Protocolo_Diagnostico.md` §1-bis (señal, proceso, línea base, indicador, impacto, decisor, aprobador, objeción, intervención, precio, resultado). Al llegar ahí, se revisa la hipótesis. | Manual Maestro §2.1 (corrige M-3) |
| V-5 | Regla que no se rompe: **ningún lead se rechaza por geografía ni idioma.** | ICP §6 (corrige M-2) |

**SEO — costo casi cero, efecto acumulativo.**

| # | Acción | Estado |
|---|---|---|
| S-1 | Crear el Google Business Profile y pedir verificación. | Bloqueado por D-2 |
| S-2 | Unificar el teléfono en sitio, schema, firmas y GBP. | Bloqueado por D-2 |
| S-3 | `hreflang`, título del home, `CLAUDE.md`. | **Hecho** (R-1 a R-5) |
| S-4 | Decidir qué pasa con `/empresas`. | Bloqueado por D-1 |
| S-5 | Publicar 3 páginas de servicio × vertical: **HVAC y plomería primero**. | Pendiente |
| S-6 | Agregar `BreadcrumbList` en blog y páginas internas. | Pendiente |
| S-7 | Decidir: ¿se llena el sitio en inglés (24 ES vs 1 EN) o se congela? | Pendiente |
| S-8 | Mirar Search Console: páginas indexadas, impresiones 28 días, clics. **Solo lo puedes hacer tú.** | Pendiente |

**Cuando haya un cliente pagando.**

| # | Acción |
|---|---|
| P-1 | Retomar herramientas internas (Warren, Sheryl, CreatorFlow, DMs de Instagram). No antes. |
| P-2 | Aplicar `Arquitectura_de_Intervencion.md` al primer proyecto: línea base, extracción de criterio con casos reales, Definición de Instalado copiada al SOW, registro operativo único. |
| P-3 | Aplicar `Manual_de_Adopcion.md`: responsable interno nombrado, las cuatro piezas de entrega (y la tarjeta de fallas, que es la que más se salta), vigilancia activa los primeros 30 días. |


---

# TERCERA PASADA — Auditoría del HTML construido (20-sep)

Sin acceso al sitio servido, se auditó el **build completo**: 49 páginas HTML, sus enlaces internos y sus etiquetas. Eso sí encontró defectos que leer el código fuente no revela.

## 9. Defectos encontrados y corregidos

### 9.1 La imagen de Open Graph no existe

`BaseLayout` declara en **las 49 páginas**:

```
og:image        → https://yourbizupgraded.com/assets/logo-og.png
twitter:image   → el mismo archivo
schema.logo     → el mismo archivo
schema.image    → el mismo archivo
```

**El archivo no estaba en `public/assets/`.** Los únicos logos del repo eran `logo-lockup.webp`, `logo-lockup-light.webp` y `logo-mark.webp`.

Consecuencia: cada enlace del sitio compartido por WhatsApp, Facebook, LinkedIn, X o iMessage se veía **sin imagen de vista previa**, y el `logo` que declara la entidad a Google apuntaba a un 404. Para una campaña cuyo material son páginas personalizadas que se comparten por enlace, eso es caro.

**Corregido.** Se generó `public/assets/logo-og.png` — 1200×630, lockup centrado al 62% del ancho, sobre blanco sólido y sin canal alfa, exactamente como pide el comentario que ya estaba en `BaseLayout` (*"las redes componen la imagen sobre fondos impredecibles, así que aquí no sirve transparencia"*). Es una composición del lockup existente: si hay una pieza diseñada, reemplazar el archivo y listo — el nombre y las medidas ya son los correctos.

*Salvedad honesta: no pude comprobar el 404 contra el sitio en vivo. La certeza viene de que el archivo no está en el repo y Cloudflare Pages publica el output del repo.*

### 9.2 Once enlaces del sitio terminaban en 404 — todos del selector de idioma

`switchLangPath` (en `src/i18n/utils.ts`) prefijaba `/en` a la ruta actual y solo conocía **cinco** equivalencias. Resultado, verificado en el HTML construido:

| Estando en | El selector mandaba a | Existe |
|---|---|---|
| `/empresas` | `/en/empresas` | No |
| `/ia` | `/en/ia` | No |
| `/consultoria` | `/en/consultoria` | No |
| `/quienes-somos` | `/en/quienes-somos` | No — la página es `/en/about` |
| `/terminos-consultoria-emprendedores` | `/en/terminos-consultoria-emprendedores` | No — es `/en/consulting-terms` |
| `/acuerdo-colaboracion` | `/en/acuerdo-colaboracion` | No |
| `/terminos-consulta` | `/en/terminos-consulta` | No |
| `/404` | `/en/404` | No |
| `/en/about` | `/about` | No — es `/quienes-somos` |
| `/en/consulting-terms` | `/consulting-terms` | No — es `/terminos-consultoria-emprendedores` |

**Es el mismo defecto que tenían los `hreflang`**: asumir que la ruta en el otro idioma es la misma con prefijo.

**Corregido** reusando `alternates.ts`, la tabla que ya se creó para los `hreflang`. Cuando la página no tiene contraparte real, el selector lleva al home del otro idioma en vez de a un 404; los artículos sin traducción llevan al listado del blog.

### 9.3 Los enlaces legales del home en inglés eran 404

`Home2026.astro` construía las rutas a mano: `` `${root}/privacidad` `` y `` `${root}/terminos` ``, con `root` vacío en español y `/en` en inglés.

- Home ES → `/privacidad`, `/terminos`: funcionan, pero solo por redirección 301. Un salto extra en cada página.
- Home EN → `/en/privacidad`, `/en/terminos`: **no existen y no tienen redirección** (`astro.config.mjs` solo redirige `/en/privacy`). **404 los dos.**

Es decir: si alguien aterrizaba en el sitio en inglés, los dos enlaces legales del pie estaban rotos.

**Corregido.** Las rutas pasaron a `translations.ts` (`privacyHref` / `termsHref`, ES y EN juntos, como manda la regla del repo de no hardcodear en componentes) y apuntan a las URLs canónicas: `/privacy-policy`, `/terms`, `/en/privacy-policy`, `/en/terms`.

## 10. Verificación

Detector de enlaces internos sobre las 49 páginas del build:

| | Antes | Después |
|---|---|---|
| Enlaces internos rotos | **13** | **0** |
| `og:image` resuelve | No | Sí |

La única ruta que el detector sigue marcando es `/portal/login`, y es correcto: el portal es SSR (`prerender = false`), así que no existe como archivo en `dist`.

**Lo que esta pasada NO prueba:** que el sitio publicado esté sirviendo este build. Eso sigue sin poder verificarse desde aquí.


---

# DECISIONES DEL CEO — 20 de septiembre de 2026

Cierran las cuatro preguntas abiertas de §8.2 y dos más de SEO.

| # | Decisión | Estado |
|---|---|---|
| D-1 | **`/empresas` se retira.** Redirección 301 al home para no romper enlaces guardados ni perder la señal de la URL. | Aplicado |
| D-2 | **Teléfono público único: (407) 404-9495**, el de WhatsApp Business. Unificado en schema, `translations.ts` (ES y EN), `quienes-somos`, `about` y `site.ts`. Desbloquea el Google Business Profile. | Aplicado |
| D-3 | **Sin techo de tamaño de cliente.** El filtro es fricción e impacto, no headcount. Cierra `Perfil_de_Cliente_Ideal.md` §8. | Pendiente de reflejar en ADN |
| D-4 | **El responsable interno no entra como cláusula del SOW.** Se acuerda verbalmente y se registra en las notas del cliente. Cierra `Manual_de_Adopcion.md` §10. El riesgo descrito en §1 de ese manual sigue vigente y se gestiona con seguimiento. | Pendiente de reflejar en ADN |
| S-7 | **Blog en inglés congelado.** Artículos nuevos solo en español; páginas principales en inglés se mantienen (ICP §6 prohíbe que el idioma sea filtro). | Aplicado |
| — | **Titulares del blog:** no se reescriben. Se añade `seoTitle` al frontmatter, que solo cambia lo que muestra el buscador. 19 artículos. | Aplicado |

**Nota de gobierno documental:** D-3 y D-4 tienen que escribirse en sus manuales propietarios de ADN, que es donde manda la regla §7.1-§7.2 del Manual Maestro. El conector de Drive de esta sesión puede leer y crear archivos, pero no reescribir el contenido de uno existente, así que el texto exacto a pegar quedó en `RESUMEN_PARA_GERARDO.md`. Mientras no se pegue, ADN y este repo dicen cosas distintas.

## Entregables nuevos

- `FICHA_GOOGLE_datos_para_copiar.md` — nombre, categorías, zonas, descripción (675 de 750 caracteres) y servicios, listos para pegar en el formulario de Google. Marca explícitamente los tres datos que el CEO tiene que aportar (horario, fecha de apertura, fotos).
- `RESUMEN_PARA_GERARDO.md` — el mismo análisis sin tecnicismos, en una página.

## Pendiente al crear la ficha de Google

Añadir la URL del perfil al array `sameAs` del schema en `BaseLayout.astro`. Es lo que le confirma al buscador que la ficha y el dominio son la misma entidad. Hoy ese array solo lleva Instagram.
