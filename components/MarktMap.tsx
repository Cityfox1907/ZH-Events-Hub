"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { MarktItem } from "@/lib/types";
import { IdentityBadge } from "./IdentityBadge";
import { MARKT_VERTICALS } from "@/lib/phase3-data";

// Zürich Bounding-Box (rough): we plot relative coords on an SVG.
// lat range ~ 47.32 - 47.43 (south → north on Y)
// lng range ~ 8.45 - 8.62  (west → east on X)
const LAT_MIN = 47.32;
const LAT_MAX = 47.45;
const LNG_MIN = 8.45;
const LNG_MAX = 8.62;

// District anchor points (rough centers) — used when no lat/lng on item.
const DISTRICT_ANCHORS: Record<string, { lat: number; lng: number }> = {
  "Kreis 1": { lat: 47.372, lng: 8.541 },
  "Kreis 2": { lat: 47.341, lng: 8.534 },
  "Kreis 3": { lat: 47.362, lng: 8.515 },
  "Kreis 4": { lat: 47.375, lng: 8.528 },
  "Kreis 5": { lat: 47.385, lng: 8.527 },
  "Kreis 6": { lat: 47.388, lng: 8.548 },
  "Kreis 7": { lat: 47.367, lng: 8.566 },
  "Kreis 8": { lat: 47.355, lng: 8.559 },
  "Kreis 9": { lat: 47.388, lng: 8.483 },
  "Kreis 10": { lat: 47.406, lng: 8.512 },
  "Kreis 11": { lat: 47.412, lng: 8.545 },
  "Kreis 12": { lat: 47.408, lng: 8.583 },
  Oerlikon: { lat: 47.412, lng: 8.545 },
  Schwamendingen: { lat: 47.408, lng: 8.583 },
};

function projectXY(item: MarktItem): { x: number; y: number } {
  let lat = item.lat;
  let lng = item.lng;
  if (lat === undefined || lng === undefined) {
    const a = DISTRICT_ANCHORS[item.district] ?? { lat: 47.376, lng: 8.541 };
    lat = a.lat;
    lng = a.lng;
  }
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 800;
  const y = 400 - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * 400;
  return { x, y };
}

const VERTICAL_COLOR: Record<string, string> = {
  tickets: "#a8324a",
  mitfahr: "#0f4da8",
  nachbarschaft: "#1f7a3b",
  verschenken: "#b56f1e",
  dienstleister: "#5b3e96",
};

interface Props {
  items: MarktItem[];
  district?: string;
}

export function MarktMap({ items, district }: Props) {
  const [active, setActive] = useState<MarktItem | null>(null);

  return (
    <div className="bg-card border border-line rounded-2xl card-shadow overflow-hidden">
      <div className="px-5 py-3 border-b border-line flex items-center justify-between">
        <div>
          <p className="eyebrow">Karten-Ansicht</p>
          <p className="text-[12.5px] text-ink-muted">
            {district && district !== "Alle"
              ? `Anzeigen in ${district} + Velo-Distanz`
              : `Anzeigen in der ganzen Stadt`}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-burgundy zb-pulse" />
          {items.length} Pins
        </span>
      </div>

      <div className="relative aspect-[16/9] md:aspect-[16/8] bg-paper-dim overflow-hidden">
        <svg
          viewBox="0 0 800 400"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <pattern
              id="marktgrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(15,77,168,0.07)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#marktgrid)" />
          {/* Limmat schematic */}
          <path
            d="M 320 380 Q 360 320, 400 260 T 480 120 T 540 40"
            stroke="rgba(15,77,168,0.35)"
            strokeWidth="3"
            fill="none"
          />
          {/* Zürichsee */}
          <ellipse
            cx="400"
            cy="380"
            rx="180"
            ry="40"
            fill="rgba(15,77,168,0.18)"
          />
          <text
            x="20"
            y="30"
            fontSize="11"
            fill="rgba(10,23,51,0.4)"
            fontFamily="ui-sans-serif"
          >
            ZÜRICH · schematisch
          </text>
        </svg>

        {/* Pins */}
        <div className="absolute inset-0">
          {items.map((it) => {
            const { x, y } = projectXY(it);
            const color = VERTICAL_COLOR[it.vertical] ?? "#a8324a";
            return (
              <button
                key={it.id}
                onClick={() => setActive(it)}
                className="absolute -translate-x-1/2 -translate-y-full focus:outline-none"
                style={{ left: `${(x / 800) * 100}%`, top: `${(y / 400) * 100}%` }}
                aria-label={it.title}
              >
                <span
                  className="block w-3 h-3 rounded-full ring-2 ring-paper shadow"
                  style={{ background: color }}
                />
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 right-2 md:right-auto bg-paper/90 backdrop-blur border border-line rounded-lg px-3 py-2 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px]">
          {MARKT_VERTICALS.map((v) => (
            <span key={v.key} className="inline-flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: VERTICAL_COLOR[v.key] }}
              />
              {v.short}
            </span>
          ))}
        </div>
      </div>

      {active && (
        <div className="border-t border-line p-4 bg-paper-dim/40">
          <div className="flex items-start gap-3">
            {active.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.image}
                alt=""
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <IdentityBadge tier={active.identity} />
                <span className="text-[10.5px] text-ink-faint inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {active.district}
                </span>
                <span
                  className={`text-[10.5px] px-1.5 py-0.5 rounded-full font-medium ${
                    active.intent === "brauche"
                      ? "bg-burgundy/10 text-burgundy"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {active.intent === "brauche" ? "Brauche" : "Biete"}
                </span>
              </div>
              <p className="font-display text-[15px] mt-1 leading-tight line-clamp-2">
                {active.title}
              </p>
              {active.price && (
                <p className="text-[12px] font-medium text-burgundy mt-1">
                  {active.price}
                </p>
              )}
              {active.linkedEvent && (
                <Link
                  href={`/entdecken/kalender?slug=${active.linkedEvent.slug}`}
                  className="inline-block mt-1 text-[11.5px] font-medium text-burgundy hover:underline"
                >
                  → Event-Details ansehen
                </Link>
              )}
            </div>
            <button
              onClick={() => setActive(null)}
              className="text-[11px] text-ink-faint hover:text-ink"
            >
              schliessen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
