"use client";

import { Lock, ShieldCheck } from "lucide-react";
import { PulsSubNav } from "@/components/PulsSubNav";
import { useToast } from "@/components/Toast";

const BEICHT_POSTS = [
  {
    id: "b1",
    text: "Ich arbeite in der Finance-Branche und komme nicht mehr zurecht. Burnout-Anzeichen, niemandem will ich es eingestehen. Wer kennt gute anonyme Beratung in Zürich?",
    ago: "vor 2h",
    reactions: 17,
  },
  {
    id: "b2",
    text: "Bin alleinerziehend und schäme mich, in der Migros zur Aktion zu greifen. Wann hört dieses Stigma auf?",
    ago: "vor 5h",
    reactions: 42,
  },
  {
    id: "b3",
    text: "Mein Partner trinkt seit Monaten zu viel — ich weiss nicht, wie ich es ansprechen soll. Erfahrungen?",
    ago: "vor 12h",
    reactions: 28,
  },
  {
    id: "b4",
    text: "Bin neu in Zürich und habe keine Freunde gefunden in 8 Monaten. Einsamkeit nimmt zu. Wie habt ihr es geschafft?",
    ago: "vor 18h",
    reactions: 64,
  },
];

export default function PulsAnonymPage() {
  const { push } = useToast();
  return (
    <>
      <PulsSubNav />
      <section className="container-editorial pt-8 pb-4">
        <p className="eyebrow inline-flex items-center gap-1 text-slate-700">
          <Lock className="w-3.5 h-3.5" /> Beichtstuhl-Modus
        </p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          Anonym. Streng moderiert.
        </h1>
        <p className="text-ink-muted text-[14.5px] mt-2 max-w-xl">
          Nur für sensitive Themen — Mental-Health, schwierige Lebenslagen,
          Tabu-Themen. 1 Post pro 24h, keine Engagement-Counter-Sucht.
        </p>
      </section>

      <section className="container-editorial pb-6">
        <div className="rounded-2xl border border-slate-300 bg-slate-50/70 p-5">
          <div className="grid sm:grid-cols-3 gap-4 text-[12.5px]">
            <div>
              <p className="font-medium inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Anonym
              </p>
              <p className="text-slate-700 mt-1">Kein Profil, keine Spur.</p>
            </div>
            <div>
              <p className="font-medium">Streng moderiert</p>
              <p className="text-slate-700 mt-1">
                Team prüft alles vor Veröffentlichung.
              </p>
            </div>
            <div>
              <p className="font-medium">1 Post / 24h</p>
              <p className="text-slate-700 mt-1">
                Schützt vor Flooding und Sucht.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial pb-6">
        <button
          onClick={() =>
            push(
              "Beichtstuhl-Post-Flow folgt (Demo) — Team prüft alle Posts vor Veröffentlichung",
            )
          }
          className="w-full p-4 rounded-2xl border border-dashed border-slate-300 bg-card text-[13px] text-slate-700 hover:border-slate-500"
        >
          + Anonym posten — nächste Möglichkeit in 23h 12min
        </button>
      </section>

      <section className="container-editorial pb-20">
        <ul className="space-y-3">
          {BEICHT_POSTS.map((b) => (
            <li
              key={b.id}
              className="bg-card border border-slate-200 rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <span aria-hidden>⚪</span>
                <span className="font-medium">Anonym</span>
                <span className="text-slate-400">· {b.ago}</span>
              </div>
              <p className="text-[14px] mt-2 leading-relaxed text-ink">{b.text}</p>
              <p className="text-[11px] text-slate-400 mt-3">
                {b.reactions} Antworten · vom Team moderiert
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
