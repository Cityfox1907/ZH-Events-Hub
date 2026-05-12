"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  UtensilsCrossed,
  Wine,
  Waves,
  Activity,
  Landmark,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { FilterBar, FilterChips, type FilterState } from "@/components/FilterBar";
import { PLACES_ALL, PLACE_KINDS, placeHref } from "@/lib/data";
import type { PlaceKind } from "@/lib/types";

const ICONS = {
  UtensilsCrossed,
  Wine,
  Waves,
  Activity,
  Landmark,
} as const;

const SORT_OPTIONS = [
  { key: "rating", label: "Beste Bewertung" },
  { key: "trending", label: "Trending" },
  { key: "price", label: "Preis" },
] as const;

type SortKey = (typeof SORT_OPTIONS)[number]["key"];

export default function OrtePage() {
  return (
    <Suspense fallback={null}>
      <OrteInner />
    </Suspense>
  );
}

function OrteInner() {
  const params = useSearchParams();
  const districtFromUrl = params?.get("district");
  const kindFromUrl = params?.get("kind") as PlaceKind | null;

  const [activeKind, setActiveKind] = useState<PlaceKind | null>(
    kindFromUrl ?? null,
  );
  const [filters, setFilters] = useState<FilterState>({});
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("rating");

  useEffect(() => {
    if (districtFromUrl) {
      setFilters((f) => ({ ...f, district: districtFromUrl }));
    }
  }, [districtFromUrl]);

  const filtered = useMemo(() => {
    let list = PLACES_ALL.slice();
    if (activeKind) list = list.filter((p) => p.kind === activeKind);
    if (filters.district) list = list.filter((p) => p.district === filters.district);
    if (filters.price) list = list.filter((p) => p.price_range === filters.price);
    if (filters.vibe) list = list.filter((p) => p.vibe_tags.includes(filters.vibe as never));

    list.sort((a, b) => {
      if (sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sort === "trending") {
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      }
      return a.price_range.length - b.price_range.length;
    });

    return list;
  }, [activeKind, filters, sort]);

  const counts = useMemo(() => {
    const map: Record<PlaceKind, number> = {
      restaurant: 0,
      bar: 0,
      badi: 0,
      activity: 0,
      museum: 0,
    };
    PLACES_ALL.forEach((p) => {
      map[p.kind]++;
    });
    return map;
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Orte"
        title="Wo Zürich Zeit verbringt."
        subtitle="Restaurants, Bars, Badis, Aktivitäten, Museen — alle Orte, die immer da sind, wenn du sie brauchst."
      />

      {/* KIND PILLS (sticky) */}
      <div className="sticky top-[57px] z-30 bg-paper/85 backdrop-blur border-b border-line">
        <div className="container-editorial py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 md:mx-0 md:px-0">
            <button
              onClick={() => setActiveKind(null)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] border transition-colors ${
                activeKind === null
                  ? "bg-ink text-paper border-ink"
                  : "border-line bg-card hover:border-burgundy"
              }`}
            >
              Alle Orte
              <span className="text-[11px] text-ink-faint">
                {PLACES_ALL.length}
              </span>
            </button>
            {PLACE_KINDS.map((k) => {
              const Icon = ICONS[k.icon as keyof typeof ICONS] ?? UtensilsCrossed;
              const active = activeKind === k.key;
              return (
                <button
                  key={k.key}
                  onClick={() => setActiveKind(active ? null : k.key)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] border transition-colors ${
                    active
                      ? "bg-ink text-paper border-ink"
                      : "border-line bg-card hover:border-burgundy"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {k.plural}
                  <span
                    className={`text-[11px] ${
                      active ? "text-paper-dim" : "text-ink-faint"
                    }`}
                  >
                    {counts[k.key]}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setAdvancedOpen((v) => !v)}
            className="mt-3 inline-flex items-center gap-2 text-[12px] text-ink-muted hover:text-burgundy"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Erweiterte Filter
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                advancedOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <section className="container-editorial pb-20 pt-6">
        {advancedOpen && (
          <div className="mb-5">
            <FilterBar
              active={filters}
              onChange={setFilters}
              onReset={() => setFilters({})}
              groups={[
                {
                  key: "district",
                  label: "Stadtteil",
                  options: [
                    "Kreis 1",
                    "Kreis 2",
                    "Kreis 3",
                    "Kreis 4",
                    "Kreis 5",
                    "Kreis 8",
                    "Kreis 9",
                  ],
                },
                {
                  key: "price",
                  label: "Preis",
                  options: [
                    "CHF",
                    "CHF CHF",
                    "CHF CHF CHF",
                    "CHF CHF CHF CHF",
                  ],
                },
                {
                  key: "vibe",
                  label: "Vibe",
                  options: [
                    "Date Night",
                    "Casual",
                    "Premium",
                    "Family",
                    "Hidden Gem",
                    "Outdoor",
                    "Indoor",
                    "Cultural",
                  ],
                },
              ]}
            />
          </div>
        )}

        <FilterChips
          active={filters}
          onRemove={(k) => setFilters((f) => ({ ...f, [k]: null }))}
        />

        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <p className="text-[12px] text-ink-muted">
            {filtered.length} Orte gefunden
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-ink-faint">
              Sortieren
            </span>
            <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-card border border-line">
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSort(s.key)}
                  className={`px-3 py-1 rounded-full text-[12px] transition-colors ${
                    sort === s.key
                      ? "bg-ink text-paper"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <Empty />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filtered.map((p) => (
              <Card
                key={`${p.source}-${p.id}`}
                module={p.source === "dine" ? "dine" : "orte"}
                id={p.id}
                title={p.name}
                href={placeHref(p)}
                cover={p.cover_image}
                eyebrow={`${p.subtype} · ${p.district}`}
                meta={p.description}
                price={p.price_range}
                rating={p.rating}
                vibe_tags={p.vibe_tags}
                trending={p.trending}
                showShare
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Empty() {
  return (
    <div className="p-10 text-center bg-card border border-line rounded-2xl">
      <p className="font-display text-xl">Keine Orte gefunden</p>
      <p className="text-[14px] text-ink-muted mt-2">
        Lockere die Filter — oder schau in einer anderen Kategorie.
      </p>
    </div>
  );
}
