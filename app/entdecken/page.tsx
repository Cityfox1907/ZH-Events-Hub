"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  UtensilsCrossed,
  Music,
  Palette,
  Activity,
  Waves,
  Landmark,
  GraduationCap,
  TreePine,
  Baby,
  PartyPopper,
  ShoppingBag,
  Trophy,
  SlidersHorizontal,
  ChevronDown,
  X,
  Star,
  TrendingUp,
  Sparkles,
  Crown,
  Clock,
  Search,
  ArrowRight,
} from "lucide-react";
import {
  LISTINGS_ALL,
  ENTDECKEN_CATEGORIES,
  ENTDECKEN_TIMES,
  ENTDECKEN_STYLES,
  ENTDECKEN_LIVE_COUNTS,
  DISTRICT_SPOTLIGHT,
  CURATED_THEMES,
  listingMatchesTime,
} from "@/lib/data";
import type {
  EntdeckenCategory,
  EntdeckenTime,
  Listing,
  ListingBadge,
  StyleTag,
} from "@/lib/types";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ShareButton } from "@/components/ShareModal";

const CAT_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  UtensilsCrossed,
  Music,
  Palette,
  Activity,
  Waves,
  Landmark,
  GraduationCap,
  TreePine,
  Baby,
  PartyPopper,
  ShoppingBag,
  Trophy,
};

const SORT_OPTIONS = [
  { key: "relevance", label: "Relevanz" },
  { key: "rating", label: "Top-Bewertet" },
  { key: "trending", label: "Trending" },
  { key: "price", label: "Preis aufsteigend" },
] as const;
type SortKey = (typeof SORT_OPTIONS)[number]["key"];

const DISTRICTS = [
  "Kreis 1",
  "Kreis 2",
  "Kreis 3",
  "Kreis 4",
  "Kreis 5",
  "Kreis 6",
  "Kreis 7",
  "Kreis 8",
  "Kreis 9",
  "Oerlikon",
];

export default function EntdeckenPage() {
  return (
    <Suspense fallback={null}>
      <EntdeckenInner />
    </Suspense>
  );
}

function EntdeckenInner() {
  const params = useSearchParams();
  const router = useRouter();

  const categoryFromUrl = params?.get("kategorie") as EntdeckenCategory | null;
  const timeFromUrl = params?.get("zeit") as EntdeckenTime | null;
  const styleFromUrl = params?.get("stil") as StyleTag | null;
  const districtFromUrl = params?.get("stadtteil");

  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<EntdeckenCategory | null>(
    categoryFromUrl ?? null,
  );
  const [activeTime, setActiveTime] = useState<EntdeckenTime | null>(
    timeFromUrl ?? null,
  );
  const [activeStyle, setActiveStyle] = useState<StyleTag | null>(
    styleFromUrl ?? null,
  );
  const [district, setDistrict] = useState<string | null>(districtFromUrl ?? null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("relevance");

  // Sync URL state when filters change (shareable links)
  useEffect(() => {
    const sp = new URLSearchParams();
    if (activeCat) sp.set("kategorie", activeCat);
    if (activeTime) sp.set("zeit", activeTime);
    if (activeStyle) sp.set("stil", activeStyle);
    if (district) sp.set("stadtteil", district);
    const qs = sp.toString();
    const next = qs ? `/entdecken?${qs}` : "/entdecken";
    router.replace(next, { scroll: false });
  }, [activeCat, activeTime, activeStyle, district, router]);

  const filtered: Listing[] = useMemo(() => {
    let list = LISTINGS_ALL.slice();

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.category_label.toLowerCase().includes(q) ||
          l.district.toLowerCase().includes(q),
      );
    }

    if (activeCat) list = list.filter((l) => l.category === activeCat);
    if (activeTime) list = list.filter((l) => listingMatchesTime(l, activeTime));
    if (activeStyle) list = list.filter((l) => l.style_tags.includes(activeStyle));
    if (district) list = list.filter((l) => l.district === district);
    if (minRating) list = list.filter((l) => (l.rating ?? 0) >= minRating);

    if (sort === "rating") {
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sort === "trending") {
      list.sort(
        (a, b) =>
          (b.trending ? 100 : 0) + (b.views_24h ?? 0) -
          ((a.trending ? 100 : 0) + (a.views_24h ?? 0)),
      );
    } else if (sort === "price") {
      const map: Record<string, number> = { free: 0, low: 1, mid: 2, high: 3 };
      list.sort((a, b) => map[a.price_band] - map[b.price_band]);
    } else {
      // relevance: trending first, then by rating, then events first
      list.sort((a, b) => {
        const aScore =
          (a.trending ? 50 : 0) + (a.rating ?? 0) * 10 + (a.kind === "event" ? 5 : 0);
        const bScore =
          (b.trending ? 50 : 0) + (b.rating ?? 0) * 10 + (b.kind === "event" ? 5 : 0);
        return bScore - aScore;
      });
    }

    return list;
  }, [query, activeCat, activeTime, activeStyle, district, minRating, sort]);

  const trending24h = useMemo(
    () =>
      LISTINGS_ALL.filter((l) => l.trending || (l.views_24h ?? 0) > 100)
        .slice(0, 6),
    [],
  );

  const districtSpotlight = useMemo(
    () => LISTINGS_ALL.filter((l) => l.district === DISTRICT_SPOTLIGHT.district).slice(0, 6),
    [],
  );

  function resetAll() {
    setQuery("");
    setActiveCat(null);
    setActiveTime(null);
    setActiveStyle(null);
    setDistrict(null);
    setMinRating(null);
  }

  const activeFiltersCount =
    (activeCat ? 1 : 0) +
    (activeTime ? 1 : 0) +
    (activeStyle ? 1 : 0) +
    (district ? 1 : 0) +
    (minRating ? 1 : 0);

  return (
    <>
      {/* HERO ─────────────────────────────────────────── */}
      <section className="container-editorial pt-10 pb-6">
        <p className="eyebrow">Entdecken · Events & Orte</p>
        <h1 className="font-display text-4xl md:text-6xl mt-2 leading-[0.95] tracking-tight">
          Was machst du heute<br />
          <span className="italic text-burgundy">in Zürich?</span>
        </h1>

        <div className="mt-6 max-w-xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Restaurant, Konzert, Aktivität, Bar suchen…"
            className="w-full pl-11 pr-4 py-3 text-[14px] bg-card border border-line rounded-full focus:border-burgundy focus:outline-none"
          />
        </div>

        <p className="mt-3 text-[12.5px] text-ink-faint flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>
            <strong className="text-ink-muted">{ENTDECKEN_LIVE_COUNTS.events}</strong> Events
          </span>
          <span>·</span>
          <span>
            <strong className="text-ink-muted">{ENTDECKEN_LIVE_COUNTS.places}</strong> Orte
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy zb-pulse" />
            <strong className="text-ink-muted">
              {ENTDECKEN_LIVE_COUNTS.onlineNow.toLocaleString("de-CH")}
            </strong>{" "}
            Zürcher online
          </span>
        </p>
      </section>

      {/* FILTERS (sticky) ─────────────────────────────── */}
      <div className="sticky top-[57px] z-30 bg-paper/95 backdrop-blur border-y border-line">
        <div className="container-editorial py-3 space-y-2">
          {/* WAS — categories */}
          <FilterRow label="Was">
            <Pill
              active={activeCat === null}
              onClick={() => setActiveCat(null)}
            >
              Alles
            </Pill>
            {ENTDECKEN_CATEGORIES.map((c) => {
              const Icon = CAT_ICONS[c.icon] ?? Sparkles;
              const active = activeCat === c.key;
              return (
                <Pill
                  key={c.key}
                  active={active}
                  onClick={() => setActiveCat(active ? null : c.key)}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.6} />
                  {c.label}
                </Pill>
              );
            })}
          </FilterRow>

          {/* WANN — time */}
          <FilterRow label="Wann">
            <Pill
              active={activeTime === null}
              onClick={() => setActiveTime(null)}
              compact
            >
              Egal
            </Pill>
            {ENTDECKEN_TIMES.map((t) => {
              const active = activeTime === t.key;
              return (
                <Pill
                  key={t.key}
                  compact
                  active={active}
                  onClick={() => setActiveTime(active ? null : t.key)}
                >
                  {t.label}
                </Pill>
              );
            })}
          </FilterRow>

          {/* STIL — style */}
          <FilterRow label="Stil">
            {ENTDECKEN_STYLES.map((s) => {
              const active = activeStyle === s;
              return (
                <Pill
                  key={s}
                  compact
                  active={active}
                  onClick={() => setActiveStyle(active ? null : s)}
                >
                  {s}
                </Pill>
              );
            })}
          </FilterRow>

          {/* MORE FILTERS toggle row */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setAdvancedOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-[12px] text-ink-muted hover:text-burgundy"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Mehr Filter
              {activeFiltersCount > 0 && (
                <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-burgundy text-paper">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  advancedOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetAll}
                className="text-[12px] uppercase tracking-wider text-ink-muted hover:text-burgundy"
              >
                Alle zurücksetzen
              </button>
            )}
          </div>

          {advancedOpen && (
            <div className="pt-3 border-t border-line grid sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-ink-faint mb-1.5">
                  Stadtteil
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {DISTRICTS.map((d) => {
                    const active = district === d;
                    return (
                      <button
                        key={d}
                        onClick={() => setDistrict(active ? null : d)}
                        className={`text-[11.5px] px-2.5 py-1 rounded-full border transition-colors ${
                          active
                            ? "bg-ink text-paper border-ink"
                            : "border-line bg-card hover:border-burgundy"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-ink-faint mb-1.5">
                  Mindest-Bewertung
                </p>
                <div className="flex gap-1.5">
                  {[4.0, 4.5].map((r) => {
                    const active = minRating === r;
                    return (
                      <button
                        key={r}
                        onClick={() => setMinRating(active ? null : r)}
                        className={`text-[11.5px] px-3 py-1.5 rounded-full border transition-colors inline-flex items-center gap-1 ${
                          active
                            ? "bg-ink text-paper border-ink"
                            : "border-line bg-card hover:border-burgundy"
                        }`}
                      >
                        <Star className="w-3 h-3 fill-brass text-brass" />
                        {r.toFixed(1)}+
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ACTIVE CHIPS + SORT */}
      <section className="container-editorial pt-5 pb-3">
        {(activeCat || activeTime || activeStyle || district || minRating) && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {activeCat && (
              <Chip onRemove={() => setActiveCat(null)}>
                {ENTDECKEN_CATEGORIES.find((c) => c.key === activeCat)?.label}
              </Chip>
            )}
            {activeTime && (
              <Chip onRemove={() => setActiveTime(null)}>
                {ENTDECKEN_TIMES.find((t) => t.key === activeTime)?.label}
              </Chip>
            )}
            {activeStyle && (
              <Chip onRemove={() => setActiveStyle(null)}>{activeStyle}</Chip>
            )}
            {district && <Chip onRemove={() => setDistrict(null)}>{district}</Chip>}
            {minRating && (
              <Chip onRemove={() => setMinRating(null)}>≥ {minRating.toFixed(1)} ★</Chip>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-[12.5px] text-ink-muted">
            <strong className="text-ink">{filtered.length}</strong> Ergebnisse
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-ink-faint">
              Sortierung
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="text-[12px] px-3 py-1.5 rounded-full bg-card border border-line focus:border-burgundy focus:outline-none"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* RESULT GRID */}
      <section className="container-editorial pb-10">
        {filtered.length === 0 ? (
          <Empty />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filtered.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </section>

      {/* STADTTEIL FOKUS */}
      <section className="container-editorial pb-10">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <p className="eyebrow mb-1">Diese Woche im Fokus</p>
            <h2 className="font-display text-2xl md:text-3xl">
              {DISTRICT_SPOTLIGHT.district} entdecken
            </h2>
            <p className="text-[13px] text-ink-muted mt-1 max-w-xl">
              {DISTRICT_SPOTLIGHT.blurb}
            </p>
          </div>
          <button
            onClick={() => setDistrict(DISTRICT_SPOTLIGHT.district)}
            className="text-[13px] font-medium text-burgundy hover:underline shrink-0"
          >
            Alle ansehen →
          </button>
        </div>
        <div className="flex md:grid gap-4 md:grid-cols-3 lg:grid-cols-6 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory pb-2">
          {districtSpotlight.map((l) => (
            <div
              key={l.id}
              className="snap-start shrink-0 w-[70%] sm:w-[40%] md:w-auto"
            >
              <CompactCard listing={l} />
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING 24H */}
      <section className="container-editorial pb-10">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-burgundy" />
          <h2 className="font-display text-2xl md:text-3xl">
            Trending · letzte 24 Stunden
          </h2>
        </div>
        <div className="flex md:grid gap-4 md:grid-cols-3 lg:grid-cols-6 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory pb-2">
          {trending24h.map((l) => (
            <div
              key={l.id}
              className="snap-start shrink-0 w-[70%] sm:w-[40%] md:w-auto"
            >
              <CompactCard listing={l} />
            </div>
          ))}
        </div>
      </section>

      {/* PERFEKT FÜR... */}
      <section className="container-editorial pb-20">
        <h2 className="font-display text-2xl md:text-3xl mb-5">Perfekt für…</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {CURATED_THEMES.map((t) => {
            const sp = new URLSearchParams();
            if (t.filters.category) sp.set("kategorie", t.filters.category);
            if (t.filters.time) sp.set("zeit", t.filters.time);
            if (t.filters.style) sp.set("stil", t.filters.style);
            return (
              <Link
                key={t.key}
                href={`/entdecken?${sp.toString()}`}
                className="group block p-6 bg-card border border-line rounded-2xl card-shadow card-shadow-hover transition-shadow"
              >
                <h3 className="font-display text-xl leading-tight">{t.title}</h3>
                <p className="text-[13px] text-ink-muted mt-2">{t.desc}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-[13px] font-medium text-burgundy group-hover:gap-2 transition-all">
                  Ansehen <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// SUBCOMPONENTS
// ─────────────────────────────────────────────────────────────

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden md:inline text-[10.5px] uppercase tracking-wider text-ink-faint shrink-0 w-12">
        {label}
      </span>
      <div className="flex gap-1.5 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 pb-1 scrollbar-thin flex-1">
        {children}
      </div>
    </div>
  );
}

function Pill({
  children,
  active,
  onClick,
  compact,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border transition-colors ${
        compact ? "px-3 py-1 text-[11.5px]" : "px-3 py-1.5 text-[12.5px]"
      } ${
        active
          ? "bg-ink text-paper border-ink"
          : "border-line bg-card text-ink-muted hover:border-burgundy hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Chip({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ink text-paper text-[11.5px]"
    >
      {children}
      <X className="w-3 h-3" />
    </button>
  );
}

function BadgePill({ badge }: { badge: ListingBadge }) {
  const config: Record<ListingBadge, { label: string; Icon: React.ComponentType<{ className?: string }>; cls: string }> = {
    trending: { label: "Trending", Icon: TrendingUp, cls: "bg-burgundy text-paper" },
    secret: { label: "Geheim-Tipp", Icon: Sparkles, cls: "bg-ink text-paper" },
    tourist: { label: "Touristen-Tipp", Icon: Star, cls: "bg-brass text-ink" },
    premium: { label: "Premium", Icon: Crown, cls: "bg-paper/90 text-ink backdrop-blur" },
    new: { label: "Neu", Icon: Clock, cls: "bg-paper/90 text-ink backdrop-blur" },
  };
  const c = config[badge];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${c.cls}`}
    >
      <c.Icon className="w-3 h-3" />
      {c.label}
    </span>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={listing.href}
      className={`group relative block bg-card rounded-2xl overflow-hidden border border-line card-shadow card-shadow-hover transition-shadow ${
        listing.kind === "event"
          ? "border-l-2 border-l-burgundy"
          : "border-l-2 border-l-brass"
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-dim">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.cover_image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top-left: kind badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {listing.kind === "event" ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-burgundy text-paper text-[10px] font-medium">
              Event · {listing.datetime?.split(",")[0] ?? ""}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ink text-paper text-[10px] font-medium">
              <Clock className="w-3 h-3" />
              {listing.hours?.split("·")[0]?.trim().slice(0, 24) ?? "Geöffnet"}
            </span>
          )}
        </div>

        {/* Top-right: badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {listing.badges.slice(0, 2).map((b) => (
            <BadgePill key={b} badge={b} />
          ))}
        </div>

        {/* Bottom-left: tickets countdown for events */}
        {listing.kind === "event" &&
          listing.tickets_left !== undefined &&
          listing.tickets_left > 0 &&
          listing.tickets_left < 15 && (
            <div className="absolute bottom-3 left-3">
              <span className="px-2 py-0.5 rounded-full bg-burgundy/90 text-paper text-[10px] font-medium backdrop-blur">
                Nur noch {listing.tickets_left} Plätze
              </span>
            </div>
          )}

        {/* Bottom-right: bookmark + share */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <ShareButton title={listing.title} variant="icon" />
          <BookmarkButton
            module={listing.source_module}
            id={listing.source_id}
            title={listing.title}
          />
        </div>
      </div>

      <div className="p-4">
        <p className="eyebrow">
          {listing.category_label} · {listing.district}
        </p>
        <h3 className="font-display text-lg leading-tight mt-1.5 line-clamp-2 group-hover:text-burgundy transition-colors">
          {listing.title}
        </h3>

        <div className="flex items-center justify-between mt-2.5 gap-2">
          {listing.kind === "event" ? (
            <span className="text-[12.5px] text-ink-muted">{listing.datetime}</span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[12.5px]">
              <Star className="w-3.5 h-3.5 fill-brass text-brass" />
              {listing.rating?.toFixed(1) ?? "—"}
            </span>
          )}
          <span className="text-[12.5px] font-medium">{listing.price}</span>
        </div>

        {listing.style_tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {listing.style_tags.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-[10.5px] px-2 py-0.5 rounded-full bg-paper-dim text-ink-muted"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function CompactCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={listing.href}
      className="group block bg-card border border-line rounded-xl overflow-hidden card-shadow-hover transition-shadow"
    >
      <div className="relative aspect-[5/4] bg-paper-dim">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.cover_image}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {listing.kind === "event" && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-burgundy text-paper text-[10px] font-medium">
            Event
          </span>
        )}
        {listing.trending && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-paper/90 text-burgundy text-[10px] font-medium backdrop-blur">
            <TrendingUp className="w-3 h-3" />
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-[10.5px] uppercase tracking-wider text-ink-faint truncate">
          {listing.category_label}
        </p>
        <p className="font-display text-[15px] leading-tight mt-0.5 line-clamp-2 group-hover:text-burgundy transition-colors">
          {listing.title}
        </p>
        <p className="text-[11.5px] text-ink-muted mt-1">{listing.district}</p>
      </div>
    </Link>
  );
}

function Empty() {
  return (
    <div className="p-10 text-center bg-card border border-line rounded-2xl">
      <p className="font-display text-xl">Keine Treffer</p>
      <p className="text-[14px] text-ink-muted mt-2">
        Lockere die Filter — oder probiere eine andere Kategorie.
      </p>
    </div>
  );
}
