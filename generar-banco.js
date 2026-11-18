// generar-banco.js
// Banco de imágenes de marca para Automate IT — Instagram Stories (9:16).
// En cada corrida: elige al azar un lote de prompts del NEGOCIO, los genera con
// Hugging Face (FLUX.1-schnell), los reescala a 1080×1920 y los sube a Google Drive.
// Nombres únicos con fecha -> la biblioteca CRECE (no sobrescribe).
// Solo Node.js nativo (fetch + fs) + reescalar-banco.ps1. Proyecto ESM ("type":"module").
//
// Requisitos en .env: HF_TOKEN, (opcional) GOOGLE_IMPERSONATE_SUBJECT, GOOGLE_SA_KEYFILE.
// Knobs por env: BANCO_BATCH (cuántos prompts por corrida), BANCO_VARIANTS (versiones por prompt).
// Uso:  node generar-banco.js

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { subirCarpetaADrive } from './subir-a-drive.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

// ── Parámetros de marca / lote ────────────────────────────────────────────────
const WIDTH = 1080;
const HEIGHT = 1920;
const STEPS = 4;
const BATCH_SIZE = Number(process.env.BANCO_BATCH || 6);          // prompts por corrida
const VARIANTS_PER_PROMPT = Number(process.env.BANCO_VARIANTS || 1); // versiones por prompt
const TIMEOUT_MS = 180000;
const REINTENTOS = 3;
const OUT_DIR = path.join(__dirname, 'banco');

// Carpeta destino en Google Drive ("Banco de Imagenes para Stories").
const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID || '1yLkqxfnErusFIkVmAd17Sr2vJVzBnNSX';

// Estilo de marca aplicado a TODOS los prompts (schnell ignora negative prompts -> positivo).
const ESTILO = [
  'dark navy background #0A0E1A and #003DA5',
  'cold blue lighting only, never warm or orange light',
  'slightly desaturated cold color grade with mid-blue tones in the shadows',
  'no generic stock imagery: no handshakes, no lightbulbs, no hands-on-keyboard clichés',
  'no golden gradients, no gold particles, no warm colors',
  'photorealistic, vertical 9:16 composition',
].join(', ');

// ── POOL de prompts del negocio de Automate IT ────────────────────────────────
// Tema central: mejora operativa para pequeños negocios en crecimiento — estado de
// pedidos, evidencias ligadas al expediente, fechas límite, papeleo, Smart Tap.
// (Sin agentes de voz ni recepción telefónica: servicio descontinuado jul 2026.)
const POOL = [
  { nombre: 'latino-business-owner-reviewing-workflow', prompt: 'Latino small business owner reviewing a simple workflow board in a modern office, confident, professional tech setup' },
  { nombre: 'order-status-tracker', prompt: 'Order status tracker on a screen showing stages measured, in production, ready to install, no people, technical' },
  { nombre: 'order-status-update-message', prompt: 'Smartphone screen showing an automatic order status update message to a customer, close up macro detail' },
  { nombre: 'contractor-job-photo-evidence', prompt: 'Roofing contractor taking a job site photo on a smartphone that uploads to the customer file, realistic' },
  { nombre: 'whatsapp-business-chatbot', prompt: 'Smartphone showing a WhatsApp Business chat where an automated assistant replies to a customer instantly, close up UI' },
  { nombre: 'online-booking-calendar-app', prompt: 'Online appointment booking calendar app on a smartphone, customer selecting an available time slot, UI detail' },
  { nombre: 'appointment-reminder-sms', prompt: 'Automated appointment reminder text message on a phone screen, clean UI macro shot' },
  { nombre: 'salon-owner-with-client', prompt: 'Hair salon owner attending a client while a booking happens automatically on a tablet, modern salon' },
  { nombre: 'dental-clinic-automated-checkin', prompt: 'Dental clinic reception with an automated self check-in tablet, clean clinical environment, no staff' },
  { nombre: 'auto-repair-job-status-board', prompt: 'Auto repair shop with a job status board near a car lift, mechanic, realistic workshop' },
  { nombre: 'deadline-tracking-concept', prompt: 'Deadline tracking concept, a calendar with upcoming due dates and alerts, technical atmosphere, no people' },
  { nombre: 'lead-capture-crm-dashboard', prompt: 'CRM lead capture dashboard on a laptop screen showing incoming leads in real time, data visualization' },
  { nombre: 'customer-visits-dashboard', prompt: 'Dashboard showing customer visit frequency and customers drifting away, charts, screen detail' },
  { nombre: 'hispanic-entrepreneur-smartphone', prompt: 'Hispanic entrepreneur using a smartphone to manage their business, professional portrait' },
  { nombre: 'customer-booking-late-night', prompt: 'Customer booking an appointment on their smartphone late at night, screen glow on the face, realistic' },
  { nombre: 'paperwork-follow-up-checklist', prompt: 'Digital checklist of pending documents and signatures with completed items checked off, futuristic, no real people' },
  { nombre: 'customer-tap-card-checkin', prompt: 'Customer tapping a loyalty club card on a phone at a small business counter, realistic' },
  { nombre: 'real-estate-agent-multitasking', prompt: 'Real estate agent showing a property while their phone receives automated inquiries, realistic' },
  { nombre: 'gym-owner-training-client', prompt: 'Gym owner training a client while new memberships get booked automatically on a screen nearby' },
  { nombre: 'operations-status-dashboard', prompt: 'Modern operations dashboard on a screen with job status indicators, tech environment' },
  { nombre: 'customer-file-with-photos', prompt: 'Customer file interface with job photos and documents attached in one place, technical UI, no people' },
  { nombre: 'follow-up-automation-flow', prompt: 'Automation workflow diagram for customer follow-up messages, connected nodes, technical' },
  { nombre: 'five-star-reviews-phone', prompt: 'Five star customer reviews appearing on a smartphone screen, rating notifications, macro shot' },
  { nombre: 'owner-overwhelmed-by-everything', prompt: 'Overwhelmed small business owner surrounded by sticky notes, paperwork and message notifications, stressed, moody' },
  { nombre: 'relaxed-owner-automation-working', prompt: 'Relaxed business owner enjoying coffee while order updates and follow-ups run on screens behind them, calm' },
  { nombre: 'workflow-map-visualization', prompt: 'Map of how work flows through a small business, highlighting where information gets lost, no people, technical' },
  { nombre: 'restaurant-reservation-tablet', prompt: 'Restaurant self check-in and reservation tablet at the entrance, modern hospitality tech' },
  { nombre: 'team-monitoring-automation', prompt: 'Small team monitoring an automation dashboard on a large screen in a modern office, cool lighting' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function dosDigitos(n) { return String(n).padStart(2, '0'); }

function sello(d) {
  return `${d.getFullYear()}-${dosDigitos(d.getMonth() + 1)}-${dosDigitos(d.getDate())}` +
         `_${dosDigitos(d.getHours())}${dosDigitos(d.getMinutes())}${dosDigitos(d.getSeconds())}`;
}

// Muestreo aleatorio sin reemplazo (Fisher–Yates)
function elegirAlAzar(arr, n) {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, Math.min(n, copia.length));
}

function dimensionesPng(buf) {
  const esPng = buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  return esPng ? { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) } : null;
}

async function fetchConTimeout(url, options) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try { return await fetch(url, { ...options, signal: ctrl.signal }); }
  finally { clearTimeout(t); }
}

async function pedirImagen(promptFinal, seed) {
  const opciones = {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${HF_TOKEN}`, 'Content-Type': 'application/json', 'Accept': 'image/png' },
    body: JSON.stringify({ inputs: promptFinal, parameters: { width: WIDTH, height: HEIGHT, num_inference_steps: STEPS, seed } }),
  };
  let ultimo;
  for (const url of ENDPOINTS) {
    const res = await fetchConTimeout(url, opciones);
    if (res.status === 404) { ultimo = res; continue; }
    return res;
  }
  return ultimo;
}

async function generar(tarea, runDir, stamp) {
  const { item, seed, etiqueta } = tarea;
  const promptFinal = `${item.prompt}, ${ESTILO}`;
  console.log(`${etiqueta} ${item.nombre} (seed ${seed})`);

  for (let intento = 1; intento <= REINTENTOS + 1; intento++) {
    try {
      const res = await pedirImagen(promptFinal, seed);
      const ct = res.headers.get('content-type') || '';
      if (!res.ok) {
        const txt = await res.text();
        if (res.status === 503) {
          let espera = 20;
          try { espera = Math.ceil(JSON.parse(txt).estimated_time || 20); } catch {}
          console.error(`${etiqueta}   ⏳ Modelo cargando, espero ${espera}s…`);
          await new Promise(r => setTimeout(r, espera * 1000));
          continue;
        }
        throw new Error(`HTTP ${res.status}: ${txt.slice(0, 160)}`);
      }
      if (!ct.startsWith('image/')) throw new Error(`respuesta no-imagen (${ct})`);

      const buf = Buffer.from(await res.arrayBuffer());
      const ext = ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : 'jpg';
      const file = path.join(runDir, `${stamp}_${item.nombre}_seed${seed}.${ext}`);
      fs.writeFileSync(file, buf);
      const dim = dimensionesPng(buf);
      console.log(`${etiqueta}   ✓ ${path.basename(file)} — ${dim ? `${dim.w}×${dim.h}` : '?'} (${(buf.length / 1024).toFixed(0)} KB)`);
      return true;
    } catch (err) {
      console.error(`${etiqueta}   ✗ Intento ${intento}: ${err.message}`);
      if (intento <= REINTENTOS) await new Promise(r => setTimeout(r, 2000 * intento));
    }
  }
  return false;
}

async function main() {
  if (!HF_TOKEN) { console.error('✗ Falta HF_TOKEN en .env.'); process.exit(1); }

  const d = new Date();
  const stamp = sello(d);
  const runDir = path.join(OUT_DIR, stamp);
  fs.mkdirSync(runDir, { recursive: true });

  // Arma el lote: BATCH_SIZE prompts al azar × VARIANTS_PER_PROMPT versiones (semilla distinta)
  const elegidos = elegirAlAzar(POOL, BATCH_SIZE);
  const tareas = [];
  for (const item of elegidos) {
    for (let v = 0; v < VARIANTS_PER_PROMPT; v++) {
      tareas.push({ item, seed: Math.floor(Math.random() * 1_000_000_000) });
    }
  }
  tareas.forEach((t, i) => { t.etiqueta = `[${i + 1}/${tareas.length}]`; });

  console.log(`Carpeta local : ${runDir}`);
  console.log(`Modelo        : ${MODEL}`);
  console.log(`Lote          : ${elegidos.length} prompts × ${VARIANTS_PER_PROMPT} versión(es) = ${tareas.length} imágenes`);
  console.log(`Tamaño        : ${WIDTH}×${HEIGHT}\n`);

  let ok = 0;
  for (const tarea of tareas) if (await generar(tarea, runDir, stamp)) ok++;
  console.log(`\n✓ Generadas: ${ok}/${tareas.length}`);
  if (ok === 0) { console.error('✗ No se generó ninguna imagen; aborto reescalado y subida.'); process.exit(1); }

  // Reescalado a 1080×1920 exacto (solo el lote de esta corrida)
  if (process.platform === 'win32') {
    const ps = path.join(__dirname, 'reescalar-banco.ps1');
    if (fs.existsSync(ps)) {
      console.log(`\n→ Reescalando a ${WIDTH}×${HEIGHT}…`);
      const r = spawnSync('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', ps,
        '-Width', String(WIDTH), '-Height', String(HEIGHT), '-Dir', runDir], { stdio: 'inherit' });
      if (r.status !== 0) console.error('⚠ El reescalado no terminó bien.');
    }
  }

  // Subida a Google Drive (acumula: nombres únicos por fecha+semilla)
  try {
    await subirCarpetaADrive(runDir, DRIVE_FOLDER_ID);
  } catch (err) {
    console.error(`⚠ No pude subir a Drive: ${err.message}`);
    console.error(`  Las imágenes están en ${runDir}.`);
  }
}

main().catch((err) => { console.error('✗ Error inesperado:', err); process.exit(1); });
