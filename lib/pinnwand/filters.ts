import type {
  PinnwandFilterState,
  PinnwandPost,
  PostCategoryId,
  QuartierId,
  TimeFilter,
} from "./types";

export const DEFAULT_FILTERS: PinnwandFilterState = {
  quartiere: [],
  kategorien: [],
  zeit: "woche",
};

export const TIME_FILTERS: Array<{ id: TimeFilter; label: string; hint: string }> = [
  { id: "frisch", label: "Frisch", hint: "Heute" },
  { id: "woche", label: "Diese Woche", hint: "Letzte 7 Tage" },
  { id: "monat", label: "Diesen Monat", hint: "Letzte 30 Tage" },
  { id: "beliebt", label: "Beliebt", hint: "Höchste Interaktion" },
];

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

function withinHours(post: PinnwandPost, anchorMs: number, hours: number): boolean {
  return anchorMs - new Date(post.createdAt).getTime() <= hours * HOUR_MS;
}

export function applyFilters(
  posts: PinnwandPost[],
  filters: PinnwandFilterState,
  // anchor lets the SSR pass produce stable results — defaults to most recent post
  anchorIso?: string
): PinnwandPost[] {
  const anchorMs = anchorIso
    ? new Date(anchorIso).getTime()
    : Math.max(...posts.map((p) => new Date(p.createdAt).getTime()));

  let result = posts.filter((p) => {
    if (filters.quartiere.length > 0 && !filters.quartiere.includes(p.quartier)) {
      return false;
    }
    if (filters.kategorien.length > 0 && !filters.kategorien.includes(p.category)) {
      return false;
    }
    return true;
  });

  if (filters.zeit === "frisch") {
    result = result.filter((p) => withinHours(p, anchorMs, 24));
  } else if (filters.zeit === "woche") {
    result = result.filter((p) => withinHours(p, anchorMs, 24 * 7));
  } else if (filters.zeit === "monat") {
    result = result.filter((p) => withinHours(p, anchorMs, 24 * 30));
  }

  if (filters.zeit === "beliebt") {
    result = [...result].sort(
      (a, b) =>
        b.likes + b.comments * 2 + b.bookmarks - (a.likes + a.comments * 2 + a.bookmarks)
    );
  } else {
    result = [...result].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return result;
}

// URL parsing: ?quartier=kreis-4,kreis-5&kategorie=empfehlung&zeit=monat
export function parseFiltersFromSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>
): PinnwandFilterState {
  const get = (key: string): string | undefined => {
    if (params instanceof URLSearchParams) return params.get(key) ?? undefined;
    const raw = params[key];
    if (Array.isArray(raw)) return raw[0];
    return raw;
  };

  const quartiereRaw = get("quartier");
  const kategorienRaw = get("kategorie");
  const zeitRaw = get("zeit");

  const quartiere = quartiereRaw
    ? (quartiereRaw.split(",").filter(Boolean) as QuartierId[])
    : [];
  const kategorien = kategorienRaw
    ? (kategorienRaw.split(",").filter(Boolean) as PostCategoryId[])
    : [];
  const zeit: TimeFilter = ["frisch", "woche", "monat", "beliebt"].includes(
    zeitRaw ?? ""
  )
    ? (zeitRaw as TimeFilter)
    : DEFAULT_FILTERS.zeit;

  return { quartiere, kategorien, zeit };
}

export function buildSearchString(filters: PinnwandFilterState): string {
  const parts: string[] = [];
  if (filters.quartiere.length > 0) parts.push(`quartier=${filters.quartiere.join(",")}`);
  if (filters.kategorien.length > 0)
    parts.push(`kategorie=${filters.kategorien.join(",")}`);
  if (filters.zeit !== DEFAULT_FILTERS.zeit) parts.push(`zeit=${filters.zeit}`);
  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

export function isFiltersDefault(filters: PinnwandFilterState): boolean {
  return (
    filters.quartiere.length === 0 &&
    filters.kategorien.length === 0 &&
    filters.zeit === DEFAULT_FILTERS.zeit
  );
}

// Format an ISO date as a German relative-time string ("vor 3 Stunden")
export function formatRelativeTime(iso: string, anchorIso?: string): string {
  const anchorMs = anchorIso ? new Date(anchorIso).getTime() : Date.now();
  const diff = anchorMs - new Date(iso).getTime();
  const minutes = Math.round(diff / (60 * 1000));
  if (minutes < 1) return "gerade eben";
  if (minutes < 60) return `vor ${minutes} ${minutes === 1 ? "Minute" : "Minuten"}`;
  const hours = Math.round(diff / HOUR_MS);
  if (hours < 24) return `vor ${hours} ${hours === 1 ? "Stunde" : "Stunden"}`;
  const days = Math.round(diff / DAY_MS);
  if (days === 1) return "gestern";
  if (days < 7) return `vor ${days} Tagen`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `vor ${weeks} ${weeks === 1 ? "Woche" : "Wochen"}`;
  const months = Math.round(days / 30);
  return `vor ${months} ${months === 1 ? "Monat" : "Monaten"}`;
}

// Latest createdAt across all posts — used as a stable anchor in SSR.
export function latestPostAnchor(posts: PinnwandPost[]): string {
  const ms = Math.max(...posts.map((p) => new Date(p.createdAt).getTime()));
  return new Date(ms).toISOString();
}
