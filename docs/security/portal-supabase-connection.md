# Conexión del portal a Supabase

Configurada y probada el 28-sep-2026 UTC, con autorización del usuario para usar las APIs existentes.

## Destino comprobado

- Worker de producción: `automate-it-website-worker`, dominio `yourbizupgraded.com`.
- Proyecto Supabase: `fryufcddrbeewqcwyavz`, activo y sano. Nombre actual en Supabase: `automateit@yourbizupgraded.com's Project`.
- API: `https://fryufcddrbeewqcwyavz.supabase.co`.
- Este proyecto ya figura en `workers/stripe-webhook/wrangler.toml`. Se comprobaron las tablas del portal y sus políticas de RLS por API antes de conectarlo.
- La referencia anterior `automate-it-core` / `tenfstsdobydtjmyfvqs` en `CLAUDE.md` no apareció en los proyectos accesibles con el conector ni con el token de API. Las llamadas a esa referencia rechazaron el acceso. La coincidencia del webhook y del esquema identificó el destino usado en esta tarea.

## Configuración aplicada

La API de Supabase entregó las claves del proyecto; se seleccionó la clave **publishable** activa. Se cargaron `SUPABASE_URL` y `SUPABASE_ANON_KEY` como secrets del Worker mediante el comando bulk de Wrangler, que usa la API de Cloudflare. El nombre `SUPABASE_ANON_KEY` sigue el contrato actual del código, y su valor es una clave publishable. El cliente del portal la manda por `apikey`; el JWT de la persona va por `Authorization`.

Las claves publishable conservan el alcance público sujeto a RLS y permiten rotación independiente, según la [guía de Supabase](https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys). Cloudflare permite leer los secrets desde `cloudflare:workers`, según su [guía de secrets](https://developers.cloudflare.com/workers/configuration/secrets/).

El Worker conservó los tres secrets de Keystatic. La clave de administración se usó solo en memoria por la prueba externa y quedó fuera del Worker, del código y de la evidencia. El preview de seguridad conserva su aislamiento.

- Deployment tras configurar: `45cd5de5-7422-47b2-ba54-ac05a9d8c5eb`.
- Versión activa al 100%: `82b711a6-bf0d-46b8-a923-85990e58228d`.
- Hora: `2026-09-28T10:24:48.342562Z`.

## Verificación

- Las 48 pruebas de producción pasaron después de la conexión: sitio público, demos ES/EN, rutas privadas sin sesión, redirecciones, sitemap y robots; cero errores JS.
- Prueba de login con cuenta temporal de rol `client`: contraseña errónea rechazada; contraseña correcta devolvió 302 a `/portal`; cookies de sesión Secure y HttpOnly; portal autenticado 200; el usuario vio solo su organización de prueba mediante RLS; logout restauró el 302 a login.
- La prueba creó datos propios de prueba sin acceso a datos de clientes. Revocó la sesión y borró usuario, perfil y organización al terminar. Una consulta aparte confirmó cero filas temporales restantes.
- Las 19 tablas públicas revisadas tienen RLS activo y políticas. El advisor de seguridad no devolvió errores; sí reportó la protección contra contraseñas filtradas desactivada, una advertencia previa a esta configuración. Ese ajuste quedó fuera de la tarea.
- Site URL y URLs de recuperación ya apuntaban al dominio de producción y a `/portal/reset-password` en ES/EN; se conservaron.

Resultado del login: [evidencia JSON](evidence/portal-auth-check.json). La prueba cubre una cuenta temporal con su organización. Los permisos de cuentas reales dependen de su perfil y membresías ya guardados en Supabase.

Esta configuración se aplica en el runtime de Cloudflare. Este PR solo corrige documentación y adjunta evidencia; las variables ya quedaron activas en producción.
