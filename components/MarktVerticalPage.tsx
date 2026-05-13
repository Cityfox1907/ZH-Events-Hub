"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { MarktSubNav } from "@/components/MarktSubNav";
import { MarktItemCard } from "@/components/MarktItemCard";
import {
  MARKT_VERTICALS,
  marktByVertical,
  ZH_DISTRICTS,
} from "@/lib/phase3-data";
import type { MarktIntent, MarktVertical } from "@/lib/types";

interface Props {
  vertical: MarktVertical;
}

export function MarktVerticalPage({ vertical }: Props) {
  const meta = MARKT_VERTICALS.find((v) => v.key === vertical)!;
  const [intent, setIntent] = useState<MarktIntent | "alle">("alle");
  const [district, setDistrict] = useState("Alle");

  const items = useMemo(() => {
    let list = marktByVertical(vertical);
    if (intent !== "alle") list = list.filter((i) => i.intent === intent);
    if (district !== "Alle") list = list.filter((i) => i.district === district);
    return list;
  }, [vertical, intent, district]);

  return (
    <>
      <MarktSubNav />

      <section className="container-editorial pt-8 pb-6">
        <p className="eyebrow">
          {meta.emoji} {meta.short}
        </p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          {meta.label}
        </h1>
        <p className="text-ink-muted text-[14.5px] mt-2 max-w-xl">{meta.blurb}</p>
        {meta.requiresWohnsitz && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-burgundy/[0.06] border border-burgundy/15 text-[12.5px] text-burgundy">
            <ShieldCheck className="w-4 h-4" />
            Wohnsitz-Verifikation Pflicht für Inserate in dieser Vertikale
          </div>
        )}
      </section>

      <section className="container-editorial pb-4">
        <div className="grid md:grid-cols-[auto_1fr] gap-2 items-center">
          <div className="bg-card border border-line rounded-full p-1 inline-flex">
            {(["alle", "brauche", "biete"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setIntent(k)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium ${
                  intent === k
                    ? "bg-ink text-paper"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {k === "alle"
                  ? "Alle"
                  : k === "brauche"
                    ? "Ich brauche"
                    : "Ich biete"}
              </button>
            ))}
          </div>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="px-3 py-2.5 text-[13px] border border-line bg-card rounded-lg focus:border-burgundy focus:outline-none"
          >
            <option>Alle</option>
            {ZH_DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="container-editorial pb-20">
        {items.length === 0 ? (
          <div className="p-10 text-center bg-card border border-line rounded-2xl">
            <p className="font-display text-xl">Keine Einträge</p>
            <p className="text-[13px] text-ink-muted mt-2">
              Probier einen anderen Filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((it) => (
              <MarktItemCard key={it.id} item={it} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
