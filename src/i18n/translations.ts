export type Lang = "es" | "en";

export const langs: Lang[] = ["es", "en"];

export const translations = {
  es: {
    siteTitle: "Automate IT — Your business, upgraded.",
    siteDescription:
      "Equipos de IA especializados ejecutan tu back-office. Recupera tu tiempo y deja de perder leads.",

    nav: {
      logoLabel: "Automate IT — inicio",
      links: [
        { label: "Cómo funciona", href: "/#como-funciona" },
        { label: "Agentes", href: "/#agentes" },
        { label: "Paquetes", href: "/#paquetes" },
        { label: "Para quién", href: "/#para-quien" },
        { label: "Blog", href: "/blog" },
      ],
      cta: "Diagnóstico gratuito",
    },

    hero: {
      eyebrow: "Your business, upgraded.",
      h1Line1: "Escala sin contratar.",
      h1Line2: "Automatiza sin código.",
      subtitle:
        "Equipos de IA especializados ejecutan tareas repetitivas, contestan llamadas y dan seguimiento a leads las 24 horas. Tú recuperas las horas que tu negocio te robaba.",
      ctaPrimary: "Diagnóstico gratuito de 30 min",
      ctaSecondary: "Cómo funciona",
      microcopy:
        "Sin compromiso. Sin venta dura. 30 minutos para identificar dónde estás perdiendo tiempo y leads.",
    },

    dolor: {
      eyebrow: "El antes",
      titleLine1: "Dejaste de manejar tu negocio.",
      titleLine2: "Tu negocio te maneja a ti.",
      cards: [
        {
          eyebrow: "Recepción",
          title: "Llamadas que nunca contestaste",
          body: "Cada una era un cliente listo para comprar. Cada una se fue a la competencia mientras tú estabas en otra junta.",
        },
        {
          eyebrow: "Seguimiento",
          title: "Leads que se enfriaron",
          body: "Tu CRM tiene contactos de hace meses. Sin un primer follow-up rápido, ya no te recuerdan.",
        },
        {
          eyebrow: "Operación",
          title: "Horas que se fueron en tareas repetitivas",
          body: "Pegas información de WhatsApp al CRM, del CRM al Excel, del Excel al email. No es operación, es desperdicio.",
        },
      ],
    },

    transformacion: {
      eyebrow: "La transformación",
      titleLine1: "De tu primer call al primer agente operando.",
      titleLine2: "En semanas, no en meses.",
      steps: [
        {
          n: "01",
          title: "Diagnóstico",
          body: "30 minutos sin compromiso. Identificamos dónde se te está yendo el tiempo y los leads. Sales del call con un mapa claro.",
        },
        {
          n: "02",
          title: "Propuesta",
          body: "Plan a medida: qué procesos automatizar, qué agentes los ejecutan, en qué orden. Precio cerrado antes de empezar.",
        },
        {
          n: "03",
          title: "Setup",
          body: "Configuramos los agentes y los conectamos a tus sistemas: CRM, email, calendario, WhatsApp, lo que uses. Sin migrar nada.",
        },
        {
          n: "04",
          title: "Go-live",
          body: "Tu equipo de IA empieza a operar. Métricas reales desde el primer día y ajuste continuo durante el primer mes.",
        },
      ],
    },

    agentes: {
      eyebrow: "Los agentes en acción",
      title: "Equipos de IA especializados ejecutan tu back-office.",
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
      eyebrow: "Servicios individuales",
      titleLine1: "Si solo necesitas un agente,",
      titleLine2: "lo contratas suelto.",
      subtitle:
        "Cada servicio funciona por sí solo o se combina con otros. Sin paquete cerrado, sin compromisos largos.",
      services: [
        {
          sku: "AIT-SVC-001",
          name: "Agente de Voz IA · Inbound",
          price: "$299",
          priceUnit: "/mes",
          description:
            "Recepcionista IA 24/7 que contesta llamadas, agenda citas y filtra leads.",
        },
        {
          sku: "AIT-SVC-002",
          name: "Agente de Voz IA · Outbound",
          price: "$399",
          priceUnit: "/mes",
          description:
            "Llama leads en 60 seg, hace follow-up automático y reduce no-shows hasta 60%.",
        },
        {
          sku: "AIT-SVC-003",
          name: "Chatbot IA · WhatsApp",
          price: "$199",
          priceUnit: "/mes",
          description:
            "Conversaciones 24/7 en WhatsApp, Messenger e Instagram — agenda y cotiza.",
        },
        {
          sku: "AIT-SVC-004",
          name: "CRM + Automatizaciones",
          price: "$249",
          priceUnit: "/mes",
          description:
            "Base de datos, pipeline visual y flujos automáticos para tu operación comercial.",
        },
        {
          sku: "AIT-SVC-005",
          name: "Marketing Automation",
          price: "$229",
          priceUnit: "/mes",
          description:
            "Email + WhatsApp automatizado, nurturing, A/B testing y reportes de ROI.",
        },
      ],
      cta: "Cotizar este servicio",
      packagesHint: "¿Necesitas varios? Mira los paquetes →",
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
        { label: "Ver paquetes", href: "/#paquetes" },
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
        "Sin humo. Solo tácticas, números y mecanismos que ya hemos visto funcionar.",
      readMore: "Leer →",
      byAuthor: "Por",
      publishedOn: "Publicado",
      backToBlog: "← Volver al blog",
      noPosts: "Pronto publicaremos aquí. Mientras tanto, escríbenos.",
    },

    paquetes: {
      eyebrow: "Paquetes",
      titleLine1: "Escogemos los agentes que tu negocio necesita.",
      titleLine2: "No los que sobran.",
      subtitle:
        "El equipo se arma según tu operación, no según una plantilla. Empezamos chico, escalamos cuando los números lo justifican.",
      footer:
        "Precios cerrados antes de empezar. Setup incluido. Sin permanencia mínima en Starter ni Growth.",
      tiers: [
        {
          name: "Starter",
          tagline: "Solo o equipo de 1–2",
          price: "$449",
          priceUnit: "/mes",
          description:
            "Cubre lo que se te está perdiendo todos los días: llamadas, primeros follow-ups, agenda.",
          features: [
            "Recepción de llamadas con calificación de leads",
            "Primer follow-up en menos de 5 minutos",
            "Agendamiento automático en tu calendario",
            "Conexión con tu WhatsApp y email actuales",
          ],
          cta: "Empezar con Starter",
          badge: null,
        },
        {
          name: "Growth",
          tagline: "Equipo de 3–10",
          price: "$649",
          priceUnit: "/mes",
          description:
            "Suma agentes de seguimiento de oportunidades y reportes operativos al día.",
          features: [
            "Todo lo de Starter",
            "Seguimiento multi-touch en pipeline",
            "Reportes diarios con métricas clave",
            "Workflows custom según tu rubro",
          ],
          cta: "Empezar con Growth",
          badge: "Más popular",
        },
        {
          name: "Scale",
          tagline: "Equipo de 10+",
          price: "$899",
          priceUnit: "/mes",
          description:
            "Equipo ampliado de agentes operando en múltiples canales con integraciones profundas.",
          features: [
            "Todo lo de Growth",
            "Multi-canal: voz, WhatsApp, web, email",
            "Integraciones profundas con tu stack",
            "Implementación dedicada y onboarding del equipo",
          ],
          cta: "Empezar con Scale",
          badge: "Mejor valor",
        },
        {
          name: "Enterprise",
          tagline: "Operación compleja o regulada",
          price: "Solicitar",
          priceUnit: "cotización",
          description:
            "Sistema multi-agente custom. SLA, compliance, success engineer dedicado.",
          features: [
            "Sistema multi-agente diseñado a medida",
            "Compliance: HIPAA, datos sensibles, residencia",
            "SLA contractual y soporte prioritario",
            "Success engineer dedicado durante el primer año",
          ],
          cta: "Hablar con ventas",
          badge: null,
        },
      ],
    },

    paraQuien: {
      eyebrow: "Para quién es esto",
      titleLine1: "Si tu negocio depende de citas, leads o follow-up,",
      titleLine2: "esto es para ti.",
      subtitle:
        "Construido para dueños de negocios de servicios con equipos chicos. Empezamos por el dolor más caro y escalamos cuando ves resultados.",
      footer:
        "¿No estás en esta lista? Si tu operación tiene calendario, leads y follow-up, probablemente podemos ayudarte. Cuéntanos en el diagnóstico.",
      painLabel: "Tu día se va en",
      solutionLabel: "Empezamos por",
      recommendedLabel: "Recomendado:",
      rubros: [
        {
          name: "Dental",
          pain: "Pacientes que no confirman cita y huecos en la agenda.",
          solution:
            "Recordatorios + reagendamiento + lista de espera automática que llena los huecos.",
          tier: "Starter",
        },
        {
          name: "Legal",
          pain: "Consultas que se dispersan en email y casos sin triage.",
          solution:
            "Triage de consultas, agenda de calls y follow-up al cliente entre etapas.",
          tier: "Growth",
        },
        {
          name: "Construcción y Plomería",
          pain: "Llamadas perdidas mientras estás en obra.",
          solution:
            "Recepción 24/7, cotización rápida según tipo de trabajo, agenda en tu calendario.",
          tier: "Starter",
        },
        {
          name: "Salón y Spa",
          pain: "No-shows, cancelaciones y huecos imposibles de llenar.",
          solution:
            "Confirmaciones automáticas, lista de espera y reagendamiento en un solo flujo.",
          tier: "Starter",
        },
        {
          name: "Inmobiliaria",
          pain: "Leads que se enfrían en menos de 24 horas si no respondes.",
          solution:
            "Calificación inicial, tour virtual o presencial agendado, nurture multi-touch.",
          tier: "Growth",
        },
        {
          name: "Salud y terapia",
          pain: "Admin que come horas que deberías estar atendiendo pacientes.",
          solution:
            "Agenda, recordatorios, intake forms previo a la sesión y cobro recurrente.",
          tier: "Starter",
        },
        {
          name: "Daycares / VPK",
          pain: "Padres llamando todo el día, pagos manuales, listas de espera en papel.",
          solution:
            "Recepción IA que contesta, agenda tours, confirma pagos y gestiona lista de espera.",
          tier: "Starter",
        },
      ],
    },

    ctaFinal: {
      eyebrow: "Diagnóstico gratuito",
      titleLine1: "30 minutos.",
      titleLine2: "Sin compromiso.",
      titleLine3: "Sales con un mapa, no con una cotización.",
      subtitle:
        "Te contactamos en menos de 24 horas para agendar el call. Hablamos de tu operación, identificamos los 2–3 procesos más caros, te decimos qué automatizamos primero. Sin venta dura.",
      formNamePlaceholder: "Tu nombre",
      formEmailPlaceholder: "Tu email",
      formBizTypePlaceholder: "Tipo de negocio",
      submitButton: "Solicitar diagnóstico gratuito",
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

    diagnosticoPage: {
      title: "Diagnóstico gratuito · Automate IT",
      backLink: "← Volver a la home",
      heading: "Diagnóstico gratuito de 30 minutos",
      subheading:
        "Cuéntanos un poco sobre tu negocio y el problema más caro. En la primera respuesta tendrás un mapa de qué automatizamos y en qué orden.",
      labels: {
        name: "Tu nombre",
        email: "Email",
        phone: "Teléfono o WhatsApp",
        bizType: "Tipo de negocio",
        bizTypePlaceholder: "Selecciona tu rubro",
        problem: "El problema más caro de tu día",
        problemPlaceholder:
          "Ej.: pierdo 4 llamadas al día porque estoy en consultas. Cada una vale entre $200 y $800.",
        urgency: "Urgencia",
        urgencyOptions: [
          { value: "now", label: "Para ayer — quiero arrancar ya" },
          { value: "month", label: "Este mes" },
          { value: "quarter", label: "Próximos 3 meses" },
          { value: "exploring", label: "Solo explorando, sin prisa" },
        ],
      },
      submit: "Solicitar diagnóstico",
      submitting: "Enviando…",
      successHeading: "Recibido.",
      successBody:
        "Te contactamos en menos de 24 horas al email y/o WhatsApp que dejaste para agendar el call.",
      errorSubmitFallback:
        "Hubo un problema. Escríbenos a automateit@yourbizupgraded.com",
      privacyDisclaimer:
        "Tus datos no se comparten ni se venden. Los usamos solo para coordinar tu diagnóstico.",
    },

    footer: {
      tagline: "Your business, upgraded.",
      description:
        "Equipos de IA especializados que ejecutan tu back-office. Tú recuperas el tiempo que tu negocio te robaba.",
      productHeading: "Producto",
      empresaHeading: "Empresa",
      contactHeading: "Contacto",
      productLinks: [
        { label: "Cómo funciona", href: "/#como-funciona" },
        { label: "Agentes", href: "/#agentes" },
        { label: "Paquetes", href: "/#paquetes" },
        { label: "Para quién", href: "/#para-quien" },
      ],
      empresaLinks: [
        { label: "Diagnóstico", href: "/diagnostico" },
        { label: "Blog", href: "/blog" },
        { label: "Privacidad", href: "/privacidad" },
        { label: "Términos", href: "/terminos" },
      ],
      copyright: "© {year} Automate IT. Todos los derechos reservados.",
      switcherLabel: "Idioma",
      langEs: "ES",
      langEn: "EN",
    },

    legal: {
      lastUpdated: "Última actualización:",
      privacy: {
        title: "Política de privacidad",
        sections: [
          {
            heading: "Resumen",
            body: "Recopilamos solo los datos que tú nos das (nombre, email, teléfono, descripción de tu operación) para coordinar tu diagnóstico y, si decides contratarnos, configurar tus agentes. No vendemos ni compartimos esa información con terceros con fines comerciales.",
          },
          {
            heading: "Qué datos recopilamos",
            body: "Datos de contacto que tú nos compartes vía formularios (nombre, email, teléfono, tipo de negocio, descripción del problema). Datos técnicos básicos del navegador (analytics agregado, sin perfilado individual). No usamos cookies de seguimiento de terceros.",
          },
          {
            heading: "Cómo los usamos",
            body: "Para responder tu solicitud, agendar el diagnóstico, enviarte la propuesta. Si te volvemos cliente, los datos se usan para configurar y operar los agentes contratados. No usamos tus datos para entrenar modelos generales de IA — el conocimiento de tu negocio queda contigo.",
          },
          {
            heading: "Con quién los compartimos",
            body: "Subprocesadores estrictamente necesarios para operar el servicio (proveedor de email transaccional, infraestructura de los agentes, CRM interno). Lista completa disponible bajo solicitud. Compliance de los subprocesadores revisado anualmente.",
          },
          {
            heading: "Tus derechos",
            body: "Puedes pedir copia de tus datos, corrección, eliminación o portabilidad escribiendo a automateit@yourbizupgraded.com. Respondemos en menos de 30 días.",
          },
          {
            heading: "Compliance regulado",
            body: "Para clientes en healthcare ofrecemos BAA bajo HIPAA. Para clientes con datos sensibles otros, definimos arreglos contractuales caso por caso.",
          },
          {
            heading: "Contacto",
            body: "Cualquier duda sobre privacidad: automateit@yourbizupgraded.com.",
          },
        ],
        legalReviewNote:
          "Este documento es una plantilla pendiente de revisión legal antes del go-live público.",
      },
      terms: {
        title: "Términos de servicio",
        sections: [
          {
            heading: "Aceptación",
            body: "Al usar este sitio o cualquier servicio de Automate IT aceptas estos términos. Si no estás de acuerdo, no uses el servicio.",
          },
          {
            heading: "Descripción del servicio",
            body: "Automate IT diseña, implementa y opera agentes de IA que ejecutan tareas operativas para tu negocio (recepción de llamadas, follow-up, administración, integración con tus sistemas). El alcance específico se define en la propuesta firmada con cada cliente.",
          },
          {
            heading: "Suscripción y facturación",
            body: "Los planes Starter, Growth y Scale se facturan mensualmente por adelantado. Sin permanencia mínima en Starter y Growth: cancelas con 30 días de aviso y la suscripción termina al final del período pagado. Enterprise se rige por contrato dedicado.",
          },
          {
            heading: "Setup y entregables",
            body: "El setup inicial está incluido en el precio. El cronograma típico es 2–4 semanas hasta go-live, dependiendo de la complejidad de las integraciones. Cualquier extensión de alcance se cotiza por separado.",
          },
          {
            heading: "Disponibilidad y SLA",
            body: "Mejor esfuerzo en Starter, Growth y Scale. SLA contractual con compensación en Enterprise. Mantenimientos planificados se notifican con 48 horas de anticipación.",
          },
          {
            heading: "Propiedad intelectual",
            body: "Tus datos y configuraciones operativas son tuyos. Los agentes, prompts, código y arquitectura desarrollados son propiedad de Automate IT, licenciados a ti durante la suscripción activa.",
          },
          {
            heading: "Limitación de responsabilidad",
            body: "Hacemos lo posible por que los agentes operen correctamente, pero no garantizamos resultados específicos de negocio. La responsabilidad de Automate IT está limitada al monto facturado en los últimos 12 meses.",
          },
          {
            heading: "Cambios a estos términos",
            body: "Si modificamos estos términos te avisamos con 30 días de anticipación al email registrado.",
          },
          {
            heading: "Contacto",
            body: "automateit@yourbizupgraded.com.",
          },
        ],
        legalReviewNote:
          "Este documento es una plantilla pendiente de revisión legal antes del go-live público.",
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
        { label: "Plans", href: "/en/#paquetes" },
        { label: "Who it's for", href: "/en/#para-quien" },
        { label: "Blog", href: "/en/blog" },
      ],
      cta: "Free diagnostic",
    },

    hero: {
      eyebrow: "Your business, upgraded.",
      h1Line1: "Scale without hiring.",
      h1Line2: "Automate without code.",
      subtitle:
        "Specialized AI agents handle repetitive tasks, answer calls, and follow up with leads 24/7. You reclaim the hours your business was stealing from you.",
      ctaPrimary: "Free 30-minute diagnostic",
      ctaSecondary: "How it works",
      microcopy:
        "No commitment. No hard sell. 30 minutes to identify where you're losing time and leads.",
    },

    dolor: {
      eyebrow: "The before",
      titleLine1: "You stopped running your business.",
      titleLine2: "Your business runs you.",
      cards: [
        {
          eyebrow: "Reception",
          title: "Calls you never answered",
          body: "Each one was a customer ready to buy. Each one went to the competitor while you were in another meeting.",
        },
        {
          eyebrow: "Follow-up",
          title: "Leads that went cold",
          body: "Your CRM has contacts from months ago. Without a quick first follow-up, they don't remember you anymore.",
        },
        {
          eyebrow: "Operations",
          title: "Hours lost to repetitive tasks",
          body: "Pasting info from WhatsApp to CRM, CRM to Excel, Excel to email. That's not operations, it's waste.",
        },
      ],
    },

    transformacion: {
      eyebrow: "The transformation",
      titleLine1: "From your first call to your first agent live.",
      titleLine2: "In weeks, not months.",
      steps: [
        {
          n: "01",
          title: "Diagnostic",
          body: "30 minutes, no commitment. We identify where your time and leads are leaking. You leave the call with a clear map.",
        },
        {
          n: "02",
          title: "Proposal",
          body: "Tailored plan: which processes to automate, which agents run them, in what order. Fixed price before we start.",
        },
        {
          n: "03",
          title: "Setup",
          body: "We configure the agents and connect them to your stack: CRM, email, calendar, WhatsApp, whatever you use. No migration needed.",
        },
        {
          n: "04",
          title: "Go-live",
          body: "Your AI team starts operating. Real metrics from day one and ongoing tuning during the first month.",
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
            { text: "Incoming call: Maria Gonzalez", delay: 1.1 },
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
              text: "Cold lead detected: Carlos Mendez · 45 days",
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
      eyebrow: "Individual services",
      titleLine1: "If you just need one agent,",
      titleLine2: "you can hire it standalone.",
      subtitle:
        "Each service works on its own or combined with others. No bundled plan, no long-term commitments.",
      services: [
        {
          sku: "AIT-SVC-001",
          name: "Voice AI Agent · Inbound",
          price: "$299",
          priceUnit: "/mo",
          description:
            "24/7 AI receptionist that answers calls, books appointments, and filters leads.",
        },
        {
          sku: "AIT-SVC-002",
          name: "Voice AI Agent · Outbound",
          price: "$399",
          priceUnit: "/mo",
          description:
            "Calls leads in 60 seconds, runs automatic follow-up, and cuts no-shows up to 60%.",
        },
        {
          sku: "AIT-SVC-003",
          name: "AI Chatbot · WhatsApp",
          price: "$199",
          priceUnit: "/mo",
          description:
            "24/7 conversations on WhatsApp, Messenger, and Instagram — books and quotes.",
        },
        {
          sku: "AIT-SVC-004",
          name: "CRM + Automations",
          price: "$249",
          priceUnit: "/mo",
          description:
            "Database, visual pipeline, and automated flows for your sales operation.",
        },
        {
          sku: "AIT-SVC-005",
          name: "Marketing Automation",
          price: "$229",
          priceUnit: "/mo",
          description:
            "Automated email + WhatsApp, nurturing, A/B testing, and ROI reports.",
        },
      ],
      cta: "Get a quote",
      packagesHint: "Need several? See the plans →",
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
        { label: "See plans", href: "/en/#paquetes" },
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
        "No fluff. Just tactics, numbers, and mechanisms we've seen work.",
      readMore: "Read →",
      byAuthor: "By",
      publishedOn: "Published",
      backToBlog: "← Back to blog",
      noPosts: "We'll publish here soon. In the meantime, drop us a line.",
    },

    paquetes: {
      eyebrow: "Plans",
      titleLine1: "We pick the agents your business needs.",
      titleLine2: "Not the ones it doesn't.",
      subtitle:
        "The team is built around your operation, not a template. We start small and scale when the numbers justify it.",
      footer:
        "Fixed pricing before starting. Setup included. No minimum commitment on Starter or Growth.",
      tiers: [
        {
          name: "Starter",
          tagline: "Solo or 1–2 person team",
          price: "$449",
          priceUnit: "/mo",
          description:
            "Covers what you're losing every day: calls, first follow-ups, scheduling.",
          features: [
            "Call reception with lead qualification",
            "First follow-up in under 5 minutes",
            "Automatic booking on your calendar",
            "Connects to your existing WhatsApp and email",
          ],
          cta: "Start with Starter",
          badge: null,
        },
        {
          name: "Growth",
          tagline: "Team of 3–10",
          price: "$649",
          priceUnit: "/mo",
          description:
            "Adds opportunity follow-up agents and daily operational reports.",
          features: [
            "Everything in Starter",
            "Multi-touch follow-up across pipeline",
            "Daily reports with key metrics",
            "Custom workflows for your industry",
          ],
          cta: "Start with Growth",
          badge: "Most popular",
        },
        {
          name: "Scale",
          tagline: "Team of 10+",
          price: "$899",
          priceUnit: "/mo",
          description:
            "Extended team of agents operating across multiple channels with deep integrations.",
          features: [
            "Everything in Growth",
            "Multi-channel: voice, WhatsApp, web, email",
            "Deep integrations with your stack",
            "Dedicated implementation and team onboarding",
          ],
          cta: "Start with Scale",
          badge: "Best value",
        },
        {
          name: "Enterprise",
          tagline: "Complex or regulated operation",
          price: "Request",
          priceUnit: "quote",
          description:
            "Custom multi-agent system. SLA, compliance, dedicated success engineer.",
          features: [
            "Multi-agent system designed to spec",
            "Compliance: HIPAA, sensitive data, residency",
            "Contractual SLA and priority support",
            "Dedicated success engineer for the first year",
          ],
          cta: "Talk to sales",
          badge: null,
        },
      ],
    },

    paraQuien: {
      eyebrow: "Who it's for",
      titleLine1: "If your business runs on appointments, leads, or follow-up,",
      titleLine2: "this is for you.",
      subtitle:
        "Built for service business owners with small teams. We start with the most expensive pain and scale when you see results.",
      footer:
        "Not on this list? If your operation has a calendar, leads, and follow-up, we can probably help. Tell us in the diagnostic.",
      painLabel: "Your day is lost to",
      solutionLabel: "We start with",
      recommendedLabel: "Recommended:",
      rubros: [
        {
          name: "Dental",
          pain: "Patients who don't confirm appointments and gaps in the schedule.",
          solution:
            "Reminders + reschedule + automatic waitlist that fills the gaps.",
          tier: "Starter",
        },
        {
          name: "Legal",
          pain: "Inquiries scattered across email and cases without triage.",
          solution:
            "Inquiry triage, call scheduling, and client follow-up between stages.",
          tier: "Growth",
        },
        {
          name: "Construction & Plumbing",
          pain: "Calls missed while you're on the job site.",
          solution:
            "24/7 reception, fast quote based on job type, scheduled in your calendar.",
          tier: "Starter",
        },
        {
          name: "Salon & Spa",
          pain: "No-shows, cancellations, and gaps that are hard to fill.",
          solution:
            "Automatic confirmations, waitlist, and rescheduling in one flow.",
          tier: "Starter",
        },
        {
          name: "Real Estate",
          pain: "Leads that go cold in less than 24 hours if you don't reply.",
          solution:
            "Initial qualification, virtual or in-person tour booking, multi-touch nurture.",
          tier: "Growth",
        },
        {
          name: "Health & Therapy",
          pain: "Admin work eating into hours you should be seeing patients.",
          solution:
            "Scheduling, reminders, pre-session intake forms, and recurring billing.",
          tier: "Starter",
        },
        {
          name: "Daycares / VPK",
          pain: "Parents calling all day, manual payments, waitlists on paper.",
          solution:
            "AI reception that answers, schedules tours, confirms payments, and manages the waitlist.",
          tier: "Starter",
        },
      ],
    },

    ctaFinal: {
      eyebrow: "Free diagnostic",
      titleLine1: "30 minutes.",
      titleLine2: "No commitment.",
      titleLine3: "You leave with a map, not a sales pitch.",
      subtitle:
        "We contact you within 24 hours to schedule the call. We talk about your operation, identify the 2–3 most expensive processes, and tell you what to automate first. No hard sell.",
      formNamePlaceholder: "Your name",
      formEmailPlaceholder: "Your email",
      formBizTypePlaceholder: "Business type",
      submitButton: "Request free diagnostic",
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

    diagnosticoPage: {
      title: "Free diagnostic · Automate IT",
      backLink: "← Back to home",
      heading: "Free 30-minute diagnostic",
      subheading:
        "Tell us a bit about your business and your most expensive problem. In our first reply you'll get a map of what to automate and in what order.",
      labels: {
        name: "Your name",
        email: "Email",
        phone: "Phone or WhatsApp",
        bizType: "Business type",
        bizTypePlaceholder: "Select your industry",
        problem: "The most expensive problem in your day",
        problemPlaceholder:
          "Ex.: I miss 4 calls a day because I'm with patients. Each one is worth $200–$800.",
        urgency: "Urgency",
        urgencyOptions: [
          { value: "now", label: "ASAP — I needed this yesterday" },
          { value: "month", label: "This month" },
          { value: "quarter", label: "Next 3 months" },
          { value: "exploring", label: "Just exploring, no rush" },
        ],
      },
      submit: "Request diagnostic",
      submitting: "Sending…",
      successHeading: "Got it.",
      successBody:
        "We'll contact you within 24 hours at the email and/or WhatsApp you provided to book the call.",
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
        { label: "Plans", href: "/en/#paquetes" },
        { label: "Who it's for", href: "/en/#para-quien" },
      ],
      empresaLinks: [
        { label: "Diagnostic", href: "/en/diagnostic" },
        { label: "Blog", href: "/en/blog" },
        { label: "Privacy", href: "/en/privacy" },
        { label: "Terms", href: "/en/terms" },
      ],
      copyright: "© {year} Automate IT. All rights reserved.",
      switcherLabel: "Language",
      langEs: "ES",
      langEn: "EN",
    },

    legal: {
      lastUpdated: "Last updated:",
      privacy: {
        title: "Privacy policy",
        sections: [
          {
            heading: "Summary",
            body: "We only collect the data you give us (name, email, phone, description of your operation) to coordinate your diagnostic and, if you decide to hire us, configure your agents. We don't sell or share that information with third parties for commercial purposes.",
          },
          {
            heading: "What data we collect",
            body: "Contact data you share via forms (name, email, phone, business type, problem description). Basic technical browser data (aggregate analytics, no individual profiling). We don't use third-party tracking cookies.",
          },
          {
            heading: "How we use it",
            body: "To respond to your request, schedule the diagnostic, send you the proposal. If you become a client, the data is used to configure and operate the contracted agents. We don't use your data to train general AI models — your business knowledge stays with you.",
          },
          {
            heading: "Who we share it with",
            body: "Subprocessors strictly required to operate the service (transactional email provider, agent infrastructure, internal CRM). Full list available on request. Subprocessor compliance is reviewed annually.",
          },
          {
            heading: "Your rights",
            body: "You can request a copy of your data, correction, deletion, or portability by writing to automateit@yourbizupgraded.com. We respond within 30 days.",
          },
          {
            heading: "Regulated compliance",
            body: "For healthcare clients we offer BAA under HIPAA. For other clients with sensitive data, we set up case-by-case contractual arrangements.",
          },
          {
            heading: "Contact",
            body: "Any privacy questions: automateit@yourbizupgraded.com.",
          },
        ],
        legalReviewNote:
          "This document is a template pending legal review before public go-live.",
      },
      terms: {
        title: "Terms of service",
        sections: [
          {
            heading: "Acceptance",
            body: "By using this site or any Automate IT service you accept these terms. If you don't agree, don't use the service.",
          },
          {
            heading: "Service description",
            body: "Automate IT designs, implements, and operates AI agents that execute operational tasks for your business (call reception, follow-up, admin, integration with your systems). The specific scope is defined in the proposal signed with each client.",
          },
          {
            heading: "Subscription and billing",
            body: "Starter, Growth, and Scale plans are billed monthly in advance. No minimum commitment on Starter or Growth: cancel with 30 days notice and the subscription ends at the end of the paid period. Enterprise is governed by a dedicated contract.",
          },
          {
            heading: "Setup and deliverables",
            body: "Initial setup is included in the price. Typical timeline is 2–4 weeks to go-live, depending on integration complexity. Any scope extension is quoted separately.",
          },
          {
            heading: "Availability and SLA",
            body: "Best effort on Starter, Growth, and Scale. Contractual SLA with compensation on Enterprise. Planned maintenance is announced 48 hours in advance.",
          },
          {
            heading: "Intellectual property",
            body: "Your data and operational configurations are yours. The agents, prompts, code, and architecture developed are owned by Automate IT, licensed to you during active subscription.",
          },
          {
            heading: "Limitation of liability",
            body: "We do our best to ensure agents operate correctly, but we don't guarantee specific business outcomes. Automate IT's liability is limited to the amount billed in the last 12 months.",
          },
          {
            heading: "Changes to these terms",
            body: "If we modify these terms we'll notify you 30 days in advance at the registered email.",
          },
          {
            heading: "Contact",
            body: "automateit@yourbizupgraded.com.",
          },
        ],
        legalReviewNote:
          "This document is a template pending legal review before public go-live.",
      },
    },
  },
} as const;

export type Translations = typeof translations.es;
