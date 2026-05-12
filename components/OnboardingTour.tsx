"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import {
  hasOnboarded,
  markOnboarded,
  setDistrict as saveDistrict,
} from "@/lib/storage";
import { PULS_DISTRICTS } from "@/lib/data";

const SLIDES = [
  {
    eyebrow: "Willkommen bei ZurichTonight",
    title: "Das digitale Wohnzimmer aller Zürcher.",
    body: "Entdecke, vernetze, gestalte mit. Acht Module unter einem Dach — komplett gratis.",
    emoji: "👋",
  },
  {
    eyebrow: "Discovery",
    title: "Tonight · Dine · Experience · Live",
    body: "Was läuft heute Abend, wo wird heute gegessen, welche Erlebnisse und Pop-ups die Stadt jetzt prägt.",
    emoji: "🎭",
  },
  {
    eyebrow: "Community",
    title: "Puls · Markt · Stimmen",
    body: "Puls ist der Community-Feed (Tipps, Fragen, Live-Updates). Markt sind lokale Anzeigen. Stimmen ist Stadt-Demokratie — Umfragen, Initiativen, Index.",
    emoji: "🏘",
  },
  {
    eyebrow: "Dein Stadtteil",
    title: "Wo wohnst du?",
    body: "Dein Stadtteil wird dein Standard-Filter — du siehst dann zuerst, was in deinem Quartier passiert.",
    emoji: "📍",
    chooseDistrict: true,
  },
];

export function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [district, setDistrict] = useState<string>("Kreis 5");

  useEffect(() => {
    // Show after mount if user hasn't onboarded
    const timer = setTimeout(() => {
      if (!hasOnboarded()) setOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    markOnboarded();
    setOpen(false);
  }

  function next() {
    if (step >= SLIDES.length - 1) {
      saveDistrict(district);
      close();
    } else {
      setStep((s) => s + 1);
    }
  }

  if (!open) return null;

  const slide = SLIDES[step];
  const last = step === SLIDES.length - 1;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end md:items-center justify-center bg-ink/50 fade-in"
      onClick={close}
    >
      <div
        className="w-full md:max-w-md bg-card md:rounded-2xl rounded-t-2xl border border-line p-6 md:p-8 relative"
        style={{ boxShadow: "var(--shadow-modal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Schliessen"
          onClick={close}
          className="absolute top-4 right-4 text-ink-muted hover:text-ink"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1 mb-4">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${
                i === step ? "bg-burgundy" : i < step ? "bg-burgundy/40" : "bg-paper-dim"
              }`}
            />
          ))}
        </div>

        <div className="text-5xl">{slide.emoji}</div>
        <p className="eyebrow mt-3">{slide.eyebrow}</p>
        <h2 className="font-display text-3xl mt-1.5 leading-tight">{slide.title}</h2>
        <p className="text-[14px] text-ink-muted mt-3 leading-relaxed">{slide.body}</p>

        {slide.chooseDistrict && (
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="mt-4 w-full px-3 py-2.5 text-[14px] border border-line bg-paper rounded-lg focus:border-burgundy focus:outline-none"
          >
            {PULS_DISTRICTS.filter((d) => d !== "Alle").map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        )}

        <div className="mt-6 flex items-center gap-2">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="px-4 py-2.5 rounded-lg border border-line text-[13px] hover:border-burgundy"
            >
              Zurück
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-burgundy text-paper text-[13px] font-medium hover:bg-burgundy-dark"
          >
            {last ? "Los geht's" : "Weiter"} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {!last && (
          <button
            onClick={close}
            className="mt-3 w-full text-[12px] text-ink-faint hover:text-burgundy"
          >
            Überspringen
          </button>
        )}
      </div>
    </div>
  );
}
