# Verificación de la actualización de Astro

Verificado el 28-sep-2026 UTC sobre `main` en `fd3d973446f4b8ac7ad5b97e1b8216515479d699`. La actualización del PR [#70](https://github.com/coachgerardonavas-star/automate-it-website/pull/70) ya estaba integrada cuando se retomó esta verificación. El usuario aprobó Workers y su preview mediante la opción 1. Esta rama parte de ese `main` y agrega el entorno aislado, una prueba reproducible y evidencia. Conserva el código de la aplicación, sus rutas, textos, estilos y dependencias.

## Versiones y fuentes

| Componente | Inicio de la tarea | Estado verificado |
| --- | --- | --- |
| Astro | 4.16 | 7.3.5 |
| @astrojs/cloudflare | 11.2 | 14.3.3 |
| Node | — | 24.21.0 local; 24 en CI |

El mínimo de Astro que corrige la alerta crítica AVIF es **7.2.8**, según el [aviso GHSA-26w7-cxv4-gfx2](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2) y su [release](https://github.com/withastro/astro/releases/tag/astro@7.2.8). El adaptador corrigió el SSRF indicado en **12.6.6**, según [GHSA-qpr4-c339-7vq8](https://github.com/withastro/astro/security/advisories/GHSA-qpr4-c339-7vq8). Ese adaptador requiere Astro 5. El primer adaptador estable cuya dependencia peer acepta Astro 7 es **14.0.0**; el par mínimo compatible para esos avisos es 7.2.8 / 14.0.0. Esto se refiere a los avisos y compatibilidad; la auditoría completa se ejecutó sobre el lockfile final 7.3.5 / 14.3.3. Las versiones y rangos se contrastaron con los [changelogs oficiales](https://github.com/withastro/astro/tree/main/packages/integrations/cloudflare) y los metadatos publicados en npm.

El adaptador eliminó soporte para Pages en la versión 13, según la [guía oficial](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#removed-cloudflare-pages-support). El estado verificado usa Workers. El PR #70 documenta el paso previo de actualización; las pruebas que se adjuntan aquí corresponden al estado final, no acreditan compilaciones históricas de cada versión mayor.

## Revisión de los fallos previos

- **Destino del despliegue:** Astro 7 y el adaptador 14 generan un Worker con assets. `scripts/ensure-workers-target.mjs` cancela el build cuando `CF_PAGES=1`. El preview se publica con el nombre propio `automate-it-website-security-verify`, sin rutas ni dominio de producción.
- **Variables del portal:** guard, sesión, login, logout, reset-password y páginas de administración usan `env` desde `cloudflare:workers`. `getSupabaseEnv` recibe las variables del runtime y conserva el fallback de desarrollo. Se revisaron `src/lib/portal`, `src/pages/portal` y `src/pages/demo`. La demo funciona con datos sembrados y cookie; las rutas privadas sin sesión devuelven 302.
- **Chunks con punto inicial:** `scripts/check-worker-chunks.mjs` recorre `dist/server/chunks`, comprueba `entry.mjs` y cancela el build ante chunks `.mjs` ocultos. El build y el dry-run de Wrangler pasaron; se registraron 54 módulos. `prerenderEnvironment: 'node'` y `session: false` siguen en la configuración.
- **Migraciones:** el estado final usa `output: 'static'` con `prerender=false` para rutas dinámicas; colecciones con `src/content.config.ts`, loader `glob`, `render(post)` e IDs que conservan las URLs. Referencias: guías [Astro 5](https://docs.astro.build/en/guides/upgrade-to/v5/), [Astro 6](https://docs.astro.build/en/guides/upgrade-to/v6/) y [Astro 7](https://docs.astro.build/en/guides/upgrade-to/v7/).

## Resultado de las pruebas

| Prueba | Resultado |
| --- | --- |
| `npm ci` | 514 paquetes, código de salida 0 |
| `npm audit --audit-level=high --json` | 0 vulnerabilidades en todos los niveles; sin lista blanca |
| `npm run build`, entorno de producción | Pasó |
| Build con `CLOUDFLARE_ENV=security_preview` | Pasó |
| `npm run deploy:built -- --dry-run` | Pasó; Worker aislado, 144 assets |
| `npm run preview -- --host 127.0.0.1 --port 4323` + Playwright | 48 controles pasaron |
| Preview remoto + Playwright | 48 controles pasaron |
| `npm run check:links` | 53 páginas, 0 enlaces rotos |
| Lighthouse mobile remoto | Rendimiento 94, accesibilidad 95, buenas prácticas 100, SEO 100; sin avisos |
| Despliegue de producción antes/después | Mismo deployment y misma versión al 100% |

Evidencia JSON: [local](evidence/local-playwright.json), [remota](evidence/remote-playwright.json), [auditoría](evidence/audit.json) y [Lighthouse](evidence/preview-lighthouse-summary.json). Lighthouse 13.5.0, móvil simulado, medido a las 02:30:35 UTC. El rendimiento varía entre ejecuciones; el resultado supera el umbral solicitado de 85.

Las diez URLs públicas devolvieron 200 tras las redirecciones de barra final: `/`, `/en/`, `/diagnostico`, `/en/diagnostic`, `/blog`, `/blog/cuando-el-negocio-crece-pero-sigues-igual-de-ocupado`, `/quienes-somos`, `/demo`, `/en/demo`, `/portal/login`.

Las demos ES y EN completaron el formulario, abrieron `/portal` con nombre y negocio, y mostraron las cifras de ejemplo **42 s**, **$14,400** y **287**. `/portal/leads`, `/portal/conversations` y `/portal/settings` respondieron 200 con la cookie de demo. Las 13 rutas privadas de la prueba devolvieron 302 hacia login sin sesión. Las cuatro redirecciones de Astro conservaron 301 y destino: `/empresas`, `/privacidad`, `/terminos` y `/en/privacy`. El sitemap mantuvo exactamente las mismas 50 URLs que producción; seis rutas conservaron sus cabeceras y etiquetas robots. Cero errores de JavaScript registrados.

La prueba cubre lectura pública, demo y acceso sin sesión. El preview usa solo ASSETS; se preservó el aislamiento de los secrets de producción. El login autenticado contra Supabase queda fuera de esta prueba: el Worker de producción carece de `SUPABASE_URL` y `SUPABASE_ANON_KEY`, como indica `CLAUDE.md`.

## Preview y trazabilidad

- URL: https://automate-it-website-security-verify.coachgerardonavas.workers.dev
- Versión de preview: `7caeb0e5-852c-443b-af53-052a413d695b`.
- Etiqueta: `verify-fd3d973`; código de aplicación construido desde el commit base arriba indicado.
- Producción: `automate-it-website-worker`, deployment `8e9e8807-6e7e-415b-9069-6e4b9ac54e7c`, versión `c5435c4d-92af-4c6e-a24e-c425e0b1a017`, al 100%. Los resultados de `wrangler deployments list` antes y después del preview coinciden. Este trabajo publicó únicamente el Worker de preview.
- La publicación inicial precede al commit de esta evidencia; la aplicación y el lockfile son idénticos al commit base. El script registra el commit de referencia, sin inferir el commit de un servidor a partir de una respuesta HTTP.

Para repetir, el agente debe seleccionar el entorno **al compilar**, de acuerdo con la [documentación de Cloudflare](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/). Configurar Playwright y Chromium en su entorno, usando `PLAYWRIGHT_MODULE_PATH` y `CHROME_PATH` si se suministran fuera del repo. La prueba utiliza herramientas externas; no agrega dependencias a la aplicación.

```powershell
npm ci
npm audit --audit-level=high
$env:CLOUDFLARE_ENV='security_preview'
npm run build
npm run deploy:built -- --dry-run
npm run preview -- --host 127.0.0.1 --port 4323
# En otra terminal con Playwright y Chromium disponibles:
node scripts/verify-security-preview.cjs http://127.0.0.1:4323 .verification/local
node scripts/verify-security-preview.cjs https://automate-it-website-security-verify.coachgerardonavas.workers.dev .verification/remote
```

Antes de publicar, comprobar que `dist/server/wrangler.json` contiene el nombre `automate-it-website-security-verify` y carece de rutas de producción. La configuración generada es la que usa el comando de despliegue. Quitar `CLOUDFLARE_ENV` para el build de producción.

## Reversa en un paso

**Cambios de este PR:** revertir el único commit de la rama `codex/astro-security-verification` (hash indicado en el PR). Conserva las dependencias corregidas y el destino actual de producción. La reversa se entrega para revisión; este trabajo termina con PR y conserva `main`.

**Runtime de producción ante una futura regresión:** se verificó que existe la versión actual segura. El agente puede restaurarla en una sola orden:

```powershell
npx wrangler rollback c5435c4d-92af-4c6e-a24e-c425e0b1a017 --name automate-it-website-worker --config wrangler.jsonc --yes --message "Restore verified Astro security baseline"
```

Esta orden se documentó y se verificó la disponibilidad de la versión; se conserva pendiente de un caso real de reversa. Los [rollbacks de Cloudflare](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/) restauran la versión del Worker y requieren que sus recursos vinculados sigan disponibles. El commit de migración `8c1c217` antecede al cambio de plataforma; revertirlo por sí solo recuperaría dependencias vulnerables y un destino Pages incompatible con el despliegue actual. Usar la versión segura indicada como baseline operativo.
