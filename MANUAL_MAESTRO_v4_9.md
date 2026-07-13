**AUTOMATE IT**

*Your Business, Upgraded.*

**Manual Maestro del Sistema Multi-Agente**

| **Campo** | **Detalle** |
| --- | --- |
| Versión | 4.9 · Julio 13, 2026 |
| Arquitectura | Claude Code + SDK Anthropic |
| Agentes activos | 3 agentes: Vero (CMO), Warren (CFO), Sheryl (CLO) |
| Canal CEO | Claude Code CLI — interacción directa |
| Sitio web | yourbizupgraded.com — Chatbot BIT v2 activo · voice-profile aplicado |
| n8n | Producto para clientes — NO infraestructura interna |
| Documento | Confidencial · Uso Interno Exclusivo |

# **CAMBIOS EN v4.9 — Julio 13, 2026**

| Actualizaciones en esta versión: • "Florida" se retira como filtro o mención por defecto en BrandScript, Quiénes Somos, Manual de Marca y Manual de Instagram — el modelo es 100% remoto; Florida es mercado de origen, no requisito de elegibilidad. La heurística #3 ($328 vs $2,917 recepcionista en Florida) se mantiene sin cambio por ser cifra verificada. • EVIDENCIA REAL DE GAP CONFIRMADA (screenshot CEO, 13 jul 2026): el agente Marc, en producción, rechazó un lead legítimo por estar fuera de Florida y usó emoji fuera de política. Esto confirma que Marc nunca recibió voice-profile.md, anti-ai-writing-style.md ni el BrandScript — el Claude Code prompt anterior (sesión previa) solo cubrió BIT y Vero, no el escenario de Marc en Make ni el agente Gaby en Retell. Nueva Sección 16-bis documenta el hallazgo y el prompt de corrección. • Aclaración de gobernanza: un documento que referencia otro por nombre no implica que su contenido esté cargado en el system prompt real de producción — deben verificarse ambos por separado. |
| --- |

# **CAMBIOS EN v4.8 — Julio 13, 2026**

| Actualizaciones en esta versión: • BrandScript canónico creado (documento "BrandScript_Automate_IT_v1.md") — fuente única de verdad del mensaje, ordenado según el framework SB7 de Donald Miller (StoryBrand 2.0). Define héroe, problema en 3 niveles (externo/interno/filosófico), guía (empatía+autoridad), plan de 3 pasos, CTA, fracaso y éxito. • Regla de Orden establecida como default de todo copy: primero el problema del cliente, después Automate IT. Nunca abrir un mensaje hablando del sistema/producto. • One-liner oficial definido: ES largo ("Ayudamos a dueños de pequeños negocios en Florida a nunca perder un cliente por no contestar — instalamos el sistema completo, tú solo lo enciendes"), ES corto ("Tu negocio contesta solo. Nosotros lo instalamos. Tú cobras.") y EN. • Manuales sincronizados: Quiénes Somos v2.8, Manual de Marca v2.4, Manual de Instagram v2.6 — todos actualizados para reflejar el orden narrativo StoryBrand y referenciar el BrandScript. • Heurística #6 (sistema unificado, no cinco apps) formalizada en Manual de Marca. |
| --- |

# **CAMBIOS EN v4.7 — Julio 13, 2026**

| Actualizaciones en esta versión: • Análisis de procesos internos de Dapta AI (Nico Rojas) documentado — ver Parte VIII. Fuente: manual de procesos internos aportado por el CEO + investigación web verificada (Forbes, El Tiempo, ENTER.CO, LinkedIn). • GAP CRÍTICO identificado: Marc y Gaby NO tienen acceso estructurado a lista de precios, módulos, ni las seis heurísticas canónicas como contexto de venta. Pendiente de verificación técnica antes de construir el flujo de conversión. • Plan de trabajo definido: activar flujo Prospector → Marc con SLA de contacto <5 minutos (principio "Flujo de Captura Comercial" de Dapta), y cargar contexto de ventas completo a Marc/Gaby. • Estado de ventas: en cero al 13 jul 2026 — prioridad máxima es desbloquear outbound manual + automatizado en paralelo. |
| --- |

# **CAMBIOS EN v4.6 — Julio 12, 2026**

| Actualizaciones en esta versión: • Agente Marc (WhatsApp) operativo: número activo +1 407-404-9495 (WABA ID: 1642912723467886, Phone ID: 1075533292320767). System User Token permanente generado. Cloudflare Worker whatsapp-webhook activo. Make scenario "Marc — WhatsApp Agent" construido (7 módulos). Marc envía respuestas a WhatsApp ✅. Fix pendiente: extraer texto limpio de respuesta Anthropic con replace({{6.data.content[].text}}; "\n"; " "). • Guías PDF como producto de contenido: serie "WhatsApp Business" lanzada. Guía 01 (perfil y visibilidad) y Guía 02 (herramientas nativas) completas en PDF — diseño con identidad Automate IT, generadas con WeasyPrint via HTML. Guardadas en Drive folder Marketing. • Scripts de Reels mejorados: 4 scripts existentes (Competencia, Caballo o Motor, Nadie Te Dice, Yo Soy Todos, Los Papelitos) actualizados con board de expertos. Mejora central: facilitador concreto + CTA activo (comentar palabra clave) en todos. Guardados en Drive folder "Scripts para Reels". • Board de Expertos de Marketing activado: protocolo permanente para todo contenido de marketing. Integra StoryBrand 2.0 (Donald Miller), Neuroventas (Jürgen Klaric), Shadia Chamie (Chief of Social Media) y biblioteca de ganchos. Documento: "Protocolo Board de Expertos — Marketing Automate IT v1.0" en Drive folder Marketing. • CTAs de comentario con palabras clave: WHATSAPP, HERRAMIENTAS, IA, MOTOR, INSTALA, ROLES, SEGUIMIENTO — listos para conectar con flujo comment-to-DM via CreatorFlow. • Drive MCP: cuenta conectada cambiada de coachgerardonavas@gmail.com a automateit@yourbizupgraded.com. Esta es la cuenta correcta para todas las operaciones del negocio. • Bugs Retell corregidos (sesión Cowork jul 12): agent_id ahora con prefijo obligatorio → agent_b9939a72db45ba465af2162faa. Número from_number en E.164 → +15704389330. Escenario 5414594 activado. Escenario 5637378 "Retell Post-Call Webhook" identificado y activo. • HubSpot scope faltante identificado: crm.objects.deals.write causaba error 403 en módulo 17 (createDeal) para leads CALIENTE. Gerardo ejecutó Reauthorize en conexión 8803993 — pendiente confirmar en logs. • Flujo completo Marc documentado: WhatsApp entrante → Marc AI → HubSpot upsert contacto → Router CALIENTE/TIBIO/FRÍO → CALIENTE: createDeal + asociar + Retell outbound (Gaby llama) + Telegram. |
| --- |

# **CAMBIOS EN v4.5 — Junio 9, 2026**

| Actualizaciones en esta versión: • WATI descartado definitivamente: no funcionó, no se usará como BSP de WhatsApp. Eliminado del inventario, arquitectura y credenciales. • WhatsApp: conexión directa con Meta Cloud API (no BSP intermediario). WABA ID: 1642912723467886 · Phone ID: 1107543012440142. Setup pendiente desde PC/navegador. • Retell AI: setup completado. BAA disponible en click-agreements.retellai.com — firmar antes de primer cliente del sector salud. • Piloto SLP (HIPAA): descartado. No es un piloto activo ni un segmento priorizado. Target actual: cualquier dueño latino de negocio en FL sin sector priorizado. • Contexto de mercado: Meta Business Agent (lanzado jun 2026) commoditizó el chatbot básico de WhatsApp. El posicionamiento de Automate IT se ancla en voz + chat unificado + hecho-por-ti. • Gasto fijo mensual actualizado: WATI ($40/mes) eliminado → gasto fijo baja de ~$149 a ~$109/mes. • Documentos del proyecto: tabla actualizada con versiones de junio 2026. |
| --- |

# **CAMBIOS EN v4.4 — Mayo 22, 2026**

| Nuevos en esta versión: • Health Check Worker desplegado: worker health-check en Cloudflare con cron cada 15 min. Monitorea 3 URLs Tier 0 (yourbizupgraded.com, bit-chat-3126, stripe-checkout-automate). KV para estado persistente. Alertas 🔴 caída y 🟢 recuperación a Telegram. • Stripe live activado: modo live activo. Checkout worker actualizado con endpoint /health. • Endpoints /health en workers: bit-chat-3126 y stripe-checkout-automate tienen GET /health que devuelve 200 OK {"status":"ok"}. • Campo address en formulario HubSpot: propiedad estándar agregada entre Phone Number y Company Name. Label: "Dirección del negocio". Opcional. • Make scenario activo: scenario 5148358 "Lead Diagnóstico HubSpot Telegram Email" — HubSpot form trigger → Router → Telegram + Gmail. Cron cada 15 min. Notificación a Telegram (chat 8348522203) + email de confirmación al lead. • Activos evergreen Instagram generados: 4 piezas de Evaluación generadas por Vero — carrusel Starter vs Professional, FAQ objeciones, post heurísticas, story diagnóstico. Pendientes aprobación CEO. • Titular SeccionDolor actualizado: "Si no contestas rápido, el siguiente negocio en Google sí lo hace." • Commit actual: 326491b en rama main. |
| --- |

# **PARTE I — FUNDAMENTOS Y ARQUITECTURA**

## **1. ADN de Automate IT**

| **Pilar** | **Definición Operativa** |
| --- | --- |
| PROACTIVIDAD | Ningún agente espera órdenes. Todos observan, detectan y sugieren de forma autónoma. |
| CREATIVIDAD | Warren es creativo en finanzas. Sheryl en legal. Vero en crecimiento. |
| EFICIENCIA | Máximo impacto con mínimos recursos. Si se puede mejorar 1%, se mejora ahora. |
| HONESTIDAD RADICAL | Cero tolerancia a alucinaciones. Si un agente no sabe algo, lo dice. |
| RESILIENCIA OPERATIVA | Todo proceso automatizado tiene un punto de detección de fallo. Ningún sistema para en silencio. |
| AUTOMATION-FIRST | Automate IT opera con los mismos sistemas que vende. Proceso manual automatizable = deuda operativa. |

## **2. Arquitectura del Sistema — Estado Actual**

| **Componente** | **Tecnología** | **Estado** |
| --- | --- | --- |
| Motor de agentes | Claude Code (Anthropic CLI) | ACTIVO |
| Modelo LLM | claude-sonnet-4-5 (vía API) | ACTIVO |
| Agente Vero (CMO) | vero_brief.py + vero_approval.py + vero_weekly.py | ACTIVO — scripts corriendo en Windows via Task Scheduler |
| Agente Warren (CFO) | Claude Code — en construcción | EN DESARROLLO |
| Agente Sheryl (CLO) | Claude Code — en construcción | EN DESARROLLO |
| Chatbot BIT (sitio web) | Claude Haiku via Cloudflare Worker bit-chat-3126 | ACTIVO — v2 con voice profile |
| LLM Router (resiliencia) | claude-code-llm-router — pendiente instalación | PENDIENTE |
| n8n (workflows) | Cuenta cancelada — ZIP archivado | ARCHIVADO — solo para clientes |
| Telegram CEO | Activo via scripts de Vero (Python) | ACTIVO — briefs y aprobaciones |
| Retell AI (voz) | Setup completado | ACTIVO |
| WhatsApp / Agente Marc | Meta Cloud API directa · +1 407-404-9495 · Make scenario 5414594 activo | ACTIVO — Fix pendiente: confirmar scope HubSpot deals.write (error 403 módulo 17) |
| Retell Post-Call Webhook | Make scenario 5637378 | ACTIVO |
| HubSpot (CRM) | Free tier activo | ACTIVO |
| Stripe | Live mode activo — Mayo 22, 2026 | ACTIVO |
| Health Check Worker | Cloudflare Worker health-check — cron 15min | ACTIVO — monitorea 3 URLs Tier 0 |
| CreatorFlow (Instagram DMs) | Tier gratis — 500 DMs/mes | PENDIENTE CONFIGURAR |

| ⚠  n8n NO es infraestructura interna. Es un producto que se vende a clientes. Cuenta cloud cancelada Mayo 2026. |
| --- |

| ⚠  WATI DESCARTADO DEFINITIVAMENTE (jun 2026). No funcionó como BSP de WhatsApp. No se usará ni se sugerirá en ningún flujo. WhatsApp = Meta Cloud API directa. |
| --- |

## **2A. Contexto de Mercado — Junio 2026**

| Este contexto afecta decisiones de producto, posicionamiento y roadmap. Debe leerse antes de construir cualquier nueva integración de canal. |
| --- |

**Meta Business Agent (lanzado jun 3, 2026):**
Meta lanzó un agente de IA nativo para WhatsApp, Instagram y Messenger con un tier gratuito básico. Consecuencia directa: el chatbot de chat básico se commoditizó. Automate IT **no vende "te automatizo el WhatsApp"** como diferencial aislado — Meta ya lo regala.

**Lo que Meta NO hace (ventaja Automate IT):**
- No contesta la línea **telefónica**.
- No es **hecho-por-ti** — el dueño lo configura solo.
- No unifica **voz + chat + CRM** en un solo sistema operado.
- No tiene el conocimiento cultural específico del mercado hispano.

**Voz en español commoditizándose:**
Rosie, AgentZap y CaseGen ya incluyen español. "Bilingüe" y "24/7" como capacidades técnicas ya no diferencian solos.

**Posicionamiento defendible:**
Voz + chat unificados en un solo sistema + hecho-por-ti + cultural/hispano. Ese es el eje. (Florida es el mercado de origen; el servicio es 100% remoto y no se limita por estado.)

## **2A-bis. BrandScript Canónico — Fuente de Verdad del Mensaje**

| REGLA PERMANENTE (v4.8): todo copy de Automate IT —sitio, reels, carruseles, captions, CTAs, guiones de Marc y Gaby, emails, anuncios— se ordena según el BrandScript (documento "BrandScript_Automate_IT_v1.md"). Cuando cualquier texto de marketing entre en conflicto con el BrandScript, manda el BrandScript. |
| --- |

**Regla de Orden (default de todo mensaje):** primero el problema del cliente, después Automate IT. Nunca abrir hablando del sistema. El cliente es el héroe; Automate IT es el guía.

**One-liner oficial:**
- Largo: "Ayudamos a dueños de pequeños negocios hispanos a nunca perder un cliente por no contestar — instalamos el sistema completo, de forma 100% remota, y tú solo lo enciendes."
- Corto (redes): "Tu negocio contesta solo. Nosotros lo instalamos. Tú cobras."

**Los 7 elementos (resumen — ver BrandScript completo para el detalle):**

| **Elemento** | **Contenido canónico** |
| --- | --- |
| Héroe (qué quiere) | Que su negocio funcione aunque él no esté disponible. |
| Problema externo | Pierde llamadas y WhatsApp; el cliente llama al siguiente en Google. |
| Problema interno | Se siente atrapado — el negocio depende de que él esté disponible. |
| Problema filosófico | El que trabaja duro merece que su negocio opere a su nivel. |
| Guía (empatía + autoridad) | "Sabemos lo que es contestar con las manos ocupadas" + "instalamos el sistema para negocios como el tuyo — donde sea que operes". |
| Plan (3 pasos) | 1) Hablamos · 2) Lo instalamos · 3) Tu negocio contesta. |
| CTA | Directo: "Agenda tu diagnóstico gratis." Transicional: "Comenta [palabra clave] y te envío la guía." |
| Fracaso | Cada semana sin sistema = más clientes perdidos que nunca sabrás que perdiste. |
| Éxito | Llegas a casa sin revisar el teléfono; el CRM muestra citas agendadas solas. |

## **2B. Principios de Resiliencia Operativa**

| Fuente: Individra MCP Router (referencia) + claude-code-llm-router (PyPI, verificado Mayo 2026). Principio: todo sistema automatizado falla eventualmente. El sistema profesional falla de forma controlada y continúa operando. |
| --- |

**Patrón 1 — Circuit Breaker**

| **Estado** | **Condición** | **Comportamiento** |
| --- | --- | --- |
| CLOSED | Proveedor funcionando | Las llamadas pasan sin modificación. |
| OPEN | Proveedor caído | Las llamadas se redirigen al fallback. Se registra alerta. |
| HALF_OPEN | Intentando recuperación | Se prueba con una llamada de prueba. Si falla, vuelve a OPEN. |

**Patrón 2 — Fallback en Cascada**

| **Nivel** | **Descripción** | **Ejemplo** |
| --- | --- | --- |
| Nivel 1 — Fallback automático | Servicio alternativo del mismo tipo | Retell AI falla → proveedor de voz alternativo |
| Nivel 2 — Degradación controlada | Funcionalidad reducida pero operativa | Agente de voz falla → WhatsApp captura el lead |
| Nivel 3 — Alerta al CEO | Notificación Telegram con contexto | Todo falla → Telegram con instrucciones claras |

**Patrón 3 — Tiers de Criticidad**

| **Tier** | **Definición** | **Ejemplos Automate IT** | **Acción si falla** |
| --- | --- | --- | --- |
| Tier 0 — Crítico | El negocio no opera sin esto | Agente de voz cliente, intake leads, Stripe | Fallback + alerta CEO < 2 min |
| Tier 1 — Importante | Impacto significativo, hay workaround | HubSpot, chatbot BIT, Telegram | Fallback + alerta CEO < 15 min |
| Tier 2 — Conveniente | Mejora pero no bloquea | Scripts Vero, briefings, SEO | Log + revisar siguiente día hábil |

| REGLA: Ningún sistema entregado a cliente puede tener punto único de fallo sin fallback. Completar checklist Sección 12 antes de marcar cualquier entregable como DONE. |
| --- |

## **2C. Filosofía Automation-First**

| **Proceso** | **Estado actual** | **Objetivo** | **Próximo paso** |
| --- | --- | --- | --- |
| Brief diario de contenido IG | Script cron — lunes/miércoles/sábado 5 PM | Autónomo — CEO solo aprueba | Completado ✓ |
| Aprobación de content brief | Loop OK/No via Telegram (vero_approval.py) | Nivel 1 fricción cero | Completado ✓ |
| Briefing semanal marketing | Script cron — domingos 8 PM | Autónomo | Completado ✓ |
| Generación de prompts visuales IG | Incluido en vero_brief.py | Vero genera prompt + CEO aprueba | Completado ✓ |
| Caption completo del post | Incluido en vero_brief.py | Vero genera caption listo | Completado ✓ |
| Publicación en Instagram | Manual (CEO publica) | CEO solo aprueba, publica con 1 tap | Evaluar Meta Graph API |
| Respuesta a DMs de Exploración | Manual / CreatorFlow (pendiente) | Bot responde, escala Evaluación | Configurar CreatorFlow |
| Intake de leads desde sitio | Automatizado (HubSpot + Telegram) | DONE | — |
| Seguimiento de leads en CRM | Automatizado (Make scenario 5148358) | Telegram + email al lead en <15 min | DONE — Mayo 22, 2026 |
| Reportes financieros | Manual (Warren pendiente) | Warren genera reporte semanal | Completar agente Warren en Claude Code |
| Alertas de sistema caído | Health Check Worker — cron 15min | Health checks Tier 0 con alerta 🔴🟢 | DONE — Mayo 22, 2026 |

## **2D. Protocolo de Fricción Cero**

| **Nivel** | **Descripción** | **Cuándo aplica** |
| --- | --- | --- |
| Nivel 0 — Cero intervención | El proceso corre y registra solo | Logs, backups, health checks |
| Nivel 1 — Aprobación 1 acción | CEO responde OK o No en Telegram | Briefs de contenido, ideas de Vero |
| Nivel 2 — Revisión mínima | CEO revisa borrador y ajusta | Propuestas comerciales, contratos |
| Nivel 3 — Participación activa | CEO ejecuta directamente | Demos, decisiones estratégicas, firmas |

# **PARTE II — EQUIPO DE AGENTES**

## **3. Sistema Vero — Estado Completo**

| Vero opera como CMO automatizada via scripts Python + Telegram + Anthropic API. voice-profile.md y anti-ai-writing-style.md están incorporados en el system prompt de todos los scripts. |
| --- |

| **Script** | **Corre** | **Qué hace** |
| --- | --- | --- |
| vero_brief.py | Lun/Mié/Sáb 5 PM | Genera brief completo: concepto, caption, prompt visual, estructura. Manda a Telegram con firma "🤖 VERO — CMO · Automate IT" |
| vero_approval.py | Lun/Mié/Sáb 5:30 PM | Lee respuesta del CEO en Telegram. OK → aprueba y loguea. No + razón → genera alternativa y la manda. |
| vero_weekly.py | Domingos 8 PM | Briefing semanal: 3 posts de la semana, acción SEO, meta del mes, recordatorio de reglas. |

**Calendario de publicación:**

| **Publica** | **Hora** | **Modo** | **Brief llega el** |
| --- | --- | --- | --- |
| Martes | 5 AM EST | Exploración | Lunes 5 PM |
| Jueves | 5 AM EST | Exploración | Miércoles 5 PM |
| Domingo | 5 AM EST | Evaluación (heurística) | Sábado 5 PM |

**Ubicación de scripts:**

- C:\automate-it\scripts\vero_brief.py
- C:\automate-it\scripts\vero_approval.py
- C:\automate-it\scripts\vero_weekly.py
- Log: C:\automate-it\scripts\vero_approvals.json

**Heurísticas activas de Automate IT (aplicadas en posts de Evaluación — domingos):**

Nota: heurísticas #2 y #5 debilitadas por commoditización (jun 2026). Ver Manual de Instagram v2.4 Sección 3.3 para veredicto completo y propuesta de #6.

- "Cada llamada sin contestar es un cliente que llama al siguiente en Google." [fuerte]
- "Tu agente contesta en inglés y en español. El dueño no tiene que estar." [debilitada — reformulación pendiente]
- "$328/mes vs $2,917/mes de recepcionista bilingüe en Florida." [fuerte — ancla en voz, mes vs mes]
- "No necesitas aprender IA. Yo te instalo el sistema, tú enciendes el switch." [muy fuerte — amplificar]
- "24/7/365. Sin días festivos, sin llamadas perdidas." [debilitada — todos lo dicen]

**FILOSOFÍA DE CONTENIDO — REGLA FUNDAMENTAL**

| Aplica a todo el contenido que produce Vero (Instagram y blog). Detalle operativo completo en Manual de Instagram v2.4, Sección 3.1. |
| --- |

- **Regla 50/50:** Al menos el 50% del contenido no menciona Automate IT. Habla PARA el dueño de negocio latino. El otro 50% es producto/marca contado con historia — nunca con números solos.
- **Test obligatorio antes de publicar cualquier pieza:** "¿Por qué alguien que está viendo perritos se detendría a leer esto?" Si no hay respuesta clara → no se publica.
- **Límite del expertise:** el contenido de valor puro solo vive dentro de lo que Automate IT sabe hacer.
- **Humor y tono ligero:** máximo 10% de las piezas. Nunca reírse del prospecto — reírse CON él.
- **NO vender "chatbot de WhatsApp" aislado** — Meta lo regala gratis. Anclar siempre en sistema completo.

## **4. BIT — Chatbot del sitio web**

| **Parámetro** | **Valor** |
| --- | --- |
| Modelo | claude-haiku-4-5-20251001 |
| Worker | bit-chat-3126 (Cloudflare) |
| Worker URL | https://bit-chat-3126.coachgerardonavas.workers.dev |
| Secret | ANTHROPIC_KEY (configurado en dashboard Cloudflare) |
| Source | workers/bit-chat-3126/index.js (en repositorio GitHub) |
| System prompt draft | workers/bit-chat-3126/SYSTEM_PROMPT_draft.md |
| Preview URLs | Deshabilitadas (preview_urls = false en wrangler.toml) |
| CORS | yourbizupgraded.com + localhost:4321 + 127.0.0.1 |
| Historial max | 10 mensajes (cap para controlar costo de tokens) |
| Captura leads | HubSpot Form GUID: cd8b13bd-f8b9-4876-acc8-69be4df0027c |
| Voice profile | voice-profile.md + anti-ai-writing-style.md incorporados |

**Comportamiento de BIT:**

- Responde preguntas sobre planes, precios y funcionamiento del servicio.
- Califica al lead: tipo de negocio, pain point, urgencia, HIPAA.
- Después de 2-3 intercambios dirige al formulario /diagnostico (5 minutos).
- NO menciona agendamiento de llamada — solo dirige al formulario.
- Detecta email en el mensaje → captura lead en HubSpot silenciosamente.

# **PARTE III — PROTOCOLOS OPERATIVOS**

## **5. Reglas de Honestidad Radical**

| TODO agente debe incluir en su system prompt: "Si no sabes algo con certeza, dilo. Prefiere 'no tengo información suficiente' sobre cualquier invención." "REGLA CRÍTICA SOBRE TOOLS: Responde con texto directo SIEMPRE para análisis, planificación o documentación. NO uses tools a menos que el CEO lo pida EXPLÍCITAMENTE." |
| --- |

## **6. Reglas de Comportamiento de Claude**

| **Regla** | **Descripción** |
| --- | --- |
| Automation-First proactivo | En cada proceso nuevo, sugerir siempre cómo automatizarlo. No esperar a que el CEO pregunte. |
| Fricción Cero | Si el CEO está ejecutando algo que un agente puede hacer, señalarlo. NUNCA pedirle al CEO que ejecute lo que Claude Code puede hacer. |
| Resiliencia por defecto | En cada sistema propuesto, incluir el punto de fallo más probable y su fallback. |
| Verificable sobre inteligente | Toda afirmación sustantiva tiene origen declarable. Si no hay certeza, declararlo. |
| Pendientes activos | Si el CEO menciona algo pendiente, retomarlo y proponer el siguiente paso. |

# **PARTE IV — ESTADO DEL PROYECTO**

## **7. Estado Actual — Junio 9, 2026**

| **Estado** | **Item** |
| --- | --- |
| DONE | Automate IT LLC constituida (SunBiz + EIN) — legalmente hábil para operar y cobrar |
| DONE | Chatbot BIT v2 con voice profile activo en producción |
| DONE | Scripts Vero: vero_brief.py + vero_approval.py + vero_weekly.py en Windows Task Scheduler |
| DONE | Sitio web: bugs nav corregidos, banda heurísticas, microcopy /diagnostico, FAQ 11 preguntas |
| DONE | Formulario diagnóstico: campo dirección, flujo sin agendamiento |
| DONE | Stripe live activado — Mayo 22, 2026 |
| DONE | Health checks Tier 0 con alerta Telegram — worker health-check activo |
| DONE | Campo address agregado al formulario HubSpot |
| DONE | Seguimiento automático de leads — Make scenario 5148358 activo |
| DONE | Retell AI setup completado |
| DONE | Sitio web — estadísticas con fuente (62%/85%/$126K) — jun 9, 2026 |
| DONE | Sitio web — ejemplos de precio actualizados (target amplio) — jun 9, 2026 |
| DONE | Sitio web — subhead hero reancado a "un solo sistema + hecho-por-ti" — jun 9, 2026 |
| EN CURSO | Agentes Warren y Sheryl en Claude Code |
| EN CURSO | Bloque "hecho-por-ti" subir cerca del hero — plan de reorden pendiente aprobación CEO |
| PENDIENTE | Setup WhatsApp directa con Meta Cloud API (WATI descartado) |
| PENDIENTE | Configurar CreatorFlow para DMs de Instagram (tier gratis) |
| PENDIENTE | Instalar claude-code-llm-router en Claude Code |
| PENDIENTE | Migrar GA4 + Search Console de gmail a automateit@yourbizupgraded.com |
| PENDIENTE | Contratar Bitwarden Business |
| PENDIENTE | Cancelar oficina virtual antes de próxima renovación |
| PENDIENTE | Definir memory files (.md) por agente (Warren y Sheryl) antes de completar |
| PENDIENTE | Evaluar Meta Graph API para publicación directa desde Vero |

## **7B. Pendiente Técnico — LLM Router para Claude Code**

| ⏳ PENDIENTE — Requiere acceso a VS Code / terminal de Claude Code: pip install claude-code-llm-router. Configurar como MCP server en Claude Code settings. Proveedores: Anthropic (primario) → OpenRouter (fallback) → Groq (compresión rápida). Por qué importa: evita alucinaciones por contexto lleno en proyectos grandes. |
| --- |

## **7C. Setup WhatsApp — Meta Cloud API Directa**

| WATI descartado definitivamente (jun 2026). La conexión de WhatsApp será directa con Meta Cloud API. |
| --- |

- **WABA ID:** 1642912723467886
- **Phone Number ID:** 1107543012440142
- **Setup:** desde PC/navegador en Meta Business Manager. No requiere teléfono físico — solo un número que reciba código una vez.
- **Opción Coexistence:** permite usar app de WhatsApp + API en el mismo número sin perder datos.
- **Embedded Signup:** crea WABA en el Business Manager del cliente; la agencia obtiene rol de agencia.

## **8. Próximos Pasos — Orden de Prioridad**

| **#** | **Acción** | **Nivel de fricción CEO** | **Bloqueante para** |
| --- | --- | --- | --- |
| 1 | Completar agentes Warren y Sheryl en Claude Code | Nivel 1 cuando estén listos | CEO OS completo |
| 2 | Setup WhatsApp Meta Cloud API directa | Dashboard Meta Business Manager | Canal WhatsApp para clientes |
| 3 | Configurar CreatorFlow — DMs automáticos Instagram | Dashboard CreatorFlow (web) | Respuesta automática a prospectos |
| 4 | Resolver Meta 2FA loop — acceso Meta Cloud API | Claude Code + Meta support | DMs automáticos + WhatsApp |
| 5 | Aprobar activos evergreen Instagram (4 piezas generadas por Vero) | Nivel 1 — CEO aprueba | Escalar tráfico orgánico |
| 6 | Migrar GA4 + Search Console a automateit@yourbizupgraded.com | Dashboard Google | Analytics unificado bajo cuenta de negocio |
| 7 | Meta Graph API para publicar desde Vero | Claude Code lo integra | Marketing Nivel 0 |
| 8 | Instalar claude-code-llm-router | Bloqueado — sin repo verificado | Resiliencia LLM |
| 9 | Contratar Bitwarden Business | CEO ejecuta una sola vez | Seguridad credenciales |
| 10 | Cancelar oficina virtual | CEO ejecuta una sola vez | Reducir costos |

# **PARTE V — REFERENCIAS TÉCNICAS**

## **9. Modelo Comercial**

| **Fase** | **Plataforma de voz** | **Condición** |
| --- | --- | --- |
| 0–4 clientes | Retell AI directo — gestión manual en Sheets | Estado actual |
| 5+ clientes (~$1,000/mes) | Retell + VoiceAIWrapper ($79/mes) | Al alcanzar 5 clientes |
| 10+ clientes | Evaluar plan Scale VoiceAIWrapper ($249/mes) | Al escalar |

| Nota HIPAA: Firmar BAA con Retell AI antes de procesar cualquier cliente del sector salud. click-agreements.retellai.com |
| --- |

## **10. Credenciales y Cuentas Activas**

| **Servicio** | **Detalle** |
| --- | --- |
| Anthropic API | claude-sonnet-4-5 (agentes/scripts) · claude-haiku-4-5 (chatbot BIT) |
| Google Workspace | automateit@yourbizupgraded.com |
| HubSpot CRM | Free tier · Portal ID: 245810986 · Conexión Make ID: 8803993 · Pipeline "WhatsApp Leads" · Props custom: lead_score, whatsapp_message, calificacion_lead · ⚠️ Pendiente confirmar scope crm.objects.deals.write tras reauthorize |
| Stripe | Live mode activo — Mayo 22, 2026 |
| Retell AI | Setup completado · Agente Gaby · agent_id: agent_b9939a72db45ba465af2162faa · Número E.164: +15704389330 · BAA disponible en click-agreements.retellai.com |
| Cloudflare | Pages: automate-it-website · Workers: bit-chat-3126, stripe-checkout-automate, stripe-webhook, health-check, vero-telegram |
| Supabase | Free tier · base de datos técnica agentes |
| Airtable | Free tier · BAA HIPAA disponible |
| n8n Cloud | CANCELADO — ZIP archivado localmente · solo para clientes |
| Make | Free tier · Team ID: 2245368 · Escenarios: 5414594 "Marc WhatsApp Agent" ✅ activo · 5637378 "Retell Post-Call Webhook" ✅ activo · 5148358 "Lead Diagnóstico" ⏸ pausado (límite plan) |
| GitHub | coachgerardonavas-star/automate-it-website · rama main |
| Telegram bot | @MyOwnConsiergeBot · Gerardo chat ID: 8348522203 |
| WhatsApp / Marc | Meta Cloud API directa · WABA ID: 1642912723467886 · Phone ID: 1075533292320767 · Número: +1 407-404-9495 · Token permanente en C:\automate-it\.env como WHATSAPP_TOKEN |

## **11. Documentos del Proyecto**

| **Documento** | **Uso** | **Estado** |
| --- | --- | --- |
| Manual Maestro v4.5 (este doc) | Interno CEO | Vigente |
| voice-profile.md | Voz de marca — todos los agentes | Vigente |
| anti-ai-writing-style.md | Lo que NO somos — todos los agentes | Vigente |
| Manual Técnico BIT Chatbot v1.0 | Arquitecto de sistemas | Vigente |
| WEBSITE_BRIEF.md | Fuente de verdad del sitio web | Vigente — confirmar nombre exacto en repo |
| n8n-architect-reference.md | Ventas / clientes n8n | Vigente — solo para clientes |
| Manual de Marca v2.1 | Diseño / comunicación | Vigente — actualización pendiente (v2.2) |
| Plan Marketing 2026 v2.4 | Estrategia comercial | Vigente |
| Manual Instagram v2.5 | Agente Vero — operación Instagram | Vigente — actualizado jul 2026 |
| Quiénes Somos v2.6 | Identidad corporativa y posicionamiento | Vigente |
| Protocolo Board de Expertos v1.0 | Marketing — scripts y contenido | Vigente — Drive folder Marketing |
| Serie Guías PDF WhatsApp | Producto de contenido + lead magnet | Vigente — Guía 01 y 02 en Drive folder Marketing |
| Scripts para Reels (6 scripts) | Producción de video CEO | Vigente — Drive folder Scripts para Reels |
| Actualización Estratégica Junio 2026 | Fuente de verdad de cambios de mercado | Vigente |
| ZIP workflows n8n | Archivo técnico / venta | Archivado — no borrar |
| Manual Maestro v4.0–v4.4 | Referencia histórica | Obsoleto — reemplazado por v4.5 |

# **PARTE VI — GUÍA DE RESILIENCIA PARA EL ARQUITECTO**

## **12. Checklist de Resiliencia — Aplicar en Cada Entregable a Clientes**

| Para el arquitecto (Claude Code) al implementar servicios para clientes. Ningún entregable se marca DONE sin completar este checklist. |
| --- |

**12A. Clasificar tiers antes de construir**

| **Pregunta** | **Tier** |
| --- | --- |
| ¿Si falla, el cliente pierde llamadas o leads en tiempo real? | Tier 0 — Crítico |
| ¿Si falla, el cliente lo nota en menos de 1 hora? | Tier 1 — Importante |
| ¿Si falla, el cliente lo nota al día siguiente? | Tier 2 — Conveniente |

**12B. Checklist Tier 0**

- ¿Hay fallback configurado y probado?
- ¿Hay alerta activa al Telegram del cliente si el servicio cae?
- ¿Hay health check automático?
- ¿El circuit breaker tiene threshold de errores antes de abrir?
- ¿El cliente sabe cuál es el canal de fallback?

**12C. Patrones en n8n para clientes**

| **#** | **Patrón** | **Cómo en n8n** | **Cuándo** |
| --- | --- | --- | --- |
| 1 | Error handler | Continue on Fail + rama de error → Telegram alert | Todos los nodos Tier 0 |
| 2 | Fallback de proveedor | Switch node: nodo A falla → nodo B | Integraciones externas Tier 0 |
| 3 | Retry con backoff | Loop node con wait 30s/60s/120s | APIs con rate limits |
| 4 | Log centralizado | Nodo error → Sheets o Airtable con timestamp | Todos los workflows |
| 5 | Alerta CEO/cliente | Telegram al final de rama de error | Errores Tier 0 y Tier 1 |
| 6 | Health check periódico | Schedule trigger → ping → alerta si no responde | Servicios Tier 0 |

**12D. Formato de alerta Telegram**

| 🔴 ALERTA — [NOMBRE DEL SERVICIO] Timestamp: [fecha y hora EST] Qué falló: [descripción breve] Impacto: [qué puede estar afectado] Estado fallback: [activo / inactivo / desconocido] Acción requerida: [ninguna / revisar en X horas / contactar soporte] |
| --- |

| REGLA: Si no hay fallback para un Tier 0, NO continuar el setup. Un sistema sin fallback Tier 0 genera churn. |
| --- |

# **PARTE VII — INVENTARIO Y FINANZAS**

## **13. Inventario de Plataformas — Junio 2026**

**PAGADAS**

| **Plataforma** | **Para qué sirve** | **Costo/mes** | **Notas** |
| --- | --- | --- | --- |
| Claude.ai Pro | CEO OS + Agentes + desarrollo | $100 | Canal principal |
| Google Workspace | Email, Drive, Sheets, Docs, Calendar | ~$9 | automateit@yourbizupgraded.com |
| IONOS | Dominio | $0 (meses restantes gratis) | Solo dominio — hosting en Cloudflare |
| Bitwarden Business | Bóveda de credenciales por cliente | ~$3–4 | PENDIENTE CONTRATAR |

**VARIABLE**

| **Plataforma** | **Para qué** | **Costo** | **Notas** |
| --- | --- | --- | --- |
| Retell AI | Agente de voz para clientes | $0.07–0.13/min | Setup completado |
| WhatsApp (Meta Cloud API) | Chatbot WhatsApp para clientes | Por conversación (primeras 1,000 service/mes gratis) | Setup pendiente |
| Stripe | Cobro a clientes | % por transacción | Live mode activo |
| Anthropic API | LLM para scripts Vero + BIT + agentes | Según tokens | <$0.25/mes en uso actual |
| Cloudflare Workers | Workers: BIT, Stripe, Telegram | $0 | 100K requests/día gratis |

**FREE TIER**

| **Plataforma** | **Para qué sirve** |
| --- | --- |
| HubSpot | CRM — leads, contactos, pipeline |
| Airtable | Datos estructurados / BAA HIPAA |
| Supabase | Base de datos técnica agentes |
| Make | Automatización interna — scenario leads activo · 1,000 ops/mes |
| Google Search Console | SEO y verificación de dominio |
| Cloudflare Pages | Hosting sitio web — deploy automático desde GitHub |
| CreatorFlow | Automatización DMs Instagram — 500 DMs/mes · pendiente configurar |

| GASTO FIJO MENSUAL — Junio 2026 Confirmado: $100 (Claude) + ~$9 (Google) = ~$109/mes (WATI eliminado — ahorro $40/mes vs v4.4) Pendiente: +$4 (Bitwarden) = ~$113/mes total Umbral de viabilidad: 2 clientes Starter = $198/mes. 1 cliente Professional + Voz = $328/mes (margen positivo desde cliente #1). |
| --- |

# **PARTE VIII — ANÁLISIS DAPTA AI Y PLAN DE VENTAS**

## **14. Contexto — Por qué se investigó Dapta**

| Fecha: 13 julio 2026. Estado del negocio en ese momento: ventas en cero. Objetivo: extraer procesos internos aplicables de una empresa de automatización comercial con IA que ya opera a escala (30,000+ cuentas, 32 países), para desbloquear el proceso de ventas propio. |
| --- |

**Fuentes usadas** (verificable, con distinción de origen):
- Documento aportado por el CEO: "Dapta AI: Manual de Procesos Internos y Automatización Comercial" — extracto de un video de Nico Rojas (CEO/fundador de Dapta), transcrito/resumido por el CEO. Fuente primaria de segunda mano.
- Investigación web verificada: Forbes Colombia, El Tiempo, ENTER.CO, perfil LinkedIn de Nicolás Rojas, andresospina.co, growthtalent.org.
- NO verificado / no disponible: el video original de YouTube (bloqueado por error 429 al hacer fetch), métricas internas reales de conversión de Dapta, su prompt/playbook de ventas documentado.

## **15. Hallazgos de Dapta — Aplicables a Automate IT**

**A. Flujo de Captura Comercial "<5 minutos" (hecho, del documento del CEO)**

Dapta condiciona su arquitectura completa a un principio: si un lead no se contacta dentro de los primeros 5 minutos desde que muestra interés, la probabilidad de conversión cae drásticamente. Su flujo:

```
[Lead llena formulario en Meta/Google Ads]
   ▼ (conexión instantánea <1 min)
[Agente IA (WhatsApp/llamada) contacta al usuario]
   ▼ (preguntas de calificación automatizadas)
[Filtro de interés y presupuesto exitoso]
   ▼
[Registro automático en CRM + inserción en agenda del vendedor]
```

**B. Tres etapas de arquitectura de agente (hecho, del documento del CEO)**

1. **Inputs (Absorción de conocimiento):** el agente se alimenta con PDFs, manuales de marca, FAQs, listas de precios, catálogos, más 1,000+ conexiones a sistemas existentes.
2. **Front-Office (Procesamiento omnicanal):** el agente opera 24/7 en WhatsApp, SMS, voz — en lenguaje natural.
3. **Outputs (Acción y sincronización):** califica al lead (presupuesto/necesidad/urgencia), actualiza CRM con la conversación completa, y ejecuta la conversión final (link de pago, agenda cita, o transfiere a humano si es prioridad alta).

**C. Formularios guiados vs. chat abierto (hecho, del documento del CEO)**

Dapta descubrió que el chat abierto tipo ChatGPT confunde a usuarios no técnicos. Resolvieron esto con wizards de formulario paso a paso que traducen respuestas estructuradas en prompts de alta precisión por detrás. Relevante como referencia de UX si Automate IT construye algún panel de interacción directa con el cliente — no aplica al modelo actual (done-for-you, sin panel de autoservicio).

**D. El founder como canal de distribución (hecho, de investigación web — Forbes, LinkedIn)**

Nicolás Rojas construyó su ventaja competitiva en parte sobre su propia marca personal en redes (TikTok, Instagram, YouTube, Twitch), publicando contenido de forma intensiva como parte del GTM, no como actividad secundaria. Usó su propia audiencia (75,000 seguidores en su momento) para validar funcionalidades antes de construirlas.

**E. Sistemas antes que personas (cita directa de Rojas, LinkedIn)**

> "El techo de una empresa casi siempre es un problema de procesos disfrazado de problema de personas... Construir el sistema antes de necesitarlo. Documentar antes de que se rompa. Automatizar las partes repetitivas antes de que frenen todo."

## **16. Gap Crítico Identificado en Automate IT**

| ⚠ CONFIRMADO POR EL CEO (13 jul 2026): Marc y Gaby NO tienen acceso estructurado a la lista de precios, los módulos, ni las seis heurísticas canónicas como contexto de venta. Esto es un bloqueo directo para cualquier conversión real, sin importar cuán rápido se conteste al lead. |
| --- |

Comparado con la etapa "Inputs" del modelo Dapta (sección 15B): Automate IT tiene el Front-Office (Marc responde WhatsApp) y parte del Output (HubSpot, Retell) construidos, pero el Input de conocimiento comercial está vacío. Es el eslabón que hace que "responder rápido" no se traduzca en "vender".

| ⚠ PENDIENTE SIN RESOLVER (13 jul 2026): existe una contradicción entre automatizaciones-activas.md (verificado 11 jul, dice "Prospector SIN CÓDIGO en esta máquina", carpeta logs\ vacía) y memoria previa (dice que prospector.py existe y corre manualmente a las 4:45 AM). El CEO confirmó que es posible que el código esté en la laptop, no verificado en esta sesión (CEO en teléfono). Claude Code debe verificar esto con evidencia real como PASO 0 antes de tocar cualquier archivo de Prospector — no asumir ninguna de las dos fuentes como cierta sin confirmación directa. |
| --- |

## **16-bis. Gap Ampliado — Evidencia Real (13 jul 2026)**

| ⚠ CONFIRMADO CON EVIDENCIA (captura de WhatsApp aportada por el CEO, 13 jul 2026): un prospecto le escribió a Marc diciendo que su negocio no está en Florida. Marc respondió con emoji (fuera de política de anti-ai-writing-style.md) y cerró la conversación redirigiendo al prospecto a "dejar el contacto por si se expande" — rechazando un lead legítimo. |
| --- |

**Diagnóstico técnico (hecho verificable, no especulación):** Marc corre vía Make (escenario 5414594) con su propio system prompt configurado dentro del módulo de llamada a la API de Anthropic — un contexto de ejecución completamente separado de Claude.ai. El Claude Code prompt ejecutado en sesión previa (ver control de versiones v4.8/BrandScript v1.0) solo integró voice-profile.md y anti-ai-writing-style.md en el repo automate-it-website (BIT) y en los scripts de Vero. **Nunca se tocó el system prompt de Marc en Make ni el de Gaby en Retell.** Por eso el gap de la Sección 16 (pricing y heurísticas) se confirma ahora extendido a voz de marca y lógica de calificación geográfica.

**Lección de gobernanza:** que un documento referencie otro por nombre (ej. "basado en voice-profile.md") no implica que su contenido esté físicamente cargado en el system prompt real de producción. Deben verificarse ambos por separado — ver Verifiable Output Protocol, regla de verificación antes de negar existencia, aplicada aquí en sentido inverso: antes de asumir que algo SÍ está integrado, verificar el string real que corre en producción.

**Corrección requerida (bloqueante, prioridad inmediata):**
1. Localizar y revisar el system prompt real del módulo de IA en el escenario Make 5414594 (Marc).
2. Quitar cualquier lógica de exclusión por Florida — el modelo es 100% remoto (ver BrandScript v1.1 §5).
3. Cargar el contenido completo de voice-profile.md, anti-ai-writing-style.md y el BrandScript (o al menos su resumen de la Sección 2A-bis) al system prompt real de Marc.
4. Repetir el diagnóstico y corrección para Gaby (Retell) — verificar primero si el prompt de Gaby es editable vía API (Claude Code) o solo vía dashboard web (Cowork), según la Regla de Enrutamiento (Sección 18).
5. Probar con casos límite antes de marcar DONE: negocio fuera de Florida, saludo simple, pregunta de precio — confirmar que ninguna respuesta usa emoji, cierra la puerta por geografía, o suena a IA genérica.

## **18. Regla de Enrutamiento — Claude Code vs. Cowork**

| Regla operativa permanente (aplica desde 13 jul 2026 en adelante). Antes de escribir cualquier prompt técnico, clasificar la tarea con esta pregunta única: ¿la tarea se ejecuta sobre código/infraestructura propia, o sobre una interfaz web de un tercero sin MCP? |
| --- |

**Claude Code — usar cuando:**
- La tarea toca archivos, repos, Make scenarios via API/MCP, Cloudflare Workers, scripts Python, `.env`, HubSpot vía MCP, o cualquier sistema donde exista conector MCP o acceso de terminal/API.
- Ejemplos: editar el prompt del módulo de Marc en Make, escribir `prospector_trigger.py`, modificar un Worker, hacer commit y push.

**Cowork — usar cuando:**
- La tarea requiere interactuar con una **interfaz web de un tercero que no tiene MCP disponible**, y por lo tanto requeriría que el CEO abriera la página manualmente y usara la extensión de Chrome de Claude a mano.
- Cowork puede operar esa extensión de Chrome de forma autónoma, eliminando el paso manual del CEO.
- Ejemplos: configurar algo en el dashboard web de Retell AI si no hay API/MCP para ese ajuste específico, completar un formulario de configuración en una plataforma que solo tiene UI web, gestionar ajustes de cuenta en un panel sin API expuesta.

**Regla de decisión rápida:**

| Pregunta | Si la respuesta es SÍ |
| --- | --- |
| ¿Existe MCP, API, o acceso de archivo/terminal para esto? | Claude Code |
| ¿Solo existe una interfaz web sin MCP y alguien tendría que hacer clicks manualmente? | Cowork |
| ¿Es una tarea mixta (parte código, parte UI web sin MCP)? | Dividir en dos prompts — uno por herramienta |

**Consecuencia práctica:** cuando una solicitud del CEO mezcle ambos tipos de trabajo, el default es **entregar dos prompts separados**, no uno combinado, para que cada herramienta reciba instrucciones dentro de su propio alcance real.

## **19. Análisis Dapta y Plan de Ventas — Prompts de Ejecución**

**Prioridad 1 — Cargar contexto de ventas a Marc y Gaby (bloqueante, sin esto no hay conversión real)**
- Documento de contexto único con: pricing completo (Starter/Professional + módulos), las 6 heurísticas canónicas, objeciones comunes y respuestas, y el anclaje $328/mes vs $2,917/mes.
- Inyectar este contexto en el prompt del módulo de IA en el Make scenario 5414594 (Marc) y en el agente Retell (Gaby).

**Prioridad 2 — Activar el flujo Prospector → Marc con SLA <5 minutos**
- Conectar la salida de `prospector.py` (leads PYME validados) como disparador de un primer contacto automático vía Marc, en lugar de esperar a que el lead escriba primero.
- Reutilizar la arquitectura ya existente: Marc → HubSpot upsert → Router → (si CALIENTE) createDeal + Retell outbound + Telegram.
- Mantiene el Task Scheduler de Prospector en pausa (validación manual de calidad sigue siendo requisito previo) — este flujo aplica sobre los leads ya validados manualmente mientras tanto.

**Prioridad 3 — Outbound manual inmediato (no bloqueante, corre en paralelo)**
- Contactar directamente los mejores leads ya identificados por Prospector mientras se construye lo anterior. No esperar a la automatización para generar el primer cliente.

**Fuera de alcance de este plan (explícitamente descartado):**
- Replicar el modelo self-service/wizard de Dapta — no encaja con el posicionamiento done-for-you de Automate IT.
- Construir 1,000+ integraciones — no es la estrategia de diferenciación de Automate IT (ver sección 2A, posicionamiento defendible).

---

## Control de versiones

| **Versión** | **Fecha** | **Cambios principales** |
| --- | --- | --- |
| 4.0–4.2 | Historial | Obsoletos — ver v4.3+ |
| 4.3 | Mayo 2026 | Sistema Vero completo, Worker BIT reconstruido, mejoras Messy Middle sitio. |
| 4.4 | Mayo 22, 2026 | Health Check Worker, Stripe live, Make scenario leads, activos evergreen Instagram. |
| 4.5 | Junio 9, 2026 | WATI descartado. WhatsApp → Meta Cloud API directa. Retell completado. Piloto SLP descartado. Contexto de mercado: Meta Business Agent y commoditización. Gasto fijo actualizado (-$40/mes). Tabla de documentos actualizada. Estado del proyecto actualizado al 9 jun 2026. |
| 4.6 | Julio 12, 2026 | Marc (WhatsApp) operativo en +1 407-404-9495. Escenario Make 5414594 activo. Escenario 5637378 Retell Post-Call activo. Bugs Retell corregidos (agent_id prefijo + E.164). Error 403 HubSpot deals.write identificado y reauthorize ejecutado. Flujo CALIENTE documentado. Serie Guías PDF WhatsApp lanzada (Guía 01 y 02). Scripts de Reels mejorados con board de expertos (5 scripts). Board de Expertos de Marketing activado (StoryBrand 2.0 + Klaric + Shadia). CTAs de comentario con palabras clave. Drive MCP migrado a automateit@yourbizupgraded.com. |
| 4.7 | Julio 13, 2026 | Análisis de procesos internos de Dapta AI documentado (Parte VIII). Gap crítico confirmado: Marc y Gaby sin contexto de ventas (pricing, heurísticas). Plan de trabajo de 3 prioridades definido: cargar contexto de ventas, activar flujo Prospector→Marc con SLA <5 min, outbound manual en paralelo. |
| 4.8 | Julio 13, 2026 | BrandScript canónico creado (SB7 de Donald Miller) como fuente de verdad del mensaje. Regla de Orden (problema primero, producto después) establecida como default de todo copy. One-liner oficial definido. Sección 2A-bis añadida. Manuales sincronizados: Quiénes Somos v2.8, Marca v2.4, Instagram v2.6. |
| 4.9 | Julio 13, 2026 | "Florida" retirada como filtro/mención por defecto en BrandScript v1.1, Quiénes Somos v2.9, Marca v2.5, Instagram v2.7 — servicio 100% remoto. Gap Crítico ampliado con evidencia real (Sección 16-bis): Marc rechazó un lead fuera de Florida y usó emoji fuera de política — confirma que Marc y Gaby nunca recibieron voice-profile.md, anti-ai-writing-style.md ni el BrandScript. Prompt de corrección definido. |

*Automate IT · Manual Maestro v4.9 · Confidencial · Julio 13, 2026*
