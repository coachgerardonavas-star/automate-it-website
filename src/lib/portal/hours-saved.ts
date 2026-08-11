/**
 * "Horas ahorradas" — fórmula documentada.
 *
 * Decisión del CEO, 11-ago-2026: la métrica se calcula asignando minutos a cada
 * tipo de trabajo y multiplicando por el volumen REAL del período. No es una
 * estimación global ni un porcentaje inventado: cada hora que aparece en el
 * dashboard se puede descomponer en "tantas tareas de este tipo, por tantos
 * minutos cada una".
 *
 * Dos reglas que sostienen que el número sea defendible:
 *
 * 1. Los minutos son deliberadamente conservadores. Si el cliente discute la
 *    cifra, conviene que sobre argumento y no que falte. Es preferible que diga
 *    "en realidad me toma más" a que piense que le estamos inflando el
 *    resultado.
 * 2. Solo cuenta trabajo que el sistema hizo COMPLETO. Una conversación que el
 *    agente escaló a una persona no ahorró el tiempo de esa persona: ahorró, a
 *    lo sumo, el primer contacto. Por eso la fuente son los eventos con estado
 *    de éxito, no todos los eventos.
 *
 * ⚠️ Estos minutos son la propuesta inicial y están pendientes de que el CEO
 * los valide contra su experiencia real. Cambiar un valor acá cambia la métrica
 * en todo el portal, que es exactamente lo que se busca: un solo lugar.
 */

/** Minutos que le tomaría a una persona hacer una vez cada tipo de tarea. */
export const MINUTES_PER_TASK: Record<string, number> = {
  // Leer el mensaje, entender qué pide, responder, y volver a lo que estabas.
  // Los 4 minutos incluyen la interrupción, que es la parte cara.
  conversations: 4,
  // Abrir el CRM, buscar el registro, escribir, guardar.
  crmUpdates: 2,
  // Acordarse, redactar y mandar el seguimiento.
  followUps: 3,
  // Coordinar hueco, confirmar con el cliente y cargarlo al calendario.
  appointmentActions: 6,
  // Un aviso o recordatorio saliente.
  customerNotifications: 1,
  // Cajón de sastre: se mantiene bajo a propósito.
  otherTasks: 2,
};

/** Valor por defecto para un tipo no listado. Bajo, por la regla conservadora. */
const DEFAULT_MINUTES = 1;

export interface WorkItem {
  key: string;
  count: number;
}

/**
 * Horas ahorradas en el período, redondeadas a un decimal.
 *
 * Devuelve `null` si no hubo trabajo: un "0 h" afirma que medimos y el sistema
 * no ahorró nada, que es distinto de no tener actividad todavía.
 */
export function hoursSaved(items: WorkItem[]): number | null {
  if (items.length === 0) return null;

  const minutes = items.reduce(
    (total, item) => total + item.count * (MINUTES_PER_TASK[item.key] ?? DEFAULT_MINUTES),
    0
  );
  if (minutes === 0) return null;

  return Math.round((minutes / 60) * 10) / 10;
}

/**
 * Desglose legible del cálculo.
 *
 * Se usa para poder mostrarle al cliente de dónde sale la cifra si la cuestiona.
 * Una métrica que no se puede explicar no debería estar en el dashboard.
 */
export function hoursSavedBreakdown(
  items: WorkItem[]
): Array<{ key: string; count: number; minutesEach: number; minutesTotal: number }> {
  return items
    .filter((i) => i.count > 0)
    .map((i) => {
      const minutesEach = MINUTES_PER_TASK[i.key] ?? DEFAULT_MINUTES;
      return {
        key: i.key,
        count: i.count,
        minutesEach,
        minutesTotal: i.count * minutesEach,
      };
    });
}
