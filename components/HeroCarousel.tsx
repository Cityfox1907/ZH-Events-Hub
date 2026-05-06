"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowUp } from "lucide-react";
import type { ZhEvent } from "@/lib/types";
import { gradientFor } from "@/lib/gradients";
import { SizeBadge } from "./SizeBadge";
import { categoryLabel } from "@/lib/categories";
import { isPast } from "@/lib/events";
import { getReviewsForEvent } from "@/lib/reviews";
import { STORAGE_EVENT } from "@/lib/storage";

interface Props {
  events: ZhEvent[];
}

export function HeroCarousel({ events }: Props) {
  const slides = events.slice(0, 5);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length, paused]);

  useEffect(() => {
    const sync = () => setTick((t) => t + 1);
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, []);

  if (slides.length === 0) return null;
  const current = slides[idx];
  const gradient = gradientFor(current.id, current.category);
  const past = isPast(current);
  const reviews = getReviewsForEvent(current.id);
  const topReview = reviews[0];

  function go(delta: number) {
    setIdx((i) => (i + delta + slides.length) % slides.length);
  }

  return (
    <section
      className="relative overflow-hidden rounded-2xl"
      style={{ background: gradient.css }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="Karussell"
      data-tick={tick}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 70%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 60%), linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 50%)",
        }}
        aria-hidden
      />

      <Link
        href={`/event/${current.slug}`}
        className="block relative aspect-[16/10] sm:aspect-[16/8] md:aspect-[16/7] focus:outline-none"
        aria-label={`Zum Event: ${current.title}`}
      >
        {current.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={current.imageUrl}
            src={current.imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 70%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 60%), linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute top-5 left-5 md:top-7 md:left-8 flex items-center gap-2 z-[1]">
          {past ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brass/85 text-ink text-[10px] font-medium uppercase tracking-[0.18em]">
              Aftermath
            </span>
          ) : null}
          <SizeBadge size={current.size} />
        </div>

        <div className="absolute left-5 right-5 md:left-10 md:right-10 bottom-14 md:bottom-20 max-w-3xl">
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-paper/70 mb-3">
            {past ? "Letzte Woche" : categoryLabel(current.category)} · {current.venue}
          </div>
          <h2 className="font-display text-[32px] sm:text-[44px] md:text-[60px] leading-[1.02] text-paper tracking-[-0.02em]">
            {current.title}
          </h2>
          {current.subtitle ? (
            <p className="mt-2 text-[14px] md:text-[16px] text-paper/75 max-w-xl">
              {past ? `Letzte Woche — ${current.subtitle}` : current.subtitle}
            </p>
          ) : null}

          {topReview ? (
            <div className="mt-5 max-w-xl rounded-md border-l-2 border-brass/80 bg-black/20 backdrop-blur-sm p-3 pl-4">
              <p className="font-display italic text-[14px] md:text-[15px] text-paper/95 leading-snug">
                «{topReview.text}»
              </p>
              <div className="mt-1.5 flex items-center gap-2 text-[11px] text-paper/65">
                <span>{topReview.authorName}</span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" strokeWidth={2} />
                  {topReview.rating * 8 + 16}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </Link>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Vorheriges"
            onClick={() => go(-1)}
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/30 hover:bg-black/50 text-paper flex items-center justify-center backdrop-blur-sm transition-colors z-[2]"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Nächstes"
            onClick={() => go(1)}
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/30 hover:bg-black/50 text-paper flex items-center justify-center backdrop-blur-sm transition-colors z-[2]"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
          </button>

          <div className="absolute bottom-5 right-5 md:bottom-6 md:right-8 flex items-center gap-1.5 z-[2]">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Slide ${i + 1} von ${slides.length}`}
                aria-current={i === idx ? "true" : undefined}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? "w-7 bg-paper" : "w-1.5 bg-paper/40 hover:bg-paper/60"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
