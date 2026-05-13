import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  Mail,
  Store,
  ScrollText,
  Vote,
  MapPin,
  Calendar,
  Users,
  Zap,
  Key,
  Heart,
} from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { LivePulsTicker } from "@/components/LivePulsTicker";
import { AIConciergeTeaser } from "@/components/AIConciergeTeaser";
import { SeasonalHero } from "@/components/SeasonalHero";
import { HeroSlider } from "@/components/HeroSlider";
import { LiveCounter } from "@/components/LiveCounter";
import { CrossModuleLinks } from "@/components/CrossModuleLinks";

const VALUE_STRIP = [
  {
    Icon: Sparkles,
    label: "Alle Events",
    desc: "Vom Sechseläuten bis zum Geheim-Konzert",
  },
  {
    Icon: MapPin,
    label: "Alle Orte",
    desc: "Bars, Tische, Badis, Märkte, Museen",
  },
  {
    Icon: Users,
    label: "Die Community",
    desc: "10'247 Zürcher im Wohnzimmer",
  },
];

const HEUTE_CARDS = [
  {
    kind: "Konzert",
    district: "Kreis 1",
    title: "Klang & Kerzenschein — Vivaldi bei Nacht",
    desc: "Vier Jahreszeiten bei 800 Kerzen — Schauspielhaus",
    meta: "Heute 20:00 · ab CHF 39",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=70",
    cross: [
      { label: "12 Posts dazu", href: "/puls" },
      { label: "3 Bars in der Nähe", href: "/entdecken/orte" },
      { label: "2 Tickets im Tausch", href: "/markt" },
    ],
    href: "/tonight/klang-kerzenschein",
  },
  {
    kind: "Ort · Kreis 5",
    district: "Kreis 5",
    title: "Frau Gerolds Garten — Sommer-Abend",
    desc: "Container-Bar mit Stadt-Blick, BBQ ab 18 Uhr",
    meta: "Mi–So · ab 17 Uhr",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=70",
    cross: [
      { label: "4 Pop-ups hier", href: "/entdecken" },
      { label: "17 Posts diese Woche", href: "/puls" },
      { label: "WG-Inserate Kreis 5", href: "/markt" },
    ],
    href: "/entdecken/orte",
  },
  {
    kind: "Ausstellung · Kreis 5",
    district: "Kreis 5",
    title: "Vernissage 'Stille Stadt' — Anna Berger",
    desc: "Photobastei, Eröffnung 19 Uhr, gratis",
    meta: "Heute 19:00 · Gratis",
    image:
      "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=900&q=70",
    cross: [
      { label: "3 Posts dazu", href: "/puls" },
      { label: "Photobastei-Bar", href: "/entdecken/orte" },
    ],
    href: "/tonight/vernissage-stille-stadt",
  },
  {
    kind: "Workshop · Kreis 5",
    district: "Kreis 5",
    title: "Pottery für Anfänger",
    desc: "Atelier Kreis 5, 18–21 Uhr, CHF 95 inkl. Material",
    meta: "Heute 18:00 · 4 Plätze frei",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=70",
    cross: [
      { label: "4 Plätze frei", href: "/markt" },
      { label: "6 Posts dazu", href: "/puls" },
    ],
    href: "/entdecken",
  },
  {
    kind: "Bar · Kreis 1",
    district: "Kreis 1",
    title: "Old Crow — neues Cocktail-Menu",
    desc: "Speakeasy, neues Frühlings-Menu seit gestern",
    meta: "Mi–Sa · ab 18 Uhr",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=70",
    cross: [
      { label: "23 Posts diese Woche", href: "/puls" },
      { label: "2 Tische via Reservation", href: "/entdecken/orte" },
    ],
    href: "/entdecken/orte",
  },
  {
    kind: "Fine Dining · Kreis 1",
    district: "Kreis 1",
    title: "IGNIV by Andreas Caminada",
    desc: "Sharing-Konzept des Bündner Spitzenkochs",
    meta: "Reservation möglich · CHF 180–280",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=70",
    cross: [
      { label: "Reservation möglich", href: "/dine/igniv" },
      { label: "8 Posts diese Woche", href: "/puls" },
    ],
    href: "/dine/igniv",
  },
];

const STADT_DIALOG_PREVIEW = [
  {
    Icon: ScrollText,
    eyebrow: "Aktuelle Initiative · 2'347 Stimmen",
    title: "24h-Tram zwischen Niederdorf und HB am Wochenende",
    meta: "67% dafür · 34 Tage bis Stimmschluss",
    progress: 67,
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=70",
  },
  {
    Icon: Vote,
    eyebrow: "Frage des Tages · 5'453 Stimmen",
    title: "Bester Glace-Laden Zürichs?",
    meta: "Gelati Da Mimmo 38% · Movenpick 23% · Mr. Lee 18%",
    progress: 38,
    image:
      "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?auto=format&fit=crop&w=900&q=70",
  },
  {
    Icon: MessageSquare,
    eyebrow: "Stadtteil-Diskussion · Kreis 4",
    title: "Bahnhofplatz-Neugestaltung — was haltet ihr?",
    meta: "1'892 Stimmen · 432 Kommentare · 7 Tage offen",
    progress: 54,
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=70",
  },
];

const PREMIUM_FEATURES = [
  {
    Icon: Sparkles,
    title: "Werbefrei und ohne Sponsored-Einträge",
  },
  {
    Icon: Zap,
    title: "Concierge: Tische, Tickets, Anfragen in Minuten",
  },
  {
    Icon: Key,
    title: "Insider-Zugang zu Pop-ups, bevor sie öffentlich werden",
  },
  {
    Icon: Heart,
    title: "Exklusive Premium-Events: Kochabende, Galerie-Privatführungen",
  },
];

const PROVIDER_LOGOS = ["IGNIV", "Kronenhalle", "Schauspielhaus", "Maag Halle"];

export default function HomePage() {
  return (
    <>
      {/* HERO ─────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="relative min-h-[78vh] md:min-h-[86vh] overflow-hidden">
          <HeroSlider />

          {/* Live-Counter, top right */}
          <div className="absolute top-5 right-5 z-10 px-3 py-1.5 rounded-full bg-ink/40 backdrop-blur border border-white/15 text-paper text-[12px]">
            <LiveCounter className="text-paper [&_strong]:text-paper" />
          </div>

          {/* Demo-Banner, top */}
          <div className="absolute top-0 inset-x-0 z-10 bg-burgundy/85 text-paper text-center py-1.5 text-[11px] uppercase tracking-[0.18em]">
            Visions-Prototyp · Zürich 2036
          </div>

          <div className="container-editorial relative pt-28 pb-16 md:pt-40 md:pb-28 text-paper">
            <p className="eyebrow text-paper-dim">ZurichTonight · Mai 2026</p>
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
            href="/puls/live"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Zum Live-Puls →
          </Link>
        </div>
        <LivePulsTicker />
      </section>

      {/* SAISON-HERO — ZURICH PRIDE 2026 ─────────────────────── */}
      <section className="container-editorial pb-16">
        <SeasonalHero
          title="Zurich Pride 2026"
          subtitle="6.–13. Juni · Kasernenareal · 50'000+ Menschen"
          href="/entdecken/kalender?view=year"
          targetISO="2026-06-06"
          image="https://images.unsplash.com/photo-1561612217-e5147162fd31?auto=format&fit=crop&w=1600&q=70"
        />
        <p className="text-[14px] text-ink-muted mt-5 max-w-2xl leading-relaxed">
          Zurich Pride bringt jedes Jahr über 50'000 Menschen auf die Strassen
          — bunte Parade, Konzerte am Kasernenareal, Filme, Talks, Partys. Das
          Festival ist seit 1994 fester Teil des Zürcher Sommerkalenders.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/entdecken/kalender?view=year"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-burgundy text-white text-[13px] font-medium hover:bg-burgundy-dark transition-colors"
          >
            Zum Pride-Programm <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-line bg-card text-[13px] font-medium hover:border-burgundy hover:text-burgundy transition-colors"
          >
            In meinen Kalender
          </Link>
        </div>
      </section>

      {/* HEUTE IN ZÜRICH ─────────────────────────────────────── */}
      <section className="container-editorial pb-16">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow">Heute · 13. Mai 2026</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {HEUTE_CARDS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-all overflow-hidden flex flex-col"
            >
              <div className="aspect-[5/3] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.18em] text-burgundy">
                  {c.kind}
                </p>
                <h3 className="font-display text-xl mt-1.5 leading-tight">
                  {c.title}
                </h3>
                <p className="text-[13px] text-ink-muted mt-2">{c.desc}</p>
                <p className="text-[12px] text-ink-faint mt-3">{c.meta}</p>
                <CrossModuleLinks links={c.cross} />
              </div>
            </Link>
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
      <section className="bg-[#1c1f24] text-paper py-16">
        <div className="container-editorial">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="eyebrow text-paper-dim">Stadt-Dialog</p>
              <h2 className="text-3xl md:text-4xl mt-1 font-display">
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
            {STADT_DIALOG_PREVIEW.map(
              ({ Icon, eyebrow, title, meta, progress, image }) => (
                <Link
                  key={title}
                  href="/stadt-dialog"
                  className="group block bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.08] transition-colors"
                >
                  <div className="aspect-[16/9] relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1f24] to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon
                        className="w-4 h-4 text-paper-dim"
                        strokeWidth={1.6}
                      />
                      <p className="eyebrow text-paper-dim">{eyebrow}</p>
                    </div>
                    <h3 className="text-xl leading-tight font-display text-paper">
                      {title}
                    </h3>
                    <div className="mt-4">
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-brass rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-[12px] text-paper-dim mt-2">{meta}</p>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* ANBIETER-STRIP ───────────────────────────────────────── */}
      <section className="container-editorial py-12">
        <div className="bg-gradient-to-r from-paper-dim/80 via-paper-dim/60 to-paper-dim/80 border border-line rounded-2xl p-6 md:p-8 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-burgundy shrink-0">
              <Store className="w-5 h-5" strokeWidth={1.6} />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-2xl leading-tight">
                Du betreibst ein Restaurant, eine Bar, organisierst Events?
              </h3>
              <p className="text-[13.5px] text-ink-muted mt-1.5 leading-relaxed">
                200+ Zürcher Anbieter erreichen bereits über 10'000 lokale
                Gäste.
              </p>
            </div>
            <Link
              href="/for-providers"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-burgundy text-white text-[13px] font-medium hover:bg-burgundy-dark transition-colors shrink-0"
            >
              Anbieter werden <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PROVIDER_LOGOS.map((l) => (
              <div
                key={l}
                className="h-12 rounded-xl bg-card border border-line flex items-center justify-center text-[11px] uppercase tracking-[0.18em] text-ink-faint"
              >
                Logo {l}
              </div>
            ))}
          </div>
          <Link
            href="/for-providers"
            className="md:hidden inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-burgundy text-white text-[13px] font-medium hover:bg-burgundy-dark transition-colors"
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
                Kommt 2027 · CHF 29/Monat
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              Die Stadt, kuratiert für dich.
            </h2>
            <p className="text-[14px] text-ink-muted mt-3 max-w-md">
              Premium-Erlebnis für alle, die mehr von Zürich wollen — ohne
              Werbung, mit persönlichem Concierge.
            </p>
            <button className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-burgundy text-white text-[13px] font-medium hover:bg-burgundy-dark transition-colors">
              Auf Warteliste setzen
            </button>
          </div>
          <ul className="space-y-3">
            {PREMIUM_FEATURES.map(({ Icon, title }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-burgundy/10 flex items-center justify-center mt-0.5 shrink-0">
                  <Icon
                    className="w-4 h-4 text-burgundy"
                    strokeWidth={1.8}
                  />
                </span>
                <span className="text-[14px] leading-snug pt-1">{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEWSLETTER ───────────────────────────────────────────── */}
      <section id="newsletter" className="container-editorial pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1600&q=60"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/70 to-ink/40" />
          <div className="relative p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center text-paper">
            <div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brass" strokeWidth={1.8} />
                <p className="eyebrow text-paper-dim">Newsletter</p>
              </div>
              <h2 className="font-display text-3xl mt-2 leading-tight">
                Freitags um 17:00 — die besten Pläne fürs Wochenende.
              </h2>
              <p className="text-[14px] text-paper-dim mt-2">
                Eine E-Mail. Was wir empfehlen, was wir besucht haben, was es
                nirgendwo sonst gibt.
              </p>
              <p className="text-[12px] text-paper-dim mt-3">
                <strong className="text-paper">8'342</strong> Zürcher lesen
                jeden Freitag mit.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
