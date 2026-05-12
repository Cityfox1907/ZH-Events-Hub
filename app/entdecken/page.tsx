"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Music,
  UtensilsCrossed,
  Palette,
  Sparkles,
  PartyPopper,
  Handshake,
  Trophy,
  Users,
  ShoppingBag,
  Drama,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { FilterBar, FilterChips, type FilterState } from "@/components/FilterBar";
import { EVENTS_ALL, EVENT_CATEGORIES, eventHref } from "@/lib/data";
import type { Bucket, EventCategory } from "@/lib/types";

const TIME_TABS: { key: Bucket | "all"; label: string }[] = [
  { key: "today", label: "Heute" },
  { key: "weekend", label: "Wochenende" },
  { key: "week", label: "Diese Woche" },
  { key: "all", label: "Alle" },
];

const ICONS = {
  Music,
  UtensilsCrossed,
  Palette,
  Sparkles,
  PartyPopper,
  Handshake,
  Trophy,
  Users,
  ShoppingBag,
  Drama,
} as const;

const PRICE_BAND_LABEL: Record<string, "free" | "low" | "mid" | "high"> = {
  Gratis: "free",
  "Bis 30": "low",
  "30–80": "mid",
  "80+": "high",
};

const SORT_OPTIONS = [
  { key: "date", label: "Datum" },
  { key: "trending", label: "Beliebtheit" },
  { key: "price", label: "Preis" },
] as const;

type SortKey = (typeof SORT_OPTIONS)[number]["key"];

export default function EntdeckenPage() {
  return (
    <Suspense fallback={null}>
      <EntdeckenInner />
    </Suspense>
  );
}

function EntdeckenInner() {
  const params = useSearchParams();
  const districtFromUrl = params?.get("district");
  const categoryFromUrl = params?.get("category") as EventCategory | null;

  const [timeTab, setTimeTab] = useState<Bucket | "all">("today");
  const [activeCat, setActiveCat] = useState<EventCategory | null>(
    categoryFromUrl ?? null,
  );
  const [filters, setFilters] = useState<FilterState>({});
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("date");

  useEffect(() => {
    if (districtFromUrl) {
      setFilters((f) => ({ ...f, district: districtFromUrl }));
    }
  }, [districtFromUrl]);

  const filtered = useMemo(() => {
    let list = EVENTS_ALL.slice();
    if (timeTab !== "all") list = list.filter((e) => e.bucket === timeTab);
    if (activeCat) list = list.filter((e) => e.category === activeCat);
    if (filters.district) list = list.filter((e) => e.district === filters.district);
    if (filters.price) {
      const band = PRICE_BAND_LABEL[filters.price];
      if (band) list = list.filter((e) => e.price_band === band);
    }
    if (filters.vibe) {
      list = list.filter((e) => e.vibe_tags.includes(filters.vibe as never));
    }
    if (filters.language) {
      list = list.filter(
        (e) => !e.languages || e.languages.includes(filters.language as never),
      );
    }

    list.sort((a, b) => {
      if (sort === "date") return a.date_iso.localeCompare(b.date_iso);
      if (sort === "trending") {
        const score = (e: typeof a) =>
          (e.trending ? 100 : 0) + (e.views_24h ?? 0);
        return score(b) - score(a);
      }
      const band: Record<string, number> = { free: 0, low: 1, mid: 2, high: 3 };
      return band[a.price_band] - band[b.price_band];
    });

    return list;
  }, [timeTab, activeCat, filters, sort]);

  return (
    <>
      <PageHero
        eyebrow="Entdecken"
        title="Was läuft in Zürich."
        subtitle="Konzerte, Pop-ups, Vernissagen, Parties, Theater, Workshops, Sport, Märkte — alle Events an einem Ort."
      >
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-card border border-line">
          {TIME_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTimeTab(t.key)}
              className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${
                timeTab === t.key
                  ? "bg-ink text-paper"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </PageHero>

      {/* CATEGORY PILLS (sticky) */}
      <div className="sticky top-[57px] z-30 bg-paper/85 backdrop-blur border-b border-line">
        <div className="container-editorial py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-thin">
            <button
              onClick={() => setActiveCat(null)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] border transition-colors ${
                activeCat === null
                  ? "bg-ink text-paper border-ink"
                  : "border-line bg-card hover:border-burgundy"
              }`}
            >
              Alle Kategorien
            </button>
            {EVENT_CATEGORIES.map((c) => {
              const Icon = ICONS[c.icon as keyof typeof ICONS] ?? Sparkles;
              const active = activeCat === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setActiveCat(active ? null : c.key)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] border transition-colors ${
                    active
                      ? "bg-ink text-paper border-ink"
                      : "border-line bg-card hover:border-burgundy"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {c.label}
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
                    "Kreis 6",
                    "Kreis 8",
                    "Kreis 9",
                  ],
                },
                {
                  key: "price",
                  label: "Preis",
                  options: ["Gratis", "Bis 30", "30–80", "80+"],
                },
                {
                  key: "vibe",
                  label: "Vibe",
                  options: [
                    "Date Night",
                    "Casual",
                    "Premium",
                    "Cultural",
                    "Family",
                    "Outdoor",
                  ],
                },
                {
                  key: "language",
                  label: "Sprache",
                  options: ["DE", "EN", "FR", "IT"],
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
            {filtered.length} Events gefunden
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
            {filtered.map((e) => (
              <Card
                key={`${e.source}-${e.id}`}
                module={e.source}
                id={e.id}
                title={e.title}
                href={eventHref(e)}
                cover={e.cover_image}
                eyebrow={`${e.category_label} · ${e.district}`}
                meta={`${e.datetime} · ${e.venue}`}
                price={e.price}
                vibe_tags={e.vibe_tags}
                trending={e.trending}
                views24h={e.views_24h}
                ticketsLeft={e.tickets_left}
                addedAt={e.added_at}
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
      <p className="font-display text-xl">Keine Events gefunden</p>
      <p className="text-[14px] text-ink-muted mt-2">
        Lockere die Filter — oder wechsle Kategorie oder Zeitraum.
      </p>
    </div>
  );
}
