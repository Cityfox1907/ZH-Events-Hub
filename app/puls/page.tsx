"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Info } from "lucide-react";
import { PulsSubNav } from "@/components/PulsSubNav";
import { PulsVerifiedWall } from "@/components/PulsVerifiedWall";
import { QuartierLayer } from "@/components/QuartierLayer";
import { CityThreadCard } from "@/components/CityThreadCard";
import {
  VERIFIED_UPDATES,
  QUARTIER_POSTS,
  CITY_THREADS,
} from "@/lib/phase3-data";

type Pivot = "mein-quartier" | "ganz-zuerich";

const FIKO_DISTRICT = "Kreis 11";

export default function PulsPage() {
  const [pivot, setPivot] = useState<Pivot>("mein-quartier");

  const quartierPosts = useMemo(() => {
    if (pivot === "mein-quartier") {
      return QUARTIER_POSTS.filter(
        (p) =>
          p.district === FIKO_DISTRICT ||
          p.district === "Oerlikon" ||
          p.district === "Schwamendingen",
      );
    }
    return QUARTIER_POSTS;
  }, [pivot]);

  const threads = useMemo(() => {
    // Pivot doesn't drastically filter threads; we surface all 8 but reorder.
    if (pivot === "mein-quartier") {
      return CITY_THREADS.slice().sort((a, b) =>
        a.title.toLowerCase().includes("quartier") ? -1 : 1,
      );
    }
    return CITY_THREADS;
  }, [pivot]);

  return (
    <>
      <PulsSubNav />

      {/* ── HEADER + PIVOT ─────────────────────────── */}
      <section className="container-editorial pt-8 pb-4">
        <p className="eyebrow">Puls · Verifizierte Bürger-Stimme</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          Drei Schichten der Stadt.
        </h1>
        <p className="text-ink-muted text-[14.5px] mt-2 max-w-2xl">
          Verifizierte Stadt-Quellen oben. Dein Quartier in der Mitte. Stadt-weite
          Diskussionen kuratiert unten — kein Endlos-Feed, keine Upvote-Sucht.
        </p>
      </section>

      <section className="container-editorial pb-6">
        <div className="bg-card border border-line rounded-2xl p-1.5 inline-flex">
          <button
            onClick={() => setPivot("mein-quartier")}
            className={`px-5 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors ${
              pivot === "mein-quartier"
                ? "bg-burgundy text-paper card-shadow"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Mein Quartier
          </button>
          <button
            onClick={() => setPivot("ganz-zuerich")}
            className={`px-5 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors ${
              pivot === "ganz-zuerich"
                ? "bg-burgundy text-paper card-shadow"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Ganz Zürich
          </button>
        </div>
      </section>

      {/* ── POSTING-BESCHRÄNKUNGEN ─────────────────── */}
      <section className="container-editorial pb-6">
        <div className="rounded-2xl border border-line bg-paper-dim/60 p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
            <div className="grid sm:grid-cols-3 gap-3 flex-1 text-[12.5px]">
              <div>
                <p className="font-medium">Im Quartier</p>
                <p className="text-ink-muted">Nur wohnsitz-verifizierte Nachbarn</p>
              </div>
              <div>
                <p className="font-medium">Stadt-weit</p>
                <p className="text-ink-muted">Ab Member-verifiziert</p>
              </div>
              <div>
                <p className="font-medium">Anonym</p>
                <p className="text-ink-muted">
                  Nur im <Link href="/puls/anonym" className="text-burgundy underline">Beichtstuhl</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHICHT 1: VERIFIZIERTE STADT-WAND ─────── */}
      <section className="container-editorial pb-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-[22px] leading-tight inline-flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-700" />
            Schicht 1 · Verifiziert
          </h2>
          <Link
            href="/puls/live"
            className="text-[12.5px] font-medium text-burgundy hover:underline"
          >
            Alle Updates →
          </Link>
        </div>
        <PulsVerifiedWall updates={VERIFIED_UPDATES} />
      </section>

      {/* ── SCHICHT 2: QUARTIER-LAYER ──────────────── */}
      <section className="container-editorial pb-10">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-[22px] leading-tight">
            Schicht 2 · Quartier
          </h2>
          <Link
            href="/puls/quartier"
            className="text-[12.5px] font-medium text-burgundy hover:underline"
          >
            Alle Quartier-Posts →
          </Link>
        </div>
        <QuartierLayer
          posts={quartierPosts}
          district={
            pivot === "mein-quartier" ? `${FIKO_DISTRICT} & Umgebung` : "Ganz Zürich"
          }
          activeCount={pivot === "mein-quartier" ? 247 : 1842}
        />
      </section>

      {/* ── SCHICHT 3: STADT-THREADS ───────────────── */}
      <section className="container-editorial pb-16">
        <div className="mb-4">
          <p className="eyebrow">Schicht 3 · Diese Woche bewegt Zürich</p>
          <h2 className="font-display text-3xl md:text-4xl mt-1 leading-tight">
            Acht Threads · kuratiert
          </h2>
          <p className="text-[13px] text-ink-muted mt-1 max-w-xl">
            Magazin-artig statt Feed-Sucht. Neue Themen jeden Montag.
          </p>
        </div>
        <div className="space-y-5">
          {threads.map((t) => (
            <CityThreadCard key={t.id} thread={t} />
          ))}
        </div>
        <p className="text-center text-[12.5px] text-ink-faint mt-6 italic">
          Diese Woche kuratiert · neue Themen jeden Montag
        </p>
      </section>

      {/* ── BEICHTSTUHL-PROMO ───────────────────────── */}
      <section className="container-editorial pb-20">
        <div className="rounded-2xl border border-slate-300 bg-slate-50/70 p-5 flex items-start gap-3">
          <Lock className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-700">
              Beichtstuhl
            </p>
            <h3 className="font-display text-xl mt-1 leading-tight">
              Schwere Themen? Hier anonym.
            </h3>
            <p className="text-[12.5px] text-slate-700 mt-1">
              Streng moderiert · 1 Post pro 24h · nur sensitive Themen
              (Mental-Health, Lebenslagen, Tabu).
            </p>
          </div>
          <Link
            href="/puls/anonym"
            className="shrink-0 inline-flex items-center px-3 py-2 rounded-full bg-slate-800 text-paper text-[12px] font-medium hover:bg-slate-900"
          >
            Beichtstuhl öffnen
          </Link>
        </div>
      </section>
    </>
  );
}
