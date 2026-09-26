# Auditoría de privacidad, IA y testimonios — yourbizupgraded.com

**Fecha:** 26-sep-2026 · **Rama:** `claude/privacy-compliance-audit-wfaj4w`
**Alcance:** sitio público (Astro), workers de `workers/`, y escenarios de Make que reciben datos del sitio (consulta de solo lectura).
**Esto no es asesoría legal.** Los ítems marcados NEEDS LEGAL REVIEW requieren un abogado. Mapa de datos completo: `docs/privacy-data-map.md`.

Estados: VERIFIED COMPLIANT · FIXED · NEEDS OWNER INPUT · NEEDS LEGAL REVIEW · NOT APPLICABLE

---

## Prioridad alta — leer primero

1. **Llamadas automáticas con agente de voz IA a cada lead del diagnóstico** (ítem 4). El formulario no lo decía. Ya se avisa en el formulario y en la política, pero **avisar no es lo mismo que tener consentimiento** para una llamada con voz artificial. NEEDS LEGAL REVIEW antes de subir tráfico.
2. **El análisis post-llamada guarda "sexo inferido" e "indicio de nacionalidad" en HubSpot** (ítem 4b). Recomendación: quitarlos. NEEDS OWNER INPUT.
3. **Sin aviso de cookies/consentimiento para GA4** (ítem 8). NEEDS LEGAL REVIEW.

---

## 1. La política de privacidad no coincidía con el formulario

**STATUS:** FIXED
**EVIDENCE:** La política decía "Recopilamos únicamente... nombre, teléfono, correo electrónico y los mensajes". El formulario vivo (`DiagnosticoForm.astro`) pide 16 campos, incluido nombre del negocio, sitio web, rol, qué vende, volumen, canales, fricción, frecuencia, resultado deseado, dependencia de persona clave, urgencia, pregunta de datos regulados y dos textos libres. La consultoría pide ~20 campos más; la firma del acuerdo guarda IP y navegador.
**FILE/LOCATION:** `src/i18n/translations.ts` → `es.legal.privacy` y `en.legal.privacy`; `src/pages/privacy-policy.astro`, `src/pages/en/privacy-policy.astro` (fecha).
**ACTION TAKEN:** Política reescrita en ES y EN por categorías, sin "únicamente". 12 secciones: responsable, qué recopilamos, datos automáticos, para qué, IA, con quién, cookies, información sensible, conservación, solicitudes, seguridad, cambios. Se quitó "mejorar nuestros sistemas de automatización" como finalidad porque no hay nada en el código que lo haga.
**REMAINING RISK:** La política no tiene sección de derechos por estado (Florida Digital Bill of Rights, CCPA/CPRA, etc.) porque decidir si aplican depende de umbrales de ingresos y volumen de datos que no están en el repo. NEEDS LEGAL REVIEW.

> Nota: el handoff mencionaba un formulario con dirección, tamaño de equipo y pregunta HIPAA. Ese formulario **ya no está en producción**: es el bloque `diagnosticoPage` de `translations.ts`, que no usa ningún componente.

## 2. Frase absoluta "tus datos no se comparten"

**STATUS:** FIXED
**EVIDENCE:** El formulario vivo ya decía "Tus datos no se venden" (no "no se comparten"). Las frases "no se comparten ni se venden" / "isn't shared or sold" seguían en `ctaFinal.privacyDisclaimer` y `diagnosticoPage.privacyDisclaimer` (ES/EN), hoy código muerto. La política decía "No vendemos, alquilamos ni compartimos... con terceros con fines comerciales". En realidad los datos pasan por Cloudflare, HubSpot, Make, Telegram, Google, Retell AI, Meta, Stripe y Supabase.
**Verificación de "no vendemos":** no hay píxeles publicitarios, no hay integración con brokers ni exportación de listas en el código. No se puede verificar la configuración de Google Signals / vinculación con Google Ads (ver ítem 8).
**FILE/LOCATION:** `translations.ts` (política, `ctaFinal`, `diagnosticoPage`), `DiagnosticoForm.astro`, `terminos-consulta.astro`, `terminos-consultoria-emprendedores.astro`, `en/consulting-terms.astro`.
**ACTION TAKEN:** Fórmula única en todo el sitio: "No vendemos tus datos" + "los procesan los proveedores que usamos para operar" + referencia a la política. Se quitó "solo" de "se usan solo para" en los términos (los datos también se usan para seguimiento comercial y pasan por proveedores).
**REMAINING RISK:** Si GA4 tiene Google Signals o vinculación con Ads activa, algunas leyes estatales pueden tratar eso como "compartir para publicidad". NEEDS OWNER INPUT + NEEDS LEGAL REVIEW.

## 3. Inventario de proveedores

**STATUS:** FIXED (documentado)
**EVIDENCE:** Ver `docs/privacy-data-map.md` §11. Todos los proveedores nombrados en la política tienen evidencia en código o en un blueprint de Make activo. No se nombró Twilio (lo menciona un FAQ muerto, pero no hay evidencia de uso actual).
**ACTION TAKEN:** Lista de proveedores en la política; tabla con datos, propósito, dónde se invoca, IA y pendientes en el mapa.
**REMAINING RISK:** Configuración fuera del repo (paneles de Retell, Cloudflare, GA4, HubSpot) no verificada. NEEDS OWNER INPUT en los puntos marcados ❓ del mapa.

## 4. Transparencia sobre IA

**STATUS:** FIXED (divulgación) · NEEDS LEGAL REVIEW (consentimiento)
**EVIDENCE:** El escenario de Make **5148358** (activo) llama a `api.retellai.com/v2/create-phone-call` por cada diagnóstico no regulado: agente de voz IA "Gaby" llama al teléfono que dejó el lead, con metadata de nombre, tipo de negocio y descripción completa. El escenario **5637378** (activo) recibe el análisis de la llamada y lo guarda en HubSpot y Telegram. El formulario no lo avisaba y la política no lo mencionaba. El worker sí excluye de este flujo a quien marca datos regulados o "no estoy seguro" (`isRegulatedRisk`), verificado.
Separación pedida en el handoff:
- A) "Automate IT usa IA en sus servicios" — ya estaba en el sitio.
- B) "Datos que tú envías los procesa IA" — **sí ocurre** en el diagnóstico (Retell) y **puede ocurrir** en la consultoría (términos, cláusula 7). No ocurre en la firma del acuerdo ni en pagos. WhatsApp: el agente "Marc" está inactivo.
**FILE/LOCATION:** `DiagnosticoForm.astro` (aviso bajo el teléfono + aviso antes del botón), política sección "Uso de inteligencia artificial con tus datos".
**ACTION TAKEN:** Aviso junto al campo de teléfono: "Si lo dejas, es posible que te llame un asistente de voz con inteligencia artificial para continuar el diagnóstico." Aviso antes del botón (antes estaba después) con enlace a la política. La política nombra a Retell AI, qué datos recibe, que genera un resumen y una evaluación, y la excepción de la ruta regulada. No se afirma nada sobre entrenamiento de modelos.
**REMAINING RISK — NEEDS LEGAL REVIEW:** Una llamada con voz generada por IA puede requerir **consentimiento previo expreso** del destinatario (y escrito, si se considera telemarketing) bajo la TCPA; la FCC declaró en febrero de 2024 que las voces generadas por IA cuentan como "voz artificial". La ley de Florida sobre llamadas de telemercadeo (FTSA) también exige consentimiento escrito para llamadas automatizadas. Dejar el teléfono en un formulario **no es necesariamente** ese consentimiento. **No puedo confirmar la conclusión legal**; es exactamente lo que tiene que revisar un abogado. Opciones técnicas para el CEO:
  1. Pausar el módulo de Retell en 5148358 hasta tener opinión legal (lo más seguro).
  2. Agregar una casilla de consentimiento explícita y opcional para la llamada, y que el worker solo mande el teléfono a Make si está marcada (requiere cambiar el formulario **y redesplegar** `diagnostico-intake`).
  No hice ninguno de los dos: ambos cambian una integración de producción fuera del sitio.

### 4b. Inferencias sensibles en el análisis de llamadas

**STATUS:** NEEDS OWNER INPUT · NEEDS LEGAL REVIEW
**EVIDENCE:** Escenario 5637378 escribe en la nota de HubSpot "⚧ Sexo (inferido, NO confirmado)" y "🌎 Nacionalidad (solo si la mencionó)", a partir de `custom_analysis_data.sexo_inferido` y `nacionalidad_indicio` que configura el agente de Retell.
**ACTION TAKEN:** Ninguna en producción. No se publicó en la política a propósito: la corrección correcta es dejar de inferirlo, no anunciarlo.
**REMAINING RISK:** Inferir sexo y origen nacional de una llamada y guardarlos junto a un "score" del lead es un riesgo de discriminación y de privacidad, y no tiene propósito operativo declarado. Recomendación: quitar ambos campos del análisis del agente en Retell y de la nota en Make 5637378. Puedo hacer la parte de Make si el CEO lo aprueba.

## 5. Testimonios, reseñas y casos

**STATUS:** VERIFIED COMPLIANT
**EVIDENCE:** Búsqueda en todo `src/` (componentes, páginas, `translations.ts`, `data/`, 26 posts del blog) de testimonios, reseñas, estrellas, citas, "cliente", "caso de éxito", "case study", fotos de clientes. Resultado:
- Sin testimonios, reseñas ni calificaciones con estrellas.
- Los 5 casos del home (`home2026.problem.items`: tienda de ropa, gabinetes, roofers, HVAC, realtor) se renderizan con la etiqueta visible "Ejemplo ilustrativo" / "Illustrative example" en cada tarjeta (`Home2026.astro:86`). Se conservaron.
- La única cita con nombre es del fundador (Gerardo Navas), identificado como tal.
- `/pulso/*` son revisiones preparadas para prospectos reales (negocios con nombre), `noindex`, fuera del sitemap, enviadas por link. No presentan a esos negocios como clientes.
- La consultoría pide permiso de marketing en casilla separada y opcional (`permiso_marketing`), con revocación por email. Buena práctica, se conserva.
**ACTION TAKEN:** Regla nueva en `CLAUDE.md` (Reglas de copy): resultado real = evidencia + permiso; ejemplo = etiqueta visible; nunca clientes ficticios presentados como reales.
**REMAINING RISK:** Ninguno detectado en páginas vivas.

## 6. Claims de marketing

**STATUS:** VERIFIED COMPLIANT (páginas principales) · NEEDS OWNER INPUT (blog)
**EVIDENCE — páginas principales** (home, quiénes somos, diagnóstico, guías, verticales, `/ia`, consultoría): sin porcentajes, horas ahorradas, montos ni garantías. Los términos dicen explícitamente "no garantiza resultados". Clasificación: sin claims A/B/D.
**EVIDENCE — blog:** los posts usan muchas estadísticas de terceros con fuente nombrada (clasificación B: dato de terceros; varias fuentes son blogs de proveedores de software, calidad baja). No hay resultados de clientes de Automate IT. Claims **sin fuente o presentados como observación propia** (clasificación D):

| Post | Línea | Claim | Por qué D |
|---|---|---|---|
| `por-que-tu-negocio-te-tiene-secuestrado.md` | 20 | "Cuando dueños... nos cuentan su día, casi todos describen... 4 a 8 horas semanales" | Se presenta como observación propia; no hay datos en el repo |
| `cuando-el-negocio-crece-pero-sigues-igual-de-ocupado.md` | 33 | "entre 8 y 15 horas semanales del dueño" en home services de Central Florida | Sin fuente |
| `cuanto-tiempo-pierdes-contestando-tu-mismo-y-cuanto-vale-ese-tiempo.md` | 4, 16 | "entre 10 y 15 horas semanales" (en la descripción aparece como "el dueño promedio") | Sin fuente |
| `ia-en-negocios-latinos-lo-que-dicen-los-datos-en-2026.md` | 51 | "Un recordatorio automático por texto reduce esa tasa por debajo del 5%" | Sin fuente en ese post (otro post lo atribuye a AgentZap/MGMA para *dos* recordatorios) |
| `5-senales-de-que-necesitas-un-agente-inbound.md` | 16 | "Cada llamada perdida... es entre $200 y $1,500 según tu rubro" | Sin fuente |
| `cuanto-pierde-un-negocio-hispano-en-florida-por-cada-llamada-perdida.md` | 48 | "hasta un 90% menos... con mejor consistencia y cobertura real 24/7" | Comparación de desempeño sin fuente |

**ACTION TAKEN:** Solo marcado. No reescribí el blog porque agregar una fuente que no puedo verificar sería inventar sustento.
**REMAINING RISK:** Bajo-medio. Recomendación: agregar fuente o convertir a lenguaje cualitativo ("puede consumir varias horas a la semana"). Si el CEO tiene notas de las conversaciones del primer post, basta con decirlo sin número.

## 7. Datos recopilados automáticamente

**STATUS:** FIXED
**EVIDENCE:** Cloudflare procesa IP/UA/URL/referer de cada solicitud (hosting y Workers con `observability`); los workers usan `CF-Connecting-IP` para rate limiting; la firma guarda IP y User-Agent en HubSpot y manda la IP a Telegram; GA4 pone cookies; las banderas del selector de idioma se cargan desde `flagcdn.com`.
**FILE/LOCATION:** política, sección "Información que se recopila automáticamente"; `acuerdo-colaboracion.astro` (el aviso decía fecha, hora e IP; ahora también "tipo de navegador", que el worker ya guardaba).
**REMAINING RISK:** Recomendación de minimización: autoalojar las 2 banderas SVG (`us.svg`, `ve.svg`) en `public/` y dejar de mandar a flagcdn.com la IP de cada visitante. Cambio chico, no lo hice porque no es parte de alinear la política.

## 8. Cookies y analítica

**STATUS:** FIXED (divulgación) · NEEDS LEGAL REVIEW (consentimiento)
**EVIDENCE:** GA4 `G-PCJWLQ97K6` en `BaseLayout.astro`, `anonymize_ip: true`, carga diferida ~2 s. Eventos `generate_lead` y `form_submit_consultoria` solo con valores de categoría (verificado: sin nombre, email ni teléfono). Portal: cookies `httpOnly` de sesión. No hay GTM contenedor, Meta Pixel, LinkedIn Insight, Clarity, Hotjar ni grabación de sesión.
**ACTION TAKEN:** Sección "Cookies y analítica" en la política con lo verificado. No se inventó un banner ni arquitectura de consentimiento.
**REMAINING RISK:** El sitio carga GA4 sin consentimiento previo. Para visitantes de EE. UU. suele bastar la divulgación, pero depende de los estados y de si hay visitantes de la UE/Reino Unido. NEEDS LEGAL REVIEW. NEEDS OWNER INPUT: ¿Google Signals o vinculación con Google Ads activos en GA4? ¿Cloudflare Web Analytics activo en el panel?

## 9. Pregunta HIPAA / datos regulados

**STATUS:** VERIFIED COMPLIANT (sitio) · NEEDS LEGAL REVIEW (menor)
**EVIDENCE:** El formulario vivo pregunta "¿Tu operación maneja datos con requisitos especiales de privacidad o regulación?" (No/Sí/No estoy seguro). Qué pasa con la respuesta (verificado en `workers/diagnostico-intake/src/index.ts`): Sí o No estoy seguro → no se envía `business_type` ni `context` a propiedades de HubSpot, no se manda texto libre a Telegram, **no se llama a Make ni a Retell**; la nota marca "RUTA MANUAL". El formulario ya decía "No incluyas información de pacientes, contraseñas ni datos sensibles" (se conserva).
Búsqueda de "HIPAA compliant", "HIPAA ready", "PHI", "BAA", "protected health information" en páginas vivas: **ninguna afirmación de cumplimiento**. Las menciones de BAA están en copy muerto (`paquetes.faq`, `diagnosticoPage`) y dicen que primero hay que firmar BAAs, no que ya se cumple.
**ACTION TAKEN:** La política dice que no se envíe información de pacientes y que los formularios no están diseñados para recibirla. No se afirma cumplimiento HIPAA en ninguna parte.
**REMAINING RISK:** Aunque la ruta regulada no dispara la llamada, la nota de HubSpot sí guarda el resto de respuestas estructuradas. Bajo. Si Automate IT llegara a manejar PHI para un cliente, hace falta revisión legal y BAAs antes.

## 10. Minimización de datos

**STATUS:** NEEDS OWNER INPUT
**EVIDENCE / análisis por campo del diagnóstico** ("¿lo necesitamos antes de hablar con el lead?"):

| Campo | ¿Necesario antes de hablar? | Recomendación |
|---|---|---|
| name, email | Sí | Mantener |
| phone | Opcional; hoy dispara la llamada con IA | Mantener opcional; decidir consentimiento (ítem 4) |
| business_name, public_url, role | Útil, no indispensable | Mantener (bajo riesgo, ya opcionales salvo `role`) |
| business_type, context (texto libre) | Útil | Mantener; son los campos con más riesgo de que alguien pegue datos sensibles: el aviso ya lo advierte |
| weekly_demand, entry_channels, friction, frequency, desired_outcome, key_person_dependency, urgency | Sí para el diagnóstico | Mantener (categóricos, bajo riesgo) |
| regulated | Sí: es el que protege | Mantener |
| Dirección, tamaño del equipo, pregunta de pacientes | — | **Ya no se piden** (solo existían en el formulario viejo) |

Fuera del formulario: sexo inferido y nacionalidad en el análisis de Retell (ítem 4b) → **eliminar**. IP de la firma enviada a Telegram → innecesaria en el aviso (ya queda en HubSpot); recomendación: quitarla del mensaje de Telegram en `consultoria-intake`.
**ACTION TAKEN:** Ningún campo eliminado (todos tienen uso operativo).

## 11. Conservación y eliminación

**STATUS:** NEEDS OWNER INPUT
**EVIDENCE:** No hay regla de retención en código, workers ni Make. HubSpot conserva indefinidamente. Existe un escenario de Make **inactivo** "Maintenance — Delete HubSpot Contact" (6038101), bajo demanda: hay una herramienta de borrado manual, no una política.
**ACTION TAKEN:** La política dice la verdad: "Todavía no tenemos plazos fijos... conservamos tu información en nuestro CRM hasta que nos pidas eliminarla", y que proveedores pueden conservar copias.
**Propuesta para revisión del CEO/abogado** (compatible con lo que ya existe):
  1. Leads que nunca se convirtieron: eliminar contacto y notas de HubSpot a los 24 meses sin actividad (una búsqueda filtrada + el escenario 6038101 existente).
  2. Firmas de acuerdos: conservar mientras dure la colaboración + el plazo que indique el abogado.
  3. Telegram: borrar avisos de leads del chat interno cada 90 días.
  4. Make: revisar la retención del historial de ejecuciones según el plan.
  5. Retell: configurar la retención de grabaciones/transcripciones en su panel.
  6. Al recibir una solicitud de eliminación: borrar en HubSpot, Telegram y Retell, y registrar la fecha.

## 12. Contacto para privacidad

**STATUS:** VERIFIED COMPLIANT
**EVIDENCE:** `automateit@yourbizupgraded.com` es el correo de la empresa: aparece en el footer (`mailto:`), en términos, y es la cuenta dueña de los escenarios de Make. Teléfono `(407) 404-9495`, el número público único según `CLAUDE.md` y `src/config/site.ts`. La política vive en `/privacy-policy` y `/en/privacy-policy`, enlazadas desde el footer (`translations.*.home2026.footer`, `footer.privacyHref`); `/privacidad` y `/en/privacy` redirigen 301.
**ACTION TAKEN:** Se agregó el teléfono a la sección de responsable, y enlace a la política desde el formulario de diagnóstico.
**REMAINING RISK:** Observación fuera del repo: el correo de confirmación del diagnóstico (Make 5148358, módulo Gmail) firma con **(321) 217-1239**, no con el número público único. NEEDS OWNER INPUT (corregir en Make).

## 13. Consistencia en el sitio

**STATUS:** FIXED
**EVIDENCE / ACTION:** Búsqueda de "no compartimos", "no se comparten", "no vendemos", "únicamente", "solo recopilamos", "not share", "privacy", "terceros", "cookies", "a salvo", "safe". Cambios:
- `translations.ts`: `ctaFinal.privacyDisclaimer` y `diagnosticoPage.privacyDisclaimer` (ES/EN) → fórmula nueva (código muerto, corregido para que no vuelva).
- `translations.ts`: `errorPage.subheading` (ES/EN) decía "tus datos están a salvo" → "Los datos de pago los procesa Stripe, no nuestro sitio."
- Términos de consulta y de consultoría (ES/EN): cláusula de privacidad alineada; fecha actualizada.
- `hero.trustBadges` "Tus datos no se venden" / "Your data is never sold": consistente, se deja (código muerto).
**REMAINING RISK:** Copy muerto con afirmaciones no verificadas que **no** toqué porque describe servicios a clientes, no a este sitio: `paquetes.faq` — "Automate IT no almacena ni tiene acceso al contenido de las conversaciones... (Retell AI, Twilio)" y "podemos configurar el agente para que no grabe". Hoy contradice lo que hace el propio flujo de leads (los resúmenes de Retell sí se guardan en HubSpot). Si `SeccionPaquetes` vuelve a usarse, revisar primero.

## 14. Promesas de seguridad

**STATUS:** FIXED
**EVIDENCE:** Búsqueda de "100% seguro", "completamente seguro", "military", "encriptación", "never share", "fully compliant": ninguna en páginas vivas. La única absoluta era "tus datos están a salvo" (página de error de pago), corregida.
**ACTION TAKEN:** La sección "Seguridad" de la política describe solo lo verificado (HTTPS con HSTS en `public/_headers`; credenciales de proveedores como secrets de Workers, no en el navegador) y dice que ningún sistema es completamente seguro.

## 15. Secretos

**STATUS:** VERIFIED COMPLIANT (en este cambio) · NEEDS OWNER INPUT (preexistente)
**EVIDENCE:** Los documentos nuevos no incluyen tokens, claves, URLs de webhook, ids de agente ni números de origen de llamadas.
**REMAINING RISK (preexistente, no introducido aquí):** `workers/whatsapp-webhook/index.js` tiene la URL del webhook de Make escrita en el código. El hook exige la cabecera `x-make-apikey` (secret), así que la URL sola no basta para inyectar datos, pero conviene moverla a un secret.

---

## Preguntas abiertas para el CEO (NEEDS OWNER INPUT)

1. ¿Pausamos la llamada automática de Retell hasta tener opinión legal, o agregamos casilla de consentimiento? (ítem 4)
2. ¿Autorizas quitar "sexo inferido" y "nacionalidad" del análisis de Retell y de la nota en Make? (ítem 4b)
3. En GA4: ¿Google Signals o vinculación con Google Ads activos? En Cloudflare: ¿Web Analytics activo? (ítem 8)
4. Retell: ¿graba audio? ¿guarda transcripciones? ¿cuánto tiempo? ¿el número de la empresa recibe llamadas atendidas por "Alejandro"? (mapa §3)
5. WhatsApp: con "Marc" inactivo, ¿cómo se responden hoy los mensajes? (mapa §6)
6. ¿Pasas respuestas de la consultoría o datos de leads por Claude/Vero u otra IA? (mapa §4, §10)
7. Plazos de conservación (propuesta en ítem 11).
8. Correo de confirmación de Make con (321) 217-1239 (ítem 12).

## Para revisión legal (NEEDS LEGAL REVIEW)

1. Consentimiento para llamadas con voz de IA (TCPA / FTSA).
2. Qué leyes estatales de privacidad aplican y si hace falta sección de derechos por estado.
3. Consentimiento de cookies/analítica.
4. Inferencias de sexo y nacionalidad en la calificación de leads.
5. Revisión general del texto nuevo de la política antes de considerarlo definitivo.
