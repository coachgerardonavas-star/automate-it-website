import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const worker = readFileSync(resolve(here, "../src/index.ts"), "utf8");
const form = readFileSync(resolve(here, "../../../src/components/DiagnosticoForm.astro"), "utf8");

const fields = [
  "name", "email", "phone", "business_name", "public_url", "role", "business_type",
  "weekly_demand", "entry_channels", "friction", "frequency", "desired_outcome",
  "key_person_dependency", "urgency", "regulated", "context",
];
for (const field of fields) {
  assert.match(form, new RegExp(`name=["']${field}["']`), `form missing ${field}`);
  assert.match(worker, new RegExp(`\\b${field}\\?`), `worker Payload missing ${field}`);
}
assert.match(form, /entry_channels:entry,lang:/, "form must send entry_channels[] and lang");
assert.match(worker, /lang\?: string/, "worker Payload missing lang");

const makeBody = worker.match(/body: JSON\.stringify\(\{ fields: \{([\s\S]*?)\} \}\)/)?.[1] || "";
const makeKeys = [...`{${makeBody}}`.matchAll(/(?:\{|,)\s*(firstname|email|phone|address|industry|message)(?=\s*:|\s*[,}])/g)].map(m => m[1]);
assert.deepEqual(makeKeys, ["firstname", "email", "phone", "address", "industry", "message"],
  "Make 5148358 contract changed");

assert.doesNotMatch(worker, /team_size|30_plus|MEMBER_BY_PAIN|\bpain\?/, "legacy qualification remains");
assert.match(worker, /if \(isRegulatedRisk\(p\)\) return null;/, "regulated leads must not call Make");
assert.match(worker, /\["si", "yes", "no estoy seguro", "not sure"\]/,
  "yes and unsure must use the manual privacy route");

console.log("diagnostico-intake contract and privacy guards: OK");
