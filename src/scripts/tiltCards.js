// Tilt 3D al hover para .tilt-card — vanilla JS, sin dependencias.
//
// El efecto se basa en `perspective` declarada en el contenedor padre
// (.tilt-wrapper), NO en cada card. Por eso el transform de la card solo
// aplica rotaciones + translateZ; el punto de fuga lo aporta el wrapper.
//
// Este módulo es autoejecutable: aunque se importe desde varios componentes,
// ESM lo evalúa una sola vez. El guard por card (dataset.tiltBound) hace que
// initTilt() sea idempotente por si se invocara de nuevo.

const MAX_TILT = 8; // grados máximos en X e Y
const LIFT = 8; // px que sube la card al hover (translateZ)

function bindCard(card) {
  if (card.dataset.tiltBound === "true") return;
  card.dataset.tiltBound = "true";

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 .. 0.5
    // x/y en [-0.5, 0.5] → rotación en [-MAX_TILT, MAX_TILT] grados.
    card.style.transform =
      `rotateY(${x * MAX_TILT * 2}deg) ` +
      `rotateX(${y * -MAX_TILT * 2}deg) ` +
      `translateZ(${LIFT}px)`;
  });

  card.addEventListener("mouseleave", () => {
    // Limpiar el inline transform → vuelve a flat con la transición del CSS.
    card.style.transform = "";
  });
}

export function initTilt() {
  // prefers-reduced-motion: reduce → cero JS activo, cero transformación.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll(".tilt-card").forEach(bindCard);
}

// En módulos (deferred) el DOM suele estar listo; cubrimos ambos casos.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTilt);
} else {
  initTilt();
}
