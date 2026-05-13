"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import {
  EVENTS,
  TODAY_DATE,
  TODAY_ISO,
  KATEGORIE_COLOR,
  KATEGORIE_LABEL,
  formatDateRange,
  type EventX,
} from "@/lib/eventkalender";
import { EventCard } from "./EventCard";
import { useToast } from "@/components/Toast";

// ─────────────────────────────────────────────────────────────
// LISTE VIEW
// ─────────────────────────────────────────────────────────────

type Sort = "datum" | "beliebtheit" | "preis";

export function ListeView({ events }: { events: EventX[] }) {
  const [sort, setSort] = useState<Sort>("datum");
  const sorted = useMemo(() => {
    const copy = [...events];
    if (sort === "datum") copy.sort((a, b) => a.startDatum.localeCompare(b.startDatum));
    if (sort === "beliebtheit")
      copy.sort(
        (a, b) =>
          b.cross.posts + b.cross.tickets - (a.cross.posts + a.cross.tickets),
      );
    if (sort === "preis") copy.sort((a, b) => a.preis.min - b.preis.min);
    return copy;
  }, [events, sort]);

  return (
    <section className="container-editorial py-8">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="font-display text-2xl md:text-3xl">Liste · {sorted.length} Events</h2>
        <div className="inline-flex rounded-full border border-line bg-card p-0.5 text-[12px]">
          {(["datum", "beliebtheit", "preis"] as Sort[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-3 py-1.5 rounded-full transition-colors capitalize ${
                sort === s ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {sorted.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4) }}
          >
            <EventCard event={e} variant="horizontal" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// GRID (BENTO MIX) VIEW
// ─────────────────────────────────────────────────────────────

export function GridView({ events }: { events: EventX[] }) {
  return (
    <section className="container-editorial py-8">
      <h2 className="font-display text-2xl md:text-3xl mb-5">
        Grid · {events.length} Events
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {events.map((e, i) => {
          const isFeatured = i % 7 === 0 && i > 0;
          return (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.025, 0.3) }}
              className={isFeatured ? "col-span-2 row-span-2" : ""}
            >
              <EventCard event={e} variant={isFeatured ? "default" : "compact"} showCross={!isFeatured} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// KALENDER VIEW (Monats-Grid)
// ─────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
const WEEKDAY = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function isoOfDay(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function weekdayMon0(d: Date) {
  return (d.getDay() + 6) % 7;
}

export function KalenderView({ events }: { events: EventX[] }) {
  const [cursor, setCursor] = useState({
    y: TODAY_DATE.getFullYear(),
    m: TODAY_DATE.getMonth() + 1,
  });
  const [selected, setSelected] = useState<string | null>(null);

  const cells = useMemo(() => {
    const firstOfMonth = new Date(cursor.y, cursor.m - 1, 1);
    const startOffset = weekdayMon0(firstOfMonth);
    const daysInMonth = new Date(cursor.y, cursor.m, 0).getDate();
    const total = Math.ceil((startOffset + daysInMonth) / 7) * 7;
    return Array.from({ length: total }, (_, i) => {
      const dayNum = i - startOffset + 1;
      const inMonth = dayNum >= 1 && dayNum <= daysInMonth;
      const d = new Date(cursor.y, cursor.m - 1, dayNum);
      return { d, iso: isoOfDay(d), inMonth };
    });
  }, [cursor]);

  const move = (delta: number) => {
    setCursor(({ y, m }) => {
      let nm = m + delta;
      let ny = y;
      while (nm < 1) { nm += 12; ny -= 1; }
      while (nm > 12) { nm -= 12; ny += 1; }
      return { y: ny, m: nm };
    });
    setSelected(null);
  };

  const selectedEvents = selected
    ? events.filter((e) => selected >= e.startDatum && selected <= (e.endDatum ?? e.startDatum))
    : [];

  return (
    <section className="container-editorial py-8">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <h2 className="font-display text-3xl md:text-4xl">
          {MONTH_NAMES[cursor.m - 1]} {cursor.y}
        </h2>
        <div className="flex gap-2">
          <button onClick={() => move(-1)} className="w-9 h-9 grid place-items-center rounded-full border border-line bg-card hover:border-burgundy">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => move(1)} className="w-9 h-9 grid place-items-center rounded-full border border-line bg-card hover:border-burgundy">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-line border border-line rounded-2xl overflow-hidden">
        {WEEKDAY.map((w) => (
          <div key={w} className="bg-paper-dim py-2 text-center text-[10.5px] uppercase tracking-wider text-ink-faint">
            {w}
          </div>
        ))}
        {cells.map(({ d, iso, inMonth }) => {
          const dayEvents = events.filter((e) => iso >= e.startDatum && iso <= (e.endDatum ?? e.startDatum));
          const isToday = iso === TODAY_ISO;
          const isSelected = selected === iso;
          const isWeekend = weekdayMon0(d) >= 5;
          return (
            <button
              key={iso + (inMonth ? "" : "-out")}
              onClick={() => inMonth && setSelected(iso)}
              disabled={!inMonth}
              className={`text-left p-2 min-h-[84px] md:min-h-[110px] transition-colors relative ${
                !inMonth
                  ? "bg-paper opacity-25 cursor-default"
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
              <div className="flex gap-0.5 mt-1.5 flex-wrap">
                {dayEvents.slice(0, 4).map((e) => (
                  <span
                    key={e.id}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: KATEGORIE_COLOR[e.kategorie] }}
                  />
                ))}
                {dayEvents.length > 4 && (
                  <span className={`text-[9px] ${isSelected ? "text-paper-dim" : "text-ink-faint"}`}>+{dayEvents.length - 4}</span>
                )}
              </div>
              <div className="mt-1 space-y-0.5">
                {dayEvents.slice(0, 2).map((e) => (
                  <div
                    key={e.id}
                    className={`text-[9.5px] truncate rounded px-1 py-0.5 ${isSelected ? "bg-paper/15" : ""}`}
                    style={{
                      background: isSelected ? undefined : `${KATEGORIE_COLOR[e.kategorie]}22`,
                      color: isSelected ? "var(--color-paper-dim)" : KATEGORIE_COLOR[e.kategorie],
                    }}
                  >
                    {e.titel}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <DayPanel
          iso={selected}
          events={selectedEvents}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

function DayPanel({
  iso,
  events,
  onClose,
}: {
  iso: string;
  events: EventX[];
  onClose: () => void;
}) {
  const d = new Date(iso + "T08:00:00+02:00");
  const label = d.toLocaleDateString("de-CH", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="fixed inset-0 z-40 flex items-stretch justify-end pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md bg-paper border-l border-line shadow-modal overflow-y-auto pointer-events-auto"
      >
        <header className="sticky top-0 bg-paper/95 backdrop-blur border-b border-line px-5 py-4 flex items-start justify-between">
          <div>
            <p className="eyebrow">Tag</p>
            <h3 className="font-display text-2xl mt-1 leading-tight">{label}</h3>
            <p className="text-[12px] text-ink-muted mt-1">
              {events.length} {events.length === 1 ? "Event" : "Events"}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-paper-dim" aria-label="Schliessen">
            <X className="w-4 h-4" />
          </button>
        </header>
        <div className="p-5 space-y-3">
          {events.length === 0 ? (
            <p className="text-[13px] text-ink-muted">An diesem Tag passiert nichts mit deinen Filtern.</p>
          ) : (
            events.map((e) => <EventCard key={e.id} event={e} variant="horizontal" />)
          )}
        </div>
      </motion.aside>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// KARTE VIEW — simple SVG-based map of Zürich without external lib
// ─────────────────────────────────────────────────────────────

const MAP_BOUNDS = { latMin: 47.34, latMax: 47.42, lngMin: 8.47, lngMax: 8.61 };

function project(lat: number, lng: number, w: number, h: number) {
  const x = ((lng - MAP_BOUNDS.lngMin) / (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin)) * w;
  const y = h - ((lat - MAP_BOUNDS.latMin) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)) * h;
  return { x, y };
}

export function KarteView({ events }: { events: EventX[] }) {
  const [active, setActive] = useState<EventX | null>(null);
  const { push } = useToast();

  return (
    <section className="container-editorial py-8">
      <div className="flex items-end justify-between mb-5">
        <h2 className="font-display text-2xl md:text-3xl">Karte · {events.length} Pins</h2>
        <p className="text-[11.5px] text-ink-faint">Approximative Stadtkarte — Demo</p>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-line bg-paper-dim aspect-[16/10]">
        <svg viewBox="0 0 1000 625" className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="zh-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c5d0e2" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="zh-lake" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7ba9d9" />
              <stop offset="100%" stopColor="#5a86b5" />
            </linearGradient>
          </defs>
          <rect width="1000" height="625" fill="url(#zh-grid)" />
          {/* Limmat */}
          <path
            d="M 380 0 C 400 120, 440 220, 460 340 C 470 420, 500 500, 540 625"
            stroke="#7ba9d9" strokeWidth="14" fill="none" opacity="0.55" strokeLinecap="round"
          />
          {/* Lake */}
          <path d="M 540 625 C 650 600, 750 580, 850 540 L 1000 540 L 1000 625 Z" fill="url(#zh-lake)" opacity="0.7" />
          {/* Sihl */}
          <path d="M 250 625 C 320 480, 380 380, 450 300" stroke="#a3c0d8" strokeWidth="6" fill="none" opacity="0.4" />
          {/* Label */}
          <text x="50" y="50" fontSize="14" fill="#94a0b8" fontFamily="var(--font-display)">Zürich</text>
          <text x="900" y="600" fontSize="11" fill="#5a86b5" fontFamily="var(--font-body)" textAnchor="end">Zürichsee</text>

          {/* Pins */}
          {events.map((e) => {
            const { x, y } = project(e.ort.lat, e.ort.lng, 1000, 625);
            const color = KATEGORIE_COLOR[e.kategorie];
            return (
              <g
                key={e.id}
                transform={`translate(${x},${y})`}
                onClick={() => setActive(e)}
                className="cursor-pointer"
              >
                <circle r="14" fill={color} opacity="0.18" />
                <circle r="7" fill={color} stroke="#fff" strokeWidth="2" />
              </g>
            );
          })}

          {/* Active pin */}
          {active && (() => {
            const { x, y } = project(active.ort.lat, active.ort.lng, 1000, 625);
            return <circle cx={x} cy={y} r="12" fill="none" stroke="#0f4da8" strokeWidth="2" className="zb-pulse" />;
          })()}
        </svg>

        {active && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm bg-paper rounded-2xl border border-line shadow-card overflow-hidden"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-2 right-2 w-7 h-7 grid place-items-center rounded-full bg-paper/95 backdrop-blur border border-line"
              aria-label="Schliessen"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex">
              <div className="relative w-24 shrink-0 bg-paper-dim">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.bilder[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-3 min-w-0">
                <p className="eyebrow truncate">{KATEGORIE_LABEL[active.kategorie]}</p>
                <p className="font-display text-[15px] leading-tight mt-1 line-clamp-2">{active.titel}</p>
                <p className="text-[11px] text-ink-muted mt-1 inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {active.ort.name}
                </p>
                <div className="flex gap-2 mt-2">
                  <Link
                    href={`/entdecken/event/${active.slug}`}
                    className="text-[11.5px] text-burgundy hover:underline"
                  >
                    Mehr Info →
                  </Link>
                  <button
                    onClick={() => push(`${active.titel} gemerkt`, "success")}
                    className="text-[11.5px] text-ink-muted hover:text-ink"
                  >
                    Bookmark
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 text-[11px]">
        {Array.from(new Set(events.map((e) => e.kategorie))).map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: KATEGORIE_COLOR[k] }} />
            {KATEGORIE_LABEL[k]}
          </span>
        ))}
      </div>
    </section>
  );
}
