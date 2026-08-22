/**
 * Escape HTML special characters to prevent XSS.
 * @param {unknown} s
 * @returns {string}
 */
export const esc = (s) =>
  (typeof s === "string" ? s : "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
