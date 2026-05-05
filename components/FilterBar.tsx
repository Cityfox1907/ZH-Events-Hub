"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, SIZES } from "@/lib/categories";
import type { CategoryId, SizeId, ZhEvent } from "@/lib/types";
import { filterEvents } from "@/lib/events";
import { EventGrid } from "./EventGrid";
import { EmptyState } from "./EmptyState";
import { Filter, X } from "lucide-react";

interface Props {
  events: ZhEvent[];
  emptyTitle?: string;
  emptyDescription?: string;
  variant?: "default" | "aftermath";
}

export function FilterBar({
  events,
  emptyTitle = "Hier ist gerade nichts",
  emptyDescription = "Mit deinen aktuellen Filtern haben wir keine Events gefunden. Lockere die Auswahl oder schau morgen nochmal.",
  variant = "default",
}: Props) {
  const [activeCats, setActiveCats] = useState<CategoryId[]>([]);
  const [activeSizes, setActiveSizes] = useState<SizeId[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(
    () => filterEvents(events, { categories: activeCats, sizes: activeSizes }),
    [events, activeCats, activeSizes]
  );

  function toggleCat(id: CategoryId): void {
    setActiveCats((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  function toggleSize(id: SizeId): void {
    setActiveSizes((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  function clearAll(): void {
    setActiveCats([]);
    setActiveSizes([]);
  }

  const hasFilters = activeCats.length > 0 || activeSizes.length > 0;
  const presentCats = useMemo(() => {
    const set = new Set(events.map((e) => e.category));
    return CATEGORIES.filter((c) => set.has(c.id));
  }, [events]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-label="Filter ein- oder ausblenden"
            className="inline-flex md:hidden items-center gap-2 px-3 py-2 rounded-full border border-line-strong text-[13px] text-ink hover:bg-paper-dim transition-colors"
          >
            <Filter className="w-3.5 h-3.5" strokeWidth={1.75} />
            Filter
            {hasFilters ? (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-burgundy text-card text-[10px] font-medium">
                {activeCats.length + activeSizes.length}
              </span>
            ) : null}
          </button>
          <span className="hidden md:inline-block eyebrow">Filter</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[12px] text-ink-faint tabular-nums">
            {filtered.length} {filtered.length === 1 ? "Event" : "Events"}
          </span>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-[12px] text-ink-muted hover:text-burgundy transition-colors"
            >
              <X className="w-3 h-3" strokeWidth={1.75} />
              Zurücksetzen
            </button>
          ) : null}
        </div>
      </div>

      <div className={`${showFilters ? "block" : "hidden"} md:block mb-8`}>
        <div className="flex flex-wrap gap-2 mb-3">
          {presentCats.map((cat) => {
            const active = activeCats.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCat(cat.id)}
                aria-pressed={active}
                className={`px-3 py-1.5 rounded-full text-[12px] tracking-tight border transition-colors duration-200 ${
                  active
                    ? "bg-burgundy text-card border-burgundy"
                    : "bg-transparent text-ink-muted border-line-strong hover:text-ink hover:border-ink"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = activeSizes.includes(size.id);
            return (
              <button
                key={size.id}
                type="button"
                onClick={() => toggleSize(size.id)}
                aria-pressed={active}
                className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.15em] border transition-colors duration-200 ${
                  active
                    ? "bg-ink text-card border-ink"
                    : "bg-transparent text-ink-faint border-line hover:text-ink hover:border-ink"
                }`}
              >
                {size.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <EventGrid events={filtered} variant={variant} />
      )}
    </div>
  );
}
