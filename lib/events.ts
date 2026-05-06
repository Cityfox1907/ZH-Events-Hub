import { SEED_EVENTS, REFERENCE_NOW_ISO } from "./seed-events";
import { storage, emitStorageChange } from "./storage";
import { buildEventSlug, eventFingerprint } from "./slug";
import { addDays, dayKey, endOfDay, startOfDay } from "./format";
import type { CategoryId, SizeId, ZhEvent } from "./types";

/**
 * Reference "now" — fixed to 2026-05-17 19:00 so the seed dataset stays meaningful.
 * Reading the real Date.now() would mean every demo opens to an empty list a year from now.
 */
export function now(): Date {
  return new Date(REFERENCE_NOW_ISO);
}

export function getAllEvents(): ZhEvent[] {
  const userEvents = storage.readUserEvents();
  return [...SEED_EVENTS, ...userEvents];
}

export function getEventBySlug(slug: string): ZhEvent | undefined {
  return getAllEvents().find((e) => e.slug === slug);
}

export function getEventById(id: string): ZhEvent | undefined {
  return getAllEvents().find((e) => e.id === id);
}

export function isPast(event: ZhEvent, ref: Date = now()): boolean {
  const end = new Date(event.endDateTime ?? event.startDateTime);
  return end.getTime() < ref.getTime();
}

export function isToday(event: ZhEvent, ref: Date = now()): boolean {
  const start = new Date(event.startDateTime);
  return start >= startOfDay(ref) && start <= endOfDay(ref);
}

export function isThisWeek(event: ZhEvent, ref: Date = now()): boolean {
  const start = new Date(event.startDateTime);
  const weekEnd = endOfDay(addDays(ref, 7));
  return start >= startOfDay(ref) && start <= weekEnd;
}

export interface EventFilter {
  categories?: CategoryId[];
  sizes?: SizeId[];
}

export function filterEvents(events: ZhEvent[], filter: EventFilter): ZhEvent[] {
  return events.filter((e) => {
    if (filter.categories && filter.categories.length > 0 && !filter.categories.includes(e.category)) {
      return false;
    }
    if (filter.sizes && filter.sizes.length > 0 && !filter.sizes.includes(e.size)) {
      return false;
    }
    return true;
  });
}

export function sortByStart(events: ZhEvent[], direction: "asc" | "desc" = "asc"): ZhEvent[] {
  const factor = direction === "asc" ? 1 : -1;
  return [...events].sort((a, b) => (new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()) * factor);
}

export function getTodayEvents(ref: Date = now()): ZhEvent[] {
  return sortByStart(getAllEvents().filter((e) => isToday(e, ref)));
}

export function getWeekEvents(ref: Date = now()): ZhEvent[] {
  return sortByStart(getAllEvents().filter((e) => isThisWeek(e, ref) && !isPast(e, ref)));
}

export function isThisMonth(event: ZhEvent, ref: Date = now()): boolean {
  const start = new Date(event.startDateTime);
  const monthEnd = endOfDay(addDays(ref, 30));
  return start >= startOfDay(ref) && start <= monthEnd;
}

export function getMonthEvents(ref: Date = now()): ZhEvent[] {
  return sortByStart(getAllEvents().filter((e) => isThisMonth(e, ref) && !isPast(e, ref)));
}

export function getUpcomingEvents(ref: Date = now()): ZhEvent[] {
  return sortByStart(getAllEvents().filter((e) => !isPast(e, ref)));
}

export function getPastEvents(ref: Date = now()): ZhEvent[] {
  return sortByStart(
    getAllEvents().filter((e) => isPast(e, ref)),
    "desc"
  );
}

/** Group events by day key (YYYY-MM-DD), preserving sort order. */
export function groupByDay(events: ZhEvent[]): { day: string; isoSample: string; events: ZhEvent[] }[] {
  const map = new Map<string, ZhEvent[]>();
  for (const ev of events) {
    const key = dayKey(ev.startDateTime);
    const list = map.get(key) ?? [];
    list.push(ev);
    map.set(key, list);
  }
  return Array.from(map.entries()).map(([day, evs]) => ({
    day,
    isoSample: evs[0].startDateTime,
    events: evs,
  }));
}

export interface CreateEventInput {
  title: string;
  subtitle?: string;
  category: CategoryId;
  size: SizeId;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  venue: string;
  neighborhood: string;
  description: string;
  priceFromChf?: number;
  tags: string[];
}

export interface CreateEventResult {
  event: ZhEvent;
  duplicate: boolean;
}

/**
 * Single-Event-Object creation: if an event with the same fingerprint already
 * exists, return that one instead of inserting a duplicate.
 */
export function createUserEvent(input: CreateEventInput): CreateEventResult {
  const startDateTime = `${input.date}T${input.time}:00`;
  const fingerprint = eventFingerprint(input.title, startDateTime, input.venue);
  const existing = getAllEvents().find((e) =>
    eventFingerprint(e.title, e.startDateTime, e.venue) === fingerprint
  );
  if (existing) {
    return { event: existing, duplicate: true };
  }

  const slug = buildEventSlug(input.title, startDateTime);
  const id = `user-${slug}-${Math.random().toString(36).slice(2, 8)}`;
  const event: ZhEvent = {
    id,
    slug,
    title: input.title,
    subtitle: input.subtitle?.trim() || undefined,
    category: input.category,
    size: input.size,
    startDateTime,
    venue: input.venue,
    neighborhood: input.neighborhood,
    description: input.description,
    priceFromChf: input.priceFromChf,
    tags: input.tags,
    source: "user",
    createdAt: new Date().toISOString(),
  };

  const userEvents = storage.readUserEvents();
  userEvents.push(event);
  storage.writeUserEvents(userEvents);
  emitStorageChange();
  return { event, duplicate: false };
}
