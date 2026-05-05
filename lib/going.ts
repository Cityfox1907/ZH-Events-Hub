import { hashId } from "./slug";
import { storage, emitStorageChange } from "./storage";

/**
 * Pseudo-base count for an event so the "324 gehen hin" looks lived-in.
 * Deterministic per event id, varies with size (read by callers).
 */
export function pseudoBaseCount(eventId: string, max: number): number {
  return (hashId(eventId) % Math.max(1, max - 12)) + 12;
}

export function isGoing(eventId: string): boolean {
  return storage.readGoing().includes(eventId);
}

export function toggleGoing(eventId: string): boolean {
  const list = storage.readGoing();
  const idx = list.indexOf(eventId);
  let next: string[];
  let nowGoing: boolean;
  if (idx >= 0) {
    next = [...list.slice(0, idx), ...list.slice(idx + 1)];
    nowGoing = false;
  } else {
    next = [...list, eventId];
    nowGoing = true;
  }
  storage.writeGoing(next);
  emitStorageChange();
  return nowGoing;
}

/** "324 gehen hin" — base + the user's own toggle. */
export function goingCount(eventId: string, baseMax: number): number {
  return pseudoBaseCount(eventId, baseMax) + (isGoing(eventId) ? 1 : 0);
}
