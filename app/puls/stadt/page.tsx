"use client";

import { useMemo, useState } from "react";
import { PulsSubNav } from "@/components/PulsSubNav";
import { CityThreadCard } from "@/components/CityThreadCard";
import { CITY_THREADS } from "@/lib/phase3-data";

const CATEGORIES = [
  "Alle",
  ...Array.from(new Set(CITY_THREADS.map((t) => t.category))),
];

export default function PulsStadtPage() {
  const [cat, setCat] = useState("Alle");

  const filtered = useMemo(
    () => (cat === "Alle" ? CITY_THREADS : CITY_THREADS.filter((t) => t.category === cat)),
    [cat],
  );

  return (
    <>
      <PulsSubNav />
      <section className="container-editorial pt-8 pb-4">
        <p className="eyebrow">Stadt-Threads · kuratiert</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          Was Zürich diese Woche bewegt.
        </h1>
        <p className="text-ink-muted text-[14.5px] mt-2 max-w-xl">
          Magazin-artige Tiefe statt Endlos-Feed. 8 Threads, redaktionell
          sortiert, mit verifizierten Antworten wo verfügbar.
        </p>
      </section>

      <section className="container-editorial pb-4">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-[11.5px] px-2.5 py-1 rounded-full border transition-colors ${
                cat === c
                  ? "bg-ink text-paper border-ink"
                  : "bg-card border-line text-ink-muted hover:border-burgundy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-20">
        <div className="space-y-5">
          {filtered.map((t) => (
            <CityThreadCard key={t.id} thread={t} detailed />
          ))}
        </div>
        <p className="text-center text-[12.5px] text-ink-faint mt-6 italic">
          Diese Woche kuratiert · neue Themen jeden Montag
        </p>
      </section>
    </>
  );
}
