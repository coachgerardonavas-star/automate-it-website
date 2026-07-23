/**
 * Site configuration for third-party integrations.
 *
 * REPLACE THESE PLACEHOLDERS once the accounts are provisioned:
 *
 *   - GA_ID                          Google Analytics 4 measurement ID
 *   - SEARCH_CONSOLE_VERIFICATION    Google Search Console verification token
 *   - HUBSPOT_PORTAL_ID              HubSpot portal ID
 *   - HUBSPOT_FORM_GUID_*            HubSpot form GUIDs (one per form)
 */

export const GA_ID = "G-PCJWLQ97K6"; // active — propiedad del CEO (reemplaza a la vieja G-82JWGNDTLG, 23-jul-2026)
export const SEARCH_CONSOLE_VERIFICATION =
  "HEhyqCcIvI_0Rvx4GSThqCx9NbfhE7i9Ktu1PjgJQqw"; // active

export const HUBSPOT_PORTAL_ID = "245810986"; // active
export const HUBSPOT_FORM_GUID_CTA = "890d8b21-51f1-4ea3-be82-dff60ca6c055"; // active — home inline form
export const HUBSPOT_FORM_GUID_DIAGNOSTICO = "c3800beb-7430-4f16-bb9e-c1989b9ebf37"; // active — /diagnostico
export const HUBSPOT_FORM_GUID_CHATBOT = "cd8b13bd-f8b9-4876-acc8-69be4df0027c"; // active — chatbot widget

export const BIT_WORKER_URL = "https://bit-chat-3126.coachgerardonavas.workers.dev";

// Replace with the deployed URL of `workers/stripe-checkout` once it's live in Cloudflare.
// While set to the placeholder, the checkout buttons will not POST anywhere.
export const STRIPE_CHECKOUT_WORKER_URL =
  "https://stripe-checkout-automate.coachgerardonavas.workers.dev";

const PLACEHOLDER_STRIPE = "https://stripe-checkout-automate.PLACEHOLDER.workers.dev";

export const isStripeCheckoutEnabled = (): boolean =>
  Boolean(STRIPE_CHECKOUT_WORKER_URL) &&
  STRIPE_CHECKOUT_WORKER_URL !== PLACEHOLDER_STRIPE;

const PLACEHOLDER_GA = "G-XXXXXXXXXX";
const PLACEHOLDER_SC = "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN";

export const isGAEnabled = (): boolean =>
  Boolean(GA_ID) && GA_ID !== PLACEHOLDER_GA;

export const isSearchConsoleEnabled = (): boolean =>
  Boolean(SEARCH_CONSOLE_VERIFICATION) &&
  SEARCH_CONSOLE_VERIFICATION !== PLACEHOLDER_SC;
