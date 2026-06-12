"use client";

import type {
  BookmarkRecord,
  MockBooking,
  MockUser,
  ModuleKey,
  RecentlyViewed,
} from "./types";

const KEYS = {
  user: "zt:user",
  bookmarks: "zt:bookmarks",
  bookings: "zt:bookings",
  recent: "zt:recent",
  notifSeen: "zt:notif-seen",
  // Phase 3
  pulsPosts: "zt:puls-userposts",
  marktListings: "zt:markt-userlistings",
  pollVotes: "zt:poll-votes",
  initiativeVotes: "zt:initiative-votes",
  initiativeSupports: "zt:initiative-supports",
  district: "zt:district",
  onboarded: "zt:onboarded",
} as const;

const CHANGE_EVENT = "zt:storage-change";

function emitChange(key: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { key } }));
}

export function onStorageChange(handler: (key: string) => void) {
  if (typeof window === "undefined") return () => {};
  const listener = (e: Event) => {
    handler((e as CustomEvent<{ key: string }>).detail.key);
  };
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    emitChange(key);
  } catch {
    /* ignore */
  }
}

// ── User ─────────────────────────────────────────────────────
export function getUser(): MockUser | null {
  return readJSON<MockUser | null>(KEYS.user, null);
}

export function loginMock(email: string): MockUser {
  const user: MockUser = {
    email,
    name: email.split("@")[0] || "Demo-User",
    tier: "Free",
  };
  writeJSON(KEYS.user, user);
  return user;
}

export function logout() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEYS.user);
  emitChange(KEYS.user);
}

export function setTier(tier: MockUser["tier"]) {
  const user = getUser();
  if (!user) return;
  writeJSON(KEYS.user, { ...user, tier });
}

// ── Bookmarks ────────────────────────────────────────────────
export function getBookmarks(): BookmarkRecord[] {
  return readJSON<BookmarkRecord[]>(KEYS.bookmarks, []);
}

export function isBookmarked(module: ModuleKey, id: string) {
  return getBookmarks().some((b) => b.module === module && b.id === id);
}

export function toggleBookmark(record: Omit<BookmarkRecord, "savedAt">) {
  const list = getBookmarks();
  const exists = list.find(
    (b) => b.module === record.module && b.id === record.id
  );
  const next = exists
    ? list.filter((b) => !(b.module === record.module && b.id === record.id))
    : [...list, { ...record, savedAt: new Date().toISOString() }];
  writeJSON(KEYS.bookmarks, next);
  return !exists;
}

// ── Bookings ─────────────────────────────────────────────────
export function getBookings(): MockBooking[] {
  return readJSON<MockBooking[]>(KEYS.bookings, []);
}

export function addBooking(
  booking: Omit<MockBooking, "id" | "createdAt"> & { status?: MockBooking["status"] }
) {
  const list = getBookings();
  const next: MockBooking = {
    ...booking,
    status: booking.status ?? "upcoming",
    id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  writeJSON(KEYS.bookings, [next, ...list]);
  return next;
}

export function updateBookingStatus(id: string, status: MockBooking["status"]) {
  const list = getBookings();
  writeJSON(
    KEYS.bookings,
    list.map((b) => (b.id === id ? { ...b, status } : b))
  );
}

export function clearBookings() {
  writeJSON(KEYS.bookings, []);
}

export function seedDemoBookings(items: Omit<MockBooking, "id" | "createdAt">[]) {
  const list = getBookings();
  if (list.length > 0) return; // don't overwrite real ones
  const seeded: MockBooking[] = items.map((it, i) => ({
    ...it,
    id: `seed-${i}`,
    createdAt: new Date().toISOString(),
  }));
  writeJSON(KEYS.bookings, seeded);
}

// ── Recently Viewed ──────────────────────────────────────────
export function getRecent(): RecentlyViewed[] {
  return readJSON<RecentlyViewed[]>(KEYS.recent, []);
}

export function pushRecent(item: Omit<RecentlyViewed, "viewedAt">) {
  const list = getRecent().filter(
    (r) => !(r.module === item.module && r.id === item.id)
  );
  const next = [
    { ...item, viewedAt: new Date().toISOString() },
    ...list,
  ].slice(0, 6);
  writeJSON(KEYS.recent, next);
}

// ── Notifications (read-state only — content is static demo) ──
export function getReadNotifIds(): string[] {
  return readJSON<string[]>(KEYS.notifSeen, []);
}

export function markNotifsRead(ids: string[]) {
  const seen = new Set(getReadNotifIds());
  ids.forEach((i) => seen.add(i));
  writeJSON(KEYS.notifSeen, Array.from(seen));
}

// ── FEED: user-posted (Local) ────────────────────────────────
export interface UserPulsPost {
  id: string;
  type: string;
  text: string;
  tags: string[];
  district: string;
  ago: string;
  upvotes: number;
  comments_count: number;
  author: string;
}

export function getUserPosts(): UserPulsPost[] {
  return readJSON<UserPulsPost[]>(KEYS.pulsPosts, []);
}

export function addUserPost(post: Omit<UserPulsPost, "id" | "ago" | "upvotes" | "comments_count">) {
  const list = getUserPosts();
  const next: UserPulsPost = {
    ...post,
    id: `up-${Date.now()}`,
    ago: "gerade eben",
    upvotes: 1,
    comments_count: 0,
  };
  writeJSON(KEYS.pulsPosts, [next, ...list]);
  return next;
}

// ── MARKT: user-posted listings ──────────────────────────────
export interface UserMarktListing {
  id: string;
  category: string;
  title: string;
  description: string;
  district: string;
  price?: string;
  author: string;
}

export function getUserListings(): UserMarktListing[] {
  return readJSON<UserMarktListing[]>(KEYS.marktListings, []);
}

export function addUserListing(l: Omit<UserMarktListing, "id">) {
  const list = getUserListings();
  const next: UserMarktListing = { ...l, id: `ul-${Date.now()}` };
  writeJSON(KEYS.marktListings, [next, ...list]);
  return next;
}

// ── STIMMEN: poll & initiative votes ─────────────────────────
export function getPollVotes(): { [pollId: string]: string } {
  return readJSON<{ [pollId: string]: string }>(KEYS.pollVotes, {});
}

export function castPollVote(pollId: string, optionId: string) {
  const all = getPollVotes();
  all[pollId] = optionId;
  writeJSON(KEYS.pollVotes, all);
}

export function getInitiativeVotes(): { [initiativeId: string]: 1 | -1 } {
  return readJSON<{ [k: string]: 1 | -1 }>(KEYS.initiativeVotes, {});
}

export function setInitiativeVote(id: string, val: 1 | -1 | 0) {
  const v = getInitiativeVotes();
  if (val === 0) delete v[id];
  else v[id] = val;
  writeJSON(KEYS.initiativeVotes, v);
}

export function getInitiativeSupports(): string[] {
  return readJSON<string[]>(KEYS.initiativeSupports, []);
}

export function toggleInitiativeSupport(id: string) {
  const list = getInitiativeSupports();
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  writeJSON(KEYS.initiativeSupports, next);
  return !list.includes(id);
}

// ── District preference ──────────────────────────────────────
export function getDistrict(): string | null {
  return readJSON<string | null>(KEYS.district, null);
}

export function setDistrict(d: string) {
  writeJSON(KEYS.district, d);
}

// ── Onboarding ───────────────────────────────────────────────
export function hasOnboarded(): boolean {
  return readJSON<boolean>(KEYS.onboarded, false);
}

export function markOnboarded() {
  writeJSON(KEYS.onboarded, true);
}
