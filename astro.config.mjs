import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://yourbizupgraded.com",
  output: "hybrid",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    markdoc(),
    keystatic(),
    sitemap({
      // El portal es privado: no entra al sitemap. Hoy tampoco entraría por ser
      // SSR, pero dejarlo explícito evita que un cambio de `prerender` lo cuele.
      filter: (page) =>
        !page.includes("/keystatic") &&
        !page.includes("/en/keystatic") &&
        !page.includes("/portal") &&
        !page.includes("/pulso") &&
        !page.includes("/r/"),
    }),
  ],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Legal pages moved to canonical /privacy-policy and /terms URLs.
  // Old paths 301-redirect so existing links and SEO equity are preserved.
  redirects: {
    "/privacidad": "/privacy-policy",
    "/terminos": "/terms",
    "/en/privacy": "/en/privacy-policy",
    // `/empresas` publicaba "La Memoria Operativa". Se retiró el 20-sep-2026
    // por decisión del CEO: el Manual de Pricing §5 la define como catálogo
    // cerrado y el Perfil de Cliente Ideal §7 dice que su canal es LinkedIn y
    // referidos, nunca la web. Se redirige en vez de borrarla a secas para que
    // quien tenga el enlace guardado llegue a algún lado y no a un error.
    "/empresas": "/",
  },
});
