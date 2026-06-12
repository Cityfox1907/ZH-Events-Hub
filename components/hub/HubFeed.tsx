"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Flame, Sparkles, TrendingUp, MessagesSquare, PenLine } from "lucide-react";
import type { HubPost } from "@/lib/hub";
import { HUB_COMMUNITIES, hotScore } from "@/lib/hub";
import { HubPostCard } from "./HubPostCard";

type SortKey = "beliebt" | "neu" | "top" | "diskutiert";

const SORTS: { key: SortKey; label: string; Icon: typeof Flame }[] = [
  { key: "beliebt", label: "Beliebt", Icon: Flame },
  { key: "neu", label: "Neu", Icon: Sparkles },
  { key: "top", label: "Top", Icon: TrendingUp },
  { key: "diskutiert", label: "Diskutiert", Icon: MessagesSquare },
];

/**
 * Mittlere Hub-Spalte: Composer-Platzhalter, Sortier-Leiste
 * und sortierte Beitragsliste. Angepinnte Beiträge bleiben oben.
 */
export function HubFeed({
  posts,
  showCommunity = true,
  showCommunityChips = false,
}: {
  posts: HubPost[];
  showCommunity?: boolean;
  showCommunityChips?: boolean;
}) {
  const [sort, setSort] = useState<SortKey>("beliebt");

  const sorted = useMemo(() => {
    const compare: Record<SortKey, (a: HubPost, b: HubPost) => number> = {
      beliebt: (a, b) => hotScore(b) - hotScore(a),
      neu: (a, b) => a.minutesAgo - b.minutesAgo,
      top: (a, b) => b.upvotes - a.upvotes,
      diskutiert: (a, b) => b.comments - a.comments,
    };
    return [...posts].sort(
      (a, b) =>
        Number(b.pinned ?? false) - Number(a.pinned ?? false) ||
        compare[sort](a, b),
    );
  }, [posts, sort]);

  return (
    <div className="space-y-3">
      {/* Community-Chips (mobil, nur auf der Hub-Startseite) */}
      {showCommunityChips && (
        <div className="lg:hidden flex gap-2 overflow-x-auto scrollbar-thin pb-1 -mx-1 px-1">
          {HUB_COMMUNITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/hub/${c.slug}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-line text-[12px] font-medium whitespace-nowrap hover:border-burgundy transition-colors"
            >
              <span>{c.emoji}</span>
              {c.name}
            </Link>
          ))}
        </div>
      )}

      {/* Composer-Platzhalter */}
      <div className="flex items-center gap-3 bg-card border border-line rounded-xl px-3 py-2.5">
        <span className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy grid place-items-center shrink-0">
          <PenLine className="w-4 h-4" strokeWidth={1.8} />
        </span>
        <input
          type="text"
          placeholder="Beitrag erstellen — was läuft in Zürich?"
          className="flex-1 bg-paper-dim/60 border border-line rounded-lg px-3 py-2 text-[13.5px] placeholder:text-ink-faint focus:outline-none focus:border-burgundy transition-colors"
        />
      </div>

      {/* Sortier-Leiste */}
      <div className="flex items-center gap-1 bg-card border border-line rounded-xl px-2 py-1.5">
        {SORTS.map(({ key, label, Icon }) => {
          const active = sort === key;
          return (
            <button
              key={key}
              onClick={() => setSort(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold transition-colors ${
                active
                  ? "bg-paper-dim text-burgundy"
                  : "text-ink-faint hover:bg-paper-dim/60 hover:text-ink"
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Beiträge */}
      {sorted.map((post) => (
        <HubPostCard key={post.id} post={post} showCommunity={showCommunity} />
      ))}

      {sorted.length === 0 && (
        <div className="bg-card border border-line rounded-xl px-4 py-10 text-center">
          <p className="text-[14px] text-ink-muted">
            Noch keine Beiträge hier — sei die erste Person, die postet.
          </p>
        </div>
      )}
    </div>
  );
}
