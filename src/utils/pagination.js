export function normalizeLimit(limit) {
  const parsed = Number(limit);

  if (Number.isNaN(parsed) || parsed <= 0) return 20;
  return Math.min(parsed, 100);
}