import { hashId } from "./slug";
import type { CategoryId } from "./types";

/**
 * Editorial gradient palettes — warm, muted, never the lila/pink/blue AI-slop.
 * Each pair is read deterministically from the event id so gradients stay stable
 * across reloads and across cards/heroes for the same event.
 */
const PALETTES: readonly { from: string; to: string; ink: string }[] = [
  { from: "#7c1f1f", to: "#3a0f0f", ink: "#fdfaf3" }, // burgundy
  { from: "#3d2914", to: "#7a4a1f", ink: "#fdfaf3" }, // cognac
  { from: "#1f2a2e", to: "#3e5256", ink: "#fdfaf3" }, // teal-graphite
  { from: "#5a4527", to: "#a08552", ink: "#1c1917" }, // brass
  { from: "#2e1f33", to: "#5a3f63", ink: "#fdfaf3" }, // aubergine
  { from: "#1c1917", to: "#3a3633", ink: "#fdfaf3" }, // ink
  { from: "#7a3b1f", to: "#b8693d", ink: "#fdfaf3" }, // terracotta
  { from: "#243b2a", to: "#4a6a55", ink: "#fdfaf3" }, // forest
  { from: "#5a1f3a", to: "#8a3a5e", ink: "#fdfaf3" }, // plum
  { from: "#3a3320", to: "#7a6a3e", ink: "#fdfaf3" }, // olive
];

const CATEGORY_BIAS: Record<CategoryId, number[]> = {
  konzert: [0, 5, 8],
  klassik: [3, 5, 7],
  theater: [4, 8, 5],
  comedy: [6, 3, 9],
  club: [5, 4, 0],
  kunst: [2, 7, 9],
  festival: [6, 0, 1],
  volksfest: [0, 6, 1],
  sport: [2, 5, 7],
  gastro: [1, 3, 9],
  mode: [4, 1, 8],
};

export interface GradientSpec {
  from: string;
  to: string;
  ink: string;
  css: string;
}

export function gradientFor(eventId: string, category: CategoryId): GradientSpec {
  const candidates = CATEGORY_BIAS[category] ?? [0];
  const idx = candidates[hashId(eventId) % candidates.length];
  const palette = PALETTES[idx];
  const angle = 110 + (hashId(eventId) % 60);
  return {
    from: palette.from,
    to: palette.to,
    ink: palette.ink,
    css: `linear-gradient(${angle}deg, ${palette.from} 0%, ${palette.to} 100%)`,
  };
}

/** Subtle paper-tinted backdrop for empty/secondary tiles. */
export function paperGradient(seed: string): string {
  const angle = 100 + (hashId(seed) % 80);
  return `linear-gradient(${angle}deg, #efe7d8 0%, #fdfaf3 100%)`;
}
