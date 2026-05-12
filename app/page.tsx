import Link from "next/link";
import {
  ArrowRight,
  CalendarHeart,
  UtensilsCrossed,
  Compass,
  Crown,
  Sparkles,
  TrendingUp,
  Flame,
  Plus,
} from "lucide-react";
import { Card } from "@/components/Card";
import {
  TONIGHT_EVENTS,
  DINE_VENUES,
  EXPERIENCES,
  LIVE_EVENTS,
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
                <span><strong className="text-ink font-medium">127</strong> Events heute</span>
              </span>
              <span className="hidden sm:inline">·</span>
              <span><strong className="text-ink font-medium">432</strong> Venues</span>
              <span className="hidden sm:inline">·</span>
              <span><strong className="text-ink font-medium">89</strong> Premium-Mitglieder</span>
            </div>
          </div>
        </div>
      </section>

      {/* HEUTE ABEND ──────────────────────────────────────────── */}
      <section className="container-editorial pt-12 pb-12">
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

      {/* MODULE ───────────────────────────────────────────────── */}
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
          <Link href="/tonight" className="text-[13px] font-medium text-burgundy hover:underline">
            Mehr Tonight →
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

      {/* PULSE BANNER ─────────────────────────────────────────── */}
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
              <Crown className="w-4 h-4 text-brass" />
              <span className="eyebrow text-paper-dim">Pulse Membership</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              Triff Menschen, die etwas vorhaben.
            </h2>
            <p className="text-paper-dim text-[15px] mt-3 max-w-xl">
              Founders' Tables, Salons, VIP-Previews. Kuratiert, klein, kein
              Pitching. Ab CHF 89 / Monat.
            </p>
          </div>
          <Link
            href="/pulse"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper text-ink font-medium text-[14px] hover:bg-paper-dim transition-colors shrink-0"
          >
            Mitglied werden <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

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
