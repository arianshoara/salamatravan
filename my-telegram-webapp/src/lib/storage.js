// Preferences are device-local. Storage may be disabled or full.
export function readStored(key, fallback) {
  try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
  catch { return fallback; }
}
export function writeStored(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}
export function removeStored(key) {
  try { localStorage.removeItem(key); return true; } catch { return false; }
}
export function normalizeSearch(value) {
  return value.normalize('NFKC').toLocaleLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[\u200c\u200d]/g, ' ').replace(/\s+/g, ' ').trim();
}
