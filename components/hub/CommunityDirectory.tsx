"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, Sparkles } from "lucide-react";
import type { HubCommunity } from "@/lib/hub";
import { HUB_COMMUNITIES, formatMembers } from "@/lib/hub";
import { JoinButton } from "./JoinButton";

const USER_COMMUNITIES_KEY = "zt:hub-user-communities";

interface UserCommunity {
  slug: string;
  name: string;
  tagline: string;
}

function readUserCommunities(): UserCommunity[] {
  try {
    const raw = window.localStorage.getItem(USER_COMMUNITIES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Verzeichnis aller von Nutzern gegründeten Communities:
 * Suche, Kategorie-Filter und ein kleines Gründungs-Formular,
 * das neue Communities lokal (localStorage) anlegt.
 */
export function CommunityDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [userCommunities, setUserCommunities] = useState<UserCommunity[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTagline, setNewTagline] = useState("");

  useEffect(() => {
    setUserCommunities(readUserCommunities());
  }, []);

  const categories = useMemo(
    () => [...new Set(HUB_COMMUNITIES.map((c) => c.category))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HUB_COMMUNITIES.filter((c) => {
      if (category && c.category !== category) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  function createCommunity(e: React.FormEvent) {
    e.preventDefault();
    const name = newName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!name) return;
    const next: UserCommunity[] = [
      ...userCommunities.filter((c) => c.slug !== name),
      { slug: name, name: `z/${name}`, tagline: newTagline.trim() || "Frisch gegründet — sei dabei." },
    ];
    setUserCommunities(next);
    try {
      window.localStorage.setItem(USER_COMMUNITIES_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setNewName("");
    setNewTagline("");
    setFormOpen(false);
  }

  return (
    <div className="space-y-5">
      {/* Suche + Gründen */}
      <div className="flex flex-col sm:flex-row gap-3">
        <label className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint"
            strokeWidth={1.8}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Community suchen — z.B. Velo, Kreis 4, Food…"
            className="w-full bg-card border border-line rounded-full pl-9 pr-4 py-2.5 text-[13.5px] placeholder:text-ink-faint focus:outline-none focus:border-burgundy transition-colors"
          />
        </label>
        <button
          onClick={() => setFormOpen((v) => !v)}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-burgundy text-white text-[13px] font-bold hover:bg-burgundy-dark transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" strokeWidth={2.2} />
          Community gründen
        </button>
      </div>

      {/* Gründungs-Formular */}
      {formOpen && (
        <form
          onSubmit={createCommunity}
          className="bg-card border border-line rounded-xl p-4 fade-in"
        >
          <p className="eyebrow mb-3">Neue Community gründen</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13.5px] text-ink-faint">
                z/
              </span>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="name (z.B. wipkingen)"
                required
                className="w-full bg-paper-dim/60 border border-line rounded-lg pl-8 pr-3 py-2 text-[13.5px] focus:outline-none focus:border-burgundy transition-colors"
              />
            </label>
            <input
              type="text"
              value={newTagline}
              onChange={(e) => setNewTagline(e.target.value)}
              placeholder="Worum geht es? (optional)"
              className="flex-[2] bg-paper-dim/60 border border-line rounded-lg px-3 py-2 text-[13.5px] focus:outline-none focus:border-burgundy transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-burgundy text-white text-[13px] font-bold hover:bg-burgundy-dark transition-colors"
            >
              Gründen
            </button>
          </div>
          <p className="text-[11.5px] text-ink-faint mt-2">
            Im Prototyp wird deine Community lokal gespeichert und erscheint
            sofort in der Liste.
          </p>
        </form>
      )}

      {/* Kategorie-Filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        <FilterChip
          label="Alle"
          active={category === null}
          onClick={() => setCategory(null)}
        />
        {categories.map((c) => (
          <FilterChip
            key={c}
            label={c}
            active={category === c}
            onClick={() => setCategory(category === c ? null : c)}
          />
        ))}
      </div>

      {/* Von dir gegründet */}
      {userCommunities.length > 0 && !query && !category && (
        <div>
          <p className="eyebrow mb-3">Von dir gegründet</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {userCommunities.map((c) => (
              <div
                key={c.slug}
                className="bg-card border border-burgundy/40 rounded-xl p-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-full bg-burgundy/10 grid place-items-center text-[16px] shrink-0">
                    <Sparkles className="w-4 h-4 text-burgundy" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold truncate">{c.name}</p>
                    <p className="text-[11px] text-burgundy font-medium">
                      Neu · von dir gegründet
                    </p>
                  </div>
                </div>
                <p className="text-[12.5px] text-ink-muted leading-snug mt-2 line-clamp-2">
                  {c.tagline}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alle Communities */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((c) => (
          <CommunityCard key={c.slug} community={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-card border border-line rounded-xl px-4 py-12 text-center">
          <p className="text-[14px] text-ink-muted">
            Keine Community gefunden — gründe doch die erste zu diesem Thema.
          </p>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-bold whitespace-nowrap border transition-colors ${
        active
          ? "bg-burgundy text-white border-burgundy"
          : "bg-card border-line text-ink-muted hover:border-burgundy hover:text-burgundy"
      }`}
    >
      {label}
    </button>
  );
}

function CommunityCard({ community }: { community: HubCommunity }) {
  return (
    <Link
      href={`/hub/${community.slug}`}
      className="group bg-card border border-line rounded-xl overflow-hidden hover:border-line-strong card-shadow-hover transition-all"
    >
      <div className="h-12" style={{ backgroundColor: `${community.color}33` }} />
      <div className="px-4 pb-4">
        <div className="flex items-end justify-between -mt-4">
          <span
            className="w-10 h-10 rounded-full grid place-items-center text-[19px] border-2 border-card shadow-sm"
            style={{ backgroundColor: `${community.color}26` }}
          >
            {community.emoji}
          </span>
          <JoinButton slug={community.slug} size="sm" />
        </div>
        <p className="text-[14.5px] font-bold mt-2 group-hover:text-burgundy transition-colors">
          {community.name}
        </p>
        <p className="text-[11.5px] text-ink-faint">
          {formatMembers(community.members)} Mitglieder · {community.online} online
        </p>
        <p className="text-[12.5px] text-ink-muted leading-snug mt-1.5 line-clamp-2">
          {community.tagline}
        </p>
        <p className="text-[11px] text-ink-faint mt-2">
          Gegründet von {community.founder} · {community.founded}
        </p>
      </div>
    </Link>
  );
}
