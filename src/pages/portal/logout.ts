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
import { getSupabaseEnv, signOut } from "../../lib/portal/supabase";
import { clearSessionCookies, ACCESS_COOKIE } from "../../lib/portal/session";
import { PORTAL_BASE } from "../../lib/portal/config";
import { getRuntimeEnv } from "../../lib/portal/runtime";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const env = getSupabaseEnv(getRuntimeEnv());
  const accessToken = context.cookies.get(ACCESS_COOKIE)?.value;

  if (env && accessToken) {
    await signOut(env, accessToken);
  }

  clearSessionCookies(context.cookies);
  return context.redirect(`${PORTAL_BASE}/login`);
};

/** Un GET no cierra sesión: se devuelve al login sin tocar nada. */
export const GET: APIRoute = (context) =>
  context.redirect(`${PORTAL_BASE}/login`);
