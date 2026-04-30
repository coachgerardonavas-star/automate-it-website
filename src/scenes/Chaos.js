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

function createEmailEl(data) {
  const el = document.createElement("article");
  el.className = "chaos-float";
  el.innerHTML = `
    <span class="chaos-float-from">${data.from}</span>
    <p class="chaos-float-subject">${data.subject}</p>
  `;
  return el;
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

  const floatsEl = section.querySelector(".chaos-floats");
  emails.forEach((data) => floatsEl.appendChild(createEmailEl(data)));

  return section;
}

export function animateChaos(section) {
  const notif    = section.querySelector(".chaos-notif");
  const counter  = section.querySelector(".chaos-notif-count");
  const line1    = section.querySelector(".chaos-line-1");
  const line2    = section.querySelector(".chaos-line-2");
  const fade     = section.querySelector(".chaos-fade");
  const floatsEl = section.querySelector(".chaos-floats");
  const floats   = floatsEl.querySelectorAll(".chaos-float");

  const counterState = { value: 0 };

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: 1.5,
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
      duration: 1.6,
      ease: "power1.out",
      onUpdate: () => {
        counter.textContent = Math.round(counterState.value);
      },
    },
    "<"
  );

  tl.fromTo(
    floats,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.15,
      ease: "power2.out",
    },
    "<+0.1"
  );

  tl.to({}, { duration: 1.2 });

  tl.to(floatsEl, { opacity: 0, duration: 0.6 });

  tl.fromTo(
    line1,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    "+=0.4"
  );

  tl.fromTo(
    line2,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    "-=0.1"
  );

  tl.to(
    fade,
    { opacity: 1, duration: 0.9, ease: "power2.inOut" },
    "+=0.6"
  );

  return tl;
}
