/*! Otoño con movimiento · ~2 KB gzip. Solo corre con data-season="otono". */
(function () {
  "use strict";
  var ROOT = document.documentElement;
  if (ROOT.getAttribute("data-season") !== "otono") return;
  if (ROOT.classList.contains("st-season-hidden")) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (document.getElementById("otono-fall-layer")) return;

  var script = document.currentScript;
  var base =
    (script && script.getAttribute("data-asset-base")) ||
    (document.documentElement.getAttribute("data-otono-asset-base")) ||
    "./assets/";
  if (base.slice(-1) !== "/") base += "/";

  var narrow = window.matchMedia && window.matchMedia("(max-width:700px)").matches;
  // Desktop 14–16, móvil 6 (más ligero). Pausar del todo en móvil si data-otono-mobile="off".
  if (narrow && ROOT.getAttribute("data-otono-mobile") === "off") return;
  var COUNT = narrow ? 6 : 15;

  var KINDS = [
    { file: "hoja-arce.svg", w: [22, 34] },
    { file: "hoja-arce-ambar.svg", w: [18, 30] },
    { file: "hoja-roble.svg", w: [20, 32] },
    { file: "bellota.svg", w: [14, 22] },
  ];

  var layer = document.createElement("div");
  layer.id = "otono-fall-layer";
  layer.className = "otono-fall-layer";
  layer.setAttribute("aria-hidden", "true");

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  for (var i = 0; i < COUNT; i++) {
    var kind = KINDS[i % KINDS.length];
    var el = document.createElement("div");
    el.className = "otono-fall-leaf";
    var size = rand(kind.w[0], kind.w[1]);
    el.style.setProperty("--leaf-size", size.toFixed(1) + "px");
    el.style.setProperty("--dur", rand(narrow ? 16 : 12, narrow ? 22 : 18).toFixed(1) + "s");
    el.style.setProperty("--delay", (-rand(0, 16)).toFixed(1) + "s");
    el.style.setProperty("--drift", (rand(-70, 70)).toFixed(0) + "px");
    el.style.setProperty("--rot0", rand(-40, 40).toFixed(0) + "deg");
    el.style.setProperty("--rot1", rand(120, 280).toFixed(0) + "deg");
    el.style.setProperty("--op", rand(0.55, 0.85).toFixed(2));
    el.style.left = rand(2, 96).toFixed(1) + "%";
    var img = document.createElement("img");
    img.src = base + kind.file;
    img.alt = "";
    img.width = Math.round(size);
    img.height = Math.round(size);
    img.decoding = "async";
    img.loading = "lazy";
    el.appendChild(img);
    layer.appendChild(el);
  }

  // Guirnalda bajo el nav del sitio principal si aún no hay una.
  var nav = document.querySelector(".site-nav");
  if (nav && !nav.querySelector(".otono-nav-garland") && !document.querySelector(".st-garland")) {
    var g = document.createElement("div");
    g.className = "otono-nav-garland";
    g.setAttribute("aria-hidden", "true");
    nav.appendChild(g);
  }

  document.body.appendChild(layer);

  // Expuesto para Navidad: mismo motor, cambia assets a nieve.
  window.AutomateSeasonDecor = {
    restartSnow: function () {
      if (ROOT.getAttribute("data-season") !== "navidad") return;
      var existing = document.getElementById("otono-fall-layer");
      if (existing) existing.remove();
      var snow = document.createElement("div");
      snow.id = "otono-fall-layer";
      snow.className = "otono-fall-layer otono-snow-layer";
      snow.setAttribute("aria-hidden", "true");
      var n = narrow ? 10 : 18;
      for (var j = 0; j < n; j++) {
        var f = document.createElement("div");
        f.className = "otono-snow-flake";
        var s = rand(4, 10);
        f.style.setProperty("--flake-size", s.toFixed(1) + "px");
        f.style.setProperty("--dur", rand(10, 16).toFixed(1) + "s");
        f.style.setProperty("--delay", (-rand(0, 14)).toFixed(1) + "s");
        f.style.setProperty("--drift", (rand(-50, 50)).toFixed(0) + "px");
        f.style.setProperty("--rot0", "0deg");
        f.style.setProperty("--rot1", rand(0, 90).toFixed(0) + "deg");
        f.style.setProperty("--op", rand(0.5, 0.95).toFixed(2));
        f.style.left = rand(1, 99).toFixed(1) + "%";
        snow.appendChild(f);
      }
      document.body.appendChild(snow);
    },
  };
})();
