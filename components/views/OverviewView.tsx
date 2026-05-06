"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Calendar, CalendarRange, Filter, X } from "lucide-react";
import {
  filterEvents,
  getMonthEvents,
  getPastEvents,
  getTodayEvents,
  getWeekEvents,
  groupByDay,
  now,
} from "@/lib/events";
import { ensureSeedReviews } from "@/lib/reviews";
import { goingCount } from "@/lib/going";
import { STORAGE_EVENT } from "@/lib/storage";
import { CATEGORIES, SIZES } from "@/lib/categories";
import { HeroCarousel } from "@/components/HeroCarousel";
import { EventCard } from "@/components/EventCard";
import { EmptyState } from "@/components/EmptyState";
import { formatDateLong } from "@/lib/format";
import type { CategoryId, SizeId, ZhEvent } from "@/lib/types";

type RangeId = "today" | "week" | "month";

interface RangeMeta {
  id: RangeId;
  label: string;
  shortLabel: string;
  Icon: typeof Calendar;
  loader: (ref: Date) => ZhEvent[];
  emptyTitle: string;
  emptyDescription: string;
}

const RANGES: RangeMeta[] = [
  {
    id: "today",
    label: "Heute",
    shortLabel: "Tag",
    Icon: Calendar,
    loader: getTodayEvents,
    emptyTitle: "Heute Abend ist es ruhig",
    emptyDescription:
      "Keine kuratierten Events für heute. Wirf einen Blick auf die Wochen- oder Monatsansicht.",
  },
  {
    id: "week",
    label: "Diese Woche",
    shortLabel: "Woche",
    Icon: CalendarDays,
    loader: getWeekEvents,
    emptyTitle: "Diese Woche ist überraschend ruhig",
    emptyDescription:
      "Keine Events in den nächsten sieben Tagen. Schau in der Monatsansicht weiter.",
  },
  {
    id: "month",
    label: "Diesen Monat",
    shortLabel: "Monat",
    Icon: CalendarRange,
    loader: getMonthEvents,
    emptyTitle: "Diesen Monat noch nichts geplant",
    emptyDescription: "Keine Events in den nächsten dreißig Tagen.",
  },
];

const SIZE_BASE: Record<ZhEvent["size"], number> = {
  mega: 4800,
  major: 1400,
  mid: 540,
  intimate: 180,
};

export function OverviewView() {
  const [range, setRange] = useState<RangeId>("week");
  const [activeCats, setActiveCats] = useState<CategoryId[]>([]);
  const [activeSizes, setActiveSizes] = useState<SizeId[]>([]);
  const [events, setEvents] = useState<ZhEvent[]>([]);
  const [today, setToday] = useState<ZhEvent[]>([]);
  const [featured, setFeatured] = useState<ZhEvent[]>([]);
  const [todayGoing, setTodayGoing] = useState(0);
  const [eyebrow, setEyebrow] = useState("");

  useEffect(() => {
    ensureSeedReviews();
    const sync = () => {
      const ref = now();
      const t = getTodayEvents(ref);
      const past = getPastEvents(ref).slice(0, 2);
      const week = getWeekEvents(ref);
      const ids = new Set<string>();
      const featuredList: ZhEvent[] = [];
      [...past, ...t, ...week].forEach((e) => {
        if (!ids.has(e.id) && featuredList.length < 5) {
          ids.add(e.id);
          featuredList.push(e);
        }
      });
      setToday(t);
      setFeatured(featuredList);
      setTodayGoing(t.reduce((acc, e) => acc + goingCount(e.id, SIZE_BASE[e.size]), 0));
      setEyebrow(formatDateLong(ref.toISOString()));
    };
    sync();
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, []);

  useEffect(() => {
    const meta = RANGES.find((r) => r.id === range)!;
    const sync = () => setEvents(meta.loader(now()));
    sync();
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, [range]);

  const presentCats = useMemo(() => {
    const set = new Set(events.map((e) => e.category));
    return CATEGORIES.filter((c) => set.has(c.id));
  }, [events]);

  const filtered = useMemo(
    () => filterEvents(events, { categories: activeCats, sizes: activeSizes }),
    [events, activeCats, activeSizes]
  );

  const groups = useMemo(() => groupByDay(filtered), [filtered]);
  const meta = RANGES.find((r) => r.id === range)!;
  const hasFilters = activeCats.length > 0 || activeSizes.length > 0;

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

  return (
    <div className="px-5 md:px-8 pt-6 md:pt-8 pb-16 max-w-[1280px] mx-auto">
      {featured.length > 0 ? (
        <div className="mb-8">
          <HeroCarousel events={featured} />
        </div>
      ) : null}

      <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-ink-faint mb-2">
            {eyebrow}
          </p>
          <h1 className="font-display text-[36px] leading-[1] md:text-[52px] md:leading-[1] tracking-[-0.02em] text-ink font-light">
            Was läuft in Zürich.
          </h1>
          <p className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-ink-muted max-w-2xl">
            {today.length > 0
              ? `Heute Abend ${today.length} ${today.length === 1 ? "Event" : "Events"} in der Stadt — ${todayGoing.toLocaleString("de-CH").replace(/,/g, "'")} Personen sind angemeldet.`
              : "Heute Abend ruhig in der Stadt — schau dich für die kommenden Tage und Wochen um."}
          </p>
        </div>
      </header>

      <div className="sticky top-16 z-30 -mx-5 md:-mx-8 px-5 md:px-8 py-3 mb-6 bg-paper/85 backdrop-blur-md border-b border-line">
        <div
          className="flex items-center gap-1 bg-paper-dim rounded-full p-[3px] w-full sm:w-auto sm:inline-flex"
          role="tablist"
          aria-label="Zeitraum wählen"
        >
          {RANGES.map((r) => {
            const active = r.id === range;
            const count = r.id === range ? events.length : r.loader(now()).length;
            const Icon = r.Icon;
            return (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setRange(r.id)}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 h-9 rounded-full text-[13px] font-medium transition-colors duration-200 ${
                  active ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span className="hidden sm:inline">{r.label}</span>
                <span className="sm:hidden">{r.shortLabel}</span>
                <span
                  className={`tabular-nums text-[11px] px-1.5 py-0.5 rounded-full ${
                    active ? "bg-paper/15 text-paper/85" : "bg-line/60 text-ink-faint"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-3.5 h-3.5 text-ink-faint" strokeWidth={1.75} />
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-faint">
            Kategorien
          </span>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearAll}
              className="ml-auto inline-flex items-center gap-1 text-[11px] text-ink-muted hover:text-ink transition-colors"
            >
              <X className="w-3 h-3" strokeWidth={2} />
              {activeCats.length + activeSizes.length} Filter zurücksetzen
            </button>
          ) : null}
        </div>
        <div
          className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <FilterPill label="Alle" active={!hasFilters} onClick={clearAll} />
          {presentCats.map((cat) => (
            <FilterPill
              key={cat.id}
              label={cat.label}
              active={activeCats.includes(cat.id)}
              onClick={() => toggleCat(cat.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
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
                <span className="ml-1.5 text-ink-faint/70 normal-case tracking-normal">
                  · {size.capacity}
                </span>
              </button>
            );
          })}
        </div>
        <span className="text-[12px] text-ink-faint tabular-nums shrink-0">
          {filtered.length} {filtered.length === 1 ? "Event" : "Events"}
          {meta.id !== "today" && groups.length > 1 ? ` · ${groups.length} Tage` : ""}
        </span>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={hasFilters ? "Mit diesen Filtern nichts gefunden" : meta.emptyTitle}
          description={hasFilters
            ? "Lockere die Auswahl oder wechsle den Zeitraum."
            : meta.emptyDescription}
          action={
            hasFilters ? (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-paper text-[14px] font-medium hover:bg-burgundy transition-colors"
              >
                Filter zurücksetzen
              </button>
            ) : (
              <Link
                href="/neuer-event"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-paper text-[14px] font-medium hover:bg-burgundy transition-colors"
              >
                Event vorschlagen
              </Link>
            )
          }
        />
      ) : range === "today" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((event, idx) => (
            <EventCard key={event.id} event={event} index={idx} />
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {groups.map((group, gi) => (
            <section
              key={group.day}
              className="stagger-fade-up"
              style={{ animationDelay: `${gi * 60}ms` }}
            >
              <div className="flex items-baseline justify-between pb-3 mb-5 border-b border-line">
                <h2 className="font-display text-[22px] md:text-[26px] text-ink tracking-[-0.02em]">
                  {formatDateLong(group.isoSample)}
                </h2>
                <span className="text-[10px] uppercase tracking-[0.15em] text-ink-faint tabular-nums">
                  {group.events.length} {group.events.length === 1 ? "Event" : "Events"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {group.events.map((event, idx) => (
                  <EventCard key={event.id} event={event} index={idx} />
                ))}
              </div>
            </section>
          ))}
        </div>
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
