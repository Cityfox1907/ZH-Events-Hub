"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Ticket } from "lucide-react";
import { getEventBySlug } from "@/lib/events";
import { ensureSeedReviews } from "@/lib/reviews";
import { gradientFor } from "@/lib/gradients";
import { formatChf, formatDateLong, formatTime } from "@/lib/format";
import { categoryLabel, sizeCapacity, sizeLabel } from "@/lib/categories";
import { GoingButton } from "@/components/GoingButton";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewList } from "@/components/ReviewList";
import { PhotoStream } from "@/components/PhotoStream";
import { PhotoUploader } from "@/components/PhotoUploader";
import { SizeBadge } from "@/components/SizeBadge";
import { CategoryBadge } from "@/components/CategoryBadge";
import { EmptyState } from "@/components/EmptyState";
import type { ZhEvent } from "@/lib/types";
import { STORAGE_EVENT } from "@/lib/storage";
import { goingCount, pseudoBaseCount } from "@/lib/going";

const SIZE_BASE: Record<ZhEvent["size"], number> = {
  mega: 4800,
  major: 1400,
  mid: 540,
  intimate: 180,
};

interface Props {
  slug: string;
}

export function EventDetailView({ slug }: Props) {
  const [event, setEvent] = useState<ZhEvent | undefined>(undefined);
  const [resolved, setResolved] = useState(false);
  const [going, setGoing] = useState(0);

  useEffect(() => {
    ensureSeedReviews();
    const sync = () => {
      const ev = getEventBySlug(slug);
      setEvent(ev);
      setResolved(true);
      if (ev) setGoing(goingCount(ev.id, SIZE_BASE[ev.size]));
    };
    sync();
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, [slug]);

  if (!resolved) {
    return <EventSkeleton />;
  }

  if (!event) {
    return (
      <div className="container-editorial py-20">
        <EmptyState
          title="Event nicht gefunden"
          description="Diese URL führt ins Leere. Vielleicht wurde der Event entfernt oder du hast einen alten Link."
          action={
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-paper text-[14px] font-medium hover:bg-burgundy transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              Zur Startseite
            </Link>
          }
        />
      </div>
    );
  }

  const gradient = gradientFor(event.id, event.category);
  const baseMax = SIZE_BASE[event.size];
  const initialGoing = pseudoBaseCount(event.id, baseMax);
  const livePersons = going || initialGoing;

  return (
    <article>
      <header
        className="relative w-full aspect-[21/9] min-h-[280px] md:min-h-[360px] overflow-hidden"
        style={{ background: gradient.css }}
      >
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.05)_100%)]"
          aria-hidden
        />
        <Link
          href="/"
          aria-label="Zurück zur Startseite"
          className="absolute top-5 left-5 z-[2] inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-paper hover:bg-black/40 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 z-[1]">
          <div className="container-editorial pb-8 md:pb-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <SizeBadge size={event.size} />
              <span className="px-2.5 py-[2px] rounded-full text-[10px] font-medium uppercase tracking-[0.15em] bg-white/15 backdrop-blur-sm text-paper">
                {categoryLabel(event.category)}
              </span>
            </div>
            <h1 className="font-display text-[32px] leading-[1.0] md:text-[56px] md:leading-[1.0] tracking-[-0.02em] text-paper">
              {event.title}
            </h1>
            {event.subtitle ? (
              <p className="mt-2 text-[16px] md:text-[18px] text-paper/70 max-w-2xl">
                {event.subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <div className="container-editorial">
        <div className="grid gap-12 lg:gap-12 lg:grid-cols-[1fr_320px] py-10 md:py-14 pb-20 md:pb-24">
          <div className="min-w-0 space-y-10">
            <section>
              <p className="text-[17px] md:text-[18px] leading-[1.7] text-ink-muted max-w-[64ch] whitespace-pre-line">
                {event.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <GoingButton eventId={event.id} baseMax={baseMax} />
                {event.ticketUrl ? (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-line-strong bg-transparent text-ink text-[14px] font-medium hover:bg-paper-dim transition-colors"
                  >
                    <Ticket className="w-4 h-4" strokeWidth={1.75} />
                    Tickets kaufen
                  </a>
                ) : null}
              </div>
            </section>

            <hr className="hairline" />

            <section>
              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-line">
                <h2 className="font-display text-[28px] md:text-[32px] text-ink tracking-[-0.02em]">
                  Reviews
                </h2>
                <ReviewForm eventId={event.id} />
              </div>
              <ReviewList eventId={event.id} />
            </section>

            <hr className="hairline" />

            <section>
              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-line">
                <h2 className="font-display text-[28px] md:text-[32px] text-ink tracking-[-0.02em]">
                  Bilder vom Abend
                </h2>
              </div>
              <PhotoStream eventId={event.id} />
              <div className="mt-6">
                <PhotoUploader eventId={event.id} />
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-20 self-start space-y-5">
            <div className="rounded-lg bg-card border border-line overflow-hidden">
              <DefRow label="Datum">{formatDateLong(event.startDateTime)}</DefRow>
              <DefRow label="Beginn">{formatTime(event.startDateTime)}</DefRow>
              <DefRow label="Venue">
                {event.venue} · {event.neighborhood}
              </DefRow>
              <DefRow label="Größe">
                {sizeLabel(event.size)} · {sizeCapacity(event.size)}
              </DefRow>
              <DefRow label="Kategorie">{categoryLabel(event.category)}</DefRow>
              <DefRow label="Preis" last>
                {event.priceFromChf ? `ab ${formatChf(event.priceFromChf)}` : "Eintritt frei"}
              </DefRow>
            </div>

            <div className="rounded-lg bg-card border border-line p-5">
              <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-ink-faint mb-2">
                Live
              </div>
              <div className="flex items-center gap-3">
                <span className="block w-2 h-2 rounded-full bg-[#22c55e] zb-pulse" aria-hidden />
                <span className="font-display text-[32px] leading-none tabular-nums text-ink">
                  {livePersons.toLocaleString("de-CH").replace(/,/g, "'")}
                </span>
              </div>
              <div className="mt-1 text-[13px] text-ink-muted">Personen gehen hin</div>
            </div>

            {event.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full border border-line text-[11px] uppercase tracking-[0.12em] text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <CategoryBadge category={event.category} className="sr-only" />
          </aside>
        </div>
      </div>
    </article>
  );
}

function DefRow({
  label,
  children,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`px-5 py-4 ${last ? "" : "border-b border-line"}`}>
      <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-ink-faint mb-1">
        {label}
      </div>
      <div className="font-display text-[17px] leading-snug text-ink tracking-[-0.02em]">
        {children}
      </div>
    </div>
  );
}

function EventSkeleton() {
  return (
    <div className="container-editorial py-20">
      <div className="h-72 rounded-md bg-paper-dim animate-pulse" aria-hidden />
    </div>
  );
}
