"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import type { ZhEvent } from "@/lib/types";
import { SizeBadge } from "./SizeBadge";
import { CategoryBadge } from "./CategoryBadge";
import { gradientFor } from "@/lib/gradients";
import { formatTime, formatDateShort, formatChf } from "@/lib/format";
import { goingCount, pseudoBaseCount } from "@/lib/going";
import { averageRating, getReviewsForEvent } from "@/lib/reviews";
import { getPhotosForEvent } from "@/lib/photos";
import { categoryLabel } from "@/lib/categories";
import { STORAGE_EVENT } from "@/lib/storage";

interface Props {
  event: ZhEvent;
  variant?: "default" | "compact" | "aftermath";
  index?: number;
}

const SIZE_BASE: Record<ZhEvent["size"], number> = {
  mega: 4800,
  major: 1400,
  mid: 540,
  intimate: 180,
};

export function EventCard({ event, variant = "default", index = 0 }: Props) {
  const gradient = gradientFor(event.id, event.category);
  const baseMax = SIZE_BASE[event.size];
  const [going, setGoing] = useState(() => pseudoBaseCount(event.id, baseMax));
  const [rating, setRating] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [photoCount, setPhotoCount] = useState(0);

  useEffect(() => {
    const sync = () => {
      setGoing(goingCount(event.id, baseMax));
      setRating(averageRating(event.id));
      setReviewCount(getReviewsForEvent(event.id).length);
      setPhotoCount(getPhotosForEvent(event.id).length);
    };
    sync();
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, [event.id, baseMax]);

  const aspect = variant === "aftermath" ? "aspect-[16/9]" : "aspect-square";
  const animationDelay = `${Math.min(index * 60, 600)}ms`;

  return (
    <Link
      href={`/event/${event.slug}`}
      className="group block stagger-fade-up focus:outline-none"
      style={{ animationDelay }}
    >
      <article className="relative overflow-hidden rounded-lg bg-card border border-line card-shadow transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[2px] group-hover:shadow-[0_4px_16px_rgba(28,25,23,0.08),0_0_0_1px_rgba(28,25,23,0.06)]">
        <div
          className={`relative ${aspect} w-full`}
          style={{ background: gradient.css }}
          aria-label={`Visual für ${event.title}`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.5)_0%,transparent_60%)]" aria-hidden />
          <div className="absolute top-3 left-3 z-[1]">
            <SizeBadge size={event.size} />
          </div>
          {variant === "aftermath" && rating !== null ? (
            <div className="absolute top-3 right-3 z-[1] inline-flex items-center gap-1 px-2 py-1 rounded-full bg-paper/95 text-ink text-[11px] font-medium">
              <Star className="w-3 h-3 fill-burgundy text-burgundy" strokeWidth={1.5} />
              {rating.toFixed(1)}
            </div>
          ) : null}
          <div className="absolute bottom-3 right-3 z-[1] text-right">
            <div className="font-display text-[28px] text-paper leading-none tabular-nums">
              {formatTime(event.startDateTime)}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-paper/70">
              {formatDateShort(event.startDateTime)}
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-2">
          <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-ink-faint truncate">
            {categoryLabel(event.category)} · {event.venue} · {event.neighborhood}
          </div>
          <h3 className="font-display text-[22px] leading-[1.15] text-ink tracking-[-0.02em]">
            {event.title}
          </h3>
          {event.subtitle ? (
            <p className="text-[14px] text-ink-muted leading-snug truncate">{event.subtitle}</p>
          ) : null}
          <div className="mt-1 pt-3 border-t border-line flex items-center justify-between text-[12px] text-ink-muted">
            <span>
              {variant === "aftermath" ? (
                <>
                  {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
                  {photoCount > 0 ? ` · ${photoCount} ${photoCount === 1 ? "Foto" : "Fotos"}` : ""}
                </>
              ) : (
                <>{going.toLocaleString("de-CH").replace(/,/g, "'")} gehen hin</>
              )}
            </span>
            <span>
              {event.priceFromChf ? `ab ${formatChf(event.priceFromChf)}` : "Eintritt frei"}
            </span>
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none ring-0 ring-burgundy/0 group-focus-visible:ring-2 group-focus-visible:ring-burgundy rounded-lg transition"
          aria-hidden
        />
      </article>
      <CategoryBadge category={event.category} className="sr-only" />
    </Link>
  );
}

interface CompactProps {
  event: ZhEvent;
  index?: number;
}

export function CompactEventCard({ event, index = 0 }: CompactProps) {
  const gradient = gradientFor(event.id, event.category);
  const animationDelay = `${Math.min(index * 60, 600)}ms`;

  return (
    <Link
      href={`/event/${event.slug}`}
      className="group block stagger-fade-up"
      style={{ animationDelay }}
    >
      <div className="flex items-center gap-4 py-4 border-b border-line transition-colors duration-200 group-hover:bg-paper-dim/40 px-3 -mx-3 rounded-md">
        <div
          className="w-14 h-14 rounded-md shrink-0"
          style={{ background: gradient.css }}
          aria-hidden
        />
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-ink-faint truncate">
            {categoryLabel(event.category)} · {event.venue}
          </div>
          <div className="font-display text-[20px] leading-[1.2] text-ink tracking-[-0.02em] truncate">
            {event.title}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-display text-[22px] leading-none tabular-nums text-ink">
            {formatTime(event.startDateTime)}
          </div>
          <div className="mt-1 text-[12px] text-ink-muted">
            {formatDateShort(event.startDateTime)}
          </div>
        </div>
      </div>
    </Link>
  );
}
