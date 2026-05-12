"use client";

import type { BookmarkRecord, MockBooking, MockUser, ModuleKey } from "./types";

const KEYS = {
  user: "zt:user",
  bookmarks: "zt:bookmarks",
  bookings: "zt:bookings",
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

export function getBookings(): MockBooking[] {
  return readJSON<MockBooking[]>(KEYS.bookings, []);
}

export function addBooking(booking: Omit<MockBooking, "id" | "createdAt">) {
  const list = getBookings();
  const next: MockBooking = {
    ...booking,
    id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  writeJSON(KEYS.bookings, [next, ...list]);
  return next;
}

export function clearBookings() {
  writeJSON(KEYS.bookings, []);
}
