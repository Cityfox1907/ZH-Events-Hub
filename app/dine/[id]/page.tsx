import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Star } from "lucide-react";
import { DINE_VENUES, getDineVenue } from "@/lib/data";
import { BookmarkButton } from "@/components/BookmarkButton";
import { DisintermediationNote } from "@/components/DisintermediationNote";
import { ReservationForm } from "@/components/ReservationForm";
import { ShareButton } from "@/components/ShareModal";
import { TrustBadges } from "@/components/TrustBadges";
import { LocationMap } from "@/components/LocationMap";
import { SimilarItems } from "@/components/SimilarItems";
import { Tabs } from "@/components/Tabs";
import { RecentlyViewedTracker } from "@/components/RecentlyViewedTracker";

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
      <RecentlyViewedTracker module="dine" id={v.id} title={v.name} cover={v.cover_image} />

      <Link
        href="/dine"
        className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-burgundy mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Zurück zu Dine
      </Link>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-paper-dim mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={v.cover_image}
              alt={v.name}
              className="w-full h-full object-cover"
            />
            {v.trending && (
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-burgundy text-paper text-[11px] font-medium uppercase tracking-wider">
                Trending
              </span>
            )}
          </div>
          {v.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mb-8">
              {v.gallery.slice(0, 4).map((src, i) => (
                <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden bg-paper-dim">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

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
            <span className="font-medium">{v.price_range}</span>
          </div>

          <div className="mt-6">
            <TrustBadges since="2024" topRated={v.rating >= 4.7} />
          </div>

          <div className="mt-8">
            <Tabs
              tabs={[
                {
                  key: "overview",
                  label: "Übersicht",
                  content: (
                    <div>
                      <p className="text-[16px] leading-relaxed text-ink-muted">
                        {v.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {v.vibe_tags.map((vt) => (
                          <span key={vt} className="px-3 py-1 rounded-full bg-paper-dim text-[12px] text-ink-muted">
                            {vt}
                          </span>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  key: "reviews",
                  label: `Bewertungen (${v.review_count})`,
                  content: (
                    <div className="space-y-4">
                      <div className="flex items-end gap-3 pb-3 border-b border-line">
                        <span className="font-display text-5xl">{v.rating}</span>
                        <span className="flex items-center gap-0.5 mb-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.round(v.rating) ? "fill-brass text-brass" : "text-line-strong"}`} />
                          ))}
                        </span>
                        <span className="text-[13px] text-ink-muted mb-2">
                          {v.review_count} Bewertungen
                        </span>
                      </div>
                      {v.reviews.map((r, i) => (
                        <div key={i} className="p-5 bg-card border border-line rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-8 h-8 rounded-full bg-burgundy/10 text-burgundy text-[12px] font-medium flex items-center justify-center">
                              {r.author.split(" ").map((p) => p[0]).join("")}
                            </span>
                            <span className="font-medium text-[14px]">{r.author}</span>
                            <span className="text-[12px] text-ink-faint">· {r.date}</span>
                            <span className="ml-auto flex items-center gap-0.5">
                              {Array.from({ length: r.rating }).map((_, j) => (
                                <Star key={j} className="w-3.5 h-3.5 fill-brass text-brass" />
                              ))}
                            </span>
                          </div>
                          <p className="text-[14px] text-ink-muted leading-relaxed">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  key: "location",
                  label: "Lage",
                  content: <LocationMap address={v.address} />,
                },
                {
                  key: "faq",
                  label: "FAQ",
                  content: <DineFAQ />,
                },
              ]}
            />
          </div>

          <SimilarItems module="dine" currentId={v.id} title="Ähnliche Restaurants" />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <ReservationForm venueId={v.id} venueName={v.name} />
          <DisintermediationNote />
          <div className="p-4 rounded-xl bg-card border border-line space-y-2">
            <BookmarkButton module="dine" id={v.id} title={v.name} variant="pill" />
            <ShareButton title={v.name} />
          </div>
        </aside>
      </div>
    </article>
  );
}

function DineFAQ() {
  const faqs = [
    { q: "Wie funktioniert die Reservierung?", a: "Du sendest eine Anfrage über die Plattform — der Anbieter bestätigt innerhalb 24h." },
    { q: "Kann ich grosse Gruppen anmelden?", a: "Bis 8 Personen direkt buchbar. Grössere Gruppen über das Kommentar-Feld anfragen." },
    { q: "Was bei Allergien?", a: "Trag sie bei der Buchung ein — der Anbieter erhält die Notiz mit." },
    { q: "Stornierung?", a: "Bis 24h vor Termin kostenlos. Danach trägt der Gast die Verantwortung." },
  ];
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details key={f.q} className="group p-4 bg-card border border-line rounded-xl">
          <summary className="cursor-pointer font-medium text-[14px] flex items-center justify-between">
            {f.q}
            <span className="text-ink-faint group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <p className="text-[14px] text-ink-muted mt-2 leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
