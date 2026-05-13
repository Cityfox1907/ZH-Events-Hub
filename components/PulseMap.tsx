"use client";

import { useState } from "react";
import { Car, Sparkles, MessageCircle, Calendar, Flame } from "lucide-react";

const LAYERS = [
  { key: "traffic", label: "Verkehr", Icon: Car },
  { key: "kultur", label: "Kultur", Icon: Sparkles },
  { key: "community", label: "Community", Icon: MessageCircle },
  { key: "events", label: "Events", Icon: Calendar },
  { key: "heatmap", label: "Heatmap", Icon: Flame },
] as const;

export function PulseMap() {
  const [active, setActive] = useState<Set<string>>(
    new Set(["events", "community"])
  );

  function toggle(key: string) {
    setActive((s) => {
      const next = new Set(s);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="bg-card border border-line rounded-2xl card-shadow overflow-hidden">
      <div className="px-5 py-4 border-b border-line flex items-center justify-between">
        <div>
          <p className="eyebrow">Live-Pulse-Map</p>
          <h3 className="font-display text-xl mt-0.5">Zürich in Echtzeit</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-burgundy zb-pulse" />
          Live
        </span>
      </div>

      <div className="px-5 py-3 border-b border-line flex flex-wrap gap-1.5">
        {LAYERS.map(({ key, label, Icon }) => {
          const on = active.has(key);
          return (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-medium border transition-colors ${
                on
                  ? "bg-burgundy text-white border-burgundy"
                  : "bg-paper border-line text-ink-muted hover:text-ink"
              }`}
            >
              <Icon className="w-3 h-3" strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="relative aspect-[16/10] md:aspect-[16/8] bg-paper-dim overflow-hidden">
        <svg
          viewBox="0 0 800 400"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(15,77,168,0.08)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#grid)" />
          <path
            d="M 0 200 Q 200 150, 380 200 T 800 220"
            stroke="rgba(15,77,168,0.35)"
            strokeWidth="3"
            fill="none"
          />
          <ellipse
            cx="420"
            cy="240"
            rx="80"
            ry="40"
            fill="rgba(15,77,168,0.20)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            Map-Komponente
          </span>
          <p className="text-[13px] text-ink-muted mt-2 max-w-xs">
            Echte Map-Tiles und Daten-Pins folgen in Phase 2 (Leaflet +
            OpenStreetMap).
          </p>
        </div>
      </div>
    </div>
  );
}
