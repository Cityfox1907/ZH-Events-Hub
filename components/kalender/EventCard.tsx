"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin, Bookmark, Star, MessageCircle, Wine } from "lucide-react";
import {
  type EventX,
  KATEGORIE_LABEL,
  KATEGORIE_COLOR,
  formatDateRange,
} from "@/lib/eventkalender";
import { useToast } from "@/components/Toast";

interface Props {
  event: EventX;
  variant?: "default" | "compact" | "horizontal" | "tall" | "wide";
  showCross?: boolean;
}

export function EventCard({ event, variant = "default", showCross = true }: Props) {
  const { push } = useToast();
  const href = `/entdecken/event/${event.slug}`;
  const color = KATEGORIE_COLOR[event.kategorie];

  if (variant === "horizontal") {
    return (
      <Link
        href={href}
        className="group flex bg-card border border-line rounded-2xl overflow-hidden card-shadow card-shadow-hover transition-all"
      >
        <div className="relative w-32 sm:w-40 shrink-0 bg-paper-dim overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.bilder[0]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {event.klassiker && (
            <Star className="absolute top-2 left-2 w-4 h-4 text-burgundy fill-burgundy" />
          )}
        </div>
        <div className="flex-1 p-4 min-w-0">
          <p className="eyebrow truncate" style={{ color }}>
            {KATEGORIE_LABEL[event.kategorie]} · {event.ort.stadtteil}
          </p>
          <h4 className="font-display text-[17px] leading-tight mt-1 line-clamp-2">
            {event.titel}
          </h4>
          <p className="text-[12px] text-ink-muted mt-1">
            {event.zeitStart && <span>{event.zeitStart} · </span>}
            {formatDateRange(event)}
          </p>
          <p className="text-[12.5px] font-medium text-burgundy mt-1">
            {event.preis.label}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        href={href}
        className={`group block bg-card rounded-2xl overflow-hidden border border-line h-full card-shadow card-shadow-hover transition-shadow ${
          event.klassiker ? "border-l-2 border-l-burgundy" : ""
        }`}
      >
        <div
          className={`relative ${
            variant === "compact" ? "aspect-[5/4]" : "aspect-[4/5]"
          } overflow-hidden bg-paper-dim`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.bilder[0]}
            alt={event.titel}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent" />

          {event.zeitStart && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ink/85 backdrop-blur text-paper text-[10px] font-medium">
              <Clock className="w-3 h-3" /> {formatDateChip(event)}
            </span>
          )}
          <span
            className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur text-paper text-[10px] font-medium uppercase tracking-wider"
            style={{ background: color + "ee" }}
          >
            {KATEGORIE_LABEL[event.kategorie]}
          </span>

          {event.klassiker && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-burgundy text-paper text-[10px] font-medium uppercase tracking-wider">
              <Star className="w-3 h-3 fill-paper" />
              Klassiker
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              push(`${event.titel} gemerkt (Demo)`, "success");
            }}
            className="absolute bottom-3 right-3 p-1.5 rounded-full bg-paper/90 backdrop-blur hover:bg-paper transition-colors"
            aria-label="Bookmark"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="p-4">
          <p className="eyebrow" style={{ color }}>
            {KATEGORIE_LABEL[event.kategorie]} · {event.ort.stadtteil}
          </p>
          <h4 className="font-display text-lg leading-tight mt-1.5 line-clamp-2">
            {event.titel}
          </h4>
          <p className="text-[12px] text-ink-muted mt-2">{formatDateRange(event)}</p>
          <p className="text-[12.5px] font-medium mt-1">{event.preis.label}</p>
          {showCross && (
            <CrossModuleHint cross={event.cross} />
          )}
        </div>
      </Link>
    </motion.div>
  );
}

function formatDateChip(e: EventX): string {
  if (e.zeitStart && e.startDatum === "2026-05-13") return `Heute ${e.zeitStart}`;
  if (e.zeitStart && e.startDatum === "2026-05-14") return `Morgen ${e.zeitStart}`;
  const W = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const d = new Date(e.startDatum + "T08:00:00+02:00");
  return `${W[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}.${e.zeitStart ? " " + e.zeitStart : ""}`;
}

export function CrossModuleHint({
  cross,
}: {
  cross: { tickets: number; bars: number; posts: number; mitfahr: number };
}) {
  const parts: string[] = [];
  if (cross.posts > 0) parts.push(`${cross.posts} Posts`);
  if (cross.bars > 0) parts.push(`${cross.bars} Bars in der Nähe`);
  if (cross.tickets > 0) parts.push(`${cross.tickets} Tickets`);
  if (parts.length === 0) return null;
  return (
    <p className="text-[10.5px] text-ink-faint mt-2 flex items-center gap-1.5">
      <MessageCircle className="w-3 h-3" />
      {parts.slice(0, 2).join(" · ")} →
    </p>
  );
}

export function MiniCrossHint({
  icon: Icon = Wine,
  label,
  count,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  count: number;
}) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted">
      <Icon className="w-3 h-3" />
      <strong className="text-ink">{count}</strong> {label}
    </span>
  );
}

// Re-export for places that need just the marker
export function ClassicMarker() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-burgundy text-paper text-[10px] font-medium uppercase tracking-wider">
      <Star className="w-3 h-3 fill-paper" />
      Klassiker
    </span>
  );
}

export function MapPinSmall() {
  return <MapPin className="w-3 h-3" />;
}
