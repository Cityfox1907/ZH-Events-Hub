// ─────────────────────────────────────────────────────────────
// FEED — Domänenmodul für den Startseiten-Feed (X-Style)
// Mappt die bestehenden Puls-Posts auf das Feed-Format und
// liefert Trends + Folgen-Vorschläge für die rechte Spalte.
// ─────────────────────────────────────────────────────────────

import { PULS_POSTS, TOP_TAGS } from "./data";
import type { PulsPost, VerificationBadge } from "./types";

export interface FeedPost {
  id: string;
  /** Anzeigename, z.B. "Sara vom Kreis 5" */
  name: string;
  /** Handle ohne @, z.B. "SaraVomKreis5" */
  handle: string;
  avatar: string;
  badge?: VerificationBadge;
  district: string;
  /** Relative Zeitangabe, z.B. "12 Min" */
  time: string;
  text: string;
  tags: string[];
  image?: string;
  stats: {
    replies: number;
    reposts: number;
    likes: number;
    views: number;
  };
  /** true → erscheint auch im "Folge ich"-Tab */
  following: boolean;
  hot?: boolean;
}

export interface FeedTrend {
  rank: number;
  tag: string;
  posts: number;
  category: string;
}

export interface FollowSuggestion {
  name: string;
  handle: string;
  avatar: string;
  badge?: VerificationBadge;
  bio: string;
}

// "vor 12 Min" → "12 Min" (X-kompakte Zeitangabe)
function compactTime(ago: string): string {
  return ago.replace(/^vor\s+/i, "").replace(/^1h$/, "1 Std");
}

// CamelCase/Unterstrich-Handles in lesbare Namen auflösen
function displayName(handle: string): string {
  return handle
    .replace(/_/g, " ")
    .replace(/([a-zäöü])([A-ZÄÖÜ])/g, "$1 $2")
    .replace(/([A-ZÄÖÜ]+)([A-ZÄÖÜ][a-zäöü])/g, "$1 $2")
    .trim();
}

// Deterministische Zusatz-Statistiken aus den Puls-Zahlen ableiten,
// damit der Feed ohne Backend stabil bleibt (kein Math.random → kein
// Hydration-Mismatch).
function deriveStats(post: PulsPost): FeedPost["stats"] {
  const seed = post.id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return {
    replies: post.comments_count,
    reposts: Math.max(1, Math.round(post.upvotes / 4) + (seed % 7)),
    likes: post.upvotes,
    views: post.upvotes * 38 + post.comments_count * 11 + seed * 13,
  };
}

const FOLLOWING_HANDLES = new Set([
  "SaraVomKreis5",
  "LisaVeloKurier",
  "FotoFrankZH",
  "AnnaUrbanist",
  "WeinSommelier_LB",
]);

export const FEED_POSTS: FeedPost[] = PULS_POSTS.map((p) => ({
  id: p.id,
  name: displayName(p.author),
  handle: p.author,
  avatar: p.avatar,
  badge: p.badge,
  district: p.district,
  time: compactTime(p.ago),
  text: p.text,
  tags: p.tags,
  image: p.image,
  stats: deriveStats(p),
  following: FOLLOWING_HANDLES.has(p.author),
  hot: p.hot,
}));

const TREND_CATEGORY: Record<string, string> = {
  wohnungssuche: "Wohnen · Trend",
  verkehr: "Verkehr · Live",
  foodtipp: "Essen & Trinken",
  stadtpolitik: "Politik · Zürich",
  wetter: "Zürich",
  kunst: "Kultur",
  sport: "Sport",
  kreis5: "Quartier · Trend",
};

export const FEED_TRENDS: FeedTrend[] = TOP_TAGS.map((t, i) => ({
  rank: i + 1,
  tag: t.tag,
  posts: t.count,
  category: TREND_CATEGORY[t.tag] ?? "Zürich · Trend",
}));

export const FOLLOW_SUGGESTIONS: FollowSuggestion[] = [
  {
    name: "Stadt Zürich",
    handle: "stadtzuerich",
    avatar:
      "https://api.dicebear.com/7.x/initials/svg?seed=SZ&backgroundColor=0f4da8&textColor=ffffff",
    badge: "stadt-stimme",
    bio: "Offizielle Updates aus dem Stadthaus.",
  },
  {
    name: "Kunsthaus Zürich",
    handle: "kunsthauszh",
    avatar:
      "https://api.dicebear.com/7.x/initials/svg?seed=KH&backgroundColor=1c1f24&textColor=ffffff",
    badge: "verified",
    bio: "Ausstellungen, Late Nights, Führungen.",
  },
  {
    name: "FC Zürich",
    handle: "fc_zuerich",
    avatar:
      "https://api.dicebear.com/7.x/initials/svg?seed=FCZ&backgroundColor=093a82&textColor=ffffff",
    badge: "verified",
    bio: "Matchdays, Tickets, Letzigrund-News.",
  },
];

/** Profil, unter dem im Composer gepostet wird (Demo). */
export const FEED_ME = {
  name: "Demo Zürcher",
  handle: "DemoZuercher",
  avatar:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=DemoZuercher&backgroundColor=f7f2ea,efe7d8,fdfaf3",
};
