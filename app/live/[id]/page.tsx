import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Calendar, Tag, Ticket } from "lucide-react";
import { LIVE_EVENTS, getLiveEvent } from "@/lib/data";
import { BookmarkButton } from "@/components/BookmarkButton";
import { DisintermediationNote } from "@/components/DisintermediationNote";
import { LiveCheckout } from "@/components/LiveCheckout";
import { ShareButton } from "@/components/ShareModal";
import { TrustBadges } from "@/components/TrustBadges";
import { LocationMap } from "@/components/LocationMap";
import { SimilarItems } from "@/components/SimilarItems";
import { Tabs } from "@/components/Tabs";
import { RecentlyViewedTracker } from "@/components/RecentlyViewedTracker";

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

  const soldPct = Math.round(
    ((ev.total_capacity - ev.tickets_available) / ev.total_capacity) * 100
  );

  return (
    <article className="container-editorial pt-6 pb-20">
      <RecentlyViewedTracker module="live" id={ev.id} title={ev.title} cover={ev.cover_image} />

      <Link
        href="/live"
        className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-burgundy mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Zurück zu Live
      </Link>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-paper-dim mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ev.cover_image} alt={ev.title} className="w-full h-full object-cover" />
            {ev.trending && (
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-burgundy text-paper text-[11px] font-medium uppercase tracking-wider">
                Trending
              </span>
            )}
          </div>
          {ev.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mb-8">
              {ev.gallery.slice(0, 4).map((src, i) => (
                <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden bg-paper-dim">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

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

          <div className="mt-6">
            <TrustBadges since="2024" topRated />
          </div>

          <div className="mt-6 p-4 bg-card border border-line rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-medium">Bereits verkauft</p>
              <p className="text-[13px] text-ink-muted">
                {soldPct}% · {ev.total_capacity - ev.tickets_available} / {ev.total_capacity}
              </p>
            </div>
            <div className="h-2 bg-paper-dim rounded-full overflow-hidden">
              <div
                className="h-full bg-burgundy transition-all"
                style={{ width: `${soldPct}%` }}
              />
            </div>
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
                        {ev.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {ev.vibe_tags.map((vt) => (
                          <span key={vt} className="px-3 py-1 rounded-full bg-paper-dim text-[12px] text-ink-muted">
                            {vt}
                          </span>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  key: "location",
                  label: "Lage",
                  content: <LocationMap address={`${ev.venue}, ${ev.district}, Zürich`} />,
                },
                {
                  key: "faq",
                  label: "FAQ",
                  content: <LiveFAQ />,
                },
              ]}
            />
          </div>

          <SimilarItems module="live" currentId={ev.id} title="Weitere Live-Events" />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <LiveCheckout
            eventId={ev.id}
            eventTitle={ev.title}
            priceMin={ev.price_min}
            priceMax={ev.price_max}
          />
          <DisintermediationNote />
          <div className="p-4 rounded-xl bg-card border border-line space-y-2">
            <BookmarkButton module="live" id={ev.id} title={ev.title} variant="pill" />
            <ShareButton title={ev.title} />
          </div>
        </aside>
      </div>
    </article>
  );
}

function LiveFAQ() {
  const faqs = [
    { q: "Sind Tickets übertragbar?", a: "Ja, du kannst über die Plattform den Empfänger ändern bis 24h vor dem Event." },
    { q: "Was bei Regen (Open Air)?", a: "Wir verschieben oder erstatten den vollen Betrag." },
    { q: "Kinder erlaubt?", a: "Bei Konzerten und Shows ab 12 Jahren in Begleitung. Pop-up Dinners ab 16." },
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
