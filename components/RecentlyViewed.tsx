"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRecent, onStorageChange } from "@/lib/storage";
import type { RecentlyViewed as RV } from "@/lib/types";

const MODULE_LABEL: Record<string, string> = {
  tonight: "Tonight",
  dine: "Dine",
  experience: "Experience",
  pulse: "Pulse",
  live: "Live",
};

export function RecentlyViewed() {
  const [items, setItems] = useState<RV[]>([]);

  useEffect(() => {
    setItems(getRecent());
    return onStorageChange(() => setItems(getRecent()));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="container-editorial pb-12">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-3xl">Wieder ansehen</h2>
        <span className="eyebrow hidden md:inline">Zuletzt besucht</span>
      </div>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory">
        {items.map((it) => (
          <Link
            key={`${it.module}-${it.id}`}
            href={`/${it.module}/${it.id}`}
            className="snap-start shrink-0 w-56 bg-card border border-line rounded-xl overflow-hidden card-shadow-hover transition-shadow"
          >
            <div className="aspect-[5/3] overflow-hidden bg-paper-dim">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.cover} alt={it.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <p className="eyebrow">{MODULE_LABEL[it.module] ?? it.module}</p>
              <p className="font-display text-[15px] mt-1 leading-tight line-clamp-2">
                {it.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
