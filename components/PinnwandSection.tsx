"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Store, Users, Sparkles, ArrowRight } from "lucide-react";
import {
  PINNWAND_AUSHAENGE,
  PINNWAND_KATEGORIEN,
  sortPinnwand,
  type PinnwandKategorie,
} from "@/data/pinnwand";
import { PolaroidCard, PinnwandMonetizationCard } from "./PolaroidCard";

const FILTER_ICONS: Record<PinnwandKategorie | "alle", typeof Store | null> = {
  alle: null,
  anbieter: Store,
  verein: Users,
  "mikro-event": Sparkles,
};

export function PinnwandSection({
  preferredDistrict = "Kreis 11",
  districtLabel = "Kreis 11 · Oerlikon",
  initialLimit = 8,
}: {
  preferredDistrict?: string;
  districtLabel?: string;
  initialLimit?: number;
}) {
  const [filter, setFilter] = useState<PinnwandKategorie | "alle">("alle");

  const visible = useMemo(() => {
    const all = sortPinnwand(PINNWAND_AUSHAENGE, preferredDistrict);
    const filtered =
      filter === "alle" ? all : all.filter((a) => a.kategorie === filter);
    return filtered.slice(0, initialLimit);
  }, [filter, preferredDistrict, initialLimit]);

  return (
    <section className="container-editorial pb-12">
      <div className="pinnwand-board p-5 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="min-w-0">
            <h2 className="font-display text-2xl md:text-3xl leading-tight">
              Quartier-Pinnwand
            </h2>
            <p className="text-[13px] text-ink-muted mt-1 max-w-xl">
              Aushänge von Anbietern, Vereinen und Mikro-Events aus deiner
              Nachbarschaft
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="eyebrow">Sicht</p>
            <p className="text-[12px] font-medium text-ink mt-1">
              {districtLabel}
            </p>
          </div>
        </div>

        {/* Filter-Pillen */}
        <div className="flex flex-wrap gap-2 mb-5">
          {PINNWAND_KATEGORIEN.map((k) => {
            const Icon = FILTER_ICONS[k.key];
            const active = filter === k.key;
            return (
              <button
                key={k.key}
                onClick={() => setFilter(k.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[12.5px] font-medium transition-colors min-h-[44px] md:min-h-0 ${
                  active
                    ? "bg-ink text-paper"
                    : "bg-card/80 border border-line text-ink-muted hover:text-ink hover:border-burgundy"
                }`}
              >
                {Icon ? <Icon className="w-3.5 h-3.5" strokeWidth={2} /> : null}
                {k.label}
              </button>
            );
          })}
        </div>

        {/* Polaroid-Grid / Mobile-Carousel */}
        <div className="pinnwand-grid">
          {visible.map((a) => (
            <PolaroidCard key={a.id} aushang={a} />
          ))}
          {filter === "alle" && <PinnwandMonetizationCard />}
        </div>

        {/* Mehr Aushänge */}
        <div className="mt-6 flex justify-end">
          <Link
            href="/markt/pinnwand"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-burgundy hover:underline"
          >
            Mehr Aushänge <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
