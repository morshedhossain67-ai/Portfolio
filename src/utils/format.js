const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatMonth(iso) {
  if (!iso) return 'Present';
  const [y, m] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function yearsBetween(fromIso, toIso) {
  const from = new Date(fromIso);
  const to = toIso ? new Date(toIso) : new Date();
  return Math.max(0, (to - from) / (365.25 * 24 * 3600 * 1000));
}

export const yearOf = (iso) => (iso ? Number(iso.slice(0, 4)) : new Date().getFullYear());

export const pad2 = (n) => String(n).padStart(2, '0');
