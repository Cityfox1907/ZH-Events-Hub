"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, BadgeCheck, MoreHorizontal } from "lucide-react";
import { FEED_TRENDS, FOLLOW_SUGGESTIONS } from "@/lib/feed";
import { formatCount } from "./PostCard";

export function RightRail() {
  return (
    <div className="sticky top-0 h-screen overflow-y-auto py-2 pl-6 space-y-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <SearchBox />
      <TrendsCard />
      <FollowCard />
      <RailFooter />
    </div>
  );
}

function SearchBox() {
  return (
    <label className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-paper-dim border border-transparent focus-within:border-burgundy focus-within:bg-card transition-colors">
      <Search className="w-4 h-4 text-ink-faint shrink-0" />
      <input
        type="search"
        placeholder="Zürich durchsuchen"
        className="flex-1 bg-transparent text-[14px] placeholder:text-ink-faint focus:outline-none"
      />
    </label>
  );
}

function TrendsCard() {
  return (
    <section className="rounded-2xl bg-paper-dim/60 border border-line overflow-hidden">
      <h2 className="font-display text-[20px] px-4 pt-3 pb-1">
        Was in Zürich läuft
      </h2>
      {FEED_TRENDS.map((t) => (
        <Link
          key={t.tag}
          href="/entdecken"
          className="block px-4 py-2.5 hover:bg-paper-dim transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[12px] text-ink-faint">
                {t.rank} · {t.category}
              </p>
              <p className="text-[14.5px] font-bold mt-0.5 truncate">
                #{t.tag}
              </p>
              <p className="text-[12px] text-ink-faint mt-0.5">
                {formatCount(t.posts)} Posts
              </p>
            </div>
            <MoreHorizontal className="w-4 h-4 text-ink-faint shrink-0 mt-1" />
          </div>
        </Link>
      ))}
      <Link
        href="/entdecken"
        className="block px-4 py-3 text-[14px] text-burgundy hover:bg-paper-dim transition-colors"
      >
        Mehr anzeigen
      </Link>
    </section>
  );
}

function FollowCard() {
  const [followed, setFollowed] = useState<Set<string>>(new Set());

  function toggle(handle: string) {
    setFollowed((prev) => {
      const next = new Set(prev);
      if (next.has(handle)) next.delete(handle);
      else next.add(handle);
      return next;
    });
  }

  return (
    <section className="rounded-2xl bg-paper-dim/60 border border-line overflow-hidden">
      <h2 className="font-display text-[20px] px-4 pt-3 pb-1">Wem folgen</h2>
      {FOLLOW_SUGGESTIONS.map((s) => {
        const isFollowing = followed.has(s.handle);
        return (
          <div
            key={s.handle}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-paper-dim transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.avatar}
              alt={s.name}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="flex items-center gap-1 text-[14px] font-bold truncate">
                {s.name}
                {s.badge && (
                  <BadgeCheck className="w-4 h-4 text-burgundy shrink-0" />
                )}
              </p>
              <p className="text-[13px] text-ink-faint truncate">@{s.handle}</p>
            </div>
            <button
              onClick={() => toggle(s.handle)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors shrink-0 ${
                isFollowing
                  ? "border border-line text-ink hover:border-rose-300 hover:text-rose-600"
                  : "bg-ink text-paper hover:opacity-85"
              }`}
            >
              {isFollowing ? "Folge ich" : "Folgen"}
            </button>
          </div>
        );
      })}
      <Link
        href="/communities"
        className="block px-4 py-3 text-[14px] text-burgundy hover:bg-paper-dim transition-colors"
      >
        Mehr anzeigen
      </Link>
    </section>
  );
}

function RailFooter() {
  const links = [
    { label: "Impressum", href: "#" },
    { label: "Datenschutz", href: "#" },
    { label: "AGB", href: "#" },
    { label: "Für Anbieter", href: "/for-providers" },
  ];
  return (
    <footer className="px-4 pb-10 text-[12px] text-ink-faint">
      <nav className="flex flex-wrap gap-x-3 gap-y-1">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="hover:underline">
            {l.label}
          </Link>
        ))}
      </nav>
      <p className="mt-2">© 2026 ZurichTonight · Visions-Prototyp</p>
    </footer>
  );
}
