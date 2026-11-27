import assert from "node:assert/strict";
import { BUSINESS_TYPE_OPTIONS, toBusinessTypeOption } from "../src/business-type.ts";

const canonical = [
  "Salón / Spa", "Clínica dental", "Firma legal / Notaría", "Inmobiliaria",
  "Servicios del hogar", "Terapeuta / Psicólogo", "SLP / Clínica de salud",
  "Consultor / Freelancer", "Restaurante / Comida", "Otro",
];
assert.deepEqual([...BUSINESS_TYPE_OPTIONS], canonical);
for (const option of canonical) assert.equal(toBusinessTypeOption(option), option);

for (const [input, expected] of [
  ["  SALON / SPA  ", "Salón / Spa"],
  ["clínica dental", "Clínica dental"],
  ["CLÍNICA DENTAL", "Clínica dental"],
  ["firma legal / notaria", "Firma legal / Notaría"],
  ["Clínica dental".normalize("NFD"), "Clínica dental"],
  ["Food truck", "Otro"],
  ["psicologo", "Otro"],
  ["", "Otro"],
  [undefined, "Otro"],
]) assert.equal(toBusinessTypeOption(input), expected);

console.log("diagnostico-intake business type mapping: OK");
