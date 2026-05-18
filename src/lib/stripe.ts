/**
 * Stripe Price ID catalog — SANDBOX (sk_test_*).
 *
 * Cuando se active Live mode, reemplazar todos los Price IDs por los de
 * producción y subir el secret de Live al Worker. No mezclar IDs.
 */

// ─── Starter plan ──────────────────────────────────────────────────────────
export const STARTER_BASE_MONTHLY = "price_1TYA6kAgJkIop9B2yz36URbT";
export const STARTER_BASE_SETUP = "price_1TYAB1AgJkIop9B2yr6pPEwq";

export const STARTER_WHATSAPP_MONTHLY = "price_1TYAkEAgJkIop9B2KLQ1dX7b";
export const STARTER_WHATSAPP_SETUP = "price_1TYAkEAgJkIop9B2JJ9xJqNo";

export const STARTER_VOZ_MONTHLY = "price_1TYAzMAgJkIop9B2eYksi6Kg";
export const STARTER_VOZ_SETUP = "price_1TYAzMAgJkIop9B2jx3RMh96";

export const STARTER_WHATSAPP_VOZ_MONTHLY = "price_1TYB4cAgJkIop9B2js7A7VAG";
export const STARTER_WHATSAPP_VOZ_SETUP = "price_1TYB4cAgJkIop9B2Z8dn7Zrc";

export const STARTER_WHATSAPP_CRM_MONTHLY = "price_1TYD4NAHnOzMvXBgHU9AWfOL";
export const STARTER_WHATSAPP_CRM_SETUP = "price_1TYD4NAHnOzMvXBgbX6fAJWD";

export const STARTER_VOZ_CRM_MONTHLY = "price_1TYB8GAgJkIop9B2YRUTUYnw";
export const STARTER_VOZ_CRM_SETUP = "price_1TYB8GAgJkIop9B2naxq1r54";

// ─── Professional plan (HIPAA) ─────────────────────────────────────────────
export const PROFESSIONAL_BASE_MONTHLY = "price_1TYAQcAgJkIop9B23BiXwaPG";
export const PROFESSIONAL_BASE_SETUP = "price_1TYAVtAgJkIop9B2W34jHmYz";

export const PROFESSIONAL_VOZ_MONTHLY = "price_1TYBB6AgJkIop9B2HzM8ODnE";
export const PROFESSIONAL_VOZ_SETUP = "price_1TYBB6AgJkIop9B2vJGTEmv6";

export const PROFESSIONAL_WHATSAPP_MONTHLY = "price_1TYBDWAgJkIop9B2OoBA4hfR";
export const PROFESSIONAL_WHATSAPP_SETUP = "price_1TYBDWAgJkIop9B2VbfijsQm";

export const PROFESSIONAL_VOZ_WHATSAPP_MONTHLY = "price_1TYBHUAgJkIop9B2cGqQha8d";
export const PROFESSIONAL_VOZ_WHATSAPP_SETUP = "price_1TYBHUAgJkIop9B2j17UAMEp";

export const PROFESSIONAL_VOZ_CRM_MONTHLY = "price_1TYBKbAgJkIop9B2DYP18Sw5";
export const PROFESSIONAL_VOZ_CRM_SETUP = "price_1TYBKbAgJkIop9B2rpei03M6";

// ─── Catalog (typed, indexable by plan slug) ───────────────────────────────
export type StripePlanKey =
  | "STARTER_BASE"
  | "STARTER_WHATSAPP"
  | "STARTER_VOZ"
  | "STARTER_WHATSAPP_VOZ"
  | "STARTER_WHATSAPP_CRM"
  | "STARTER_VOZ_CRM"
  | "PROFESSIONAL_BASE"
  | "PROFESSIONAL_VOZ"
  | "PROFESSIONAL_WHATSAPP"
  | "PROFESSIONAL_VOZ_WHATSAPP"
  | "PROFESSIONAL_VOZ_CRM";

export interface StripePlan {
  monthly: string;
  setup: string;
  displayName: string;
}

export const STRIPE_PRICES: Record<StripePlanKey, StripePlan> = {
  STARTER_BASE: {
    monthly: STARTER_BASE_MONTHLY,
    setup: STARTER_BASE_SETUP,
    displayName: "Starter",
  },
  STARTER_WHATSAPP: {
    monthly: STARTER_WHATSAPP_MONTHLY,
    setup: STARTER_WHATSAPP_SETUP,
    displayName: "Starter + WhatsApp",
  },
  STARTER_VOZ: {
    monthly: STARTER_VOZ_MONTHLY,
    setup: STARTER_VOZ_SETUP,
    displayName: "Starter + Voz",
  },
  STARTER_WHATSAPP_VOZ: {
    monthly: STARTER_WHATSAPP_VOZ_MONTHLY,
    setup: STARTER_WHATSAPP_VOZ_SETUP,
    displayName: "Starter + WhatsApp + Voz",
  },
  STARTER_WHATSAPP_CRM: {
    monthly: STARTER_WHATSAPP_CRM_MONTHLY,
    setup: STARTER_WHATSAPP_CRM_SETUP,
    displayName: "Starter + WhatsApp + CRM",
  },
  STARTER_VOZ_CRM: {
    monthly: STARTER_VOZ_CRM_MONTHLY,
    setup: STARTER_VOZ_CRM_SETUP,
    displayName: "Starter + Voz + CRM",
  },
  PROFESSIONAL_BASE: {
    monthly: PROFESSIONAL_BASE_MONTHLY,
    setup: PROFESSIONAL_BASE_SETUP,
    displayName: "Professional",
  },
  PROFESSIONAL_VOZ: {
    monthly: PROFESSIONAL_VOZ_MONTHLY,
    setup: PROFESSIONAL_VOZ_SETUP,
    displayName: "Professional + Voz",
  },
  PROFESSIONAL_WHATSAPP: {
    monthly: PROFESSIONAL_WHATSAPP_MONTHLY,
    setup: PROFESSIONAL_WHATSAPP_SETUP,
    displayName: "Professional + WhatsApp",
  },
  PROFESSIONAL_VOZ_WHATSAPP: {
    monthly: PROFESSIONAL_VOZ_WHATSAPP_MONTHLY,
    setup: PROFESSIONAL_VOZ_WHATSAPP_SETUP,
    displayName: "Professional + Voz + WhatsApp",
  },
  PROFESSIONAL_VOZ_CRM: {
    monthly: PROFESSIONAL_VOZ_CRM_MONTHLY,
    setup: PROFESSIONAL_VOZ_CRM_SETUP,
    displayName: "Professional + Voz + CRM",
  },
};

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
