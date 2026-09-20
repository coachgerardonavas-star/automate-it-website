import type { Lang } from "./translations";
import { langs } from "./translations";
import { getAlternates } from "./alternates";

export function getLangFromUrl(url: URL | string): Lang {
  const pathname = typeof url === "string" ? url : url.pathname;
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg === "en" ? "en" : "es";
}

export function localizedPath(lang: Lang, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "es") return clean === "/en" ? "/" : clean;
  return clean === "/" ? "/en/" : `/en${clean}`;
}

/**
 * Pares que solo existen para el selector de idioma, no para `hreflang`.
 *
 * `/gracias` y `/error` son `noindex`: no declaran alternates (no participan en
 * la indexación), pero el selector sí tiene que llevar a algún lado sensato si
 * alguien lo pulsa estando ahí.
 */
const UI_ONLY_PAIRS: Record<string, string> = {
  "/gracias": "/en/thanks",
  "/en/thanks": "/gracias",
  "/error": "/en/error",
  "/en/error": "/error",
};

/**
 * Devuelve la ruta equivalente en `target` para la página actual.
 *
 * Antes esto prefijaba `/en` a la ruta actual y solo conocía cinco
 * equivalencias. En `/empresas` el selector mandaba a `/en/empresas`, que no
 * existe; en `/en/about` mandaba a `/about`, que tampoco. Once enlaces del
 * sitio terminaban en 404 por esa vía — el mismo defecto que tenían los
 * `hreflang`: asumir que la ruta en el otro idioma es la misma con prefijo.
 *
 * Ahora la fuente es la tabla real de `alternates.ts`. Cuando la página no
 * tiene contraparte (`/empresas`, `/ia`, `/consultoria`, los artículos que solo
 * existen en español), el selector lleva al home del otro idioma: no es la
 * traducción, pero es una página real. Un 404 nunca es la mejor opción.
 */
export function switchLangPath(currentPath: string, target: Lang): string {
  const trimmed = currentPath.replace(/\/+$/, "") || "/";

  const uiOnly = UI_ONLY_PAIRS[trimmed];
  if (uiOnly) return uiOnly;

  const alternates = getAlternates(trimmed);
  if (alternates) {
    const next = target === "es" ? alternates.es : alternates.en;
    // La tabla guarda las rutas con barra final para que coincidan con el
    // canonical. En un href de navegación esa barra sobra salvo en la raíz.
    return next === "/" || next === "/en/" ? next : next.replace(/\/$/, "");
  }

  // Un artículo sin traducción cae al listado del blog del otro idioma, que sí
  // existe y es lo más cercano al contenido que la persona estaba leyendo.
  const isEnglish = trimmed === "/en" || trimmed.startsWith("/en/");
  const stripped = isEnglish ? trimmed.replace(/^\/en/, "") || "/" : trimmed;
  if (stripped.startsWith("/blog/")) {
    return target === "es" ? "/blog" : "/en/blog";
  }

  return target === "es" ? "/" : "/en/";
}

export { langs };
export type { Lang };
