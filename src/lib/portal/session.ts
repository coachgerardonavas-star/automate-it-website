/**
 * Sesión del portal.
 *
 * Los tokens viven en cookies `httpOnly`: JavaScript del navegador no puede
 * leerlos, así que un XSS en el portal no se lleva la sesión. No se usa
 * localStorage por esa misma razón.
 *
 * Regla que atraviesa todo el archivo: el rol y las organizaciones NO salen de
 * la cookie ni de nada que mande el navegador. Se leen de la base en cada
 * request, aplicando RLS. La cookie solo prueba "quién sos", nunca "qué podés
 * ver".
 */

import type { APIContext, AstroCookies } from "astro";
import {
  getSupabaseEnv,
  getAuthUser,
  refreshSession,
  restSelect,
  type SupabaseEnv,
} from "./supabase";
import type {
  Organization,
  PortalSession,
  PortalUser,
  OrgStatus,
  DataMode,
} from "./types";
import { getRuntimeEnv } from "./runtime";

const ACCESS_COOKIE = "ait_at";
const REFRESH_COOKIE = "ait_rt";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
};

export function setSessionCookies(
  cookies: AstroCookies,
  accessToken: string,
  refreshToken: string,
  expiresAt: number
) {
  const maxAge = Math.max(60, expiresAt - Math.floor(Date.now() / 1000));
  cookies.set(ACCESS_COOKIE, accessToken, { ...COOKIE_OPTS, maxAge });
  // El refresh dura más que el access: permite renovar sin volver a pedir
  // contraseña. 30 días es el mismo horizonte que usa Supabase por defecto.
  cookies.set(REFRESH_COOKIE, refreshToken, {
    ...COOKIE_OPTS,
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearSessionCookies(cookies: AstroCookies) {
  cookies.delete(ACCESS_COOKIE, { path: "/" });
  cookies.delete(REFRESH_COOKIE, { path: "/" });
}

interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
  role: "client" | "admin";
  locale: "es" | "en";
}

interface OrgRow {
  id: string;
  name: string;
  slug: string;
  status: OrgStatus;
  data_mode: DataMode;
  account_manager: string | null;
}

/**
 * Estado de configuración del portal.
 *
 * `unconfigured` no es un error: es el estado legítimo mientras la base no
 * esté conectada. Se distingue de `error` para poder mostrar mensajes
 * distintos — uno le habla al CEO, el otro al cliente.
 */
export type SessionResult =
  | { status: "unconfigured" }
  | { status: "anonymous" }
  | { status: "authenticated"; session: PortalSession; accessToken: string };

/**
 * Resuelve la sesión completa. Renueva el token si venció.
 *
 * Se llama en cada ruta protegida. Son dos consultas a Postgres por request
 * (perfil y organizaciones); cuando eso pese, se cachea en KV por unos
 * segundos — no antes, porque cachear permisos es la clase de optimización que
 * termina sirviéndole a alguien los datos de otro.
 */
export async function resolveSession(
  context: Pick<APIContext, "cookies" | "locals">
): Promise<SessionResult> {
  const runtimeEnv = getRuntimeEnv();
  const env = getSupabaseEnv(runtimeEnv);
  if (!env) return { status: "unconfigured" };

  let accessToken = context.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = context.cookies.get(REFRESH_COOKIE)?.value;

  let authUser = accessToken ? await getAuthUser(env, accessToken) : null;

  // Access vencido pero refresh vivo: renovamos en silencio. Sin esto el
  // cliente vería la pantalla de login cada hora sin haber hecho nada.
  if (!authUser && refreshToken) {
    const refreshed = await refreshSession(env, refreshToken);
    if (refreshed.ok) {
      accessToken = refreshed.tokens.accessToken;
      setSessionCookies(
        context.cookies,
        refreshed.tokens.accessToken,
        refreshed.tokens.refreshToken,
        refreshed.tokens.expiresAt
      );
      authUser = await getAuthUser(env, accessToken);
    }
  }

  if (!authUser || !accessToken) {
    clearSessionCookies(context.cookies);
    return { status: "anonymous" };
  }

  try {
    const profiles = await restSelect<ProfileRow>(
      env,
      accessToken,
      `profiles?select=id,email,full_name,role,locale&id=eq.${authUser.id}`
    );
    const profile = profiles[0];
    if (!profile) {
      // Usuario existe en auth pero no tiene perfil: cuenta a medio crear.
      // No se le inventa un rol por defecto — se le niega el paso.
      clearSessionCookies(context.cookies);
      return { status: "anonymous" };
    }

    const orgRows = await restSelect<OrgRow>(
      env,
      accessToken,
      "organizations?select=id,name,slug,status,data_mode,account_manager&order=name.asc"
    );

    const user: PortalUser = {
      id: profile.id,
      email: profile.email,
      fullName: profile.full_name,
      role: profile.role,
      locale: profile.locale ?? "es",
    };

    const orgs: Organization[] = orgRows.map((o) => ({
      id: o.id,
      name: o.name,
      slug: o.slug,
      status: o.status,
      dataMode: o.data_mode,
      accountManager: o.account_manager,
    }));

    return {
      status: "authenticated",
      session: { user, orgs, activeOrg: orgs[0] ?? null },
      accessToken,
    };
  } catch {
    // La base respondió mal. Se trata como sesión anónima en vez de dejar pasar
    // con permisos vacíos: fallar cerrado.
    return { status: "anonymous" };
  }
}

/**
 * Resuelve qué organización se está mirando.
 *
 * `requested` viene de la URL, que el usuario controla. Por eso nunca se usa
 * directamente: se busca dentro de la lista que RLS ya autorizó. Si no está,
 * se cae a la primera permitida. Un cliente que escriba el id de otro no
 * obtiene ese tenant — obtiene el suyo.
 */
export function resolveActiveOrg(
  session: PortalSession,
  requested?: string | null
): Organization | null {
  if (!requested) return session.activeOrg;
  const match = session.orgs.find(
    (o) => o.id === requested || o.slug === requested
  );
  return match ?? session.activeOrg;
}

export { ACCESS_COOKIE, REFRESH_COOKIE };
export type { SupabaseEnv };
