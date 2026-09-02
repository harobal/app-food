function safeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function buildTelHref(phone: unknown): string | undefined {
  const raw = safeString(phone).trim();
  if (!raw) return undefined;

  const normalized = raw.replace(/[^\d+]/g, "");
  if (!normalized) return undefined;

  return `tel:${normalized}`;
}

export function buildWhatsAppHref(whatsapp: unknown): string | undefined {
  const raw = safeString(whatsapp).trim();
  if (!raw) return undefined;

  const numberOnly = raw.replace(/\D/g, "");
  if (!numberOnly) return undefined;

  return `https://wa.me/${numberOnly}`;
}
