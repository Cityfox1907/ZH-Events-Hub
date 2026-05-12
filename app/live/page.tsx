"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { FilterBar, FilterChips, type FilterState } from "@/components/FilterBar";
import { LIVE_EVENTS } from "@/lib/data";

export default function LivePage() {
  const [carousel, setCarousel] = useState(0);
  const [filters, setFilters] = useState<FilterState>({});
  const top = LIVE_EVENTS;
  const active = top[carousel];

  useEffect(() => {
    const t = setInterval(() => setCarousel((c) => (c + 1) % top.length), 6500);
    return () => clearInterval(t);
  }, [top.length]);

  function next() {
    setCarousel((c) => (c + 1) % top.length);
  }
  function prev() {
    setCarousel((c) => (c - 1 + top.length) % top.length);
  }

  const filtered = useMemo(() => {
    return LIVE_EVENTS.filter((e) => {
      if (filters.type) {
        const map: Record<string, string> = {
          "Candlelight": "Candlelight Concert",
          "Pop-up Dinner": "Pop-up Dinner",
          "Show": "Show",
          "Immersive": "Immersive Show",
        };
        const want = map[filters.type] ?? filters.type;
        if (e.type !== want) return false;
      }
      if (filters.price) {
        if (filters.price === "bis CHF 50" && e.price_min > 50) return false;
        if (filters.price === "CHF 50–150" && (e.price_min < 50 || e.price_min > 150)) return false;
        if (filters.price === "CHF 150+" && e.price_min < 150) return false;
      }
      if (filters.vibe && !e.vibe_tags.includes(filters.vibe as never)) return false;
      return true;
    });
  }, [filters]);

  return (
    <>
      <PageHero
        eyebrow="Live"
        title="Pop-up & Premium."
        subtitle="Candlelight Concerts, Secret Suppers und Hochkaräter, die es so nur einmal gibt."
      />

      <section className="container-editorial pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-ink aspect-[16/9] md:aspect-[21/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.cover_image}
            alt={active.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-paper">
            <p className="eyebrow text-paper-dim">{active.type}</p>
            <h2 className="font-display text-3xl md:text-5xl mt-2 max-w-2xl leading-tight">
              {active.title}
            </h2>
            <p className="text-[14px] text-paper-dim mt-2">
              {active.datetime} · {active.venue}
            </p>
            <Link
              href={`/live/${active.id}`}
              className="inline-block mt-5 px-5 py-2.5 rounded-full bg-paper text-ink text-[13px] font-medium hover:bg-paper-dim transition-colors"
            >
              Tickets ansehen — {active.price_range}
            </Link>
          </div>

          {top.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Vorheriges"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-paper/85 hover:bg-paper text-ink"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Nächstes"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-paper/85 hover:bg-paper text-ink"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-paper/85 text-ink text-[12px]">
                {carousel + 1} / {top.length}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="container-editorial grid lg:grid-cols-[280px_1fr] gap-6 pb-20">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <FilterBar
            active={filters}
            onChange={setFilters}
            onReset={() => setFilters({})}
            groups={[
              {
                key: "type",
                label: "Typ",
                options: ["Candlelight", "Pop-up Dinner", "Show", "Immersive"],
              },
              {
                key: "price",
                label: "Preis",
                options: ["bis CHF 50", "CHF 50–150", "CHF 150+"],
              },
              { key: "vibe", label: "Vibe", options: ["Premium", "Date Night", "Magical", "Cultural", "Outdoor"] },
            ]}
          />
        </aside>

        <div>
          <FilterChips active={filters} onRemove={(k) => setFilters((f) => ({ ...f, [k]: null }))} />
          <p className="text-[12px] text-ink-muted mb-4">
            {filtered.length} Live-Events gefunden
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {filtered.map((e) => (
              <Card
                key={e.id}
                module="live"
                id={e.id}
                title={e.title}
                href={`/live/${e.id}`}
                cover={e.cover_image}
                eyebrow={e.type}
                meta={`${e.datetime} · ${e.venue}`}
                price={e.price_range}
                vibe_tags={e.vibe_tags}
                trending={e.trending}
                badge={e.tickets_available < 50 ? "Wenige übrig" : undefined}
                ticketsLeft={e.tickets_available}
                soldOut={e.tickets_available === 0}
                showShare
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
