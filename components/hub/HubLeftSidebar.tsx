"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Flame, Users, Plus } from "lucide-react";
import {
  HUB_COMMUNITIES,
  DEFAULT_JOINED,
  readJoined,
  onJoinedChange,
  formatMembers,
} from "@/lib/hub";

/**
 * Linke Hub-Spalte: Schnellnavigation und die Communities,
 * denen der Demo-Nutzer beigetreten ist (localStorage).
 */
export function HubLeftSidebar() {
  const pathname = usePathname();
  const [joined, setJoined] = useState<string[]>(DEFAULT_JOINED);

  useEffect(() => {
    setJoined(readJoined());
    return onJoinedChange(() => setJoined(readJoined()));
  }, []);

  const joinedCommunities = HUB_COMMUNITIES.filter((c) =>
    joined.includes(c.slug),
  );

  const NAV = [
    { href: "/hub", label: "Hub-Start", Icon: Home },
    { href: "/communities", label: "Alle Communities", Icon: Users },
  ];

  return (
    <div className="space-y-4">
      <nav className="bg-card border border-line rounded-xl p-2">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors ${
                active
                  ? "bg-paper-dim text-burgundy"
                  : "text-ink-muted hover:bg-paper-dim/60 hover:text-ink"
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.8} />
              {label}
            </Link>
          );
        })}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium text-ink-muted">
          <Flame className="w-4 h-4" strokeWidth={1.8} />
          Beliebt in Zürich
        </div>
      </nav>

      <div className="bg-card border border-line rounded-xl p-3">
        <p className="eyebrow px-1 mb-2">Deine Communities</p>
        {joinedCommunities.length === 0 && (
          <p className="px-1 py-2 text-[12.5px] text-ink-faint">
            Du bist noch keiner Community beigetreten.
          </p>
        )}
        {joinedCommunities.map((c) => (
          <Link
            key={c.slug}
            href={`/hub/${c.slug}`}
            className="flex items-center gap-2.5 px-1.5 py-1.5 rounded-lg hover:bg-paper-dim/60 transition-colors"
          >
            <span
              className="w-7 h-7 rounded-full grid place-items-center text-[14px] shrink-0"
              style={{ backgroundColor: `${c.color}22` }}
            >
              {c.emoji}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[13px] font-medium truncate">
                {c.name}
              </span>
              <span className="block text-[11px] text-ink-faint">
                {formatMembers(c.members)} Mitglieder
              </span>
            </span>
          </Link>
        ))}
        <Link
          href="/communities"
          className="mt-2 flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-full border border-line text-[12.5px] font-bold text-ink-muted hover:border-burgundy hover:text-burgundy transition-colors"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.2} />
          Community entdecken
        </Link>
      </div>
    </div>
  );
}
