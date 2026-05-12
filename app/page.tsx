import Link from "next/link";
import {
  ArrowRight,
  CalendarHeart,
  UtensilsCrossed,
  Compass,
  Crown,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/Card";
import { TONIGHT_EVENTS } from "@/lib/data";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HomeSearch } from "@/components/HomeSearch";

const MODULES = [
  {
    href: "/tonight",
    label: "Tonight",
    title: "Heute & diese Woche",
    desc: "Konzerte, Klubs, Kunst — was wirklich läuft.",
    Icon: CalendarHeart,
  },
  {
    href: "/dine",
    label: "Dine",
    title: "Restaurants & Bars",
    desc: "Reservieren ohne Telefonjagd.",
    Icon: UtensilsCrossed,
  },
  {
    href: "/experience",
    label: "Experience",
    title: "Lokale Erlebnisse",
    desc: "Tasting, Workshops, geführte Touren.",
    Icon: Compass,
  },
  {
    href: "/pulse",
    label: "Pulse",
    title: "Premium-Networking",
    desc: "Kuratierte Dinners, Salons, Insider-Kreis.",
    Icon: Crown,
  },
  {
    href: "/live",
    label: "Live",
    title: "Pop-up & Premium",
    desc: "Candlelight, Secret Suppers, Hochkaräter.",
    Icon: Sparkles,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="container-editorial pt-12 pb-12 md:pt-20 md:pb-16">
        <p className="eyebrow">ZurichTonight · Demo-Prototyp</p>
        <h1 className="font-display text-6xl md:text-8xl mt-3 leading-[0.95] tracking-tight">
          Zürich,
          <br />
          <span className="italic text-burgundy">jetzt.</span>
        </h1>
        <p className="text-ink-muted text-[18px] mt-5 max-w-xl">
          Eine kuratierte Plattform für alles, was die Stadt heute Abend zu
          bieten hat — Konzerte, Tische, Erlebnisse, Premium-Kreise und
          Pop-ups.
        </p>

        <div className="mt-8 max-w-xl">
          <HomeSearch />
        </div>
      </section>

      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-3xl md:text-4xl">Die fünf Module</h2>
          <span className="eyebrow hidden md:inline">Klick dich rein</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {MODULES.map(({ href, label, title, desc, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group block p-6 bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-paper-dim flex items-center justify-center text-burgundy">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="eyebrow">{label}</span>
              </div>
              <h3 className="font-display text-2xl leading-tight">{title}</h3>
              <p className="text-[14px] text-ink-muted mt-2">{desc}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-[13px] font-medium text-burgundy group-hover:gap-2 transition-all">
                Öffnen <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-3xl md:text-4xl">
            Heute Abend in Zürich
          </h2>
          <Link
            href="/tonight"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Alle ansehen →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {TONIGHT_EVENTS.slice(0, 3).map((event) => (
            <Card
              key={event.id}
              module="tonight"
              id={event.id}
              title={event.title}
              href={`/tonight/${event.id}`}
              cover={event.cover_image}
              eyebrow={event.category}
              meta={`${event.datetime} · ${event.venue}`}
              price={event.price}
              vibe_tags={event.vibe_tags}
            />
          ))}
        </div>
      </section>

      <section className="container-editorial pb-20">
        <div className="bg-card border border-line rounded-2xl p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="eyebrow">Newsletter</p>
            <h2 className="font-display text-3xl mt-2 leading-tight">
              Das Beste der Woche, kuratiert.
            </h2>
            <p className="text-[14px] text-ink-muted mt-2">
              Donnerstags, eine E-Mail. Was wir empfehlen, was wir besucht
              haben, was es nirgendwo sonst gibt.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
