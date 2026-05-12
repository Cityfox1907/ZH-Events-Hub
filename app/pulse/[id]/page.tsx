import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Calendar, Users, Lock } from "lucide-react";
import { PULSE_EVENTS, getPulseEvent } from "@/lib/data";
import { DisintermediationNote } from "@/components/DisintermediationNote";
import { RsvpButton } from "@/components/RsvpButton";

export function generateStaticParams() {
  return PULSE_EVENTS.map((e) => ({ id: e.id }));
}

export default async function PulseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ev = getPulseEvent(id);
  if (!ev) notFound();

  return (
    <article className="container-editorial pt-6 pb-20">
      <Link
        href="/pulse"
        className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-burgundy mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Zurück zu Pulse
      </Link>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-paper-dim mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ev.cover_image}
              alt={ev.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy text-paper text-[11px] font-medium uppercase tracking-wider">
              <Lock className="w-3 h-3" /> {ev.required_tier}-Members
            </span>
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
              <Users className="w-4 h-4" /> {ev.current_rsvp} / {ev.max_attendees}
            </span>
          </div>

          <p className="mt-6 text-[16px] leading-relaxed text-ink-muted">
            {ev.description}
          </p>

          <div className="mt-8 p-5 bg-paper-dim border border-line rounded-xl">
            <p className="eyebrow mb-2">Curator-Notizen</p>
            <p className="text-[14px] text-ink-muted leading-relaxed italic">
              "{ev.curator_notes}"
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <RsvpButton eventId={ev.id} eventTitle={ev.title} requiredTier={ev.required_tier} />
          <DisintermediationNote />
        </aside>
      </div>
    </article>
  );
}
