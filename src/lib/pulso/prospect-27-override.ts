import type { PulsoProspect } from "./prospects";

export const pulsoProspect27Override: PulsoProspect = {
  id: "cleanair-contractors-027",
  slug: "cleanair-contractors-usa",
  name: "CleanAir Contractors USA",
  contactFirstName: "Yarinell",
  title: "esto es lo que vi en CleanAir Contractors USA.",
  intro: "CleanAir tiene capacidad bilingüe y una propuesta clara para clientes de Central Florida. Seguí el recorrido público de una persona que intenta contactar al negocio desde el sitio.",
  facts: [
    {
      title: "La página de contacto todavía muestra datos de otra empresa y otro estado.",
      body: "Durante la auditoría aparecían “James & Doug”, una dirección en Foxboro, Massachusetts, y un teléfono con código 617. El número real de CleanAir aparecía en otra zona del sitio.",
      sources: [{ label: "Comprobar la página de contacto", url: "https://cleanaircontractorsusa.godaddysites.com/contact-us" }],
    },
    {
      title: "El error está justo en la ruta donde alguien intenta pedir ayuda.",
      body: "El visitante puede llegar con intención alta y encontrarse con datos que no corresponden a CleanAir. Desde afuera se puede comprobar la publicación; el impacto real necesita medición.",
      sources: [{ label: "Revisar el sitio público de CleanAir", url: "https://cleanaircontractorsusa.godaddysites.com/" }],
    },
  ],
  unknowns: "Desconozco cuánto tráfico llega a esa página, cuántas personas intentan usar esos datos y cómo se registra después cada solicitud real.",
  review: "Mediríamos página de origen, clic o llamada, servicio solicitado, primera respuesta y cita o visita confirmada. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
  closing: "Si quieres revisar conmigo el recorrido completo del primer contacto, escríbeme.",
  ctaEvent: "pulso_cta_call",
};
