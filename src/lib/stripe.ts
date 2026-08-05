/**
 * Stripe Price ID catalog — LIVE MODE (acct_1TU6MKAHnOzMvXBg).
 *
 * ▶ 5-ago-2026 — Reescrito completo. Dos razones:
 *
 *   1. El catálogo anterior tenía Price IDs de SANDBOX (prefijo de cuenta
 *      `AgJkIop9B2`) en 10 de 11 entradas, con una entrada mezclada con IDs
 *      de producción. El botón de checkout del sitio apuntaba a precios de
 *      prueba: nunca pudo cobrar de verdad.
 *   2. El catálogo Starter/Professional + módulos quedó retirado. Los 11
 *      productos correspondientes están archivados en Stripe desde el
 *      5-ago-2026.
 *
 * Todos los IDs de abajo son de LIVE MODE, verificados contra la API el
 * 5-ago-2026. No mezclar con IDs de test.
 */

// ─── Asistente — Hace por ti ───────────────────────────────────────────────
export const ASISTENTE_MONTHLY = "price_1U11tWAHnOzMvXBgj2KMcniO"; // $200/mes
export const ASISTENTE_SETUP = "price_1U11tZAHnOzMvXBg22ibE15t"; // $1,000 incorporación
export const ASISTENTE_ONE_TIME = "price_1U11teAHnOzMvXBgHdHJvXrM"; // $2,500 sin mensualidad

// ─── Estratega — Piensa contigo ────────────────────────────────────────────
export const ESTRATEGA_MONTHLY = "price_1U11tnAHnOzMvXBgFUqYGhcK"; // $400/mes
export const ESTRATEGA_SETUP = "price_1U11tsAHnOzMvXBgrqGCI19g"; // $2,000 incorporación
export const ESTRATEGA_ONE_TIME = "price_1U11tvAHnOzMvXBgtTAow2HG"; // $5,000 sin mensualidad

// ─── Manager — Coordina para ti ────────────────────────────────────────────
export const MANAGER_MONTHLY = "price_1U11u7AHnOzMvXBgR7w4LEEE"; // $600/mes
export const MANAGER_SETUP = "price_1U11uBAHnOzMvXBgaFJanNy9"; // $3,000 incorporación
export const MANAGER_ONE_TIME = "price_1U11uFAHnOzMvXBglmxFxwiH"; // $7,500 sin mensualidad

// ─── Catalog (typed, indexable by plan slug) ───────────────────────────────
export type StripePlanKey = "ASISTENTE" | "ESTRATEGA" | "MANAGER";

export interface StripePlan {
  /** Precio recurrente mensual. */
  monthly: string;
  /** Pago único de incorporación (instalación). */
  setup: string;
  /** Compra única sin mensualidad. */
  oneTime: string;
  displayName: string;
  /** Producto en Stripe, para trazabilidad. */
  productId: string;
}

export const STRIPE_PRICES: Record<StripePlanKey, StripePlan> = {
  ASISTENTE: {
    monthly: ASISTENTE_MONTHLY,
    setup: ASISTENTE_SETUP,
    oneTime: ASISTENTE_ONE_TIME,
    displayName: "Asistente",
    productId: "prod_V141bRCz1fqAlV",
  },
  ESTRATEGA: {
    monthly: ESTRATEGA_MONTHLY,
    setup: ESTRATEGA_SETUP,
    oneTime: ESTRATEGA_ONE_TIME,
    displayName: "Estratega",
    productId: "prod_V141nhQpnh3E6o",
  },
  MANAGER: {
    monthly: MANAGER_MONTHLY,
    setup: MANAGER_SETUP,
    oneTime: MANAGER_ONE_TIME,
    displayName: "Manager",
    productId: "prod_V141crmzjbjMsM",
  },
};

/**
 * ⚠️ El sitio ya NO vende por autoservicio.
 *
 * El modelo comercial vigente desde el 5-ago-2026 es: diagnóstico → SOW
 * firmado → 50% al firmar → instalación → 50% al terminar → suscripción con
 * tarjeta en archivo a los 30 días, con compromiso mínimo de 3 meses.
 *
 * Nada de eso cabe en un botón de "Empezar ahora": un checkout de autoservicio
 * deja al cliente suscribirse sin SOW y cancelar al mes siguiente desde su
 * portal, y el compromiso de 3 meses queda sin forma de ejecutarse.
 *
 * Los tipos de abajo se conservan porque el worker `stripe-checkout` sigue
 * desplegado, pero el sitio público ya no dispara checkout: el CTA de la
 * sección de planes lleva al diagnóstico.
 */
export interface StartCheckoutPayload {
  priceIdMonthly: string;
  priceIdSetup: string;
  planName: string;
  lang?: "es" | "en";
}

export interface StartCheckoutResponse {
  url?: string;
  error?: string;
}
