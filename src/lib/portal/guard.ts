/**
 * Guardián de las rutas del portal.
 *
 * Cada pantalla llama a `requirePortal` y recibe de vuelta todo lo que necesita
 * para renderizar: usuario, organizaciones, organización activa y el contexto
 * de datos. Eso es deliberado — la autorización no es un paso aparte que se
 * pueda olvidar, es la misma llamada que trae los datos. Una página que no la
 * invoque no tiene con qué pintarse y falla de inmediato, en vez de fallar en
 * silencio mostrando información de otro.
 *
 * Se resolvió con un helper por página y no con middleware global para no
 * agregar superficie al sitio público: el portal no debe poder romper el resto
 * del sitio (handoff §45).
 */

import type { APIContext } from "astro";
import { resolveSession, resolveActiveOrg } from "./session";
import { getSupabaseEnv } from "./supabase";
import { PORTAL_BASE } from "./config";
import type { DataContext } from "./data";
import type { Organization, PortalSession } from "./types";
import type { Lang } from "../../i18n/translations";

export interface PortalPageContext {
  session: PortalSession;
  org: Organization | null;
  ctx: DataContext | null;
  lang: Lang;
  currentPath: string;
}

type GuardResult =
  | { redirect: Response }
  | { unconfigured: true }
  | { ok: PortalPageContext };

/**
 * Resuelve sesión y contexto, o devuelve la redirección al login.
 *
 * El idioma sale del perfil del usuario y no de la URL: el portal no vive bajo
 * /en/ como el sitio público, porque no se comparte ni se indexa por idioma.
 */
export async function requirePortal(context: APIContext): Promise<GuardResult> {
  const result = await resolveSession(context);

  if (result.status === "unconfigured") return { unconfigured: true };

  if (result.status === "anonymous") {
    // `next` permite volver a donde iba después de entrar. Se guarda solo la
    // ruta, nunca una URL completa: aceptar un destino absoluto abriría una
    // redirección hacia un dominio ajeno.
    const next = encodeURIComponent(context.url.pathname);
    return {
      redirect: context.redirect(`${PORTAL_BASE}/login?next=${next}`),
    };
  }

  const { session, accessToken } = result;
  const requested = context.url.searchParams.get("org");
  const org = resolveActiveOrg(session, requested);

  const lang: Lang = session.user.locale ?? "es";
  const env = getSupabaseEnv((context.locals as any)?.runtime?.env);

  const ctx: DataContext | null = org
    ? { org, role: session.user.role, env, accessToken, now: new Date() }
    : null;

  return {
    ok: {
      session: { ...session, activeOrg: org },
      org,
      ctx,
      lang,
      currentPath: context.url.pathname,
    },
  };
}

/** Destino seguro tras el login: solo rutas internas del portal. */
export function safeNext(raw: string | null): string {
  if (!raw) return PORTAL_BASE;
  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return PORTAL_BASE;
  }
  // Una sola barra inicial y nada de "//host" ni de esquemas: eso descarta
  // cualquier salto a otro dominio.
  if (!decoded.startsWith(`${PORTAL_BASE}`)) return PORTAL_BASE;
  if (decoded.startsWith("//")) return PORTAL_BASE;
  return decoded;
}
