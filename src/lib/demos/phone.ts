export function telHref(display: string) {
  const raw = display.trim();
  if (raw.length < 8 || raw.length > 20) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  if (raw.startsWith("+")) return `tel:+${digits}`;
  if (digits.startsWith("0")) return `tel:+44${digits.slice(1)}`;
  return `tel:+${digits}`;
}

export function whatsAppHref(display: string) {
  const digits = display.replace(/\D/g, "");
  const normalised = digits.startsWith("0") ? `44${digits.slice(1)}` : digits;
  if (!/^447\d{9}$/.test(normalised)) return null;
  return `https://wa.me/${normalised}`;
}
