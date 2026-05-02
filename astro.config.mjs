import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
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
  ],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
