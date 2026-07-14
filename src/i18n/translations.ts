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
      eyebrow: "Recepcionista IA para negocios en Florida · Desde $198/mes",
      h1Line1: "Mientras tú trabajas,",
      h1Line2: "nosotros contestamos.",
      subtitle:
        "El teléfono, el WhatsApp y el chat de tu negocio — contestando solos, en un solo sistema. Yo te lo instalo; tú enciendes el switch.",
      bullets: [
        "📞 Contesta llamadas mientras atiendes a tus clientes.",
        "💬 Responde WhatsApp mientras estás con tu familia.",
        "🗓️ Agenda citas mientras estás dormido.",
      ],
      ctaPrimary: "Agenda tu diagnóstico gratuito",
      microcopy: "Formulario de 5 minutos. Sin costo. Sin compromiso.",
      trustBadges: [
        { icon: "🔒", text: "Tus datos no se venden" },
        { icon: "🤐", text: "Conversaciones privadas" },
        { icon: "🛡️", text: "HIPAA-compliant disponible" },
        { icon: "⚙️", text: "Sin acceso a tu información personal" },
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
      titleLine1: "Si no contestas rápido,",
      titleLine2: "el siguiente negocio en Google sí lo hace.",
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
      titleLine1: "De tu primer formulario al primer agente operando.",
      titleLine2: "En semanas, no en meses.",
      steps: [
        {
          n: "01",
          title: "Diagnóstico",
          body: "Completas un formulario de 5 minutos. Te llamamos en menos de 24 horas para revisar tu operación e identificar dónde se te está yendo el tiempo y los leads. Sales de la llamada con un mapa claro.",
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
      eyebrow: "Planes y canales",
      titleLine1: "Elige tu plan base.",
      titleLine2: "Activa tus canales.",
      subtitle:
        "Empieza con el plan correcto y suma los módulos que tu negocio necesita. Sin paquete cerrado.",
      planDiagnosticHint:
        "¿No sabes si este plan es para ti? El diagnóstico te lo dice — es gratis.",
      plans: [
        {
          sku: "STARTER",
          name: "Plan Starter",
          badge: "",
          price: "$99",
          priceUnit: "/mes",
          setup: "Setup único: $199",
          description: "Para negocios que no manejan datos de salud.",
          features: [
            "Onboarding + configuración inicial",
            "Soporte básico por email",
            "Reporte mensual de uso",
            "Compatible con todos los módulos",
          ],
        },
        {
          sku: "PROFESSIONAL",
          name: "Plan Professional",
          badge: "HIPAA ✓",
          price: "$179",
          priceUnit: "/mes",
          setup: "Setup único: $349",
          description: "Para negocios que requieren cumplimiento HIPAA.",
          features: [
            "Todo lo del plan Starter",
            "Gestión de BAAs con Retell AI, Cal.com y Twilio",
            "Configuración HIPAA-compliant de todos los módulos",
            "Soporte prioritario — respuesta en 24h hábiles",
            "Auditoría de configuración trimestral",
          ],
        },
      ],
      modulesEyebrow: "Módulos de canal",
      modulesSubtitle:
        "Un canal es la forma en que tus clientes te contactan: voz, WhatsApp, Messenger / web chat o CRM. Se suma a cualquier plan base — tú activas solo los que tu negocio usa. Cada módulo incluye 300 minutos o mensajes al mes.",
      moduleDiagnosticHint:
        "¿Dudas si este canal te sirve? El diagnóstico te lo dice — es gratis.",
      modules: [
        {
          sku: "VOZ",
          name: "Voz (Retell AI)",
          hipaa: true,
          priceStarter: "+$149/mes",
          pricePro: "+$149/mes",
          setupStarter: "Setup +$149",
          setupPro: "Setup +$199",
          description: "Agente que contesta llamadas 24/7 y agenda citas en tiempo real.",
        },
        {
          sku: "WHATSAPP",
          name: "WhatsApp",
          hipaa: true,
          priceStarter: "+$99/mes",
          pricePro: "+$99/mes",
          setupStarter: "Setup +$99",
          setupPro: "Setup +$149",
          description: "Chatbot que agenda citas o captura leads por WhatsApp 24/7.",
        },
        {
          sku: "MESSENGER",
          name: "Messenger / Web chat",
          hipaa: false,
          hipaaNote: "No recomendado con Plan Professional",
          priceStarter: "+$79/mes",
          pricePro: "No recomendado",
          setupStarter: "Setup +$79",
          setupPro: "Setup +$99",
          description: "Chatbot en Facebook Messenger o integrado en tu sitio web.",
        },
        {
          sku: "CRM",
          name: "CRM & Leads",
          hipaa: true,
          priceStarter: "+$99/mes",
          pricePro: "+$99/mes",
          setupStarter: "Setup +$99",
          setupPro: "Setup +$149",
          description: "Captura estructurada de leads. HubSpot (Starter) o Airtable BAA (Professional).",
        },
      ],
      examplesEyebrow: "Ejemplos de precio total",
      examples: [
        { label: "Salón de belleza · Solo WhatsApp", total: "$198/mes", detail: "Starter $99 + WhatsApp $99" },
        { label: "Contratista · Voz", total: "$248/mes", detail: "Starter $99 + Voz $149" },
        { label: "Negocio regulado · Voz HIPAA", total: "$328/mes", detail: "Professional $179 + Voz $149" },
        { label: "Realtor · Voz + WhatsApp + CRM", total: "$446/mes", detail: "Starter $99 + Voz $149 + WhatsApp $99 + CRM $99" },
      ],
      cta: "Agenda tu diagnóstico gratuito",
      ctaHint: "¿No sabes qué módulos necesitas? El diagnóstico te lo dice.",
      checkoutLabel: "Empezar ahora",
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
          q: "¿Puedo empezar solo con un módulo?",
          a: "Sí. El plan base ($99 Starter o $179 Professional) requiere al menos 1 módulo activo. Puedes empezar con WhatsApp por $99/mes adicional y agregar voz o CRM después.",
        },
        {
          q: "¿Qué pasa si supero los 300 minutos o mensajes?",
          a: "Se facturan bloques adicionales de 300 unidades. Voz: $35 (Starter) / $40 (Professional). WhatsApp: $25/$30. CRM: $20/$25. Siempre bloque completo, nunca fracciones.",
        },
        {
          q: "¿El setup fee es reembolsable?",
          a: "No. Cubre 4-8 horas de configuración, integración y pruebas por módulo activo. Se paga una sola vez al firmar.",
        },
        {
          q: "¿Puedo cancelar cuando quiera?",
          a: "Los primeros 90 días no son cancelables. Del día 91 en adelante, cancelas con 30 días de aviso escrito sin penalidad.",
        },
        {
          q: "¿Qué es HIPAA y por qué importa?",
          a: "HIPAA es la ley federal de EE.UU. que protege la información de salud de los pacientes. Si tu negocio maneja información de pacientes o datos de salud regulados, necesitas el Plan Professional — garantiza que Retell AI, Cal.com y Twilio operen bajo BAA firmado. Automate IT no custodia información de pacientes (PHI) en ningún caso.",
        },
        {
          q: "¿Puedo agregar módulos después de firmar?",
          a: "Sí, en cualquier momento. El costo se prorratea al ciclo de facturación vigente. Para eliminar un módulo necesitas 15 días de aviso y solo se procesa al inicio del siguiente ciclo.",
        },
        {
          q: "¿El sistema de IA escucha o guarda mis conversaciones con clientes?",
          a: "No. Automate IT no almacena ni tiene acceso al contenido de las conversaciones. Los datos de llamadas y mensajes quedan en los sistemas de los proveedores (Retell AI, Twilio) bajo sus propios términos de privacidad. Para clientes del sector salud con Plan Professional, todos los proveedores operan bajo BAA firmado y no pueden usar datos de pacientes para entrenar modelos de IA.",
        },
        {
          q: "¿Puedo usar este servicio si soy abogado o manejo información confidencial de clientes?",
          a: "Sí. Los abogados en Florida están sujetos a las Reglas de Conducta Profesional del Florida Bar (Rule 1.6 — Confidencialidad), que exigen medidas razonables para proteger información del cliente — pero no requieren un compliance tecnológico específico como HIPAA. El Plan Starter es suficiente para firmas legales. Si deseas, podemos configurar el agente para que no grabe conversaciones y para que los datos de leads vayan únicamente a tu CRM privado.",
        },
        {
          q: "¿Qué pasa si el agente falla o da información incorrecta?",
          a: "Monitoreamos el sistema en tiempo real. Si el agente comete un error, lo corregimos en 24 horas hábiles. Para clientes Professional, el tiempo de respuesta es de 4 horas. Siempre hay un humano detrás del sistema.",
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
      titleLine1: "Si las llamadas te llegan a ti",
      titleLine2: "y eres tú quien tiene que contestar.",
      subtitle:
        "Hecho para dueños de negocios donde el primer contacto con el cliente llega por teléfono o WhatsApp, y no hay quien lo agarre a tiempo. Si te ves en estas situaciones, empezamos por el dolor más caro.",
      footer:
        "Esto no es para ti si ya tienes recepcionista a tiempo completo, si tu equipo pasa de 15 personas con procesos cerrados, o si el primer contacto con tus clientes no llega por teléfono ni WhatsApp. Cualquier otro caso, hablemos en el diagnóstico.",
      painLabel: "Lo que pasa hoy",
      solutionLabel: "Empezamos por",
      recommendedLabel: "Recomendado:",
      rubros: [
        {
          name: "Contestar es tu cuello de botella",
          pain: "Las llamadas y los WhatsApp llegan mientras estás atendiendo. O contestas tarde o se quedan sin respuesta.",
          solution:
            "Recepción 24/7 que contesta de inmediato, califica al cliente y agenda en tu calendario.",
          tier: "Plan Starter",
        },
        {
          name: "Eres el dueño y el recepcionista",
          pain: "Cada lead nuevo pasa por ti. Pierdes horas del día contestando antes de cobrar la primera factura.",
          solution:
            "Un agente toma el primer contacto, filtra curiosos y solo te pasa los clientes listos para hablar.",
          tier: "Plan Starter",
        },
        {
          name: "Te llaman en inglés y respondes a medias",
          pain: "Tus clientes angloparlantes cuelgan o se van con la competencia porque la primera conversación se siente forzada.",
          solution:
            "Atención bilingüe que detecta el idioma y responde con la misma claridad en inglés que en español.",
          tier: "Plan Professional",
        },
        {
          name: "Pierdes clientes que nunca supiste que existieron",
          pain: "No tienes registro de cuántas llamadas o mensajes se quedaron sin contestar mientras trabajabas.",
          solution:
            "Cada interacción queda registrada con quién, cuándo y qué pidió, y un follow-up automático cierra el lazo.",
          tier: "Plan Professional",
        },
      ],
    },

    ctaFinal: {
      eyebrow: "Diagnóstico gratuito",
      titleLine1: "5 minutos.",
      titleLine2: "Sin compromiso.",
      titleLine3: "Sales con un mapa, no con una cotización.",
      subtitle:
        "Llena el formulario y te contactamos en menos de 24 horas para entregarte tu diagnóstico personalizado. Hablamos de tu operación, identificamos los 2–3 procesos más caros, te decimos qué automatizamos primero. Sin venta dura.",
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
      hipaaQuestion: "¿Manejas información de pacientes bajo HIPAA?",
      hipaaHint:
        "Negocios que manejan información de pacientes bajo regulación federal de salud deben cumplir HIPAA.",
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
        { label: "Diagnóstico", href: "/diagnostico" },
        { label: "Blog", href: "/blog" },
        { label: "Privacidad", href: "/privacy-policy" },
        { label: "Términos", href: "/terms" },
      ],
      copyright: "© {year} Automate IT LLC. Todos los derechos reservados.",
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
      eyebrow: "AI Receptionist for Florida businesses · From $198/mo",
      h1Line1: "While you work,",
      h1Line2: "we answer.",
      subtitle:
        "Your business's phone, WhatsApp and chat — answering on their own, in one system. I set it up; you flip the switch.",
      bullets: [
        "📞 Answers calls while you're with your clients.",
        "💬 Responds to WhatsApp while you're with your family.",
        "🗓️ Books appointments while you're asleep.",
      ],
      ctaPrimary: "Book your free diagnosis",
      microcopy: "5-minute form. No cost. No commitment.",
      trustBadges: [
        { icon: "🔒", text: "Your data is never sold" },
        { icon: "🤐", text: "Conversations stay private" },
        { icon: "🛡️", text: "HIPAA-compliant available" },
        { icon: "⚙️", text: "No access to your personal information" },
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
      titleLine1: "If you don't answer fast,",
      titleLine2: "the next business on Google will.",
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
      titleLine1: "From your first form to your first agent live.",
      titleLine2: "In weeks, not months.",
      steps: [
        {
          n: "01",
          title: "Diagnostic",
          body: "Fill out a 5-minute form. We call you within 24 hours to review your operation and identify where your time and leads are leaking. You leave the call with a clear map.",
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
      eyebrow: "Plans & channels",
      titleLine1: "Choose your base plan.",
      titleLine2: "Activate your channels.",
      subtitle:
        "Start with the right plan and add the modules your business needs. No bundled packages.",
      planDiagnosticHint:
        "Not sure if this plan is for you? The diagnostic will tell you — it's free.",
      plans: [
        {
          sku: "STARTER",
          name: "Starter Plan",
          badge: "",
          price: "$99",
          priceUnit: "/mo",
          setup: "One-time setup: $199",
          description: "For general businesses. No HIPAA.",
          features: [
            "Onboarding + initial configuration",
            "Basic email support",
            "Monthly usage report",
            "Compatible with all modules",
          ],
        },
        {
          sku: "PROFESSIONAL",
          name: "Professional Plan",
          badge: "HIPAA ✓",
          price: "$179",
          priceUnit: "/mo",
          setup: "One-time setup: $349",
          description: "For businesses requiring HIPAA compliance.",
          features: [
            "Everything in Starter",
            "BAA management with Retell AI, Cal.com & Twilio",
            "HIPAA-compliant configuration for all active modules",
            "Priority support — 24 business-hour response",
            "Quarterly configuration audit",
          ],
        },
      ],
      modulesEyebrow: "Channel modules",
      modulesSubtitle:
        "A channel is how your customers reach you: voice, WhatsApp, Messenger / web chat, or CRM. Add it to any base plan — you only activate the ones your business actually uses. Each module includes 300 minutes or messages per month.",
      moduleDiagnosticHint:
        "Not sure if this channel fits? The diagnostic will tell you — it's free.",
      modules: [
        {
          sku: "VOZ",
          name: "Voice (Retell AI)",
          hipaa: true,
          priceStarter: "+$149/mo",
          pricePro: "+$149/mo",
          setupStarter: "Setup +$149",
          setupPro: "Setup +$199",
          description: "Agent answering calls 24/7 and booking appointments in real time.",
        },
        {
          sku: "WHATSAPP",
          name: "WhatsApp",
          hipaa: true,
          priceStarter: "+$99/mo",
          pricePro: "+$99/mo",
          setupStarter: "Setup +$99",
          setupPro: "Setup +$149",
          description: "Chatbot booking appointments or capturing leads via WhatsApp 24/7.",
        },
        {
          sku: "MESSENGER",
          name: "Messenger / Web chat",
          hipaa: false,
          hipaaNote: "Not recommended with Professional Plan",
          priceStarter: "+$79/mo",
          pricePro: "Not recommended",
          setupStarter: "Setup +$79",
          setupPro: "Setup +$99",
          description: "Chatbot on Facebook Messenger or integrated into your website.",
        },
        {
          sku: "CRM",
          name: "CRM & Leads",
          hipaa: true,
          priceStarter: "+$99/mo",
          pricePro: "+$99/mo",
          setupStarter: "Setup +$99",
          setupPro: "Setup +$149",
          description: "Structured lead capture. HubSpot (Starter) or Airtable BAA (Professional).",
        },
      ],
      examplesEyebrow: "Total price examples",
      examples: [
        { label: "Beauty salon · WhatsApp only", total: "$198/mo", detail: "Starter $99 + WhatsApp $99" },
        { label: "Contractor · Voice", total: "$248/mo", detail: "Starter $99 + Voice $149" },
        { label: "Regulated business · HIPAA Voice", total: "$328/mo", detail: "Professional $179 + Voice $149" },
        { label: "Realtor · Voice + WhatsApp + CRM", total: "$446/mo", detail: "Starter $99 + Voice $149 + WhatsApp $99 + CRM $99" },
      ],
      cta: "Book your free diagnosis",
      ctaHint: "Not sure which modules you need? The diagnosis will tell you.",
      checkoutLabel: "Get started",
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
          q: "Can I start with just one module?",
          a: "Yes. The base plan ($99 Starter or $179 Professional) requires at least 1 active module. You can start with WhatsApp at $99/mo extra and add Voice or CRM later.",
        },
        {
          q: "What happens if I exceed 300 minutes or messages?",
          a: "Additional 300-unit blocks are billed. Voice: $35 (Starter) / $40 (Professional). WhatsApp: $25/$30. CRM: $20/$25. Always full block, never fractions.",
        },
        {
          q: "Is the setup fee refundable?",
          a: "No. It covers 4-8 hours of configuration, integration, and testing per active module. Paid once at signing.",
        },
        {
          q: "Can I cancel anytime?",
          a: "The first 90 days are non-cancellable. From day 91 onward, you cancel with 30 days written notice — no penalty.",
        },
        {
          q: "What is HIPAA and why does it matter?",
          a: "HIPAA is the U.S. federal law protecting patient health information. If your business handles patient data or regulated health information, you need the Professional Plan — it guarantees Retell AI, Cal.com, and Twilio operate under signed BAA. Automate IT never holds patient information (PHI).",
        },
        {
          q: "Can I add modules after signing?",
          a: "Yes, anytime. The cost prorates to the current billing cycle. To remove a module you need 15 days notice, processed at the start of the next cycle.",
        },
        {
          q: "Does the AI system listen to or store my conversations with clients?",
          a: "No. Automate IT doesn't store or have access to the content of conversations. Call and message data stays in the providers' systems (Retell AI, Twilio) under their own privacy terms. For healthcare clients on Plan Professional, all providers operate under signed BAA and cannot use patient data to train AI models.",
        },
        {
          q: "Can I use this service if I'm a lawyer or handle confidential client information?",
          a: "Yes. Florida attorneys are subject to the Florida Bar Rules of Professional Conduct (Rule 1.6 — Confidentiality), which require reasonable measures to protect client information — but don't require specific technical compliance like HIPAA. The Starter Plan is sufficient for law firms. If you wish, we can configure the agent not to record conversations and to send lead data only to your private CRM.",
        },
        {
          q: "What happens if the agent fails or gives wrong information?",
          a: "We monitor the system in real time. If the agent makes a mistake, we fix it within 24 business hours. Professional plan clients get a 4-hour response time. There is always a human behind the system.",
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
      titleLine1: "If the calls come to you",
      titleLine2: "and you're the one who has to answer.",
      subtitle:
        "Built for business owners where the first customer contact comes in by phone or WhatsApp, and no one is there to catch it in time. If any of these match your day, we start with the most expensive pain first.",
      footer:
        "This isn't for you if you already have a full-time receptionist, if your team is past 15 people with locked-down processes, or if first contact with your customers doesn't come through phone or WhatsApp. Anything else, let's talk in the diagnostic.",
      painLabel: "What's happening now",
      solutionLabel: "We start with",
      recommendedLabel: "Recommended:",
      rubros: [
        {
          name: "Answering is your bottleneck",
          pain: "Calls and WhatsApp come in while you're with a customer. Either you reply late or they go unanswered.",
          solution:
            "24/7 reception that answers instantly, qualifies the customer, and books in your calendar.",
          tier: "Plan Starter",
        },
        {
          name: "You're the owner and the receptionist",
          pain: "Every new lead runs through you. Hours of the day go to first contact before you bill a single client.",
          solution:
            "An agent handles the first touch, filters out tire-kickers, and only routes customers ready to talk.",
          tier: "Plan Starter",
        },
        {
          name: "They call in English and you answer halfway",
          pain: "Your English-speaking customers hang up or go to a competitor because the first conversation feels forced.",
          solution:
            "Bilingual reception that detects the language and responds with the same clarity in English as in Spanish.",
          tier: "Plan Professional",
        },
        {
          name: "You're losing customers you never knew about",
          pain: "You have no record of how many calls or messages went unanswered while you were working.",
          solution:
            "Every interaction is logged with who, when, and what they asked, and an automatic follow-up closes the loop.",
          tier: "Plan Professional",
        },
      ],
    },

    ctaFinal: {
      eyebrow: "Free diagnostic",
      titleLine1: "5 minutes.",
      titleLine2: "No commitment.",
      titleLine3: "You leave with a map, not a sales pitch.",
      subtitle:
        "Fill out the form and we'll contact you within 24 hours to deliver your personalized diagnosis. We talk about your operation, identify the 2–3 most expensive processes, and tell you what to automate first. No hard sell.",
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
      hipaaQuestion: "Do you handle patient information under HIPAA?",
      hipaaHint:
        "Businesses handling patient information under federal health regulations must comply with HIPAA.",
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
        { label: "Diagnostic", href: "/en/diagnostic" },
        { label: "Blog", href: "/en/blog" },
        { label: "Privacy", href: "/en/privacy-policy" },
        { label: "Terms", href: "/en/terms" },
      ],
      copyright: "© {year} Automate IT LLC. All rights reserved.",
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
