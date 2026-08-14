# Manual de Onboarding de Clientes — v1.0

> **Qué es esto:** el documento fuente del artifact "Pipeline del Cliente" (13-ago-2026).
> Cierra los 4 gaps que ese artifact dejó marcados. Vigente para el catálogo estándar
> (Asistente / Estratega / Manager) — La Memoria Operativa tiene su propio checklist en
> `C:\automate-it\docs\CHECKLIST_onboarding_cliente.md`, no lo reemplaza.
> **Preparado por Claude · 14-ago-2026.**

---

## Gap 01 — Plantilla de propuesta comercial (Etapa 2)

Se copia por prospecto. El CEO o el Arquitecto la llenan después del diagnóstico y antes
de la llamada de cierre.

### Plantilla — Propuesta [NOMBRE DEL PROSPECTO] · [dd-mmm-aaaa]

- [ ] **Diagnóstico revisado.** ¿Qué llenó en `/diagnostico`? ¿Qué dijo en la llamada, si
      hubo una? Una frase textual, no un resumen — igual que la Sección 3 de un `CLAUDE.md`
      de cliente.
- [ ] **Clasificación del miembro** según la regla de autonomía: ¿el proceso que hay que
      resolver **hace**, **piensa** o **coordina**? Y el volumen: ¿1 proceso, hasta 3
      relacionados, u operación completa? Cuando no coinciden, manda el techo más alto.
      → Esto decide si es **Asistente**, **Estratega** o **Manager**.
- [ ] **Módulos de canal** que necesita: ¿voz (Retell), WhatsApp (Meta Cloud API), CRM
      (HubSpot), o combinación? Confirmar que el cliente ya usa o quiere usar ese canal —
      nunca vender un canal que no tiene forma de recibir.
- [ ] **Precio a citar** (verificar en Stripe antes de decir el número al cliente, nunca de
      memoria):
      - Asistente: $1,000 incorporación + $200/mes · Estratega: $2,000 + $400/mes ·
        Manager: $3,000 + $600/mes.
      - Condiciones: 50% al firmar (no reembolsable pasada la garantía) + 50% al terminar
        la instalación · primera mensualidad a los 30 días · mínimo 3 meses de compromiso ·
        garantía de 7 días o hasta el arranque en vivo, lo que ocurra primero.
- [ ] **HIPAA:** ¿el negocio del prospecto toca PHI? Si sí, cargar la skill
      `hipaa-compliance` antes de seguir. Se vende, no se promociona.
- [ ] **Borrador enviado al CEO para revisión** (Nivel 2, por definición del pipeline) antes
      de mandarlo al prospecto.

---

## Gap 02 — Mecanismo de cobro, catálogo estándar (Etapa 3)

### Estado real, verificado en Stripe el 14-ago-2026 (no por memoria — la fuente de verdad
### de precios es Stripe)

Los 3 productos y sus precios de catálogo **ya existen y son correctos**:

| Miembro | Producto | Incorporación | Mensual | Compra única sin mensualidad |
|---|---|---|---|---|
| Asistente | `prod_V141bRCz1fqAlV` | `price_1U11tZ…` $1,000 | `price_1U11tW…` $200/mes | `price_1U11te…` $2,500 |
| Estratega | `prod_V141nhQpnh3E6o` | `price_1U11ts…` $2,000 | `price_1U11tn…` $400/mes | `price_1U11tv…` $5,000 |
| Manager | `prod_V141crmzjbjMsM` | `price_1U11uB…` $3,000 | `price_1U11u7…` $600/mes | `price_1U11uF…` $7,500 |

Lo que **no** existía: ningún Payment Link. Solo hay 2 links activos en toda la cuenta —
el de la Consultoría de $1 y el de la Consultoría para Emprendedores. El catálogo estándar
no tenía forma de cobrarse sin armar una factura a mano desde cero cada vez.

### Decisión del CEO (14-ago-2026): link de depósito por miembro

El cobro **no** es de un pago único de catálogo — es 50% al firmar + 50% al instalar. Un
Payment Link público que cobre el monto completo no encaja con eso. La solución: un link
de **depósito** por miembro, que cobra exactamente el 50% inicial. El otro 50% y la
mensual se facturan aparte, a mano, cuando corresponda (instalación y día 30).

**Precios de depósito ya creados en Stripe (14-ago-2026):**

| Miembro | Price ID del depósito (50%) | Monto |
|---|---|---|
| Asistente | `price_1U4I7VAHnOzMvXBgT3gab9Ni` | $500 |
| Estratega | `price_1U4I7jAHnOzMvXBgmNlAUPC9` | $1,000 |
| Manager | `price_1U4I7lAHnOzMvXBgvGGSopL5` | $1,500 |

**Pendiente — un paso manual, no se pudo automatizar:** el key de Stripe conectado a
Claude no tiene permiso para crear Payment Links (solo lectura y creación de precios). El
CEO tiene que crear los 3 links él mismo, un minuto cada uno:

> Stripe Dashboard → Payment Links → Create → pegar el Price ID de la tabla de arriba →
> desactivar "Permitir cantidad ajustable" → en confirmación, mensaje de agradecimiento
> pidiendo el resto de los datos de acceso para empezar el setup.

**Cómo se usa en el pipeline:** el link **no va público en el sitio**. Se manda uno a uno,
por correo o WhatsApp, después de que la propuesta (Gap 01) fue aceptada en la llamada de
cierre. Igual que hoy funciona el link del $1 — visible solo para quien ya avanzó en la
conversación, nunca como botón de autoservicio.

**Regla vigente (ya probada con la Consultoría para Emprendedores):** un cobro de $0 por
cupón 100% reporta `payment_status: "paid"` — nunca filtrar por eso para distinguir
cortesía de pago real; usar `amount_total === 0`. Aplica igual si algún día se ofrece un
depósito con descuento.

---

## Gap 03 — Checklist de salida para go-live (Etapa 5)

No confundir con el Checklist de Resiliencia del Manual Maestro (ese es sobre calidad del
entregable en sí). Este es el criterio binario de **¿ya se puede dejar corriendo solo?**

- [ ] Agente(s) probados en ambiente de prueba con al menos 3 conversaciones reales
      simuladas (no solo el saludo).
- [ ] Fallback Tier 0 confirmado activo — regla dura del pipeline (Etapa 6): sin fallback
      no se continúa el setup.
- [ ] Worker de health-check (cada 15 min) ya está vigilando las URLs de este cliente.
- [ ] Credenciales de este cliente viven en su propia carpeta aislada
      (`~/clientes/<cliente>/.mcp.json` + `.env` + `CLAUDE.md`) — nunca mezcladas con otro
      cliente ni con la cuenta interna de Automate IT.
- [ ] El cliente confirmó, por escrito, que probó el sistema al menos una vez él mismo
      (no solo el CEO).
- [ ] Fecha del primer check-in post-arranque agendada (recomendado: a los 7 días).
- [ ] Segundo 50% del pago cobrado (o facturado, con fecha de vencimiento clara) antes de
      declarar el go-live completo.

Solo con las 7 marcadas se mueve el deal a la etapa "Servicio activo" en HubSpot.

---

## Gap 04 — Renovación y fin de contrato (Etapa 7)

> ⚠️ **Borrador operativo — sin revisión legal.** Marcado PROPUESTA a propósito, igual que
> se hizo con el SOW de La Memoria Operativa antes de que el abogado del CEO lo aprobara
> (25-jul-2026). No usar como contrato hasta que el abogado lo revise. Mientras tanto,
> cualquier cancelación real se resuelve caso por caso con el CEO, no con este documento.

### Renovación
- El compromiso mínimo es de 3 meses (ya vigente, ver Gap 01/02). Pasado ese mínimo, la
  mensualidad **continúa automáticamente** salvo cancelación — es una suscripción de
  Stripe, no un contrato de plazo fijo que haya que renovar activamente.
- 15 días antes de que se cumplan los primeros 3 meses, enviar un check-in de valor: qué
  automatizó el sistema, qué tiempo/dinero recuperó (con dato real del propio sistema del
  cliente, nunca inventado). Es el momento natural para subir de Asistente a Estratega si
  el volumen creció.

### Cancelación
- Aviso por escrito con **30 días de anticipación** (para que coincida con el ciclo de
  facturación mensual y no se cobre un mes de más).
- Antes de cortar el servicio: exportar al cliente sus propios datos (conversaciones,
  contactos tocados, métricas) en un archivo que se lleve — son datos de su negocio, no de
  Automate IT.
- **Pendiente de decidir con el CEO:** ¿cuánto tiempo se retienen los datos del cliente en
  Supabase/HubSpot después de cortar el servicio antes de purgarlos? Hasta que se decida,
  no purgar nada por defecto.
- **Pendiente de decidir con el CEO:** si el catálogo estándar necesita un documento
  firmado equivalente a `/acuerdo-colaboracion` (que hoy solo cubre la oferta de
  consultoría), o si el Payment Link + confirmación por correo cuenta como aceptación
  suficiente de los términos para un ticket de este tamaño.

---

## Cómo quedaron los 4 gaps

| # | Gap | Estado tras esta versión |
|---|---|---|
| 01 | Plantilla de propuesta | **Cerrado** — plantilla arriba, lista para copiar por prospecto. |
| 02 | Mecanismo de cobro estándar | **Cerrado salvo 1 paso manual** — precios de depósito creados en Stripe; falta que el CEO cree los 3 Payment Links (Claude no tiene permiso de escritura para ese endpoint). |
| 03 | Checklist de go-live | **Cerrado** — 7 criterios arriba. |
| 04 | Renovación / fin de contrato | **Borrador operativo cerrado, legal pendiente** — 2 decisiones abiertas marcadas explícitamente, nada se ejecuta como política hasta que el CEO y el abogado lo confirmen. |

v1.0 — 14-ago-2026 · Cierra los gaps del artifact "Pipeline del Cliente" (13-ago-2026).
