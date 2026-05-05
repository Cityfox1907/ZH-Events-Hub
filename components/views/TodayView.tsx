"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getTodayEvents, getWeekEvents, getPastEvents, now } from "@/lib/events";
import { ensureSeedReviews } from "@/lib/reviews";
import { goingCount } from "@/lib/going";
import { STORAGE_EVENT } from "@/lib/storage";
import { FilterBar } from "@/components/FilterBar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { StatsBar } from "@/components/StatsBar";
import { EmptyState } from "@/components/EmptyState";
import { formatDateLong } from "@/lib/format";
import type { ZhEvent } from "@/lib/types";

const SIZE_BASE: Record<ZhEvent["size"], number> = {
  mega: 4800,
  major: 1400,
  mid: 540,
  intimate: 180,
};

export function TodayView() {
  const [today, setToday] = useState<ZhEvent[]>([]);
  const [featured, setFeatured] = useState<ZhEvent[]>([]);
  const [going, setGoing] = useState(0);
  const [eyebrow, setEyebrow] = useState("");

  useEffect(() => {
    ensureSeedReviews();
    const sync = () => {
      const ref = now();
      const t = getTodayEvents(ref);
      const week = getWeekEvents(ref);
      const past = getPastEvents(ref).slice(0, 2);
      const ids = new Set<string>();
      const featuredList: ZhEvent[] = [];
      [...past, ...t, ...week].forEach((e) => {
        if (!ids.has(e.id) && featuredList.length < 5) {
          ids.add(e.id);
          featuredList.push(e);
        }
      });
      const total = t.reduce((acc, e) => acc + goingCount(e.id, SIZE_BASE[e.size]), 0);
      setToday(t);
      setFeatured(featuredList);
      setGoing(total);
      setEyebrow(`${formatDateLong(ref.toISOString())}`);
    };
    sync();
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, []);

  return (
    <div className="px-5 md:px-8 pt-6 md:pt-8 pb-16 max-w-[1280px] mx-auto">
      {featured.length > 0 ? (
        <div className="mb-6">
          <HeroCarousel events={featured} />
        </div>
      ) : null}

      <div className="mb-10">
        <StatsBar goingCount={going} eventCount={today.length} />
      </div>

      <header className="flex items-baseline justify-between gap-6 mb-2">
        <h1 className="font-display text-[40px] leading-[1] md:text-[56px] md:leading-[1] tracking-[-0.02em] text-ink font-light">
          Heute Abend.
        </h1>
        <div className="hidden md:block text-[10px] uppercase tracking-[0.25em] text-ink-faint shrink-0">
          {eyebrow}
        </div>
      </header>
      <p className="md:hidden text-[10px] uppercase tracking-[0.25em] text-ink-faint mb-3">
        {eyebrow}
      </p>
      <p className="mt-2 mb-6 text-[15px] md:text-[16px] leading-relaxed text-ink-muted max-w-2xl">
        {today.length > 0
          ? `${today.length} kuratierte ${today.length === 1 ? "Event" : "Events"}, von der Tonhalle bis zum kleinen Jazz-Klub.`
          : "Heute Abend ist es ruhig in der Stadt."}
      </p>

      {today.length === 0 ? (
        <EmptyState
          title="Heute Abend ist es ruhig"
          description="Keine kuratierten Events für heute. Wirf einen Blick auf die Wochen-Übersicht oder schau im Aftermath, was diese Woche schon war."
          action={
            <Link
              href="/woche"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-paper text-[14px] font-medium hover:bg-burgundy transition-colors"
            >
              Diese Woche ansehen
            </Link>
          }
        />
      ) : (
        <FilterBar events={today} />
      )}
    </div>
  );
}
