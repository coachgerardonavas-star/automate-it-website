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
      filter: (page) =>
        !page.includes("/keystatic") && !page.includes("/en/keystatic"),
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
  },
});
