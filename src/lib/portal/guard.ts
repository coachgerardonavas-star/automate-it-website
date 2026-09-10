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
import { getSupabaseEnv, logVisit } from "./supabase";
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

  if (result.status === "unconfigured") {
    // Sesión de vitrina para desarrollo local.
    //
    // Solo se activa cuando se cumplen LAS DOS condiciones: estar en `astro dev`
    // y no haber configurado Supabase. `import.meta.env.DEV` es una constante
    // que se reemplaza en build, así que en producción esta rama es código
    // muerto que ni siquiera llega al bundle.
    //
    // En cuanto haya SUPABASE_URL, `resolveSession` deja de devolver
    // `unconfigured` y este camino no se toca nunca más — ni en local. Es decir:
    // no puede convertirse en un bypass de la autenticación real.
    if (import.meta.env.DEV) {
      return { ok: devPreviewContext(context) };
    }
    return { unconfigured: true };
  }

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

  /*
   * Se anota el paso por la pantalla. Es lo que alimenta "hace cuánto que no
   * entra" en el Centro de administración — la señal que mejor anticipa que un
   * cliente no va a renovar, porque deja de mirar bastante antes de avisar que
   * se va.
   *
   * Va sin `await`: la persona no tiene por qué esperar a que se registre su
   * propia visita para ver la página. Y `logVisit` se traga sus errores, así
   * que una escritura fallida no puede tumbar el render.
   *
   * Solo se registra al rol client. Tus propias visitas al portal ensuciarían
   * la métrica: si entrás a revisar la cuenta de un cliente, esa organización
   * figuraría como "activa" sin que el cliente haya entrado.
   */
  if (env && accessToken && org && session.user.role === "client") {
    void logVisit(env, accessToken, org.id, session.user.id, context.url.pathname);
  }

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

/**
 * Contexto de vitrina para `astro dev` sin base conectada.
 *
 * Rol admin para que se vea también el Centro de administración. La
 * organización va en `data_mode: "demo"`, así que todas las pantallas muestran
 * el cartel de datos de demostración: es imposible confundir esto con datos
 * reales de nadie.
 */
function devPreviewContext(context: APIContext): PortalPageContext {
  const user = {
    id: "dev-preview",
    email: "carlos@example.com",
    fullName: "Carlos Méndez",
    role: "admin" as const,
    locale: "es" as const,
  };

  const org: Organization = {
    id: "dev-preview-org",
    name: "Carlos Plumbing",
    slug: "carlos-plumbing",
    status: "healthy",
    dataMode: "demo",
    accountManager: "Gabriela",
  };

  return {
    session: { user, orgs: [org], activeOrg: org },
    org,
    // Sin `env` ni token: la capa de datos ve `data_mode: "demo"` y sirve los
    // datos sembrados sin intentar ninguna consulta.
    ctx: { org, role: user.role, env: null, accessToken: null, now: new Date() },
    lang: "es",
    currentPath: context.url.pathname,
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
