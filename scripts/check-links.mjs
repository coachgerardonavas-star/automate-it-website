/**
 * Verificador de enlaces internos sobre el build.
 *
 * Existe porque el sitio compilaba perfecto mientras servía trece enlaces
 * rotos: Astro no comprueba que una URL escrita a mano lleve a algún lado.
 * Los tres defectos que aparecieron el 20-sep-2026 (la imagen de vista previa
 * inexistente, el selector de idioma apuntando a rutas que no existen y los
 * enlaces legales del home en inglés) los habría atrapado este script.
 *
 * Recorre cada página de `dist/`, junta todos los `href` y `src` internos y
 * comprueba que resuelvan a un archivo publicado, a una redirección declarada
 * en `astro.config.mjs` o a una ruta que se sirve en el servidor.
 *
 * Uso: `npm run build && npm run check:links`
 * Devuelve código 1 si encuentra algo roto, para poder usarlo como control
 * automático. Va aparte de `npm run build` a propósito: un enlace roto no debe
 * impedir que el sitio se publique, solo avisar.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const DIST = "dist";

/** Redirecciones declaradas en `astro.config.mjs`: existen aunque no sean archivos. */
const REDIRECTS = new Set(["/privacidad", "/terminos", "/en/privacy"]);

/**
 * Rutas que se generan en el servidor (`prerender = false`), así que nunca
 * aparecen como archivo en `dist` aunque sí respondan en producción.
 */
const SERVER_ROUTES = [/^\/portal(\/|$)/, /^\/pulso\//, /^\/r\//, /^\/keystatic/, /^\/acuerdo(\/|$)/];

const SKIP_SCHEMES = /^(https?:|mailto:|tel:|javascript:|data:|#)/;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

/** Convierte una ruta de archivo de `dist` en la URL con la que se sirve. */
function servedUrl(file) {
  const rel = path.relative(DIST, file).split(path.sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"index.html".length);
  return "/" + rel;
}

/** Normaliza un enlace para compararlo: sin ancla, sin query, con barra final. */
function normalize(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || SKIP_SCHEMES.test(clean) || !clean.startsWith("/")) return null;
  const last = clean.split("/").pop();
  // Si el último segmento no tiene extensión, es una página: lleva barra final.
  return !clean.endsWith("/") && !last.includes(".") ? clean + "/" : clean;
}

const files = await walk(DIST);
const served = new Set();
for (const f of files) {
  served.add(servedUrl(f));
  // Un archivo estático también se sirve por su propia ruta.
  const rel = "/" + path.relative(DIST, f).split(path.sep).join("/");
  served.add(rel);
}

const htmlFiles = files.filter((f) => f.endsWith(".html"));
const broken = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const page = path.relative(DIST, file).split(path.sep).join("/");
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = normalize(match[1]);
    if (url === null) continue;
    if (served.has(url)) continue;
    if (REDIRECTS.has(url.replace(/\/$/, ""))) continue;
    if (SERVER_ROUTES.some((re) => re.test(url))) continue;
    if (!broken.has(url)) broken.set(url, new Set());
    broken.get(url).add(page);
  }
}

console.log(`Páginas revisadas: ${htmlFiles.length}`);

if (broken.size === 0) {
  console.log("Enlaces internos rotos: 0");
  process.exit(0);
}

console.error(`\nEnlaces internos rotos: ${broken.size}\n`);
for (const [url, pages] of [...broken].sort()) {
  const list = [...pages].sort();
  const shown = list.slice(0, 3).join(", ");
  const rest = list.length > 3 ? ` (+${list.length - 3} más)` : "";
  console.error(`  ${url}\n    ← ${shown}${rest}`);
}
console.error("");
process.exit(1);
