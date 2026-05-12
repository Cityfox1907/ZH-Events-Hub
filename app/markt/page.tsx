"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, X, Star } from "lucide-react";
import { MARKT_CATEGORIES, MARKT_LISTINGS, PULS_DISTRICTS } from "@/lib/data";
import {
  addUserListing,
  getUserListings,
  onStorageChange,
  type UserMarktListing,
} from "@/lib/storage";
import type { MarktListing, MarktCategory } from "@/lib/types";
import { useToast } from "@/components/Toast";
import { VerificationBadge } from "@/components/VerificationBadge";

export default function MarktPage() {
  const [category, setCategory] = useState<"alle" | MarktCategory>("alle");
  const [district, setDistrict] = useState("Alle");
  const [search, setSearch] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [detailFor, setDetailFor] = useState<MarktListing | null>(null);
  const [userListings, setUserListings] = useState<UserMarktListing[]>([]);

  useEffect(() => {
    setUserListings(getUserListings());
    return onStorageChange(() => setUserListings(getUserListings()));
  }, []);

  const combined: MarktListing[] = useMemo(() => {
    const fromUser: MarktListing[] = userListings.map((u) => ({
      id: u.id,
      category: u.category as MarktCategory,
      title: u.title,
      description: u.description,
      author: u.author,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(u.author)}`,
      district: u.district,
      ago: "gerade eben",
      expires: "in 4 Wochen",
      price: u.price,
    }));
    return [...fromUser, ...MARKT_LISTINGS];
  }, [userListings]);

  const filtered = useMemo(() => {
    let list = combined.slice();
    if (category !== "alle") list = list.filter((l) => l.category === category);
    if (district !== "Alle") list = list.filter((l) => l.district === district);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [combined, category, district, search]);

  const totalCount = MARKT_CATEGORIES.reduce((s, c) => s + c.count, 0);

  return (
    <>
      <section className="container-editorial pt-10 pb-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="eyebrow">Markt · Zürcher Anzeigen</p>
            <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
              Was Zürich gerade sucht & bietet.
            </h1>
            <p className="text-ink-muted text-[15px] mt-2 max-w-xl">
              Wohnungen, Jobs, Möbel, Sitter, Gleichgesinnte — lokal und unter
              Nachbarn.
            </p>
          </div>
          <button
            onClick={() => setComposerOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-burgundy text-paper text-[13px] font-medium hover:bg-burgundy-dark"
          >
            <Plus className="w-4 h-4" /> Anzeige aufgeben
          </button>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-paper-dim border border-line text-[12.5px] text-ink-muted flex items-center gap-2">
          <span>🎉</span>
          <span>
            Aktuell <strong className="text-ink">100% gratis</strong> — für User und Anbieter.
          </span>
        </div>

        <div className="mt-3 text-[12px] text-ink-faint">
          <strong className="text-ink-muted">{totalCount}</strong> aktive Anzeigen aus <strong className="text-ink-muted">{MARKT_CATEGORIES.length}</strong> Kategorien
        </div>
      </section>

      {/* Categories grid */}
      <section className="container-editorial pb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <CategoryCard
            label="Alle"
            icon="✨"
            count={totalCount}
            active={category === "alle"}
            onClick={() => setCategory("alle")}
          />
          {MARKT_CATEGORIES.map((c) => (
            <CategoryCard
              key={c.key}
              label={c.label}
              icon={c.icon}
              count={c.count}
              active={category === c.key}
              onClick={() => setCategory(c.key as MarktCategory)}
            />
          ))}
        </div>
      </section>

      {/* Filter bar */}
      <section className="container-editorial pb-6">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Anzeigen durchsuchen…"
              className="w-full pl-9 pr-3 py-2.5 text-[14px] border border-line bg-card rounded-lg focus:border-burgundy focus:outline-none"
            />
          </div>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="px-3 py-2.5 text-[13px] border border-line bg-card rounded-lg focus:border-burgundy focus:outline-none"
          >
            {PULS_DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Listings */}
      <section className="container-editorial pb-20">
        {filtered.length === 0 ? (
          <div className="p-10 text-center bg-card border border-line rounded-2xl">
            <p className="font-display text-xl">Keine Anzeigen</p>
            <p className="text-[14px] text-ink-muted mt-2">
              Probier andere Filter oder gib selbst eine auf.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {filtered.map((l) => (
              <ListingCard key={l.id} listing={l} onOpen={() => setDetailFor(l)} />
            ))}
          </div>
        )}
      </section>

      {composerOpen && <ListingComposer onClose={() => setComposerOpen(false)} />}
      {detailFor && <ListingDetail listing={detailFor} onClose={() => setDetailFor(null)} />}
    </>
  );
}

function CategoryCard({
  label,
  icon,
  count,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl border text-left transition-colors ${
        active
          ? "bg-burgundy text-paper border-burgundy"
          : "bg-card border-line hover:border-burgundy"
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <p className="text-[12.5px] font-medium mt-1 leading-tight">{label}</p>
      <p className={`text-[10.5px] mt-0.5 ${active ? "text-paper-dim" : "text-ink-faint"}`}>
        {count} Anzeigen
      </p>
    </button>
  );
}

const CAT_META: Record<string, { label: string; icon: string }> = Object.fromEntries(
  MARKT_CATEGORIES.map((c) => [c.key, { label: c.label, icon: c.icon }])
);

function ListingCard({
  listing,
  onOpen,
}: {
  listing: MarktListing;
  onOpen: () => void;
}) {
  const cat = CAT_META[listing.category] ?? { label: listing.category, icon: "📌" };
  const cover = listing.images?.[0];

  return (
    <button
      onClick={onOpen}
      className="text-left bg-card border border-line rounded-2xl card-shadow hover:card-shadow-hover transition-shadow overflow-hidden"
    >
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-32 bg-paper-dim flex items-center justify-center text-4xl">
          {cat.icon}
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-paper-dim text-ink-muted">
            {cat.icon} {cat.label}
          </span>
          <span className="text-[11px] text-ink-faint">· {listing.district}</span>
        </div>
        <h3 className="font-display text-[17px] mt-1.5 leading-tight line-clamp-2">
          {listing.title}
        </h3>
        {listing.price && (
          <p className="text-[13px] font-medium text-burgundy mt-1.5">{listing.price}</p>
        )}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={listing.avatar} alt="" className="w-6 h-6 rounded-full bg-paper-dim" />
          <span className="text-[11.5px] font-medium">@{listing.author}</span>
          <VerificationBadge badge={listing.badge} compact />
          {listing.rating && (
            <span className="inline-flex items-center gap-0.5 text-[11px] text-ink-muted">
              <Star className="w-3 h-3 fill-brass text-brass" />
              {listing.rating}
            </span>
          )}
          <span className="text-[10.5px] text-ink-faint ml-auto">{listing.ago}</span>
        </div>
      </div>
    </button>
  );
}

function ListingDetail({
  listing,
  onClose,
}: {
  listing: MarktListing;
  onClose: () => void;
}) {
  const { push } = useToast();
  const cat = CAT_META[listing.category];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-ink/40 fade-in"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-xl bg-card md:rounded-2xl rounded-t-2xl border border-line relative max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "var(--shadow-modal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Schliessen"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-paper/85 backdrop-blur flex items-center justify-center hover:bg-paper"
        >
          <X className="w-5 h-5" />
        </button>

        {listing.images?.[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={listing.images[0]} alt="" className="w-full h-64 object-cover" />
        )}

        <div className="p-6">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] px-2.5 py-1 rounded-full bg-paper-dim text-ink-muted">
              {cat?.icon} {cat?.label}
            </span>
            <span className="text-[12px] text-ink-faint">· {listing.district}</span>
          </div>
          <h2 className="font-display text-3xl mt-2 leading-tight">{listing.title}</h2>
          {listing.price && (
            <p className="text-2xl font-display text-burgundy mt-2">{listing.price}</p>
          )}
          <p className="text-[14px] text-ink-muted mt-4 leading-relaxed">
            {listing.description}
          </p>

          <div className="mt-5 p-4 bg-paper-dim rounded-xl flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={listing.avatar} alt="" className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[13.5px]">@{listing.author}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <VerificationBadge badge={listing.badge} compact />
                {listing.rating && (
                  <span className="inline-flex items-center gap-0.5 text-[11.5px] text-ink-muted">
                    <Star className="w-3 h-3 fill-brass text-brass" />
                    {listing.rating} ({listing.rating_count})
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 text-[12px] text-ink-faint">
            <div>Eingestellt {listing.ago}</div>
            <div className="text-right">Läuft ab {listing.expires}</div>
          </div>

          <button
            onClick={() => push("✓ Nachricht gesendet (Demo)", "success")}
            className="mt-5 w-full py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark"
          >
            Nachricht senden
          </button>
          <button
            onClick={() => push("Gemeldet — Team prüft (Demo)")}
            className="mt-2 w-full py-2 text-[12px] text-ink-faint hover:text-burgundy"
          >
            Spam / Fake melden
          </button>
        </div>
      </div>
    </div>
  );
}

function ListingComposer({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"category" | "details">("category");
  const [cat, setCat] = useState<MarktCategory | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [district, setDistrict] = useState("Kreis 5");
  const [price, setPrice] = useState("");
  const { push } = useToast();

  function submit() {
    if (!cat || !title.trim() || !description.trim()) {
      push("Bitte Titel und Beschreibung ausfüllen");
      return;
    }
    addUserListing({
      author: "DemoZuercher",
      category: cat,
      title: title.trim(),
      description: description.trim(),
      district,
      price: price.trim() || undefined,
    });
    push("✓ Anzeige veröffentlicht (Demo)", "success");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-ink/40 fade-in"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-lg bg-card md:rounded-2xl rounded-t-2xl border border-line p-6 relative max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "var(--shadow-modal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Schliessen"
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-muted hover:text-ink"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "category" ? (
          <>
            <p className="eyebrow">Neue Anzeige · 1/2</p>
            <h2 className="font-display text-2xl mt-1">Welche Kategorie?</h2>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
              {MARKT_CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => {
                    setCat(c.key as MarktCategory);
                    setStep("details");
                  }}
                  className="p-3 rounded-lg border border-line hover:border-burgundy text-left transition-colors"
                >
                  <div className="text-xl">{c.icon}</div>
                  <p className="text-[12px] font-medium mt-1 leading-tight">{c.label}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="eyebrow">Neue Anzeige · 2/2</p>
            <h2 className="font-display text-2xl mt-1">Details</h2>
            <div className="mt-4 space-y-3">
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titel"
                className="w-full px-3 py-2.5 text-[14px] border border-line bg-paper rounded-lg focus:border-burgundy focus:outline-none"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beschreibung…"
                className="w-full min-h-[100px] px-3 py-2.5 text-[14px] border border-line bg-paper rounded-lg focus:border-burgundy focus:outline-none resize-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="px-3 py-2.5 text-[13px] border border-line bg-paper rounded-lg focus:border-burgundy focus:outline-none"
                >
                  {PULS_DISTRICTS.filter((d) => d !== "Alle").map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Preis (optional)"
                  className="px-3 py-2.5 text-[13px] border border-line bg-paper rounded-lg focus:border-burgundy focus:outline-none"
                />
              </div>
              <button
                onClick={() => push("Bild-Upload kommt bald (Demo)")}
                className="w-full px-3 py-2 text-[12px] border border-dashed border-line rounded-lg text-ink-muted hover:border-burgundy hover:text-burgundy"
              >
                📷 Bilder hinzufügen (max 5)
              </button>
            </div>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setStep("category")}
                className="px-4 py-3 rounded-lg border border-line text-[13px] hover:border-burgundy"
              >
                Zurück
              </button>
              <button
                onClick={submit}
                className="flex-1 py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark"
              >
                Veröffentlichen
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
