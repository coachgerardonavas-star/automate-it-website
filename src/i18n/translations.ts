export type Lang = "es" | "en";

export const langs: Lang[] = ["es", "en"];

export const translations = {
  es: {
    siteTitle: "Automate IT — Your business, upgraded.",
    siteDescription:
      "Equipos de IA especializados ejecutan tu operación interna. Recupera tu tiempo y deja de perder leads.",

    nav: {
      logoLabel: "Automate IT — inicio",
      links: [
        { label: "Cómo funciona", href: "/#como-funciona" },
        { label: "Agentes", href: "/#agentes" },
        { label: "Planes", href: "/#planes" },
        { label: "Para quién", href: "/#para-quien" },
        { label: "Blog", href: "/blog" },
      ],
      cta: "Diagnóstico gratuito",
    },

    hero: {
      eyebrow: "Un miembro digital para tu equipo · Desde $200/mes",
      h1Line1: "Recupera el control",
      h1Line2: "de tu negocio.",
      // Frases del typewriter: completan h1Line1 y van de lo grande a lo
      // cotidiano. Nunca poner funcionalidades aquí — el titular dejaría de
      // vender una transformación y pasaría a ser una lista de features.
      heroPhrases: [
        "de tu negocio.",
        "de tu día.",
        "de tu agenda.",
        "de tus fines de semana.",
      ],
      subtitle:
        "Incorporamos a tu equipo un miembro digital que se encarga del trabajo repetitivo que hoy haces tú — dentro de las herramientas que ya usas. Es tu negocio: no tienes por qué hacerlo todo.",
      bullets: [
        "✅ Cada cliente recibe respuesta, aunque estés ocupado.",
        "🔁 El seguimiento deja de depender de tu memoria.",
        "📂 La información llega sola a donde va.",
      ],
      ctaPrimary: "Descubre dónde se te va el tiempo",
      heroImageAlt:
        "Ilustración isométrica: WhatsApp, Google Calendar, QuickBooks, HubSpot, Instagram y Gmail apilados como capas de un mismo sistema, conectadas al equipo, al almacén y a la operación del negocio.",
      microcopy:
        "Formulario de 5 minutos. Con él hacemos la Radiografía de tu Operación. Sin costo. Sin compromiso.",
      trustBadges: [
        { icon: "🔒", text: "Tus datos no se venden" },
        { icon: "🤐", text: "Conversaciones privadas" },
        { icon: "🛡️", text: "Tus herramientas, tus cuentas" },
        { icon: "⚙️", text: "Tú decides qué conectamos" },
      ],
    },

    resultados: {
      eyebrow: "Lo que pasa cuando no contestas",
      subtitle:
        "La consecuencia es inmediata y medible. No es opinión — son datos de la industria.",
      cards: [
        {
          stat: "62%",
          consequence: "Llaman al siguiente negocio en Google. Inmediatamente.",
          source: "411 Locals / getaira.io 2024 · PATLive",
        },
        {
          stat: "85%",
          consequence: "No vuelven a intentarlo. Nunca.",
          source: "BIA/Kelsey · PATLive · AnswerConnect · Forbes",
        },
        {
          stat: "$126K",
          consequence:
            "Es lo que pierde un negocio promedio al año. Solo en llamadas. Promedio — varía por industria (salón ~$35K, dental ~$150K+).",
          source: "AMBS Call Center",
        },
      ],
      disclaimer: "Datos de la industria de servicios en EE.UU., 2024–2026.",
    },

    ribbon: {
      source:
        "Fuente: MPI Data Hub / NIWAP 2024 · 44.9% de hispanohablantes en Florida con dominio limitado del inglés",
    },

    banda: {
      stats: [
        {
          stat: "85%",
          label:
            "de las personas que no logran contactar un negocio no vuelven a llamar",
          source: "PATLive / SchedulingKit 2026",
        },
        {
          stat: "62%",
          label:
            "de los negocios pequeños no contestan la mayoría de sus llamadas",
          source: "411 Locals / getaira.io 2026",
        },
        {
          stat: "5.2M",
          label:
            "personas hablan español en casa en Florida — muchas esperan que alguien conteste en inglés",
          source: "MPI Data Hub / NIWAP 2024",
        },
        {
          stat: "$126K",
          label:
            "en ingresos pierde al año el negocio promedio por llamadas no contestadas",
          source: "SchedulingKit / Dialzara 2026",
        },
      ],
    },

    dolor: {
      eyebrow: "El antes",
      titleLine1: "Tu negocio no necesita más aplicaciones.",
      titleLine2: "Necesita que las que ya tienes trabajen juntas.",
      cards: [
        {
          eyebrow: "Clientes",
          title: "Mensajes que se quedan sin respuesta",
          body: "Llegan por teléfono, por WhatsApp, por el formulario. Tú estás trabajando. Para cuando contestas, ya buscaron a otro.",
        },
        {
          eyebrow: "Seguimiento",
          title: "Clientes que preguntaron y nunca volviste a llamar",
          body: "Cotizaste, quedaron en pensarlo, y ahí murió. No porque no te importara — porque el seguimiento depende de tu memoria.",
        },
        {
          eyebrow: "Información",
          title: "El trabajo de pasar todo de un lado a otro",
          body: "Del mensaje al calendario. Del correo al CRM. Del presupuesto al Excel. Ese trabajo no aparece en ningún reporte, pero es el que te consume el día.",
        },
      ],
    },

    transformacion: {
      eyebrow: "La transformación",
      titleLine1: "De tu primer formulario al primer agente operando.",
      titleLine2: "En semanas, no en meses.",
      steps: [
        {
          n: "01",
          title: "Diagnóstico",
          body: "Completas el formulario de diagnóstico — son 5 minutos. Con eso hacemos la Radiografía de tu Operación: dónde entra el trabajo, dónde se enfría y dónde se te va el tiempo. Sales con un plan claro de qué arreglar primero, lo hagas con nosotros o no.",
        },
        {
          n: "02",
          title: "Implementación",
          body: "Conectamos tus herramientas, ordenamos los procesos y ponemos a funcionar solo el trabajo repetitivo. Entrenamos a tu equipo para que opere desde el primer día. Sin migrar nada y sin cambiar las herramientas que ya usas.",
        },
        {
          n: "03",
          title: "Optimización",
          body: "Tu negocio cambia y el sistema cambia contigo. Seguimos ajustando procesos y sumando automatizaciones para que crezcas sin que crezca el desorden.",
        },
      ],
    },

    agentes: {
      eyebrow: "Los agentes en acción",
      title: "Equipos de IA especializados ejecutan tu operación interna.",
      subtitle:
        "Cada agente entrenado para una función específica. Conversan con tus sistemas en tiempo real: CRM, calendario, WhatsApp, email. Tú ves los resultados; ellos hacen el trabajo.",
      terminalTitle: "automate-it · live",
      blocks: [
        {
          prompt: "> agent.tony@receptionist",
          promptCh: 28,
          promptDur: 1.0,
          promptDelay: 0.0,
          lines: [
            { text: "Llamada entrante: María González", delay: 1.1 },
            {
              before: "Calificando lead… ",
              ok: "alto interés",
              after: "",
              delay: 1.6,
            },
            {
              text: "Agendando cita: jueves 3pm con Dr. Ramos",
              delay: 2.1,
            },
            {
              before: "",
              ok: "Confirmación enviada por WhatsApp",
              after: "",
              delay: 2.6,
            },
          ],
        },
        {
          prompt: "> agent.veronica@followup",
          promptCh: 26,
          promptDur: 0.9,
          promptDelay: 3.4,
          lines: [
            {
              text: "Lead frío detectado: Carlos Méndez · 45 días",
              delay: 4.4,
            },
            { text: "Reactivando con secuencia de 3 emails…", delay: 4.9 },
            {
              before: "Respondió: ",
              ok: '"Hablemos esta semana"',
              after: "",
              delay: 5.4,
            },
          ],
        },
        {
          prompt: "> agent.marc@admin",
          promptCh: 18,
          promptDur: 0.7,
          promptDelay: 6.0,
          lines: [
            { text: "Procesando facturas pendientes (12)", delay: 6.8 },
            { text: "Conciliando con extractos bancarios…", delay: 7.3 },
            {
              before: "",
              ok: "12 reconciliadas · 0 discrepancias",
              after: "",
              delay: 7.8,
            },
          ],
        },
      ],
    },

    servicios: {
      eyebrow: "Tu equipo digital",
      titleLine1: "No compras software.",
      titleLine2: "Incorporas a alguien que hace el trabajo.",
      subtitle:
        "Tres miembros, según cuánto quieras delegar. El primero hace. El segundo además decide. El tercero además coordina.",
      planDiagnosticHint:
        "¿No sabes cuál te toca? El diagnóstico te lo dice — es gratis.",
      plans: [
        {
          sku: "ASISTENTE",
          name: "Asistente",
          badge: "",
          price: "$200",
          priceUnit: "/mes",
          setup: "Incorporación: $1,000",
          description: "Hace por ti. Se encarga de un proceso completo de tu negocio, de principio a fin.",
          features: [
            "Contesta cuando tú no puedes",
            "Agenda sin que lo escribas dos veces",
            "Guarda cada contacto donde debe quedar",
            "Recuerda y da seguimiento por ti",
            "Sigue tus reglas — no decide por su cuenta",
          ],
        },
        {
          sku: "ESTRATEGA",
          name: "Estratega",
          badge: "",
          price: "$400",
          priceUnit: "/mes",
          setup: "Incorporación: $2,000",
          description: "Piensa contigo. Hasta tres procesos conectados, y ya toma decisiones repetitivas solo.",
          features: [
            "Todo lo que hace el Asistente",
            "Decide a quién atender primero",
            "Manda cada caso a la persona correcta",
            "Detecta lo que se sale de lo normal",
            "Te avisa cuando algo necesita tu criterio",
          ],
        },
        {
          sku: "MANAGER",
          name: "Manager",
          badge: "",
          price: "$600",
          priceUnit: "/mes",
          setup: "Incorporación: $3,000",
          description: "Coordina para ti. Lleva una operación completa y sabe en qué punto va cada caso.",
          features: [
            "Todo lo que hace el Estratega",
            "Lleva cada caso de principio a fin",
            "Coordina entre personas, zonas o sedes",
            "Vigila plazos y actúa antes de que venzan",
            "Te reporta el estado sin que se lo pidas",
          ],
        },
      ],
      examplesEyebrow: "¿Cuál me toca?",
      examples: [
        {
          label: "«Hay cosas que solo puedo hacer yo»",
          detail: "Trabajo repetitivo que depende de que estés disponible",
          total: "Asistente",
        },
        {
          label: "«No sé a quién atender primero»",
          detail: "Te llegan más contactos de los que puedes priorizar a mano",
          total: "Estratega",
        },
        {
          label: "«Se me descoordina la operación»",
          detail: "Varios procesos y varias personas, y nadie ve el estado completo",
          total: "Manager",
        },
      ],
      cta: "Agenda tu diagnóstico gratuito",
      ctaHint: "El diagnóstico te dice cuál necesitas primero — lo hagas con nosotros o no.",
      checkoutLabel: "Empezar por aquí",
      // checkoutLoading/checkoutError quedan sin uso desde el 5-ago-2026: el
      // botón dejó de disparar checkout y ahora lleva al diagnóstico. Se
      // conservan por si vuelve el autoservicio.
      checkoutLoading: "Procesando...",
      checkoutError: "Hubo un problema. Intenta de nuevo.",
    },

    bit: {
      tooltip: "Hola, soy BIT",
      heroLine: "Conoce a BIT, tu copiloto de operación →",
      anchorLabel: "Saber más sobre BIT",
      avatarAlt: "BIT, mascota de Automate IT",
      description:
        "BIT es la cara visible de tu sistema multi-agente. Coordina voz, chat, CRM y marketing, te avisa cuando algo requiere tu atención y reporta resultados cada mañana.",
    },

    chatbot: {
      openLabel: "Abrir chat con BIT",
      closeLabel: "Cerrar chat",
      headerName: "BIT",
      headerStatus: "En línea",
      welcomeMessage:
        "Hola, soy BIT. Puedo ayudarte a entender qué automatizamos primero en tu negocio. ¿Por dónde empezamos?",
      quickActions: [
        { label: "Solicitar diagnóstico", href: "/diagnostico" },
        { label: "Ver planes", href: "/#planes" },
        { label: "Hablar con un humano", href: "mailto:automateit@yourbizupgraded.com" },
      ],
      emailPlaceholder: "Tu email para respuesta",
      inputPlaceholder: "Escribe tu pregunta…",
      sendLabel: "Enviar",
      successNotice:
        "Recibido. Te respondemos por email a la brevedad.",
      errorSubmitFallback:
        "Hubo un problema. Escríbenos a automateit@yourbizupgraded.com",
    },

    blog: {
      pageTitle: "Blog · Automate IT",
      pageDescription:
        "Ideas concretas para dueños de negocios que quieren recuperar su tiempo.",
      eyebrow: "Blog",
      heading: "Pensamientos sobre automatización",
      subheading:
        "Cómo usar la IA en tu negocio, explicado simple y en 5 minutos. Sin hacerte sentir tonto por preguntar.",
      readMore: "Leer →",
      byAuthor: "Por",
      publishedOn: "Publicado",
      backToBlog: "← Volver al blog",
      noPosts: "Pronto publicaremos aquí. Mientras tanto, escríbenos.",
    },

    faqPrecios: {
      eyebrow: "Preguntas frecuentes",
      title: "Lo que siempre preguntan",
      faqs: [
        {
          q: "¿Puedo empezar por lo más chico?",
          a: "Sí, y es lo normal. Casi todos empiezan con un Asistente ($1,000 de incorporación + $200/mes) encargándose de un solo proceso. Cuando el negocio pide más, se sube de nivel — no se compran piezas sueltas.",
        },
        {
          q: "¿Qué pasa si supero los 300 minutos o mensajes?",
          a: "Se facturan bloques adicionales de 300 unidades. Voz: $35. WhatsApp: $25. CRM: $20. Siempre bloque completo, nunca fracciones.",
        },
        {
          q: "¿El setup fee es reembolsable?",
          a: "No. Cubre la configuración, la conexión a tus herramientas y las pruebas hasta dejarlo funcionando. Se paga 50% al firmar y 50% cuando la instalación termina.",
        },
        {
          q: "¿Puedo cancelar cuando quiera?",
          a: "Los primeros 90 días no son cancelables. Del día 91 en adelante, cancelas con 30 días de aviso escrito sin penalidad.",
        },
        {
          q: "¿Trabajan con consultorios o negocios que manejan información de pacientes?",
          a: "No es lo que vendemos por defecto, pero sí se puede. Un negocio que maneja información de salud necesita acuerdos firmados (BAA) con cada proveedor que toque esos datos, así que el sistema se monta sobre herramientas que los firmen y los firmamos antes de tocar un solo dato de pacientes. Eso cambia qué plataformas usamos, no el precio. Si es tu caso, escríbenos y lo evaluamos contigo antes de proponerte nada.",
        },
        {
          q: "¿Puedo subir de nivel después?",
          a: "Sí, cuando quieras. Se sube de nivel cuando el sistema tiene que empezar a decidir o a coordinar algo que hoy no hace — no cuando quieres más herramientas. La diferencia de incorporación se cotiza aparte y la mensualidad nueva arranca en el siguiente ciclo.",
        },
        {
          q: "¿El sistema de IA escucha o guarda mis conversaciones con clientes?",
          a: "No. Automate IT no almacena ni tiene acceso al contenido de las conversaciones. Los datos de llamadas y mensajes quedan en los sistemas de los proveedores (Retell AI, Twilio) bajo sus propios términos de privacidad, y las cuentas son tuyas.",
        },
        {
          q: "¿Puedo usar este servicio si soy abogado o manejo información confidencial de clientes?",
          a: "Sí. Los abogados en Florida están sujetos a las Reglas de Conducta Profesional del Florida Bar (Rule 1.6 — Confidencialidad), que exigen medidas razonables para proteger información del cliente — pero no requieren un compliance tecnológico específico como HIPAA. Un Asistente es suficiente para firmas legales. Si deseas, podemos configurar el agente para que no grabe conversaciones y para que los datos de leads vayan únicamente a tu CRM privado.",
        },
        {
          q: "¿Qué pasa si el agente falla o da información incorrecta?",
          a: "El sistema se revisa solo cada 5 minutos y nos llega una alerta si algo deja de responder. Si el agente comete un error, lo corregimos en 24 horas hábiles. Detrás del sistema siempre hay una persona, no un ticket automático.",
        },
        {
          q: "¿Cuánto tiempo tarda el setup?",
          a: "El sistema está operativo en 2 semanas desde la firma del contrato. La primera semana es configuración y la segunda es pruebas con datos reales antes del go-live.",
        },
        {
          q: "¿Qué necesito tener para empezar?",
          a: "Solo un número de teléfono o línea de WhatsApp activa, y 1 hora de tu tiempo para la sesión de onboarding. Nosotros configuramos todo lo demás.",
        },
      ],
    },

    paraQuien: {
      eyebrow: "Para quién es esto",
      titleLine1: "Si ya tienes clientes llegando",
      titleLine2: "y eres tú quien sostiene todo.",
      subtitle:
        "Hecho para dueños que ya tienen demanda: usas tres o cuatro herramientas, pasas información de una a otra a mano, y si te tomas una semana libre algo se rompe. Si te ves aquí, empezamos por lo que más te cuesta.",
      footer:
        "Esto no es para ti si todavía estás consiguiendo tus primeros clientes — primero hay que vender, automatizar viene después. Tampoco si buscas el precio más bajo del mercado, o si quieres probar la IA sin cambiar nada de cómo operas. Cualquier otro caso, hablemos en el diagnóstico.",
      painLabel: "Lo que pasa hoy",
      solutionLabel: "Empezamos por",
      recommendedLabel: "Recomendado:",
      rubros: [
        {
          name: "Contestar es tu cuello de botella",
          pain: "Las llamadas y los WhatsApp llegan mientras estás atendiendo. O contestas tarde o se quedan sin respuesta.",
          solution:
            "Recepción 24/7 que contesta de inmediato, califica al cliente y agenda en tu calendario.",
          tier: "Asistente",
        },
        {
          name: "Eres el dueño y el recepcionista",
          pain: "Cada lead nuevo pasa por ti. Pierdes horas del día contestando antes de cobrar la primera factura.",
          solution:
            "Un agente toma el primer contacto, filtra curiosos y solo te pasa los clientes listos para hablar.",
          tier: "Asistente",
        },
        {
          name: "Te llaman en inglés y respondes a medias",
          pain: "Tus clientes angloparlantes cuelgan o se van con la competencia porque la primera conversación se siente forzada.",
          solution:
            "Atención bilingüe que detecta el idioma y responde con la misma claridad en inglés que en español.",
          tier: "Asistente",
        },
        {
          name: "Pierdes clientes que nunca supiste que existieron",
          pain: "No tienes registro de cuántas llamadas o mensajes se quedaron sin contestar mientras trabajabas.",
          solution:
            "Cada interacción queda registrada con quién, cuándo y qué pidió, y un follow-up automático cierra el lazo.",
          tier: "Asistente",
        },
      ],
    },

    ctaFinal: {
      eyebrow: "Diagnóstico gratuito",
      titleLine1: "¿Listo para recuperar",
      titleLine2: "el control de tu negocio?",
      titleLine3: "5 minutos. Sin compromiso.",
      subtitle:
        "Cuéntanos cómo trabajas hoy y te decimos qué está frenando tu crecimiento y qué arreglaríamos primero. Te contactamos en menos de 24 horas con tu Radiografía de tu Operación. Sin venta dura.",
      formNamePlaceholder: "Tu nombre",
      formEmailPlaceholder: "Tu email",
      formBizTypePlaceholder: "Tipo de negocio",
      submitButton: "Quiero recuperar el control",
      submitting: "Enviando…",
      errorAllFields: "Revisa los 3 campos antes de enviar.",
      errorSubmitFallback:
        "Hubo un problema. Escríbenos a automateit@yourbizupgraded.com",
      successHeading: "Recibido.",
      successBody:
        "Te contactamos en menos de 24 horas al email que dejaste. Mientras tanto, revisa tu carpeta de spam por si nuestro mail termina ahí.",
      privacyDisclaimer:
        "Tus datos no se comparten ni se venden. Los usamos solo para coordinar tu diagnóstico.",
      businessTypes: [
        "Dental",
        "Legal",
        "Construcción / Plomería",
        "Salón / Spa",
        "Inmobiliaria",
        "Salud / Terapia",
        "Daycare / VPK",
        "Otro",
      ],
    },

    thanksPage: {
      title: "Pago recibido · Automate IT",
      heading: "Tu pago fue procesado.",
      subheading:
        "Nos pondremos en contacto contigo en las próximas 24 horas hábiles para arrancar el setup.",
      bodyIntro:
        "Mientras tanto, te dejamos esto claro:",
      bullets: [
        "Recibirás un email con el resumen de tu compra desde Stripe.",
        "Te escribimos al email registrado para coordinar el kick-off.",
        "Si tienes algo urgente, escríbenos a automateit@yourbizupgraded.com.",
      ],
      backLink: "← Volver a la home",
    },

    errorPage: {
      title: "Algo salió mal · Automate IT",
      heading: "Hubo un problema con tu pago.",
      subheading:
        "No te preocupes: no se cobró nada y tus datos están a salvo.",
      bodyIntro: "Puedes:",
      bullets: [
        "Volver a intentarlo desde la página de planes.",
        "Escribirnos a automateit@yourbizupgraded.com y resolvemos manual.",
      ],
      backLink: "← Volver a la home",
      retryLink: "Ver planes",
    },

    diagnosticoPage: {
      title: "Diagnóstico gratuito · Automate IT",
      backLink: "← Volver a la home",
      heading: "Diagnóstico gratuito · 5 minutos",
      subheading:
        "Cuéntanos un poco sobre tu negocio y el problema más caro. En la primera respuesta tendrás un mapa de qué automatizamos y en qué orden.",
      labels: {
        name: "Tu nombre",
        email: "Email",
        phone: "Teléfono o WhatsApp",
        addressLabel: "Dirección del negocio",
        addressPlaceholder: "Ciudad, Estado (ej: Orlando, FL)",
        bizType: "Tipo de negocio",
        bizTypePlaceholder: "Selecciona tu rubro",
        problem: "El trabajo que más tiempo te quita",
        // El placeholder es el marco en el que la gente responde. El anterior
        // ponía un ejemplo de llamadas perdidas, así que inducía a todos a
        // describir su problema como telefónico — el monotema que se abandonó
        // el 28-jul-2026. Este es neutro de canal a propósito.
        problemPlaceholder:
          "Ej.: cada cotización la escribo a mano, la paso al calendario y después al Excel. Se me va media mañana.",
        bizTypeOptions: [
          { value: "Servicios del hogar", label: "Servicios del hogar / Contratista" },
          { value: "Inmobiliaria", label: "Inmobiliaria" },
          { value: "Salón / Spa", label: "Salón / Spa" },
          { value: "Firma legal / Notaría", label: "Firma legal / Notaría" },
          { value: "Restaurante / Comida", label: "Restaurante / Comida" },
          { value: "Consultor / Freelancer", label: "Consultor / Freelancer" },
          { value: "Otro", label: "Otro" },
        ],
        pain: "¿Por dónde te duele más?",
        painOptions: [
          { value: "solo_yo", label: "Hay cosas que solo puedo hacer yo, y ahí se me va el día" },
          { value: "prioridad", label: "Me llega más de lo que puedo atender y no sé por dónde empezar" },
          { value: "coordinacion", label: "Se me descoordina la operación entre varias personas o etapas" },
        ],
        teamSize: "¿Cuántas personas trabajan en el negocio, contándote?",
        teamSizePlaceholder: "Selecciona",
        teamSizeOptions: [
          { value: "solo", label: "Solo yo" },
          { value: "2_5", label: "2 a 5" },
          { value: "6_15", label: "6 a 15" },
          { value: "16_30", label: "16 a 30" },
          { value: "30_plus", label: "Más de 30" },
        ],
        urgency: "Urgencia",
        urgencyOptions: [
          { value: "now", label: "Para ayer — quiero arrancar ya" },
          { value: "month", label: "Este mes" },
          { value: "quarter", label: "Próximos 3 meses" },
          { value: "exploring", label: "Solo explorando, sin prisa" },
        ],
      },
      hipaaQuestion: "¿Tu negocio maneja información de pacientes?",
      hipaaHint:
        "Historias clínicas, datos de salud o cualquier información protegida bajo HIPAA.",
      outOfScopeHeading: "Gracias por tomarte el tiempo.",
      outOfScopeHipaa:
        "Como manejas información de pacientes, tu caso no sigue el camino normal: antes de proponerte nada tenemos que dejar firmados los acuerdos (BAA) con cada herramienta que vaya a tocar esos datos. Se puede hacer y lo hacemos, pero empieza con una conversación, no con un diagnóstico automático. Te escribimos nosotros para agendarla. No incluimos aquí lo que nos contaste sobre tu operación — eso lo hablamos por un canal apropiado.",
      outOfScopeSize:
        "Con más de 30 personas, lo que tu operación necesita es de otro tamaño y no es lo que hacemos bien. Guardamos tus datos y te escribimos si podemos recomendarte a alguien que sí.",
      submit: "Solicitar diagnóstico",
      submitting: "Enviando…",
      successHeading: "Recibido.",
      successBody:
        "Revisaremos tu información y te contactaremos por email o WhatsApp en menos de 24 horas.",
      errorSubmitFallback:
        "Hubo un problema. Escríbenos a automateit@yourbizupgraded.com",
      privacyDisclaimer:
        "Tus datos no se comparten ni se venden. Los usamos solo para coordinar tu diagnóstico.",
    },

    footer: {
      tagline: "Your business, upgraded.",
      description:
        "Equipos de IA especializados que ejecutan tu operación interna. Tú recuperas el tiempo que tu negocio te robaba.",
      productHeading: "Producto",
      empresaHeading: "Empresa",
      contactHeading: "Contacto",
      productLinks: [
        { label: "Cómo funciona", href: "/#como-funciona" },
        { label: "Agentes", href: "/#agentes" },
        { label: "Planes", href: "/#planes" },
        { label: "Para quién", href: "/#para-quien" },
      ],
      empresaLinks: [
        { label: "Quiénes somos", href: "/quienes-somos" },
        { label: "Diagnóstico", href: "/diagnostico" },
        { label: "Blog", href: "/blog" },
        { label: "Privacidad", href: "/privacy-policy" },
        { label: "Términos", href: "/terms" },
      ],
      // NAP visible: mismo nombre, ciudad y teléfono que el schema y que el
      // perfil de Google. Si cambia uno, tienen que cambiar los tres.
      phoneHref: "+14072145114",
      phonePretty: "(407) 214-5114",
      location: "Orlando, Florida · Atendemos en todo Estados Unidos",
      copyright: "© {year} Automate IT LLC. Todos los derechos reservados.",
      switcherLabel: "Idioma",
      langEs: "ES",
      langEn: "EN",
      // Entrada al portal privado. Va en el pie y no en la navegación principal:
      // es para quien ya es cliente, no para quien está evaluando contratar.
      clientLogin: "Acceso de clientes",
    },

    legal: {
      lastUpdated: "Última actualización:",
      privacy: {
        title: "Política de privacidad",
        sections: [
          {
            heading: "Quién recopila tus datos",
            body: "Este sitio y los servicios asociados son operados por Automate IT LLC. Para cualquier asunto relacionado con tus datos personales puedes contactarnos en automateit@yourbizupgraded.com.",
          },
          {
            heading: "Qué datos recopilamos",
            body: "Recopilamos únicamente los datos que tú nos proporcionas: nombre, teléfono, correo electrónico y los mensajes que nos envías por WhatsApp o a través del formulario web.",
          },
          {
            heading: "Para qué usamos tus datos",
            body: "Usamos tus datos para responder tus consultas, enviarte información sobre nuestro servicio y mejorar nuestros sistemas de automatización.",
          },
          {
            heading: "No vendemos tus datos",
            body: "No vendemos, alquilamos ni compartimos tus datos personales con terceros con fines comerciales.",
          },
          {
            heading: "Eliminación de tus datos",
            body: "Puedes solicitar la eliminación de tus datos en cualquier momento escribiéndonos a automateit@yourbizupgraded.com. Procesaremos tu solicitud lo antes posible.",
          },
        ],
      },
      terms: {
        title: "Términos de servicio",
        sections: [
          {
            heading: "Proveedor del servicio",
            body: "El servicio es provisto por Automate IT LLC, una empresa registrada en el Estado de Florida, Estados Unidos.",
          },
          {
            heading: "Automatización en tu nombre",
            body: "Al contratar el servicio, el cliente acepta que el sistema de automatización de Automate IT responde y actúa en su nombre en los canales configurados (llamadas, WhatsApp, formularios y similares).",
          },
          {
            heading: "Sin garantía de resultados",
            body: "Automate IT no garantiza resultados específicos de ventas ni de negocio. El servicio consiste en la implementación y operación de los sistemas de automatización acordados.",
          },
          {
            heading: "Cancelación",
            body: "El servicio puede ser cancelado por cualquiera de las partes con 30 días de aviso por escrito.",
          },
          {
            heading: "Ley aplicable",
            body: "Estos términos se rigen por las leyes del Estado de Florida, Estados Unidos.",
          },
        ],
      },
    },
  },

  en: {
    siteTitle: "Automate IT — Your business, upgraded.",
    siteDescription:
      "Specialized AI agents run your back-office. Reclaim your time and stop losing leads.",

    nav: {
      logoLabel: "Automate IT — home",
      links: [
        { label: "How it works", href: "/en/#como-funciona" },
        { label: "Agents", href: "/en/#agentes" },
        { label: "Plans", href: "/en/#planes" },
        { label: "Who it's for", href: "/en/#para-quien" },
        { label: "Blog", href: "/en/blog" },
      ],
      cta: "Free diagnostic",
    },

    hero: {
      eyebrow: "A digital team member · From $200/mo",
      h1Line1: "Take back control",
      h1Line2: "of your business.",
      heroPhrases: [
        "of your business.",
        "of your day.",
        "of your calendar.",
        "of your weekends.",
      ],
      subtitle:
        "We add a digital team member who takes over the repetitive work you do today — inside the tools you already use. It's your business: you shouldn't have to do all of it.",
      bullets: [
        "✅ Every customer gets an answer, even when you're busy.",
        "🔁 Follow-up stops depending on your memory.",
        "📂 Information lands where it belongs, on its own.",
      ],
      ctaPrimary: "See where your time is going",
      heroImageAlt:
        "Isometric illustration: WhatsApp, Google Calendar, QuickBooks, HubSpot, Instagram and Gmail stacked as layers of a single system, connected to the team, the warehouse and the day-to-day operation.",
      microcopy:
        "5-minute form. We turn it into your Operations X-Ray. No cost. No commitment.",
      trustBadges: [
        { icon: "🔒", text: "Your data is never sold" },
        { icon: "🤐", text: "Conversations stay private" },
        { icon: "🛡️", text: "Your tools, your accounts" },
        { icon: "⚙️", text: "You decide what we connect" },
      ],
    },

    resultados: {
      eyebrow: "What happens when you don't answer",
      subtitle:
        "The consequence is immediate and measurable. Not opinion — industry data.",
      cards: [
        {
          stat: "62%",
          consequence: "Call the next business on Google. Immediately.",
          source: "411 Locals / getaira.io 2024 · PATLive",
        },
        {
          stat: "85%",
          consequence: "Never try again. Ever.",
          source: "BIA/Kelsey · PATLive · AnswerConnect · Forbes",
        },
        {
          stat: "$126K",
          consequence:
            "Is what the average business loses per year. From missed calls alone. Average — varies by industry (salon ~$35K, dental ~$150K+).",
          source: "AMBS Call Center",
        },
      ],
      disclaimer: "U.S. service industry data, 2024–2026.",
    },

    ribbon: {
      source:
        "Source: MPI Data Hub / NIWAP 2024 · 44.9% of Florida Spanish speakers have limited English proficiency",
    },

    banda: {
      stats: [
        {
          stat: "85%",
          label: "of callers who don't reach a business won't call back",
          source: "PATLive / SchedulingKit 2026",
        },
        {
          stat: "62%",
          label: "of small businesses miss most of their incoming calls",
          source: "411 Locals / getaira.io 2026",
        },
        {
          stat: "5.2M",
          label:
            "people speak Spanish at home in Florida — many need someone to answer in English",
          source: "MPI Data Hub / NIWAP 2024",
        },
        {
          stat: "$126K",
          label:
            "average annual revenue lost by small businesses from missed calls",
          source: "SchedulingKit / Dialzara 2026",
        },
      ],
    },

    dolor: {
      eyebrow: "The before",
      titleLine1: "Your business doesn't need more apps.",
      titleLine2: "It needs the ones you have to work together.",
      cards: [
        {
          eyebrow: "Customers",
          title: "Messages that go unanswered",
          body: "They come in by phone, by WhatsApp, through the form. You're working. By the time you reply, they already called someone else.",
        },
        {
          eyebrow: "Follow-up",
          title: "Customers who asked, and you never called back",
          body: "You quoted, they said they'd think about it, and that was that. Not because you didn't care — because follow-up depends on your memory.",
        },
        {
          eyebrow: "Information",
          title: "The work of moving everything from one place to another",
          body: "Message to calendar. Email to CRM. Quote to spreadsheet. That work shows up in no report, but it's what eats your day.",
        },
      ],
    },

    transformacion: {
      eyebrow: "The transformation",
      titleLine1: "From your first form to your first agent live.",
      titleLine2: "In weeks, not months.",
      steps: [
        {
          n: "01",
          title: "Diagnostic",
          body: "Fill out the diagnostic form — it takes 5 minutes. We turn it into your Operations X-Ray: we review how you work today and pinpoint where your time and customers are leaking. You leave the call knowing exactly where we can help you first.",
        },
        {
          n: "02",
          title: "Implementation",
          body: "We connect your tools, put your processes in order, and get the repetitive work running on its own. We train your team so it works from day one. No migration, and no swapping the tools you already use.",
        },
        {
          n: "03",
          title: "Optimization",
          body: "Your business changes and the system changes with it. We keep tuning processes and adding automations so you grow without the mess growing too.",
        },
      ],
    },

    agentes: {
      eyebrow: "Agents in action",
      title: "Specialized AI teams running your back-office.",
      subtitle:
        "Each agent trained for a specific function. They talk to your systems in real time: CRM, calendar, WhatsApp, email. You see the results; they do the work.",
      terminalTitle: "automate-it · live",
      blocks: [
        {
          prompt: "> agent.tony@receptionist",
          promptCh: 28,
          promptDur: 1.0,
          promptDelay: 0.0,
          lines: [
            { text: "Incoming call: María González", delay: 1.1 },
            {
              before: "Qualifying lead… ",
              ok: "high intent",
              after: "",
              delay: 1.6,
            },
            {
              text: "Booking appointment: Thursday 3pm with Dr. Ramos",
              delay: 2.1,
            },
            {
              before: "",
              ok: "Confirmation sent via WhatsApp",
              after: "",
              delay: 2.6,
            },
          ],
        },
        {
          prompt: "> agent.veronica@followup",
          promptCh: 26,
          promptDur: 0.9,
          promptDelay: 3.4,
          lines: [
            {
              text: "Cold lead detected: Carlos Méndez · 45 days",
              delay: 4.4,
            },
            { text: "Reactivating with 3-email sequence…", delay: 4.9 },
            {
              before: "Replied: ",
              ok: '"Let\'s talk this week"',
              after: "",
              delay: 5.4,
            },
          ],
        },
        {
          prompt: "> agent.marc@admin",
          promptCh: 18,
          promptDur: 0.7,
          promptDelay: 6.0,
          lines: [
            { text: "Processing pending invoices (12)", delay: 6.8 },
            { text: "Reconciling with bank statements…", delay: 7.3 },
            {
              before: "",
              ok: "12 reconciled · 0 discrepancies",
              after: "",
              delay: 7.8,
            },
          ],
        },
      ],
    },

    servicios: {
      eyebrow: "Your digital team",
      titleLine1: "You're not buying software.",
      titleLine2: "You're adding someone who does the work.",
      subtitle:
        "Three members, depending on how much you want to hand off. The first one does. The second also decides. The third also coordinates.",
      planDiagnosticHint:
        "Not sure which one you need? The diagnostic will tell you — it's free.",
      plans: [
        {
          sku: "ASISTENTE",
          name: "Assistant",
          badge: "",
          price: "$200",
          priceUnit: "/mo",
          setup: "Onboarding: $1,000",
          description: "Does it for you. Takes over one full process in your business, start to finish.",
          features: [
            "Answers when you can't",
            "Books appointments without double entry",
            "Saves every contact where it belongs",
            "Remembers and follows up for you",
            "Follows your rules — doesn't decide on its own",
          ],
        },
        {
          sku: "ESTRATEGA",
          name: "Strategist",
          badge: "",
          price: "$400",
          priceUnit: "/mo",
          setup: "Onboarding: $2,000",
          description: "Thinks with you. Up to three connected processes, and makes the repetitive calls on its own.",
          features: [
            "Everything the Assistant does",
            "Decides who to attend to first",
            "Routes each case to the right person",
            "Flags whatever falls outside the norm",
            "Tells you when something needs your judgment",
          ],
        },
        {
          sku: "MANAGER",
          name: "Manager",
          badge: "",
          price: "$600",
          priceUnit: "/mo",
          setup: "Onboarding: $3,000",
          description: "Coordinates for you. Runs a full operation and knows where every case stands.",
          features: [
            "Everything the Strategist does",
            "Carries each case from start to finish",
            "Coordinates across people, areas or locations",
            "Watches deadlines and acts before they hit",
            "Reports the status without being asked",
          ],
        },
      ],
      examplesEyebrow: "Which one do I need?",
      examples: [
        {
          label: "“There are things only I can do”",
          detail: "Repetitive work that depends on you being available",
          total: "Assistant",
        },
        {
          label: "“I don't know who to attend to first”",
          detail: "More contacts coming in than you can prioritize by hand",
          total: "Strategist",
        },
        {
          label: "“The operation falls out of sync”",
          detail: "Several processes and several people, and nobody sees the whole picture",
          total: "Manager",
        },
      ],
      cta: "Book your free diagnosis",
      ctaHint: "The diagnosis tells you which one you need first — whether you do it with us or not.",
      checkoutLabel: "Start here",
      checkoutLoading: "Processing...",
      checkoutError: "Something went wrong. Please try again.",
    },

    bit: {
      tooltip: "Hi, I'm BIT",
      heroLine: "Meet BIT, your operations copilot →",
      anchorLabel: "Learn more about BIT",
      avatarAlt: "BIT, the Automate IT mascot",
      description:
        "BIT is the visible face of your multi-agent system. It coordinates voice, chat, CRM, and marketing, alerts you when something needs your attention, and reports results every morning.",
    },

    chatbot: {
      openLabel: "Open chat with BIT",
      closeLabel: "Close chat",
      headerName: "BIT",
      headerStatus: "Online",
      welcomeMessage:
        "Hi, I'm BIT. I can help you figure out what to automate first in your business. Where do we start?",
      quickActions: [
        { label: "Request diagnostic", href: "/en/diagnostic" },
        { label: "See plans", href: "/en/#planes" },
        { label: "Talk to a human", href: "mailto:automateit@yourbizupgraded.com" },
      ],
      emailPlaceholder: "Your email for the reply",
      inputPlaceholder: "Type your question…",
      sendLabel: "Send",
      successNotice:
        "Got it. We'll reply by email shortly.",
      errorSubmitFallback:
        "Something went wrong. Email us at automateit@yourbizupgraded.com",
    },

    blog: {
      pageTitle: "Blog · Automate IT",
      pageDescription:
        "Concrete ideas for business owners who want to reclaim their time.",
      eyebrow: "Blog",
      heading: "Thoughts on automation",
      subheading:
        "How to use AI in your business, explained simply in 5 minutes — without making you feel dumb for asking.",
      readMore: "Read →",
      byAuthor: "By",
      publishedOn: "Published",
      backToBlog: "← Back to blog",
      noPosts: "We'll publish here soon. In the meantime, drop us a line.",
    },

    faqPrecios: {
      eyebrow: "Pricing FAQ",
      title: "What people always ask",
      faqs: [
        {
          q: "Can I start with the smallest one?",
          a: "Yes, and that's the norm. Almost everyone starts with an Assistant ($1,000 onboarding + $200/mo) handling a single process. When the business asks for more, you move up a level — you don't buy loose pieces.",
        },
        {
          q: "What happens if I exceed 300 minutes or messages?",
          a: "Additional 300-unit blocks are billed. Voice: $35. WhatsApp: $25. CRM: $20. Always full block, never fractions.",
        },
        {
          q: "Is the setup fee refundable?",
          a: "No. It covers configuration, connecting your tools, and testing until it's working. You pay 50% at signing and 50% when the installation is done.",
        },
        {
          q: "Can I cancel anytime?",
          a: "The first 90 days are non-cancellable. From day 91 onward, you cancel with 30 days written notice — no penalty.",
        },
        {
          q: "Do you work with medical practices or businesses that handle patient information?",
          a: "It isn't what we sell by default, but it can be done. A business handling health information needs signed agreements (BAA) with every provider that touches that data, so the system gets built on tools that will sign one — and we sign before touching a single patient record. That changes which platforms we use, not the price. If that's your case, write to us and we'll work through it with you before proposing anything.",
        },
        {
          q: "Can I move up a level later?",
          a: "Yes, anytime. You move up a level when the system has to start deciding or coordinating something it doesn't do today — not when you want more tools. The onboarding difference is quoted separately and the new monthly starts on the next cycle.",
        },
        {
          q: "Does the AI system listen to or store my conversations with clients?",
          a: "No. Automate IT doesn't store or have access to the content of conversations. Call and message data stays in the providers' systems (Retell AI, Twilio) under their own privacy terms, and the accounts are yours.",
        },
        {
          q: "Can I use this service if I'm a lawyer or handle confidential client information?",
          a: "Yes. Florida attorneys are subject to the Florida Bar Rules of Professional Conduct (Rule 1.6 — Confidentiality), which require reasonable measures to protect client information — but don't require specific technical compliance like HIPAA. An Assistant is sufficient for law firms. If you wish, we can configure the agent not to record conversations and to send lead data only to your private CRM.",
        },
        {
          q: "What happens if the agent fails or gives wrong information?",
          a: "The system checks itself every 5 minutes and alerts us if anything stops responding. If the agent makes a mistake, we fix it within 24 business hours. There's always a person behind the system, not an automated ticket.",
        },
        {
          q: "How long does setup take?",
          a: "The system is live within 2 weeks of signing. Week one is configuration, week two is testing with real data before go-live.",
        },
        {
          q: "What do I need to get started?",
          a: "Just an active phone number or WhatsApp line, and 1 hour of your time for the onboarding session. We handle everything else.",
        },
      ],
    },

    paraQuien: {
      eyebrow: "Who it's for",
      titleLine1: "If customers are already coming in",
      titleLine2: "and you're the one holding it all up.",
      subtitle:
        "Built for owners who already have demand: you use three or four tools, you move information between them by hand, and if you take a week off something breaks. If that's your day, we start with what costs you most.",
      footer:
        "This isn't for you if you're still landing your first customers — selling comes first, automating comes after. Nor if you're looking for the cheapest price on the market, or if you want to try AI without changing how you operate. Anything else, let's talk in the diagnostic.",
      painLabel: "What's happening now",
      solutionLabel: "We start with",
      recommendedLabel: "Recommended:",
      rubros: [
        {
          name: "Answering is your bottleneck",
          pain: "Calls and WhatsApp come in while you're with a customer. Either you reply late or they go unanswered.",
          solution:
            "24/7 reception that answers instantly, qualifies the customer, and books in your calendar.",
          tier: "Assistant",
        },
        {
          name: "You're the owner and the receptionist",
          pain: "Every new lead runs through you. Hours of the day go to first contact before you bill a single client.",
          solution:
            "An agent handles the first touch, filters out tire-kickers, and only routes customers ready to talk.",
          tier: "Assistant",
        },
        {
          name: "They call in English and you answer halfway",
          pain: "Your English-speaking customers hang up or go to a competitor because the first conversation feels forced.",
          solution:
            "Bilingual reception that detects the language and responds with the same clarity in English as in Spanish.",
          tier: "Assistant",
        },
        {
          name: "You're losing customers you never knew about",
          pain: "You have no record of how many calls or messages went unanswered while you were working.",
          solution:
            "Every interaction is logged with who, when, and what they asked, and an automatic follow-up closes the loop.",
          tier: "Assistant",
        },
      ],
    },

    ctaFinal: {
      eyebrow: "Free diagnostic",
      titleLine1: "Ready to take back",
      titleLine2: "control of your business?",
      titleLine3: "5 minutes. No commitment.",
      subtitle:
        "Tell us how you work today and we'll tell you what's slowing your growth and what we'd fix first. We contact you within 24 hours with your Operations X-Ray. No hard sell.",
      formNamePlaceholder: "Your name",
      formEmailPlaceholder: "Your email",
      formBizTypePlaceholder: "Business type",
      submitButton: "I want to take back control",
      submitting: "Sending…",
      errorAllFields: "Check the 3 fields before sending.",
      errorSubmitFallback:
        "Something went wrong. Email us at automateit@yourbizupgraded.com",
      successHeading: "Got it.",
      successBody:
        "We'll contact you within 24 hours at the email you provided. Meanwhile, check your spam folder in case our message ends up there.",
      privacyDisclaimer:
        "Your data isn't shared or sold. We only use it to coordinate your diagnostic.",
      businessTypes: [
        "Dental",
        "Legal",
        "Construction / Plumbing",
        "Salon / Spa",
        "Real Estate",
        "Health / Therapy",
        "Daycare / VPK",
        "Other",
      ],
    },

    thanksPage: {
      title: "Payment received · Automate IT",
      heading: "Your payment went through.",
      subheading:
        "We'll reach out within the next 24 business hours to start the setup.",
      bodyIntro: "Meanwhile, a quick heads-up:",
      bullets: [
        "You'll receive a purchase summary email from Stripe.",
        "We'll email you at the address on file to coordinate the kick-off.",
        "If anything is urgent, write to automateit@yourbizupgraded.com.",
      ],
      backLink: "← Back to home",
    },

    errorPage: {
      title: "Something went wrong · Automate IT",
      heading: "There was a problem with your payment.",
      subheading:
        "Don't worry — nothing was charged and your data is safe.",
      bodyIntro: "You can:",
      bullets: [
        "Try again from the plans page.",
        "Email us at automateit@yourbizupgraded.com and we'll resolve it manually.",
      ],
      backLink: "← Back to home",
      retryLink: "See plans",
    },

    diagnosticoPage: {
      title: "Free diagnostic · Automate IT",
      backLink: "← Back to home",
      heading: "Free diagnostic · 5 minutes",
      subheading:
        "Tell us a bit about your business and your most expensive problem. In our first reply you'll get a map of what to automate and in what order.",
      labels: {
        name: "Your name",
        email: "Email",
        phone: "Phone or WhatsApp",
        addressLabel: "Business address",
        addressPlaceholder: "City, State (e.g.: Orlando, FL)",
        bizType: "Business type",
        bizTypePlaceholder: "Select your industry",
        problem: "The work that eats most of your time",
        // Channel-neutral on purpose — see the Spanish note.
        problemPlaceholder:
          "Ex.: I write every estimate by hand, copy it to the calendar, then to a spreadsheet. That's half my morning.",
        // `value` is always the Spanish HubSpot enum; only the label is translated.
        bizTypeOptions: [
          { value: "Servicios del hogar", label: "Home services / Contractor" },
          { value: "Inmobiliaria", label: "Real estate" },
          { value: "Salón / Spa", label: "Salon / Spa" },
          { value: "Firma legal / Notaría", label: "Law firm" },
          { value: "Restaurante / Comida", label: "Restaurant / Food" },
          { value: "Consultor / Freelancer", label: "Consultant / Freelancer" },
          { value: "Otro", label: "Other" },
        ],
        pain: "Where does it hurt most?",
        painOptions: [
          { value: "solo_yo", label: "There are things only I can do, and that's where my day goes" },
          { value: "prioridad", label: "More comes in than I can handle and I don't know where to start" },
          { value: "coordinacion", label: "The operation falls out of sync across people or stages" },
        ],
        teamSize: "How many people work in the business, including you?",
        teamSizePlaceholder: "Select",
        teamSizeOptions: [
          { value: "solo", label: "Just me" },
          { value: "2_5", label: "2 to 5" },
          { value: "6_15", label: "6 to 15" },
          { value: "16_30", label: "16 to 30" },
          { value: "30_plus", label: "More than 30" },
        ],
        urgency: "Urgency",
        urgencyOptions: [
          { value: "now", label: "ASAP — I needed this yesterday" },
          { value: "month", label: "This month" },
          { value: "quarter", label: "Next 3 months" },
          { value: "exploring", label: "Just exploring, no rush" },
        ],
      },
      hipaaQuestion: "Does your business handle patient information?",
      hipaaHint:
        "Medical records, health data, or anything protected under HIPAA.",
      outOfScopeHeading: "Thanks for taking the time.",
      outOfScopeHipaa:
        "Because you handle patient information, your case doesn't follow the normal path: before we propose anything, we need signed agreements (BAA) in place with every tool that will touch that data. It can be done and we do it, but it starts with a conversation, not an automated diagnostic. We'll reach out to schedule it. We didn't keep what you told us about your operation here — we'll cover that over an appropriate channel.",
      outOfScopeSize:
        "With more than 30 people, what your operation needs is a different size of job and not something we do well. We'll keep your details and reach out if we can point you to someone who does.",
      submit: "Request diagnostic",
      submitting: "Sending…",
      successHeading: "Got it.",
      successBody:
        "We'll review your information and reach out via email or WhatsApp within 24 hours.",
      errorSubmitFallback:
        "Something went wrong. Email us at automateit@yourbizupgraded.com",
      privacyDisclaimer:
        "Your data isn't shared or sold. We only use it to coordinate your diagnostic.",
    },

    footer: {
      tagline: "Your business, upgraded.",
      description:
        "Specialized AI teams running your back-office. You reclaim the time your business was stealing from you.",
      productHeading: "Product",
      empresaHeading: "Company",
      contactHeading: "Contact",
      productLinks: [
        { label: "How it works", href: "/en/#como-funciona" },
        { label: "Agents", href: "/en/#agentes" },
        { label: "Plans", href: "/en/#planes" },
        { label: "Who it's for", href: "/en/#para-quien" },
      ],
      empresaLinks: [
        { label: "About us", href: "/en/about" },
        { label: "Diagnostic", href: "/en/diagnostic" },
        { label: "Blog", href: "/en/blog" },
        { label: "Privacy", href: "/en/privacy-policy" },
        { label: "Terms", href: "/en/terms" },
      ],
      phoneHref: "+14072145114",
      phonePretty: "(407) 214-5114",
      location: "Orlando, Florida · Serving the entire United States",
      copyright: "© {year} Automate IT LLC. All rights reserved.",
      switcherLabel: "Language",
      langEs: "ES",
      langEn: "EN",
      clientLogin: "Client login",
    },

    legal: {
      lastUpdated: "Last updated:",
      privacy: {
        title: "Privacy policy",
        sections: [
          {
            heading: "Who collects your data",
            body: "This website and its associated services are operated by Automate IT LLC. For any matter related to your personal data, you can contact us at automateit@yourbizupgraded.com.",
          },
          {
            heading: "What data we collect",
            body: "We only collect the data you provide to us: name, phone number, email address, and the messages you send us via WhatsApp or through the web form.",
          },
          {
            heading: "How we use your data",
            body: "We use your data to respond to your inquiries, send you information about our service, and improve our automation systems.",
          },
          {
            heading: "We don't sell your data",
            body: "We do not sell, rent, or share your personal data with third parties for commercial purposes.",
          },
          {
            heading: "Deleting your data",
            body: "You can request the deletion of your data at any time by writing to us at automateit@yourbizupgraded.com. We will process your request as soon as possible.",
          },
        ],
      },
      terms: {
        title: "Terms of service",
        sections: [
          {
            heading: "Service provider",
            body: "The service is provided by Automate IT LLC, a company registered in the State of Florida, United States.",
          },
          {
            heading: "Automation on your behalf",
            body: "By contracting the service, the client agrees that Automate IT's automation system responds and acts on their behalf across the configured channels (calls, WhatsApp, forms, and similar).",
          },
          {
            heading: "No guarantee of results",
            body: "Automate IT does not guarantee specific sales or business results. The service consists of implementing and operating the agreed automation systems.",
          },
          {
            heading: "Cancellation",
            body: "The service may be cancelled by either party with 30 days' written notice.",
          },
          {
            heading: "Governing law",
            body: "These terms are governed by the laws of the State of Florida, United States.",
          },
        ],
      },
    },
  },
} as const;

export type Translations = typeof translations.es;
