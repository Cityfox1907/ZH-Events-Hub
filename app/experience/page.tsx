"use client";

import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { FilterBar } from "@/components/FilterBar";
import { EXPERIENCES } from "@/lib/data";

export default function ExperiencePage() {
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
            groups={[
              {
                key: "category",
                label: "Kategorie",
                options: ["Wein-Tasting", "Outdoor", "Workshop", "Tour"],
              },
              { key: "language", label: "Sprache", options: ["DE", "EN", "FR"] },
              {
                key: "duration",
                label: "Dauer",
                options: ["< 2h", "2–4h", "4h+"],
              },
              {
                key: "district",
                label: "Stadtteil",
                options: ["Kreis 1", "Kreis 4", "Üetliberg"],
              },
            ]}
          />
        </aside>

        <div>
          <p className="text-[12px] text-ink-muted mb-4">
            {EXPERIENCES.length} Erlebnisse
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {EXPERIENCES.map((e) => (
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
                vibe_tags={e.vibe_tags}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
