import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { getTonightEvent, TONIGHT_EVENTS } from "@/lib/data";
import { BookmarkButton } from "@/components/BookmarkButton";
import { DisintermediationNote } from "@/components/DisintermediationNote";
import { TicketCTA } from "@/components/TicketCTA";

export function generateStaticParams() {
  return TONIGHT_EVENTS.map((e) => ({ id: e.id }));
}

export default async function TonightDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getTonightEvent(id);
  if (!event) notFound();

  return (
    <article className="container-editorial pt-6 pb-20">
      <Link
        href="/tonight"
        className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-burgundy mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Zurück zu Tonight
      </Link>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-paper-dim mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.cover_image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          {event.gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-2 mb-8">
              {event.gallery.slice(0, 3).map((src, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-lg overflow-hidden bg-paper-dim"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <p className="eyebrow">{event.category}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-4 mt-4 text-[14px] text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {event.datetime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {event.venue}, {event.district}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> {event.price}
            </span>
          </div>

          <p className="mt-6 text-[16px] leading-relaxed text-ink-muted">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {event.vibe_tags.map((v) => (
              <span
                key={v}
                className="px-3 py-1 rounded-full bg-paper-dim text-[12px] text-ink-muted"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <div className="bg-card border border-line rounded-2xl p-6 card-shadow">
            <p className="eyebrow mb-2">Tickets</p>
            <p className="font-display text-2xl">{event.price}</p>
            <p className="text-[13px] text-ink-muted mt-1">{event.datetime}</p>

            <div className="mt-4 space-y-2">
              <TicketCTA label="Tickets ansehen" toast="Weiterleitung zu Ticketshop (Demo)" />
              <BookmarkButton
                module="tonight"
                id={event.id}
                title={event.title}
                variant="pill"
              />
            </div>
          </div>

          <DisintermediationNote />
        </aside>
      </div>
    </article>
  );
}
