// generar-banco.js
// Banco de imágenes de marca para Automate IT — Instagram Stories (9:16).
// Genera imágenes con la Inference API de Hugging Face (FLUX.1-schnell) y las
// guarda en ./banco/. Solo Node.js nativo (fetch + fs, sin dependencias).
// Proyecto con "type": "module" -> sintaxis ESM.
//
// Requisito: token gratis de Hugging Face con permiso "Inference Providers" en
// .env como:  HF_TOKEN=hf_xxxxxxxx   (crear en https://huggingface.co/settings/tokens)
//
// Uso:  node generar-banco.js

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { subirCarpetaADrive } from './subir-a-drive.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargar .env (Node 24 nativo) para leer HF_TOKEN
try {
  process.loadEnvFile(path.join(__dirname, '.env'));
} catch (err) {
  console.error(`✗ No pude leer .env: ${err.message}`);
  process.exit(1);
}

const HF_TOKEN = process.env.HF_TOKEN;
const MODEL = 'black-forest-labs/FLUX.1-schnell';

const ENDPOINTS = [
  `https://router.huggingface.co/hf-inference/models/${MODEL}`,
  `https://api-inference.huggingface.co/models/${MODEL}`,
];

// ── Parámetros de marca Automate IT ───────────────────────────────────────────
// Stories de Instagram 9:16. Nota: FLUX trabaja en múltiplos de 16; 1080 no lo es,
// así que HF puede devolver 1072×1920. El script reporta el tamaño REAL generado.
const WIDTH = 1080;
const HEIGHT = 1920;
const STEPS = 4;             // FLUX.1-schnell está optimizado para 1-4 pasos

// Estilo base aplicado a TODOS los prompts (paleta fría, navy, sin stock genérico,
// sin colores cálidos). Como schnell ignora negative prompts, va en positivo.
const ESTILO = [
  'dark navy background #0A0E1A and #003DA5',
  'cold blue lighting only, never warm or orange light',
  'slightly desaturated cold color grade with mid-blue tones in the shadows',
  'no generic stock imagery: no handshakes, no lightbulbs, no hands-on-keyboard clichés',
  'no golden gradients, no gold particles, no warm colors',
  'photorealistic, vertical 9:16 composition',
].join(', ');

// Prompts con nombre de archivo descriptivo. El prompt final = prompt + ESTILO.
const PROMPTS = [
  {
    nombre: 'latino-business-owner-answering-phone',
    prompt: 'Latino small business owner answering phone in modern office, cold blue lighting, dark navy background, professional tech setup, photorealistic, desaturated cold tones',
  },
  {
    nombre: 'missed-call-notification-smartphone',
    prompt: 'Missed call notification on smartphone screen, dark background #0A0E1A, cyan neon glow #00D9FF, close up detail shot, cold lighting, no warm colors',
  },
  {
    nombre: 'ai-voice-assistant-interface',
    prompt: 'AI voice assistant interface visualization, dark navy environment, corporate blue #0052CC data streams, cold technical atmosphere, no people',
  },
  {
    nombre: 'restaurant-owner-stressed-missed-calls',
    prompt: 'Small restaurant owner looking stressed at phone with multiple missed calls, dark moody lighting, cold blue tones, realistic photography style',
  },
  {
    nombre: 'automated-reception-dashboard',
    prompt: 'Modern automated reception system dashboard on screen, dark background, cyan and blue neon accents, no warm colors, tech environment',
  },
];

const TIMEOUT_MS = 180000;   // 3 min por imagen (resolución alta = más lento)
const REINTENTOS = 3;        // reintentos ante fallo transitorio / modelo cargando
const OUT_DIR = path.join(__dirname, 'banco');

// Carpeta destino en Google Drive ("Banco de Imagenes para Stories", Unidad Compartida).
// Se puede sobreescribir con DRIVE_FOLDER_ID en .env.
const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID || '1yLkqxfnErusFIkVmAd17Sr2vJVzBnNSX';

// Lee el ancho/alto reales de un PNG desde su cabecera IHDR (bytes 16-23). Sin deps.
function dimensionesPng(buf) {
  const esPng = buf.length > 24 &&
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  if (!esPng) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

async function fetchConTimeout(url, options) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function pedirImagen(promptFinal) {
  const opciones = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'image/png',
    },
    body: JSON.stringify({
      inputs: promptFinal,
      parameters: { width: WIDTH, height: HEIGHT, num_inference_steps: STEPS },
    }),
  };
  // Prueba endpoints en orden; salta al siguiente solo si el primero da 404
  let ultimo;
  for (const url of ENDPOINTS) {
    const res = await fetchConTimeout(url, opciones);
    if (res.status === 404) { ultimo = res; continue; }
    return res;
  }
  return ultimo;
}

async function generar(item, index) {
  const etiqueta = `[${index + 1}/${PROMPTS.length}]`;
  const promptFinal = `${item.prompt}, ${ESTILO}`;
  console.log(`${etiqueta} ${item.nombre}`);

  for (let intento = 1; intento <= REINTENTOS + 1; intento++) {
    try {
      const res = await pedirImagen(promptFinal);
      const ct = res.headers.get('content-type') || '';

      if (!res.ok) {
        const txt = await res.text();
        if (res.status === 503) { // modelo cargando
          let espera = 20;
          try { espera = Math.ceil(JSON.parse(txt).estimated_time || 20); } catch {}
          console.error(`${etiqueta}   ⏳ Modelo cargando, espero ${espera}s…`);
          await new Promise(r => setTimeout(r, espera * 1000));
          continue;
        }
        throw new Error(`HTTP ${res.status}: ${txt.slice(0, 200)}`);
      }

      if (!ct.startsWith('image/')) {
        const txt = await res.text();
        throw new Error(`respuesta no-imagen (${ct}): ${txt.slice(0, 200)}`);
      }

      const buf = Buffer.from(await res.arrayBuffer());
      const ext = ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : 'jpg';
      const file = path.join(OUT_DIR, `${String(index + 1).padStart(2, '0')}-${item.nombre}.${ext}`);
      fs.writeFileSync(file, buf);

      const dim = dimensionesPng(buf);
      const tam = dim ? `${dim.w}×${dim.h}px` : 'tamaño desconocido';
      const aviso = dim && (dim.w !== WIDTH || dim.h !== HEIGHT) ? `  ⚠ HF ajustó el tamaño (pediste ${WIDTH}×${HEIGHT})` : '';
      console.log(`${etiqueta}   ✓ ${path.basename(file)} — ${tam}, ${(buf.length / 1024).toFixed(0)} KB${aviso}`);
      return true;
    } catch (err) {
      console.error(`${etiqueta}   ✗ Intento ${intento} falló: ${err.message}`);
      if (intento <= REINTENTOS) await new Promise(r => setTimeout(r, 2000 * intento));
    }
  }
  return false;
}

async function main() {
  if (!HF_TOKEN) {
    console.error('✗ Falta HF_TOKEN en .env.');
    console.error('  Crea un token gratis (permiso "Inference Providers") en https://huggingface.co/settings/tokens');
    console.error('  y agrégalo a .env como:  HF_TOKEN=hf_xxxxxxxx');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`Carpeta de salida: ${OUT_DIR}`);
  console.log(`Modelo: ${MODEL}`);
  console.log(`Tamaño solicitado: ${WIDTH}×${HEIGHT} (Instagram Stories 9:16)`);
  console.log(`Generando ${PROMPTS.length} imágenes de marca Automate IT…\n`);

  let ok = 0;
  for (let i = 0; i < PROMPTS.length; i++) {
    if (await generar(PROMPTS[i], i)) ok++;
  }

  console.log(`\n✓ Generadas: ${ok}/${PROMPTS.length} imágenes en ./banco/`);

  // Reescalado automático al tamaño exacto de marca (FLUX redondea a múltiplo de 16,
  // p. ej. 1072×1920; aquí lo llevamos a ${WIDTH}×${HEIGHT}). Usa System.Drawing en Windows.
  if (ok > 0 && process.platform === 'win32') {
    const ps = path.join(__dirname, 'reescalar-banco.ps1');
    if (fs.existsSync(ps)) {
      console.log(`\n→ Reescalando a ${WIDTH}×${HEIGHT} exacto…`);
      const r = spawnSync('powershell', [
        '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', ps,
        '-Width', String(WIDTH), '-Height', String(HEIGHT), '-Dir', OUT_DIR,
      ], { stdio: 'inherit' });
      if (r.status !== 0) {
        console.error('⚠ El reescalado no terminó bien; las imágenes quedaron en el tamaño que devolvió HF.');
      }
    } else {
      console.error('⚠ No encontré reescalar-banco.ps1; omito el reescalado.');
    }
  }

  // Subida automática a Google Drive (cada corrida, tras generar + reescalar)
  if (ok > 0) {
    try {
      await subirCarpetaADrive(OUT_DIR, DRIVE_FOLDER_ID);
    } catch (err) {
      console.error(`⚠ No pude subir a Drive: ${err.message}`);
      console.error('  Las imágenes están en ./banco/. Revisa GOOGLE_SA_KEYFILE en .env');
      console.error('  y que la cuenta de servicio sea miembro de la Unidad Compartida.');
    }
  }

  if (ok < PROMPTS.length) process.exit(1);
}

main().catch((err) => {
  console.error('✗ Error inesperado:', err);
  process.exit(1);
});
