// Extensión .ts explícita para que `node --test` cargue el módulo sin un bundler.
import { HUBSPOT_PORTAL_ID } from "../config/site.ts";

/**
 * Envío del formulario «Biblioteca de guías» (Forms API v3, público).
 *
 * Portal 245810986, centro de datos na2. El host es el mismo endpoint
 * público que ya usa el sitio (`api.hsforms.com`); no hay token ni
 * variable nueva. No pasa por ningún escenario de Make.
 *
 * El formulario en HubSpot hoy solo tiene el campo email. Las tres
 * propiedades de contacto todavía no existen, y HubSpot rechaza el
 * envío entero si llega un campo desconocido. Por eso
 * `HUBSPOT_GUIAS_EXTRA_PROPERTIES_ENABLED` queda en false hasta que
 * existan `guia_solicitada`, `ultima_guia` y `guias_descargadas`.
 */

export const HUBSPOT_GUIAS_FORM_GUID = "72b781ba-7596-425f-8ad9-6af3cacc0572";

/** Suscripción de marketing para el enlace de baja de HubSpot. */
export const HUBSPOT_GUIAS_SUBSCRIPTION_TYPE_ID = 2452919054;

/**
 * Apagar hasta que existan en HubSpot estas propiedades de contacto:
 * - guia_solicitada (desplegable, valor = slug)
 * - ultima_guia (texto de una línea, valor = slug de la más reciente)
 * - guias_descargadas (casillas múltiples, valores separados por `;`)
 */
export const HUBSPOT_GUIAS_EXTRA_PROPERTIES_ENABLED = false;

const SUBMIT_ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_GUIAS_FORM_GUID}`;

const CONTACT_OBJECT_TYPE = "0-1";

export const GUIAS_EMAIL_STORAGE_KEY = "ait.guias.email";
export const GUIAS_SLUGS_STORAGE_KEY = "ait.guias.slugs";
export const GUIAS_CONSENT_STORAGE_KEY = "ait.guias.marketingConsent";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface GuiaField {
  objectTypeId: string;
  name: string;
  value: string;
}

export interface GuiaHubSpotBody {
  fields: GuiaField[];
  context: {
    pageUri: string;
    pageName: string;
    hutk?: string;
  };
  legalConsentOptions: {
    consent: {
      consentToProcess: true;
      text: string;
      communications: Array<{
        value: boolean;
        subscriptionTypeId: number;
        text: string;
      }>;
    };
  };
}

export interface GuiaSubmissionInput {
  email: string;
  slug: string;
  guideName: string;
  marketingConsent: boolean;
  /** Slugs que este navegador ya pidió. El actual se agrega si falta. */
  downloadedSlugs: readonly string[];
  pageUrl: string;
  /** Tiene que incluir el nombre de la guía. Si no, se le añade. */
  pageName: string;
  processingConsentText: string;
  marketingConsentText: string;
  hutk?: string;
}

export interface GuiaBrowserMemory {
  email: string;
  slugs: string[];
  marketingConsent: boolean;
}

interface MemoryStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function isValidGuideEmail(value: string): boolean {
  const email = value.trim();
  return email.length <= 254 && EMAIL_PATTERN.test(email);
}

/** Lista sin duplicados. El slug actual queda al final: es el más reciente. */
export function listWithCurrentGuide(previous: readonly string[], slug: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of previous) {
    const value = item.trim();
    if (!value || value === slug || seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  const current = slug.trim();
  if (current) out.push(current);
  return out;
}

export function formatGuiasDescargadas(slugs: readonly string[]): string {
  return slugs.join(";");
}

/** URL de la página con `?guia=<slug>`, sin ancla. */
export function withGuiaParam(pageUrl: string, slug: string): string {
  const url = new URL(pageUrl, "https://yourbizupgraded.com");
  url.searchParams.set("guia", slug);
  url.hash = "";
  return url.toString();
}

export function guidePageName(pageName: string, guideName: string): string {
  const name = guideName.trim();
  const page = pageName.trim();
  if (!name) return page;
  if (page.includes(name)) return page;
  return page ? `${page} · ${name}` : name;
}

export function buildGuiaHubSpotBody(
  input: GuiaSubmissionInput,
  options: { extraProperties?: boolean } = {},
): GuiaHubSpotBody {
  const email = input.email.trim();
  const slug = input.slug.trim();
  const slugs = listWithCurrentGuide(input.downloadedSlugs, slug);
  const extra = options.extraProperties ?? HUBSPOT_GUIAS_EXTRA_PROPERTIES_ENABLED;

  const fields: GuiaField[] = [
    { objectTypeId: CONTACT_OBJECT_TYPE, name: "email", value: email },
  ];

  if (extra) {
    const downloaded = formatGuiasDescargadas(slugs);
    fields.push(
      { objectTypeId: CONTACT_OBJECT_TYPE, name: "guia_solicitada", value: slug },
      { objectTypeId: CONTACT_OBJECT_TYPE, name: "ultima_guia", value: slug },
      { objectTypeId: CONTACT_OBJECT_TYPE, name: "guias_descargadas", value: downloaded },
    );
  }

  const context: GuiaHubSpotBody["context"] = {
    pageUri: withGuiaParam(input.pageUrl, slug),
    pageName: guidePageName(input.pageName, input.guideName),
  };
  const hutk = input.hutk?.trim();
  if (hutk) context.hutk = hutk;

  return {
    fields,
    context,
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: input.processingConsentText,
        communications: [
          {
            value: input.marketingConsent,
            subscriptionTypeId: HUBSPOT_GUIAS_SUBSCRIPTION_TYPE_ID,
            text: input.marketingConsentText,
          },
        ],
      },
    },
  };
}

function readHutk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match?.[1];
}

export async function submitGuiaDownload(input: GuiaSubmissionInput): Promise<void> {
  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_GUIAS_FORM_GUID) {
    throw new Error("HubSpot not configured");
  }
  if (!isValidGuideEmail(input.email)) {
    throw new Error("Invalid email");
  }

  const body = buildGuiaHubSpotBody({
    ...input,
    hutk: input.hutk ?? readHutk(),
  });

  const response = await fetch(SUBMIT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  });

  if (!response.ok) {
    let detail = "";
    try {
      const json = await response.json();
      detail = json?.message || JSON.stringify(json).slice(0, 200);
    } catch {
      // El PDF se entrega igual; el detalle solo sirve para el registro.
    }
    throw new Error(`HubSpot ${response.status}${detail ? `: ${detail}` : ""}`);
  }
}

/**
 * El fallo de HubSpot no debe impedir la descarga. Esta función nunca rechaza.
 */
export async function submitGuiaDownloadInBackground(input: GuiaSubmissionInput): Promise<void> {
  try {
    await submitGuiaDownload(input);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[guias] HubSpot submission failed:", message);
  }
}

export function readGuiaMemory(storage: Pick<MemoryStorage, "getItem">): GuiaBrowserMemory | null {
  try {
    const email = storage.getItem(GUIAS_EMAIL_STORAGE_KEY)?.trim() ?? "";
    if (!isValidGuideEmail(email)) return null;
    const raw = storage.getItem(GUIAS_SLUGS_STORAGE_KEY);
    let slugs: string[] = [];
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        slugs = parsed
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim())
          .filter((item) => item.length > 0);
      }
    }
    return {
      email,
      slugs,
      marketingConsent: storage.getItem(GUIAS_CONSENT_STORAGE_KEY) === "1",
    };
  } catch {
    return null;
  }
}

export function writeGuiaMemory(storage: Pick<MemoryStorage, "setItem">, memory: GuiaBrowserMemory): void {
  storage.setItem(GUIAS_EMAIL_STORAGE_KEY, memory.email.trim());
  storage.setItem(GUIAS_SLUGS_STORAGE_KEY, JSON.stringify(memory.slugs));
  storage.setItem(GUIAS_CONSENT_STORAGE_KEY, memory.marketingConsent ? "1" : "0");
}

export function clearGuiaMemory(storage: Pick<MemoryStorage, "removeItem">): void {
  storage.removeItem(GUIAS_EMAIL_STORAGE_KEY);
  storage.removeItem(GUIAS_SLUGS_STORAGE_KEY);
  storage.removeItem(GUIAS_CONSENT_STORAGE_KEY);
}

export { SUBMIT_ENDPOINT as HUBSPOT_GUIAS_SUBMIT_URL };
