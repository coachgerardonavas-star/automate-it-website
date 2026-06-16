import type { Lang } from "./translations";
import { langs } from "./translations";

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

export function switchLangPath(currentPath: string, target: Lang): string {
  const trimmed = currentPath.replace(/\/+$/, "") || "/";
  const isEnglish = trimmed === "/en" || trimmed.startsWith("/en/");
  let stripped = isEnglish
    ? trimmed.replace(/^\/en/, "") || "/"
    : trimmed;

  // Blog articles: switching lang lands on the listing because slugs differ.
  if (stripped.startsWith("/blog/") && stripped !== "/blog") {
    stripped = "/blog";
  }

  const equivalences: Record<string, string> = {
    "/diagnostico": "/diagnostic",
    "/diagnostic": "/diagnostico",
    "/gracias": "/thanks",
    "/thanks": "/gracias",
    "/error": "/error",
  };

  let nextPath = stripped;
  if (target === "en" && equivalences[stripped])
    nextPath = equivalences[stripped];
  else if (target === "es" && equivalences[stripped])
    nextPath = equivalences[stripped];

  return target === "es"
    ? nextPath === "/" ? "/" : nextPath
    : nextPath === "/" ? "/en/" : `/en${nextPath}`;
}

export { langs };
export type { Lang };
