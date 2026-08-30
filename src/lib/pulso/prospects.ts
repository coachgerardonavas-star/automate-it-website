export type PulsoProspect = {
  id: string; slug: string; name: string; contactFirstName: string; title: string; intro: string;
  facts: Array<{ title: string; body: string; source?: { label: string; url: string } }>;
  unknowns: string; review: string; closing: string;
};

const prospects: PulsoProspect[] = [
  { id: "jet-001", slug: "jet-plumbing", name: "JET Plumbing Inc.", contactFirstName: "José", title: "esto fue lo que me hizo escribirte.",
    intro: "Seguí el camino que seguiría una persona que escucha hablar bien de JET Plumbing y decide buscarte en internet. Estos son los puntos que encontré.",
    facts: [
      { title: "Casi cuatro décadas de oficio tienen una huella pública mucho menor que tu trayectoria.", body: "Las fuentes públicas que revisé sitúan tu experiencia en plomería desde 1985. Porch reúne alrededor de 138 reseñas en internet de JET Plumbing. Las que pude revisar hablan muy bien de tu trabajo." },
      { title: "La presencia pública de JET está fragmentada.", body: "Encontré perfiles de JET Plumbing en varios directorios. Una ruta pública asociada al negocio de Apopka atribuye jetplumbingfl.com a JET. Hoy ese dominio lleva a una empresa de plomería que opera en South Florida." },
    ],
    unknowns: "Desconozco cuántas personas llegan por esa ruta y si esto ha causado una pérdida real. También desconozco cómo llegan hoy tus clientes, cómo gestionas las llamadas y cuánto negocio viene por recomendación.",
    review: "Revisaría cómo aparece JET cuando un cliente te busca, qué perfiles controlas y si las llamadas o mensajes reciben seguimiento. Con esos datos podemos medir qué puntos merecen atención y cuáles ya funcionan bien.",
    closing: "Hay casi 40 años de trabajo detrás del nombre JET Plumbing. Si quieres revisar estos puntos conmigo, llámame." },
  { id: "home-ac-002", slug: "home-ac", name: "HOME AC INC", contactFirstName: "Euro", title: "esto es lo que vi en HOME AC.",
    intro: "Revisé el camino público que puede seguir una persona que busca servicio de aire acondicionado. Encontré dos datos que vale la pena medir.",
    facts: [
      { title: "La misma página publica dos horarios distintos.", body: "En una sección dice lunes a viernes de 8:00 a. m. a 5:00 p. m. y fin de semana cerrado. Más abajo dice lunes a viernes de 8:00 a. m. a 8:00 p. m., sábado de 8:00 a. m. a 5:00 p. m. y domingo de 8:00 a. m. a 12:00 p. m.", source: { label: "Ver la página About de HOME AC", url: "https://homeacinc.com/about/" } },
      { title: "Contact y Book your service now piden datos de formas distintas.", body: "Desde fuera se ven dos rutas para iniciar una solicitud. La pregunta útil es si ambas conservan su origen y llegan al mismo proceso." },
    ],
    unknowns: "Desde fuera podemos confirmar que existen dos horarios y dos rutas. Desconocemos cómo convergen, cuánto tarda una respuesta y si alguien copia o mueve datos a mano.",
    review: "Mediríamos qué ruta inicia cada solicitud, dónde llega, cuánto tarda la respuesta y qué paso termina en trabajo. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar los dos caminos conmigo, llámame." },
  { id: "lc-smiles-003", slug: "lc-beyond-smiles", name: "LC Beyond Smiles", contactFirstName: "Liset", title: "esto es lo que vi en LC Beyond Smiles.",
    intro: "Seguí el camino público de un paciente que busca el horario antes de llamar o ir a la clínica.",
    facts: [
      { title: "La web oficial invita a llegar sin cita y muestra horario de 8:00 a. m. a 5:00 p. m.", body: "La página dice “All Walk-Ins are Welcome!” y muestra el horario del día. Ese dato puede influir en la decisión de llamar o ir directo a la clínica.", source: { label: "Ver la web de LC Beyond Smiles", url: "https://lcbeyondsmiles.com/" } },
      { title: "Una ficha pública mostraba un cierre anómalo a las 5:00 a. m.", body: "La diferencia deja una pregunta concreta: ¿qué horario ve cada paciente antes de decidir llamar o ir a la clínica?" },
    ],
    unknowns: "Podemos comprobar lo que publican las fuentes. Desconocemos cuántos pacientes ven cada horario y si la diferencia ha afectado una cita o una visita.",
    review: "Revisaríamos qué fichas generan llamadas, visitas y citas, y cuál horario aparece en cada una. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar qué ve hoy un paciente antes de llegar, llámame." },
  { id: "plomero-latino-004", slug: "el-plomero-latino", name: "El Plomero Latino Inc.", contactFirstName: "David", title: "esto es lo que vi en El Plomero Latino.",
    intro: "Revisé las rutas públicas que una persona puede usar para pedir servicio. Durante la revisión aparecieron varios caminos.",
    facts: [
      { title: "El sitio principal mantiene rutas de llamada y contacto.", body: "La web publica el teléfono, páginas de contacto y llamadas a pedir servicio dentro del dominio de El Plomero Latino.", source: { label: "Ver el sitio principal", url: "https://elplomerolatino.com/" } },
      { title: "La revisión también encontró salidas hacia Google Calendar y un dominio alterno de Hostinger.", body: "Son rutas públicas distintas. La pregunta es si todas llegan al mismo lugar y si el equipo conserva el origen de cada solicitud." },
    ],
    unknowns: "Desconocemos si las rutas externas siguen activas para todos los visitantes, cómo convergen y si alguien debe copiar o mover información.",
    review: "Seguiríamos cada ruta desde el primer clic hasta la respuesta, para medir su origen, tiempo y resultado. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar el mapa de rutas conmigo, llámame." },
  { id: "absolute-best-005", slug: "absolute-best-plumbing", name: "Absolute Best Plumbing", contactFirstName: "Edgar", title: "esto es lo que vi en Absolute Best Plumbing.",
    intro: "Seguí dos rutas oficiales que una persona puede encontrar cuando necesita un plomero en Orlando.",
    facts: [
      { title: "El sitio principal publica 407-930-7309.", body: "Ese número aparece en la página About y en varias páginas de servicio del dominio oficial.", source: { label: "Ver la página About", url: "https://absolutebestplumbing.com/about-us/" } },
      { title: "Una página oficial de emergencias publica 407-622-7400.", body: "La misma página también muestra otro número en su encabezado. Los números pueden tener una función deliberada para medir fuentes. Vale la pena comprobar si ese origen se conserva hasta saber qué llamada terminó en trabajo.", source: { label: "Ver la página de emergencias", url: "https://absolutebestplumbing.com/orlando-emergency-plumbing-services/" } },
    ],
    unknowns: "Desde fuera podemos verificar los números y las rutas. Desconocemos si usan seguimiento de llamadas, si llegan al mismo sistema y si existe alguna pérdida.",
    review: "Revisaríamos qué número recibe cada fuente y si ese dato acompaña la llamada hasta su resultado. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres comprobar el recorrido completo de esas llamadas, llámame." },
];

export const pulsoProspects = prospects;
export function getPulsoProspect(value: string) { return prospects.find((p) => p.slug === value || p.id === value); }
