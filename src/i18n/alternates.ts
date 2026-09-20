/**
 * Equivalencias ES ↔ EN para los `hreflang`.
 *
 * Antes, `BaseLayout` emitía siempre `hreflang="es" → /` y `hreflang="en" → /en/`
 * en TODAS las páginas. En `/blog/por-que-tu-negocio-te-tiene-secuestrado`, el
 * alternate en inglés apuntaba al home en inglés. Un `hreflang` que no es
 * recíproco (la página destino no devuelve el enlace) se ignora, así que el
 * bloque entero no servía de nada.
 *
 * La tabla es explícita a propósito. Las rutas ES y EN no son traducción
 * mecánica una de otra (`/quienes-somos` ↔ `/en/about`), y la mayoría de los
 * artículos del blog existen solo en español. Cuando no hay contraparte real,
 * lo correcto es NO emitir `hreflang`: declarar una traducción que no existe es
 * peor que no declarar nada.
 *
 * Al traducir una página o publicar la versión en inglés de un artículo, se
 * agrega aquí el par. Si no se agrega, la página simplemente no declara
 * alternates — nunca apunta a una URL equivocada.
 */

/** Pares `[ruta ES, ruta EN]`. Sin barra final, salvo la raíz. */
const PAIRS: Array<[string, string]> = [
  ["/", "/en/"],
  ["/diagnostico", "/en/diagnostic"],
  ["/quienes-somos", "/en/about"],
  ["/guia-operacion", "/en/operations-guide"],
  ["/blog", "/en/blog"],
  ["/privacy-policy", "/en/privacy-policy"],
  ["/terms", "/en/terms"],
  ["/terminos-consultoria-emprendedores", "/en/consulting-terms"],
  // Único artículo con las dos versiones publicadas. Los demás son solo ES.
  [
    "/blog/por-que-tu-negocio-te-tiene-secuestrado",
    "/en/blog/why-your-business-is-holding-you-hostage",
  ],
];

export interface Alternates {
  es: string;
  en: string;
}

/**
 * Normaliza un pathname para buscarlo en la tabla: quita la barra final
 * (`/diagnostico/` → `/diagnostico`) pero conserva la raíz `/` y `/en/`.
 */
function normalize(pathname: string): string {
  if (pathname === "/" || pathname === "/en/") return pathname;
  const withoutTrailing = pathname.replace(/\/+$/, "");
  return withoutTrailing === "" ? "/" : withoutTrailing;
}

/**
 * Devuelve las rutas ES y EN equivalentes a `pathname`, o `null` si esa página
 * no tiene contraparte declarada en el otro idioma.
 */
export function getAlternates(pathname: string): Alternates | null {
  const path = normalize(pathname);
  // `/en` sin barra es la misma página que `/en/`.
  const lookup = path === "/en" ? "/en/" : path;

  const pair = PAIRS.find(([es, en]) => es === lookup || en === lookup);
  if (!pair) return null;

  return { es: withTrailingSlash(pair[0]), en: withTrailingSlash(pair[1]) };
}

/**
 * El build genera un directorio por página, así que las URLs servidas —y el
 * `canonical`, que sale de `Astro.url.href`— llevan barra final. El `hreflang`
 * que apunta a la propia página tiene que ser idéntico al canonical, o la
 * comprobación de reciprocidad puede tratarlas como URLs distintas.
 */
function withTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}
