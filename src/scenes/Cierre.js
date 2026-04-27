import { gsap } from "gsap";
import "./cierre.css";
import cierreVideoUrl from "../assets/cierre.mp4";

export function createCierre() {
  const section = document.createElement("section");
  section.className = "scene scene-cierre";
  section.innerHTML = `
    <div class="cierre-stage">
      <video
        class="cierre-video"
        src="${cierreVideoUrl}"
        muted
        playsinline
        preload="auto"
        disablepictureinpicture
        disableremoteplayback
      ></video>

      <div class="cierre-overlay" aria-hidden="true"></div>
      <div class="cierre-black" aria-hidden="true"></div>

      <div class="cierre-endframe">
        <div class="cierre-texts">
          <p class="cierre-text cierre-text--1">Esto es lo que compras cuando automatizas.</p>
          <p class="cierre-text cierre-text--2">Tiempo. El único recurso que no se recupera.</p>
        </div>

        <div class="cierre-cta">
          <div class="cierre-cta-buttons">
            <a class="cierre-btn cierre-btn--primary" href="#consulta">Quiero una consulta gratuita</a>
            <a class="cierre-btn cierre-btn--secondary" href="#demo">Ver cómo funciona</a>
          </div>
          <div class="cierre-contact">automateit.com · automateit@yourbizupgraded.com</div>
        </div>
      </div>
    </div>
  `;
  return section;
}

export function animateCierre(section) {
  const video        = section.querySelector(".cierre-video");
  const blackOverlay = section.querySelector(".cierre-black");
  const text1        = section.querySelector(".cierre-text--1");
  const text2        = section.querySelector(".cierre-text--2");
  const buttons      = section.querySelector(".cierre-cta-buttons");
  const contact      = section.querySelector(".cierre-contact");
  const cta          = section.querySelector(".cierre-cta");

  // Estado inicial: video visible, negro y endframe ocultos
  gsap.set(blackOverlay, { opacity: 0 });
  gsap.set([text1, text2, buttons, contact], { opacity: 0, y: 20 });

  let started = false;
  let endframePlayed = false;

  const playEndframe = () => {
    if (endframePlayed) return;
    endframePlayed = true;

    const tl = gsap.timeline();

    // Fade a negro 1.5s
    tl.to(blackOverlay, { opacity: 1, duration: 1.5, ease: "power2.inOut" });

    // Línea 1
    tl.to(text1, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" });

    // Pausa 2s
    tl.to({}, { duration: 2.0 });

    // Línea 2 (cyan)
    tl.to(text2, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" });

    // 1s después: botones + contacto
    tl.to({}, { duration: 1.0 });
    tl.to(buttons, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "power2.out",
      onStart: () => cta.classList.add("is-revealed"),
    }, "ctaIn");
    tl.to(contact, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: "power2.out",
    }, "ctaIn+=0.2");
  };

  video.addEventListener("ended", playEndframe);

  // Si el video falla (formato no soportado, autoplay bloqueado), igual mostramos el endframe
  video.addEventListener("error", playEndframe);

  // Arranca el video cuando la sección entra en viewport
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
              // Autoplay bloqueado: saltamos directo al endframe
              playEndframe();
            });
          }
        }
      });
    },
    { threshold: 0.55 }
  );
  io.observe(section);
}
