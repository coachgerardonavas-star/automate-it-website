/// <reference path="../.astro/types.d.ts" />

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

declare namespace App {
  interface Locals {
    /**
     * true cuando el request del portal se sirve como demo pública (sin
     * sesión real). Lo marca `requirePortal` y lo leen el layout y el aviso
     * de datos de ejemplo para hablarle a un prospecto, no a un cliente.
     */
    portalDemo?: boolean;
  }
}
