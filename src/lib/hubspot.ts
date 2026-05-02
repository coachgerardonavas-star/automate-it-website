import { HUBSPOT_PORTAL_ID } from "../config/site";

export interface HubSpotField {
  name: string;
  value: string;
  objectTypeId?: string;
}

export interface HubSpotContext {
  pageUri?: string;
  pageName?: string;
  hutk?: string;
}

const ENDPOINT_BASE =
  "https://api.hsforms.com/submissions/v3/integration/submit";

function getHubspotutk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return m?.[1];
}

/**
 * Submits to HubSpot Forms API v3.
 * Throws on network failure or non-2xx response. Caller should wrap in
 * try/catch and surface a friendly error to the user without blocking
 * the UI.
 */
export async function submitToHubSpot(
  formGuid: string,
  fields: HubSpotField[],
  contextOverride: HubSpotContext = {}
): Promise<void> {
  if (!HUBSPOT_PORTAL_ID || !formGuid) {
    throw new Error("HubSpot not configured");
  }

  const url = `${ENDPOINT_BASE}/${HUBSPOT_PORTAL_ID}/${formGuid}`;

  const context: HubSpotContext = {
    pageUri:
      contextOverride.pageUri ??
      (typeof window !== "undefined" ? window.location.href : ""),
    pageName:
      contextOverride.pageName ??
      (typeof document !== "undefined" ? document.title : ""),
    hutk: contextOverride.hutk ?? getHubspotutk(),
  };

  const body = {
    fields: fields.filter((f) => f.value && f.value.length > 0),
    context,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const json = await res.json();
      detail = json?.message || JSON.stringify(json).slice(0, 200);
    } catch {
      // ignore parse error
    }
    throw new Error(
      `HubSpot ${res.status}${detail ? ": " + detail : ""}`
    );
  }
}
