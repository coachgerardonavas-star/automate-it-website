/**
 * Cierre de sesión.
 *
 * Solo POST: un GET permitiría cerrarle la sesión a alguien con solo hacerle
 * cargar una imagen apuntando a esta ruta.
 *
 * Las cookies se borran pase lo que pase con la llamada a Supabase. Si la red
 * falla, el usuario igual queda fuera de este navegador, que es lo que pidió.
 */
import type { APIRoute } from "astro";
import { env as cfEnv } from "cloudflare:workers";
import { getSupabaseEnv, signOut } from "../../lib/portal/supabase";
import { clearSessionCookies, ACCESS_COOKIE } from "../../lib/portal/session";
import { PORTAL_BASE } from "../../lib/portal/config";
import { readDemoLang, clearDemoCookie } from "../../lib/portal/demo-session";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const env = getSupabaseEnv(cfEnv as Record<string, unknown>);
  const accessToken = context.cookies.get(ACCESS_COOKIE)?.value;

  if (env && accessToken) {
    await signOut(env, accessToken);
  }

  clearSessionCookies(context.cookies);

  // Quien sale de la demo pública es un prospecto: no tiene cuenta, así que
  // mandarlo al login no le sirve. Vuelve al tour en su idioma.
  const demoLang = readDemoLang(context.cookies);
  if (demoLang) {
    clearDemoCookie(context.cookies);
    return context.redirect(demoLang === "en" ? "/en/demo/" : "/demo/");
  }

  return context.redirect(`${PORTAL_BASE}/login`);
};

/** Un GET no cierra sesión: se devuelve al login sin tocar nada. */
export const GET: APIRoute = (context) =>
  context.redirect(`${PORTAL_BASE}/login`);
