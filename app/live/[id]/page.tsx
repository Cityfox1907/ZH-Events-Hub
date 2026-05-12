import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Calendar, Tag, Ticket } from "lucide-react";
import { LIVE_EVENTS, getLiveEvent } from "@/lib/data";
import { BookmarkButton } from "@/components/BookmarkButton";
import { DisintermediationNote } from "@/components/DisintermediationNote";
import { LiveCheckout } from "@/components/LiveCheckout";

export function generateStaticParams() {
  return LIVE_EVENTS.map((e) => ({ id: e.id }));
}

export default async function LiveDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ev = getLiveEvent(id);
  if (!ev) notFound();

  return (
    <article className="container-editorial pt-6 pb-20">
      <Link
        href="/live"
        className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-burgundy mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Zurück zu Live
      </Link>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-paper-dim mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ev.cover_image}
              alt={ev.title}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="eyebrow">{ev.type}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
            {ev.title}
          </h1>

          <div className="flex flex-wrap gap-4 mt-4 text-[14px] text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {ev.datetime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {ev.venue}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> {ev.price_range}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Ticket className="w-4 h-4" /> {ev.tickets_available} Tickets verfügbar
            </span>
          </div>

          <p className="mt-6 text-[16px] leading-relaxed text-ink-muted">
            {ev.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {ev.vibe_tags.map((vt) => (
              <span
                key={vt}
                className="px-3 py-1 rounded-full bg-paper-dim text-[12px] text-ink-muted"
              >
                {vt}
              </span>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <LiveCheckout
            eventId={ev.id}
            eventTitle={ev.title}
            priceMin={ev.price_min}
            priceMax={ev.price_max}
          />
          <DisintermediationNote />
          <div className="p-4 rounded-xl bg-card border border-line">
            <BookmarkButton
              module="live"
              id={ev.id}
              title={ev.title}
              variant="pill"
            />
          </div>
        </aside>
      </div>
    </article>
  );
}
