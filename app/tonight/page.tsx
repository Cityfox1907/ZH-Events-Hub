"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { FilterBar, FilterChips, type FilterState } from "@/components/FilterBar";
import { TONIGHT_EVENTS } from "@/lib/data";
import type { Bucket } from "@/lib/types";

const TABS: { key: Bucket; label: string }[] = [
  { key: "today", label: "Heute" },
  { key: "weekend", label: "Wochenende" },
  { key: "week", label: "Woche" },
];

const PRICE_BAND_LABEL: Record<string, string> = {
  "Gratis": "free",
  "bis CHF 25": "low",
  "CHF 25–60": "mid",
  "CHF 60+": "high",
};

export default function TonightPage() {
  return (
    <Suspense fallback={null}>
      <TonightInner />
    </Suspense>
  );
}

function TonightInner() {
  const params = useSearchParams();
  const districtFromUrl = params?.get("district");
  const [tab, setTab] = useState<Bucket>("today");
  const [filters, setFilters] = useState<FilterState>({});

  useEffect(() => {
    if (districtFromUrl) {
      setFilters((f) => ({ ...f, district: districtFromUrl }));
    }
  }, [districtFromUrl]);

  const filtered = useMemo(() => {
    return TONIGHT_EVENTS.filter((e) => e.bucket === tab).filter((e) => {
      if (filters.category && e.category !== filters.category) return false;
      if (filters.district && e.district !== filters.district) return false;
      if (filters.vibe && !e.vibe_tags.includes(filters.vibe as never)) return false;
      if (filters.price) {
        const want = PRICE_BAND_LABEL[filters.price];
        if (want && e.price_band !== want) return false;
      }
      return true;
    });
  }, [tab, filters]);

  return (
    <>
      <PageHero
        eyebrow="Tonight"
        title="Was läuft jetzt in Zürich."
        subtitle="Kuratierte Auswahl: Konzerte, Klubs, Ausstellungen, Veranstaltungen. Heute, am Wochenende, in der Woche."
      >
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-card border border-line">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${
                tab === t.key
                  ? "bg-ink text-paper"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="container-editorial grid lg:grid-cols-[280px_1fr] gap-6 pb-20">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <FilterBar
            active={filters}
            onChange={setFilters}
            onReset={() => setFilters({})}
            groups={[
              {
                key: "category",
                label: "Kategorie",
                options: ["Konzert", "Klub", "Ausstellung", "Theater", "Festival", "Sport", "Workshop", "Food"],
              },
              {
                key: "district",
                label: "Stadtteil",
                options: ["Kreis 1", "Kreis 4", "Kreis 5", "Kreis 6", "Kreis 8"],
              },
              {
                key: "price",
                label: "Preis",
                options: ["Gratis", "bis CHF 25", "CHF 25–60", "CHF 60+"],
              },
              {
                key: "vibe",
                label: "Vibe",
                options: ["Premium", "Date Night", "Cultural", "Casual", "Family", "Outdoor"],
              },
            ]}
          />
        </aside>

        <div>
          <FilterChips active={filters} onRemove={(k) => setFilters((f) => ({ ...f, [k]: null }))} />
          <p className="text-[12px] text-ink-muted mb-4">
            {filtered.length} Events gefunden · {TABS.find((t) => t.key === tab)?.label}
          </p>
          {filtered.length === 0 ? (
            <Empty />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {filtered.map((event) => (
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
                  trending={event.trending}
                  views24h={event.views_24h}
                  ticketsLeft={event.tickets_left}
                  addedAt={event.added_at}
                  showShare
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Empty() {
  return (
    <div className="p-10 text-center bg-card border border-line rounded-2xl">
      <p className="font-display text-xl">Keine Events gefunden</p>
      <p className="text-[14px] text-ink-muted mt-2">
        Versuche, einen Filter zu lösen — oder wechsle auf einen anderen Zeitraum.
      </p>
    </div>
  );
}
