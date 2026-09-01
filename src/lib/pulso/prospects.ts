export type PulsoProspect = {
  id: string; slug: string; name: string; contactFirstName: string; title: string; intro: string;
  facts: Array<{ title: string; body: string; sources?: Array<{ label: string; url: string }> }>;
  unknowns: string; review: string; closing: string;
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
  { id: "freddies-006", slug: "freddies-shoe-repair", name: "Freddie's Shoe and Leather Repair", contactFirstName: "Freddie", title: "esto es lo que vi en Freddie's.",
    intro: "Primero vi lo que ya has ganado: 44 años de oficio según tu propia página y una calificación A+ en Better Business Bureau. Después revisé qué encuentra una persona que llega por internet.",
    facts: [
      { title: "Tu página todavía se presenta como “Mi primera página”.", body: "Ese es el título que aparece en la pestaña del sitio. La página sí muestra trabajos y dos teléfonos, pero esa primera etiqueta cuenta muy poco de la experiencia que hay detrás de Freddie's.", sources: [{ label: "Abrir la página de Freddie's", url: "https://www.freddiesshoeandleatherrepair.com/" }] },
      { title: "La dirección y el horario no aparecen en el sitio.", body: "La dirección del taller sí figura en fuentes públicas. En la página propia no encontré dirección, horario, formulario ni correo. La pregunta es qué acción quieres que tome alguien después de encontrarte.", sources: [{ label: "Comprobar la ficha de BBB", url: "https://www.bbb.org/us/fl/kissimmee/profile/shoe-repair/freddies-shoe-and-leather-repair-corp-0733-235975207" }] },
    ],
    unknowns: "Desconozco cuántas personas visitan la página antes de llamar o ir al taller. También desconozco el horario correcto y qué trabajos quieres promover primero.",
    review: "Mediríamos cuántas personas llegan, qué buscan y qué acción toman. Después ajustaríamos solo lo que ayude a que tu trayectoria se entienda y el próximo paso quede claro. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar conmigo qué ve hoy una persona antes de conocerte, escríbeme." },
  { id: "osceola-speed-007", slug: "osceola-speed-tires", name: "Osceola Speed Tires & Wheels", contactFirstName: "Julio", title: "esto es lo que vi en Osceola Speed.",
    intro: "La página muestra un negocio familiar con dos sedes, servicios claros y una reputación construida durante años. Seguí el recorrido de alguien que quiere pasar de mirar a pedir servicio.",
    facts: [
      { title: "Las dos sedes aparecen con dirección, teléfono y horario propios.", body: "Kissimmee y St. Cloud están bien identificadas al final de la página. Ese dato permite preguntar desde el primer contacto cuál sede necesita la persona.", sources: [{ label: "Comprobar las dos sedes", url: "https://osceolaspeedtires.com/" }] },
      { title: "La página informa servicios, pero no ofrece una cita completa en el mismo recorrido.", body: "Una persona puede ver llantas, aros, frenos, alineación y otros servicios. Desde la página principal no encontré un paso que conserve sede, servicio y horario como una sola solicitud.", sources: [{ label: "Seguir el recorrido en la web", url: "https://osceolaspeedtires.com/" }] },
    ],
    unknowns: "Desconozco por qué canal entra la mayoría de las citas, si el equipo conserva la sede y el servicio desde el primer contacto, y qué ruta genera más trabajos.",
    review: "Mediríamos el origen, la sede elegida, el servicio pedido y el resultado de cada contacto. Así sabríamos qué ruta ya funciona y cuál merece ajuste. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar ese recorrido conmigo, escríbeme." },
  { id: "osceola-refrigeration-008", slug: "osceola-refrigeration", name: "Osceola Refrigeration & Major Appliance Service", contactFirstName: "Matt", title: "esto es lo que vi en Osceola Refrigeration.",
    intro: "Seguí el camino de una persona que necesita reparar un equipo y busca cómo pedir ayuda desde la página.",
    facts: [
      { title: "“Book an Appointment” termina en una llamada.", body: "El sitio usa ese texto junto al número de teléfono. La página de contacto ahora sí muestra campos de nombre, correo, teléfono y mensaje, un cambio frente a la revisión anterior.", sources: [{ label: "Comprobar la página de contacto", url: "https://appliance-repair-kissimmee.fl-biz.com/contact-us/" }] },
      { title: "La web publica horario y limita el servicio fuera de hora.", body: "El horario visible es de lunes a sábado, de 10 AM a 6 PM. La página principal aclara que el servicio de emergencia fuera de horario es limitado y para clientes habituales.", sources: [{ label: "Comprobar horario y aviso", url: "https://appliance-repair-kissimmee.fl-biz.com/" }] },
    ],
    unknowns: "Desconozco cuántas solicitudes llegan fuera del horario, cuántas empiezan por llamada y qué datos necesita el equipo antes de asignar un servicio.",
    review: "Seguiríamos cada solicitud desde el primer contacto hasta su asignación, con hora, tipo de equipo, ubicación y urgencia. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar ese recorrido conmigo, escríbeme." },
  { id: "king-oaks-009", slug: "king-oaks-garage-doors", name: "King Oaks Garage Door Services", contactFirstName: "Dylon", title: "esto es lo que vi en King Oaks.",
    intro: "La confianza ya existe: la página anuncia 91 reseñas de cinco estrellas. Revisé qué ve una persona cuando intenta comprobarlas y pedir servicio.",
    facts: [
      { title: "La web anuncia 91 reseñas de cinco estrellas.", body: "Esa prueba social aparece de forma clara en la página principal. Una fuente pública de reseñas también muestra comentarios recientes y una calificación alta.", sources: [{ label: "Comprobar la página principal", url: "https://king-oaks.com/" }, { label: "Ver reseñas públicas", url: "https://www.trustindex.io/reviews/king-oaks.com" }] },
      { title: "El recorrido público conserva más de una puerta para pedir servicio.", body: "La web principal ofrece “Get an Appointment” y páginas de servicio con “Request Appointment”. También existe otro dominio del negocio con su propio formulario de cotización.", sources: [{ label: "Revisar la ruta principal", url: "https://king-oaks.com/" }, { label: "Revisar el segundo sitio", url: "https://kingoaksgaragedoorservices.com/" }] },
    ],
    unknowns: "Desconozco si todas las rutas llegan al mismo proceso, si conservan su origen y qué ocurre desde la solicitud hasta que el trabajo queda asignado.",
    review: "Mediríamos cada puerta de entrada, su origen, la respuesta y el resultado. Así se puede mantener lo que funciona y unir solo lo que hoy pierda contexto. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar el mapa completo conmigo, escríbeme." },
  { id: "occ911-010", slug: "occ911", name: "OCC911, Inc.", contactFirstName: "Scott", title: "esto es lo que vi en OCC911.",
    intro: "Seguí el recorrido de una persona que necesita ayuda urgente fuera del horario de oficina y llega al formulario “GET HELP NOW”.",
    facts: [
      { title: "La operación publica atención de emergencia 24/7 en Orlando y Tampa.", body: "La página muestra las dos sedes, sus teléfonos y un horario de oficina de lunes a viernes, de 8 AM a 4 PM. También indica atención de emergencia las 24 horas.", sources: [{ label: "Comprobar sedes y horarios", url: "https://occ911.com/contact-us/" }] },
      { title: "“GET HELP NOW” pide cuatro datos generales.", body: "El formulario solicita nombre, correo, asunto y mensaje. No muestra campos separados para teléfono, ubicación o ZIP, tipo de incidente y nivel de urgencia.", sources: [{ label: "Comprobar el formulario", url: "https://occ911.com/contact-us/" }] },
    ],
    unknowns: "Desconozco cuánto tarda hoy el equipo en confirmar ubicación, incidente y urgencia, cómo reparte los casos entre Orlando y Tampa, y si el proceso actual ya resuelve bien esos datos.",
    review: "Mediríamos entrada, primera respuesta, ubicación confirmada, tipo de daño, urgencia y asignación. Solo después decidiríamos si conviene pedir más datos desde el inicio. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
    closing: "Si quieres revisar ese recorrido conmigo, escríbeme." },
];

export const pulsoProspects = prospects;
export function getPulsoProspect(value: string) { return prospects.find((p) => p.slug === value || p.id === value); }
