import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Clock, Users, Languages, Check } from "lucide-react";
import { EXPERIENCES, getExperience } from "@/lib/data";
import { BookmarkButton } from "@/components/BookmarkButton";
import { DisintermediationNote } from "@/components/DisintermediationNote";
import { BookingCalendar } from "@/components/BookingCalendar";

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
      <Link
        href="/experience"
        className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-burgundy mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Zurück zu Experience
      </Link>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-paper-dim mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={e.cover_image}
              alt={e.title}
              className="w-full h-full object-cover"
            />
          </div>

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
          </div>

          <p className="mt-6 text-[16px] leading-relaxed text-ink-muted">
            {e.description}
          </p>

          <h2 className="font-display text-2xl mt-10 mb-3">Was ist inklusive</h2>
          <ul className="space-y-2">
            {e.what_included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[14px] text-ink-muted"
              >
                <Check className="w-4 h-4 text-burgundy mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-8">
            {e.vibe_tags.map((vt) => (
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
          <BookingCalendar
            experienceId={e.id}
            experienceTitle={e.title}
            pricePerPerson={e.price_per_person}
            slots={e.slots}
          />
          <DisintermediationNote />
          <div className="p-4 rounded-xl bg-card border border-line">
            <BookmarkButton
              module="experience"
              id={e.id}
              title={e.title}
              variant="pill"
            />
          </div>
        </aside>
      </div>
    </article>
  );
}
