"use client";

import { useEffect, useState } from "react";
import { getAllEvents, isPast, now, sortByStart } from "@/lib/events";
import { ensureSeedReviews, getReviewsForEvent } from "@/lib/reviews";
import { getPhotosForEvent } from "@/lib/photos";
import { STORAGE_EVENT } from "@/lib/storage";
import { addDays } from "@/lib/format";
import { FilterBar } from "@/components/FilterBar";
import { EmptyState } from "@/components/EmptyState";
import type { ZhEvent } from "@/lib/types";

export function AftermathView() {
  const [events, setEvents] = useState<ZhEvent[]>([]);

  useEffect(() => {
    ensureSeedReviews();
    const sync = () => {
      const ref = now();
      const cutoff = addDays(ref, -14);
      const past = sortByStart(
        getAllEvents().filter((e) => {
          if (!isPast(e, ref)) return false;
          if (new Date(e.startDateTime) < cutoff) return false;
          const reviewCount = getReviewsForEvent(e.id).length;
          const photoCount = getPhotosForEvent(e.id).length;
          return reviewCount + photoCount > 0;
        }),
        "desc"
      ).sort((a, b) => {
        const aActivity = getReviewsForEvent(a.id).length + getPhotosForEvent(a.id).length;
        const bActivity = getReviewsForEvent(b.id).length + getPhotosForEvent(b.id).length;
        return bActivity - aActivity;
      });
      setEvents(past);
    };
    sync();
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, []);

  return (
    <section className="container-editorial pb-24">
      {events.length === 0 ? (
        <EmptyState
          title="Noch nichts dokumentiert"
          description="Sobald nach einem Event Reviews oder Fotos eintrudeln, erscheint er hier. Geh hin, halt fest, was war — der Aftermath ist das Herzstück."
        />
      ) : (
        <FilterBar
          events={events}
          variant="aftermath"
          emptyTitle="Mit diesen Filtern nichts dabei"
          emptyDescription="Lockere die Filter oder schau die ganze Woche an."
        />
      )}
    </section>
  );
}
