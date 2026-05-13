"use client";

import { useEffect, useState } from "react";
import { Radio, MapPin, Train, Sparkles, MessageCircle } from "lucide-react";

const UPDATES = [
  {
    Icon: Radio,
    color: "text-red-600",
    label: "LIVE · ZVV",
    text: "Tram 11 Verspätung 8 Min — Bauarbeiten Stauffacher",
    district: "Kreis 4",
  },
  {
    Icon: MapPin,
    color: "text-burgundy",
    label: "Bellevue",
    text: "Klimademo friedlich, rund 2'500 Teilnehmer auf dem Platz",
    district: "Kreis 1",
  },
  {
    Icon: Radio,
    color: "text-brass",
    label: "MeteoSchweiz",
    text: "Gewitter um 19 Uhr — bringt Schirm mit",
    district: "Stadt",
  },
  {
    Icon: Sparkles,
    color: "text-burgundy",
    label: "@JazzClubMoods",
    text: "Heute 21 Uhr — Trio aus New Orleans, noch 6 Plätze",
    district: "Kreis 5",
  },
  {
    Icon: Train,
    color: "text-brass",
    label: "@VeloKurierin",
    text: "Bahnhofstrasse Höhe Globus dicht — via Sihlstrasse",
    district: "Kreis 1",
  },
  {
    Icon: Sparkles,
    color: "text-burgundy",
    label: "FCZ vs YB",
    text: "Letzigrund, Anpfiff 20:30 — Restkarten Sektor B",
    district: "Kreis 4",
  },
  {
    Icon: MapPin,
    color: "text-brass",
    label: "@ParkOerlikon",
    text: "Spielplatz Bremgartner: neuer Wasserspielbereich heute offen",
    district: "Kreis 11",
  },
  {
    Icon: MessageCircle,
    color: "text-burgundy",
    label: "Frauenbadi",
    text: "Saisonstart heute, 18° Wassertemperatur, ab 9 Uhr offen",
    district: "Kreis 1",
  },
];

export function LivePulsTicker() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % UPDATES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const u = UPDATES[idx];
  return (
    <div className="bg-card border border-line rounded-2xl card-shadow p-4 md:p-5 flex items-center gap-4">
      <span className="relative inline-flex items-center justify-center w-9 h-9 shrink-0">
        <span className="absolute inset-0 rounded-full bg-burgundy/15 zb-pulse" />
        <u.Icon className={`w-4 h-4 ${u.color}`} strokeWidth={1.8} />
      </span>
      <div className="flex-1 min-w-0 fade-in" key={idx}>
        <p className="text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          {u.label} · {u.district}
        </p>
        <p className="text-[14px] mt-1 leading-snug">{u.text}</p>
      </div>
      <div className="hidden md:flex gap-1 shrink-0">
        {UPDATES.map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === idx ? "bg-burgundy" : "bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
