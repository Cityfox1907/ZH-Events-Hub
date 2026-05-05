"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getTodayEvents, getWeekEvents, now } from "@/lib/events";
import { ensureSeedReviews } from "@/lib/reviews";
import { STORAGE_EVENT } from "@/lib/storage";
import { FilterBar } from "@/components/FilterBar";
import { EventCard } from "@/components/EventCard";
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
      <section className="container-editorial pb-20">
        {today.length === 0 ? (
          <EmptyState
            title="Heute Abend ist es ruhig"
            description="Keine kuratierten Events für heute. Wirf einen Blick auf die Wochen-Übersicht oder schau im Aftermath, was diese Woche schon war."
            action={
              <Link
                href="/woche"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-card text-[14px] font-medium hover:bg-burgundy transition-colors"
              >
                Diese Woche ansehen
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            }
          />
        ) : (
          <FilterBar events={today} />
        )}
      </section>

      {weekRest.length > 0 ? (
        <section className="container-editorial pb-24">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-line">
            <div>
              <div className="eyebrow mb-2">Diese Woche kommt</div>
              <h2 className="font-display text-3xl md:text-4xl text-ink">In den nächsten Tagen</h2>
            </div>
            <Link
              href="/woche"
              className="hidden md:inline-flex items-center gap-2 text-[13px] text-ink-muted hover:text-burgundy transition-colors"
            >
              Alle anzeigen
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {weekRest.map((event, idx) => (
              <EventCard key={event.id} event={event} index={idx} />
            ))}
          </div>
          <div className="md:hidden mt-8">
            <Link
              href="/woche"
              className="inline-flex items-center gap-2 text-[13px] text-ink-muted hover:text-burgundy transition-colors"
            >
              Alle anzeigen
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </section>
      ) : null}
    </>
  );
}
