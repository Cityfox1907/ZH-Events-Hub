"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Flame,
  Clock,
  TrendingUp,
  Star,
  Plus,
  X,
  Search,
  MapPin,
  Users,
  Camera,
} from "lucide-react";
import { PulsSubNav } from "@/components/PulsSubNav";
import {
  PULS_POSTS,
  PULS_DISTRICTS,
  PULS_POST_TYPES,
  PULS_TAGS,
  PULS_TRENDING_SIDEBAR,
  PULS_ACTIVE_NOW,
  PULS_WEEK_STATS,
  getPulsPost,
} from "@/lib/data";
import {
  addUserPost,
  getUserPosts,
  onStorageChange,
  type UserPulsPost,
} from "@/lib/storage";
import type { PulsPost } from "@/lib/types";
import { PulsPostCard } from "@/components/PulsPostCard";
import { useToast } from "@/components/Toast";
import { VerificationBadge } from "@/components/VerificationBadge";

type Tab = "hot" | "neu" | "top-week" | "tipps";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "hot", label: "Hot", icon: <Flame className="w-3.5 h-3.5" /> },
  { key: "neu", label: "Neu", icon: <Clock className="w-3.5 h-3.5" /> },
  { key: "top-week", label: "Top diese Woche", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { key: "tipps", label: "Beste Tipps", icon: <Star className="w-3.5 h-3.5" /> },
];

export default function PulsPage() {
  const [tab, setTab] = useState<Tab>("hot");
  const [district, setDistrict] = useState<string>("Alle");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [composerOpen, setComposerOpen] = useState(false);
  const [commentsFor, setCommentsFor] = useState<PulsPost | null>(null);
  const [userPosts, setUserPosts] = useState<UserPulsPost[]>([]);

  useEffect(() => {
    setUserPosts(getUserPosts());
    return onStorageChange(() => setUserPosts(getUserPosts()));
  }, []);

  const combined: PulsPost[] = useMemo(() => {
    const fromUser: PulsPost[] = userPosts.map((u) => ({
      id: u.id,
      author: u.author,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(u.author)}&backgroundColor=f7f2ea`,
      district: u.district,
      ago: u.ago,
      type: u.type as PulsPost["type"],
      text: u.text,
      tags: u.tags,
      upvotes: u.upvotes,
      comments_count: u.comments_count,
    }));
    return [...fromUser, ...PULS_POSTS];
  }, [userPosts]);

  const filtered = useMemo(() => {
    let list = combined.slice();
    if (district !== "Alle") list = list.filter((p) => p.district === district);
    if (activeTags.length > 0)
      list = list.filter((p) => activeTags.some((t) => p.tags.includes(t)));
    if (tab === "hot") list = list.filter((p) => p.hot || p.upvotes > 100);
    if (tab === "top-week") list = list.filter((p) => p.top_week || p.upvotes > 150);
    if (tab === "tipps") list = list.filter((p) => p.type === "spot-tipp");

    if (tab === "neu") {
      // order by recency - user posts first then PULS order
      return list;
    }
    list.sort((a, b) => b.upvotes - a.upvotes);
    return list;
  }, [combined, district, activeTags, tab]);

  function toggleTag(tag: string) {
    setActiveTags((s) =>
      s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag]
    );
  }

  return (
    <>
      <PulsSubNav />

      {/* HEADER ───────────────────────────────────────────── */}
      <section className="container-editorial pt-8 pb-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="eyebrow">Puls · Community-Feed</p>
            <h1 className="font-display text-3xl md:text-4xl mt-2 leading-tight">
              Was passiert in Zürich, jetzt.
            </h1>
            <p className="text-ink-muted text-[14px] mt-2 max-w-xl">
              Tipps, Fragen, Live-Updates, Spontan-Treffen — alles aus der Stadt.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-ink-muted">
            <Users className="w-4 h-4 text-burgundy" />
            <span className="tabular-nums">
              <strong className="text-ink">{PULS_ACTIVE_NOW.toLocaleString("de-CH")}</strong>{" "}
              online
            </span>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-paper-dim border border-line text-[12.5px] text-ink-muted">
          ZurichTonight ist aktuell{" "}
          <strong className="text-ink">komplett kostenlos</strong> — wir bauen die
          Zürcher Community auf.
        </div>
      </section>

      {/* LAYOUT 3-COL ───────────────────────────────────── */}
      <section className="container-editorial pb-20">
        <div className="grid lg:grid-cols-[220px_1fr_280px] gap-6">
          {/* LEFT SIDEBAR ─────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-5">
              <div>
                <p className="eyebrow mb-2">Stadtteil</p>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-[13px] border border-line rounded-lg bg-card focus:border-burgundy focus:outline-none"
                >
                  {PULS_DISTRICTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <p className="eyebrow mb-2 flex items-center justify-between">
                  Tags
                  {activeTags.length > 0 && (
                    <button
                      onClick={() => setActiveTags([])}
                      className="text-[10px] text-burgundy hover:underline normal-case tracking-normal"
                    >
                      Reset
                    </button>
                  )}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PULS_TAGS.slice(0, 12).map((t) => {
                    const active = activeTags.includes(t);
                    return (
                      <button
                        key={t}
                        onClick={() => toggleTag(t)}
                        className={`text-[11px] px-2 py-1 rounded-full border transition-colors ${
                          active
                            ? "bg-burgundy text-paper border-burgundy"
                            : "bg-card border-line text-ink-muted hover:border-burgundy"
                        }`}
                      >
                        #{t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-[11px] text-ink-faint pt-2">
                <p>Diese Woche · <strong className="text-ink-muted">{PULS_WEEK_STATS.posts.toLocaleString("de-CH")}</strong> Posts</p>
                <p><strong className="text-ink-muted">{PULS_WEEK_STATS.comments.toLocaleString("de-CH")}</strong> Kommentare</p>
              </div>
            </div>
          </aside>

          {/* CENTER FEED ──────────────────────────────── */}
          <div className="min-w-0">
            {/* Top composer trigger */}
            <button
              onClick={() => setComposerOpen(true)}
              className="w-full text-left bg-card border border-line rounded-2xl p-4 card-shadow hover:card-shadow-hover transition-shadow mb-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-paper-dim flex items-center justify-center text-burgundy font-medium">
                Du
              </div>
              <span className="text-[14px] text-ink-faint flex-1">
                Was passiert in deiner Stadt?
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-burgundy text-paper text-[12px] font-medium">
                <Plus className="w-3.5 h-3.5" /> Posten
              </span>
            </button>

            {/* Tabs */}
            <div className="flex items-center gap-1.5 mb-3 -mx-1 px-1 overflow-x-auto">
              {TABS.map((t) => {
                const active = t.key === tab;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                      active
                        ? "bg-ink text-paper"
                        : "bg-card border border-line text-ink-muted hover:border-burgundy"
                    }`}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile district */}
            <div className="lg:hidden mb-3">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 text-[13px] border border-line rounded-lg bg-card focus:border-burgundy focus:outline-none"
              >
                {PULS_DISTRICTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Active filter chips */}
            {(district !== "Alle" || activeTags.length > 0) && (
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                {district !== "Alle" && (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-paper-dim">
                    <MapPin className="w-3 h-3" /> {district}
                    <button onClick={() => setDistrict("Alle")} className="ml-1 text-ink-faint hover:text-ink">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {activeTags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-paper-dim">
                    #{t}
                    <button onClick={() => toggleTag(t)} className="text-ink-faint hover:text-ink">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Feed */}
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="p-8 text-center bg-card border border-line rounded-2xl">
                  <p className="font-display text-xl">Keine Posts.</p>
                  <p className="text-[14px] text-ink-muted mt-2">
                    Probier andere Filter oder poste etwas Eigenes.
                  </p>
                </div>
              ) : (
                filtered.map((p) => (
                  <PulsPostCard
                    key={p.id}
                    post={p}
                    onOpenComments={(post) => setCommentsFor(post)}
                  />
                ))
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR ────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <div className="bg-card border border-line rounded-2xl p-5 card-shadow">
                <div className="flex items-center gap-2 mb-3 text-burgundy">
                  <Flame className="w-4 h-4" />
                  <p className="font-medium text-[12px] uppercase tracking-wider">Trending heute</p>
                </div>
                <ol className="space-y-2.5">
                  {PULS_TRENDING_SIDEBAR.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px]">
                      <span className="font-display text-burgundy w-4">{i + 1}.</span>
                      <div className="flex-1 min-w-0">
                        <p className="leading-tight">{t.title}</p>
                        <p className="text-[11px] text-ink-faint mt-0.5">#{t.tag} · {t.upvotes} Up</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-card border border-line rounded-2xl p-5 card-shadow">
                <p className="font-medium text-[12px] uppercase tracking-wider text-burgundy mb-3">
                  Verifizierte Zürcher
                </p>
                <ul className="space-y-2.5">
                  {[
                    { author: "TramFahrerinSophie", badge: "local-hero" as const, district: "Kreis 9" },
                    { author: "VeloPolitikerin", badge: "stadt-stimme" as const, district: "Kreis 1" },
                    { author: "AnnaUrbanist", badge: "local-hero" as const, district: "Kreis 4" },
                    { author: "FotoFrankZH", badge: "local-hero" as const, district: "Kreis 12" },
                  ].map((u) => (
                    <li key={u.author} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-paper-dim flex items-center justify-center text-[11px] font-medium">
                        {u.author.slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-medium leading-none truncate">@{u.author}</p>
                        <p className="text-[10.5px] text-ink-faint mt-0.5">{u.district}</p>
                      </div>
                      <VerificationBadge badge={u.badge} compact />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-ink text-paper rounded-2xl p-5">
                <p className="text-[12px] uppercase tracking-wider text-paper-dim">Aktive Zürcher</p>
                <p className="font-display text-3xl mt-1 tabular-nums">{PULS_ACTIVE_NOW.toLocaleString("de-CH")}</p>
                <p className="text-[12px] text-paper-dim mt-1">gerade online</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Floating Action Button (mobile) */}
      <button
        onClick={() => setComposerOpen(true)}
        aria-label="Posten"
        className="lg:hidden fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-burgundy text-paper card-shadow flex items-center justify-center hover:bg-burgundy-dark"
      >
        <Plus className="w-6 h-6" />
      </button>

      {composerOpen && (
        <PostComposer onClose={() => setComposerOpen(false)} />
      )}

      {commentsFor && (
        <CommentsModal post={commentsFor} onClose={() => setCommentsFor(null)} />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// POST COMPOSER MODAL
// ─────────────────────────────────────────────────────────────

function PostComposer({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<string>("spot-tipp");
  const [text, setText] = useState("");
  const [district, setDistrict] = useState<string>("Kreis 5");
  const [tags, setTags] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState("");
  const { push } = useToast();

  function toggleTag(t: string) {
    setTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  }

  function submit() {
    if (text.trim().length < 4) {
      push("Bitte mindestens 4 Zeichen");
      return;
    }
    addUserPost({
      author: "DemoZuercher",
      type,
      text: text.trim(),
      district,
      tags,
    });
    push("✓ Gepostet (Demo)", "success");
    onClose();
  }

  const filteredTags = PULS_TAGS.filter((t) =>
    t.toLowerCase().includes(tagSearch.toLowerCase())
  ).slice(0, 8);

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
          onClick={onClose}
          aria-label="Schliessen"
          className="absolute top-4 right-4 text-ink-muted hover:text-ink"
        >
          <X className="w-5 h-5" />
        </button>
        <p className="eyebrow">Neuer Post</p>
        <h2 className="font-display text-2xl mt-1">Was möchtest du teilen?</h2>

        {/* Type pills */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {PULS_POST_TYPES.map((t) => {
            const active = type === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                className={`p-2 rounded-lg border text-center transition-colors ${
                  active
                    ? "bg-burgundy text-paper border-burgundy"
                    : "border-line hover:border-burgundy"
                }`}
                title={t.label}
              >
                <div className="text-xl">{t.icon}</div>
                <div className="text-[9.5px] mt-1 leading-none">{t.label.split(" ")[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Text */}
        <div className="mt-4">
          <textarea
            autoFocus
            value={text}
            maxLength={500}
            onChange={(e) => setText(e.target.value)}
            placeholder="Sag was du beobachtest, fragst, teilen willst…"
            className="w-full min-h-[100px] px-3 py-2.5 text-[14px] border border-line bg-paper rounded-lg focus:border-burgundy focus:outline-none resize-none"
          />
          <p className="text-[11px] text-ink-faint mt-1 text-right">{text.length} / 500</p>
        </div>

        {/* District */}
        <div className="mt-3">
          <p className="text-[12px] text-ink-muted mb-1">Stadtteil (Pflicht)</p>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full px-3 py-2 text-[13px] border border-line bg-paper rounded-lg focus:border-burgundy focus:outline-none"
          >
            {PULS_DISTRICTS.filter((d) => d !== "Alle").map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="mt-3">
          <p className="text-[12px] text-ink-muted mb-1">Tags</p>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-faint" />
            <input
              type="text"
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              placeholder="Tag suchen…"
              className="w-full pl-8 pr-3 py-2 text-[13px] border border-line bg-paper rounded-lg focus:border-burgundy focus:outline-none"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {filteredTags.map((t) => {
              const active = tags.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`text-[11px] px-2 py-1 rounded-full border transition-colors ${
                    active
                      ? "bg-burgundy text-paper border-burgundy"
                      : "bg-card border-line text-ink-muted hover:border-burgundy"
                  }`}
                >
                  #{t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Image (Mock) */}
        <button
          onClick={() => push("Bild-Upload kommt bald (Demo)")}
          className="mt-3 w-full px-3 py-2 text-[12px] border border-dashed border-line rounded-lg text-ink-muted hover:border-burgundy hover:text-burgundy inline-flex items-center justify-center gap-1.5"
        >
          <Camera className="w-3.5 h-3.5" />
          Bild hinzufügen (optional)
        </button>

        <button
          onClick={submit}
          className="mt-5 w-full py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark"
        >
          Posten
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COMMENTS MODAL
// ─────────────────────────────────────────────────────────────

function CommentsModal({ post, onClose }: { post: PulsPost; onClose: () => void }) {
  const { push } = useToast();
  const [reply, setReply] = useState("");
  const realPost = getPulsPost(post.id);
  const comments = realPost?.comments ?? post.comments ?? [];

  function send() {
    if (!reply.trim()) return;
    push("✓ Antwort gepostet (Demo)", "success");
    setReply("");
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-ink/40 fade-in"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-lg bg-card md:rounded-2xl rounded-t-2xl border border-line relative max-h-[85vh] flex flex-col"
        style={{ boxShadow: "var(--shadow-modal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-line">
          <button
            onClick={onClose}
            aria-label="Schliessen"
            className="absolute top-4 right-4 text-ink-muted hover:text-ink"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="eyebrow">Kommentare</p>
          <p className="text-[14px] text-ink mt-1 line-clamp-3">{post.text}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {comments.length === 0 && (
            <div className="text-center py-6">
              <p className="text-[13px] text-ink-faint">Noch keine Kommentare — sei der/die Erste.</p>
            </div>
          )}
          {comments.map((c) => (
            <div key={c.id} className="flex gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.avatar} alt="" className="w-8 h-8 rounded-full bg-paper-dim shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="bg-paper-dim rounded-xl px-3 py-2">
                  <p className="text-[12px] font-medium">@{c.author} · <span className="text-ink-faint font-normal">{c.district}</span></p>
                  <p className="text-[13px] mt-1">{c.text}</p>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-ink-faint pl-2">
                  <span>{c.ago}</span>
                  <button onClick={() => push("Upvote (Demo)", "success")} className="hover:text-burgundy">▲ {c.upvotes}</button>
                  <button onClick={() => push("Antworten kommt (Demo)")} className="hover:text-burgundy">Antworten</button>
                </div>
              </div>
            </div>
          ))}
          {/* Some mock comments if none */}
          {comments.length === 0 && (
            <div className="space-y-3 opacity-50">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-paper-dim shrink-0" />
                  <div className="flex-1 bg-paper-dim h-12 rounded-xl" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-3 border-t border-line flex items-center gap-2">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Antworten…"
            onKeyDown={(e) => e.key === "Enter" && send()}
            className="flex-1 px-3 py-2 text-[13px] border border-line bg-paper rounded-full focus:border-burgundy focus:outline-none"
          />
          <button
            onClick={send}
            className="px-4 py-2 rounded-full bg-burgundy text-paper text-[12px] font-medium hover:bg-burgundy-dark"
          >
            Senden
          </button>
        </div>
      </div>
    </div>
  );
}
