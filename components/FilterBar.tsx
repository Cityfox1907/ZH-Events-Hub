"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, SIZES } from "@/lib/categories";
import type { CategoryId, SizeId, ZhEvent } from "@/lib/types";
import { filterEvents } from "@/lib/events";
import { EventGrid } from "./EventGrid";
import { EmptyState } from "./EmptyState";

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

  const allActive = !hasFilters;

  return (
    <div>
      <div
        className="flex gap-2 overflow-x-auto pb-1 mb-6"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <FilterPill label="Alle" active={allActive} onClick={clearAll} />
        {presentCats.map((cat) => (
          <FilterPill
            key={cat.id}
            label={cat.label}
            active={activeCats.includes(cat.id)}
            onClick={() => toggleCat(cat.id)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = activeSizes.includes(size.id);
            return (
              <button
                key={size.id}
                type="button"
                onClick={() => toggleSize(size.id)}
                aria-pressed={active}
                className={`px-3 h-7 rounded-full text-[10px] uppercase tracking-[0.15em] font-medium border transition-colors duration-200 ${
                  active
                    ? "bg-ink text-paper border-ink"
                    : "bg-transparent text-ink-faint border-line hover:text-ink hover:border-ink"
                }`}
              >
                {size.label}
              </button>
            );
          })}
        </div>
        <span className="text-[12px] text-ink-faint tabular-nums shrink-0 ml-3">
          {filtered.length} {filtered.length === 1 ? "Event" : "Events"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <EventGrid events={filtered} variant={variant} />
      )}
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-8 px-[14px] rounded-full text-[10px] font-medium uppercase tracking-[0.1em] whitespace-nowrap shrink-0 transition-colors duration-200 ${
        active
          ? "bg-burgundy text-paper border border-burgundy"
          : "bg-transparent text-ink-muted border border-line hover:bg-paper-dim hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
