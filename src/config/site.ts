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
// BIT (el widget de chat) salió del sitio el 14-ago-2026, reemplazado por el
// botón de WhatsApp — ver `WhatsAppButton.astro`. El 15-ago se retiraron también
// sus constantes y su copy, que ya no usaba nadie.
//
// Si BIT vuelve, esto es lo que hay que devolver acá:
//   HUBSPOT_FORM_GUID_CHATBOT = "cd8b13bd-f8b9-4876-acc8-69be4df0027c"
//   BIT_WORKER_URL            = "https://bit-chat-3126.coachgerardonavas.workers.dev"
//
// El worker `bit-chat-3126` sigue desplegado en Cloudflare aunque ya nadie lo
// llame. Darlo de baja es una decisión aparte: ver el README o correr
// `npx wrangler delete --name bit-chat-3126`.

// Número real de WhatsApp Business (Meta Cloud API) — verificado en vivo vía Graph API el
// 14-ago-2026: display_phone_number "+1 407-404-9495", verified_name "Automate IT".
// OJO: es distinto del (407) 214-5114 que aparece como NAP público en el resto del sitio
// (BaseLayout, quienes-somos, about) — ese es el teléfono de contacto general, no el de
// WhatsApp. No unificarlos sin confirmar con el CEO.
export const WHATSAPP_NUMBER = "14074049495";

// El diagnóstico dejó de postear a la Forms API v3 el 7-ago-2026: esa API
// descarta en silencio todo campo no definido en el formulario, y por eso
// `tipo_de_negocio` y `urgencia` estaban vacíos en todos los contactos del CRM.
// Ahora va por Worker con CRM API, que falla ruidosamente. Ver
// `workers/diagnostico-intake`.
export const DIAGNOSTICO_WORKER_URL =
  "https://diagnostico-intake.coachgerardonavas.workers.dev";

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
