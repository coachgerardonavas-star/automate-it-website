import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import {
  HUBSPOT_GUIAS_EXTRA_PROPERTIES_ENABLED,
  HUBSPOT_GUIAS_SUBMIT_URL,
  HUBSPOT_GUIAS_SUBSCRIPTION_TYPE_ID,
  buildGuiaHubSpotBody,
  clearGuiaMemory,
  formatGuiasDescargadas,
  guidePageName,
  isValidGuideEmail,
  listWithCurrentGuide,
  readGuiaMemory,
  submitGuiaDownload,
  submitGuiaDownloadInBackground,
  withGuiaParam,
  writeGuiaMemory,
  type GuiaSubmissionInput,
} from "./hubspot-guias.ts";

const CONSENT =
  "Sí, quiero recibir guías y consejos de Automate IT por correo. Puedo darme de baja cuando quiera.";
const PROCESSING = "Al descargar aceptas nuestra Política de privacidad";
const GUIDE = "7 cosas para que tus clientes vuelvan más seguido";

function sample(overrides: Partial<GuiaSubmissionInput> = {}): GuiaSubmissionInput {
  return {
    email: "ana@ejemplo.com",
    slug: "genius-7-cosas",
    guideName: GUIDE,
    marketingConsent: false,
    downloadedSlugs: ["otra-guia"],
    pageUrl: "https://yourbizupgraded.com/guias/",
    pageName: "Biblioteca de guías",
    processingConsentText: PROCESSING,
    marketingConsentText: CONSENT,
    ...overrides,
  };
}

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("guide library HubSpot payload", () => {
  it("keeps the unpublished contact properties off", () => {
    assert.equal(HUBSPOT_GUIAS_EXTRA_PROPERTIES_ENABLED, false);
    const body = buildGuiaHubSpotBody(sample());
    assert.deepEqual(
      body.fields.map((field) => field.name),
      ["email"],
    );
    assert.equal(body.fields[0]?.value, "ana@ejemplo.com");
  });

  it("sends the three properties only when the flag is on", () => {
    const body = buildGuiaHubSpotBody(sample(), { extraProperties: true });
    assert.deepEqual(
      body.fields.map((field) => field.name),
      ["email", "guia_solicitada", "ultima_guia", "guias_descargadas"],
    );
    assert.equal(body.fields.find((field) => field.name === "guia_solicitada")?.value, "genius-7-cosas");
    assert.equal(body.fields.find((field) => field.name === "ultima_guia")?.value, "genius-7-cosas");
    assert.equal(
      body.fields.find((field) => field.name === "guias_descargadas")?.value,
      "otra-guia;genius-7-cosas",
    );
  });

  it("sends the full semicolon list without duplicating the current guide", () => {
    const slugs = listWithCurrentGuide(["genius-7-cosas", "otra-guia", "genius-7-cosas"], "genius-7-cosas");
    assert.deepEqual(slugs, ["otra-guia", "genius-7-cosas"]);
    assert.equal(formatGuiasDescargadas(slugs), "otra-guia;genius-7-cosas");
  });

  it("records processing consent and the marketing checkbox exactly", () => {
    const declined = buildGuiaHubSpotBody(sample({ marketingConsent: false }));
    assert.equal(declined.legalConsentOptions.consent.consentToProcess, true);
    assert.equal(declined.legalConsentOptions.consent.text, PROCESSING);
    assert.deepEqual(declined.legalConsentOptions.consent.communications, [
      {
        value: false,
        subscriptionTypeId: HUBSPOT_GUIAS_SUBSCRIPTION_TYPE_ID,
        text: CONSENT,
      },
    ]);

    const accepted = buildGuiaHubSpotBody(sample({ marketingConsent: true }));
    assert.equal(accepted.legalConsentOptions.consent.communications[0]?.value, true);
    assert.equal(HUBSPOT_GUIAS_SUBSCRIPTION_TYPE_ID, 2452919054);
  });

  it("puts the guide slug on the page URL and the guide name in pageName", () => {
    const body = buildGuiaHubSpotBody(sample());
    assert.equal(body.context.pageUri, "https://yourbizupgraded.com/guias/?guia=genius-7-cosas");
    assert.equal(body.context.pageName, `Biblioteca de guías · ${GUIDE}`);
    assert.equal(guidePageName(`Biblioteca de guías · ${GUIDE}`, GUIDE), `Biblioteca de guías · ${GUIDE}`);
    assert.equal(
      withGuiaParam("https://yourbizupgraded.com/en/guides/?lang=en#form", "genius-7-cosas"),
      "https://yourbizupgraded.com/en/guides/?lang=en&guia=genius-7-cosas",
    );
  });
});

describe("guide library HubSpot submit", () => {
  it("posts to the public Forms API and does not call the network in this test", async () => {
    const calls: Array<{ url: string; body: unknown }> = [];
    globalThis.fetch = async (input, init) => {
      calls.push({
        url: String(input),
        body: JSON.parse(String(init?.body)),
      });
      return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
    };

    await submitGuiaDownload(sample());

    assert.equal(calls.length, 1);
    assert.equal(calls[0]?.url, HUBSPOT_GUIAS_SUBMIT_URL);
    assert.equal(calls[0]?.url.includes("api.hsforms.com/submissions/v3/integration/submit/245810986/72b781ba-7596-425f-8ad9-6af3cacc0572"), true);
    assert.equal(JSON.stringify(calls[0]?.body).includes("make.com"), false);
    const body = calls[0]?.body as { fields: Array<{ name: string }> };
    assert.deepEqual(
      body.fields.map((field) => field.name),
      ["email"],
    );
  });

  it("still resolves when HubSpot rejects or the network fails", async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ message: "Property does not exist" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    await assert.rejects(submitGuiaDownload(sample()));
    await assert.doesNotReject(submitGuiaDownloadInBackground(sample()));

    globalThis.fetch = async () => {
      throw new Error("offline");
    };
    await assert.doesNotReject(submitGuiaDownloadInBackground(sample()));
  });
});

describe("guide email memory", () => {
  it("remembers and forgets the email on this browser", () => {
    const storage = memoryStorage();
    assert.equal(readGuiaMemory(storage), null);
    writeGuiaMemory(storage, {
      email: "ana@ejemplo.com",
      slugs: ["genius-7-cosas"],
      marketingConsent: false,
    });
    assert.deepEqual(readGuiaMemory(storage), {
      email: "ana@ejemplo.com",
      slugs: ["genius-7-cosas"],
      marketingConsent: false,
    });
    clearGuiaMemory(storage);
    assert.equal(readGuiaMemory(storage), null);
  });

  it("ignores a broken slug list and an invalid email", () => {
    const storage = memoryStorage({
      "ait.guias.email": "no-es-correo",
      "ait.guias.slugs": "{",
      "ait.guias.marketingConsent": "1",
    });
    assert.equal(readGuiaMemory(storage), null);
    assert.equal(isValidGuideEmail("ana@ejemplo.com"), true);
    assert.equal(isValidGuideEmail("ana"), false);
  });
});

function memoryStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem(key: string) {
      return data.has(key) ? data.get(key)! : null;
    },
    setItem(key: string, value: string) {
      data.set(key, value);
    },
    removeItem(key: string) {
      data.delete(key);
    },
  };
}
