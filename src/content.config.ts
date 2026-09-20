import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    /**
     * Titular corto solo para el resultado de búsqueda. El buscador corta
     * alrededor de los 60 caracteres, y varios titulares del blog llegan a
     * 100 o más: se publicaban mutilados a media frase. Este campo deja el
     * titular del artículo intacto en la página y le da al buscador una
     * versión que cabe entera. Si no se pone, se usa `title`.
     */
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(["es", "en"]),
    author: z.string().default("Gerardo · Automate IT"),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
