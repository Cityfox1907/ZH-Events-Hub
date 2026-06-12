"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CalendarPlus,
  CheckCircle2,
  Clock,
  MapPin,
  Share2,
  Sparkles,
  Star,
  Ticket,
  Users,
  X,
} from "lucide-react";
import {
  findEventBySlug,
  EVENTS,
  KATEGORIE_COLOR,
  KATEGORIE_LABEL,
  STIMMUNG_LABEL,
  formatDateRange,
} from "@/lib/eventkalender";
import { EventCard } from "@/components/kalender/EventCard";
import { useToast } from "@/components/Toast";

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const event = findEventBySlug(slug);
  if (!event) notFound();
  return <EventInner event={event} />;
}

function EventInner({ event }: { event: NonNullable<ReturnType<typeof findEventBySlug>> }) {
  const router = useRouter();
  const { push } = useToast();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  const similar = useMemo(
    () =>
      EVENTS
        .filter(
          (e) =>
            e.id !== event.id &&
            (e.kategorie === event.kategorie || e.ort.stadtteil === event.ort.stadtteil),
        )
        .slice(0, 6),
    [event],
  );

  const color = KATEGORIE_COLOR[event.kategorie];

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative w-full h-[60vh] md:h-[68vh] overflow-hidden bg-ink text-paper -mt-[110px] pt-[110px]">
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.bilder[0]}
            alt={event.titel}
            className="absolute inset-0 w-full h-full object-cover zb-kenburns"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/85" />

        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-paper/10 backdrop-blur border border-paper/30 text-paper text-[12px] hover:bg-paper/20 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Zurück
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => push("Link kopiert (Demo)", "success")}
              className="w-9 h-9 grid place-items-center rounded-full bg-paper/10 backdrop-blur border border-paper/30 text-paper hover:bg-paper/20 transition-colors"
              aria-label="Teilen"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => push(`${event.titel} gemerkt`, "success")}
              className="w-9 h-9 grid place-items-center rounded-full bg-paper/10 backdrop-blur border border-paper/30 text-paper hover:bg-paper/20 transition-colors"
              aria-label="Bookmark"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative h-full container-editorial flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl bg-paper/12 backdrop-blur border border-paper/25 px-5 py-4 self-start max-w-md"
          >
            <p className="eyebrow text-paper-dim">{KATEGORIE_LABEL[event.kategorie]}</p>
            <p className="font-display text-[15px] mt-1 leading-tight">
              {formatDateRange(event)}
              {event.zeitStart ? ` · ${event.zeitStart} Uhr` : ""}
            </p>
            <p className="text-[12px] text-paper-dim mt-1 inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {event.ort.name}
            </p>
          </motion.div>
        </div>
      </section>

      {/* TITLE */}
      <section className="container-editorial pt-10">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-paper text-[10.5px] font-medium uppercase tracking-wider"
            style={{ background: color }}
          >
            {KATEGORIE_LABEL[event.kategorie]}
          </span>
          {event.klassiker && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-burgundy text-paper text-[10.5px] font-medium uppercase tracking-wider">
              <Star className="w-3 h-3 fill-paper" />
              Klassiker
            </span>
          )}
          {event.stimmung.slice(0, 4).map((s) => (
            <span key={s} className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-paper-dim text-ink-muted text-[10.5px]">
              {STIMMUNG_LABEL[s]}
            </span>
          ))}
        </div>
        <h1 className="font-display text-4xl md:text-6xl mt-4 leading-[0.95] tracking-tight">
          {event.titel}
        </h1>
        {event.untertitel && (
          <p className="font-display italic text-[16px] md:text-[19px] text-ink-muted mt-3 max-w-2xl">
            {event.untertitel}
          </p>
        )}
        <p className="text-[13px] text-ink-faint mt-3 inline-flex items-center gap-1.5">
          Veranstaltet von <strong className="text-ink">{event.anbieter.name}</strong>
          {event.anbieter.verifikation === "wohnsitz" && (
            <span className="inline-flex items-center gap-0.5 text-burgundy">
              <CheckCircle2 className="w-3 h-3" /> Wohnsitz-verifiziert
            </span>
          )}
        </p>
      </section>

      {/* PRICE + STICKY CTA */}
      <PriceCTA event={event} />

      {/* BESCHREIBUNG */}
      <section className="container-editorial pt-10">
        <p className="eyebrow">Über das Event</p>
        <div className="mt-3 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4 text-[15px] leading-relaxed text-ink-muted">
            {event.beschreibung.map((p, i) => (
              <p key={i} className={i === 0 ? "first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-burgundy" : ""}>
                {p}
              </p>
            ))}
            {event.bilder[1] && (
              <div className="relative aspect-[16/9] my-4 rounded-2xl overflow-hidden bg-paper-dim">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={event.bilder[1]} alt="" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            )}
          </div>
          <aside>
            <p className="eyebrow mb-3">Was du erwarten kannst</p>
            <ul className="space-y-2 text-[13.5px]">
              {expectations(event).map((e, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-burgundy mt-1 shrink-0" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* GALERIE */}
      {event.bilder.length > 1 && (
        <section className="container-editorial pt-10">
          <p className="eyebrow">Galerie</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mt-3">
            {event.bilder.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightbox(src)}
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-paper-dim hover:opacity-90 transition-opacity group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ANBIETER */}
      <section className="container-editorial pt-12">
        <div className="rounded-2xl bg-card border border-line p-5 md:p-6 flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-paper-dim grid place-items-center shrink-0">
            <Users className="w-5 h-5 text-ink-muted" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="eyebrow">Anbieter</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="font-display text-xl leading-tight">{event.anbieter.name}</p>
              {event.anbieter.verifikation === "wohnsitz" && (
                <span className="inline-flex items-center gap-0.5 text-[10.5px] text-burgundy">
                  <CheckCircle2 className="w-3 h-3" /> Verifiziert
                </span>
              )}
            </div>
            <p className="text-[13px] text-ink-muted mt-2">
              Lokaler Anbieter mit langjähriger Erfahrung in Zürich. Alle Veranstaltungen werden persönlich kuratiert.
            </p>
            <p className="text-[12px] mt-2 text-burgundy hover:underline cursor-pointer">
              Zum Anbieter-Profil →
            </p>
          </div>
        </div>
      </section>

      {/* CROSS-MODULE */}
      <CrossModuleSection event={event} />

      {/* SIMILAR EVENTS */}
      <section className="pt-12">
        <div className="container-editorial mb-5">
          <h2 className="font-display text-2xl md:text-3xl">Ähnliche Events</h2>
        </div>
        <div
          className="flex gap-4 overflow-x-auto scrollbar-thin scroll-smooth pb-4 px-5 md:px-8 -mx-5 md:mx-0"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {similar.map((e) => (
            <div key={e.id} className="shrink-0" style={{ width: "min(75vw, 280px)", scrollSnapAlign: "start" }}>
              <EventCard event={e} showCross={false} />
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section className="container-editorial py-12">
        <p className="eyebrow mb-2">Ort</p>
        <h3 className="font-display text-2xl mb-4">{event.ort.name}</h3>
        <MiniMap event={event} />
        <a
          href={`https://www.google.com/maps?q=${event.ort.lat},${event.ort.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-[12.5px] text-burgundy hover:underline"
        >
          Wegbeschreibung öffnen <ArrowRight className="w-3 h-3" />
        </a>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full bg-paper/15 backdrop-blur border border-paper/30 text-paper"
            aria-label="Schliessen"
          >
            <X className="w-5 h-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="" className="max-w-[92vw] max-h-[88vh] rounded-2xl object-contain" />
        </div>
      )}
    </>
  );
}

function PriceCTA({ event }: { event: NonNullable<ReturnType<typeof findEventBySlug>> }) {
  const { push } = useToast();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const buttonLabel =
    event.preis.einheit === "gratis" ? "Anmelden (Gratis)" : "Reservation / Ticket";

  return (
    <>
      <section className="container-editorial pt-8">
        <div className="rounded-2xl border border-line bg-card p-5 md:p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="eyebrow">Preis</p>
            <p className="font-display text-3xl md:text-4xl tabular-nums mt-1">
              {event.preis.einheit === "gratis"
                ? "Gratis"
                : event.preis.max
                  ? `CHF ${event.preis.min}–${event.preis.max}`
                  : `CHF ${event.preis.min}`}
            </p>
            <p className="text-[12px] text-ink-muted mt-1">{event.preis.label}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => push(`${event.titel} reserviert (Demo)`, "success")}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink text-paper text-[13.5px] font-medium hover:bg-burgundy transition-colors"
            >
              <Ticket className="w-4 h-4" />
              {buttonLabel}
            </button>
            <button
              onClick={() => push("Im Kalender (Demo)", "success")}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-line bg-card text-ink text-[13.5px] font-medium hover:border-burgundy transition-colors"
            >
              <CalendarPlus className="w-4 h-4" />
              In meinen Kalender
            </button>
          </div>
        </div>
      </section>

      <motion.div
        initial={false}
        animate={{ y: sticky ? 0 : 100, opacity: sticky ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[420px] z-40 rounded-2xl bg-card border border-line shadow-modal p-3 flex items-center justify-between gap-3"
      >
        <div className="min-w-0">
          <p className="font-display text-[14px] truncate">{event.titel}</p>
          <p className="text-[11px] text-ink-muted truncate">
            {event.preis.einheit === "gratis" ? "Gratis" : `ab CHF ${event.preis.min}`} · {formatDateRange(event)}
          </p>
        </div>
        <button
          onClick={() => push(`${event.titel} reserviert (Demo)`, "success")}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-ink text-paper text-[12px] font-medium shrink-0"
        >
          <Ticket className="w-3.5 h-3.5" />
          {event.preis.einheit === "gratis" ? "Anmelden" : "Ticket"}
        </button>
      </motion.div>
    </>
  );
}

function CrossModuleSection({ event }: { event: NonNullable<ReturnType<typeof findEventBySlug>> }) {
  const items = [
    {
      key: "tickets",
      label: "Tickets im Tausch verfügbar",
      cta: "Zum Tausch-Markt",
      count: event.cross.tickets,
      href: "/markt?vertical=tickets",
      Icon: Ticket,
    },
    {
      key: "bars",
      label: "Bars in der Nähe",
      cta: "Bars entdecken",
      count: event.cross.bars,
      href: `/entdecken/orte?kategorie=bar&stadtteil=${event.ort.stadtteil.replace(/\s/g, "")}`,
      Icon: Sparkles,
    },
    {
      key: "posts",
      label: "Posts im Puls",
      cta: "Diskussion lesen",
      count: event.cross.posts,
      href: "/puls",
      Icon: Users,
    },
  ].filter((x) => x.count > 0);

  if (items.length === 0) return null;

  return (
    <section className="container-editorial pt-12">
      <p className="eyebrow">Cross-Module</p>
      <h2 className="font-display text-2xl md:text-3xl mt-1 mb-5">
        Was rund um dieses Event passiert
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(({ key, label, cta, count, href, Icon }) => (
          <Link
            key={key}
            href={href}
            className="group flex items-center gap-4 rounded-2xl bg-card border border-line p-4 hover:border-burgundy transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-burgundy/10 grid place-items-center shrink-0">
              <Icon className="w-5 h-5 text-burgundy" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-[16px] leading-tight">
                <strong className="tabular-nums">{count}</strong> {label}
              </p>
              <p className="text-[11.5px] text-ink-muted mt-1 inline-flex items-center gap-1">
                {cta} <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function MiniMap({ event }: { event: NonNullable<ReturnType<typeof findEventBySlug>> }) {
  const color = KATEGORIE_COLOR[event.kategorie];
  const cx = ((event.ort.lng - 8.47) / 0.14) * 1000;
  const cy = 625 - ((event.ort.lat - 47.34) / 0.08) * 625;
  return (
    <div className="relative rounded-2xl overflow-hidden border border-line bg-paper-dim aspect-[16/9]">
      <svg viewBox="0 0 1000 625" className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="zh-mini-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c5d0e2" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="1000" height="625" fill="url(#zh-mini-grid)" />
        <path
          d="M 380 0 C 400 120, 440 220, 460 340 C 470 420, 500 500, 540 625"
          stroke="#7ba9d9" strokeWidth="14" fill="none" opacity="0.55" strokeLinecap="round"
        />
        <path d="M 540 625 C 650 600, 750 580, 850 540 L 1000 540 L 1000 625 Z" fill="#7ba9d9" opacity="0.5" />
        <g transform={`translate(${cx},${cy})`}>
          <circle r="22" fill={color} opacity="0.2" className="zb-pulse" />
          <circle r="10" fill={color} stroke="#fff" strokeWidth="3" />
        </g>
        <text x={cx + 16} y={cy + 4} fontSize="14" fill="#0a1733" fontFamily="var(--font-display)">
          {event.ort.name}
        </text>
      </svg>
    </div>
  );
}

function expectations(event: NonNullable<ReturnType<typeof findEventBySlug>>) {
  const out: string[] = [];
  if (event.flags?.dateNight) out.push("Perfekt für einen Date-Abend zu zweit");
  if (event.flags?.kinderfreundlich) out.push("Kinderfreundlich — Familien willkommen");
  if (event.flags?.indoor) out.push("Indoor — wetterunabhängig");
  if (event.flags?.reservation) out.push("Reservation empfohlen");
  if (event.flags?.barDanach) out.push("Bar im Anschluss");
  if (event.flags?.rollstuhl) out.push("Rollstuhl-zugänglich");
  if (event.flags?.spontan) out.push("Auch spontan ohne Reservation möglich");
  if (out.length === 0) out.push("Ein vollständiges Erlebnis — von Anfang bis Ende kuratiert");
  return out.slice(0, 5);
}
