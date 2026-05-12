"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { FilterBar, FilterChips, type FilterState } from "@/components/FilterBar";
import { EXPERIENCES } from "@/lib/data";

export default function ExperiencePage() {
  const [filters, setFilters] = useState<FilterState>({});

  const filtered = useMemo(() => {
    return EXPERIENCES.filter((e) => {
      if (filters.category && e.category !== filters.category) return false;
      if (filters.language && !e.languages.includes(filters.language as never)) return false;
      if (filters.duration) {
        if (filters.duration === "< 2h" && e.duration_hours >= 2) return false;
        if (filters.duration === "2–4h" && (e.duration_hours < 2 || e.duration_hours > 4)) return false;
        if (filters.duration === "4h+" && e.duration_hours < 4) return false;
      }
      if (filters.district && e.district !== filters.district) return false;
      return true;
    });
  }, [filters]);

  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Erlebnisse mit lokalen Hosts."
        subtitle="Sommelier, Botanikerin, Künstler: Kuratierte Erfahrungen, die Zürich von einer Seite zeigen, die du nicht im Reiseführer findest."
      />

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
                options: ["Wein-Tasting", "Outdoor", "Workshop", "Tour"],
              },
              { key: "language", label: "Sprache", options: ["DE", "EN", "FR", "IT"] },
              {
                key: "duration",
                label: "Dauer",
                options: ["< 2h", "2–4h", "4h+"],
              },
              {
                key: "district",
                label: "Stadtteil",
                options: ["Kreis 1", "Kreis 3", "Kreis 4", "Kreis 5", "Kreis 6", "Kreis 9"],
              },
            ]}
          />
        </aside>

        <div>
          <FilterChips active={filters} onRemove={(k) => setFilters((f) => ({ ...f, [k]: null }))} />
          <p className="text-[12px] text-ink-muted mb-4">
            {filtered.length} Erlebnisse gefunden
          </p>
          {filtered.length === 0 ? (
            <div className="p-10 text-center bg-card border border-line rounded-2xl">
              <p className="font-display text-xl">Keine Treffer</p>
              <p className="text-[14px] text-ink-muted mt-2">
                Lockere die Filter — oder versuche eine andere Sprache.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {filtered.map((e) => (
                <Card
                  key={e.id}
                  module="experience"
                  id={e.id}
                  title={e.title}
                  href={`/experience/${e.id}`}
                  cover={e.cover_image}
                  eyebrow={`${e.category} · ${e.duration}`}
                  meta={`mit ${e.host}`}
                  price={`CHF ${e.price_per_person} p.P.`}
                  rating={e.rating}
                  vibe_tags={e.vibe_tags}
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
