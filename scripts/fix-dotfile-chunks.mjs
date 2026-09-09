/**
 * `lucide-astro` publica un componente compartido llamado literalmente
 * `.Layout.astro` dentro de su propio paquete (`node_modules/lucide-astro/dist/.Layout.astro`).
 * Cuando el build de producción lo separa en su propio chunk, ese chunk hereda
 * el punto inicial: `chunks/.Layout_<hash>.mjs`.
 *
 * El worker se sube a Cloudflare con `no_bundle: true` (ver `dist/server/wrangler.json`),
 * así que Wrangler descubre los módulos recorriendo el directorio con un glob
 * (`**\/*.mjs`) — y un glob sin `dot: true` nunca matchea un archivo que empieza
 * con punto. El chunk existe en disco pero Wrangler no lo registra, y cualquier
 * página que dependa de él (cualquier pantalla del portal que use íconos de
 * `lucide-astro`, vía `PortalIcon`/`StatusPill`) falla en producción con
 * "No such module" — un 500 que no aparece en `astro dev` porque ahí no hay
 * chunking.
 *
 * Este script corre después del build: busca chunks con nombre que empiece
 * con punto, les quita el punto, y reescribe la referencia en todo `dist/server`.
 * No depende de un hash fijo — cualquier chunk problemático se corrige igual.
 */
import { readdirSync, renameSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SERVER_DIR = new URL("../dist/server", import.meta.url).pathname;
const CHUNKS_DIR = join(SERVER_DIR, "chunks");

function walkMjsFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walkMjsFiles(full));
    } else if (entry.endsWith(".mjs")) {
      out.push(full);
    }
  }
  return out;
}

let dotFiles;
try {
  dotFiles = readdirSync(CHUNKS_DIR).filter((f) => f.startsWith("."));
} catch {
  console.log("[fix-dotfile-chunks] dist/server/chunks no existe todavía — nada que hacer.");
  process.exit(0);
}

if (dotFiles.length === 0) {
  console.log("[fix-dotfile-chunks] sin chunks con punto inicial — nada que corregir.");
  process.exit(0);
}

const renames = dotFiles.map((dotFile) => [dotFile, dotFile.replace(/^\.+/, "_")]);
for (const [dotFile, safeName] of renames) {
  renameSync(join(CHUNKS_DIR, dotFile), join(CHUNKS_DIR, safeName));
  console.log(`[fix-dotfile-chunks] renombrado chunks/${dotFile} -> chunks/${safeName}`);
}

const allMjs = walkMjsFiles(SERVER_DIR);

for (const [dotFile, safeName] of renames) {
  for (const file of allMjs) {
    const content = readFileSync(file, "utf-8");
    if (!content.includes(dotFile)) continue;
    const fixed = content.split(dotFile).join(safeName);
    writeFileSync(file, fixed);
    console.log(`[fix-dotfile-chunks] referencia corregida en ${file.replace(SERVER_DIR, "server")}`);
  }
}
