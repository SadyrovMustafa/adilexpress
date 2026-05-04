/** Цена в кыргызских сомах (ISO 4217: KGS). */
export function formatKgs(amount: number): string {
  if (!Number.isFinite(amount)) {
    return "—";
  }
  const n = Math.round(amount);
  const formatted = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(n);
  return `${formatted} сом KGS`;
}
