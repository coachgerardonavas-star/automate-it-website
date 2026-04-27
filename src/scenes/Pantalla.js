import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import "./pantalla.css";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const SLOT_DUR = 2.5; // segundos por mensaje

const ICONS = {
  ai: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="3.2"/>
  </svg>`,
  finance: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
    <line x1="6"  y1="18" x2="6"  y2="13"/>
    <line x1="12" y1="18" x2="12" y2="8"/>
    <line x1="18" y1="18" x2="18" y2="4"/>
  </svg>`,
  marketing: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="4 17 10 11 14 15 20 7"/>
    <polyline points="15 7 20 7 20 12"/>
  </svg>`,
};

const STEPS = [
  { type: "msg",   agent: "Asistente IA",     color: "#00D9FF", icon: "ai",        text: "El resumen ejecutivo del día está listo." },
  { type: "check" },
  { type: "msg",   agent: "Asistente IA",     color: "#00D9FF", icon: "ai",        text: "Aprobado. Guardando copia en Drive... ✓ Listo." },
  { type: "msg",   agent: "Asistente IA",     color: "#00D9FF", icon: "ai",        text: "Enviando resumen al cliente... ✓ Enviado." },
  { type: "msg",   agent: "Agente Finanzas",  color: "#AADD00", icon: "finance",   text: "Factura de $3,200 registrada. Pago confirmado." },
  { type: "msg",   agent: "Agente Marketing", color: "#FF6B9D", icon: "marketing", text: "Campaña activa. 47 nuevos leads en cola." },
  { type: "msg",   agent: "Asistente IA",     color: "#00D9FF", icon: "ai",        text: "Todo en orden. Que disfrutes tu noche." },
];

function createMsgEl(step) {
  const el = document.createElement("div");
  el.className = "chat-msg";
  el.dataset.agent = step.agent;
  el.innerHTML = `
    <div class="chat-avatar" style="background: ${step.color}; color: #050A18">${ICONS[step.icon]}</div>
    <div class="chat-bubble">
      <div class="chat-bubble-name">${step.agent}</div>
      <div class="chat-bubble-text"></div>
    </div>
  `;
  return el;
}

function createCheckEl() {
  const el = document.createElement("div");
  el.className = "chat-autocheck";
  el.innerHTML = `
    <span class="chat-check-badge">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#050A18" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="5 12 10 17 19 7"/>
      </svg>
    </span>
  `;
  return el;
}

export function createPantalla() {
  const section = document.createElement("section");
  section.className = "scene scene-pantalla";
  section.innerHTML = `
    <div class="pantalla-stage">
      <div class="monitor">
        <div class="monitor-bezel">
          <div class="monitor-screen">
            <div class="monitor-chrome">
              <span class="monitor-chrome-dot"></span>
              <span class="monitor-chrome-dot"></span>
              <span class="monitor-chrome-dot"></span>
              <span class="monitor-chrome-title">Tu negocio, trabajando.</span>
            </div>
            <div class="chat"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="pantalla-fade"></div>
  `;
  return section;
}

export function animatePantalla(section) {
  const stage  = section.querySelector(".pantalla-stage");
  const chatEl = section.querySelector(".chat");
  const fadeEl = section.querySelector(".pantalla-fade");

  // Fondo: transición negro → #050A18 mientras entra al viewport
  gsap.fromTo(
    section,
    { backgroundColor: "#000000" },
    {
      backgroundColor: "#050A18",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    }
  );

  // Timeline auto-play al entrar; pin extendido para darle tiempo a la narración
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=200%",
      pin: stage,
      anticipatePin: 1,
      toggleActions: "play none none none",
    },
  });

  STEPS.forEach((step) => {
    if (step.type === "check") {
      // 1s de pausa, luego el check verde aparece con bounce
      tl.to({}, { duration: 1.0 });
      const check = createCheckEl();
      tl.call(() => {
        chatEl.appendChild(check);
        scrollChatToBottom(chatEl);
      });
      tl.fromTo(
        check,
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.5)" }
      );
      // Padding para completar slot de 2.5s
      tl.to({}, { duration: SLOT_DUR - 1.0 - 0.45 });
    } else {
      const el = createMsgEl(step);
      tl.call(() => {
        chatEl.appendChild(el);
        scrollChatToBottom(chatEl);
      });
      tl.fromTo(
        el,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      const typeDur = Math.min(1.5, Math.max(0.55, step.text.length * 0.022));
      tl.to(
        el.querySelector(".chat-bubble-text"),
        {
          text: { value: step.text, delimiter: "" },
          duration: typeDur,
          ease: "none",
          onComplete: () => el.classList.add("is-done"),
        }
      );
      // Padding al slot de 2.5s (mínimo 0.2s)
      const pad = Math.max(0.2, SLOT_DUR - 0.3 - typeDur);
      tl.to({}, { duration: pad });
    }
  });

  // Cierre: 2s de silencio + fade a negro
  tl.to({}, { duration: 2 });
  tl.to(fadeEl, { opacity: 1, duration: 1.5, ease: "power2.inOut" });
}

function scrollChatToBottom(chatEl) {
  requestAnimationFrame(() => {
    chatEl.scrollTop = chatEl.scrollHeight;
  });
}
