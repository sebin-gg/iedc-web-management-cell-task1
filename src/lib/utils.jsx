// new file
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Lightweight date helper.
 * Accepts ISO dates or common short formats like "04-09-24" (DD-MM-YY).
 * Returns a readable string like "04 Sep 2024".
 */
export function formatDate(input) {
  if (!input) return '';
  // try ISO first
  const iso = new Date(input);
  if (!isNaN(iso.getTime())) {
    return iso.toLocaleDateString();
  }
  // try DD-MM-YY or DD-MM-YYYY
  const parts = input.split(/[-\/\.]/);
  if (parts.length >= 3) {
    let [d, m, y] = parts;
    if (y.length === 2) y = '20' + y;
    const dt = new Date(`${y}-${m}-${d}`);
    if (!isNaN(dt.getTime())) return dt.toLocaleDateString();
  }
  return input;
}
