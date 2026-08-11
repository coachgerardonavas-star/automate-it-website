/**
 * Configuración del Client Portal.
 *
 * El portal es una capa nueva sobre el sitio público: no comparte layout, no
 * comparte navegación y no debe indexarse. Las constantes que definen ese
 * límite viven acá para que no se repitan por las rutas.
 */

/** Prefijo de todas las rutas del portal. */
export const PORTAL_BASE = "/portal";

/** Rutas que no exigen sesión. Todo lo demás bajo PORTAL_BASE sí la exige. */
export const PUBLIC_PORTAL_ROUTES = [`${PORTAL_BASE}/login`];

/**
 * Secciones de la barra lateral.
 *
 * `adminOnly` marca lo que solo ve Automate IT. `v1` distingue lo que ya tiene
 * pantalla real de lo que todavía es un estado vacío honesto: el handoff (§4)
 * pide que las áreas existan sin que todas tengan backend, pero una sección que
 * miente sobre estar lista es peor que una que dice "todavía no hay datos".
 */
export interface NavItem {
  key: string;
  href: string;
  icon: string;
  adminOnly?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { key: "overview", href: PORTAL_BASE, icon: "house" },
  { key: "leads", href: `${PORTAL_BASE}/leads`, icon: "user-round-search" },
  { key: "conversations", href: `${PORTAL_BASE}/conversations`, icon: "message-square" },
  { key: "appointments", href: `${PORTAL_BASE}/appointments`, icon: "calendar" },
  { key: "customers", href: `${PORTAL_BASE}/customers`, icon: "users-round" },
  { key: "automations", href: `${PORTAL_BASE}/automations`, icon: "workflow" },
  { key: "activity", href: `${PORTAL_BASE}/activity`, icon: "activity" },
  { key: "reports", href: `${PORTAL_BASE}/reports`, icon: "chart-column" },
  { key: "insights", href: `${PORTAL_BASE}/insights`, icon: "lightbulb" },
  { key: "files", href: `${PORTAL_BASE}/files`, icon: "folder" },
  { key: "settings", href: `${PORTAL_BASE}/settings`, icon: "settings" },
];

export const ADMIN_NAV_ITEM: NavItem = {
  key: "admin",
  href: `${PORTAL_BASE}/admin`,
  icon: "shield-check",
  adminOnly: true,
};

/** Rangos de fecha del selector. `month` es el mes calendario en curso. */
export const RANGE_KEYS = ["today", "7d", "30d", "month"] as const;

export function isValidRange(value: string | null): value is (typeof RANGE_KEYS)[number] {
  return value !== null && (RANGE_KEYS as readonly string[]).includes(value);
}
