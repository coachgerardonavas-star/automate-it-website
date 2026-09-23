/**
 * Convierte el `dist/server/wrangler.json` que genera @astrojs/cloudflare en
 * un config listo para `wrangler deploy` nativo (Workers), no para Cloudflare
 * Pages.
 *
 * Por qué hace falta: este proyecto era un proyecto Pages (integración con
 * Git clásica). El adaptador 14 genera un wrangler.json en el formato
 * "Workers con assets", que Pages solo acepta si el archivo trae
 * `pages_build_output_dir` — pero aun así lo rechaza, porque Pages reserva el
 * nombre `ASSETS` para su propio binding y este archivo ya lo usa (ver commit
 * "Disable Astro built-in sessions..." en esta misma rama para el diagnóstico
 * completo, verificado con `wrangler deploy --dry-run` local). La solución no
 * es un ajuste de Pages: es desplegar como Worker nativo, donde `ASSETS` es
 * justamente el nombre correcto.
 *
 * Este script:
 *   1. Quita `pages_build_output_dir` — un Worker nativo no lo usa, y dejarlo
 *      puesto es lo que dispara la validación de Pages que rechaza el archivo.
 *   2. Agrega `account_id` — el mismo que usan el resto de los Workers de
 *      Automate IT (ver cualquier workers/<nombre>/wrangler.toml).
 *   3. Agrega el binding de KV `STATE` — el mismo namespace que ya escribe
 *      `health-check` y que el panel /portal/admin lee para mostrar el estado
 *      de los sistemas. Hoy ese binding vive solo en la configuración del
 *      proyecto Pages (fuera del repo); sin este paso, el Worker nuevo no lo
 *      tendría y el panel de admin perdería esa sección en silencio.
 *
 * Si algún día se agregan más bindings solo en el dashboard de Pages
 * (variables, KV, R2), hay que sumarlos acá también — no se heredan solos.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SERVER_DIR = fileURLToPath(new URL("../dist/server", import.meta.url));
const CONFIG_PATH = join(SERVER_DIR, "wrangler.json");

// Mismo account_id que workers/*/wrangler.toml.
const ACCOUNT_ID = "0eb99d5fd784e62ca2519c2ca0627ea5";

// Mismo namespace que workers/health-check/wrangler.toml (binding STATE).
const STATE_KV_NAMESPACE_ID = "8306bbe9f0314af5aa44172601442a21";

let raw;
try {
  raw = readFileSync(CONFIG_PATH, "utf-8");
} catch {
  console.log("[prepare-workers-deploy] dist/server/wrangler.json no existe todavía — nada que hacer.");
  process.exit(0);
}

const config = JSON.parse(raw);

delete config.pages_build_output_dir;
config.account_id = ACCOUNT_ID;

const hasState = (config.kv_namespaces ?? []).some((kv) => kv.binding === "STATE");
if (!hasState) {
  config.kv_namespaces = [...(config.kv_namespaces ?? []), { binding: "STATE", id: STATE_KV_NAMESPACE_ID }];
}

writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
console.log("[prepare-workers-deploy] wrangler.json listo para `wrangler deploy` (account_id + KV STATE agregados, pages_build_output_dir removido).");
