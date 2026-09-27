/**
 * Salida de la demo pública: borra la cookie y vuelve al tour en su idioma.
 */
import type { APIRoute } from "astro";
import { clearDemoCookie, parseLang } from "../../lib/portal/demo-session";

export const prerender = false;

export const GET: APIRoute = (context) => {
  const lang = parseLang(context.url.searchParams.get("lang"));
  clearDemoCookie(context.cookies);
  return context.redirect(lang === "en" ? "/en/demo" : "/demo");
};
