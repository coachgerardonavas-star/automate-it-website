import type { PulsoProspect } from "./prospects";

export const pulsoProspect14Override: PulsoProspect = {
  id: "arturo-cardenas-014",
  slug: "arturo-cardenas-realtor",
  name: "Maracana Barbers",
  contactFirstName: "Martha",
  title: "esto es lo que vi en Maracana Barbers.",
  intro: "Maracana ya tiene una experiencia digital bastante completa: sitio en español, reserva propia, verificación por SMS y una propuesta clara de servicio premium. Seguí el recorrido que puede hacer alguien antes de decidir cuándo ir o reservar.",
  facts: [
    {
      title: "Hoy distintas fuentes públicas muestran horarios de cierre diferentes.",
      body: "La web oficial publica viernes de 6:00 a. m. a 12:00 a. m., sábado de 6:00 a. m. a 11:00 p. m. y domingo de 6:00 a. m. a 12:00 a. m. Una ficha pública actual muestra cierres distintos para esos tres días. Para una barbería que recibe visitas y reservas hasta tarde, vale la pena saber qué horario está viendo cada cliente antes de salir de casa.",
      sources: [{ label: "Comprobar el horario en la web oficial", url: "https://www.maracanabarbers.com/" }],
    },
    {
      title: "La reserva ya recoge bastante contexto antes de confirmar.",
      body: "El flujo pide teléfono, verifica por SMS, confirma el perfil y después permite elegir barbero, fecha y hora. Ese recorrido da una base útil para medir qué citas empiezan, cuáles se confirman y dónde una persona abandona antes de reservar.",
      sources: [{ label: "Revisar el flujo de reserva", url: "https://www.maracanabarbers.com/" }],
    },
  ],
  unknowns: "Desde afuera puedo ver el sitio, los horarios publicados y los pasos de la reserva. Desconozco cuál horario usa hoy el equipo como referencia, cuántas personas entran al flujo, cuántas terminan la cita y cómo se trabaja el seguimiento después.",
  review: "Mediríamos fuente, horario consultado, inicio de reserva, verificación, barbero elegido, cita confirmada y seguimiento. Así se puede proteger una experiencia que ya está bien armada y corregir solo lo que los datos justifiquen. Cuando los números dicen que todo está funcionando bien, también te lo diré con honestidad.",
  closing: "Si quieres revisar conmigo el recorrido completo desde que alguien encuentra Maracana hasta que se sienta en la silla, escríbeme.",
  ctaEvent: "pulso_cta_call",
};
