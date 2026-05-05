import { SEED_REVIEWS } from "./seed-events";
import { storage, emitStorageChange } from "./storage";
import type { Review } from "./types";

const SEED_FLAG_KEY = "zb.reviews.seedImported.v1";

function hasImportedSeed(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(SEED_FLAG_KEY) === "1";
}

function markSeedImported(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SEED_FLAG_KEY, "1");
}

/** First-run import of seed reviews into localStorage. Idempotent. */
export function ensureSeedReviews(): void {
  if (typeof window === "undefined") return;
  if (hasImportedSeed()) return;
  const existing = storage.readReviews();
  const ids = new Set(existing.map((r) => r.id));
  const toAdd = SEED_REVIEWS.filter((r) => !ids.has(r.id));
  if (toAdd.length > 0) {
    storage.writeReviews([...existing, ...toAdd]);
  }
  markSeedImported();
}

export function getReviewsForEvent(eventId: string): Review[] {
  return storage.readReviews()
    .filter((r) => r.eventId === eventId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function averageRating(eventId: string): number | null {
  const reviews = getReviewsForEvent(eventId);
  if (reviews.length === 0) return null;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export interface CreateReviewInput {
  eventId: string;
  rating: number;
  text: string;
  seat?: string;
  acoustics?: string;
  authorName: string;
}

export function createReview(input: CreateReviewInput): Review {
  const review: Review = {
    id: `review-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    eventId: input.eventId,
    rating: input.rating,
    text: input.text.trim(),
    seat: input.seat?.trim() || undefined,
    acoustics: input.acoustics?.trim() || undefined,
    authorName: input.authorName.trim(),
    createdAt: new Date().toISOString(),
  };
  const list = storage.readReviews();
  list.push(review);
  storage.writeReviews(list);
  emitStorageChange();
  return review;
}
