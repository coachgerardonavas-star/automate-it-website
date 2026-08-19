# Diagnóstico público — runbook operativo

## Flujo

`/diagnostico` o `/en/diagnostic` → `diagnostico-intake` → HubSpot upsert y nota →
Telegram → Make 5148358. Make conserva el contrato `fields.firstname`, `email`, `phone`,
`address`, `industry`, `message` y atiende los pasos posteriores configurados en el escenario.

El formulario describe demanda y fricción. No decide el producto y no descalifica por cantidad
de empleados.

## Ruta de privacidad

`regulated = Sí/Yes/No estoy seguro/Not sure` conserva nombre, email y datos estructurados
necesarios para no perder el lead, pero omite `business_type` y `context` de propiedades libres,
no manda texto libre a Telegram y no llama a Make/Retell. La alerta indica conversación manual.
No pedir PHI ni datos sensibles hasta confirmar requisitos y BAA aplicables.

## Verificación segura

```bash
npm test
npx wrangler deploy --dry-run
curl https://diagnostico-intake.coachgerardonavas.workers.dev/health
```

Estas verificaciones no crean contactos ni llamadas. No hacer POST de prueba en producción salvo
que Make/Retell estén explícitamente aislados en modo de prueba sin costo y se use un contacto
autorizado.

## Despliegue

```bash
npx wrangler deploy
```

Secretos requeridos: `HUBSPOT_TOKEN` y `MAKE_LEAD_WEBHOOK_URL`. Telegram usa
`TELEGRAM_BOT_TOKEN`; el chat ID y orígenes permitidos viven en `wrangler.toml`. Nunca registrar
el payload completo: los logs de recuperación solo deben incluir email, nombres de campos y la
bandera de riesgo regulado.
