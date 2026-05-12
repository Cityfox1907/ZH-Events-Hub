import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Users, Languages, Check, Star } from "lucide-react";
import { EXPERIENCES, getExperience } from "@/lib/data";
import { BookmarkButton } from "@/components/BookmarkButton";
import { DisintermediationNote } from "@/components/DisintermediationNote";
import { BookingCalendar } from "@/components/BookingCalendar";
import { ShareButton } from "@/components/ShareModal";
import { TrustBadges } from "@/components/TrustBadges";
import { LocationMap } from "@/components/LocationMap";
import { SimilarItems } from "@/components/SimilarItems";
import { Tabs } from "@/components/Tabs";
import { RecentlyViewedTracker } from "@/components/RecentlyViewedTracker";

export function generateStaticParams() {
  return EXPERIENCES.map((e) => ({ id: e.id }));
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const e = getExperience(id);
  if (!e) notFound();

  return (
    <article className="container-editorial pt-6 pb-20">
      <RecentlyViewedTracker module="experience" id={e.id} title={e.title} cover={e.cover_image} />

      <Link
        href="/experience"
        className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-burgundy mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Zurück zu Experience
      </Link>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-paper-dim mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={e.cover_image} alt={e.title} className="w-full h-full object-cover" />
          </div>
          {e.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mb-8">
              {e.gallery.slice(0, 4).map((src, i) => (
                <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden bg-paper-dim">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <p className="eyebrow">{e.category}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
            {e.title}
          </h1>
          <p className="text-[14px] text-ink-muted mt-2">mit {e.host}</p>

          <div className="flex flex-wrap gap-4 mt-4 text-[14px] text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {e.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-4 h-4" /> max. {e.max_participants}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {e.meeting_point}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Languages className="w-4 h-4" /> {e.languages.join(" · ")}
            </span>
            {e.rating && (
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-brass text-brass" /> {e.rating} · {e.review_count}
              </span>
            )}
          </div>

          <div className="mt-6">
            <TrustBadges since="2024" topRated={(e.rating ?? 0) >= 4.7} />
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
                        {e.description}
                      </p>
                      <h3 className="font-display text-xl mt-8 mb-3">Was ist inklusive</h3>
                      <ul className="space-y-2">
                        {e.what_included.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-[14px] text-ink-muted">
                            <Check className="w-4 h-4 text-burgundy mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <h3 className="font-display text-xl mt-8 mb-3">Über den Host</h3>
                      <div className="flex gap-4 p-4 bg-card border border-line rounded-xl">
                        <div className="w-14 h-14 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center font-display text-xl shrink-0">
                          {e.host.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-[14px]">{e.host}</p>
                          <p className="text-[13px] text-ink-muted mt-1 leading-relaxed">
                            {e.host_bio ?? "Erfahrener Host auf der Plattform."}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-6">
                        {e.vibe_tags.map((vt) => (
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
                  label: `Bewertungen (${e.review_count ?? 0})`,
                  content:
                    e.reviews && e.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {e.reviews.map((r, i) => (
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
                    ) : (
                      <p className="text-[14px] text-ink-muted">Noch keine Bewertungen.</p>
                    ),
                },
                {
                  key: "location",
                  label: "Treffpunkt",
                  content: <LocationMap address={`${e.meeting_point}, Zürich`} />,
                },
              ]}
            />
          </div>

          <SimilarItems module="experience" currentId={e.id} title="Ähnliche Erlebnisse" />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <BookingCalendar
            experienceId={e.id}
            experienceTitle={e.title}
            pricePerPerson={e.price_per_person}
            slots={e.slots}
          />
          <DisintermediationNote />
          <div className="p-4 rounded-xl bg-card border border-line space-y-2">
            <BookmarkButton module="experience" id={e.id} title={e.title} variant="pill" />
            <ShareButton title={e.title} />
          </div>
        </aside>
      </div>
    </article>
  );
}
