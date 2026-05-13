import Link from "next/link";
import {
  ArrowRight,
  Compass,
  MessageSquare,
  ShoppingBag,
  Sparkles,
  Mail,
  Building2,
  Store,
  ScrollText,
  Vote,
  MapPin,
  Calendar,
  Check,
} from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { LivePulsTicker } from "@/components/LivePulsTicker";
import { AIConciergeTeaser } from "@/components/AIConciergeTeaser";
import { SeasonalHero } from "@/components/SeasonalHero";
import { SeasonalOverlay } from "@/components/SeasonalOverlay";
import { CrossModuleLinks } from "@/components/CrossModuleLinks";

const VALUE_STRIP = [
  { Icon: Calendar, label: "Alle Events", desc: "Konzerte, Pop-ups, Märkte, Festivals — kuratiert." },
  { Icon: MapPin, label: "Alle Orte", desc: "Restaurants, Bars, Badis, Museen, Aktivitäten." },
  { Icon: MessageSquare, label: "Die Zürcher Community", desc: "Live-Puls, Nachbarn, Stadt-Dialog." },
];

const HEUTE_PLACEHOLDER = [
  { kind: "event", category: "Konzert" },
  { kind: "ort", category: "Restaurant" },
  { kind: "event", category: "Vernissage" },
  { kind: "ort", category: "Bar" },
  { kind: "event", category: "Markt" },
  { kind: "ort", category: "Aktivität" },
] as const;

const PREMIUM_BULLETS = [
  "Werbefrei und ohne Tracking",
  "Persönlicher Concierge-Service",
  "Insider-Zugang zu Reservationen",
  "Exklusive Pop-ups und Events",
];

export default function HomePage() {
  return (
    <>
      {/* HERO ─────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="relative min-h-[72vh] md:min-h-[82vh] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=1920&q=80"
            alt="Zürich"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <SeasonalOverlay />

          <div className="container-editorial relative pt-20 pb-16 md:pt-32 md:pb-24 text-paper">
            <p className="eyebrow text-paper-dim">ZurichTonight</p>
            <h1 className="font-display text-6xl md:text-8xl mt-3 leading-[0.95] tracking-tight">
              Zürich.
              <br />
              <span className="italic">Jetzt entdecken.</span>
            </h1>
            <p className="text-paper-dim text-[18px] mt-5 max-w-xl">
              Was läuft, wo essen, wen treffen, was bewegt.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/entdecken"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-burgundy text-white font-medium text-[14px] hover:bg-burgundy-dark transition-colors"
              >
                Jetzt entdecken <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper/15 text-paper backdrop-blur border border-paper/30 font-medium text-[14px] hover:bg-paper/25 transition-colors"
              >
                Konto erstellen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WERT-STRIP ────────────────────────────────────────────── */}
      <section className="container-editorial pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {VALUE_STRIP.map(({ Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-paper-dim flex items-center justify-center text-burgundy shrink-0">
                <Icon className="w-5 h-5" strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="font-display text-xl leading-tight">{label}</h3>
                <p className="text-[13px] text-ink-muted mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE-PULS-VORSCHAU ───────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <p className="eyebrow">Live</p>
            <h2 className="font-display text-2xl md:text-3xl mt-1">
              Gerade in Zürich
            </h2>
          </div>
          <Link
            href="/puls"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Zum Puls →
          </Link>
        </div>
        <LivePulsTicker />
      </section>

      {/* SAISON-HERO ─────────────────────────────────────────── */}
      <section className="container-editorial pb-16">
        <SeasonalHero
          title="Sechseläuten"
          subtitle="Bööggverbrennen · Bellevue · Zünfte"
          href="/entdecken/kalender?view=year"
          targetISO="2026-04-20"
          image="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80"
        />
      </section>

      {/* HEUTE IN ZÜRICH ─────────────────────────────────────── */}
      <section className="container-editorial pb-16">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow">Heute</p>
            <h2 className="font-display text-3xl md:text-4xl mt-1">
              Heute in Zürich
            </h2>
          </div>
          <Link
            href="/entdecken"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Alle ansehen →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {HEUTE_PLACEHOLDER.map((c, i) => (
            <article
              key={i}
              className="bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow overflow-hidden flex flex-col"
            >
              <div className="aspect-[5/3] bg-paper-dim flex items-center justify-center text-ink-faint">
                <span className="text-[11px] uppercase tracking-wider">
                  [Bild]
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.18em] text-burgundy">
                  {c.kind === "event" ? "Event" : "Ort"} · {c.category}
                </p>
                <h3 className="font-display text-xl mt-1.5 leading-tight">
                  [Titel folgt in Phase 2]
                </h3>
                <p className="text-[13px] text-ink-muted mt-2 flex-1">
                  [Kurzbeschreibung, Distrikt, Uhrzeit folgen in Phase 2.]
                </p>
                <CrossModuleLinks
                  links={
                    c.kind === "event"
                      ? [
                          { label: "Posts dazu", href: "/puls" },
                          { label: "Bars in der Nähe", href: "/entdecken/orte" },
                          { label: "Tickets im Tausch", href: "/markt" },
                        ]
                      : [
                          { label: "Events heute hier", href: "/entdecken/kalender" },
                          { label: "WG-Inserate im Quartier", href: "/markt" },
                          { label: "Posts diese Woche", href: "/puls" },
                        ]
                  }
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AI-CONCIERGE ─────────────────────────────────────────── */}
      <section className="container-editorial pb-16">
        <div className="max-w-3xl mx-auto">
          <AIConciergeTeaser variant="hero" />
        </div>
      </section>

      {/* STADT-DIALOG-VORSCHAU ────────────────────────────────── */}
      <section className="bg-[#1c1f24] text-paper py-16 -mx-0">
        <div className="container-editorial">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="eyebrow text-paper-dim">Stadt-Dialog</p>
              <h2
                className="text-3xl md:text-4xl mt-1 font-display"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Was die Stadt bewegt
              </h2>
            </div>
            <Link
              href="/stadt-dialog"
              className="text-[13px] font-medium text-paper hover:underline"
            >
              Zum Stadt-Dialog →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                Icon: ScrollText,
                eyebrow: "Aktuelle Initiative",
                title: "[Initiative folgt in Phase 2]",
              },
              {
                Icon: Vote,
                eyebrow: "Frage des Tages",
                title: "[Frage folgt in Phase 2]",
              },
              {
                Icon: MessageSquare,
                eyebrow: "Stadtteil-Diskussion",
                title: "[Diskussion folgt in Phase 2]",
              },
            ].map(({ Icon, eyebrow, title }, i) => (
              <Link
                key={i}
                href="/stadt-dialog"
                className="block bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-paper" strokeWidth={1.6} />
                </div>
                <p className="eyebrow text-paper-dim">{eyebrow}</p>
                <h3
                  className="text-xl mt-1.5 leading-tight font-display text-paper"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ANBIETER-STRIP ───────────────────────────────────────── */}
      <section className="container-editorial py-12">
        <div className="bg-paper-dim/60 border border-line rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-burgundy shrink-0">
              <Store className="w-5 h-5" strokeWidth={1.6} />
            </div>
            <p className="text-[14px] text-ink-muted leading-relaxed">
              Restaurants, Bars, Veranstalter, Locations — werdet Teil von
              Zürich&apos;s digitalem Wohnzimmer.
            </p>
          </div>
          <Link
            href="/for-providers"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-line bg-card text-[13px] font-medium hover:border-burgundy hover:text-burgundy transition-colors shrink-0"
          >
            Anbieter werden <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* PREMIUM-VORSCHAU ─────────────────────────────────────── */}
      <section className="container-editorial pb-16">
        <div className="bg-card border border-line rounded-3xl p-8 md:p-10 grid md:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-burgundy" strokeWidth={1.8} />
              <p className="eyebrow">Züri Premium</p>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-burgundy/10 text-burgundy text-[10px] font-medium">
                Kommt 2027
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              Die Stadt, kuratiert für dich.
            </h2>
            <p className="text-[14px] text-ink-muted mt-3 max-w-md">
              Premium-Erlebnis für alle, die mehr von Zürich wollen — ohne
              Werbung, mit persönlichem Concierge.
            </p>
          </div>
          <ul className="space-y-3">
            {PREMIUM_BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-burgundy/10 flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-3 h-3 text-burgundy" strokeWidth={2.4} />
                </span>
                <span className="text-[14px]">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEWSLETTER ───────────────────────────────────────────── */}
      <section id="newsletter" className="container-editorial pb-20">
        <div className="bg-card border border-line rounded-2xl p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-burgundy" strokeWidth={1.8} />
              <p className="eyebrow">Newsletter</p>
            </div>
            <h2 className="font-display text-3xl mt-2 leading-tight">
              Freitags um 17:00 — die besten Pläne fürs Wochenende.
            </h2>
            <p className="text-[14px] text-ink-muted mt-2">
              Eine E-Mail. Was wir empfehlen, was wir besucht haben, was es
              nirgendwo sonst gibt.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
