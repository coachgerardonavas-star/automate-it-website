# vero-telegram — diseño de permisos y estilo de respuesta

Nota de diseño, 26-sep-2026. **No es código todavía.** Describe cómo darle herramientas a Vero (y a los agentes por departamento que se monten sobre este worker) sin que puedan actuar sobre el mundo sin permiso, y cómo deben reportar lo que hacen.

La idea sale de revisar el repo público `adewaskar/jarvis` (MIT), un asistente de voz sobre Claude Code. De ahí se toman dos patrones: la regla de permisos de su función `decideTool()` y las reglas de su prompt para respuestas cortas. **No se copia código ni dependencias**: son ideas, adaptadas a un Worker de Cloudflare.

---

## 1. Estado actual del worker (verificado en `index.js`)

- Vero **no tiene herramientas**. Es una llamada simple a la Messages API (`claude-sonnet-4-5`, `max_tokens: 1024`) sin `tools`. Hoy no hay nada que pueda "hacer" por su cuenta, así que la sección 3 aplica **el día que se le den herramientas**, no antes.
- No guarda historial: cada mensaje llega solo, sin los anteriores.
- Solo procesa `message.text`. Las notas de voz de Telegram se ignoran.
- La aprobación es **una sola llave global** en KV (`vero_approval_status`). "Aprobado" aprueba lo que sea que esté pendiente, sin decir qué.
- El control de acceso compara `message.from.id` con `ALLOWED_CHAT_ID`, pero ese dato viene **del cuerpo del POST**. Ver sección 2.

## 2. Requisito previo: verificar que el mensaje viene de Telegram

Hoy el worker no comprueba que el POST lo mande Telegram. Cualquiera que conozca la URL del worker puede enviar un JSON con `from.id = 8348522203`. Con eso puede:

- escribir "Aprobado" en KV,
- gastar tokens de la API de Anthropic,
- recibir las respuestas de Vero en su propio chat, porque `chat.id` también sale del cuerpo.

**Arreglo:** Telegram permite registrar el webhook con un `secret_token` (`setWebhook`). Después manda ese valor en la cabecera `X-Telegram-Bot-Api-Secret-Token` de cada llamada. El worker debe rechazar todo POST cuya cabecera no coincida con un secret guardado en Cloudflare (p. ej. `TELEGRAM_WEBHOOK_SECRET`).

**Esto va antes que cualquier herramienta.** Si el mensaje se puede falsificar, la regla de permisos de la sección 3 no protege nada.

> **Implementado en código el 26-sep-2026** (`isFromTelegram()` en `index.js`). **Falta el paso manual del CEO** para que quede activo en producción: poner el secret, desplegar y volver a registrar el webhook con `secret_token`. Los pasos están en `CLAUDE.md`, entrada vero-telegram de "Workers activos". Hasta que se despliegue, el worker en vivo sigue sin verificar.

## 3. Regla de permisos para herramientas

Principio (de JARVIS): **por defecto, denegar.** Una lista de "herramientas peligrosas" siempre se queda corta, porque solo contiene lo que alguien pensó. Lo que no está en la lista corre sin control.

### 3.1 Tres categorías, decididas en código, no por el modelo

| Categoría | Ejemplos | Qué pasa |
|---|---|---|
| **Lectura** | buscar en HubSpot, leer una métrica de GA4, listar posts | Corre sin preguntar |
| **Borrador** | redactar un post, preparar un correo, armar un brief | Corre, pero el resultado se queda como borrador; nada sale del sistema |
| **Efecto** | publicar, enviar correo, crear/editar/borrar en CRM, cobrar | **Nunca corre directo.** Crea una aprobación pendiente (3.3) |

La decisión la toma una función del worker (el equivalente a `decideTool()`), **no el prompt**. El prompt puede pedirle a Vero que pregunte antes de actuar, pero una instrucción no es una garantía. La función sí.

### 3.2 Cómo clasificar

1. **Lista explícita de herramientas de lectura** permitidas, por nombre completo.
2. Lo que no esté en esa lista se trata como **Efecto**.
3. Encima de todo, una **regla de veto por verbo**: si el nombre de la herramienta contiene `send`, `post`, `publish`, `create`, `update`, `edit`, `delete`, `remove`, `charge`, `pay`, `deploy`, `write`, es Efecto aunque esté en la lista de lectura. JARVIS lo hace así porque los nombres engañan (`make_outbound_call` esconde el verbo en medio; `download` escribe un archivo aunque suene a lectura).
4. Excepciones al veto solo por nombre completo (`servidor__herramienta`), para que no se filtren a otro servicio.

### 3.3 Aprobaciones por acción, no globales

Reemplazar la llave única `vero_approval_status` por una aprobación por acción:

- Llave KV: `approval:<id>`, con `id` aleatorio.
- Contenido: herramienta, argumentos exactos, quién la pidió, fecha, y un **vencimiento** (sugerencia: 24 h, con `expirationTtl` de KV).
- Vero manda a Telegram **qué va a hacer, en una frase**, más dos botones inline (`Aprobar` / `Rechazar`) que llevan el `id`.
- Al aprobar, el worker ejecuta **exactamente** los argumentos guardados, no una versión regenerada por el modelo.
- Una aprobación se usa una sola vez: se borra al ejecutarla.

Así "Aprobado" nunca aprueba algo distinto de lo que el CEO leyó.

### 3.4 Límites de Telegram

- Mensaje máximo: 4096 caracteres. Truncar la respuesta antes de enviarla (p. ej. `.substring(0, 3500)` más un aviso de "texto recortado"). Hoy no se trunca, y `max_tokens: 1024` no lo garantiza.
- `callback_data` de los botones: máximo 64 bytes. Solo cabe el `id`, no los argumentos.

## 4. Estilo de respuesta

De JARVIS se toman solo las reglas de **cómo reportar**. El personaje (mayordomo británico, "sir") no aplica y no se copia.

Reglas para agregar al prompt de Vero y de cada agente:

- **Antes de un Efecto:** decir en una frase qué va a hacer. **Después:** decir qué pasó. Nada más.
- **Éxito:** se reporta como hecho, sin adornos. "Borrador listo en HubSpot." No "¡Listo! Aquí tienes lo que encontré".
- **Fallo:** se dice como un hecho concreto, con la causa si se conoce. "No se publicó: Instagram rechazó la imagen por tamaño." Sin disculpas largas.
- **Buena noticia primero, mala después.**
- **No repetir** una advertencia que el CEO ya leyó y decidió ignorar.
- **Sin relleno** ("déjame revisar", "un momento", "claro que sí").

Estas reglas se suman a las que Vero ya tiene (sin alabanzas, sin jerga, frases prohibidas) y no las reemplazan.

### 4.1 Si algún día responde por voz

Solo aplica si se agregan notas de voz (hoy no se procesan). Lo que se toma de JARVIS:

- Máximo dos frases en conversación. Todo se escucha, y el que escucha espera en silencio.
- Solo se permite hablar largo cuando el CEO pidió leer datos.
- Nada de markdown, viñetas ni emojis en lo que se va a convertir en audio.
- Números, fechas y horas escritos como se dicen ("ocho y cuarto", "el primero de octubre").

## 5. Fuera del alcance de esta nota (detectado al revisar)

- **El prompt de Vero está desactualizado respecto al Manual Maestro v7.2.** Dice que Automate IT "vende automatización de comunicación con IA (agentes de voz, WhatsApp, CRM)" y usa la comparación "$328/mes vs $2,917/mes". El manual vigente dice que la IA es capacidad de entrega, no el posicionamiento, y los precios salen de `Manual_de_Pricing.md`. Hay que revisarlo contra Drive antes de darle herramientas de publicación a Vero.
- Falta historial de conversación. Si los agentes van a tener tareas de varios pasos, lo necesitan.

## 6. Orden sugerido

1. Verificar `secret_token` del webhook (sección 2).
2. Actualizar el prompt de Vero contra el Manual Maestro vigente (sección 5).
3. Aprobaciones por acción con botones y vencimiento (3.3).
4. La función de permisos (3.1–3.2), con la primera herramienta de **lectura** únicamente.
5. Recién después, la primera herramienta de Efecto, detrás de la aprobación.
