/**
 * Páginas por industria — contenido para búsquedas de intención comercial.
 *
 * Los 25 artículos del blog responden preguntas que la gente hace *antes* de
 * querer contratar ("cuánto me cuesta una llamada perdida"). Estas páginas son
 * lo contrario: hablan con quien ya tiene el problema identificado y está
 * buscando a quién pagarle.
 *
 * Las dos primeras industrias no son un capricho: `Perfil_de_Cliente_Ideal.md`
 * §1-bis y el Manual Maestro §2.1 fijan HVAC y plomería / home services con
 * dispatch como el vertical inicial de aprendizaje de Operación Pulso.
 *
 * **Regla al añadir una industria:** el contenido tiene que ser realmente
 * distinto, no esta misma página con los sustantivos cambiados. Un conjunto de
 * páginas casi idénticas es una señal de baja calidad para un buscador y, peor,
 * no le sirve a quien la lee. Si no sabes lo suficiente de esa industria para
 * escribir fricciones que su dueño reconozca, no publiques la página.
 *
 * Solo en español: el blog y las páginas nuevas están congelados en inglés
 * desde el 20-sep-2026 (ver `CLAUDE.md`, reglas de i18n).
 */

export interface Vertical {
  slug: string;
  /** H1 de la página. */
  titulo: string;
  /** `<title>` para el buscador. Máximo 60 caracteres. */
  seoTitle: string;
  descripcion: string;
  /** Nombre del servicio para el schema. */
  servicio: string;
  intro: string;
  /** Fricciones concretas. Observables, sin cifras que no podamos respaldar. */
  fricciones: Array<{ titulo: string; cuerpo: string }>;
  /** Qué se construye. Mecanismos, no promesas de resultado. */
  mecanismos: Array<{ titulo: string; cuerpo: string }>;
  /** Lo que no hacemos. Va en la página a propósito. */
  limites: string;
  cierre: string;
}

export const verticales: Vertical[] = [
  {
    slug: "hvac-orlando",
    titulo: "Automatización para empresas de HVAC en Orlando",
    seoTitle: "Automatización para empresas de HVAC en Orlando",
    descripcion:
      "Para dueños de empresas de aire acondicionado en Central Florida: dónde se traba el trabajo entre la llamada y el técnico. Diagnóstico sin costo.",
    servicio: "Mejora operativa para empresas de HVAC",
    intro:
      "En verano el teléfono no para. Una casa sin aire en Orlando en agosto no es una incomodidad, es una emergencia, y quien contesta primero se queda con el trabajo. El problema casi nunca es que falten técnicos: es que la información entre la llamada, la agenda y la camioneta viaja a mano.",
    fricciones: [
      {
        titulo: "La llamada que entra mientras estás en un techo",
        cuerpo:
          "El dueño o el despachador contesta cuando puede. Las que no se contestan rara vez vuelven a llamar: llaman al siguiente de la lista. En temporada alta eso pasa todos los días y no queda registrado en ningún lado, así que a fin de mes nadie sabe cuántos trabajos se fueron por ahí.",
      },
      {
        titulo: "El técnico que llega sin saber a qué va",
        cuerpo:
          "Marca, modelo, si ya estuvo alguien antes, qué se le hizo la vez pasada, si el equipo está en garantía. Cuando eso vive en la cabeza del despachador o en un mensaje suelto, el técnico llega, diagnostica desde cero y a veces vuelve una segunda vez por una pieza que se sabía desde la llamada.",
      },
      {
        titulo: "El estimado que se manda y nadie vuelve a tocar",
        cuerpo:
          "Un cambio de sistema completo no se aprueba el mismo día. Se manda el número, el cliente lo piensa, pide otro presupuesto, y el seguimiento depende de que alguien se acuerde. Los estimados grandes son los que más margen dejan y los que más fácil se enfrían.",
      },
      {
        titulo: "El papeleo de rebates y financiamiento",
        cuerpo:
          "Los programas de incentivos tienen pasos, plazos y documentos. Cuando un paso depende de que alguien recuerde perseguirlo, se atasca ahí — y el cliente cree que el atasco es tuyo.",
      },
      {
        titulo: "Los contratos de mantenimiento que nadie renueva",
        cuerpo:
          "Son el ingreso más predecible que tiene una empresa de HVAC y el primero que se cae, porque renovarlos exige acordarse del cliente doce meses después de haberlo atendido.",
      },
    ],
    mecanismos: [
      {
        titulo: "Que ninguna llamada ni mensaje quede sin registrar",
        cuerpo:
          "Todo lo que entra — teléfono, WhatsApp, formulario de la web — llega al mismo lugar, con la hora y el origen. Primero para que se le pueda dar seguimiento; después para que al mes puedas ver cuántas hubo de verdad.",
      },
      {
        titulo: "Que el técnico reciba el contexto antes de llegar",
        cuerpo:
          "El historial del equipo y del cliente disponible en el teléfono, en el momento en que le asignan el trabajo. No un manual de veinte páginas: las tres o cuatro cosas que cambian lo que va a hacer al llegar.",
      },
      {
        titulo: "Que el estimado enviado tenga seguimiento propio",
        cuerpo:
          "Recordatorios automáticos en los puntos que importan, con el estado visible de cada estimado abierto. Quién lo mandó, cuándo, y cuánto lleva sin respuesta.",
      },
      {
        titulo: "Que un trámite detenido avise antes de vencerse",
        cuerpo:
          "El caso que lleva demasiados días parado en un paso se señala solo, en vez de descubrirse cuando ya se pasó el plazo.",
      },
      {
        titulo: "Que las renovaciones salgan sin que nadie se acuerde",
        cuerpo:
          "El aviso de renovación del contrato de mantenimiento se dispara con la fecha, no con la memoria de una persona.",
      },
    ],
    limites:
      "No vendemos software de despacho ni te pedimos que cambies el que ya usas. Si ServiceTitan, Housecall Pro o lo que tengas hace bien su trabajo, lo dejamos y conectamos lo que le falta. Tampoco prometemos que vas a cerrar más ventas: podemos hacer que ningún estimado se quede sin seguimiento, pero quién firma lo decide el cliente.",
    cierre:
      "El diagnóstico dura una sesión y no tiene costo. Salimos con el mapa de cómo entra y se entrega el trabajo hoy, cuáles son los puntos donde se traba, cuál conviene arreglar primero y qué número debería moverse si funciona. Ese mapa te lo llevas aunque no contrates nada.",
  },
  {
    slug: "plomeria-orlando",
    titulo: "Automatización para empresas de plomería en Orlando",
    seoTitle: "Automatización para plomeros en Orlando",
    descripcion:
      "Para dueños de empresas de plomería en Central Florida: dónde se pierde trabajo entre la emergencia, el estimado y el cobro. Diagnóstico sin costo.",
    servicio: "Mejora operativa para empresas de plomería",
    intro:
      "La plomería se vende por urgencia. Cuando revienta una tubería a las diez de la noche, el cliente llama a tres números y contrata al primero que contesta — no al mejor ni al más barato. Todo lo que retrase esa primera respuesta es trabajo que se va a otro lado, y casi nunca sabes cuánto fue.",
    fricciones: [
      {
        titulo: "La emergencia fuera de horario",
        cuerpo:
          "Publicar servicio 24/7 y que después el número de noche sea el mismo de la oficina es la contradicción más común del oficio. El cliente llama, no contesta nadie, y llama al siguiente. Esa llamada no aparece en ningún reporte.",
      },
      {
        titulo: "Estimado y despacho mezclados en la misma llamada",
        cuerpo:
          "Un destape y un cambio de calentador no son el mismo trabajo ni requieren la misma información, pero entran por el mismo teléfono y se apuntan igual. El que cotiza termina preguntando cosas que ya se habían preguntado.",
      },
      {
        titulo: "La pieza que no iba en la camioneta",
        cuerpo:
          "El segundo viaje por una pieza que se podía anticipar desde la llamada se come el margen del trabajo completo y le enseña al cliente que hay que esperar.",
      },
      {
        titulo: "El trabajo terminado que se factura tarde",
        cuerpo:
          "Se hace el trabajo el martes, la factura sale el viernes o la semana siguiente, y el cobro se corre otras dos semanas. El dinero existe, solo que llega tarde — y mientras tanto pagas nómina y material.",
      },
      {
        titulo: "La documentación del daño por agua",
        cuerpo:
          "Cuando hay reclamo de seguro de por medio, las fotos y el registro de lo que se encontró deciden si se paga o se discute. Si dependen de que alguien las suba a mano después, a veces llegan tarde o no llegan.",
      },
    ],
    mecanismos: [
      {
        titulo: "Que la llamada de emergencia tenga una ruta real",
        cuerpo:
          "Que lo que entra fuera de horario se enrute a alguien o quede capturado con la urgencia marcada, en vez de morirse en un buzón. Si prometes 24/7, que el camino exista.",
      },
      {
        titulo: "Separar lo que se despacha de lo que se cotiza",
        cuerpo:
          "Dos entradas distintas que piden la información que cada una necesita, y que terminan en el mismo lugar. El que atiende deja de preguntar dos veces.",
      },
      {
        titulo: "Que la información del trabajo llegue completa al técnico",
        cuerpo:
          "Lo que se supo en la llamada viaja hasta la camioneta: tipo de equipo, qué se vio, qué se intentó antes. Menos viajes de vuelta por algo que ya se sabía.",
      },
      {
        titulo: "Que la factura salga del trabajo terminado, no de la memoria",
        cuerpo:
          "Cerrar el trabajo dispara la factura. Y lo que se facturó y no se ha cobrado queda visible en un solo lugar, sin reconstruirlo cada semana.",
      },
      {
        titulo: "Captura de evidencia en el momento",
        cuerpo:
          "Las fotos y las notas se suben desde el trabajo y quedan ligadas al expediente del cliente, no a un rollo de fotos en un teléfono.",
      },
    ],
    limites:
      "No contestamos tus llamadas por ti ni reemplazamos a tu gente. Construimos el camino para que lo que entra no se pierda y llegue completo a quien tiene que actuar. Tampoco prometemos cobros más rápidos por sí solos: podemos hacer que la factura salga el mismo día, pero cuándo paga el cliente depende de él.",
    cierre:
      "El diagnóstico dura una sesión y no tiene costo. Salimos con el mapa de cómo entra y se entrega el trabajo hoy, cuáles son los puntos donde se traba, cuál conviene arreglar primero y qué número debería moverse si funciona. Ese mapa te lo llevas aunque no contrates nada.",
  },
];

export function getVertical(slug: string): Vertical | undefined {
  return verticales.find((v) => v.slug === slug);
}
