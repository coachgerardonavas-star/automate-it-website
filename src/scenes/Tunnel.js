import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./tunnel.css";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  {
    at: 0.25,
    title: "Tus leads, capturados.",
    sub: "Cada prospecto registrado, calificado y listo para convertir.",
  },
  {
    at: 0.50,
    title: "Tu data, organizada.",
    sub: "Bases de datos limpias, seguras y funcionando 24/7.",
  },
  {
    at: 0.75,
    title: "Tu cliente, atendido.",
    sub: "Respuestas automáticas. Seguimiento perfecto. Cero fricción.",
  },
  {
    at: 0.95,
    title: "Todo. En uno.",
    sub: "Un sistema que trabaja mientras tú vives.",
    final: true,
    plateau: 0.04,
  },
];

function makeSoftParticleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  g.addColorStop(0,   "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.4)");
  g.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export function createTunnel() {
  const section = document.createElement("section");
  section.className = "scene scene-tunnel";
  section.innerHTML = `
    <div class="tunnel-stage">
      <div class="tunnel-canvas-host"></div>
      <div class="tunnel-overlay">
        ${NODES.map((n, i) => `
          <article class="tunnel-node${n.final ? " tunnel-node--final" : ""}" data-idx="${i}">
            <h2 class="tunnel-node-title">${n.title}</h2>
            <p class="tunnel-node-sub">${n.sub}</p>
          </article>
        `).join("")}
      </div>
      <div class="tunnel-fade"></div>
    </div>
  `;
  return section;
}

export function animateTunnel(section) {
  const host     = section.querySelector(".tunnel-canvas-host");
  const nodeEls  = section.querySelectorAll(".tunnel-node");
  const fadeEl   = section.querySelector(".tunnel-fade");

  // ── Renderer ───────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  host.appendChild(renderer.domElement);

  // ── Scene ──────────────────────────────────────
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050A18);
  scene.fog = new THREE.Fog(0x050A18, 4, 32);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );

  // ── Curve sinuosa ──────────────────────────────
  const curvePoints = [
    new THREE.Vector3( 0,    0,     0),
    new THREE.Vector3( 2.2,  0.6,  -10),
    new THREE.Vector3(-1.4, -1.2,  -20),
    new THREE.Vector3( 3,    0.9,  -30),
    new THREE.Vector3(-2.5,  0.4,  -40),
    new THREE.Vector3( 1.2, -1.5,  -50),
    new THREE.Vector3(-3.2,  0.3,  -60),
    new THREE.Vector3( 2.5,  1.2,  -70),
    new THREE.Vector3(-1.3, -0.7,  -80),
    new THREE.Vector3( 0.6,  0.4,  -90),
    new THREE.Vector3(-0.8,  0.1, -100),
    new THREE.Vector3( 0,    0,   -110),
  ];
  const curve = new THREE.CatmullRomCurve3(curvePoints);
  curve.tension = 0.5;

  // ── Tube — dos capas ───────────────────────────
  const tubeGeom = new THREE.TubeGeometry(curve, 500, 2.2, 18, false);

  const tubeInner = new THREE.Mesh(
    tubeGeom,
    new THREE.MeshBasicMaterial({
      color: 0x0052CC,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    })
  );
  scene.add(tubeInner);

  const tubeWire = new THREE.Mesh(
    tubeGeom,
    new THREE.MeshBasicMaterial({
      color: 0x00D9FF,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    })
  );
  scene.add(tubeWire);

  // ── Partículas ─────────────────────────────────
  const PARTICLE_COUNT = 2000;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = Math.random();
    const p = curve.getPointAt(t);
    const dir = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();
    const r = 0.3 + Math.random() * 3.2;
    p.add(dir.multiplyScalar(r));
    positions[i * 3]     = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
  }
  const particleGeom = new THREE.BufferGeometry();
  particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const particles = new THREE.Points(
    particleGeom,
    new THREE.PointsMaterial({
      color: 0x00D9FF,
      size: 0.15,
      map: makeSoftParticleTexture(),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
  );
  scene.add(particles);

  // ── Camera driver ──────────────────────────────
  const proxy    = { t: 0 };
  const lookVec  = new THREE.Vector3();

  function updateCamera() {
    const t = Math.max(0.0001, Math.min(0.9999, proxy.t));
    camera.position.copy(curve.getPointAt(t));
    lookVec.copy(curve.getPointAt(Math.min(0.9999, t + 0.012)));
    camera.lookAt(lookVec);
  }

  function updateNodes() {
    const t = proxy.t;
    const fadeWidth = 0.05;
    for (let i = 0; i < NODES.length; i++) {
      const n = NODES[i];
      const plateau = n.plateau || 0;
      const d = Math.abs(t - n.at);
      let op;
      if (d <= plateau) {
        op = 1;
      } else if (d < plateau + fadeWidth) {
        op = 1 - (d - plateau) / fadeWidth;
      } else {
        op = 0;
      }
      nodeEls[i].style.opacity = op.toFixed(3);
    }
  }

  // ── Render loop ────────────────────────────────
  function animate() {
    particles.rotation.y += 0.0004;
    particles.rotation.x += 0.0002;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  // ── Resize ─────────────────────────────────────
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── ScrollTrigger: scrub con zonas lentas ──────
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: () => {
        updateCamera();
        updateNodes();
      },
    },
  });

  // Segmentos: tramo rápido + pausa lenta en cada nodo.
  // Pausa = misma "duración" de scroll que un tramo normal pero
  // avanza solo 0.06 de t (vs 0.22) → ~4× más lento visualmente.
  tl.to(proxy, { t: 0.22, duration: 22, ease: "none" });
  tl.to(proxy, { t: 0.28, duration: 10, ease: "sine.inOut" });
  tl.to(proxy, { t: 0.47, duration: 20, ease: "none" });
  tl.to(proxy, { t: 0.53, duration: 10, ease: "sine.inOut" });
  tl.to(proxy, { t: 0.72, duration: 20, ease: "none" });
  tl.to(proxy, { t: 0.78, duration: 10, ease: "sine.inOut" });
  tl.to(proxy, { t: 0.90, duration: 16, ease: "none" });
  tl.to(proxy, { t: 0.99, duration: 20, ease: "sine.inOut" });
  tl.to(fadeEl, { opacity: 1, duration: 10, ease: "power1.in" });

  updateCamera();
  updateNodes();

  return { renderer, scene, camera };
}
