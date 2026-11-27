export const BUSINESS_TYPE_OPTIONS = [
  "Salón / Spa",
  "Clínica dental",
  "Firma legal / Notaría",
  "Inmobiliaria",
  "Servicios del hogar",
  "Terapeuta / Psicólogo",
  "SLP / Clínica de salud",
  "Consultor / Freelancer",
  "Restaurante / Comida",
  "Otro",
] as const;

export function norm(v?: string): string {
  return (v || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}

export function toBusinessTypeOption(v?: string): string {
  const match = BUSINESS_TYPE_OPTIONS.find((o) => norm(o) === norm(v));
  return match || "Otro";
}
