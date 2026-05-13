import Link from "next/link";
import {
  ArrowRight,
  ArrowBigUp,
  Calendar,
  Heart,
  Baby,
  ShoppingBag,
  MessageSquare,
  Megaphone,
  Users,
  Compass,
} from "lucide-react";
import {
  LISTINGS_ALL,
  PULS_POSTS,
  MARKT_LISTINGS,
  DAILY_POLL,
  INITIATIVES,
  PULS_ACTIVE_NOW,
  PULS_WEEK_STATS,
  DISTRICT_SPOTLIGHT,
  ENTDECKEN_LIVE_COUNTS,
} from "@/lib/data";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HomeSearch } from "@/components/HomeSearch";
import { HeroSlider } from "@/components/HeroSlider";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { OnboardingTour } from "@/components/OnboardingTour";

const SMART_CARDS = [
  {
    href: "/entdecken/kalender?view=today",
    title: "Heute Abend",
    desc: "Konzerte, Pop-ups, Vernissagen, Parties — was diese Nacht läuft.",
    Icon: Calendar,
  },
  {
    href: "/entdecken/orte?stil=Date+Night",
    title: "Date Night",
    desc: "Premium-Tische, Candlelight-Konzerte, intime Bars für zwei.",
    Icon: Heart,
  },
  {
    href: "/entdecken/orte?stil=Familie",
    title: "Mit der Familie",
    desc: "Badis, Museen, Aktivitäten, Märkte — kinderfreundlich.",
    Icon: Baby,
  },
];

export default function HomePage() {
  const livePulsPosts = PULS_POSTS.slice()
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 3);

  const topListings = [
    ...LISTINGS_ALL.filter((l) => l.kind === "place" && l.trending).slice(0, 3),
    ...LISTINGS_ALL.filter((l) => l.kind === "event" && l.trending).slice(0, 3),
  ].slice(0, 6);

  const districtListings = LISTINGS_ALL.filter(
    (l) => l.district === DISTRICT_SPOTLIGHT.district,
  ).slice(0, 4);

  const marktHighlights = [
    MARKT_LISTINGS.find((l) => l.id === "m7"),
    MARKT_LISTINGS.find((l) => l.id === "m1"),
    MARKT_LISTINGS.find((l) => l.id === "m17"),
  ].filter(Boolean) as typeof MARKT_LISTINGS;

  const newInitiatives = INITIATIVES.slice(0, 2);
  const pollTotal = DAILY_POLL.options.reduce((s, o) => s + o.votes, 0);

  return (
    <>
      {/* HERO ─────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="relative min-h-[78vh] md:min-h-[86vh] overflow-hidden">
          <HeroSlider />
          <div className="container-editorial relative pt-20 pb-16 md:pt-32 md:pb-24">
            <p className="eyebrow">ZurichTonight · Demo-Prototyp</p>
            <h1 className="font-display text-6xl md:text-8xl mt-3 leading-[0.95] tracking-tight">
              Zürich,
              <br />
              <span className="italic text-burgundy">jetzt.</span>
            </h1>
            <p className="text-ink-muted text-[18px] mt-5 max-w-xl">
              Entdecke, was diese Stadt heute Abend zu bieten hat —
              Konzerte, Tische, Orte, Erlebnisse.
            </p>

            <div className="mt-8 max-w-xl">
              <HomeSearch />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink-muted">
              <span>
                <strong className="text-ink font-medium">
                  {ENTDECKEN_LIVE_COUNTS.events}
                </strong>{" "}
                Events
              </span>
              <span>·</span>
              <span>
                <strong className="text-ink font-medium">
                  {ENTDECKEN_LIVE_COUNTS.places}
                </strong>{" "}
                Orte
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy zb-pulse" />
                <strong className="text-ink font-medium">
                  {PULS_ACTIVE_NOW.toLocaleString("de-CH")}
                </strong>{" "}
                Zürcher online
              </span>
            </div>

            <p className="text-[13px] text-ink-faint mt-3 italic max-w-md">
              Das digitale Wohnzimmer aller Zürcher. Entdecke, vernetze, gestalte mit.
            </p>
          </div>
        </div>
      </section>

      {/* PERFEKT FÜR HEUTE ─────────────────────────────────── */}
      <section className="container-editorial pt-12 pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Smart Filter</p>
            <h2 className="font-display text-3xl md:text-4xl">
              Perfekt für heute
            </h2>
          </div>
          <Link
            href="/entdecken"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Alle Filter →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {SMART_CARDS.map(({ href, title, desc, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group block p-6 bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl mt-4 leading-tight">{title}</h3>
              <p className="text-[14px] text-ink-muted mt-2">{desc}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-[13px] font-medium text-burgundy group-hover:gap-2 transition-all">
                Ansehen <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* LIVE AUS DEM PULS ─────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Community · Jetzt</p>
            <h2 className="font-display text-3xl md:text-4xl">Live aus dem Puls</h2>
          </div>
          <Link
            href="/puls"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Zum Feed →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {livePulsPosts.map((p) => (
            <Link
              key={p.id}
              href="/puls"
              className="block p-5 bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow"
            >
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.avatar}
                  alt=""
                  className="w-7 h-7 rounded-full bg-paper-dim"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium leading-none">@{p.author}</p>
                  <p className="text-[10.5px] text-ink-faint mt-0.5">
                    {p.district} · {p.ago}
                  </p>
                </div>
              </div>
              <p className="text-[14px] mt-3 line-clamp-3 leading-snug">{p.text}</p>
              <div className="mt-3 flex items-center gap-3 text-[11.5px] text-ink-muted">
                <span className="inline-flex items-center gap-1">
                  <ArrowBigUp className="w-3.5 h-3.5" /> {p.upvotes}
                </span>
                <span>{p.comments_count} Kommentare</span>
                {p.tags[0] && (
                  <span className="ml-auto text-[10.5px] px-2 py-0.5 rounded-full bg-paper-dim">
                    #{p.tags[0]}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WAS DIE STADT FRAGT ──────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Puls · Stadt-Stimmen</p>
            <h2 className="font-display text-3xl md:text-4xl">Was die Stadt fragt</h2>
          </div>
          <Link
            href="/puls/stimmen"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Alle Initiativen →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          <Link
            href="/puls/stimmen"
            className="p-6 bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow"
          >
            <p className="eyebrow">Frage des Tages</p>
            <h3 className="font-display text-2xl mt-1.5 leading-tight">
              {DAILY_POLL.question}
            </h3>
            <div className="mt-4 space-y-1.5">
              {DAILY_POLL.options.slice(0, 3).map((o) => {
                const pct = Math.round((o.votes / pollTotal) * 100);
                return (
                  <div key={o.id}>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-medium">{o.label}</span>
                      <span className="text-ink-faint tabular-nums">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-paper-dim rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-burgundy/60"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-ink-faint mt-3">
              {pollTotal.toLocaleString("de-CH")} Stimmen heute · Klick zum Abstimmen
            </p>
          </Link>

          <Link
            href="/puls/stimmen"
            className="p-6 bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow"
          >
            <p className="eyebrow">Neue Initiativen</p>
            <h3 className="font-display text-2xl mt-1.5 leading-tight">
              2 neue Bürger-Initiativen diese Woche
            </h3>
            <ul className="mt-4 space-y-2.5">
              {newInitiatives.map((i) => (
                <li key={i.id} className="flex items-start gap-3">
                  <ArrowBigUp className="w-4 h-4 text-burgundy mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] leading-tight line-clamp-1">
                      {i.title}
                    </p>
                    <p className="text-[11px] text-ink-faint mt-0.5">
                      {i.upvotes.toLocaleString("de-CH")} Stimmen ·{" "}
                      {i.comments_count} Kommentare
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Link>
        </div>
      </section>

      {/* RECENTLY VIEWED ──────────────────────────────────── */}
      <RecentlyViewed />

      {/* TOP LISTINGS (mixed) ─────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Beliebt diese Woche</p>
            <h2 className="font-display text-3xl md:text-4xl">
              Entdecke die beliebtesten Orte
            </h2>
          </div>
          <Link
            href="/entdecken"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Alle ansehen →
          </Link>
        </div>
        <div className="flex md:grid gap-4 md:gap-5 md:grid-cols-3 lg:grid-cols-6 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory pb-2">
          {topListings.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className="snap-start shrink-0 w-[70%] sm:w-[40%] md:w-auto group block bg-card border border-line rounded-xl overflow-hidden card-shadow-hover transition-shadow"
            >
              <div className="aspect-[5/4] bg-paper-dim relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.cover_image}
                  alt={l.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    l.kind === "event"
                      ? "bg-burgundy text-paper"
                      : "bg-ink text-paper"
                  }`}
                >
                  {l.kind === "event" ? "Event" : "Ort"}
                </span>
              </div>
              <div className="p-3">
                <p className="text-[10.5px] uppercase tracking-wider text-ink-faint truncate">
                  {l.category_label}
                </p>
                <p className="font-display text-[15px] leading-tight mt-0.5 line-clamp-2 group-hover:text-burgundy transition-colors">
                  {l.title}
                </p>
                <p className="text-[11.5px] text-ink-muted mt-1">{l.district}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DISTRICT SPOTLIGHT ───────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Stadtteil im Fokus</p>
            <h2 className="font-display text-3xl md:text-4xl">
              Diese Woche: {DISTRICT_SPOTLIGHT.district}
            </h2>
          </div>
          <Link
            href={`/entdecken/orte?stadtteil=${encodeURIComponent(DISTRICT_SPOTLIGHT.district)}`}
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Alle Orte →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {districtListings.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className="group block bg-card border border-line rounded-xl overflow-hidden card-shadow-hover transition-shadow"
            >
              <div className="aspect-square bg-paper-dim">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.cover_image}
                  alt={l.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <p className="font-display text-[14px] leading-tight line-clamp-2">
                  {l.title}
                </p>
                <p className="text-[11px] text-ink-faint mt-1">
                  {l.category_label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MARKT HOT DEALS ──────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Markt · Hot Deals</p>
            <h2 className="font-display text-3xl md:text-4xl">
              Aktuelle Anzeigen
            </h2>
          </div>
          <Link
            href="/markt"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Alle Anzeigen →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marktHighlights.map((l) => (
            <Link
              key={l.id}
              href="/markt"
              className="block bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow overflow-hidden"
            >
              {l.images?.[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.images[0]} alt="" className="w-full h-36 object-cover" />
              )}
              <div className="p-4">
                <span className="text-[10.5px] uppercase tracking-wider text-burgundy">
                  {l.district}
                </span>
                <h3 className="font-display text-[17px] mt-1 leading-tight line-clamp-2">
                  {l.title}
                </h3>
                {l.price && (
                  <p className="text-[12.5px] font-medium text-burgundy mt-1.5">
                    {l.price}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MEGA-TAB OVERVIEW ────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-3xl md:text-4xl">Vier Bereiche</h2>
          <span className="eyebrow hidden md:inline">Eine App, klar strukturiert</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {[
            {
              href: "/entdecken",
              label: "Entdecken",
              desc: "Alle Events und Orte mit 3-Achsen-Filter: Was · Wann · Stil.",
              Icon: Compass,
            },
            {
              href: "/puls",
              label: "Puls",
              desc: "Community-Feed, Stadt-Stimmen und Live-Updates.",
              Icon: MessageSquare,
            },
            {
              href: "/markt",
              label: "Markt",
              desc: "WG, Jobs, Möbel, Sitter — unter Nachbarn.",
              Icon: ShoppingBag,
            },
            {
              href: "/profile",
              label: "Profil",
              desc: "Bookmarks, Posts, Anzeigen, Buchungen.",
              Icon: Users,
            },
          ].map(({ href, label, desc, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group block p-6 bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-paper-dim flex items-center justify-center text-burgundy">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl mt-4 leading-tight">{label}</h3>
              <p className="text-[13px] text-ink-muted mt-2">{desc}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-[13px] font-medium text-burgundy group-hover:gap-2 transition-all">
                Öffnen <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* COMMUNITY BANNER ─────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div
          className="relative rounded-3xl overflow-hidden bg-ink text-paper p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #0a1733 0%, #093a82 55%, #0f4da8 100%)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-brass" />
              <span className="eyebrow text-paper-dim">Werde Teil der Community</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              10&apos;247 Zürcher · {PULS_WEEK_STATS.posts.toLocaleString("de-CH")}{" "}
              Posts diese Woche.
            </h2>
            <p className="text-paper-dim text-[15px] mt-3 max-w-xl">
              Aktuell <strong className="text-paper">komplett gratis</strong> — wir
              bauen die Zürcher Community auf.
            </p>
          </div>
          <Link
            href="/puls"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper text-ink font-medium text-[14px] hover:bg-paper-dim transition-colors shrink-0"
          >
            Anmelden — gratis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <OnboardingTour />

      {/* NEWSLETTER ───────────────────────────────────────────── */}
      <section className="container-editorial pb-20">
        <div className="bg-card border border-line rounded-2xl p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="eyebrow">Newsletter</p>
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
