/**
 * Renderiza los 6 brochures HTML del design system y los exporta como PNG
 * a public/assets/brochures/. Resolución A4 portrait 794x1123 (96 dpi),
 * fondo forzado #05080F.
 *
 * Uso: node scripts/generate-brochures.mjs [path-a-carpeta-brochures]
 *
 * Si no se pasa ruta, asume:
 *   C:\Users\Gerardo\Downloads\Automate IT Design System (1)\brochures
 */

import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";

const DEFAULT_SOURCE =
  "C:\\Users\\Gerardo\\Downloads\\Automate IT Design System (1)\\brochures";
const SOURCE_DIR = process.argv[2] || DEFAULT_SOURCE;
const OUT_DIR = path.resolve("public/assets/brochures");
const WIDTH = 794;
const HEIGHT = 1123;
const BG = "#05080F";

const MAPPING = [
  { src: "01-voz-inbound.html", out: "brochure-01-inbound.png" },
  { src: "02-voz-outbound.html", out: "brochure-02-outbound.png" },
  { src: "03-chatbot.html", out: "brochure-03-chatbot.png" },
  { src: "04-crm.html", out: "brochure-04-crm.png" },
  { src: "05-marketing.html", out: "brochure-05-marketing.png" },
  { src: "06-scale.html", out: "brochure-06-scale.png" },
];

if (!existsSync(SOURCE_DIR)) {
  console.error(`No existe la carpeta: ${SOURCE_DIR}`);
  process.exit(1);
}

await fs.mkdir(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: "new",
  args: [
    "--allow-file-access-from-files",
    "--disable-web-security",
    "--no-sandbox",
  ],
});

let success = 0;
let failed = 0;

for (const { src, out } of MAPPING) {
  const filePath = path.join(SOURCE_DIR, src);
  if (!existsSync(filePath)) {
    console.error(`✗ falta: ${src}`);
    failed++;
    continue;
  }

  const page = await browser.newPage();
  await page.setViewport({
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
  });

  const fileUrl = "file:///" + filePath.replace(/\\/g, "/");

  try {
    await page.goto(fileUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    // React + Babel UMD necesita unos ms post-networkidle para hidratarse
    await page.waitForFunction(
      () => document.querySelector("#root")?.children.length > 0,
      { timeout: 15000 }
    );
    await page.evaluate((bg) => {
      document.documentElement.style.background = bg;
      document.body.style.background = bg;
      document.body.style.margin = "0";
    }, BG);
    // Pequeña espera por si hay animaciones de entrada
    await new Promise((r) => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(OUT_DIR, out),
      type: "png",
      omitBackground: false,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });
    console.log(`✓ ${out}`);
    success++;
  } catch (e) {
    console.error(`✗ ${out}: ${e.message}`);
    failed++;
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`\nDone. ${success}/${MAPPING.length} screenshots generated.`);
if (failed > 0) process.exit(1);
