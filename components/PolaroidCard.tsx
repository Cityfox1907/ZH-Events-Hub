"use client";

import Link from "next/link";
import { Store, Users, Sparkles, ShieldCheck } from "lucide-react";
import {
  ablaufVariant,
  type PinnwandAushang,
  type PinnwandKategorie,
} from "@/data/pinnwand";
import { IDENTITY_META } from "@/lib/phase3-data";

const CAT_META: Record<
  PinnwandKategorie,
  { label: string; Icon: typeof Store }
> = {
  anbieter: { label: "Anbieter", Icon: Store },
  verein: { label: "Verein", Icon: Users },
  "mikro-event": { label: "Mikro-Event", Icon: Sparkles },
};

function AblaufBadge({ a }: { a: PinnwandAushang }) {
  const v = ablaufVariant(a);
  const base =
    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium leading-none whitespace-nowrap";
  if (v === "heute")
    return (
      <span className={`${base} bg-red-50 text-red-700 ring-1 ring-red-200`}>
        {a.ablauf}
      </span>
    );
  if (v === "bald")
    return (
      <span
        className={`${base} bg-orange-50 text-orange-700 ring-1 ring-orange-200`}
      >
        {a.ablauf}
      </span>
    );
  if (v === "laufend")
    return <span className={`${base} text-ink-faint`}>{a.ablauf}</span>;
  return (
    <span className={`${base} bg-paper-dim text-ink-muted`}>{a.ablauf}</span>
  );
}

export function PolaroidCard({
  aushang,
  mobile = false,
}: {
  aushang: PinnwandAushang;
  mobile?: boolean;
}) {
  const { Icon, label } = CAT_META[aushang.kategorie];
  const ident = IDENTITY_META[aushang.inserent.verifikation];

  // Mobile: dämpfe Rotation auf ±1°
  const rot = mobile
    ? Math.max(-1, Math.min(1, aushang.rotation))
    : aushang.rotation;

  // Schatten leicht variieren (seeded by id last char)
  const seed = parseInt(aushang.id.replace(/\D/g, "")) || 1;
  const shadowOpacity = 0.10 + ((seed * 7) % 5) * 0.01;

  return (
    <Link
      href={aushang.crossLink.route}
      className="polaroid group block focus:outline-none"
      style={
        {
          "--polaroid-rot": `${rot}deg`,
          "--polaroid-shadow": `0 8px 24px rgba(10, 23, 51, ${shadowOpacity}), 0 2px 6px rgba(10, 23, 51, 0.06)`,
        } as React.CSSProperties
      }
      aria-label={`${label}: ${aushang.titel}`}
    >
      <div className="polaroid-card">
        {/* Pinnnadel */}
        <span aria-hidden className="polaroid-pin" />

        {/* Bild */}
        <div className="polaroid-photo">
          <img
            src={aushang.bild}
            alt={aushang.titel}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Polaroid-Rand unten */}
        <div className="polaroid-caption">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-paper-dim/80 text-[9.5px] uppercase tracking-wider text-ink-muted font-medium">
              <Icon className="w-2.5 h-2.5" strokeWidth={2} />
              {label}
            </span>
            <AblaufBadge a={aushang} />
          </div>
          <h3
            className="font-display text-[15px] leading-snug text-ink line-clamp-1"
            title={aushang.titel}
          >
            {aushang.titel}
          </h3>
          <p className="text-[11.5px] text-ink-muted mt-0.5 line-clamp-2 leading-snug">
            {aushang.beschreibung}
          </p>
          <div className="flex items-center justify-between mt-2 text-[10px] text-ink-faint">
            <span className="truncate max-w-[55%]" title={aushang.inserent.name}>
              {aushang.inserent.stadtteil}
            </span>
            <span
              className="inline-flex items-center gap-0.5"
              title={ident.label}
            >
              <ShieldCheck className="w-2.5 h-2.5" strokeWidth={2} />
              <span>{ident.dot}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * Monetarisierungs-Karte am Ende der Pinnwand —
 * leeres weisses Brett mit Pinnnadel, keine Polaroid-Form.
 */
export function PinnwandMonetizationCard() {
  return (
    <div className="polaroid polaroid--empty">
      <div className="polaroid-card polaroid-card--empty">
        <span aria-hidden className="polaroid-pin" />
        <div className="px-4 py-6 md:px-5 md:py-7 flex flex-col gap-3 text-center">
          <h3 className="font-display text-lg leading-tight">
            Du hast was anzukündigen?
          </h3>
          <div className="flex flex-col gap-2 mt-1">
            <button
              type="button"
              className="px-3 py-2 rounded-full bg-burgundy text-paper text-[11.5px] font-medium hover:bg-burgundy-dark transition-colors"
            >
              Aushang aufschalten — 7 Tage gratis
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded-full bg-card border border-line text-[11.5px] font-medium hover:border-burgundy transition-colors"
            >
              Premium-Pin — 14 Tage, oben fixiert — CHF 9.90
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded-full bg-card border border-line text-[11.5px] font-medium hover:border-burgundy transition-colors"
            >
              Vereins-Aushang — 30 Tage gratis
            </button>
          </div>
          <p className="text-[10px] text-ink-faint mt-1">
            Aktuell alles gratis · Premium kommt 2027
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Kompakte Mini-Polaroid für Dashboard-Streiflicht.
 */
export function MiniPolaroid({ aushang }: { aushang: PinnwandAushang }) {
  const { Icon, label } = CAT_META[aushang.kategorie];
  return (
    <Link
      href={aushang.crossLink.route}
      className="polaroid polaroid--mini block"
      style={
        {
          "--polaroid-rot": `${aushang.rotation * 0.6}deg`,
          "--polaroid-shadow":
            "0 6px 16px rgba(10, 23, 51, 0.10), 0 1px 3px rgba(10, 23, 51, 0.06)",
        } as React.CSSProperties
      }
      aria-label={`${label}: ${aushang.titel}`}
    >
      <div className="polaroid-card">
        <span aria-hidden className="polaroid-pin" />
        <div className="polaroid-photo polaroid-photo--mini">
          <img src={aushang.bild} alt={aushang.titel} loading="lazy" />
        </div>
        <div className="polaroid-caption polaroid-caption--mini">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-paper-dim/80 text-[9.5px] uppercase tracking-wider text-ink-muted font-medium">
            <Icon className="w-2.5 h-2.5" strokeWidth={2} />
            {label}
          </span>
          <h3 className="font-display text-[13.5px] leading-snug mt-1.5 line-clamp-1">
            {aushang.titel}
          </h3>
          <p className="text-[10.5px] text-ink-faint mt-0.5">
            {aushang.inserent.stadtteil} · {aushang.ablauf}
          </p>
        </div>
      </div>
    </Link>
  );
}
