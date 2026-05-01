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

export const GA_ID = "G-82JWGNDTLG"; // active
export const SEARCH_CONSOLE_VERIFICATION =
  "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN"; // TODO

export const HUBSPOT_PORTAL_ID = "245810986"; // active
export const HUBSPOT_FORM_GUID_CTA = ""; // TODO Sprint 6+ — home inline form
export const HUBSPOT_FORM_GUID_DIAGNOSTICO = ""; // TODO Sprint 6+ — /diagnostico
export const HUBSPOT_FORM_GUID_CHATBOT = ""; // TODO Sprint 6+ — chatbot widget

const PLACEHOLDER_GA = "G-XXXXXXXXXX";
const PLACEHOLDER_SC = "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN";

export const isGAEnabled = (): boolean =>
  Boolean(GA_ID) && GA_ID !== PLACEHOLDER_GA;

export const isSearchConsoleEnabled = (): boolean =>
  Boolean(SEARCH_CONSOLE_VERIFICATION) &&
  SEARCH_CONSOLE_VERIFICATION !== PLACEHOLDER_SC;
