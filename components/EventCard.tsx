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

  const aspect = variant === "aftermath" ? "aspect-[4/3]" : "aspect-[3/2]";
  const animationDelay = `${Math.min(index * 60, 600)}ms`;

  return (
    <Link
      href={`/event/${event.slug}`}
      className="group block stagger-fade-up focus:outline-none"
      style={{ animationDelay }}
    >
      <article
        className="relative overflow-hidden rounded-md bg-card border border-line card-shadow transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[2px] group-hover:shadow-[0_4px_16px_rgba(28,25,23,0.08),0_0_0_1px_rgba(28,25,23,0.06)]"
      >
        <div
          className={`relative ${aspect} w-full`}
          style={{ background: gradient.css, color: gradient.ink }}
          aria-label={`Visual für ${event.title}`}
        >
          <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <SizeBadge size={event.size} />
              {variant === "aftermath" && rating !== null ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-sm bg-card/95 text-ink text-[11px] font-medium">
                  <Star className="w-3 h-3 fill-burgundy text-burgundy" strokeWidth={1.5} />
                  {rating.toFixed(1)}
                </span>
              ) : null}
            </div>

            <div className="flex items-end justify-between gap-3">
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">
                {formatDateShort(event.startDateTime)}
              </div>
              <div className="font-display text-2xl md:text-[28px] leading-none tabular-nums">
                {formatTime(event.startDateTime)}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="eyebrow mb-3 truncate">
            {categoryLabel(event.category)} · {event.venue} · {event.neighborhood}
          </div>
          <h3 className="font-display text-[22px] md:text-[24px] leading-[1.1] text-ink">
            {event.title}
          </h3>
          {event.subtitle ? (
            <p className="mt-2 text-[14px] text-ink-muted leading-snug line-clamp-2">{event.subtitle}</p>
          ) : null}

          <div className="mt-5 pt-4 border-t border-line flex items-center justify-between text-[12px] text-ink-muted">
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
            <span className="text-ink-faint">
              {event.priceFromChf ? `ab ${formatChf(event.priceFromChf)}` : "Eintritt frei"}
            </span>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none ring-0 ring-burgundy/0 group-focus-visible:ring-2 group-focus-visible:ring-burgundy rounded-md transition" aria-hidden />
      </article>
      <CategoryBadge category={event.category} className="sr-only" />
    </Link>
  );
}
