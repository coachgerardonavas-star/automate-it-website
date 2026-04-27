import { createHero, animateHero } from "./scenes/Hero.js";
import { createChaos, animateChaos } from "./scenes/Chaos.js";
import { createTunnel, animateTunnel } from "./scenes/Tunnel.js";
import { createPantalla, animatePantalla } from "./scenes/Pantalla.js";
import { createCierre, animateCierre } from "./scenes/Cierre.js";

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
});
