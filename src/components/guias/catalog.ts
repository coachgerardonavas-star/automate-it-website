export interface LiveGuide {
  slug: string;
  pdfPath: string;
  downloadName: string;
}

/** Guía 1 de Genius. El PDF es público a propósito. */
export const LIVE_GUIDES: readonly LiveGuide[] = [
  {
    slug: "genius-7-cosas",
    pdfPath: "/guias/guia-genius-7-cosas.pdf",
    downloadName: "guia-genius-7-cosas.pdf",
  },
];

export const SHOW_COMING_SOON = true;
