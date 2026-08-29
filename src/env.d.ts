/// <reference path="../.astro/types.d.ts" />

declare module "cloudflare:workers" {
  export const env: Record<string, unknown>;
}

interface Window {
  /**
   * Envío de eventos de conversión a GA4. La define el bloque inline de
   * `src/layouts/BaseLayout.astro`, que solo se emite cuando `isGAEnabled()`
   * es true — por eso es opcional y siempre se llama con `window.trackEvent?.()`.
   *
   * Deduplica por `name` dentro de la misma carga de página y agrega
   * `page_lang` automáticamente.
   */
  trackEvent?: (name: string, params?: Record<string, unknown>) => void;
}
