"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getTodayEvents, getWeekEvents, now } from "@/lib/events";
import { ensureSeedReviews } from "@/lib/reviews";
import { STORAGE_EVENT } from "@/lib/storage";
import { FilterBar } from "@/components/FilterBar";
import { CompactEventCard } from "@/components/EventCard";
import { EmptyState } from "@/components/EmptyState";
import type { ZhEvent } from "@/lib/types";

export function TodayView() {
  const [today, setToday] = useState<ZhEvent[]>([]);
  const [weekRest, setWeekRest] = useState<ZhEvent[]>([]);

  useEffect(() => {
    ensureSeedReviews();
    const sync = () => {
      const ref = now();
      const t = getTodayEvents(ref);
      const tIds = new Set(t.map((e) => e.id));
      const w = getWeekEvents(ref).filter((e) => !tIds.has(e.id)).slice(0, 6);
      setToday(t);
      setWeekRest(w);
    };
    sync();
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, []);

  return (
    <>
      <section className="container-editorial pb-16">
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
      </section>

      {weekRest.length > 0 ? (
        <section className="container-editorial pb-24">
          <div className="flex items-baseline justify-between pb-4 mb-2 border-b border-line">
            <h2 className="font-display text-[28px] md:text-[32px] text-ink tracking-[-0.02em]">
              Diese Woche kommt
            </h2>
            <Link
              href="/woche"
              className="text-[10px] uppercase tracking-[0.15em] text-ink-faint hover:text-burgundy transition-colors"
            >
              Alle anzeigen →
            </Link>
          </div>
          <div>
            {weekRest.map((event, idx) => (
              <CompactEventCard key={event.id} event={event} index={idx} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
