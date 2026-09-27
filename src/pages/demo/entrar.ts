/**
 * Entrada a la demo pública del portal.
 *
 * El último paso del tour de `/demo` apunta aquí. Deja la cookie de demo con
 * el idioma y manda al portal, que se sirve con datos de ejemplo sin pedir
 * login. También lo usa el cambio de idioma dentro de la demo: vuelve a la
 * misma pantalla con el otro idioma.
 *
 * GET a propósito: es el destino de un enlace (y de una tarjeta NFC si algún
 * día apunta directo al portal). Lo peor que puede provocar un tercero es
 * abrirle la demo a alguien, y una sesión real la ignora.
 */
import type { APIRoute } from "astro";
import { setDemoCookie, parseLang } from "../../lib/portal/demo-session";
import { safeNext } from "../../lib/portal/guard";

export const prerender = false;

export const GET: APIRoute = (context) => {
  const lang = parseLang(context.url.searchParams.get("lang"));
  setDemoCookie(context.cookies, lang);
  // Solo rutas internas del portal: `safeNext` descarta cualquier otro destino.
  const next = safeNext(context.url.searchParams.get("next"));
  return context.redirect(next);
};
