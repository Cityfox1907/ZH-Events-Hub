"use client";

import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { FilterBar } from "@/components/FilterBar";
import { TONIGHT_EVENTS } from "@/lib/data";

const TABS = ["Heute", "Wochenende", "Woche"] as const;

export default function TonightPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Heute");

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
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${
                tab === t
                  ? "bg-ink text-paper"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="container-editorial grid lg:grid-cols-[280px_1fr] gap-6 pb-20">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <FilterBar
            groups={[
              {
                key: "category",
                label: "Kategorie",
                options: ["Konzert", "Klub", "Ausstellung", "Theater", "Festival"],
              },
              {
                key: "district",
                label: "Stadtteil",
                options: ["Kreis 1", "Kreis 4", "Kreis 5", "Kreis 8"],
              },
              {
                key: "price",
                label: "Preis",
                options: ["bis CHF 25", "CHF 25–60", "CHF 60+"],
              },
              {
                key: "vibe",
                label: "Vibe",
                options: ["Premium", "Date Night", "Cultural", "Casual"],
              },
            ]}
          />
        </aside>

        <div>
          <p className="text-[12px] text-ink-muted mb-4">
            {TONIGHT_EVENTS.length} Events · {tab}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {TONIGHT_EVENTS.map((event) => (
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
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
