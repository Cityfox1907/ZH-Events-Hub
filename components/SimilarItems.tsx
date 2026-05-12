import Link from "next/link";
import {
  TONIGHT_EVENTS,
  DINE_VENUES,
  EXPERIENCES,
  PULSE_EVENTS,
  LIVE_EVENTS,
} from "@/lib/data";
import type { ModuleKey } from "@/lib/types";

interface Item {
  id: string;
  title: string;
  cover: string;
  meta: string;
  href: string;
}

function pickItems(module: ModuleKey, currentId: string): Item[] {
  switch (module) {
    case "tonight":
      return TONIGHT_EVENTS.filter((e) => e.id !== currentId)
        .slice(0, 4)
        .map((e) => ({
          id: e.id,
          title: e.title,
          cover: e.cover_image,
          meta: `${e.datetime} · ${e.district}`,
          href: `/tonight/${e.id}`,
        }));
    case "dine":
      return DINE_VENUES.filter((v) => v.id !== currentId)
        .slice(0, 4)
        .map((v) => ({
          id: v.id,
          title: v.name,
          cover: v.cover_image,
          meta: `${v.cuisine} · ${v.district}`,
          href: `/dine/${v.id}`,
        }));
    case "experience":
      return EXPERIENCES.filter((e) => e.id !== currentId)
        .slice(0, 4)
        .map((e) => ({
          id: e.id,
          title: e.title,
          cover: e.cover_image,
          meta: `${e.duration} · ab CHF ${e.price_per_person}`,
          href: `/experience/${e.id}`,
        }));
    case "pulse":
      return PULSE_EVENTS.filter((e) => e.id !== currentId)
        .slice(0, 4)
        .map((e) => ({
          id: e.id,
          title: e.title,
          cover: e.cover_image,
          meta: `${e.datetime} · ${e.required_tier}`,
          href: `/pulse/${e.id}`,
        }));
    case "live":
      return LIVE_EVENTS.filter((e) => e.id !== currentId)
        .slice(0, 4)
        .map((e) => ({
          id: e.id,
          title: e.title,
          cover: e.cover_image,
          meta: `${e.datetime} · ${e.price_range}`,
          href: `/live/${e.id}`,
        }));
    case "puls":
    case "markt":
    case "stimmen":
      return [];
  }
}

export function SimilarItems({
  module,
  currentId,
  title = "Ähnliche Orte",
}: {
  module: ModuleKey;
  currentId: string;
  title?: string;
}) {
  const items = pickItems(module, currentId);
  if (items.length === 0) return null;
  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl mb-5">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.map((it) => (
          <Link
            key={it.id}
            href={it.href}
            className="group bg-card border border-line rounded-xl overflow-hidden card-shadow-hover transition-shadow"
          >
            <div className="aspect-[4/3] overflow-hidden bg-paper-dim">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.cover}
                alt={it.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <p className="font-display text-[14px] leading-tight line-clamp-2 group-hover:text-burgundy">
                {it.title}
              </p>
              <p className="text-[11px] text-ink-muted mt-1 line-clamp-1">
                {it.meta}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
