import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { PULSE_EVENTS } from "@/lib/data";

export default function PulsePage() {
  return (
    <>
      <PageHero
        eyebrow="Puls · Events (Vorschau)"
        title="Premium-Networking — bald wieder."
        subtitle="Der Pulse-Bereich (Founders' Tables, Salons, VIP-Previews) wird neu unter Puls / Events organisiert. Aktuell pausiert — wir bauen die Zürcher Community in den 8 Modulen erst auf. Schau in der Zwischenzeit im neuen Puls-Feed vorbei."
      />

      <section className="container-editorial pb-8">
        <div className="p-5 rounded-2xl bg-paper-dim border border-line text-[13.5px] text-ink-muted">
          🎉 ZurichTonight ist aktuell <strong className="text-ink">komplett gratis</strong> für User und Anbieter.
          Pulse-Premium-Features (Founders' Tables, Salons) kommen als optionaler Layer später —
          aktuell keine Bezahl-Schranke.
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/puls"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-burgundy text-paper text-[12.5px] font-medium hover:bg-burgundy-dark"
            >
              Zum Community-Feed <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/stimmen"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-line text-[12.5px] font-medium hover:border-burgundy"
            >
              Stadt-Demokratie ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="container-editorial pb-20">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-burgundy" />
          <h2 className="font-display text-3xl md:text-4xl">
            Frühere Pulse-Events (Archiv)
          </h2>
        </div>
        <p className="text-[13.5px] text-ink-muted mb-6 max-w-2xl">
          Diese Events zeigen das Format, das wir bald wieder als optionale Premium-Schicht
          anbieten — keine Pay-Wall mehr im Prototyp.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {PULSE_EVENTS.map((ev) => (
            <Card
              key={ev.id}
              module="pulse"
              id={ev.id}
              title={ev.title}
              href={`/pulse/${ev.id}`}
              cover={ev.cover_image}
              eyebrow={`${ev.type} · Archiv`}
              meta={`${ev.datetime} · ${ev.venue}`}
              price={`${ev.current_rsvp} / ${ev.max_attendees} RSVP`}
              showBookmark={false}
            />
          ))}
        </div>
      </section>
    </>
  );
}
