"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { getBookmarks, onStorageChange } from "@/lib/storage";
import type { BookmarkRecord } from "@/lib/types";

const MODULE_LABEL: Record<string, string> = {
  tonight: "Tonight",
  dine: "Dine",
  experience: "Experience",
  pulse: "Pulse",
  live: "Live",
};

const MODULE_TONE: Record<string, string> = {
  tonight: "bg-burgundy/10 text-burgundy",
  dine: "bg-brass/15 text-brass",
  experience: "bg-paper-dim text-ink-muted",
  pulse: "bg-ink/10 text-ink",
  live: "bg-burgundy/20 text-burgundy",
};

export default function FavoritesPage() {
  const [items, setItems] = useState<BookmarkRecord[]>([]);

  useEffect(() => {
    setItems(getBookmarks());
    return onStorageChange(() => setItems(getBookmarks()));
  }, []);

  const grouped = items.reduce<Record<string, BookmarkRecord[]>>((acc, b) => {
    (acc[b.module] ||= []).push(b);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="Favoriten"
        title={items.length === 0 ? "Noch nichts gespeichert." : `${items.length} Favorit${items.length === 1 ? "" : "en"}`}
        subtitle="Alles, was du mit dem Herz gespeichert hast — geordnet nach Modul. Lokal in deinem Browser."
      />

      <section className="container-editorial pb-20">
        {items.length === 0 ? (
          <div className="p-12 text-center bg-card border border-line rounded-2xl">
            <Heart className="w-10 h-10 mx-auto text-ink-faint" />
            <p className="font-display text-2xl mt-4">Noch nichts gespeichert</p>
            <p className="text-[14px] text-ink-muted mt-2 max-w-md mx-auto">
              Klick auf das Herz auf jeder Karte, um sie hier zu sammeln. Deine
              Favoriten bleiben in deinem Browser.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Link href="/entdecken" className="px-4 py-2 rounded-full bg-burgundy text-paper text-[13px] hover:bg-burgundy-dark">
                Events entdecken
              </Link>
              <Link href="/orte" className="px-4 py-2 rounded-full border border-line text-[13px] hover:border-burgundy">
                Orte ansehen
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([module, list]) => (
              <div key={module}>
                <div className="flex items-baseline gap-3 mb-4">
                  <h2 className="font-display text-2xl">{MODULE_LABEL[module]}</h2>
                  <span className="text-[12px] text-ink-faint">{list.length}</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {list.map((b) => (
                    <Link
                      key={`${b.module}-${b.id}`}
                      href={`/${b.module}/${b.id}`}
                      className="p-5 bg-card border border-line rounded-xl card-shadow-hover transition-shadow"
                    >
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${MODULE_TONE[b.module]}`}>
                        {MODULE_LABEL[b.module]}
                      </span>
                      <p className="font-display text-lg mt-2 leading-tight">{b.title}</p>
                      <p className="text-[12px] text-ink-faint mt-2">
                        Gespeichert {new Date(b.savedAt).toLocaleDateString("de-CH")}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
