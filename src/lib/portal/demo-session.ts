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

/**
 * Lo que el prospecto escribió en `/demo`. Vive solo en la cookie de su
 * navegador: el servidor no lo guarda en ningún otro lado.
 */
export interface DemoProfile {
  lang: Lang;
  name: string;
  business: string;
}

const NAME_MAX = 40;
const BUSINESS_MAX = 60;

/**
 * Limpia un texto que viene de un formulario público: sin caracteres de
 * control, espacios colapsados y largo acotado. El escape HTML lo hace Astro
 * al pintar; esto evita que un texto enorme o invisible rompa el diseño.
 */
export function cleanText(raw: unknown, max: number): string {
  const clean = String(raw ?? "")
    .replace(/[\p{C}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  // Por caracteres, no por unidades UTF-16: así un emoji no queda partido.
  return Array.from(clean).slice(0, max).join("").trim();
}

export function toProfile(raw: { lang?: unknown; name?: unknown; business?: unknown }): DemoProfile {
  return {
    lang: parseLang(typeof raw.lang === "string" ? raw.lang : null),
    name: cleanText(raw.name, NAME_MAX),
    business: cleanText(raw.business, BUSINESS_MAX),
  };
}

export function setDemoCookie(cookies: AstroCookies, profile: DemoProfile) {
  cookies.set(DEMO_COOKIE, JSON.stringify(profile), {
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

/**
 * Perfil de la demo, o null si este navegador no la abrió.
 *
 * Acepta también el formato anterior de la cookie (solo "es"/"en"), para que
 * una demo abierta antes de este cambio no se rompa.
 */
export function readDemo(cookies: AstroCookies): DemoProfile | null {
  const value = cookies.get(DEMO_COOKIE)?.value;
  if (!value) return null;
  if (value === "es" || value === "en") return { lang: value, name: "", business: "" };
  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === "object") return toProfile(parsed);
  } catch {
    // Cookie ilegible: se trata como si no hubiera demo abierta.
  }
  return null;
}

/** Idioma de la demo, o null si este navegador no la abrió. */
export function readDemoLang(cookies: AstroCookies): Lang | null {
  return readDemo(cookies)?.lang ?? null;
}

export function parseLang(raw: string | null): Lang {
  return raw === "en" ? "en" : "es";
}

/**
 * Usuario y organización de la demo, con el nombre y el negocio que escribió
 * el prospecto. Si llegó sin escribirlos (un enlace viejo, o entró directo a
 * `/demo/entrar`), se usa el negocio de ejemplo de siempre.
 *
 * Sin gerente de cuenta: un nombre inventado frente a un prospecto sería una
 * promesa sobre quién lo va a atender.
 */
export function demoIdentity(profile: DemoProfile): { user: PortalUser; org: Organization } {
  return {
    user: {
      id: DEMO_USER_ID,
      email: "demo@yourbizupgraded.com",
      fullName: profile.name || "Carlos Méndez",
      role: "client",
      locale: profile.lang,
    },
    org: {
      id: "public-demo-org",
      name: profile.business || "Carlos Plumbing",
      slug: "demo",
      status: "healthy",
      dataMode: "demo",
      accountManager: null,
    },
  };
}

export function isDemoUser(user: Pick<PortalUser, "id">): boolean {
  return user.id === DEMO_USER_ID;
}
