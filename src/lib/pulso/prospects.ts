export type PulsoProspect = {
  id: string;
  slug: string;
  name: string;
  contactFirstName: string;
  title: string;
  intro: string;
  facts: Array<{ title: string; body: string }>;
  unknowns: string;
  review: string;
};

const prospects: PulsoProspect[] = [
  {
    id: "jet-001",
    slug: "jet-plumbing",
    name: "JET Plumbing Inc.",
    contactFirstName: "José",
    title: "Esto fue lo que me hizo escribirte.",
    intro:
      "Seguí el camino que seguiría una persona que escucha hablar bien de JET Plumbing y decide buscarte en internet. Estos son los puntos que encontré.",
    facts: [
      {
        title: "Casi cuatro décadas de oficio tienen una huella pública mucho menor que tu trayectoria.",
        body:
          "Las fuentes públicas que revisé sitúan tu experiencia en plomería desde 1985. Porch reúne alrededor de 138 reseñas en internet de JET Plumbing. Las que pude revisar hablan muy bien de tu trabajo. Hay clientes que describen a Joe llegando rápido durante una emergencia, regresando para comprobar que el trabajo estuviera bien y respondiendo cuando otras compañías no estaban disponibles.",
      },
      {
        title: "La presencia pública de JET está fragmentada.",
        body:
          "Encontré perfiles de JET Plumbing en varios directorios. Una ruta pública asociada al negocio de Apopka atribuye jetplumbingfl.com a JET. Hoy ese dominio lleva a una empresa de plomería que opera en South Florida. Alguien que siga esa ruta pública puede terminar viendo otro negocio.",
      },
    ],
    unknowns:
      "No sé cuántas personas llegan por esa ruta ni si esto ha causado una pérdida real. Tampoco conozco cómo llegan hoy tus clientes, cómo gestionas las llamadas, qué sistemas usas o cuánto negocio viene por recomendación.",
    review:
      "Revisaría cómo aparece JET cuando un cliente te busca, qué perfiles controlas y si las llamadas o mensajes reciben seguimiento. Con esos datos podríamos medir qué puntos merecen atención y cuáles ya funcionan bien.",
  },
];

export const pulsoProspects = prospects;

export function getPulsoProspect(value: string) {
  return prospects.find((prospect) => prospect.slug === value || prospect.id === value);
}
