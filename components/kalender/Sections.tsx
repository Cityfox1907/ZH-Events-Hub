"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CloudRain,
  Sun,
  Snowflake,
  ChevronLeft,
  ChevronRight,
  PenTool,
  Sparkles,
  X,
  Clock,
  Star,
} from "lucide-react";
import {
  BENTO_PICKS,
  HORIZONTAL_ROWS,
  EDITORIAL_STORIES,
  eventsInRow,
  EVENTS,
  TODAY_ISO,
  daysBetween,
  formatDateRange,
  KATEGORIE_LABEL,
  type EventX,
} from "@/lib/eventkalender";
import { EventCard } from "./EventCard";

// ─────────────────────────────────────────────────────────────
// AI SMART SUGGESTION
// ─────────────────────────────────────────────────────────────

type Weather = "regen" | "sonne" | "kalt";

export function AISuggestion() {
  const [weather, setWeather] = useState<Weather>("regen");

  const suggestions: Record<Weather, { headline: string; events: EventX[]; Icon: React.ComponentType<{ className?: string }> }> = {
    regen: {
      headline: "Es regnet seit 14:00 — hier 3 Indoor-Empfehlungen für deinen Abend.",
      events: EVENTS.filter((e) =>
        ["klang-und-kerzenschein-vivaldi", "van-gogh-immersive", "jazzclub-moods-trio"].includes(e.slug),
      ),
      Icon: CloudRain,
    },
    sonne: {
      headline: "Strahlend sonnig — drei Outdoor-Highlights für deinen Tag.",
      events: EVENTS.filter((e) =>
        ["frauenbadi-saisonstart", "lindenhof-sonnenuntergang", "clouds-rooftop-sonnenuntergang"].includes(e.slug),
      ),
      Icon: Sun,
    },
    kalt: {
      headline: "12°C — drei kuschelige Indoor-Tipps für den Abend.",
      events: EVENTS.filter((e) =>
        ["klang-und-kerzenschein-vivaldi", "old-crow-geheim-konzert", "tonhalle-saisonkonzert"].includes(e.slug),
      ),
      Icon: Snowflake,
    },
  };

  const cur = suggestions[weather];
  const Icon = cur.Icon;

  return (
    <section className="container-editorial mt-5">
      <div className="rounded-2xl bg-gradient-to-br from-burgundy/8 via-paper-dim to-paper border border-burgundy/15 p-5 md:p-6">
        <div className="flex items-start gap-3 flex-wrap">
          <div className="w-10 h-10 rounded-full bg-burgundy/15 grid place-items-center shrink-0">
            <Icon className="w-5 h-5 text-burgundy" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="eyebrow text-burgundy">AI Smart Suggestion · Beta</p>
            <p className="font-display text-[18px] md:text-[22px] leading-snug mt-1">
              {cur.headline}
            </p>
          </div>
          <div className="inline-flex gap-1 rounded-full border border-line bg-card p-0.5 shrink-0">
            {(["regen", "sonne", "kalt"] as Weather[]).map((w) => (
              <button
                key={w}
                onClick={() => setWeather(w)}
                className={`text-[11px] px-2.5 py-1 rounded-full capitalize ${
                  weather === w ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {cur.events.map((e) => (
            <Link
              key={e.id}
              href={`/entdecken/event/${e.slug}`}
              className="group flex bg-card border border-line rounded-xl overflow-hidden hover:border-burgundy transition-colors"
            >
              <div className="relative w-20 shrink-0 bg-paper-dim overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={e.bilder[0]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 p-3 min-w-0">
                <p className="eyebrow truncate">{KATEGORIE_LABEL[e.kategorie]}</p>
                <p className="font-display text-[14px] leading-tight mt-1 line-clamp-2">{e.titel}</p>
                <p className="text-[11px] text-ink-muted mt-1">{e.zeitStart ?? ""} · {e.ort.stadtteil}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// BENTO GRID
// ─────────────────────────────────────────────────────────────

export function BentoGrid() {
  const sized = {
    large: BENTO_PICKS.filter((e) => e.editorialPick?.groesse === "large"),
    medium: BENTO_PICKS.filter((e) => e.editorialPick?.groesse === "medium"),
    small: BENTO_PICKS.filter((e) => e.editorialPick?.groesse === "small"),
  };

  return (
    <section className="container-editorial pt-12 pb-2">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
        <div>
          <p className="eyebrow flex items-center gap-1.5 mb-1">
            <PenTool className="w-3 h-3" />
            Redaktion
          </p>
          <h2 className="font-display text-3xl md:text-4xl">Diese Woche kuratiert</h2>
          <p className="text-[13px] text-ink-muted mt-1">
            Unsere Picks für die kommenden 7 Tage
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
        {sized.large.map((e, i) => (
          <BentoCard key={e.id} event={e} className="col-span-2 row-span-2" delay={i * 0.06} />
        ))}
        {sized.medium.map((e, i) => (
          <BentoCard key={e.id} event={e} className="col-span-2 row-span-1" delay={(sized.large.length + i) * 0.06} />
        ))}
        {sized.small.map((e, i) => (
          <BentoCard
            key={e.id}
            event={e}
            className="col-span-2 sm:col-span-1 row-span-1"
            delay={(sized.large.length + sized.medium.length + i) * 0.06}
            compact
          />
        ))}
      </div>
    </section>
  );
}

function BentoCard({
  event,
  className = "",
  delay = 0,
  compact = false,
}: {
  event: EventX;
  className?: string;
  delay?: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <Link
        href={`/entdecken/event/${event.slug}`}
        className="group relative block w-full h-full rounded-2xl overflow-hidden bg-ink text-paper"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.bilder[0]}
          alt={event.titel}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 transition-opacity"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,23,51,0.2) 0%, rgba(10,23,51,0.1) 40%, rgba(10,23,51,0.85) 100%)",
          }}
        />
        <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between">
          {event.editorialPick && (
            <span className="self-start inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-burgundy text-paper text-[10px] font-medium uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              {event.editorialPick.badge}
            </span>
          )}
          <div>
            <p className="text-[11px] text-paper-dim mb-1">
              {event.zeitStart && `${formatRelativeDate(event)} · `}{event.ort.name}
            </p>
            <h3
              className={`font-display leading-tight ${
                compact ? "text-[16px]" : "text-[20px] md:text-[26px]"
              }`}
            >
              {event.titel}
            </h3>
            {!compact && event.editorialPick && (
              <p className="font-display italic text-[12.5px] md:text-[13.5px] text-paper-dim mt-2 line-clamp-2">
                „{event.editorialPick.kommentar}"
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function formatRelativeDate(e: EventX): string {
  if (e.startDatum === "2026-05-13") return `Heute ${e.zeitStart ?? ""}`.trim();
  if (e.startDatum === "2026-05-14") return `Morgen ${e.zeitStart ?? ""}`.trim();
  return formatDateRange(e);
}

// ─────────────────────────────────────────────────────────────
// HORIZONTAL ROW
// ─────────────────────────────────────────────────────────────

export function HorizontalRow({
  rowKey,
  title,
  subtitle,
}: {
  rowKey: string;
  title: string;
  subtitle?: string;
}) {
  const events = eventsInRow(rowKey);
  const ref = useRef<HTMLDivElement | null>(null);

  if (events.length === 0) return null;

  const scrollBy = (delta: number) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="pt-10">
      <div className="container-editorial flex items-end justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
          {subtitle && <p className="text-[12.5px] text-ink-muted mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-340)}
            className="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-full border border-line bg-card hover:border-burgundy"
            aria-label="Zurück"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollBy(340)}
            className="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-full border border-line bg-card hover:border-burgundy"
            aria-label="Weiter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <Link
            href={`/entdecken/kalender?reihe=${rowKey}`}
            className="text-[12.5px] text-ink-muted hover:text-burgundy inline-flex items-center gap-1"
          >
            Alle anzeigen <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scrollbar-thin scroll-smooth pb-4 px-5 md:px-8 -mx-5 md:mx-0"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {events.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
            style={{
              width: "min(75vw, 280px)",
              scrollSnapAlign: "start",
            }}
          >
            <EventCard event={e} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function AllHorizontalRows() {
  return (
    <>
      {HORIZONTAL_ROWS.map((r) => (
        <HorizontalRow key={r.key} rowKey={r.key} title={r.title} subtitle={r.subtitle} />
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// SEASON SECTION — Pride Countdown
// ─────────────────────────────────────────────────────────────

export function SeasonSection() {
  const pride = EVENTS.find((e) => e.slug === "zurich-pride-2026")!;
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const target = new Date(pride.startDatum + "T12:00:00+02:00");
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  return (
    <section className="relative w-full overflow-hidden mt-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pride.bilder[0]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,23,51,0.92) 0%, rgba(146,73,144,0.6) 40%, rgba(231,100,57,0.45) 70%, rgba(244,196,48,0.5) 100%)",
        }}
      />
      <div className="relative container-editorial py-16 md:py-20 text-paper">
        <p className="eyebrow text-paper-dim">Bald</p>
        <h2 className="font-display text-4xl md:text-6xl mt-2 leading-tight">
          Zurich Pride 2026
        </h2>
        <p className="text-[14px] md:text-[16px] mt-3 text-paper/85 max-w-2xl">
          Vom 7.–13. Juni — das grösste Pride-Festival der Schweiz erwartet 50&apos;000+ Menschen.
        </p>

        <div className="mt-6 flex gap-3 md:gap-4">
          <Countdown unit="Tage" value={days} />
          <Countdown unit="Stunden" value={hours} />
          <Countdown unit="Min" value={minutes} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 max-w-3xl">
          {[
            "Die Pride-Parade 2026 — Route und Highlights",
            "Konzerte am Kasernenareal",
            "Was war 1994 anders?",
          ].map((label) => (
            <Link
              key={label}
              href={`/entdecken/event/${pride.slug}`}
              className="rounded-xl bg-paper/10 backdrop-blur border border-paper/25 p-4 hover:bg-paper/20 transition-colors"
            >
              <p className="font-display text-[15px] leading-tight">{label}</p>
              <p className="text-[11px] text-paper-dim mt-2 inline-flex items-center gap-1">
                Lesen <ArrowRight className="w-3 h-3" />
              </p>
            </Link>
          ))}
        </div>

        <Link
          href={`/entdecken/event/${pride.slug}`}
          className="inline-flex items-center gap-1.5 mt-6 px-5 py-2.5 rounded-full bg-paper text-ink text-[13px] font-medium hover:bg-paper-dim transition-colors"
        >
          Zur Pride-Story <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function Countdown({ value, unit }: { value: number; unit: string }) {
  return (
    <div className="rounded-2xl bg-paper/10 backdrop-blur border border-paper/30 px-4 md:px-6 py-3 md:py-4 min-w-[80px] md:min-w-[110px] text-center">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-display text-3xl md:text-5xl tabular-nums leading-none"
      >
        {value}
      </motion.div>
      <p className="text-[10.5px] uppercase tracking-wider text-paper-dim mt-1">{unit}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DISTRICT SPOTLIGHT
// ─────────────────────────────────────────────────────────────

export function DistrictSpotlight() {
  const events = EVENTS.filter((e) => e.reihen?.includes("stadtteil-kreis5")).slice(0, 6);
  if (events.length === 0) return null;
  return (
    <section className="container-editorial pt-14">
      <div className="flex items-end justify-between mb-5 flex-wrap gap-2">
        <div>
          <p className="eyebrow">Stadtteil-Spotlight</p>
          <h2 className="font-display text-3xl md:text-4xl">Diese Woche in Kreis 5</h2>
          <p className="text-[13px] text-ink-muted mt-1">
            Industrie-Quartier wird Kultur-Quartier — sechs Adressen, sechs Stimmungen.
          </p>
        </div>
        <Link
          href="/entdecken/orte?stadtteil=kreis5"
          className="text-[12.5px] text-ink-muted hover:text-burgundy inline-flex items-center gap-1"
        >
          Mehr im Kreis 5 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {events.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// EDITORIAL STORIES
// ─────────────────────────────────────────────────────────────

export function EditorialStoriesGrid() {
  const [open, setOpen] = useState<string | null>(null);
  const story = EDITORIAL_STORIES.find((s) => s.id === open) ?? null;

  return (
    <section className="container-editorial pt-16">
      <p className="eyebrow">Magazin</p>
      <h2 className="font-display text-3xl md:text-4xl mb-6">Geschichten aus Zürich</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {EDITORIAL_STORIES.map((s, i) => (
          <motion.button
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            onClick={() => setOpen(s.id)}
            className="group text-left bg-card border border-line rounded-2xl overflow-hidden card-shadow card-shadow-hover transition-shadow"
          >
            <div className="relative aspect-[5/3] overflow-hidden bg-paper-dim">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.bild}
                alt={s.titel}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5 md:p-6">
              <p className="eyebrow">Reportage · {s.minutes} Min Lesedauer</p>
              <h3 className="font-display text-2xl md:text-[28px] mt-2 leading-tight">{s.titel}</h3>
              <p className="font-display italic text-[14px] text-ink-muted mt-2">{s.excerpt}</p>
              <p className="text-[11.5px] text-ink-faint mt-3">Von {s.autor}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Read modal */}
      {story && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-stretch md:items-center justify-center p-0 md:p-6"
        >
          <div
            className="absolute inset-0"
            onClick={() => setOpen(null)}
          />
          <motion.article
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full md:max-w-2xl bg-paper md:rounded-3xl overflow-hidden shadow-modal max-h-[100dvh] md:max-h-[90vh] flex flex-col"
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 grid place-items-center rounded-full bg-paper/95 backdrop-blur border border-line"
              aria-label="Schliessen"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative aspect-[5/3] bg-paper-dim shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={story.bild} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="overflow-y-auto px-6 md:px-10 py-8">
              <p className="eyebrow">Reportage · {story.minutes} Min Lesedauer</p>
              <h3 className="font-display text-3xl md:text-4xl mt-2 leading-tight">{story.titel}</h3>
              <p className="text-[12px] text-ink-faint mt-2">Von {story.autor}</p>
              <hr className="my-5" />
              <div className="space-y-4 text-[15px] leading-relaxed text-ink-muted">
                {story.body.map((p, i) => (
                  <p key={i} className={i === 0 ? "first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-burgundy" : ""}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CTA — KLASSIKER REISE
// ─────────────────────────────────────────────────────────────

export function ClassicCTA() {
  const klassikerEvents = EVENTS.filter((e) => e.klassiker).slice(0, 6);
  return (
    <section className="relative w-full overflow-hidden mt-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={klassikerEvents[2]?.bilder[0] ?? ""}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink/95 via-ink/85 to-burgundy/70" />
      <div className="relative container-editorial py-16 md:py-24 text-paper">
        <p className="eyebrow text-paper-dim">Storytelling-Reise</p>
        <h2 className="font-display text-4xl md:text-6xl mt-3 leading-tight max-w-3xl">
          Das Zürcher Jahr in 24 Geschichten
        </h2>
        <p className="text-[15px] mt-4 max-w-xl text-paper-dim">
          Eine filmische Reise durch alle Klassiker der Stadt — vom Böögg-Bau im März bis zum Silvesterzauber an der Limmat.
        </p>
        <Link
          href="/entdecken/kalender/klassiker"
          className="inline-flex items-center gap-1.5 mt-6 px-6 py-3 rounded-full bg-paper text-ink text-[14px] font-medium hover:bg-paper-dim transition-colors"
        >
          Reise beginnen <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mt-10">
          {klassikerEvents.map((e) => (
            <Link
              key={e.id}
              href={`/entdecken/kalender/klassiker#k-${e.slug}`}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-paper-dim"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={e.bilder[0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <p className="absolute bottom-2 left-2 right-2 font-display text-[11.5px] md:text-[13px] leading-tight line-clamp-2">
                {e.titel}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────

export function SmartEmptyState({ onReset }: { onReset: () => void }) {
  const suggestions = EVENTS.filter((e) => e.editorialPick).slice(0, 3);
  return (
    <section className="container-editorial py-16">
      <div className="text-center">
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <Star className="w-10 h-10 text-burgundy" />
        </motion.div>
        <h3 className="font-display text-2xl md:text-3xl mt-4">Keine Treffer mit diesen Filtern</h3>
        <p className="text-[13.5px] text-ink-muted mt-2">
          Hier 3 Vorschläge mit gelockerten Kriterien:
        </p>
        <button
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink text-paper text-[13px] font-medium hover:bg-burgundy transition-colors"
        >
          Filter zurücksetzen
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {suggestions.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Helper used by AISuggestion / others
// ─────────────────────────────────────────────────────────────

export function daysToToday(iso: string): number {
  return daysBetween(TODAY_ISO, iso);
}

export function ClockChip({ time }: { time?: string }) {
  if (!time) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted">
      <Clock className="w-3 h-3" /> {time}
    </span>
  );
}
