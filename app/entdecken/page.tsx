import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Landmark,
  MessagesSquare,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import {
  STADTFESTE,
  STADT_ORGANISATIONEN,
  NUTZER_EVENTS,
  type Stadtfest,
  type StadtOrganisation,
  type NutzerEvent,
} from "@/lib/entdecken-data";

export const metadata = {
  title: "Entdecken — Stadtfeste & Organisationen im Kanton Zürich",
};

export default function EntdeckenPage() {
  return (
    <div className="container-editorial pt-8 pb-20">
      {/* Kopf */}
      <header className="max-w-2xl">
        <p className="eyebrow">Entdecken</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          Stadtfeste & Organisationen im Kanton Zürich
        </h1>
        <p className="text-[15px] text-ink-muted mt-4 leading-relaxed">
          Die grossen offiziellen Feste von Zürich bis Winterthur — und die
          Organisationen dahinter. Klick auf eine Karte, um mitzudiskutieren,
          Fragen zu klären oder Hilfe zu holen. Darunter findest du Events, die
          Nutzer:innen aus der Community organisieren.
        </p>
      </header>

      {/* Die grossen Stadtfeste */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-3xl">Die grossen Stadtfeste</h2>
          <span className="eyebrow hidden md:inline">
            Offiziell · Kanton Zürich
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {STADTFESTE.map((fest) => (
            <FestCard key={fest.slug} fest={fest} />
          ))}
        </div>
      </section>

      {/* Organisationen */}
      <section className="mt-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-3xl">
            Die Organisationen dahinter
          </h2>
          <span className="eyebrow hidden md:inline">
            Ansprechpartner & Hilfe
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {STADT_ORGANISATIONEN.map((org) => (
            <OrgCard key={org.slug} org={org} />
          ))}
        </div>
      </section>

      {/* Events aus der Community */}
      <section className="mt-16">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="font-display text-3xl">Events von Nutzer:innen</h2>
          <span className="eyebrow hidden md:inline">Aus der Community</span>
        </div>
        <p className="text-[14px] text-ink-muted mb-6 max-w-xl">
          Von Nachbar:innen organisiert — mit allem, was die Leute dazu sagen.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {NUTZER_EVENTS.map((ev) => (
            <NutzerEventCard key={ev.id} event={ev} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FestCard({ fest }: { fest: Stadtfest }) {
  return (
    <Link
      href={`/entdecken/${fest.slug}`}
      className={`group bg-card border border-line rounded-2xl overflow-hidden card-shadow-hover transition-shadow flex flex-col ${
        fest.big ? "sm:col-span-2 lg:col-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-paper-dim ${
          fest.big ? "aspect-[16/8]" : "aspect-[16/10]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fest.bild}
          alt={fest.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-burgundy text-paper text-[11px] font-medium uppercase tracking-wider">
          {fest.kategorie}
        </span>
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-paper/90 text-ink text-[11px] font-medium">
          {fest.stadt}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display text-[20px] leading-tight group-hover:text-burgundy transition-colors">
          {fest.name}
        </h3>
        <p className="text-[13px] text-ink-muted mt-0.5">{fest.untertitel}</p>
        <div className="mt-3 space-y-1 text-[12.5px] text-ink-muted">
          <p className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0" /> {fest.datumLabel}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" /> {fest.ort}
          </p>
          <p className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 shrink-0" /> {fest.besucher}
          </p>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between text-[12px]">
          <span className="inline-flex items-center gap-1 text-ink-faint">
            <BadgeCheck className="w-3.5 h-3.5 text-burgundy" />
            {fest.organisator}
          </span>
          <span className="inline-flex items-center gap-1 text-burgundy font-medium">
            <MessagesSquare className="w-3.5 h-3.5" />
            {fest.kommentare.length}
          </span>
        </div>
      </div>
    </Link>
  );
}

function OrgCard({ org }: { org: StadtOrganisation }) {
  return (
    <Link
      href={`/entdecken/${org.slug}`}
      className="group bg-card border border-line rounded-2xl overflow-hidden card-shadow-hover transition-shadow flex flex-col"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-paper-dim">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={org.bild}
          alt={org.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper/90 text-ink text-[11px] font-medium">
          <Landmark className="w-3 h-3" /> Offiziell
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display text-[18px] leading-tight group-hover:text-burgundy transition-colors">
          {org.name}
        </h3>
        <p className="text-[13px] text-ink-muted mt-1">{org.kurz}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {org.zustaendigFuer.slice(0, 3).map((z) => (
            <span
              key={z}
              className="px-2 py-0.5 rounded-full bg-paper-dim border border-line text-[11px] text-ink-muted"
            >
              {z}
            </span>
          ))}
        </div>
        <span className="mt-auto pt-3 inline-flex items-center gap-1 text-[12.5px] text-burgundy font-medium">
          Besprechen & Hilfe holen
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function NutzerEventCard({ event }: { event: NutzerEvent }) {
  return (
    <article className="bg-card border border-line rounded-2xl overflow-hidden card-shadow flex flex-col">
      <div className="relative aspect-[16/8] overflow-hidden bg-paper-dim">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.bild}
          alt={event.titel}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ink/80 text-paper text-[11px] font-medium">
          {event.datumLabel} · {event.zeit}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.host.avatar}
            alt={event.host.name}
            className="w-8 h-8 rounded-full bg-paper-dim object-cover shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-display text-[18px] leading-tight truncate">
              {event.titel}
            </h3>
            <p className="text-[12px] text-ink-faint">
              Organisiert von {event.host.name}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> {event.ort}, {event.stadt}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> {event.teilnehmer} dabei
          </span>
        </div>
        <p className="text-[13.5px] text-ink-muted mt-3 leading-relaxed">
          {event.beschreibung}
        </p>

        {/* Was die Leute sagen */}
        <div className="mt-4 pt-3 border-t border-line">
          <p className="eyebrow mb-2">Was die Leute sagen</p>
          <ul className="space-y-2.5">
            {event.kommentare.map((k, i) => (
              <li key={i} className="flex items-start gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={k.avatar}
                  alt={k.autor}
                  className="w-7 h-7 rounded-full bg-paper-dim object-cover shrink-0 mt-0.5"
                />
                <div className="min-w-0">
                  <p className="text-[12px] text-ink-faint">
                    <span className="font-medium text-ink">{k.autor}</span> ·{" "}
                    {k.quartier} · {k.ago}
                  </p>
                  <p className="text-[13px] leading-snug mt-0.5">{k.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
