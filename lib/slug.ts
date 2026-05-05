/**
 * Convert a string to a URL-safe slug, preserving Swiss umlauts as expanded forms.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Single-Event-Object fingerprint: same title + same day + same venue → same event.
 * Used to dedupe user-submitted events against existing ones.
 */
export function eventFingerprint(title: string, isoDate: string, venue: string): string {
  const day = isoDate.slice(0, 10);
  return `${slugify(title)}::${day}::${slugify(venue)}`;
}

export function buildEventSlug(title: string, isoDate: string): string {
  const day = isoDate.slice(0, 10);
  return `${slugify(title)}-${day}`;
}

/**
 * Deterministic numeric hash for gradient color seeding.
 * djb2 — stable across reloads, no randomness.
 */
export function hashId(id: string): number {
  let h = 5381;
  for (let i = 0; i < id.length; i++) {
    h = (h * 33) ^ id.charCodeAt(i);
  }
  return Math.abs(h);
}
