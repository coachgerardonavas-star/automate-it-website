/**
 * Sesión de demostración pública del portal.
 *
 * Es lo que ve un prospecto cuando toca la tarjeta NFC y, al final del tour de
 * `/demo`, entra al portal sin cuenta. Recorre las mismas pantallas que un
 * cliente real, con los datos sembrados de `demo-data.ts`.
 *
 * Por qué no es un bypass de la autenticación:
 *
 * 1. La cookie solo dice "quiero ver la demo" y el idioma. No lleva identidad,
 *    rol ni organización: todo eso sale fijo de este archivo.
 * 2. El contexto de datos va sin `env` ni token. La capa de datos ve
 *    `data_mode: "demo"` y sirve lo sembrado sin tocar Supabase, así que no
 *    hay ninguna consulta con la que llegar a datos de un cliente.
 * 3. El rol es `client`: el Centro de administración no aparece y su ruta
 *    rechaza el acceso igual que a cualquier cliente.
 * 4. Una sesión real siempre gana. El guardián resuelve primero la sesión de
 *    Supabase y solo cae aquí cuando no hay nadie autenticado.
 */

import type { AstroCookies } from "astro";
import type { Organization, PortalUser } from "./types";
import type { Lang } from "../../i18n/translations";

const DEMO_COOKIE = "ait_demo";

/** Id reservado: ningún usuario de Supabase puede tenerlo (no es un UUID). */
export const DEMO_USER_ID = "public-demo";

/** Lo que dura la demo abierta en el navegador del prospecto. */
const DEMO_MAX_AGE = 60 * 60 * 24;

export function setDemoCookie(cookies: AstroCookies, lang: Lang) {
  cookies.set(DEMO_COOKIE, lang, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: DEMO_MAX_AGE,
  });
}

export function clearDemoCookie(cookies: AstroCookies) {
  cookies.delete(DEMO_COOKIE, { path: "/" });
}

/** Idioma de la demo, o null si este navegador no la abrió. */
export function readDemoLang(cookies: AstroCookies): Lang | null {
  const value = cookies.get(DEMO_COOKIE)?.value;
  if (value === "es" || value === "en") return value;
  return null;
}

export function parseLang(raw: string | null): Lang {
  return raw === "en" ? "en" : "es";
}

/**
 * Usuario y organización de la demo.
 *
 * El negocio es de ejemplo y lo dice el aviso de cada pantalla. Sin gerente de
 * cuenta: un nombre inventado frente a un prospecto sería una promesa sobre
 * quién lo va a atender.
 */
export function demoIdentity(lang: Lang): { user: PortalUser; org: Organization } {
  return {
    user: {
      id: DEMO_USER_ID,
      email: "demo@yourbizupgraded.com",
      fullName: "Carlos Méndez",
      role: "client",
      locale: lang,
    },
    org: {
      id: "public-demo-org",
      name: "Carlos Plumbing",
      slug: "carlos-plumbing",
      status: "healthy",
      dataMode: "demo",
      accountManager: null,
    },
  };
}

export function isDemoUser(user: Pick<PortalUser, "id">): boolean {
  return user.id === DEMO_USER_ID;
}
