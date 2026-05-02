import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "coachgerardonavas-star/automate-it-website",
    branch: "main",
  },

  ui: {
    brand: { name: "Automate IT" },
    navigation: {
      Contenido: ["blog", "translations"],
    },
  },

  collections: {
    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/blog/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: { label: "Título" },
          slug: {
            label: "Slug (URL)",
            description:
              "Usado en la URL del post. Solo letras minúsculas, números y guiones.",
          },
        }),
        description: fields.text({
          label: "Descripción",
          description:
            "Aparece en el listado del blog y como meta description (SEO).",
          multiline: true,
          validation: { length: { min: 30, max: 200 } },
        }),
        pubDate: fields.date({
          label: "Fecha de publicación",
          defaultValue: { kind: "today" },
        }),
        lang: fields.select({
          label: "Idioma",
          options: [
            { label: "Español", value: "es" },
            { label: "English", value: "en" },
          ],
          defaultValue: "es",
        }),
        author: fields.text({
          label: "Autor",
          defaultValue: "Gerardo · Automate IT",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({
          label: "Borrador (no publicar)",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Contenido" }),
      },
    }),
  },

  singletons: {
    translations: singleton({
      label: "Textos del sitio",
      path: "src/content/site/translations",
      format: { data: "json" },
      schema: {
        heroEsH1Line1: fields.text({
          label: "Hero ES · H1 línea 1",
          defaultValue: "Escala sin contratar.",
        }),
        heroEsH1Line2: fields.text({
          label: "Hero ES · H1 línea 2",
          defaultValue: "Automatiza sin código.",
        }),
        heroEsSubtitle: fields.text({
          label: "Hero ES · Subtítulo",
          multiline: true,
          defaultValue:
            "Equipos de IA especializados ejecutan tareas repetitivas, contestan llamadas y dan seguimiento a leads las 24 horas. Tú recuperas las horas que tu negocio te robaba.",
        }),
        heroEsCtaPrimary: fields.text({
          label: "Hero ES · CTA primario",
          defaultValue: "Diagnóstico gratuito de 30 min",
        }),

        heroEnH1Line1: fields.text({
          label: "Hero EN · H1 line 1",
          defaultValue: "Scale without hiring.",
        }),
        heroEnH1Line2: fields.text({
          label: "Hero EN · H1 line 2",
          defaultValue: "Automate without code.",
        }),
        heroEnSubtitle: fields.text({
          label: "Hero EN · Subtitle",
          multiline: true,
          defaultValue:
            "Specialized AI agents handle repetitive tasks, answer calls, and follow up with leads 24/7. You reclaim the hours your business was stealing from you.",
        }),
        heroEnCtaPrimary: fields.text({
          label: "Hero EN · Primary CTA",
          defaultValue: "Free 30-minute diagnostic",
        }),

        navCtaEs: fields.text({
          label: "Nav · CTA ES",
          defaultValue: "Diagnóstico gratuito",
        }),
        navCtaEn: fields.text({
          label: "Nav · CTA EN",
          defaultValue: "Free diagnostic",
        }),
      },
    }),
  },
});
