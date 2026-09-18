/**
 * @astrojs/cloudflare 14 emite `dist/server/wrangler.json` en el formato de
 * "Workers con assets" (campo `assets.directory`), pero Cloudflare Pages
 * todavía espera el campo específico de Pages `pages_build_output_dir` para
 * aceptar ese archivo como configuración redirigida. Sin él, el build de
 * Cloudflare Pages descarta el wrangler.json ("does not appear to be valid
 * ... make sure the file is valid and contains the `pages_build_output_dir`
 * property"), no encuentra `/functions` y despliega el sitio como HTML
 * estático puro — sin la Function que renderiza cada página SSR (home,
 * diagnóstico, empresas, portal, etc.), todas 404 salvo lo prerenderizado.
 *
 * Este script corre después del build: agrega `pages_build_output_dir` al
 * wrangler.json generado, apuntando al directorio de assets (`../client`,
 * relativo a dist/server) que el propio archivo ya declara en `assets.directory`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SERVER_DIR = fileURLToPath(new URL("../dist/server", import.meta.url));
const CONFIG_PATH = join(SERVER_DIR, "wrangler.json");

let raw;
try {
  raw = readFileSync(CONFIG_PATH, "utf-8");
} catch {
  console.log("[fix-pages-output-dir] dist/server/wrangler.json no existe todavía — nada que hacer.");
  process.exit(0);
}

const config = JSON.parse(raw);

if (config.pages_build_output_dir) {
  console.log("[fix-pages-output-dir] pages_build_output_dir ya presente — nada que corregir.");
  process.exit(0);
}

const assetsDir = config.assets?.directory;
if (!assetsDir) {
  throw new Error("[fix-pages-output-dir] wrangler.json no declara assets.directory; no se puede inferir pages_build_output_dir.");
}

config.pages_build_output_dir = assetsDir;
writeFileSync(CONFIG_PATH, JSON.stringify(config));
console.log(`[fix-pages-output-dir] agregado pages_build_output_dir: "${assetsDir}"`);
