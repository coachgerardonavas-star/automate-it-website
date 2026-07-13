**AUTOMATE IT**

*Your Business, Upgraded.*

**Manual Maestro del Sistema Multi-Agente**

| **Campo** | **Detalle** |
| --- | --- |
| Versión | 4.4 · Mayo 22, 2026 |
| Arquitectura | Claude Code + SDK Anthropic |
| Agentes activos | 3 agentes: Vero (CMO), Warren (CFO), Sheryl (CLO) |
| Canal CEO | Claude Code CLI — interacción directa |
| Sitio web | yourbizupgraded.com — Chatbot BIT v2 activo · voice-profile aplicado |
| n8n | Producto para clientes — NO infraestructura interna |
| Documento | Confidencial · Uso Interno Exclusivo |

# **CAMBIOS EN v4.4 — Mayo 22, 2026**

| Nuevos en esta versión: • Health Check Worker desplegado: worker health-check en Cloudflare con cron cada 15 min. Monitorea 3 URLs Tier 0 (yourbizupgraded.com, bit-chat-3126, stripe-checkout-automate). KV para estado persistente. Alertas 🔴 caída y 🟢 recuperación a Telegram. • Stripe live activado: modo live activo. Checkout worker actualizado con endpoint /health. • Endpoints /health en workers: bit-chat-3126 y stripe-checkout-automate tienen GET /health que devuelve 200 OK {"status":"ok"}. • Campo address en formulario HubSpot: propiedad estándar agregada entre Phone Number y Company Name. Label: "Dirección del negocio". Opcional. • Make scenario activo: scenario 5148358 "Lead Diagnóstico HubSpot Telegram Email" — HubSpot form trigger → Router → Telegram + Gmail. Cron cada 15 min. Notificación a Telegram (chat 8348522203) + email de confirmación al lead. • Activos evergreen Instagram generados: 4 piezas de Evaluación generadas por Vero — carrusel Starter vs Professional, FAQ objeciones, post heurísticas, story diagnóstico. Pendientes aprobación CEO. • Titular SeccionDolor actualizado: "Si no contestas rápido, el siguiente negocio en Google sí lo hace." • Quiénes Somos actualizado a v2.3: corrección de política n8n (producto para clientes, no infraestructura interna). • Commit actual: 326491b en rama main. |
| --- |



| Nuevos en esta versión: • Sistema Vero completo: vero_brief.py + vero_approval.py + vero_weekly.py con voice-profile y anti-ai-writing-style incorporados. • Worker BIT reconstruido: index.js con system prompt basado en voice-profile.md y anti-ai-writing-style.md. Preview URLs deshabilitadas. • Sitio web — bugs corregidos: nav #planes apunta a planes reales, visitantes EN van a /en/diagnostic, ID duplicado resuelto. • Sitio web — mejoras Messy Middle: banda de heurísticas ($328/mes vs $2,917/mes), microcopy de confianza en /diagnostico. • Formulario de diagnóstico: campo dirección del negocio agregado. Flujo sin agendamiento — solo formulario. • FAQ expandido a 11 preguntas con objeciones clave de Evaluación. • Website Brief actualizado a v2.2. • Tabla Automation-First actualizada con estado real de cada proceso. |
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
| n8n (workflows) | Cuenta cancelada — ZIP archivado | ARCHIVADO |
| Telegram CEO | Activo via scripts de Vero (Python) | ACTIVO — briefs y aprobaciones |
| Retell AI (voz) | Free trial activo — setup pendiente | EN PROCESO |
| WATI (WhatsApp) | Activo — número vinculado | ACTIVO |
| HubSpot (CRM) | Free tier activo | ACTIVO |
| Stripe | Live mode activo — Mayo 22, 2026 | ACTIVO |
| Health Check Worker | Cloudflare Worker health-check — cron 15min | ACTIVO — monitorea 3 URLs Tier 0 |

| ⚠  n8n NO es infraestructura interna. Es un producto que se vende a clientes. Cuenta cloud cancelada Mayo 2026. |
| --- |

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
| Respuesta a DMs de Exploración | Manual | Bot responde, escala Evaluación | Pendiente — WATI o IG Messaging API |
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

## **3. Sistema Vero — Estado Completo (NUEVO v4.3)**

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

- "Cada llamada sin contestar es un cliente que llama al siguiente en Google."

- "Tu agente contesta en inglés y en español. El dueño no tiene que estar."

- "$328/mes vs $2,917/mes de recepcionista bilingüe en Florida." (mes vs mes — nunca año vs mes)

- "No necesitas aprender IA. Yo te instalo el sistema, tú enciendes el switch."

- "24/7/365. Sin días festivos, sin llamadas perdidas."

**FILOSOFÍA DE CONTENIDO — REGLA FUNDAMENTAL**

| Aplica a todo el contenido que produce Vero (Instagram y blog). Detalle operativo completo en Manual de Instagram v2.3, Sección 3.1. |
| --- |

- **Regla 50/50:** Al menos el 50% del contenido no menciona Automate IT. Habla PARA el dueño de negocio latino en Florida. Tips, consejos, errores comunes, perspectiva del mercado. Cosas que puede usar hoy aunque nunca compre. El otro 50% es producto/marca contado con historia — nunca con números solos.

- **Test obligatorio antes de publicar cualquier pieza:** "¿Por qué alguien que está viendo perritos se detendría a leer esto?" Si no hay respuesta clara → no se publica.

- **Límite del expertise:** el contenido de valor puro solo vive dentro de lo que Automate IT sabe hacer — atención al cliente, comunicación, captura de leads, barrera del idioma, operar sin depender del dueño. Si el tema requiere expertise que Automate IT no tiene → no se propone.

- **Humor y tono ligero:** el humor no es el protagonista — es el condimento. Máximo 10% de las piezas (≈1 de cada 10) — como el verde lima. Viene de situaciones que el prospecto reconoce. Nunca reírse del prospecto — reírse CON él.

## **4. BIT — Chatbot del sitio web (ACTUALIZADO v4.3)**

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

## **7. Estado Actual — Mayo 20, 2026**

| **Estado** | **Item** |
| --- | --- |
| DONE | Manual Maestro v4.3 (este documento) |
| DONE | Automate IT LLC constituida (SunBiz + EIN) |
| DONE | Chatbot BIT v2 con voice profile activo en producción |
| DONE | Scripts Vero: vero_brief.py + vero_approval.py + vero_weekly.py en Windows Task Scheduler |
| DONE | Sitio web: bugs nav corregidos, banda heurísticas, microcopy /diagnostico, FAQ 11 preguntas |
| DONE | Formulario diagnóstico: campo dirección, flujo sin agendamiento |
| DONE | Worker BIT reconstruido con voice-profile y anti-ai en system prompt |
| DONE | Website Brief v2.2 actualizado |
| DONE | HubSpot + Telegram + n8n (para clientes) activos |
| DONE | Stripe sandbox configurado — 11 productos |
| EN CURSO | Agentes Warren y Sheryl en Claude Code |
| DONE | Stripe live activado — Mayo 22, 2026 |
| DONE | Health checks Tier 0 con alerta Telegram — worker health-check activo |
| DONE | Campo address agregado al formulario HubSpot (GUID: c3800beb-7430-4f16-bb9e-c1989b9ebf37) |
| DONE | Seguimiento automático de leads — Make scenario 5148358 activo |
| DONE | Activos evergreen Instagram (4 piezas) — generados por Vero, pendientes aprobación CEO |
| EN CURSO | Setup Retell AI — cuenta activa |
| PENDIENTE | Instalar claude-code-llm-router en Claude Code (ver Sección 7B) |
| BLOQUEADO | Testing cliente piloto SLP (HIPAA) — bloqueado por Retell |
| PENDIENTE | Completar setup Retell AI — BAA pendiente firma |
| PENDIENTE | Instalar claude-code-llm-router — bloqueado por repo no verificado |
| PENDIENTE | Respuesta automática a DMs de Instagram — bloqueado por Meta 2FA loop |
| PENDIENTE | Contratar Bitwarden Business |
| PENDIENTE | Cancelar oficina virtual antes de próxima renovación |
| PENDIENTE | Evaluar Meta Graph API para publicación directa desde Vero |

## **7B. Pendiente Técnico — LLM Router para Claude Code**

| ⏳ PENDIENTE — Requiere acceso a VS Code / terminal de Claude Code pip install claude-code-llm-router Configurar como MCP server en Claude Code settings. Proveedores: Anthropic (primario) → OpenRouter (fallback) → Groq (compresión rápida). Por qué importa: evita alucinaciones por contexto lleno en proyectos grandes. Coherente con lo que vendemos. |
| --- |

## **8. Próximos Pasos — Orden de Prioridad**

| **#** | **Acción** | **Nivel de fricción CEO** | **Bloqueante para** |
| --- | --- | --- | --- |
| 1 | Completar agentes Warren y Sheryl en Claude Code | Nivel 1 cuando estén listos | CEO OS completo |
| 2 | Completar setup Retell AI — firmar BAA + número + agente | Dashboard Retell | Demo de voz / piloto SLP |
| 3 | Testing cliente piloto SLP (HIPAA) | Bloqueado por Retell | Primer ingreso real |
| 4 | Resolver Meta 2FA loop — completar migración WhatsApp a Meta Cloud API | Claude Code + Meta support | DMs automáticos |
| 5 | Aprobar activos evergreen Instagram (4 piezas generadas por Vero) | Nivel 1 — CEO aprueba | Escalar tráfico orgánico |
| 6 | Meta Graph API para publicar desde Vero | Claude Code lo integra | Marketing Nivel 0 |
| 7 | Instalar claude-code-llm-router | Bloqueado — sin repo verificado | Resiliencia LLM |
| 8 | Contratar Bitwarden Business | CEO ejecuta una sola vez | Seguridad credenciales |
| 9 | Cancelar oficina virtual | CEO ejecuta una sola vez | Reducir costos |
| 10 | Automatizar publicación IG desde Vero — flujo completo | Nivel 1 — CEO solo aprueba | Meta 2FA resuelto + Meta Graph API |

### **Flujo IG Automático — Diseño Pendiente de Implementación**

**Flujo objetivo:**
Brief generado por Vero → CEO responde OK en Telegram → Vero genera imagen via API (Ideogram o Firefly) → publica en Instagram via Meta Graph API → loguea en vero_approvals.json

**Bloqueos actuales en cadena:**
1. Meta 2FA loop sin resolver → sin acceso a Meta Cloud API
2. Generación de imagen automática → no implementada

**Cuando se resuelva Meta 2FA:**
- Implementar Meta Graph API en vero_approval.py
- Integrar API de generación de imagen (evaluar Ideogram vs Firefly al momento)
- El OK del CEO en Telegram dispara todo el flujo sin más intervención
- El "No + razón" sigue generando alternativa antes de publicar

**Estado:** PENDIENTE — bloqueado por Meta 2FA loop

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
| HubSpot CRM | Free tier · Portal ID: 245810986 · 3 formularios activos |
| Stripe | Live mode activo — Mayo 22, 2026 |
| WATI | Activo · live.wati.io/10154709 |
| Retell AI | Free trial activo · BAA pendiente firma |
| Cloudflare | Pages: automate-it-website · Workers: bit-chat-3126, stripe-checkout-automate, stripe-webhook, health-check |
| Supabase | Free tier · base de datos técnica agentes |
| Airtable | Free tier · BAA HIPAA disponible |
| n8n Cloud | CANCELADO — ZIP archivado localmente |
| Make | Free tier · scenario 5148358 activo — Lead Diagnóstico HubSpot Telegram Email |
| GitHub | coachgerardonavas-star/automate-it-website · rama main · commit 326491b |

## **11. Documentos del Proyecto**

| **Documento** | **Uso** | **Estado** |
| --- | --- | --- |
| Manual Maestro v4.4 (este doc) | Interno CEO | Vigente |
| voice-profile.md | Voz de marca — todos los agentes | Vigente |
| anti-ai-writing-style.md | Lo que NO somos — todos los agentes | Vigente |
| Manual Técnico BIT Chatbot v1.0 | Arquitecto de sistemas | Vigente |
| WEBSITE_BRIEF_ASTRO_v2_2.md | Fuente de verdad del sitio web | Vigente |
| n8n-architect-reference.md | Ventas / clientes n8n | Vigente — solo para clientes |
| Manual de Marca v2.1 | Diseño / comunicación | Vigente |
| Plan Marketing 2026 v2.0 | Estrategia comercial | Vigente |
| Manual Instagram v2.1 | Agente Vero — operación Instagram | Vigente |
| ZIP workflows n8n | Archivo técnico / venta | Archivado — no borrar |
| Manual Maestro v4.0 / v4.1 / v4.2 | Referencia histórica | Obsoleto — reemplazado por v4.3 |

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

## **13. Inventario de Plataformas — Mayo 2026**

**PAGADAS**

| **Plataforma** | **Para qué sirve** | **Costo/mes** | **Notas** |
| --- | --- | --- | --- |
| Claude.ai Pro | CEO OS + Agentes + desarrollo | $100 | Canal principal |
| Google Workspace | Email, Drive, Sheets, Docs, Calendar | ~$9 | automateit@yourbizupgraded.com |
| IONOS | Dominio | $0 (11 meses gratis) | Solo dominio — hosting en Cloudflare |
| WATI | WhatsApp chatbot para clientes | ~$40 | Plan legacy |
| Bitwarden Business | Bóveda de credenciales por cliente | ~$3–4 | PENDIENTE CONTRATAR |

**VARIABLE**

| **Plataforma** | **Para qué** | **Costo** | **Notas** |
| --- | --- | --- | --- |
| Retell AI | Agente de voz para clientes | $0.07–0.13/min | Free trial activo |
| Stripe | Cobro a clientes | % por transacción | Live mode activo |
| Anthropic API | LLM para scripts Vero + BIT + agentes | Según tokens | <$0.25/mes en uso actual |
| Cloudflare Workers | Workers: BIT, Stripe | $0 | 100K requests/día gratis |

**FREE TIER**

| **Plataforma** | **Para qué sirve** |
| --- | --- |
| HubSpot | CRM — leads, contactos, pipeline |
| Airtable | Datos estructurados / BAA HIPAA |
| Supabase | Base de datos técnica agentes |
| Make | Automatización interna — scenario leads activo | 1,000 ops/mes · scenario 5148358 |
| Google Search Console | SEO y verificación de dominio |
| Cloudflare Pages | Hosting sitio web — deploy automático desde GitHub |

| GASTO FIJO MENSUAL — Mayo 2026 Confirmado: $100 (Claude) + ~$40 (WATI) + ~$9 (Google) = ~$149/mes Pendiente: +$4 (Bitwarden) = ~$153/mes total Umbral de viabilidad: 2 clientes Starter = $198/mes. 1 cliente Professional + Voz = $328/mes (margen positivo desde cliente #1). |
| --- |

*Automate IT · Manual Maestro v4.4 · Confidencial · Mayo 22, 2026*
