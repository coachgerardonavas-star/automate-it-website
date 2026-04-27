import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./chaos.css";

gsap.registerPlugin(ScrollTrigger);

const emails = [
  { from: "cliente@empresa.com",      subject: "URGENTE: Factura pendiente $3,200" },
  { from: "jefe@corp.com",            subject: "¿Dónde está el reporte?" },
  { from: "ventas@lead.com",          subject: "Seguimiento #4 — sin respuesta" },
  { from: "admin@proveedor.com",      subject: "Invoice overdue 30 days" },
  { from: "soporte@cliente.com",      subject: "Can we talk today?" },
  { from: "ceo@empresa.com",          subject: "Meeting cancelado otra vez" },
  { from: "contabilidad@corp.com",    subject: "Cierre de mes pendiente" },
  { from: "marketing@agencia.com",    subject: "Campaña sin aprobar" },
  { from: "rrhh@empresa.com",         subject: "Contrato vencido hoy" },
  { from: "it@sistemas.com",          subject: "Servidor caído — acción requerida" },
  { from: "legal@firma.com",          subject: "Documento sin firmar" },
  { from: "cliente2@negocio.com",     subject: "Llamada perdida x3" },
];

const MAX_VISIBLE    = 4;
const SPAWN_EVERY_MS = 420;
const FADE_OUT_MS    = 200;

function createEmailEl(data) {
  const el = document.createElement("article");
  el.className = "chaos-float";
  el.innerHTML = `
    <span class="chaos-float-from">${data.from}</span>
    <p class="chaos-float-subject">${data.subject}</p>
  `;
  return el;
}

function startInboxQueue(container) {
  const visible = [];
  let idx = 0;

  const interval = setInterval(() => {
    if (idx >= emails.length) {
      clearInterval(interval);
      return;
    }

    const el = createEmailEl(emails[idx++]);
    container.appendChild(el);
    visible.push(el);

    // Forzar reflow antes de togglear la clase, así la transición
    // CSS parte del estado inicial (opacity:0, translateY(20px)).
    el.getBoundingClientRect();
    el.classList.add("is-visible");

    if (visible.length > MAX_VISIBLE) {
      const oldest = visible.shift();
      oldest.classList.add("is-fading");
      setTimeout(() => oldest.remove(), FADE_OUT_MS);
    }
  }, SPAWN_EVERY_MS);

  return {
    stop() {
      clearInterval(interval);
    },
  };
}

export function createChaos() {
  const section = document.createElement("section");
  section.className = "scene scene-chaos";
  section.innerHTML = `
    <div class="chaos-fade"></div>
    <div class="chaos-floats" aria-hidden="true"></div>
    <div class="chaos-inner">
      <div class="chaos-headline">
        <p class="chaos-line-1">Tu negocio genera datos 24/7.</p>
        <p class="chaos-line-2">¿Quién los procesa?</p>
      </div>
    </div>
    <div class="chaos-notif" aria-hidden="true">
      <span class="chaos-notif-dot"></span>
      <span class="chaos-notif-count">0</span>
      <span class="chaos-notif-label">mensajes sin leer</span>
    </div>
  `;
  return section;
}

export function animateChaos(section) {
  const notif      = section.querySelector(".chaos-notif");
  const counter    = section.querySelector(".chaos-notif-count");
  const line1      = section.querySelector(".chaos-line-1");
  const line2      = section.querySelector(".chaos-line-2");
  const fade       = section.querySelector(".chaos-fade");
  const floatsEl   = section.querySelector(".chaos-floats");

  // La cola arranca solo cuando la Escena 2 entra en viewport.
  // Se mantiene un placeholder no-op para que queue.stop() del master
  // timeline sea siempre invocable aunque el observer nunca dispare.
  let queue = { stop: () => {} };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          queue = startInboxQueue(floatsEl);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(section);

  const counterState = { value: 0 };

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=150%",
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
    },
  });

  tl.fromTo(
    notif,
    { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.8)" }
  );

  tl.to(
    counterState,
    {
      value: 47,
      duration: 1.2,
      ease: "power1.out",
      onUpdate: () => {
        counter.textContent = Math.round(counterState.value);
      },
    },
    "<"
  );

  tl.call(() => queue.stop());
  tl.call(() => observer.disconnect());

  tl.to(".chaos-floats", { opacity: 0, duration: 0.4 });

  tl.fromTo(
    line1,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    "+=0.5"
  );

  tl.fromTo(
    line2,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    "-=0.1"
  );

  tl.to(
    fade,
    { opacity: 1, duration: 0.8, ease: "power2.inOut" },
    "+=0.5"
  );

  return tl;
}
