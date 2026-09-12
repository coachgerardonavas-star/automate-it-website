export type PulsoProspect = {
  id: string; slug: string; name: string; contactFirstName: string; title: string; intro: string;
  facts: Array<{ title: string; body: string; sources?: Array<{ label: string; url: string }> }>;
  unknowns: string; review: string; closing: string; ctaEvent?: string;
};

const prospects: PulsoProspect[] = [
  { id: "jet-001", slug: "jet-plumbing", name: "JET Plumbing Inc.", contactFirstName: "José", title: "esto fue lo que me hizo escribirte.",
    intro: "Seguí el camino que seguiría una persona que escucha hablar bien de JET Plumbing y decide buscarte en internet. Estos son los puntos que encontré.",
    facts: [
      { title: "Casi cuatro décadas de oficio tienen una huella pública mucho menor que tu trayectoria.", body: "Porch indica que trabajas en plomería desde 1985 y reúne 138 reseñas en internet de JET Plumbing. Las que pude revisar hablan muy bien de tu trabajo.", sources: [{ label: "Comprobar trayectoria y reseñas en Porch", url: "https://pro.porch.com/apopka-fl/plumbers/jet-plumbing-inc-1/pp" }] },
      { title: "Una ficha pública de JET conserva un dominio que hoy muestra otro negocio.", body: "La ficha de JET Plumbing en Apopka registra jetplumbingfl.com. Hoy ese dominio muestra una empresa que atiende Hollywood y otras ciudades del sur de Florida.", sources: [{ label: "Ver la ficha pública de JET", url: "https://www.revdex.com/reviews/jet-plumbing-inc/6062108" }, { label: "Ver lo que muestra hoy el dominio", url: "https://jetplumbingfl.com/" }] },
    ],
    unknowns: "Desconozco cuántas personas llegan por esa ruta y si esto ha causado una pérdida real. También desconozco cómo llegan hoy tus clientes, cómo gestionas las llamadas y cuánto negocio viene por recomendación.",
    review: "Revisaría cómo aparece JET cuando un cliente te busca, qué perfiles controlas y si las llamadas o mensajes reciben seguimiento. Con esos datos podemos medir qué puntos merecen atención y cuáles ya funcionan bien.",
    closing: "Hay casi 40 años de trabajo detrás del nombre JET Plumbing. Si quieres revisar estos puntos conmigo, llámame." },
  { id: "home-ac-002", slug: "home-ac", name: "HOME AC INC", contactFirstName: "Euro", title: "esto es lo que vi en HOME AC.",
    intro: "Revisé el camino público que puede seguir una persona que busca servicio de aire acondicionado. Encontré dos datos que vale la pena medir.",
    facts: [
      { title: "La misma página publica dos horarios distintos.", body: "En una sección dice lunes a viernes de 8:00 a. m. a 5:00 p. m. y fin de semana cerrado. Más abajo dice lunes a viernes de 8:00 a. m. a 8:00 p. m., sábado de 8:00 a. m. a 5:00 p. m. y domingo de 8:00 a. m. a 12:00 p. m.", sources: [{ label: "Comprobar ambos horarios en HOME AC", url: "https://homeacinc.com/about/" }] },
      { title: "Contact y Book Now piden datos de formas distintas.", body: "El formulario de Contact pide nombre, correo y mensaje. Book Now abre otro que también pide servicio, teléfono y código promocional. La pregunta útil es si ambos conservan su origen y llegan al mismo proceso.", sources: [{ label: "Comprobar Contact y abrir Book Now", url: "https://homeacinc.com/contact-2/" }] },
    ],
    unknowns: "Desde fuera podemos confirmar que existen dos horarios y dos rutas. Desconocemos cómo convergen, cuánto tarda una respuesta y si alguien copia o mueve datos a mano.",
    review: "Mediríamos qué ruta inicia cada solicitud, dónde llega, cuánto tarda la respuesta y qué paso termina en trabajo. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar los dos caminos conmigo, llámame." },
  { id: "lc-smiles-003", slug: "lc-beyond-smiles", name: "LC Beyond Smiles", contactFirstName: "Liset", title: "esto es lo que vi en LC Beyond Smiles.",
    intro: "Tu web oficial muestra un horario normal. La diferencia aparece al compararla con una ficha pública de Birdeye que también puede encontrar un paciente.",
    facts: [
      { title: "Ficha pública de Birdeye: martes de 8:00 a. m. a 5:00 a. m.", body: "Birdeye muestra el martes con un cierre a las 5:00 de la mañana. En la misma ficha, miércoles, jueves, viernes y sábado aparecen hasta las 5:00 de la tarde.", sources: [{ label: "Abrir Birdeye y comprobar el martes", url: "https://reviews.birdeye.com/lc-beyond-smiles-176986041934711" }] },
      { title: "Web oficial: 8:00 a. m. a 5:00 p. m. y pacientes sin cita.", body: "La página de LC Beyond Smiles muestra el horario normal y dice “All Walk-Ins are Welcome!”. La pregunta es cuál de los dos horarios ve un paciente antes de decidir llamar o ir directamente a la clínica.", sources: [{ label: "Abrir la web oficial y comparar", url: "https://lcbeyondsmiles.com/" }] },
    ],
    unknowns: "Podemos comprobar lo que publican las fuentes. Desconocemos cuántos pacientes ven cada horario y si la diferencia ha afectado una cita o una visita.",
    review: "Revisaríamos qué fichas generan llamadas, visitas y citas, y cuál horario aparece en cada una. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar qué ve hoy un paciente antes de llegar, llámame." },
  { id: "plomero-latino-004", slug: "el-plomero-latino", name: "El Plomero Latino Inc.", contactFirstName: "David", title: "esto es lo que vi en El Plomero Latino.",
    intro: "Revisé las rutas públicas que una persona puede usar para pedir servicio. Durante la revisión aparecieron varios caminos.",
    facts: [
      { title: "Los botones principales de contacto llevan a Google Calendar.", body: "En la página principal, “Hablamos Español” y “Contact Us” abren una agenda de citas de Google fuera del dominio de El Plomero Latino.", sources: [{ label: "Comprobar el enlace de Google Calendar", url: "https://calendar.app.google/ecJXs8amKjwfkwpU8" }] },
      { title: "Cuatro tarjetas de servicios llevan a un dominio alterno de Hostinger.", body: "Residential Plumbing, Water Heater, Water Leak Detection y Toilets, Faucets, Sinks & More apuntan a skyblue-crane-628712.hostingersite.com. Más abajo aparecen tarjetas similares que permanecen dentro del dominio principal.", sources: [{ label: "Comprobar las rutas en la página principal", url: "https://elplomerolatino.com/" }, { label: "Abrir una de las rutas de Hostinger", url: "https://skyblue-crane-628712.hostingersite.com/residential-plumbing/" }] },
    ],
    unknowns: "Desde fuera podemos comprobar hacia dónde apunta cada botón. Desconocemos si las rutas convergen, si conservan el origen del cliente y si alguien debe copiar o mover información.",
    review: "Seguiríamos cada ruta desde el primer clic hasta la respuesta, para medir su origen, tiempo y resultado. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar el mapa de rutas conmigo, llámame." },
  { id: "absolute-best-005", slug: "absolute-best-plumbing", name: "Absolute Best Plumbing", contactFirstName: "Edgar", title: "esto es lo que vi en Absolute Best Plumbing.",
    intro: "Seguí dos rutas oficiales que una persona puede encontrar cuando necesita un plomero en Orlando.",
    facts: [
      { title: "El sitio principal publica 407-930-7309.", body: "Ese número aparece en la página About y en varias páginas de servicio del dominio oficial.", sources: [{ label: "Comprobar el número del sitio principal", url: "https://absolutebestplumbing.com/about-us/" }] },
      { title: "La página oficial de emergencias muestra 407-622-7400 y 321-220-8006.", body: "Junto al 407-930-7309 del sitio principal, quedan tres números públicos. Pueden tener una función deliberada para medir fuentes. Vale la pena comprobar si ese origen se conserva hasta saber qué llamada terminó en trabajo.", sources: [{ label: "Comprobar los números de emergencias", url: "https://absolutebestplumbing.com/orlando-emergency-plumbing-services/" }] },
    ],
    unknowns: "Desde fuera podemos verificar los números y las rutas. Desconocemos si usan seguimiento de llamadas, si llegan al mismo sistema y si existe alguna pérdida.",
    review: "Revisaríamos qué número recibe cada fuente y si ese dato acompaña la llamada hasta su resultado. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres comprobar el recorrido completo de esas llamadas, llámame." },
  { id: "freddies-006", slug: "baez-and-son-ac", name: "Baez & Son Air Condition & Heating", contactFirstName: "Melvin", title: "esto es lo que vi en Baez & Son.",
    intro: "Tu página cuenta una historia fuerte: 24 años de servicio en el Army, un negocio familiar y veterano, atención bilingüe y ayuda de emergencia las 24 horas. Seguí el recorrido de una persona que necesita servicio y quiere actuar rápido.",
    facts: [
      { title: "El cliente puede llamar, escribir, enviar un formulario o reservar en una agenda externa.", body: "La web ofrece varias puertas útiles para una emergencia, una reparación, mantenimiento o una cita. También publica servicio el mismo día, atención bilingüe y cobertura en varias zonas de Osceola County.", sources: [{ label: "Comprobar las rutas en la web oficial", url: "https://baezandsonac.com/" }] },
      { title: "La pregunta clave es cuánto contexto llega junto a cada solicitud.", body: "Servicio, urgencia, ubicación, idioma, origen del contacto y estado del plan de mantenimiento ayudan a decidir quién responde, cuándo agenda y cómo despacha. Desde afuera no se puede confirmar si esos datos llegan juntos a la persona que coordina el trabajo.", sources: [{ label: "Revisar los servicios y la cobertura", url: "https://baezandsonac.com/services" }] },
    ],
    unknowns: "Desconozco cómo se unen hoy esas rutas, qué información recibe quien agenda y despacha, y si el proceso actual ya conserva todo el contexto sin trabajo extra.",
    review: "Mediríamos entrada, primera respuesta, datos completos, clasificación, cita, despacho y contactos repetidos. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar conmigo cómo viaja cada solicitud hasta el despacho, escríbeme.", ctaEvent: "pulso_cta_call" },
  { id: "osceola-speed-007", slug: "osceola-speed-tires", name: "Osceola Speed Tires & Wheels", contactFirstName: "Julio", title: "esto es lo que vi en Osceola Speed.",
    intro: "La página muestra un negocio familiar con dos sedes, servicios claros y una reputación construida durante años. Seguí el recorrido de alguien que quiere pasar de mirar a pedir servicio.",
    facts: [
      { title: "Las dos sedes aparecen con dirección, teléfono y horario propios.", body: "Kissimmee y St. Cloud están bien identificadas al final de la página. Ese dato permite preguntar desde el primer contacto cuál sede necesita la persona.", sources: [{ label: "Comprobar las dos sedes", url: "https://osceolaspeedtires.com/" }] },
      { title: "La página informa servicios, pero no ofrece una cita completa en el mismo recorrido.", body: "Una persona puede ver llantas, aros, frenos, alineación y otros servicios. Desde la página principal no encontré un paso que conserve sede, servicio y horario como una sola solicitud.", sources: [{ label: "Seguir el recorrido en la web", url: "https://osceolaspeedtires.com/" }] },
    ],
    unknowns: "Desconozco por qué canal entra la mayoría de las citas, si el equipo conserva la sede y el servicio desde el primer contacto, y qué ruta genera más trabajos.",
    review: "Mediríamos el origen, la sede elegida, el servicio pedido y el resultado de cada contacto. Así sabríamos qué ruta ya funciona y cuál merece ajuste. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar ese recorrido conmigo, escríbeme.", ctaEvent: "pulso_cta_call" },
  { id: "osceola-refrigeration-008", slug: "montiel-woodcraft-design", name: "Montiel Woodcraft Design", contactFirstName: "Ludwing", title: "esto es lo que vi en Montiel Woodcraft.",
    intro: "La página cuenta una historia que merece peso: más de 30 años de oficio, una familia que empezó en Venezuela y proyectos residenciales y comerciales con diseño 3D e instalaciones de un día.",
    facts: [
      { title: "La página posterior al formulario publica dos plazos para la respuesta.", body: "El mensaje visible promete contacto dentro de 24 horas. La descripción pública de esa misma página indica 48 horas. Vale la pena fijar una sola expectativa, en especial cuando la rapidez forma parte de la promesa del negocio.", sources: [{ label: "Comprobar la página posterior al contacto", url: "https://www.montielwoodcraft.com/postcontact" }] },
      { title: "Montiel Woodcraft y Performance Installations conviven en puntos de contacto.", body: "El sitio usa Montiel Woodcraft como marca. En la tienda aparece contact@performanceinst.com, el Instagram enlaza a Performance Installations y el pie identifica a Performance Installations & More, LLC. Puede ser una estructura deliberada; la pregunta es si un cliente reconoce la continuidad al pedir o pagar un servicio.", sources: [{ label: "Comprobar la página de contacto", url: "https://www.montielwoodcraft.com/contact" }, { label: "Comprobar la tienda", url: "https://www.montielwoodcraft.com/store" }] },
    ],
    unknowns: "Desconozco si ambos plazos describen procesos distintos y si la mezcla de nombres genera alguna duda real. Tampoco puedo ver a dónde llega el formulario ni cómo continúa el seguimiento.",
    review: "Mediríamos origen, tiempo de respuesta, datos del proyecto, cita, estimado y seguimiento. También comprobaríamos si cada punto mantiene una sola marca y una sola promesa. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar ese recorrido conmigo, escríbeme.", ctaEvent: "pulso_cta_call" },
  { id: "king-oaks-009", slug: "jpi-mechanical-services", name: "JPI Mechanical Services Inc.", contactFirstName: "Ramon", title: "esto es lo que vi en JPI Mechanical.",
    intro: "JPI muestra una operación con fondo: empresa familiar, servicio residencial y comercial, refrigeración, respuesta de emergencia y más de 35 ubicaciones comerciales bajo mantenimiento.",
    facts: [
      { title: "El formulario público pide datos básicos para servicios muy distintos.", body: "La misma empresa atiende hogar, comercio, refrigeración y emergencias. El formulario visible no separa urgencia, tipo de cliente, servicio ni ubicación. La pregunta es cuándo recoge el equipo ese contexto y cómo llega a quien debe responder.", sources: [{ label: "Comprobar la web y el formulario", url: "https://www.jpiair.com/" }] },
      { title: "La experiencia pública merece medirse en cada punto de contacto.", body: "La web publica testimonios fuertes sobre rapidez, integridad y atención directa del dueño. Una ficha pública reciente también reúne elogios y varias críticas sobre trato y servicio al cliente. Esa mezcla sirve como señal para medir la experiencia desde la primera llamada hasta el cierre.", sources: [{ label: "Revisar testimonios en la web", url: "https://www.jpiair.com/" }, { label: "Revisar la ficha pública de reseñas", url: "https://reviews.birdeye.com/jpi-mechanical-services-inc-899752064" }] },
    ],
    unknowns: "Desconozco cómo clasifica hoy el equipo cada entrada, cuánto contexto se pide después y si las reseñas reflejan casos aislados o un patrón. Los datos públicos no permiten llegar a esa conclusión.",
    review: "Mediríamos origen, primera respuesta, datos completos, clasificación, cita, despacho y seguimiento. Separaríamos cada tipo de servicio y cada punto de contacto para ver dónde la experiencia se mantiene y dónde cambia. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar ese recorrido conmigo, escríbeme.", ctaEvent: "pulso_cta_call" },
  { id: "occ911-010", slug: "tucfrez", name: "Tucfrez Inc.", contactFirstName: "Lilly", title: "esto es lo que vi en Tucfrez.",
    intro: "Tucfrez tiene una historia clara: más de 20 años en Central Florida, un negocio familiar y latino, y una nueva etapa bajo tu liderazgo como empresa dirigida por una mujer.",
    facts: [
      { title: "La atención en español forma parte visible de la promesa.", body: "“Hablamos Español” aparece en la página principal, About, Contact y Services. La web también destaca servicio familiar, trato honesto y una trayectoria que empezó con Luis Marte y continúa contigo.", sources: [{ label: "Comprobar la historia de Tucfrez", url: "https://tucfrez.com/about/" }] },
      { title: "El formulario reúne datos útiles, pero no muestra una preferencia de idioma.", body: "Pide nombre, teléfono, correo, dirección, servicio y detalles. Una persona que llega por la promesa en español no ve un campo para indicar el idioma en que desea recibir la respuesta.", sources: [{ label: "Comprobar el formulario", url: "https://tucfrez.com/contact/" }] },
    ],
    unknowns: "Desconozco cómo asigna hoy el equipo el idioma, quién responde cada solicitud y si el proceso ya reconoce esa preferencia por otra vía.",
    review: "Mediríamos idioma, servicio, primera respuesta, cita, estimado y seguimiento. Así se puede comprobar si la promesa bilingüe se mantiene desde la web hasta la conversación. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar ese recorrido conmigo, escríbeme.", ctaEvent: "pulso_cta_call" },
];

export const pulsoProspects = prospects;
export function getPulsoProspect(value: string) { return prospects.find((p) => p.slug === value || p.id === value); }
