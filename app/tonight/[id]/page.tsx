import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, Calendar, Tag, Eye } from "lucide-react";
import Link from "next/link";
import { getTonightEvent, TONIGHT_EVENTS } from "@/lib/data";
import { BookmarkButton } from "@/components/BookmarkButton";
import { DisintermediationNote } from "@/components/DisintermediationNote";
import { TicketCTA } from "@/components/TicketCTA";
import { ShareButton } from "@/components/ShareModal";
import { TrustBadges } from "@/components/TrustBadges";
import { LocationMap } from "@/components/LocationMap";
import { SimilarItems } from "@/components/SimilarItems";
import { Tabs } from "@/components/Tabs";
import { RecentlyViewedTracker } from "@/components/RecentlyViewedTracker";

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
      <RecentlyViewedTracker
        module="tonight"
        id={event.id}
        title={event.title}
        cover={event.cover_image}
      />

      <Link
        href="/tonight"
        className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-burgundy mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Zurück zu Tonight
      </Link>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-paper-dim mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.cover_image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {event.trending && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-burgundy text-paper text-[11px] font-medium uppercase tracking-wider">
                Trending
              </span>
            )}
          </div>
          {event.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mb-8">
              {event.gallery.slice(0, 4).map((src, i) => (
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
            {event.views_24h && (
              <span className="inline-flex items-center gap-1.5 text-burgundy">
                <Eye className="w-4 h-4" /> {event.views_24h} Aufrufe in 24h
              </span>
            )}
          </div>

          <div className="mt-6">
            <TrustBadges since="2024" topRated />
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
                  ),
                },
                {
                  key: "location",
                  label: "Lage",
                  content: (
                    <div className="space-y-3">
                      <p className="text-[14px] text-ink-muted">
                        {event.venue}, {event.district}
                      </p>
                      <LocationMap address={`${event.venue}, ${event.district}, Zürich`} />
                    </div>
                  ),
                },
                {
                  key: "faq",
                  label: "FAQ",
                  content: <FAQList />,
                },
              ]}
            />
          </div>

          <SimilarItems module="tonight" currentId={event.id} title="Ähnliche Events" />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <div className="bg-card border border-line rounded-2xl p-6 card-shadow">
            <p className="eyebrow mb-2">Tickets</p>
            <p className="font-display text-2xl">{event.price}</p>
            <p className="text-[13px] text-ink-muted mt-1">{event.datetime}</p>
            {event.tickets_left !== undefined && event.tickets_left < 20 && (
              <p className="mt-3 text-[12px] text-burgundy font-medium">
                🔥 Nur noch {event.tickets_left} Plätze verfügbar
              </p>
            )}

            <div className="mt-4 space-y-2">
              <TicketCTA label="Tickets ansehen" toast="Weiterleitung zu Ticketshop (Demo)" />
              <div className="grid grid-cols-2 gap-2">
                <BookmarkButton
                  module="tonight"
                  id={event.id}
                  title={event.title}
                  variant="pill"
                />
                <ShareButton title={event.title} />
              </div>
            </div>
          </div>

          <DisintermediationNote />
        </aside>
      </div>
    </article>
  );
}

function FAQList() {
  const faqs = [
    {
      q: "Brauche ich einen Sitzplatz?",
      a: "Falls ein Konzert oder Theater: ja, Sitzplatz wird automatisch zugewiesen. Bei Klubs/Festivals freie Platzwahl.",
    },
    {
      q: "Kann ich Tickets stornieren?",
      a: "Bis 48h vorher kostenlos. Danach ist der Anbieter für Erstattungen zuständig.",
    },
    {
      q: "Sind die Tickets übertragbar?",
      a: "Ja, du kannst über die Plattform den Empfänger ändern.",
    },
  ];
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group p-4 bg-card border border-line rounded-xl"
        >
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
