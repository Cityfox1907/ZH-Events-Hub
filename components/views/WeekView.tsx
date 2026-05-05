"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import Link from "next/link";
import { getWeekEvents, groupByDay, now } from "@/lib/events";
import { ensureSeedReviews } from "@/lib/reviews";
import { STORAGE_EVENT } from "@/lib/storage";
import { EmptyState } from "@/components/EmptyState";
import { CategoryBadge } from "@/components/CategoryBadge";
import { SizeBadge } from "@/components/SizeBadge";
import type { ZhEvent } from "@/lib/types";
import { formatDateLong, formatTime, formatChf } from "@/lib/format";

export function WeekView() {
  const [groups, setGroups] = useState<{ day: string; isoSample: string; events: ZhEvent[] }[]>([]);

  useEffect(() => {
    ensureSeedReviews();
    const sync = () => setGroups(groupByDay(getWeekEvents(now())));
    sync();
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, []);

  if (groups.length === 0) {
    return (
      <div className="container-editorial pb-20">
        <EmptyState
          title="Keine Events in den nächsten sieben Tagen"
          description="Die Woche ist überraschend ruhig. Schau im Aftermath, was zuletzt war, oder schlag selbst etwas vor."
        />
      </div>
    );
  }

  return (
    <div className="container-editorial pb-24 space-y-16">
      {groups.map((group, gi) => (
        <section key={group.day} className="stagger-fade-up" style={{ animationDelay: `${gi * 80}ms` }}>
          <div className="flex items-baseline justify-between pb-4 mb-6 border-b border-line">
            <h2 className="font-display text-2xl md:text-3xl text-ink">
              {formatDateLong(group.isoSample)}
            </h2>
            <span className="text-[12px] text-ink-faint tabular-nums">
              {group.events.length} {group.events.length === 1 ? "Event" : "Events"}
            </span>
          </div>
          <ul className="divide-y divide-line">
            {group.events.map((event) => (
              <li key={event.id}>
                <Link
                  href={`/event/${event.slug}`}
                  className="group flex items-start gap-4 md:gap-8 py-5 md:py-6 hover:bg-card transition-colors duration-200 -mx-3 px-3 rounded-md"
                >
                  <div className="flex-shrink-0 w-16 md:w-20 pt-1 text-ink">
                    <div className="flex items-center gap-1.5 text-[12px] text-ink-faint mb-1">
                      <Clock className="w-3 h-3" strokeWidth={1.75} />
                    </div>
                    <div className="font-display text-xl md:text-2xl tabular-nums leading-none">
                      {formatTime(event.startDateTime)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <CategoryBadge category={event.category} />
                      <SizeBadge size={event.size} />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl leading-tight text-ink group-hover:text-burgundy transition-colors duration-200">
                      {event.title}
                    </h3>
                    {event.subtitle ? (
                      <p className="mt-1 text-[14px] text-ink-muted line-clamp-1">{event.subtitle}</p>
                    ) : null}
                    <div className="mt-2 text-[12px] text-ink-faint">
                      {event.venue} · {event.neighborhood}
                    </div>
                  </div>
                  <div className="hidden md:block text-right text-[13px] text-ink-faint pt-1 flex-shrink-0">
                    {event.priceFromChf ? `ab ${formatChf(event.priceFromChf)}` : "Eintritt frei"}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
