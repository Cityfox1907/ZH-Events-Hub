"use client";

import { useMemo, useState } from "react";
import { PulsSubNav } from "@/components/PulsSubNav";
import { QuartierLayer } from "@/components/QuartierLayer";
import { QUARTIER_POSTS, ZH_DISTRICTS } from "@/lib/phase3-data";

export default function PulsQuartierPage() {
  const [district, setDistrict] = useState("Kreis 11");

  const filtered = useMemo(
    () => QUARTIER_POSTS.filter((p) => p.district === district),
    [district],
  );

  return (
    <>
      <PulsSubNav />
      <section className="container-editorial pt-8 pb-4">
        <p className="eyebrow">Quartier-Layer · vertieft</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          Dein Quartier, alle Posts.
        </h1>
        <p className="text-ink-muted text-[14.5px] mt-2 max-w-xl">
          Sichtbar nur für wohnsitz-verifizierte Nachbarn. Wähle ein Quartier
          oder bleib in deinem.
        </p>
      </section>

      <section className="container-editorial pb-4">
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="px-3 py-2.5 text-[13px] border border-line bg-card rounded-lg focus:border-burgundy focus:outline-none"
        >
          {ZH_DISTRICTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </section>

      <section className="container-editorial pb-20">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-line bg-paper-dim/40 p-8 text-center">
            <p className="font-display text-xl">Noch keine Posts aus {district}</p>
            <p className="text-[13px] text-ink-muted mt-1">
              Sei der/die Erste — wohnsitz-verifizierte Nachbarn dürfen posten.
            </p>
          </div>
        ) : (
          <QuartierLayer posts={filtered} district={district} variant="fullpage" />
        )}
      </section>
    </>
  );
}
