"use client";

import Link from "next/link";
import { MapPin, Star, Clock, ArrowRight } from "lucide-react";
import type { MarktItem } from "@/lib/types";
import { IdentityBadge } from "./IdentityBadge";
import { useToast } from "./Toast";

interface Props {
  item: MarktItem;
  variant?: "default" | "compact";
}

export function MarktItemCard({ item, variant = "default" }: Props) {
  const { push } = useToast();
  const intentLabel = item.intent === "brauche" ? "Brauche" : "Biete";

  if (variant === "compact") {
    return (
      <div className="bg-card border border-line rounded-2xl card-shadow p-4 flex flex-col h-full">
        <div className="flex items-center gap-2 text-[10.5px]">
          <IdentityBadge tier={item.identity} />
          <span className="text-ink-faint flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {item.district}
          </span>
          <span
            className={`ml-auto px-1.5 py-0.5 rounded-full font-medium ${
              item.intent === "brauche"
                ? "bg-burgundy/10 text-burgundy"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {intentLabel}
          </span>
        </div>
        <h3 className="font-display text-[15px] mt-2 leading-tight line-clamp-2">
          {item.title}
        </h3>
        {item.price && (
          <p className="text-[12.5px] font-medium text-burgundy mt-1">{item.price}</p>
        )}
        <p className="text-[10.5px] text-ink-faint mt-auto pt-2">{item.ago}</p>
      </div>
    );
  }

  return (
    <article className="bg-card border border-line rounded-2xl card-shadow hover:card-shadow-hover transition-shadow overflow-hidden flex flex-col">
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt=""
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 flex-wrap">
          <IdentityBadge tier={item.identity} />
          <span className="text-[10.5px] text-ink-faint inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {item.district}
          </span>
          <span
            className={`ml-auto text-[10.5px] px-2 py-0.5 rounded-full font-medium ${
              item.intent === "brauche"
                ? "bg-burgundy/10 text-burgundy"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {intentLabel}
          </span>
        </div>
        <h3 className="font-display text-[16.5px] mt-2 leading-tight">
          {item.title}
        </h3>
        <p className="text-[12.5px] text-ink-muted mt-1.5 line-clamp-2">
          {item.description}
        </p>

        {item.linkedEvent && (
          <Link
            href="/entdecken"
            className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-burgundy hover:gap-2 transition-all w-max"
          >
            → Event-Details ansehen
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
        {item.linkedEventNote && !item.linkedEvent && (
          <p className="mt-2 text-[11px] text-ink-faint italic">
            {item.linkedEventNote}
          </p>
        )}

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.avatar}
            alt=""
            className="w-7 h-7 rounded-full bg-paper-dim"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11.5px] font-medium leading-none truncate">
              @{item.author}
            </p>
            <p className="text-[10px] text-ink-faint mt-0.5">{item.ago}</p>
          </div>
          {item.rating && (
            <span className="inline-flex items-center gap-0.5 text-[11px] text-ink-muted">
              <Star className="w-3 h-3 fill-brass text-brass" />
              {item.rating.toFixed(1)}
              <span className="text-ink-faint">({item.rating_count})</span>
            </span>
          )}
          {item.price && !item.rating && (
            <span className="text-[12px] font-medium text-burgundy">{item.price}</span>
          )}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <button
            onClick={() => push("✓ Nachricht gesendet (Demo)", "success")}
            className="col-span-1 py-2 rounded-lg bg-burgundy text-paper text-[12px] font-medium hover:bg-burgundy-dark"
          >
            Nachricht
          </button>
          <button
            onClick={() => push("✓ Gespeichert (Demo)", "success")}
            className="col-span-1 py-2 rounded-lg border border-line text-[12px] hover:border-burgundy hover:text-burgundy"
          >
            Speichern
          </button>
          <button
            onClick={() => push("Link kopiert (Demo)", "success")}
            className="col-span-1 py-2 rounded-lg border border-line text-[12px] hover:border-burgundy hover:text-burgundy"
          >
            Teilen
          </button>
        </div>

        {item.expires && (
          <p className="mt-2 text-[10.5px] text-ink-faint inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> Läuft ab {item.expires}
          </p>
        )}
      </div>
    </article>
  );
}
