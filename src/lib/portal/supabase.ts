/**
 * Cliente mínimo de Supabase sobre `fetch`.
 *
 * Por qué no el SDK: `CLAUDE.md` obliga a detenerse antes de sumar una
 * librería, y aquí no hace falta ninguna. Supabase Auth (GoTrue) y PostgREST
 * son APIs HTTP. Lo único que el SDK aportaría es azúcar sintáctico, a cambio
 * de peso en el bundle del runtime de Workers.
 *
 * La pieza que hace segura esta decisión: PostgREST aplica las políticas de RLS
 * a partir del JWT que se manda en `Authorization`. Es decir, el aislamiento
 * entre clientes lo garantiza Postgres, no este archivo. Si alguien encuentra
 * un bug acá, el peor caso es que la consulta falle — no que devuelva datos de
 * otro tenant.
 */

export interface SupabaseEnv {
  url: string;
  anonKey: string;
}

/**
 * Lee la configuración del entorno.
 *
 * En Cloudflare las variables de runtime llegan por `locals.runtime.env`, no
 * por `import.meta.env` (que se resuelve en build). Se aceptan ambas para que
 * `astro dev` funcione con un `.env` local.
 *
 * Devuelve null si falta configuración, en vez de lanzar: el portal muestra
 * entonces una pantalla honesta de "no configurado" y el sitio público sigue
 * funcionando. Un throw acá tumbaría el render de toda la ruta.
 */
export function getSupabaseEnv(runtimeEnv?: Record<string, unknown>): SupabaseEnv | null {
  const url =
    (runtimeEnv?.SUPABASE_URL as string | undefined) ??
    import.meta.env.SUPABASE_URL ??
    import.meta.env.PUBLIC_SUPABASE_URL;
  const anonKey =
    (runtimeEnv?.SUPABASE_ANON_KEY as string | undefined) ??
    import.meta.env.SUPABASE_ANON_KEY ??
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;
  return { url: String(url).replace(/\/$/, ""), anonKey: String(anonKey) };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  /** Epoch en segundos. */
  expiresAt: number;
}

export interface AuthError {
  message: string;
}

type AuthResult =
  | { ok: true; tokens: AuthTokens }
  | { ok: false; error: AuthError };

function tokensFrom(json: any): AuthTokens {
  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
    expiresAt: Math.floor(Date.now() / 1000) + (json.expires_in ?? 3600),
  };
}

export async function signInWithPassword(
  env: SupabaseEnv,
  email: string,
  password: string
): Promise<AuthResult> {
  const res = await fetch(`${env.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: env.anonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    // El mensaje que devuelve GoTrue distingue "usuario no existe" de
    // "contraseña incorrecta". Eso es un oráculo de enumeración de cuentas,
    // así que no se propaga: la UI muestra siempre el mismo texto genérico.
    return { ok: false, error: { message: "invalid_credentials" } };
  }
  return { ok: true, tokens: tokensFrom(json) };
}

export async function refreshSession(
  env: SupabaseEnv,
  refreshToken: string
): Promise<AuthResult> {
  const res = await fetch(`${env.url}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: {
      apikey: env.anonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) return { ok: false, error: { message: "refresh_failed" } };
  return { ok: true, tokens: tokensFrom(json) };
}

export async function signOut(env: SupabaseEnv, accessToken: string): Promise<void> {
  // Best-effort: si falla, la cookie se borra igual del lado del navegador.
  await fetch(`${env.url}/auth/v1/logout`, {
    method: "POST",
    headers: {
      apikey: env.anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
  }).catch(() => undefined);
}

export interface AuthUser {
  id: string;
  email: string;
}

export async function getAuthUser(
  env: SupabaseEnv,
  accessToken: string
): Promise<AuthUser | null> {
  const res = await fetch(`${env.url}/auth/v1/user`, {
    headers: {
      apikey: env.anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) return null;
  const json = await res.json().catch(() => null);
  if (!json?.id) return null;
  return { id: json.id, email: json.email };
}

/**
 * GET contra PostgREST con el JWT del usuario.
 *
 * `accessToken` es obligatorio y siempre es el del usuario final — nunca la
 * service_role key, que salta RLS. Si algún día hace falta la service key para
 * la capa de ingesta de telemetría, vivirá en un Worker aparte, no acá.
 */
export async function restSelect<T>(
  env: SupabaseEnv,
  accessToken: string,
  path: string
): Promise<T[]> {
  const res = await fetch(`${env.url}/rest/v1/${path}`, {
    headers: {
      apikey: env.anonKey,
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`postgrest_${res.status}`);
  }
  return (await res.json()) as T[];
}

/**
 * Llama una función de la base por RPC, con el JWT del usuario.
 *
 * Se usa para lo que no conviene resolver a fuerza de consultas sueltas:
 * medianas, agregados por cliente, cualquier cosa que en el cliente obligaría a
 * traer miles de filas para reducirlas a un número. Las funciones son
 * `security invoker`, así que la RLS se aplica igual que en un select.
 */
export async function rpc<T>(
  env: SupabaseEnv,
  accessToken: string,
  fn: string,
  args: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(`${env.url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: env.anonKey,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) {
    throw new Error(`rpc_${fn}_${res.status}`);
  }
  return (await res.json()) as T;
}

/**
 * Registra que esta persona pasó por esta pantalla hoy.
 *
 * Es la única escritura que el portal hace con el token del usuario final, y
 * está acotada por la política `own_visit_insert`: solo su propio id, solo una
 * organización de la que es miembro, y un índice único la limita a una fila por
 * ruta y día. Falla en silencio a propósito: que no se pueda anotar una visita
 * no puede tumbar la pantalla que la persona vino a ver.
 */
export async function logVisit(
  env: SupabaseEnv,
  accessToken: string,
  organizationId: string,
  userId: string,
  path: string
): Promise<void> {
  try {
    await fetch(`${env.url}/rest/v1/portal_visits`, {
      method: "POST",
      headers: {
        apikey: env.anonKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        // La fila del día ya existe casi siempre: se ignora el choque en vez
        // de tratarlo como error.
        Prefer: "resolution=ignore-duplicates,return=minimal",
      },
      body: JSON.stringify({
        organization_id: organizationId,
        user_id: userId,
        path,
      }),
    });

    await fetch(`${env.url}/rest/v1/profiles?id=eq.${userId}`, {
      method: "PATCH",
      headers: {
        apikey: env.anonKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ last_seen_at: new Date().toISOString() }),
    });
  } catch {
    // Intencionalmente vacío. Ver comentario de arriba.
  }
}
