"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";
import { MarktSubNav } from "@/components/MarktSubNav";
import { MarktItemCard } from "@/components/MarktItemCard";
import { IdentityPyramidLegend } from "@/components/IdentityBadge";
import { PinnwandSection } from "@/components/PinnwandSection";
import {
  MARKT_ITEMS,
  MARKT_VERTICALS,
  ZH_DISTRICTS,
} from "@/lib/phase3-data";
import type { MarktIntent } from "@/lib/types";

const TIME_FILTERS = [
  { key: "heute", label: "Heute" },
  { key: "woche", label: "Diese Woche" },
  { key: "demnaechst", label: "Demnächst" },
] as const;

export default function MarktPage() {
  const [intent, setIntent] = useState<MarktIntent>("brauche");
  const [district, setDistrict] = useState<string>("Mein Quartier + Velo-Distanz");
  const [time, setTime] = useState<(typeof TIME_FILTERS)[number]["key"]>("heute");

  const filtered = useMemo(() => {
    let list = MARKT_ITEMS.slice();
    list = list.filter((i) => i.intent === intent);
    if (district !== "Mein Quartier + Velo-Distanz" && district !== "Alle") {
      list = list.filter((i) => i.district === district);
    }
    return list;
  }, [intent, district]);

  return (
    <>
      <MarktSubNav />

      {/* ── HERO HEADER ────────────────────────────────── */}
      <section className="container-editorial pt-8 pb-4">
        <p className="eyebrow">Markt · Spontan & Vertrauen</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          Was Zürich <span className="italic">jetzt</span> braucht.
        </h1>
        <p className="text-ink-muted text-[14.5px] mt-2 max-w-xl">
          Tickets, Nachbarschaftshilfe, Verschenken — zeit-zentriert, hyperlokal,
          verifiziert. Kein Tutti-Klon: hier zählt nur, was nur in deinem Quartier
          funktioniert.
        </p>
      </section>

      {/* ── INTENT TOGGLE ──────────────────────────────── */}
      <section className="container-editorial pb-4">
        <div className="bg-card border border-line rounded-2xl p-1.5 inline-flex w-full md:w-auto">
          <button
            onClick={() => setIntent("brauche")}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-[14px] font-medium transition-colors ${
              intent === "brauche"
                ? "bg-burgundy text-paper card-shadow"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Ich brauche heute
          </button>
          <button
            onClick={() => setIntent("biete")}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-[14px] font-medium transition-colors ${
              intent === "biete"
                ? "bg-emerald-700 text-paper card-shadow"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Ich biete heute
          </button>
        </div>
      </section>

      {/* ── FILTER ROW ─────────────────────────────────── */}
      <section className="container-editorial pb-4">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-2">
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="px-3 py-2.5 text-[13px] border border-line bg-card rounded-lg focus:border-burgundy focus:outline-none"
          >
            <option>Mein Quartier + Velo-Distanz</option>
            <option>Alle</option>
            {ZH_DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <div className="flex gap-1 bg-card border border-line rounded-lg p-1">
            {TIME_FILTERS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTime(t.key)}
                className={`flex-1 py-2 rounded-md text-[12.5px] font-medium ${
                  time === t.key
                    ? "bg-ink text-paper"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUARTIER-PINNWAND (Hero) ──────────────────── */}
      <PinnwandSection />

      {/* ── ANTI-DISINTERMEDIATION NOTE ───────────────── */}
      <section className="container-editorial pb-6">
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-paper-dim border border-line text-[12.5px] text-ink-muted">
          <ShieldCheck className="w-4 h-4 text-burgundy shrink-0" />
          <p>
            Direktkontakt erst nach 3 verifizierten Interaktionen — schützt deine
            Privatsphäre und filtert Spammer.
          </p>
        </div>
      </section>

      {/* ── LIST ──────────────────────────────────────── */}
      <section className="container-editorial pb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-2xl leading-tight">
            {intent === "brauche" ? "Aktuelle Angebote für dich" : "Anfragen, denen du helfen kannst"}
            <span className="text-ink-faint text-[14px] ml-2 font-sans">
              ({filtered.length})
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 p-10 text-center bg-card border border-line rounded-2xl">
              <p className="font-display text-xl">Nichts passendes</p>
              <p className="text-[13px] text-ink-muted mt-2">
                Probier ein anderes Quartier oder schau in einer Vertikale unten nach.
              </p>
            </div>
          ) : (
            filtered.map((item) => <MarktItemCard key={item.id} item={item} />)
          )}
        </div>
      </section>

      {/* ── 5 VERTIKALEN-SEKTIONEN ──────────────────── */}
      {MARKT_VERTICALS.map((v) => {
        const items = MARKT_ITEMS.filter((i) => i.vertical === v.key).slice(0, 6);
        return (
          <section key={v.key} className="container-editorial pb-12">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <p className="eyebrow">{v.emoji} {v.label}</p>
                <h2 className="font-display text-2xl md:text-3xl mt-1 leading-tight">
                  {v.label}
                </h2>
                <p className="text-[13px] text-ink-muted mt-1 max-w-xl">{v.blurb}</p>
                {v.requiresWohnsitz && (
                  <p className="text-[11.5px] text-burgundy mt-1 inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Wohnsitz-Verifikation Pflicht für Inserate
                  </p>
                )}
              </div>
              <Link
                href={v.href}
                className="text-[13px] font-medium text-burgundy hover:underline shrink-0"
              >
                Mehr ansehen →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((it) => (
                <MarktItemCard key={it.id} item={it} />
              ))}
            </div>
          </section>
        );
      })}

      {/* ── IDENTITY-PYRAMID LEGENDE ────────────────── */}
      <section className="container-editorial pb-12">
        <IdentityPyramidLegend />
      </section>

      {/* ── EHRLICHE TUTTI-EMPFEHLUNG ──────────────── */}
      <section className="container-editorial pb-20">
        <div className="rounded-2xl border border-line bg-paper-dim/60 p-6 flex flex-col md:flex-row md:items-center gap-4">
          <Sparkles className="w-6 h-6 text-ink-muted shrink-0" />
          <div className="flex-1">
            <p className="eyebrow">Weitere Anzeigen</p>
            <h3 className="font-display text-xl mt-1">
              Möbel, WG, Jobs? Tutti & Flatfox machen das besser.
            </h3>
            <p className="text-[13px] text-ink-muted mt-1">
              Wir bauen kein allgemeines Anzeigen-Verzeichnis — wo Tutti und
              Flatfox stark sind, empfehlen wir sie ehrlich. Markt fokussiert auf
              Spontan, Lokal, Vertrauen.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <a
              href="https://www.tutti.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-card border border-line text-[12.5px] hover:border-burgundy"
            >
              Tutti.ch <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://flatfox.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-card border border-line text-[12.5px] hover:border-burgundy"
            >
              Flatfox.ch <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
