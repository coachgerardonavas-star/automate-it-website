import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const serverDir = fileURLToPath(new URL("../dist/server/", import.meta.url));
const chunksDir = join(serverDir, "chunks");
const hiddenChunks = [];

function scan(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) scan(path);
    else if (entry.name.startsWith(".") && entry.name.endsWith(".mjs")) {
      hiddenChunks.push(path);
    }
  }
}

scan(chunksDir);
if (hiddenChunks.length) {
  throw new Error(`Wrangler omite chunks con punto inicial: ${hiddenChunks.join(", ")}`);
}

const entry = join(serverDir, "entry.mjs");
if (!statSync(entry).isFile()) throw new Error("Falta el entrypoint del Worker");
console.log("[check-worker-chunks] entrypoint presente; sin chunks ocultos");
