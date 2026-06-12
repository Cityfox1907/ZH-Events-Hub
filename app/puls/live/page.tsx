"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { PulsSubNav } from "@/components/PulsSubNav";
import { PulsVerifiedWall } from "@/components/PulsVerifiedWall";
import { VERIFIED_UPDATES } from "@/lib/phase3-data";
import type { PulsSourceKind } from "@/lib/types";

const SOURCE_FILTERS: { key: PulsSourceKind | "alle"; label: string }[] = [
  { key: "alle", label: "Alle" },
  { key: "zvv", label: "ZVV" },
  { key: "sbb", label: "SBB" },
  { key: "vbz", label: "VBZ" },
  { key: "stadt", label: "Stadt" },
  { key: "polizei", label: "Polizei" },
  { key: "erz", label: "ERZ" },
  { key: "stadtrat", label: "Stadtrat" },
  { key: "local-hero", label: "Local Heroes" },
];

export default function PulsLivePage() {
  const [source, setSource] = useState<PulsSourceKind | "alle">("alle");
  const filtered = useMemo(() => {
    if (source === "alle") return VERIFIED_UPDATES;
    return VERIFIED_UPDATES.filter((u) => u.sourceKind === source);
  }, [source]);

  return (
    <>
      <PulsSubNav />
      <section className="container-editorial pt-8 pb-4">
        <p className="eyebrow inline-flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Verifizierte Stadt-Wand
        </p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          Was die Stadt offiziell sagt.
        </h1>
        <p className="text-ink-muted text-[14.5px] mt-2 max-w-xl">
          Nur verifizierte Quellen: ZVV, SBB, Stadt Zürich, Polizei,
          ERZ, plus Local Heroes (Tramfahrer*innen, Velokurier*innen,
          Bademeister*innen).
        </p>
      </section>

      <section className="container-editorial pb-4">
        <div className="flex flex-wrap gap-1.5">
          {SOURCE_FILTERS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSource(s.key)}
              className={`text-[11.5px] px-2.5 py-1 rounded-full border transition-colors ${
                source === s.key
                  ? "bg-ink text-paper border-ink"
                  : "bg-card border-line text-ink-muted hover:border-burgundy"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-20">
        <PulsVerifiedWall updates={filtered} variant="list" showFooter={false} />
      </section>
    </>
  );
}
