import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { createHero, animateHero } from "./scenes/Hero.js";
import { createChaos, animateChaos } from "./scenes/Chaos.js";
import { createTunnel, animateTunnel } from "./scenes/Tunnel.js";
import { createPantalla, animatePantalla } from "./scenes/Pantalla.js";
import { createCierre, animateCierre } from "./scenes/Cierre.js";

gsap.registerPlugin(ScrollTrigger);

const easeInOutQuart = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

const lenis = new Lenis({
  duration: 1.2,
  easing: easeInOutQuart,
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 0.5,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

window.lenis = lenis;

const app = document.getElementById("app");

const hero = createHero();
app.appendChild(hero);

const chaos = createChaos();
app.appendChild(chaos);

const tunnel = createTunnel();
app.appendChild(tunnel);

const pantalla = createPantalla();
app.appendChild(pantalla);

const cierre = createCierre();
app.appendChild(cierre);

requestAnimationFrame(() => {
  animateHero(hero);
  animateChaos(chaos);
  animateTunnel(tunnel);
  animatePantalla(pantalla);
  animateCierre(cierre);
  ScrollTrigger.refresh();
});
