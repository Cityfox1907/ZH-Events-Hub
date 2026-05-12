"use client";

import { useState } from "react";
import { Calendar, Users, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { FilterBar } from "@/components/FilterBar";
import { DINE_VENUES } from "@/lib/data";

export default function DinePage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:30");
  const [people, setPeople] = useState(2);

  return (
    <>
      <PageHero
        eyebrow="Dine"
        title="Tische, die sich lohnen."
        subtitle="Reservieren ohne Telefonjagd — alles über die Plattform. Kein Anbieter sieht deine Nummer, bevor du bestätigst."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-card border border-line rounded-2xl p-3">
          <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-paper">
            <Calendar className="w-4 h-4 text-ink-muted shrink-0" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent text-[13px] w-full focus:outline-none"
            />
          </label>
          <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-paper">
            <Clock className="w-4 h-4 text-ink-muted shrink-0" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-transparent text-[13px] w-full focus:outline-none"
            />
          </label>
          <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-paper">
            <Users className="w-4 h-4 text-ink-muted shrink-0" />
            <select
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="bg-transparent text-[13px] w-full focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Person" : "Personen"}
                </option>
              ))}
            </select>
          </label>
          <button className="px-4 py-2 rounded-lg bg-burgundy text-paper text-[13px] font-medium hover:bg-burgundy-dark">
            Suchen
          </button>
        </div>
      </PageHero>

      <section className="container-editorial grid lg:grid-cols-[280px_1fr] gap-6 pb-20">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <FilterBar
            groups={[
              {
                key: "district",
                label: "Stadtteil",
                options: ["Kreis 1", "Kreis 4", "Kreis 5", "Kreis 8"],
              },
              {
                key: "cuisine",
                label: "Küche",
                options: [
                  "Modern Swiss",
                  "Italienisch",
                  "Asiatisch",
                  "Schweizer Klassik",
                ],
              },
              {
                key: "price",
                label: "Preis",
                options: ["CHF", "CHF CHF", "CHF CHF CHF", "CHF CHF CHF CHF"],
              },
              {
                key: "vibe",
                label: "Vibe",
                options: ["Fine Dining", "Date Night", "Casual"],
              },
            ]}
          />
        </aside>

        <div>
          <p className="text-[12px] text-ink-muted mb-4">
            {DINE_VENUES.length} Restaurants
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {DINE_VENUES.map((v) => (
              <Card
                key={v.id}
                module="dine"
                id={v.id}
                title={v.name}
                href={`/dine/${v.id}`}
                cover={v.cover_image}
                eyebrow={`${v.cuisine} · ${v.district}`}
                meta={v.description.slice(0, 80) + "…"}
                price={v.price_range}
                rating={v.rating}
                vibe_tags={v.vibe_tags}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
