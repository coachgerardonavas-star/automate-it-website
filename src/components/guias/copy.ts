import type { Lang } from "../../i18n/translations";

export interface GuideCopy {
  kicker: string;
  title: string;
  body: string;
}

export interface GuiasCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1Lead: string;
  h1Emphasis: string;
  lead: string;
  libraryHeading: string;
  libraryLabel: string;
  emailLabel: string;
  emailError: string;
  consent: string;
  submit: string;
  processingBefore: string;
  privacyLink: string;
  processingConsent: string;
  privacyHref: string;
  successTitle: string;
  downloadPdf: string;
  download: string;
  notYou: string;
  soonKicker: string;
  soonTitle: string;
  soonBody: string;
  guides: Record<string, GuideCopy>;
}

const es: GuiasCopy = {
  metaTitle: "Guías gratis para que tus clientes vuelvan | Automate IT",
  metaDescription:
    "Guías de Genius con acciones cortas y textos listos para copiar. La primera: 7 cosas para que tus clientes vuelvan más seguido.",
  eyebrow: "Guías de Genius",
  h1Lead: "Que tus clientes",
  h1Emphasis: "vuelvan más seguido",
  lead: "7 acciones de 10 minutos, con textos listos para copiar. Con tu correo entras a todas.",
  libraryHeading: "Las guías",
  libraryLabel: "Biblioteca de guías",
  emailLabel: "Tu correo",
  emailError: "Escribe un correo válido.",
  consent:
    "Sí, quiero recibir guías y consejos de Automate IT por correo. Puedo darme de baja cuando quiera.",
  submit: "Descargar",
  processingBefore: "Al descargar aceptas nuestra ",
  privacyLink: "Política de privacidad",
  processingConsent: "Al descargar aceptas nuestra Política de privacidad",
  privacyHref: "https://yourbizupgraded.com/privacy-policy/",
  successTitle: "¡Listo! Aquí está tu guía.",
  downloadPdf: "Descargar PDF",
  download: "Descargar",
  notYou: "¿No eres tú?",
  soonKicker: "Próximamente",
  soonTitle: "Próximamente",
  soonBody: "La siguiente guía de Genius va aquí.",
  guides: {
    "genius-7-cosas": {
      kicker: "Guía 1 · Gratis",
      title: "7 cosas para que tus clientes vuelvan más seguido",
      body: "7 acciones. 10 minutos cada una. Textos listos para copiar.",
    },
  },
};

const en: GuiasCopy = {
  metaTitle: "Free guides so your customers come back | Automate IT",
  metaDescription:
    "Genius guides with short actions and text ready to copy. The first: 7 things so your customers come back more often.",
  eyebrow: "Genius guides",
  h1Lead: "Get your customers to",
  h1Emphasis: "come back more often",
  lead: "7 actions of 10 minutes, with text ready to copy. One email opens every guide.",
  libraryHeading: "The guides",
  libraryLabel: "Guide library",
  emailLabel: "Your email",
  emailError: "Enter a valid email.",
  consent:
    "Yes, I want to receive guides and tips from Automate IT by email. I can unsubscribe whenever I want.",
  submit: "Download",
  processingBefore: "By downloading you accept our ",
  privacyLink: "Privacy Policy",
  processingConsent: "By downloading you accept our Privacy Policy",
  privacyHref: "https://yourbizupgraded.com/en/privacy-policy/",
  successTitle: "Done! Here's your guide.",
  downloadPdf: "Download PDF",
  download: "Download",
  notYou: "Not you?",
  soonKicker: "Coming soon",
  soonTitle: "Coming soon",
  soonBody: "The next Genius guide goes here.",
  guides: {
    "genius-7-cosas": {
      kicker: "Guide 1 · Free",
      title: "7 things so your customers come back more often",
      body: "7 actions. 10 minutes each. Text ready to copy. The PDF is in Spanish.",
    },
  },
};

export function getGuiasCopy(lang: Lang): GuiasCopy {
  return lang === "en" ? en : es;
}
