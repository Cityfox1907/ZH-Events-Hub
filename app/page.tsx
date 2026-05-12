import Link from "next/link";
import {
  ArrowRight,
  CalendarHeart,
  UtensilsCrossed,
  Sparkles,
  TrendingUp,
  Flame,
  Plus,
  MessageCircle,
  Megaphone,
  Tag,
  ArrowBigUp,
  Users,
} from "lucide-react";
import { Card } from "@/components/Card";
import {
  TONIGHT_EVENTS,
  DINE_VENUES,
  EXPERIENCES,
  LIVE_EVENTS,
  PULS_POSTS,
  MARKT_LISTINGS,
  DAILY_POLL,
  INITIATIVES,
  PULS_ACTIVE_NOW,
  PULS_WEEK_STATS,
  trendingDine,
  trendingTonight,
  newlyAdded,
  nearlySoldOut,
} from "@/lib/data";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HomeSearch } from "@/components/HomeSearch";
import { HeroSlider } from "@/components/HeroSlider";
import { DistrictExplorer } from "@/components/DistrictExplorer";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { OnboardingTour } from "@/components/OnboardingTour";

const MODULES = [
  {
    href: "/entdecken",
    label: "Entdecken",
    title: "Alle Events",
    desc: "Konzerte, Pop-ups, Theater, Workshops, Märkte — was diese Woche passiert.",
    Icon: CalendarHeart,
  },
  {
    href: "/orte",
    label: "Orte",
    title: "Restaurants, Bars, Badis, Museen",
    desc: "Alle Orte, die immer da sind — Restaurants reservieren, Badis finden, Museen entdecken.",
    Icon: UtensilsCrossed,
  },
  {
    href: "/puls",
    label: "Puls",
    title: "Community-Feed",
    desc: "Tipps, Fragen, Live-Updates aus der Stadt.",
    Icon: MessageCircle,
  },
  {
    href: "/markt",
    label: "Markt",
    title: "Lokale Anzeigen",
    desc: "WG, Jobs, Möbel, Sitter — unter Nachbarn.",
    Icon: Tag,
  },
  {
    href: "/stimmen",
    label: "Stimmen",
    title: "Stadt-Demokratie",
    desc: "Umfragen, Bürger-Initiativen, Stadt-Index.",
    Icon: Megaphone,
  },
];

export default function HomePage() {
  const todayEvents = TONIGHT_EVENTS.filter((e) => e.bucket === "today").slice(0, 3);
  const curatedHighlights = [
    ...TONIGHT_EVENTS.filter((e) => e.bucket === "weekend").slice(0, 2),
    DINE_VENUES[0],
    EXPERIENCES[0],
    LIVE_EVENTS[2],
    LIVE_EVENTS[5],
  ];
  const trendingD = trendingDine();
  const newItems = newlyAdded();
  const nearSoldOut = nearlySoldOut();
  const livePulsPosts = PULS_POSTS.slice()
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 3);
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
              Entdecke, was diese Stadt heute Abend zu bieten hat — Konzerte,
              Tische, Erlebnisse, Pop-ups, Premium-Kreise.
            </p>

            <div className="mt-8 max-w-xl">
              <HomeSearch />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy zb-pulse" />
                <span><strong className="text-ink font-medium">{PULS_ACTIVE_NOW.toLocaleString("de-CH")}</strong> Zürcher online</span>
              </span>
              <span className="hidden sm:inline">·</span>
              <span><strong className="text-ink font-medium">127</strong> Events heute</span>
              <span className="hidden sm:inline">·</span>
              <span><strong className="text-ink font-medium">{PULS_WEEK_STATS.posts.toLocaleString("de-CH")}</strong> Posts diese Woche</span>
            </div>

            <p className="text-[13px] text-ink-faint mt-3 italic max-w-md">
              Das digitale Wohnzimmer aller Zürcher. Entdecke, vernetze, gestalte mit.
            </p>
          </div>
        </div>
      </section>

      {/* LIVE AUS DEM PULS ─────────────────────────────────────── */}
      <section className="container-editorial pt-12 pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Community · Jetzt</p>
            <h2 className="font-display text-3xl md:text-4xl">Live aus dem Puls</h2>
          </div>
          <Link
            href="/puls"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Alle Posts →
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
                <img src={p.avatar} alt="" className="w-7 h-7 rounded-full bg-paper-dim" />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium leading-none">@{p.author}</p>
                  <p className="text-[10.5px] text-ink-faint mt-0.5">{p.district} · {p.ago}</p>
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

      {/* HEUTE ABEND ──────────────────────────────────────────── */}
      <section className="container-editorial pt-12 pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-3xl md:text-4xl">
            Heute Abend in Zürich
          </h2>
          <Link
            href="/entdecken"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Alle ansehen →
          </Link>
        </div>
        <div className="flex md:grid gap-4 md:gap-5 md:grid-cols-3 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory pb-2">
          {todayEvents.map((event) => (
            <div key={event.id} className="snap-start shrink-0 w-[88%] sm:w-[60%] md:w-auto">
              <Card
                module="tonight"
                id={event.id}
                title={event.title}
                href={`/tonight/${event.id}`}
                cover={event.cover_image}
                eyebrow={event.category}
                meta={`${event.datetime} · ${event.venue}`}
                price={event.price}
                vibe_tags={event.vibe_tags}
                trending={event.trending}
                ticketsLeft={event.tickets_left}
                showShare
              />
            </div>
          ))}
        </div>
      </section>

      {/* RECENTLY VIEWED ──────────────────────────────────────── */}
      <RecentlyViewed />

      {/* WAS DIE STADT FRAGT ──────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Stimmen · Stadt-Demokratie</p>
            <h2 className="font-display text-3xl md:text-4xl">Was die Stadt fragt</h2>
          </div>
          <Link
            href="/stimmen"
            className="text-[13px] font-medium text-burgundy hover:underline"
          >
            Alle Initiativen →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {/* Poll preview */}
          <Link
            href="/stimmen"
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
                      <span className="font-medium">{o.emoji} {o.label}</span>
                      <span className="text-ink-faint tabular-nums">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-paper-dim rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-burgundy/60" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-ink-faint mt-3">
              {pollTotal.toLocaleString("de-CH")} Stimmen heute · Klick zum Abstimmen
            </p>
          </Link>

          {/* Initiatives preview */}
          <Link
            href="/stimmen"
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
                    <p className="text-[13.5px] leading-tight line-clamp-1">{i.title}</p>
                    <p className="text-[11px] text-ink-faint mt-0.5">
                      {i.upvotes.toLocaleString("de-CH")} Stimmen · {i.comments_count} Kommentare
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Link>
        </div>
      </section>

      {/* MARKT HOT DEALS ──────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Markt · Lokale Anzeigen</p>
            <h2 className="font-display text-3xl md:text-4xl">Hot Deals diese Woche</h2>
          </div>
          <Link href="/markt" className="text-[13px] font-medium text-burgundy hover:underline">
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
                  <p className="text-[12.5px] font-medium text-burgundy mt-1.5">{l.price}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MODULE ───────────────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-3xl md:text-4xl">Die acht Module</h2>
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

      {/* DIESE WOCHE ENTDECKEN ────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Kuratiert für dich</p>
            <h2 className="font-display text-3xl md:text-4xl">Diese Woche entdecken</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {curatedHighlights.map((item) => {
            if (!item) return null;
            // detect type via key presence
            if ("price_band" in item) {
              return (
                <Card
                  key={`tonight-${item.id}`}
                  module="tonight"
                  id={item.id}
                  title={item.title}
                  href={`/tonight/${item.id}`}
                  cover={item.cover_image}
                  eyebrow={`Tonight · ${item.category}`}
                  meta={`${item.datetime} · ${item.venue}`}
                  price={item.price}
                  vibe_tags={item.vibe_tags}
                />
              );
            }
            if ("price_range" in item && "tickets_available" in item) {
              return (
                <Card
                  key={`live-${item.id}`}
                  module="live"
                  id={item.id}
                  title={item.title}
                  href={`/live/${item.id}`}
                  cover={item.cover_image}
                  eyebrow={`Live · ${item.type}`}
                  meta={`${item.datetime} · ${item.venue}`}
                  price={item.price_range}
                  vibe_tags={item.vibe_tags}
                  trending={item.trending}
                />
              );
            }
            if ("price_per_person" in item) {
              return (
                <Card
                  key={`exp-${item.id}`}
                  module="experience"
                  id={item.id}
                  title={item.title}
                  href={`/experience/${item.id}`}
                  cover={item.cover_image}
                  eyebrow={`Experience · ${item.category}`}
                  meta={`mit ${item.host}`}
                  price={`CHF ${item.price_per_person} p.P.`}
                  rating={item.rating}
                  vibe_tags={item.vibe_tags}
                />
              );
            }
            if ("cuisine" in item) {
              return (
                <Card
                  key={`dine-${item.id}`}
                  module="dine"
                  id={item.id}
                  title={item.name}
                  href={`/dine/${item.id}`}
                  cover={item.cover_image}
                  eyebrow={`Dine · ${item.cuisine}`}
                  meta={`${item.district} · ${item.address.split(",")[0]}`}
                  price={item.price_range}
                  rating={item.rating}
                  vibe_tags={item.vibe_tags}
                />
              );
            }
            return null;
          })}
        </div>
      </section>

      {/* TRENDING DIESE WOCHE ─────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-burgundy" />
          <h2 className="font-display text-3xl md:text-4xl">Trending diese Woche</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <TrendCard
            icon={<Flame className="w-4 h-4" />}
            title="Restaurants, die alle reservieren"
            items={trendingD.map((d) => ({ name: d.name, sub: `${d.bookings_today ?? "—"} Buchungen heute`, href: `/dine/${d.id}` }))}
          />
          <TrendCard
            icon={<Sparkles className="w-4 h-4" />}
            title="Diese Pop-ups sind fast ausgebucht"
            items={nearSoldOut.map((d) => ({ name: d.title, sub: d.left, href: d.href }))}
          />
          <TrendCard
            icon={<Plus className="w-4 h-4" />}
            title="Neu bei ZurichTonight"
            items={newItems.map((d) => ({ name: d.title, sub: d.ago, href: d.href }))}
          />
        </div>
      </section>

      {/* STADTTEIL EXPLORER ──────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-3xl md:text-4xl">Stadtteil-Explorer</h2>
          <span className="eyebrow hidden md:inline">Filter nach Quartier</span>
        </div>
        <DistrictExplorer />
      </section>

      {/* TRENDING TONIGHT - top 3 inline ─────────────────────── */}
      <section className="container-editorial pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-3xl md:text-4xl">
            Heisse Tipps · diese Woche
          </h2>
          <Link href="/entdecken" className="text-[13px] font-medium text-burgundy hover:underline">
            Mehr Events →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {trendingTonight().map((event) => (
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
              trending
              views24h={event.views_24h}
              ticketsLeft={event.tickets_left}
            />
          ))}
        </div>
      </section>

      {/* COMMUNITY BANNER ─────────────────────────────────────── */}
      <section className="container-editorial pb-12">
        <div
          className="relative rounded-3xl overflow-hidden bg-ink text-paper p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #1c1917 0%, #5a1414 60%, #7c1f1f 100%)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-brass" />
              <span className="eyebrow text-paper-dim">Werde Teil der Community</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              Das digitale Wohnzimmer aller Zürcher.
            </h2>
            <p className="text-paper-dim text-[15px] mt-3 max-w-xl">
              <strong className="text-paper">10'247 Zürcher</strong> · <strong className="text-paper">{PULS_WEEK_STATS.posts.toLocaleString("de-CH")}</strong> Posts diese Woche · <strong className="text-paper">{PULS_WEEK_STATS.comments.toLocaleString("de-CH")}</strong> Kommentare
            </p>
            <p className="text-paper-dim/80 text-[13px] mt-2">
              Aktuell 100% gratis — wir bauen die Zürcher Community auf.
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

      {/* ONBOARDING TOUR — shown once on first visit */}
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

function TrendCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: { name: string; sub: string; href: string }[];
}) {
  return (
    <div className="bg-card border border-line rounded-2xl p-5 card-shadow">
      <div className="flex items-center gap-2 mb-4 text-burgundy">
        {icon}
        <p className="font-medium text-[13px] uppercase tracking-wider">{title}</p>
      </div>
      <ul className="space-y-2">
        {items.length === 0 && (
          <li className="text-[13px] text-ink-faint">Keine aktuellen Treffer.</li>
        )}
        {items.slice(0, 5).map((it, i) => (
          <li key={i}>
            <Link
              href={it.href}
              className="flex items-center justify-between gap-3 py-2 border-b border-line last:border-b-0 hover:text-burgundy transition-colors"
            >
              <span className="text-[14px] leading-tight line-clamp-1">{it.name}</span>
              <span className="text-[11px] text-ink-faint shrink-0">{it.sub}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
