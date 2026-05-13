"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, CalendarPlus, Pause } from "lucide-react";
import {
  HERO_SLIDES,
  TODAY_ISO,
  daysBetween,
  formatDateRange,
} from "@/lib/eventkalender";
import { useToast } from "@/components/Toast";

const ROTATE_MS = 8000;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const swipeStart = useRef<number | null>(null);
  const { push } = useToast();

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, ROTATE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slide = HERO_SLIDES[index];
  const days = daysBetween(TODAY_ISO, slide.startDatum);
  const parallax = Math.min(scrollY * 0.4, 220);
  const textShift = Math.min(scrollY * 0.2, 80);

  const handleSwipeStart = (clientX: number) => {
    swipeStart.current = clientX;
    setPaused(true);
  };
  const handleSwipeEnd = (clientX: number) => {
    if (swipeStart.current === null) return;
    const delta = clientX - swipeStart.current;
    if (Math.abs(delta) > 60) {
      setIndex((i) =>
        delta < 0
          ? (i + 1) % HERO_SLIDES.length
          : (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
      );
    }
    swipeStart.current = null;
    setTimeout(() => setPaused(false), 800);
  };

  return (
    <section
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-ink text-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => handleSwipeStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleSwipeEnd(e.changedTouches[0].clientX)}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translateY(${parallax}px)` }}
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.bilder[0]}
              alt={slide.titel}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,23,51,0.2) 0%, rgba(10,23,51,0.1) 40%, rgba(10,23,51,0.85) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="relative h-full container-editorial flex flex-col justify-end pb-14 md:pb-20"
        style={{ transform: `translateY(${-textShift}px)` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-text"}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="eyebrow text-paper-dim mb-3">Zürcher Klassiker</p>
            <h1 className="font-display text-[36px] sm:text-5xl md:text-[64px] leading-[0.95] tracking-tight">
              {slide.titel}
            </h1>
            <p className="text-[13px] md:text-[14px] mt-3 text-paper-dim">
              {formatDateRange(slide)} · {slide.ort.name}
            </p>
            <p className="font-display italic text-[15px] md:text-[18px] mt-1 text-paper-dim/90 max-w-2xl">
              {slide.untertitel}
            </p>
            <CountdownChip days={days} />

            <div className="flex flex-wrap gap-2 mt-6">
              <Link
                href={`/entdecken/event/${slide.slug}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-paper/10 backdrop-blur border border-paper/30 text-paper text-[13px] font-medium hover:bg-paper/20 transition-colors"
              >
                Mehr erfahren <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => push(`${slide.titel} in deinen Kalender (Demo)`, "success")}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-paper text-ink text-[13px] font-medium hover:bg-paper-dim transition-colors"
              >
                <CalendarPlus className="w-4 h-4" />
                In meinen Kalender
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation buttons */}
      <button
        onClick={() => setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="hidden md:flex absolute top-1/2 left-6 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-paper/10 backdrop-blur border border-paper/20 text-paper hover:bg-paper/20"
        aria-label="Vorheriger Klassiker"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setIndex((i) => (i + 1) % HERO_SLIDES.length)}
        className="hidden md:flex absolute top-1/2 right-6 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-paper/10 backdrop-blur border border-paper/20 text-paper hover:bg-paper/20"
        aria-label="Nächster Klassiker"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pause indicator */}
      {paused && (
        <div className="absolute top-6 right-6 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-paper/15 backdrop-blur border border-paper/20 text-paper text-[11px]">
          <Pause className="w-3 h-3" />
          Pausiert
        </div>
      )}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-10 bg-paper" : "w-1.5 bg-paper/40 hover:bg-paper/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function CountdownChip({ days }: { days: number }) {
  return (
    <motion.span
      key={days}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-paper/10 backdrop-blur border border-paper/30 text-paper text-[12px] tabular-nums"
    >
      noch <strong className="tabular-nums">{days}</strong> Tage
    </motion.span>
  );
}
