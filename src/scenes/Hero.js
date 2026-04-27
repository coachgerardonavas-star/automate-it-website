import { gsap } from "gsap";
import logoUrl from "../assets/logo-hero.png";
import "./hero.css";

const TAGLINE = "Your business, upgraded.";

function buildTagline() {
  return [...TAGLINE]
    .map((ch) => {
      const safe = ch === " " ? "&nbsp;" : ch;
      return `<span class="tag-letter">${safe}</span>`;
    })
    .join("");
}

export function createHero() {
  const section = document.createElement("section");
  section.className = "scene scene-hero";
  section.innerHTML = `
    <div class="hero-inner">
      <img class="hero-logo" src="${logoUrl}" alt="Automate IT isotipo" />
      <h1 class="hero-title">AUTOMATE <span class="hero-title-accent">IT</span></h1>
      <p class="hero-tagline">${buildTagline()}</p>
      <div class="hero-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="34" height="34">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  `;
  return section;
}

export function animateHero(section) {
  const logo = section.querySelector(".hero-logo");
  const title = section.querySelector(".hero-title");
  const letters = section.querySelectorAll(".tag-letter");
  const arrow = section.querySelector(".hero-arrow");

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl.fromTo(
    logo,
    { opacity: 0, scale: 0.85 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => logo.classList.add("is-pulsing"),
    }
  );

  tl.to(title, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
  });

  tl.to(
    letters,
    {
      opacity: 1,
      y: 0,
      duration: 0.05,
      stagger: 0.045,
      ease: "power1.out",
    },
    "-=0.2"
  );

  tl.to(arrow, { opacity: 1, y: 0, duration: 0.6 }, "+=0.15");

  gsap.to(arrow, {
    y: 8,
    opacity: 0.4,
    duration: 1.3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: tl.duration() + 0.3,
  });

  return tl;
}
