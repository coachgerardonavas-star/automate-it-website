/**
 * Entrada a la demo pública del portal.
 *
 * POST: lo manda el formulario de `/demo` con el nombre del prospecto y el de
 * su negocio. Se guardan en la cookie de demo (solo en su navegador) y se abre
 * el portal con datos de ejemplo, saludándolo por su nombre.
 *
 * Es POST y no GET para que el nombre no quede en la URL: ni en el historial
 * del teléfono, ni en los logs, ni en ningún enlace que se comparta.
 *
 * GET: el cambio de idioma dentro de la demo. Conserva el nombre y el negocio
 * que ya estaban y vuelve a la misma pantalla con el otro idioma. Lo peor que
 * puede provocar un tercero con este enlace es abrirle la demo a alguien, y
 * una sesión real la ignora.
 */
import type { APIRoute } from "astro";
import { PORTAL_BASE } from "../../lib/portal/config";
import { safeNext } from "../../lib/portal/guard";
import { readDemo, setDemoCookie, toProfile } from "../../lib/portal/demo-session";

export const prerender = false;

export const POST: APIRoute = async (context) => {
  let form: FormData | null = null;
  try {
    form = await context.request.formData();
  } catch {
    // Cuerpo ilegible: se abre la demo con el negocio de ejemplo.
  }
  const profile = toProfile({
    lang: form?.get("lang"),
    name: form?.get("name"),
    business: form?.get("business"),
  });
  setDemoCookie(context.cookies, profile);
  // 303: después de un POST, el navegador pide el portal con GET.
  return context.redirect(PORTAL_BASE, 303);
};

export const GET: APIRoute = (context) => {
  const current = readDemo(context.cookies);
  const profile = toProfile({
    lang: context.url.searchParams.get("lang"),
    name: current?.name,
    business: current?.business,
  });
  setDemoCookie(context.cookies, profile);
  // Solo rutas internas del portal: `safeNext` descarta cualquier otro destino.
  const next = safeNext(context.url.searchParams.get("next"));
  return context.redirect(next);
};
