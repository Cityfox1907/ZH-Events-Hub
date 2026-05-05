import type { EventPhoto, Review, ZhEvent } from "./types";

const KEYS = {
  userEvents: "zb.events.user.v1",
  going: "zb.going.v1",
  reviews: "zb.reviews.v1",
  photos: "zb.photos.v1",
  authorName: "zb.authorName.v1",
} as const;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function safeRead<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export const storage = {
  readUserEvents(): ZhEvent[] {
    return safeRead<ZhEvent[]>(KEYS.userEvents, []);
  },
  writeUserEvents(events: ZhEvent[]): boolean {
    return safeWrite(KEYS.userEvents, events);
  },

  readGoing(): string[] {
    return safeRead<string[]>(KEYS.going, []);
  },
  writeGoing(eventIds: string[]): boolean {
    return safeWrite(KEYS.going, eventIds);
  },

  readReviews(): Review[] {
    return safeRead<Review[]>(KEYS.reviews, []);
  },
  writeReviews(reviews: Review[]): boolean {
    return safeWrite(KEYS.reviews, reviews);
  },

  readPhotos(): EventPhoto[] {
    return safeRead<EventPhoto[]>(KEYS.photos, []);
  },
  writePhotos(photos: EventPhoto[]): boolean {
    return safeWrite(KEYS.photos, photos);
  },

  readAuthorName(): string {
    return safeRead<string>(KEYS.authorName, "");
  },
  writeAuthorName(name: string): boolean {
    return safeWrite(KEYS.authorName, name);
  },

  isBrowser,
} as const;

/** Custom event channels — used so EventCard counters re-render on data changes. */
export const STORAGE_EVENT = "zb:storage-changed";

export function emitStorageChange(): void {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}
