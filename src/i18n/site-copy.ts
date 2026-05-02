import { translations, type Lang } from "./translations";

/**
 * Build-time read of the Keystatic singleton output. We use Vite's
 * `import.meta.glob` (eager) instead of `@keystatic/core/reader` so the
 * JSON is inlined at build time and no Node.js runtime APIs leak into
 * the Cloudflare Workers SSR bundle.
 *
 * If `src/content/site/translations.json` doesn't exist yet (CEO hasn't
 * published from /keystatic), the glob returns `{}` → `cms` is null →
 * `getCopy` falls back to the static `translations.ts` baseline.
 */
type CmsCopy = {
  heroEsH1Line1?: string;
  heroEsH1Line2?: string;
  heroEsSubtitle?: string;
  heroEsCtaPrimary?: string;
  heroEnH1Line1?: string;
  heroEnH1Line2?: string;
  heroEnSubtitle?: string;
  heroEnCtaPrimary?: string;
  navCtaEs?: string;
  navCtaEn?: string;
};

const cmsModules = import.meta.glob<{ default: CmsCopy }>(
  "/src/content/site/translations.json",
  { eager: true }
);

const cms: CmsCopy | null =
  (Object.values(cmsModules)[0]?.default as CmsCopy | undefined) ?? null;

export function getCopy(lang: Lang) {
  const fallback = translations[lang];
  if (!cms) return fallback;

  const heroOverrides =
    lang === "es"
      ? {
          h1Line1: cms.heroEsH1Line1 || fallback.hero.h1Line1,
          h1Line2: cms.heroEsH1Line2 || fallback.hero.h1Line2,
          subtitle: cms.heroEsSubtitle || fallback.hero.subtitle,
          ctaPrimary: cms.heroEsCtaPrimary || fallback.hero.ctaPrimary,
        }
      : {
          h1Line1: cms.heroEnH1Line1 || fallback.hero.h1Line1,
          h1Line2: cms.heroEnH1Line2 || fallback.hero.h1Line2,
          subtitle: cms.heroEnSubtitle || fallback.hero.subtitle,
          ctaPrimary: cms.heroEnCtaPrimary || fallback.hero.ctaPrimary,
        };

  const navCta =
    (lang === "es" ? cms.navCtaEs : cms.navCtaEn) || fallback.nav.cta;

  return {
    ...fallback,
    hero: { ...fallback.hero, ...heroOverrides },
    nav: { ...fallback.nav, cta: navCta },
  };
}
