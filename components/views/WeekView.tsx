"use client";

import { useEffect, useState } from "react";
import { getWeekEvents, groupByDay, now } from "@/lib/events";
import { ensureSeedReviews } from "@/lib/reviews";
import { STORAGE_EVENT } from "@/lib/storage";
import { EmptyState } from "@/components/EmptyState";
import { CompactEventCard } from "@/components/EventCard";
import type { ZhEvent } from "@/lib/types";
import { formatDateLong } from "@/lib/format";

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
    <div className="container-editorial pb-24 space-y-12">
      {groups.map((group, gi) => (
        <section key={group.day} className="stagger-fade-up" style={{ animationDelay: `${gi * 80}ms` }}>
          <div className="flex items-baseline justify-between pb-4 mb-2 border-b border-line">
            <h2 className="font-display text-[24px] md:text-[28px] text-ink tracking-[-0.02em]">
              {formatDateLong(group.isoSample)}
            </h2>
            <span className="text-[10px] uppercase tracking-[0.15em] text-ink-faint tabular-nums">
              {group.events.length} {group.events.length === 1 ? "Event" : "Events"}
            </span>
          </div>
          <div>
            {group.events.map((event, idx) => (
              <CompactEventCard key={event.id} event={event} index={idx} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
