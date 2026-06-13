// subir-a-drive.js
// Sube archivos a Google Drive (incl. Unidades Compartidas) con una CUENTA DE
// SERVICIO. Node nativo: firma el JWT con el módulo crypto, sin dependencias npm.
//
// Config en .env:
//   GOOGLE_SA_KEYFILE=service-account.json   (ruta al JSON de la cuenta de servicio)
//   DRIVE_FOLDER_ID=1yLk...                   (carpeta destino; opcional, hay default)
//
// IMPORTANTE: la cuenta de servicio debe estar agregada como miembro
// (Administrador de contenido) de la Unidad Compartida donde vive la carpeta.
//
// Uso directo (sube ./banco a la carpeta):  node subir-a-drive.js

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function b64url(input) {
  return Buffer.from(input).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function cargarSA(keyFile) {
  const abs = path.isAbsolute(keyFile) ? keyFile : path.join(__dirname, keyFile);
  if (!fs.existsSync(abs)) {
    throw new Error(`no encontré el JSON de la cuenta de servicio en ${abs}`);
  }
  const sa = JSON.parse(fs.readFileSync(abs, 'utf8'));
  if (!sa.client_email || !sa.private_key) {
    throw new Error('el JSON no parece una cuenta de servicio válida (faltan client_email/private_key)');
  }
  return sa;
}

// Firma un JWT y lo intercambia por un access_token OAuth2
async function obtenerToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/drive',
    aud: sa.token_uri || 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claim}`;
  const signature = crypto.createSign('RSA-SHA256').update(unsigned).sign(sa.private_key);
  const jwt = `${unsigned}.${b64url(signature)}`;

  const res = await fetch(sa.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`no pude obtener token (${res.status}): ${JSON.stringify(data).slice(0, 200)}`);
  }
  return data.access_token;
}

function mimePorExt(file) {
  const e = path.extname(file).toLowerCase();
  if (e === '.png') return 'image/png';
  if (e === '.webp') return 'image/webp';
  if (e === '.jpg' || e === '.jpeg') return 'image/jpeg';
  return 'application/octet-stream';
}

// Busca un archivo por nombre dentro de la carpeta (para sobrescribir, no duplicar)
async function buscarExistente(nombre, folderId, token) {
  const q = `name = '${nombre.replace(/'/g, "\\'")}' and '${folderId}' in parents and trashed = false`;
  const url = 'https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
    q,
    fields: 'files(id,name)',
    supportsAllDrives: 'true',
    includeItemsFromAllDrives: 'true',
  });
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json().catch(() => ({}));
  return (data.files && data.files[0]) ? data.files[0].id : null;
}

async function subirArchivo(file, folderId, token) {
  const nombre = path.basename(file);
  const mime = mimePorExt(file);
  const contenido = fs.readFileSync(file);
  const existente = await buscarExistente(nombre, folderId, token);

  if (existente) {
    // Actualiza el contenido del archivo existente (mismo nombre -> sobrescribe)
    const url = `https://www.googleapis.com/upload/drive/v3/files/${existente}?` +
      new URLSearchParams({ uploadType: 'media', supportsAllDrives: 'true', fields: 'id,name' });
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': mime },
      body: contenido,
    });
    if (!res.ok) throw new Error(`update HTTP ${res.status}: ${(await res.text()).slice(0, 160)}`);
    return 'actualizado';
  }

  // Crea uno nuevo (multipart: metadata JSON + binario)
  const boundary = 'banco_' + crypto.randomBytes(12).toString('hex');
  const meta = JSON.stringify({ name: nombre, parents: [folderId] });
  const pre = Buffer.from(
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n` +
    `--${boundary}\r\nContent-Type: ${mime}\r\n\r\n`, 'utf8');
  const post = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8');
  const body = Buffer.concat([pre, contenido, post]);

  const url = 'https://www.googleapis.com/upload/drive/v3/files?' +
    new URLSearchParams({ uploadType: 'multipart', supportsAllDrives: 'true', fields: 'id,name' });
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': `multipart/related; boundary=${boundary}` },
    body,
  });
  if (!res.ok) throw new Error(`create HTTP ${res.status}: ${(await res.text()).slice(0, 160)}`);
  return 'subido';
}

// API pública: sube todas las imágenes de una carpeta local a la carpeta de Drive
export async function subirCarpetaADrive(dir, folderId, opciones = {}) {
  const keyFile = opciones.keyFile || process.env.GOOGLE_SA_KEYFILE || 'service-account.json';
  const sa = cargarSA(keyFile);
  const token = await obtenerToken(sa);

  const archivos = fs.readdirSync(dir)
    .filter(f => /\.(png|jpe?g|webp)$/i.test(f))
    .map(f => path.join(dir, f))
    .sort();

  if (archivos.length === 0) { console.log('(Drive) No hay imágenes para subir.'); return; }

  console.log(`→ Subiendo ${archivos.length} imágenes a Google Drive (carpeta ${folderId})…`);
  let ok = 0;
  for (const file of archivos) {
    try {
      const accion = await subirArchivo(file, folderId, token);
      console.log(`   ✓ ${path.basename(file)} (${accion})`);
      ok++;
    } catch (err) {
      console.error(`   ✗ ${path.basename(file)}: ${err.message}`);
    }
  }
  console.log(`✓ Drive: ${ok}/${archivos.length} subidas a "Banco de Imagenes para Stories".`);
}

// Ejecución directa: node subir-a-drive.js  -> sube ./banco a DRIVE_FOLDER_ID
const ejecutadoDirecto = process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (ejecutadoDirecto) {
  try { process.loadEnvFile(path.join(__dirname, '.env')); } catch { /* sin .env igual intenta */ }
  const folderId = process.env.DRIVE_FOLDER_ID || '1yLkqxfnErusFIkVmAd17Sr2vJVzBnNSX';
  subirCarpetaADrive(path.join(__dirname, 'banco'), folderId)
    .catch(err => { console.error('✗ Drive:', err.message); process.exit(1); });
}
