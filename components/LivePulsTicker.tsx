"use client";

import { useEffect, useState } from "react";
import { Radio, MapPin, Train, Sparkles, MessageCircle } from "lucide-react";

const UPDATES = [
  {
    Icon: Train,
    color: "text-burgundy",
    label: "ZVV",
    text: "Tram 11 — 8 Min Verspätung, Bahnhof Stadelhofen",
    district: "Kreis 1",
  },
  {
    Icon: Sparkles,
    color: "text-brass",
    label: "Live",
    text: "Frau Gerolds Garten — Pop-up Vernissage gerade gestartet",
    district: "Kreis 5",
  },
  {
    Icon: MessageCircle,
    color: "text-burgundy",
    label: "Community",
    text: "47 Posts in den letzten 30 Min · @kreisfünfer +12",
    district: "Stadt",
  },
  {
    Icon: MapPin,
    color: "text-brass",
    label: "Spot",
    text: "Kein Schlange mehr im Schober — Tische frei",
    district: "Kreis 1",
  },
  {
    Icon: Radio,
    color: "text-burgundy",
    label: "MeteoSchweiz",
    text: "12°, leichter Regen — heute Abend trocken",
    district: "Stadt",
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
