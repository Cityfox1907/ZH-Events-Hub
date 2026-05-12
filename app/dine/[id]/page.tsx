import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Star } from "lucide-react";
import { DINE_VENUES, getDineVenue } from "@/lib/data";
import { BookmarkButton } from "@/components/BookmarkButton";
import { DisintermediationNote } from "@/components/DisintermediationNote";
import { ReservationForm } from "@/components/ReservationForm";

export function generateStaticParams() {
  return DINE_VENUES.map((v) => ({ id: v.id }));
}

export default async function DineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const v = getDineVenue(id);
  if (!v) notFound();

  return (
    <article className="container-editorial pt-6 pb-20">
      <Link
        href="/dine"
        className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-burgundy mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Zurück zu Dine
      </Link>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-paper-dim mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={v.cover_image}
              alt={v.name}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="eyebrow">{v.type}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
            {v.name}
          </h1>

          <div className="flex flex-wrap gap-4 mt-4 text-[14px] text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {v.address}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {v.hours}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-brass text-brass" />
              {v.rating} · {v.review_count} Bewertungen
            </span>
            <span>{v.price_range}</span>
          </div>

          <p className="mt-6 text-[16px] leading-relaxed text-ink-muted">
            {v.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {v.vibe_tags.map((vt) => (
              <span
                key={vt}
                className="px-3 py-1 rounded-full bg-paper-dim text-[12px] text-ink-muted"
              >
                {vt}
              </span>
            ))}
          </div>

          <h2 className="font-display text-2xl mt-12 mb-4">Bewertungen</h2>
          <div className="space-y-4">
            {v.reviews.map((r, i) => (
              <div
                key={i}
                className="p-5 bg-card border border-line rounded-xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-[14px]">{r.author}</span>
                  <span className="text-[12px] text-ink-faint">· {r.date}</span>
                  <span className="ml-auto flex items-center gap-0.5">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-3.5 h-3.5 fill-brass text-brass"
                      />
                    ))}
                  </span>
                </div>
                <p className="text-[14px] text-ink-muted leading-relaxed">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <ReservationForm venueId={v.id} venueName={v.name} />
          <DisintermediationNote />
          <div className="p-4 rounded-xl bg-card border border-line">
            <BookmarkButton
              module="dine"
              id={v.id}
              title={v.name}
              variant="pill"
            />
          </div>
        </aside>
      </div>
    </article>
  );
}
