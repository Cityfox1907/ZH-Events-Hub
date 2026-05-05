"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Tag, Ticket } from "lucide-react";
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

  useEffect(() => {
    ensureSeedReviews();
    const sync = () => {
      setEvent(getEventBySlug(slug));
      setResolved(true);
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-card text-[14px] font-medium hover:bg-burgundy transition-colors"
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

  return (
    <article>
      <header
        className="relative w-full"
        style={{ background: gradient.css, color: gradient.ink }}
      >
        <div className="container-editorial py-14 md:py-24 lg:py-28">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] opacity-80 hover:opacity-100 transition-opacity mb-10"
          >
            <ArrowLeft className="w-3 h-3" strokeWidth={1.75} />
            Zurück
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <SizeBadge size={event.size} />
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-80">
              {categoryLabel(event.category)}
            </span>
          </div>

          <h1 className="font-display text-[40px] leading-[1.04] md:text-[68px] md:leading-[1.0] tracking-[-0.02em] max-w-4xl">
            {event.title}
          </h1>
          {event.subtitle ? (
            <p className="mt-5 text-[16px] md:text-[20px] leading-relaxed opacity-90 max-w-2xl">
              {event.subtitle}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] uppercase tracking-[0.15em] opacity-90">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.75} />
              {formatDateLong(event.startDateTime)} · {formatTime(event.startDateTime)}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} />
              {event.venue} · {event.neighborhood}
            </span>
          </div>
        </div>
      </header>

      <div className="container-editorial py-12 md:py-16 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12 min-w-0">
          <section>
            <p className="text-[17px] md:text-[18px] leading-[1.7] text-ink whitespace-pre-line">
              {event.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <GoingButton eventId={event.id} baseMax={baseMax} />
              {event.ticketUrl ? (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-line-strong text-[14px] text-ink hover:border-ink hover:bg-card transition-colors"
                >
                  <Ticket className="w-4 h-4" strokeWidth={1.75} />
                  Tickets
                </a>
              ) : null}
            </div>
          </section>

          <hr className="hairline" />

          <section>
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <div className="eyebrow mb-2">Reviews</div>
                <h2 className="font-display text-3xl md:text-4xl text-ink">Wie war's</h2>
              </div>
              <ReviewForm eventId={event.id} />
            </div>
            <ReviewList eventId={event.id} />
          </section>

          <hr className="hairline" />

          <section>
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <div className="eyebrow mb-2">Foto-Stream</div>
                <h2 className="font-display text-3xl md:text-4xl text-ink">Bilder vom Abend</h2>
              </div>
            </div>
            <PhotoStream eventId={event.id} />
            <div className="mt-6">
              <PhotoUploader eventId={event.id} />
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28 self-start">
          <div className="rounded-md bg-card border border-line p-6 md:p-7 card-shadow">
            <dl className="space-y-5">
              <DefRow label="Datum">{formatDateLong(event.startDateTime)}</DefRow>
              <DefRow label="Beginn">{formatTime(event.startDateTime)}</DefRow>
              <DefRow label="Venue">{event.venue}</DefRow>
              <DefRow label="Quartier">{event.neighborhood}</DefRow>
              <DefRow label="Größe">
                {sizeLabel(event.size)} · {sizeCapacity(event.size)}
              </DefRow>
              <DefRow label="Kategorie">
                <CategoryBadge category={event.category} />
              </DefRow>
              <DefRow label="Preis">
                {event.priceFromChf ? `ab ${formatChf(event.priceFromChf)}` : "Eintritt frei"}
              </DefRow>
            </dl>

            {event.tags.length > 0 ? (
              <div className="mt-6 pt-6 border-t border-line">
                <div className="eyebrow mb-3 inline-flex items-center gap-1.5">
                  <Tag className="w-3 h-3" strokeWidth={1.75} />
                  Tags
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2.5 py-1 rounded-full bg-paper-dim text-ink-muted text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </article>
  );
}

function DefRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow mb-1">{label}</dt>
      <dd className="text-[14px] text-ink leading-snug">{children}</dd>
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
