"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Users, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { FilterBar, FilterChips, type FilterState } from "@/components/FilterBar";
import { SkeletonGrid } from "@/components/SkeletonCard";
import { DINE_VENUES } from "@/lib/data";
import { useToast } from "@/components/Toast";

const CUISINE_OPTIONS = ["Modern Swiss", "Schweizer Klassik", "Französisch / Brasserie", "Asian Fusion", "Vegetarisch / Vegan", "Cocktails", "Internationale Küche"];

export default function DinePage() {
  return (
    <Suspense fallback={null}>
      <DineInner />
    </Suspense>
  );
}

function DineInner() {
  const params = useSearchParams();
  const districtFromUrl = params?.get("district");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:30");
  const [people, setPeople] = useState(2);
  const [filters, setFilters] = useState<FilterState>({});
  const [loading, setLoading] = useState(true);
  const { push } = useToast();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (districtFromUrl) setFilters((f) => ({ ...f, district: districtFromUrl }));
  }, [districtFromUrl]);

  const filtered = useMemo(() => {
    return DINE_VENUES.filter((v) => {
      if (filters.district && v.district !== filters.district) return false;
      if (filters.cuisine && v.cuisine !== filters.cuisine) return false;
      if (filters.price && v.price_range !== filters.price) return false;
      if (filters.vibe && !v.vibe_tags.includes(filters.vibe as never)) return false;
      return true;
    });
  }, [filters]);

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
          <button
            onClick={() => push(`Suche aktualisiert: ${filtered.length} Tische verfügbar (Demo)`, "success")}
            className="px-4 py-2 rounded-lg bg-burgundy text-paper text-[13px] font-medium hover:bg-burgundy-dark"
          >
            Suchen
          </button>
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
                key: "district",
                label: "Stadtteil",
                options: ["Kreis 1", "Kreis 4", "Kreis 5", "Kreis 8"],
              },
              {
                key: "cuisine",
                label: "Küche",
                options: CUISINE_OPTIONS,
              },
              {
                key: "price",
                label: "Preis",
                options: ["CHF", "CHF CHF", "CHF CHF CHF", "CHF CHF CHF CHF"],
              },
              {
                key: "vibe",
                label: "Vibe",
                options: ["Fine Dining", "Date Night", "Casual", "Premium", "Hidden Gem", "Family"],
              },
            ]}
          />
        </aside>

        <div>
          <FilterChips active={filters} onRemove={(k) => setFilters((f) => ({ ...f, [k]: null }))} />
          <p className="text-[12px] text-ink-muted mb-4">
            {filtered.length} Restaurants gefunden
          </p>
          {loading ? (
            <SkeletonGrid n={6} />
          ) : filtered.length === 0 ? (
            <Empty />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {filtered.map((v) => (
                <Card
                  key={v.id}
                  module="dine"
                  id={v.id}
                  title={v.name}
                  href={`/dine/${v.id}`}
                  cover={v.cover_image}
                  eyebrow={`${v.cuisine} · ${v.district}`}
                  meta={v.description}
                  price={v.price_range}
                  rating={v.rating}
                  vibe_tags={v.vibe_tags}
                  trending={v.trending}
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
      <p className="font-display text-xl">Keine Treffer</p>
      <p className="text-[14px] text-ink-muted mt-2">
        Lockere die Filter — oder schau in einem anderen Stadtteil.
      </p>
    </div>
  );
}
