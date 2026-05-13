"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Store, Users, Sparkles } from "lucide-react";
import { MarktSubNav } from "@/components/MarktSubNav";
import { PolaroidCard, PinnwandMonetizationCard } from "@/components/PolaroidCard";
import {
  PINNWAND_AUSHAENGE,
  PINNWAND_KATEGORIEN,
  ablaufVariant,
  sortPinnwand,
  type PinnwandAushang,
  type PinnwandKategorie,
} from "@/data/pinnwand";
import { ZH_DISTRICTS } from "@/lib/phase3-data";

type SortKey = "neueste" | "bald-ablaufend" | "mein-quartier";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "neueste", label: "Neueste" },
  { key: "bald-ablaufend", label: "Bald ablaufend" },
  { key: "mein-quartier", label: "Mein Quartier" },
];

const ABLAUF_FILTERS = [
  { key: "alle", label: "Alle Zeiträume" },
  { key: "heute", label: "Heute" },
  { key: "bald", label: "Bald (≤2 Tage)" },
  { key: "laufend", label: "Laufend / wöchentlich" },
] as const;

const FILTER_ICONS: Record<PinnwandKategorie | "alle", typeof Store | null> = {
  alle: null,
  anbieter: Store,
  verein: Users,
  "mikro-event": Sparkles,
};

const PREFERRED_DISTRICT = "Kreis 11";

export default function PinnwandFullPage() {
  const [kategorie, setKategorie] = useState<PinnwandKategorie | "alle">("alle");
  const [stadtteil, setStadtteil] = useState<string>("Alle");
  const [zeitraum, setZeitraum] = useState<(typeof ABLAUF_FILTERS)[number]["key"]>(
    "alle",
  );
  const [sort, setSort] = useState<SortKey>("bald-ablaufend");
  const [showMockModal, setShowMockModal] = useState(false);

  const items = useMemo(() => {
    let list: PinnwandAushang[] = PINNWAND_AUSHAENGE.slice();
    if (kategorie !== "alle")
      list = list.filter((a) => a.kategorie === kategorie);
    if (stadtteil !== "Alle")
      list = list.filter((a) => a.inserent.stadtteil === stadtteil);
    if (zeitraum !== "alle")
      list = list.filter((a) => ablaufVariant(a) === zeitraum);

    if (sort === "bald-ablaufend") {
      list = sortPinnwand(list);
    } else if (sort === "mein-quartier") {
      list = sortPinnwand(list, PREFERRED_DISTRICT);
    } else {
      // "neueste" — id-basierte Reihenfolge (Mock)
      list = list.sort((a, b) =>
        b.id.localeCompare(a.id, undefined, { numeric: true }),
      );
    }
    return list;
  }, [kategorie, stadtteil, zeitraum, sort]);

  return (
    <>
      <MarktSubNav />

      <section className="container-editorial pt-8 pb-4">
        <Link
          href="/markt"
          className="inline-flex items-center gap-1 text-[12.5px] text-ink-muted hover:text-ink mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Zurück zum Markt
        </Link>
        <p className="eyebrow">Markt · Quartier-Pinnwand</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          Alle Aushänge im Quartier.
        </h1>
        <p className="text-ink-muted text-[14.5px] mt-2 max-w-xl">
          Anbieter, Vereine, Mikro-Events. Filter nach Kategorie, Stadtteil und
          Zeitraum — oder hänge deinen eigenen Aushang auf.
        </p>
      </section>

      {/* ── CTA: Eigenen Aushang erstellen ───────────────── */}
      <section className="container-editorial pb-6">
        <button
          type="button"
          onClick={() => setShowMockModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-burgundy text-paper text-[13.5px] font-medium hover:bg-burgundy-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Eigenen Aushang erstellen
        </button>
      </section>

      {/* ── FILTER ───────────────────────────────────────── */}
      <section className="container-editorial pb-6">
        {/* Kategorie-Pillen */}
        <div className="flex flex-wrap gap-2 mb-3">
          {PINNWAND_KATEGORIEN.map((k) => {
            const Icon = FILTER_ICONS[k.key];
            const active = kategorie === k.key;
            return (
              <button
                key={k.key}
                onClick={() => setKategorie(k.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[12.5px] font-medium transition-colors min-h-[44px] md:min-h-0 ${
                  active
                    ? "bg-ink text-paper"
                    : "bg-card border border-line text-ink-muted hover:text-ink hover:border-burgundy"
                }`}
              >
                {Icon ? <Icon className="w-3.5 h-3.5" strokeWidth={2} /> : null}
                {k.label}
              </button>
            );
          })}
        </div>

        {/* Stadtteil / Zeitraum / Sortierung */}
        <div className="grid md:grid-cols-3 gap-2">
          <select
            value={stadtteil}
            onChange={(e) => setStadtteil(e.target.value)}
            className="px-3 py-2.5 text-[13px] border border-line bg-card rounded-lg focus:border-burgundy focus:outline-none"
          >
            <option>Alle</option>
            {ZH_DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <select
            value={zeitraum}
            onChange={(e) =>
              setZeitraum(e.target.value as typeof zeitraum)
            }
            className="px-3 py-2.5 text-[13px] border border-line bg-card rounded-lg focus:border-burgundy focus:outline-none"
          >
            {ABLAUF_FILTERS.map((z) => (
              <option key={z.key} value={z.key}>
                {z.label}
              </option>
            ))}
          </select>
          <div className="flex gap-1 bg-card border border-line rounded-lg p-1">
            {SORT_OPTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setSort(s.key)}
                className={`flex-1 py-2 rounded-md text-[12px] font-medium ${
                  sort === s.key
                    ? "bg-ink text-paper"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── KORK-BRETT mit allen Aushängen ──────────────── */}
      <section className="container-editorial pb-16">
        <div className="pinnwand-board p-5 md:p-8">
          <p className="text-[12px] text-ink-muted mb-4">
            {items.length} Aushang{items.length === 1 ? "" : "änge"}{" "}
            {kategorie !== "alle" || stadtteil !== "Alle" || zeitraum !== "alle"
              ? "(gefiltert)"
              : ""}
          </p>
          {items.length === 0 ? (
            <div className="p-10 text-center bg-card/70 border border-dashed border-line rounded-2xl">
              <p className="font-display text-xl">Nichts gefunden</p>
              <p className="text-[13px] text-ink-muted mt-2">
                Probier weniger Filter.
              </p>
            </div>
          ) : (
            <div className="pinnwand-grid">
              {items.map((a) => (
                <PolaroidCard key={a.id} aushang={a} />
              ))}
              <PinnwandMonetizationCard />
            </div>
          )}
        </div>
      </section>

      {/* ── MOCK MODAL ──────────────────────────────────── */}
      {showMockModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 fade-in"
          onClick={() => setShowMockModal(false)}
        >
          <div
            className="bg-card rounded-2xl max-w-md w-full p-6 card-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl leading-tight">
              Aushang aufschalten
            </h3>
            <p className="text-[13px] text-ink-muted mt-2">
              In der Vollversion kannst du hier Titel, Bild, Stadtteil und
              Ablauf-Datum festlegen. Aktuell ist alles gratis — Premium-Pin
              und Bezahlflow kommen 2027.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowMockModal(false)}
                className="px-4 py-2 rounded-full border border-line text-[13px] hover:bg-paper-dim"
              >
                Schliessen
              </button>
              <button
                disabled
                className="px-4 py-2 rounded-full bg-burgundy/60 text-paper text-[13px] cursor-not-allowed"
              >
                Demo — bald verfügbar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
