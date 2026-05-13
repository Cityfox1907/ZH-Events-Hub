"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CalendarDays,
  CalendarRange,
  Calendar,
  CalendarHeart,
  ChevronLeft,
  ChevronRight,
  Star,
  Filter,
  X,
  Music,
  PartyPopper,
  Trophy,
  Palette,
  Theater,
  Sparkles,
  Users,
  ShoppingBag,
  Clapperboard,
  Image as ImageIcon,
  LayoutGrid,
  MapPin,
  Clock,
  Bookmark,
  Share2,
  ArrowRight,
} from "lucide-react";
import {
  KALENDER_EVENTS,
  KALENDER_CATEGORIES,
  CATEGORY_COLOR,
  SEASONS,
  SEASON_HEADLINE,
  SEASON_HERO_IMAGES,
  TODAY_ISO,
  TODAY_DATE,
  MONTH_NAMES_DE,
  WEEKDAY_SHORT_DE,
  WEEKDAY_LONG_DE,
  eventsOn,
  eventsInMonth,
  parseDateISO,
  formatISODateDE,
  daysBetween,
  nextClassicAfter,
  weekdayMon0,
  isoDate,
  startOfWeekMon,
  addDays,
  timeOfDay,
  TIME_OF_DAY_LABEL,
  seasonForMonth,
} from "@/lib/kalender-data";
import type { KalenderEvent, KalenderCategory, KalenderSeason } from "@/lib/types";
import { useToast } from "@/components/Toast";

const CAT_ICON: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Music,
  PartyPopper,
  Trophy,
  Palette,
  Theater,
  Sparkles,
  Users,
  ShoppingBag,
  Clapperboard,
  Image: ImageIcon,
  LayoutGrid,
};

type View = "today" | "week" | "month" | "year";
const VIEWS: { key: View; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "today", label: "Heute", Icon: CalendarHeart },
  { key: "week", label: "Woche", Icon: CalendarDays },
  { key: "month", label: "Monat", Icon: Calendar },
  { key: "year", label: "Jahr", Icon: CalendarRange },
];

export default function KalenderPage() {
  return (
    <Suspense fallback={null}>
      <KalenderInner />
    </Suspense>
  );
}

function KalenderInner() {
  const params = useSearchParams();
  const router = useRouter();

  const initialView = (params?.get("view") as View) || "today";
  const [view, setView] = useState<View>(initialView);

  const [cat, setCat] = useState<KalenderCategory | "all">("all");
  const [season, setSeason] = useState<KalenderSeason | "all">("all");
  const [onlyClassics, setOnlyClassics] = useState(false);
  const [onlyFree, setOnlyFree] = useState(false);

  // sync URL
  useEffect(() => {
    const sp = new URLSearchParams();
    sp.set("view", view);
    if (cat !== "all") sp.set("kategorie", cat);
    if (season !== "all") sp.set("saison", season);
    if (onlyClassics) sp.set("klassiker", "1");
    if (onlyFree) sp.set("gratis", "1");
    router.replace(`/entdecken/kalender?${sp.toString()}`, { scroll: false });
  }, [view, cat, season, onlyClassics, onlyFree, router]);

  const filteredAll: KalenderEvent[] = useMemo(() => {
    return KALENDER_EVENTS.filter((e) => {
      if (cat !== "all" && e.category !== cat) return false;
      if (season !== "all" && e.season !== season) return false;
      if (onlyClassics && !e.isClassic) return false;
      if (onlyFree && e.priceBand !== "free") return false;
      return true;
    });
  }, [cat, season, onlyClassics, onlyFree]);

  return (
    <>
      {/* VIEW SWITCHER ─────────────────────────────────────── */}
      <section className="container-editorial pt-8 pb-2">
        <p className="eyebrow">Zürich-Kalender</p>
        <h1 className="font-display text-4xl md:text-6xl mt-2 leading-[0.95] tracking-tight">
          Was läuft <span className="italic text-burgundy">wann.</span>
        </h1>

        <div className="mt-6 inline-flex rounded-full border border-line bg-card p-1 gap-1 overflow-x-auto max-w-full">
          {VIEWS.map(({ key, label, Icon }) => {
            const active = view === key;
            return (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-ink text-paper"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* GLOBAL FILTERS (sticky) ────────────────────────────── */}
      <GlobalFilters
        cat={cat}
        setCat={setCat}
        season={season}
        setSeason={setSeason}
        onlyClassics={onlyClassics}
        setOnlyClassics={setOnlyClassics}
        onlyFree={onlyFree}
        setOnlyFree={setOnlyFree}
        count={filteredAll.length}
      />

      {/* VIEWS */}
      {view === "today" && <TodayView events={filteredAll} />}
      {view === "week" && <WeekView events={filteredAll} />}
      {view === "month" && <MonthView events={filteredAll} />}
      {view === "year" && <YearView events={filteredAll} />}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// GLOBAL FILTERS
// ─────────────────────────────────────────────────────────────

function GlobalFilters({
  cat,
  setCat,
  season,
  setSeason,
  onlyClassics,
  setOnlyClassics,
  onlyFree,
  setOnlyFree,
  count,
}: {
  cat: KalenderCategory | "all";
  setCat: (v: KalenderCategory | "all") => void;
  season: KalenderSeason | "all";
  setSeason: (v: KalenderSeason | "all") => void;
  onlyClassics: boolean;
  setOnlyClassics: (v: boolean) => void;
  onlyFree: boolean;
  setOnlyFree: (v: boolean) => void;
  count: number;
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const hasFilters = cat !== "all" || season !== "all" || onlyClassics || onlyFree;

  return (
    <div className="sticky top-[104px] z-20 bg-paper/95 backdrop-blur border-y border-line">
      <div className="container-editorial py-3 space-y-2">
        <div className="flex gap-1.5 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 pb-1 scrollbar-thin">
          {KALENDER_CATEGORIES.map((c) => {
            const Icon = CAT_ICON[c.icon] ?? Sparkles;
            const active = cat === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setCat(c.key as KalenderCategory | "all")}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] transition-colors ${
                  active
                    ? "bg-ink text-paper border-ink"
                    : "border-line bg-card text-ink-muted hover:border-burgundy hover:text-ink"
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.6} />
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <button
            onClick={() => setMoreOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[12px] text-ink-muted hover:text-burgundy"
          >
            <Filter className="w-3.5 h-3.5" />
            Mehr Filter
          </button>
          <p className="text-[12px] text-ink-muted">
            <strong className="text-ink tabular-nums">{count}</strong> Events gefunden
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setCat("all");
                setSeason("all");
                setOnlyClassics(false);
                setOnlyFree(false);
              }}
              className="text-[11.5px] uppercase tracking-wider text-ink-muted hover:text-burgundy"
            >
              Reset
            </button>
          )}
        </div>

        {moreOpen && (
          <div className="pt-2 border-t border-line flex flex-wrap items-center gap-3">
            <span className="text-[10.5px] uppercase tracking-wider text-ink-faint">
              Saison
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {(["all", ...SEASONS.map((s) => s.key)] as const).map((k) => {
                const label = k === "all" ? "Alle" : SEASONS.find((s) => s.key === k)?.label;
                const active = season === k;
                return (
                  <button
                    key={k}
                    onClick={() => setSeason(k as KalenderSeason | "all")}
                    className={`text-[11.5px] px-3 py-1 rounded-full border transition-colors ${
                      active
                        ? "bg-ink text-paper border-ink"
                        : "border-line bg-card hover:border-burgundy"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <label className="flex items-center gap-1.5 text-[12px] text-ink-muted cursor-pointer">
              <input
                type="checkbox"
                checked={onlyClassics}
                onChange={(e) => setOnlyClassics(e.target.checked)}
                className="accent-burgundy"
              />
              Nur Zürcher Klassiker
            </label>
            <label className="flex items-center gap-1.5 text-[12px] text-ink-muted cursor-pointer">
              <input
                type="checkbox"
                checked={onlyFree}
                onChange={(e) => setOnlyFree(e.target.checked)}
                className="accent-burgundy"
              />
              Nur Gratis
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HEUTE VIEW
// ─────────────────────────────────────────────────────────────

function TodayView({ events }: { events: KalenderEvent[] }) {
  const todays = events.filter((e) => TODAY_ISO >= e.dateStart && TODAY_ISO <= e.dateEnd);
  const featured =
    todays.find((e) => e.isClassic && e.importance === "mega") ??
    todays.find((e) => e.isClassic) ??
    todays[0];
  const others = todays.filter((e) => e.id !== featured?.id);

  const upcomingClassic = nextClassicAfter(TODAY_ISO);
  const daysToNext = upcomingClassic ? daysBetween(TODAY_ISO, upcomingClassic.dateStart) : null;

  const tomorrowIso = isoDate(addDays(TODAY_DATE, 1));
  const tomorrow = events
    .filter((e) => tomorrowIso >= e.dateStart && tomorrowIso <= e.dateEnd)
    .slice(0, 3);

  return (
    <>
      <section className="container-editorial pt-8 pb-6">
        <h2 className="font-display text-3xl md:text-4xl leading-tight">
          Heute — {formatISODateDE(TODAY_ISO)}
        </h2>
        <p className="text-[14px] text-ink-muted mt-1">
          <strong className="text-ink">{todays.length}</strong> Events in Zürich heute
        </p>
        {upcomingClassic && (
          <p className="mt-3 inline-flex items-center gap-2 text-[12.5px] text-burgundy bg-burgundy/8 border border-burgundy/20 rounded-full px-3 py-1">
            <Star className="w-3.5 h-3.5 fill-burgundy" />
            Nächster Zürcher Klassiker: {upcomingClassic.title} in {daysToNext} Tagen
          </p>
        )}
      </section>

      {featured && (
        <section className="container-editorial pb-8">
          <FeaturedCard event={featured} />
        </section>
      )}

      {others.length > 0 && (
        <section className="container-editorial pb-10">
          <h3 className="font-display text-2xl md:text-3xl mb-5">Weitere Events heute</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {others.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}

      {todays.length === 0 && (
        <section className="container-editorial pb-10">
          <div className="p-10 text-center bg-card border border-line rounded-2xl">
            <p className="font-display text-xl">Heute eher ruhig in Zürich.</p>
            <p className="text-[14px] text-ink-muted mt-2">
              Probiere die Wochen- oder Monatsansicht — oder lockere die Filter.
            </p>
          </div>
        </section>
      )}

      {todays.length > 0 && <TodayTimeline events={todays} />}

      <section className="container-editorial pb-20">
        <div className="flex items-baseline justify-between mb-5">
          <h3 className="font-display text-2xl md:text-3xl">Was wäre wenn… morgen?</h3>
        </div>
        {tomorrow.length === 0 ? (
          <p className="text-[14px] text-ink-muted">Morgen passiert nichts Auffälliges.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tomorrow.map((e) => (
              <EventCard key={e.id} event={e} compact />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function TodayTimeline({ events }: { events: KalenderEvent[] }) {
  const HOURS = [9, 12, 15, 18, 21, 24];
  return (
    <section className="container-editorial pb-12">
      <h3 className="font-display text-2xl md:text-3xl mb-5">Tages-Timeline</h3>
      <div className="relative pt-2 pb-10 bg-card border border-line rounded-2xl px-6 md:px-10 card-shadow">
        <div className="relative h-1.5 bg-line rounded-full">
          {HOURS.map((h, i) => (
            <div
              key={h}
              className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-line-strong"
              style={{ left: `${(i / (HOURS.length - 1)) * 100}%` }}
            />
          ))}
          {events.map((e) => {
            if (!e.timeStart) return null;
            const [hh, mm] = e.timeStart.split(":").map(Number);
            const t = hh + (mm || 0) / 60;
            const pct = Math.max(0, Math.min(100, ((t - 9) / (24 - 9)) * 100));
            return (
              <div
                key={e.id}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 group"
                style={{ left: `${pct}%` }}
              >
                <span
                  className="block w-3 h-3 rounded-full ring-2 ring-paper"
                  style={{ background: CATEGORY_COLOR[e.category] }}
                />
                <span className="invisible group-hover:visible absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] bg-ink text-paper px-2 py-1 rounded">
                  {e.timeStart} · {e.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-3 text-[10.5px] uppercase tracking-wider text-ink-faint">
          {HOURS.map((h) => (
            <span key={h}>{String(h).padStart(2, "0")}:00</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// WOCHE VIEW
// ─────────────────────────────────────────────────────────────

function WeekView({ events }: { events: KalenderEvent[] }) {
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeekMon(TODAY_DATE));
  const [selected, setSelected] = useState<string>(TODAY_ISO);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);
  const weekStartIso = isoDate(days[0]);
  const weekEndIso = isoDate(days[6]);

  const fmtRange = `${days[0].getDate()}.${days[0].getMonth() + 1}.—${days[6].getDate()}.${days[6].getMonth() + 1}. ${days[6].getFullYear()}`;

  const selectedEvents = events.filter(
    (e) => selected >= e.dateStart && selected <= e.dateEnd,
  );

  const byPart = {
    morgen: selectedEvents.filter((e) => timeOfDay(e.timeStart) === "morgen"),
    nachmittag: selectedEvents.filter((e) => timeOfDay(e.timeStart) === "nachmittag"),
    abend: selectedEvents.filter((e) => timeOfDay(e.timeStart) === "abend"),
    nacht: selectedEvents.filter((e) => timeOfDay(e.timeStart) === "nacht"),
  };

  const weekendHighlight = events.find(
    (e) =>
      e.isClassic &&
      e.importance === "mega" &&
      !(e.dateEnd < weekStartIso || e.dateStart > weekEndIso),
  );

  return (
    <>
      <section className="container-editorial pt-8 pb-6">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <h2 className="font-display text-3xl md:text-4xl leading-tight">{fmtRange}</h2>
          <div className="flex gap-2">
            <NavButton onClick={() => setWeekStart((d) => addDays(d, -7))} dir="prev" label="Vorherige Woche" />
            <button
              onClick={() => {
                setWeekStart(startOfWeekMon(TODAY_DATE));
                setSelected(TODAY_ISO);
              }}
              className="text-[12px] px-3 py-1.5 rounded-full border border-line bg-card hover:border-burgundy"
            >
              Aktuelle Woche
            </button>
            <NavButton onClick={() => setWeekStart((d) => addDays(d, 7))} dir="next" label="Nächste Woche" />
          </div>
        </div>
      </section>

      <section className="container-editorial pb-6">
        <div className="grid grid-cols-7 gap-2 md:gap-3 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
          {days.map((d, i) => {
            const iso = isoDate(d);
            const dayEvents = events.filter((e) => iso >= e.dateStart && iso <= e.dateEnd);
            const hasClassic = dayEvents.some((e) => e.isClassic);
            const isToday = iso === TODAY_ISO;
            const isSelected = selected === iso;
            return (
              <button
                key={iso}
                onClick={() => setSelected(iso)}
                className={`text-left p-3 rounded-2xl border transition-all min-w-[80px] ${
                  isSelected
                    ? "bg-ink text-paper border-ink"
                    : isToday
                      ? "bg-burgundy/8 border-burgundy/40"
                      : "bg-card border-line hover:border-burgundy"
                }`}
              >
                <p className={`text-[10.5px] uppercase tracking-wider ${isSelected ? "text-paper-dim" : "text-ink-faint"}`}>
                  {WEEKDAY_SHORT_DE[i]}
                </p>
                <p className={`font-display text-2xl mt-1 leading-none ${isToday && !isSelected ? "text-burgundy" : ""}`}>
                  {d.getDate()}
                </p>
                <p className={`text-[11px] mt-2 ${isSelected ? "text-paper-dim" : "text-ink-muted"}`}>
                  {dayEvents.length} Events
                </p>
                {hasClassic && (
                  <Star
                    className={`w-3.5 h-3.5 mt-1 ${isSelected ? "text-brass" : "text-burgundy fill-burgundy"}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="container-editorial pb-10">
        <p className="eyebrow mb-3">{formatISODateDE(selected)}</p>
        {selectedEvents.length === 0 ? (
          <p className="text-[14px] text-ink-muted">Keine Events an diesem Tag mit deinen Filtern.</p>
        ) : (
          <div className="space-y-7">
            {(["morgen", "nachmittag", "abend", "nacht"] as const).map((part) => {
              const list = byPart[part];
              if (list.length === 0) return null;
              return (
                <div key={part}>
                  <h3 className="font-display text-xl mb-3">{TIME_OF_DAY_LABEL[part]}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {list.map((e) => (
                      <EventCard key={e.id} event={e} horizontal />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {weekendHighlight && (
        <section className="container-editorial pb-20">
          <div className="relative overflow-hidden rounded-3xl bg-ink text-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={weekendHighlight.heroImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div
              className="relative p-8 md:p-12"
              style={{
                background:
                  "linear-gradient(135deg, rgba(10,23,51,0.85) 0%, rgba(15,77,168,0.45) 70%, transparent 100%)",
              }}
            >
              <p className="eyebrow text-paper-dim">Wochenend-Highlight</p>
              <h3 className="font-display text-3xl md:text-5xl mt-2 max-w-2xl leading-tight">
                {weekendHighlight.title}
              </h3>
              <p className="text-[14px] mt-3 text-paper-dim max-w-xl">
                {weekendHighlight.shortDescription}
              </p>
              <button className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full bg-paper text-ink text-[13px] font-medium hover:bg-paper-dim transition-colors">
                Mehr erfahren <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// MONAT VIEW
// ─────────────────────────────────────────────────────────────

function MonthView({ events }: { events: KalenderEvent[] }) {
  const [cursor, setCursor] = useState<{ y: number; m: number }>({
    y: TODAY_DATE.getFullYear(),
    m: TODAY_DATE.getMonth() + 1,
  });
  const [selectedIso, setSelectedIso] = useState<string | null>(null);

  const cells = useMemo(() => {
    const firstOfMonth = new Date(cursor.y, cursor.m - 1, 1);
    const startOffset = weekdayMon0(firstOfMonth);
    const daysInMonth = new Date(cursor.y, cursor.m, 0).getDate();
    const total = Math.ceil((startOffset + daysInMonth) / 7) * 7;
    return Array.from({ length: total }, (_, i) => {
      const dayNum = i - startOffset + 1;
      const inMonth = dayNum >= 1 && dayNum <= daysInMonth;
      const d = new Date(cursor.y, cursor.m - 1, dayNum);
      return { d, iso: isoDate(d), inMonth };
    });
  }, [cursor]);

  const monthEvents = events.filter((e) => {
    const startMonth = parseDateISO(e.dateStart).getFullYear() * 12 + parseDateISO(e.dateStart).getMonth();
    const endMonth = parseDateISO(e.dateEnd).getFullYear() * 12 + parseDateISO(e.dateEnd).getMonth();
    const cursorMonth = cursor.y * 12 + cursor.m - 1;
    return cursorMonth >= startMonth && cursorMonth <= endMonth;
  });

  function moveMonth(delta: number) {
    setCursor(({ y, m }) => {
      let nm = m + delta;
      let ny = y;
      while (nm < 1) {
        nm += 12;
        ny -= 1;
      }
      while (nm > 12) {
        nm -= 12;
        ny += 1;
      }
      return { y: ny, m: nm };
    });
    setSelectedIso(null);
  }

  const selectedEvents = selectedIso ? events.filter((e) => selectedIso >= e.dateStart && selectedIso <= e.dateEnd) : [];

  return (
    <>
      <section className="container-editorial pt-8 pb-4">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <h2 className="font-display text-3xl md:text-4xl">
            {MONTH_NAMES_DE[cursor.m - 1]} {cursor.y}
          </h2>
          <div className="flex gap-2">
            <NavButton onClick={() => moveMonth(-1)} dir="prev" label={MONTH_NAMES_DE[(cursor.m + 10) % 12]} />
            <NavButton onClick={() => moveMonth(1)} dir="next" label={MONTH_NAMES_DE[cursor.m % 12]} />
          </div>
        </div>
        <p className="text-[13px] text-ink-muted mt-1">
          <strong className="text-ink">{monthEvents.length}</strong> Events in diesem Monat
        </p>
      </section>

      <section className="container-editorial pb-8">
        <div className="grid grid-cols-7 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {WEEKDAY_SHORT_DE.map((d) => (
            <div key={d} className="bg-paper-dim py-2 text-center text-[10.5px] uppercase tracking-wider text-ink-faint">
              {d}
            </div>
          ))}
          {cells.map(({ d, iso, inMonth }) => {
            const dayEvents = events.filter((e) => iso >= e.dateStart && iso <= e.dateEnd);
            const isToday = iso === TODAY_ISO;
            const isSelected = selectedIso === iso;
            const hasClassic = dayEvents.some((e) => e.isClassic);
            const isWeekend = weekdayMon0(d) >= 5;

            return (
              <button
                key={iso + (inMonth ? "" : "-out")}
                onClick={() => inMonth && setSelectedIso(iso)}
                disabled={!inMonth}
                className={`text-left p-2 min-h-[84px] md:min-h-[110px] transition-colors relative ${
                  !inMonth
                    ? "bg-paper opacity-30 cursor-default"
                    : isSelected
                      ? "bg-ink text-paper"
                      : isToday
                        ? "bg-burgundy/8 hover:bg-burgundy/12"
                        : isWeekend
                          ? "bg-paper-dim/50 hover:bg-paper-dim"
                          : "bg-card hover:bg-paper-dim/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[12px] font-medium tabular-nums ${isToday && !isSelected ? "text-burgundy" : ""}`}>
                    {d.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className={`text-[9.5px] tabular-nums ${isSelected ? "text-paper-dim" : "text-ink-faint"}`}>
                      {dayEvents.length}
                    </span>
                  )}
                </div>
                {hasClassic && (
                  <Star
                    className={`w-3 h-3 absolute top-1.5 right-1.5 ${isSelected ? "text-brass" : "text-burgundy fill-burgundy"}`}
                  />
                )}
                <div className="mt-1.5 space-y-0.5">
                  {dayEvents.slice(0, 3).map((e) => (
                    <div
                      key={e.id}
                      className={`text-[9.5px] truncate rounded px-1 py-0.5 ${isSelected ? "bg-paper/15" : ""}`}
                      style={{
                        background: isSelected ? undefined : `${CATEGORY_COLOR[e.category]}22`,
                        color: isSelected ? "var(--color-paper-dim)" : CATEGORY_COLOR[e.category],
                      }}
                    >
                      {e.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className={`text-[9.5px] ${isSelected ? "text-paper-dim" : "text-ink-faint"}`}>
                      +{dayEvents.length - 3}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {selectedIso && (
        <DayPanel
          dateIso={selectedIso}
          events={selectedEvents}
          onClose={() => setSelectedIso(null)}
        />
      )}

      <section className="container-editorial pb-20">
        <p className="eyebrow mb-3">Weitere Monate {cursor.y}</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
            const active = m === cursor.m;
            return (
              <button
                key={m}
                onClick={() => setCursor({ y: cursor.y, m })}
                className={`p-2.5 rounded-xl text-[11.5px] font-medium transition-colors border ${
                  active
                    ? "bg-ink text-paper border-ink"
                    : "bg-card border-line text-ink-muted hover:border-burgundy"
                }`}
              >
                {MONTH_NAMES_DE[m - 1].slice(0, 3)}
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}

function DayPanel({
  dateIso,
  events,
  onClose,
}: {
  dateIso: string;
  events: KalenderEvent[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-stretch justify-end pointer-events-none">
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm pointer-events-auto fade-in"
        onClick={onClose}
      />
      <aside className="relative w-full max-w-md bg-paper border-l border-line shadow-modal overflow-y-auto pointer-events-auto fade-in">
        <div className="sticky top-0 bg-paper/95 backdrop-blur border-b border-line px-5 py-4 flex items-start justify-between">
          <div>
            <p className="eyebrow">Tag</p>
            <h3 className="font-display text-2xl mt-1 leading-tight">
              {formatISODateDE(dateIso)}
            </h3>
            <p className="text-[12px] text-ink-muted mt-1">
              {events.length} {events.length === 1 ? "Event" : "Events"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-paper-dim"
            aria-label="Schliessen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-3">
          {events.length === 0 ? (
            <p className="text-[13px] text-ink-muted">Hier passiert nichts mit deinen Filtern.</p>
          ) : (
            events.map((e) => <EventCard key={e.id} event={e} horizontal />)
          )}
        </div>
      </aside>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// JAHR VIEW — die filmische Reise
// ─────────────────────────────────────────────────────────────

function YearView({ events }: { events: KalenderEvent[] }) {
  const year = TODAY_DATE.getFullYear();
  const currentSeason = seasonForMonth(TODAY_DATE.getMonth() + 1);
  const heroImages = SEASON_HERO_IMAGES[currentSeason];

  const upcomingClassic = nextClassicAfter(TODAY_ISO);
  const daysToNext = upcomingClassic ? daysBetween(TODAY_ISO, upcomingClassic.dateStart) : null;

  const [scope, setScope] = useState<"all" | "month" | "season">("all");

  const classics = events.filter((e) => e.isClassic);

  const filteredEvents = useMemo(() => {
    if (scope === "month") {
      const ym = year * 12 + TODAY_DATE.getMonth();
      return events.filter((e) => {
        const startYm = parseDateISO(e.dateStart).getFullYear() * 12 + parseDateISO(e.dateStart).getMonth();
        const endYm = parseDateISO(e.dateEnd).getFullYear() * 12 + parseDateISO(e.dateEnd).getMonth();
        return ym >= startYm && ym <= endYm;
      });
    }
    if (scope === "season") return events.filter((e) => e.season === currentSeason);
    return events;
  }, [scope, events, currentSeason, year]);

  const monthsToShow = useMemo(() => {
    const months: number[] = [];
    for (let m = 1; m <= 12; m++) {
      if (filteredEvents.some((e) => isInMonth(e, year, m))) months.push(m);
    }
    return months;
  }, [filteredEvents, year]);

  return (
    <>
      {/* HERO — Vollbild */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-ink text-paper">
        {heroImages.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src + i}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover zb-kenburns zb-fade-cross"
            style={{ animationDelay: `${(i * 24) / heroImages.length}s, ${(i * 24) / heroImages.length}s` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/80" />

        <div className="relative h-full container-editorial flex flex-col justify-end pb-14 md:pb-20">
          <p className="eyebrow text-paper-dim">Zürich-Kalender · Filmische Reise</p>
          <h2 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-tight mt-2">
            Zürich {year}.
          </h2>
          <p className="text-[16px] md:text-[18px] mt-4 max-w-xl text-paper-dim">
            <strong className="text-paper">{classics.length} Anlässe</strong>, die unsere Stadt ausmachen.
          </p>

          {upcomingClassic && (
            <p className="mt-4 inline-flex items-center gap-2 self-start text-[13px] bg-paper/10 backdrop-blur border border-paper/20 rounded-full px-4 py-1.5">
              <Star className="w-3.5 h-3.5 text-brass fill-brass" />
              Nächster Klassiker in <strong>{daysToNext} Tagen</strong>: {upcomingClassic.title}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setScope("month");
                document.getElementById("year-content")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[12.5px] px-4 py-2 rounded-full bg-paper text-ink hover:bg-paper-dim transition-colors"
            >
              Diesen Monat
            </button>
            <button
              onClick={() => setScope("season")}
              className="text-[12.5px] px-4 py-2 rounded-full bg-paper/10 backdrop-blur border border-paper/20 text-paper hover:bg-paper/20 transition-colors"
            >
              Diese Saison
            </button>
            <button
              onClick={() => setScope("all")}
              className="text-[12.5px] px-4 py-2 rounded-full bg-paper/10 backdrop-blur border border-paper/20 text-paper hover:bg-paper/20 transition-colors"
            >
              Alle Klassiker
            </button>
          </div>
        </div>
      </section>

      <div id="year-content" />

      {/* MONATS-SEKTIONEN */}
      {monthsToShow.map((m) => {
        const monthEvents = filteredEvents.filter((e) => isInMonth(e, year, m));
        const mega = monthEvents.find((e) => e.importance === "mega") ?? null;
        const others = mega ? monthEvents.filter((e) => e.id !== mega.id) : monthEvents;
        const season = seasonForMonth(m);

        // Insert season-divider before first month of each season
        const isFirstOfSeason = SEASONS.find((s) => s.key === season)?.months[0] === m;

        return (
          <div key={m}>
            {isFirstOfSeason && <SeasonDivider season={season} />}

            <section className="container-editorial pt-10 pb-2">
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <h3 className="font-display text-3xl md:text-4xl">
                  {MONTH_NAMES_DE[m - 1]}
                </h3>
                <p className="text-[12px] uppercase tracking-wider text-ink-faint">
                  {monthEvents.length} {monthEvents.length === 1 ? "Anlass" : "Anlässe"}
                </p>
              </div>
            </section>

            {mega && (
              <section className="container-editorial pb-6">
                <MegaCard event={mega} />
              </section>
            )}

            {others.length > 0 && (
              <section className="container-editorial pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {others.map((e) => (
                    <EventCard key={e.id} event={e} />
                  ))}
                </div>
              </section>
            )}
          </div>
        );
      })}

      <MyYearSection events={events} upcomingClassic={upcomingClassic} daysToNext={daysToNext} />
    </>
  );
}

function isInMonth(e: KalenderEvent, year: number, month1: number): boolean {
  const startYm = parseDateISO(e.dateStart).getFullYear() * 12 + parseDateISO(e.dateStart).getMonth();
  const endYm = parseDateISO(e.dateEnd).getFullYear() * 12 + parseDateISO(e.dateEnd).getMonth();
  const target = year * 12 + month1 - 1;
  return target >= startYm && target <= endYm;
}

function SeasonDivider({ season }: { season: KalenderSeason }) {
  const heroImages = SEASON_HERO_IMAGES[season];
  const label = SEASONS.find((s) => s.key === season)?.label ?? "";
  return (
    <section className="relative w-full h-[40vh] md:h-[48vh] overflow-hidden bg-ink text-paper mt-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroImages[0]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover zb-kenburns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/70" />
      <div className="relative h-full container-editorial flex flex-col justify-center items-center text-center">
        <p className="eyebrow text-paper-dim">════ {label.toUpperCase()} IN ZÜRICH ════</p>
        <h3 className="font-display text-4xl md:text-6xl mt-3 max-w-2xl leading-tight">
          {SEASON_HEADLINE[season]}
        </h3>
      </div>
    </section>
  );
}

function MyYearSection({
  events,
  upcomingClassic,
  daysToNext,
}: {
  events: KalenderEvent[];
  upcomingClassic: KalenderEvent | undefined;
  daysToNext: number | null;
}) {
  const { push } = useToast();
  // For demo: pretend the user has bookmarked the first 4 mega classics
  const myEvents = events.filter((e) => e.isClassic && e.importance === "mega").slice(0, 4);

  return (
    <section className="container-editorial py-16">
      <div className="rounded-3xl border border-line bg-card p-8 md:p-12 card-shadow">
        <p className="eyebrow">Mein Zürch-Jahr</p>
        <h3 className="font-display text-3xl md:text-5xl mt-2 leading-tight">
          Dein Zürch-Jahr {TODAY_DATE.getFullYear()}
        </h3>
        <p className="text-[14px] text-ink-muted mt-3 max-w-xl">
          Du hast <strong className="text-ink">{myEvents.length} Klassiker</strong> gebookmarkt
          {upcomingClassic && daysToNext !== null && (
            <>
              {" "}— nächster:{" "}
              <strong className="text-burgundy">{upcomingClassic.title}</strong> in {daysToNext}{" "}
              Tagen.
            </>
          )}
        </p>

        {myEvents.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {myEvents.map((e) => (
              <Link
                key={e.id}
                href={`/entdecken/kalender?view=month`}
                className="group block aspect-[3/4] relative rounded-xl overflow-hidden bg-paper-dim"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={e.heroImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/0 to-ink/85" />
                <div className="absolute bottom-2 left-2 right-2 text-paper">
                  <p className="text-[10px] uppercase tracking-wider opacity-80">
                    {MONTH_NAMES_DE[parseDateISO(e.dateStart).getMonth()].slice(0, 3)}
                  </p>
                  <p className="font-display text-[14px] leading-tight line-clamp-2">{e.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => push("Kalender-Export — Demo", "success")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink text-paper text-[13px] font-medium hover:bg-burgundy transition-colors"
          >
            <CalendarDays className="w-4 h-4" />
            Zu meinem Kalender exportieren
          </button>
          <button
            onClick={() => push("Geteilt — Demo", "success")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-line bg-card text-ink text-[13px] font-medium hover:border-burgundy transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Mein Zürch-Jahr teilen
          </button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

function NavButton({
  onClick,
  dir,
  label,
}: {
  onClick: () => void;
  dir: "prev" | "next";
  label: string;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 text-[12px] px-3 py-1.5 rounded-full border border-line bg-card hover:border-burgundy"
      aria-label={label}
    >
      {dir === "prev" && <Icon className="w-3.5 h-3.5" />}
      <span className="hidden sm:inline">{label}</span>
      {dir === "next" && <Icon className="w-3.5 h-3.5" />}
    </button>
  );
}

function FeaturedCard({ event }: { event: KalenderEvent }) {
  const { push } = useToast();
  return (
    <article className="relative overflow-hidden rounded-3xl bg-ink text-paper min-h-[400px] md:min-h-[480px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.heroImage}
        alt={event.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,23,51,0.25) 0%, rgba(10,23,51,0.1) 40%, rgba(10,23,51,0.85) 100%)",
        }}
      />
      <div className="relative p-7 md:p-10 h-full flex flex-col justify-end min-h-[400px] md:min-h-[480px]">
        {event.isClassic && (
          <span className="self-start inline-flex items-center gap-1 px-3 py-1 rounded-full bg-burgundy text-paper text-[10.5px] font-medium uppercase tracking-wider">
            <Star className="w-3 h-3 fill-paper" />
            Zürch-Klassiker
          </span>
        )}
        <h3 className="font-display text-3xl md:text-5xl mt-4 max-w-2xl leading-tight">
          {event.title}
        </h3>
        <p className="text-[13px] text-paper-dim mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          {event.timeStart && (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {event.timeStart}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {event.location}
          </span>
          <span>· {event.priceInfo}</span>
        </p>
        <p className="text-[14.5px] mt-3 max-w-xl text-paper-dim">{event.shortDescription}</p>

        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => push(`${event.title} — Mehr Infos (Demo)`)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-paper text-ink text-[13px] font-medium hover:bg-paper-dim transition-colors"
          >
            Mehr erfahren <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => push(`${event.title} gemerkt (Demo)`, "success")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-paper/10 backdrop-blur border border-paper/20 text-paper text-[13px] font-medium hover:bg-paper/20 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            Bookmark
          </button>
        </div>
      </div>
    </article>
  );
}

function MegaCard({ event }: { event: KalenderEvent }) {
  const { push } = useToast();
  return (
    <article className="relative overflow-hidden rounded-3xl bg-ink text-paper min-h-[500px] md:min-h-[600px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.heroImage}
        alt={event.title}
        className="absolute inset-0 w-full h-full object-cover zb-kenburns"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,23,51,0.2) 0%, rgba(10,23,51,0.05) 35%, rgba(10,23,51,0.9) 100%)",
        }}
      />
      <div className="relative p-7 md:p-12 h-full flex flex-col justify-end min-h-[500px] md:min-h-[600px]">
        {event.isClassic && (
          <span className="self-start inline-flex items-center gap-1 px-3 py-1 rounded-full bg-burgundy text-paper text-[10.5px] font-medium uppercase tracking-wider">
            <Star className="w-3 h-3 fill-paper" />
            Zürch-Klassiker
            {event.tradition && <span className="text-paper-dim font-normal normal-case"> · {event.tradition}</span>}
          </span>
        )}
        <h3 className="font-display text-4xl md:text-7xl mt-4 max-w-3xl leading-[0.95]">
          {event.title}
        </h3>
        <p className="text-[14px] md:text-[15px] text-paper-dim mt-3 max-w-2xl leading-relaxed">
          {event.shortDescription}
        </p>
        <p className="text-[13px] text-paper-dim mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{datesLabel(event)}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {event.location}
          </span>
          <span>·</span>
          <span>{event.priceInfo}</span>
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => push(`${event.title} — Mehr (Demo)`)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-paper text-ink text-[13px] font-medium hover:bg-paper-dim transition-colors"
          >
            Mehr erfahren <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => push(`${event.title} gemerkt (Demo)`, "success")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-paper/10 backdrop-blur border border-paper/20 text-paper text-[13px] font-medium hover:bg-paper/20 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            Bookmark
          </button>
        </div>

        {event.communityQuotes && event.communityQuotes[0] && (
          <blockquote className="mt-6 text-[13px] italic text-paper-dim border-l-2 border-paper/30 pl-4 max-w-xl">
            &ldquo;{event.communityQuotes[0].text}&rdquo;
            <footer className="text-[11px] not-italic text-paper-dim/80 mt-1">
              — {event.communityQuotes[0].author}, {event.communityQuotes[0].district}
            </footer>
          </blockquote>
        )}
      </div>
    </article>
  );
}

function EventCard({
  event,
  compact,
  horizontal,
}: {
  event: KalenderEvent;
  compact?: boolean;
  horizontal?: boolean;
}) {
  const { push } = useToast();

  if (horizontal) {
    return (
      <article className="flex bg-card border border-line rounded-2xl overflow-hidden card-shadow card-shadow-hover transition-shadow">
        <div className="relative w-28 sm:w-32 shrink-0 bg-paper-dim">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {event.isClassic && (
            <Star className="absolute top-2 left-2 w-3.5 h-3.5 text-burgundy fill-burgundy" />
          )}
        </div>
        <div className="flex-1 p-3 min-w-0">
          <p className="eyebrow truncate">{event.category_label}</p>
          <h4 className="font-display text-[16px] leading-tight mt-1 line-clamp-2">
            {event.title}
          </h4>
          <p className="text-[11.5px] text-ink-muted mt-1 truncate">
            {event.timeStart && <span>{event.timeStart} · </span>}
            {event.district}
          </p>
          <p className="text-[11.5px] font-medium text-burgundy mt-1">
            {event.priceInfo}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group relative block bg-card rounded-2xl overflow-hidden border border-line card-shadow card-shadow-hover transition-shadow ${event.isClassic ? "border-l-2 border-l-burgundy" : ""}`}
    >
      <div className={`relative ${compact ? "aspect-[5/4]" : "aspect-[4/5]"} overflow-hidden bg-paper-dim`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.heroImage}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {event.timeStart && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ink/85 backdrop-blur text-paper text-[10px] font-medium">
            <Clock className="w-3 h-3" /> {event.timeStart}
          </span>
        )}
        {event.isClassic && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-burgundy text-paper text-[10px] font-medium uppercase tracking-wider">
            <Star className="w-3 h-3 fill-paper" />
            Klassiker
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            push(`${event.title} gemerkt (Demo)`, "success");
          }}
          className="absolute bottom-3 right-3 p-1.5 rounded-full bg-paper/90 backdrop-blur hover:bg-paper transition-colors"
          aria-label="Bookmark"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="p-4">
        <p className="eyebrow">
          {event.category_label} · {event.district}
        </p>
        <h4 className="font-display text-lg leading-tight mt-1.5 line-clamp-2">
          {event.title}
        </h4>
        <p className="text-[12px] text-ink-muted mt-2">{datesLabel(event)}</p>
        <p className="text-[12.5px] font-medium mt-1">{event.priceInfo}</p>
      </div>
    </article>
  );
}

function datesLabel(e: KalenderEvent): string {
  if (e.dateStart === e.dateEnd) {
    const d = parseDateISO(e.dateStart);
    return `${WEEKDAY_LONG_DE[weekdayMon0(d)]}, ${d.getDate()}. ${MONTH_NAMES_DE[d.getMonth()]}`;
  }
  const a = parseDateISO(e.dateStart);
  const b = parseDateISO(e.dateEnd);
  if (a.getMonth() === b.getMonth()) {
    return `${a.getDate()}.—${b.getDate()}. ${MONTH_NAMES_DE[a.getMonth()]}`;
  }
  return `${a.getDate()}. ${MONTH_NAMES_DE[a.getMonth()]} — ${b.getDate()}. ${MONTH_NAMES_DE[b.getMonth()]}`;
}
