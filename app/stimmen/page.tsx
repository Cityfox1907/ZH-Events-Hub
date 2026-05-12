"use client";

import { useEffect, useMemo, useState } from "react";
import {
  HelpCircle,
  Megaphone,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Heart,
  MessageSquare,
  ArrowBigUp,
  Check,
  Smile,
  Meh,
  Frown,
} from "lucide-react";
import {
  DAILY_POLL,
  PAST_POLLS,
  INITIATIVES,
  QUALITY_INDEX,
  SAFETY_BY_DISTRICT,
  RESTAURANT_BY_DISTRICT,
  TOP_TAGS,
  MOOD_BAROMETER,
} from "@/lib/data";
import type { InitiativeItem } from "@/lib/types";
import {
  castPollVote,
  getPollVotes,
  setInitiativeVote,
  getInitiativeVotes,
  toggleInitiativeSupport,
  getInitiativeSupports,
  onStorageChange,
} from "@/lib/storage";
import { useToast } from "@/components/Toast";

type Tab = "frage" | "initiativen" | "index";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "frage", label: "Frage des Tages", icon: <HelpCircle className="w-4 h-4" /> },
  { key: "initiativen", label: "Initiativen & Debatten", icon: <Megaphone className="w-4 h-4" /> },
  { key: "index", label: "Zürich-Index", icon: <BarChart3 className="w-4 h-4" /> },
];

export default function StimmenPage() {
  const [tab, setTab] = useState<Tab>("frage");

  return (
    <>
      <section className="container-editorial pt-10 pb-4">
        <p className="eyebrow">Stimmen · Stadt-Demokratie</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2 leading-tight">
          Was Zürich denkt.
        </h1>
        <p className="text-ink-muted text-[15px] mt-2 max-w-xl">
          Tägliche Umfragen, Bürger-Initiativen und ein lebendiges Stadt-Stimmungsbild.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                tab === t.key
                  ? "bg-ink text-paper"
                  : "bg-card border border-line text-ink-muted hover:border-burgundy"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-20">
        {tab === "frage" && <FrageTab />}
        {tab === "initiativen" && <InitiativenTab />}
        {tab === "index" && <IndexTab />}
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 1: FRAGE DES TAGES
// ─────────────────────────────────────────────────────────────

function FrageTab() {
  const [voted, setVoted] = useState<string | null>(null);
  const { push } = useToast();

  useEffect(() => {
    setVoted(getPollVotes()[DAILY_POLL.id] ?? null);
    return onStorageChange(() => setVoted(getPollVotes()[DAILY_POLL.id] ?? null));
  }, []);

  const total = DAILY_POLL.options.reduce((s, o) => s + o.votes + (voted === o.id ? 1 : 0), 0);

  function vote(optionId: string) {
    if (voted) return;
    castPollVote(DAILY_POLL.id, optionId);
    push("✓ Stimme abgegeben (Demo)", "success");
  }

  return (
    <div className="max-w-3xl">
      <div className="bg-card border border-line rounded-3xl p-6 md:p-8 card-shadow">
        <p className="eyebrow">{DAILY_POLL.date}</p>
        <h2 className="font-display text-3xl md:text-4xl mt-2 leading-tight">
          {DAILY_POLL.question}
        </h2>

        <div className="mt-6 space-y-2">
          {DAILY_POLL.options.map((o) => {
            const v = o.votes + (voted === o.id ? 1 : 0);
            const pct = total > 0 ? Math.round((v / total) * 100) : 0;
            const isMine = voted === o.id;
            return (
              <button
                key={o.id}
                onClick={() => vote(o.id)}
                disabled={!!voted}
                className={`relative w-full text-left p-3.5 rounded-xl border transition-all overflow-hidden ${
                  isMine
                    ? "border-burgundy bg-burgundy/5"
                    : voted
                    ? "border-line bg-paper-dim/40"
                    : "border-line bg-paper hover:border-burgundy hover:bg-paper-dim/40"
                }`}
              >
                {voted && (
                  <div
                    className={`absolute inset-y-0 left-0 ${
                      isMine ? "bg-burgundy/15" : "bg-paper-dim"
                    } transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                )}
                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{o.emoji}</span>
                    <span className="font-medium text-[14px]">{o.label}</span>
                    {isMine && <Check className="w-4 h-4 text-burgundy" />}
                  </div>
                  {voted && (
                    <div className="text-right shrink-0">
                      <p className="font-display text-lg tabular-nums">{pct}%</p>
                      <p className="text-[10.5px] text-ink-faint">
                        {v.toLocaleString("de-CH")} Stimmen
                      </p>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {voted ? (
          <p className="text-[12px] text-ink-faint mt-4">
            Total: <strong className="text-ink-muted">{total.toLocaleString("de-CH")}</strong> Stimmen · Nach Stadtteil filtern ↗
          </p>
        ) : (
          <p className="text-[12.5px] text-ink-muted mt-4">
            Klicke eine Option, um deine Stimme abzugeben. Du siehst danach die Live-Ergebnisse.
          </p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="font-display text-2xl mb-4">Frühere Fragen</h3>
        <div className="space-y-2">
          {PAST_POLLS.map((p) => (
            <button
              key={p.id}
              onClick={() => push("Archiv-Ansicht kommt (Demo)")}
              className="w-full text-left p-4 bg-card border border-line rounded-xl hover:border-burgundy transition-colors flex items-center justify-between gap-3"
            >
              <span className="text-[14px]">{p.question}</span>
              <span className="text-[12px] text-ink-faint shrink-0">
                <strong className="text-burgundy">{p.winner}</strong> {p.winner_pct}%
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 2: INITIATIVEN & DEBATTEN
// ─────────────────────────────────────────────────────────────

function InitiativenTab() {
  const [supports, setSupports] = useState<string[]>([]);
  const [votes, setVotes] = useState<{ [k: string]: 1 | -1 | 0 }>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const { push } = useToast();

  useEffect(() => {
    function refresh() {
      setSupports(getInitiativeSupports());
      setVotes(getInitiativeVotes() as { [k: string]: 1 | -1 | 0 });
    }
    refresh();
    return onStorageChange(refresh);
  }, []);

  const sorted = useMemo(() => INITIATIVES.slice().sort((a, b) => b.upvotes - a.upvotes), []);
  const detail = openId ? INITIATIVES.find((i) => i.id === openId) : null;

  function handleSupport(id: string) {
    const added = toggleInitiativeSupport(id);
    push(added ? "✓ Du unterstützt jetzt (Demo)" : "Unterstützung entfernt", "success");
  }

  function handleVote(id: string, v: 1) {
    const cur = votes[id] ?? 0;
    const next = cur === v ? 0 : v;
    setInitiativeVote(id, next);
  }

  return (
    <>
      <div className="space-y-3 max-w-3xl">
        {sorted.map((i) => {
          const myVote = votes[i.id] ?? 0;
          const upvotes = i.upvotes + (myVote === 1 ? 1 : 0);
          const supported = supports.includes(i.id);
          return (
            <article
              key={i.id}
              className="bg-card border border-line rounded-2xl p-5 card-shadow hover:card-shadow-hover transition-shadow"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleVote(i.id, 1)}
                  className={`flex flex-col items-center gap-0.5 shrink-0 p-2 rounded-lg hover:bg-paper-dim transition-colors ${
                    myVote === 1 ? "text-burgundy" : "text-ink-muted"
                  }`}
                >
                  <ArrowBigUp
                    className={`w-5 h-5 ${myVote === 1 ? "fill-burgundy" : ""}`}
                  />
                  <span className="text-[12px] font-medium tabular-nums">
                    {upvotes.toLocaleString("de-CH")}
                  </span>
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10.5px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-paper-dim text-ink-muted">
                      {i.type}
                    </span>
                    <span className="text-[11px] text-ink-faint">{i.ago}</span>
                  </div>
                  <h3
                    onClick={() => setOpenId(i.id)}
                    className="font-display text-xl mt-1.5 leading-tight cursor-pointer hover:text-burgundy"
                  >
                    {i.title}
                  </h3>
                  <p className="text-[12.5px] text-ink-faint mt-1">
                    von @{i.author}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-[12px] text-ink-muted">
                    <button
                      onClick={() => setOpenId(i.id)}
                      className="inline-flex items-center gap-1 hover:text-burgundy"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> {i.comments_count}
                    </button>
                    {i.supporters !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" />{" "}
                        <strong className="text-ink-muted">
                          {(i.supporters + (supported ? 1 : 0)).toLocaleString("de-CH")}
                        </strong>{" "}
                        Unterstützer
                      </span>
                    )}
                    {i.supporters !== undefined && (
                      <button
                        onClick={() => handleSupport(i.id)}
                        className={`ml-auto text-[12px] px-3 py-1.5 rounded-full transition-colors ${
                          supported
                            ? "bg-burgundy text-paper"
                            : "border border-line hover:border-burgundy hover:text-burgundy"
                        }`}
                      >
                        {supported ? "✓ Unterstützt" : "Unterstützen"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {detail && (
        <InitiativeDetailModal
          initiative={detail}
          onClose={() => setOpenId(null)}
          supported={supports.includes(detail.id)}
          onSupport={() => handleSupport(detail.id)}
        />
      )}
    </>
  );
}

function InitiativeDetailModal({
  initiative,
  onClose,
  supported,
  onSupport,
}: {
  initiative: InitiativeItem;
  onClose: () => void;
  supported: boolean;
  onSupport: () => void;
}) {
  const { push } = useToast();
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-ink/40 fade-in"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-xl bg-card md:rounded-2xl rounded-t-2xl border border-line p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "var(--shadow-modal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Schliessen"
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-muted hover:text-ink text-xl leading-none"
        >
          ✕
        </button>
        <span className="text-[10.5px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-paper-dim text-ink-muted">
          {initiative.type}
        </span>
        <h2 className="font-display text-3xl mt-3 leading-tight">{initiative.title}</h2>
        <p className="text-[12.5px] text-ink-faint mt-1">
          @{initiative.author} · {initiative.ago}
        </p>

        <p className="mt-4 text-[14px] text-ink-muted leading-relaxed whitespace-pre-line">
          {initiative.description}
        </p>

        {(initiative.pro || initiative.contra) && (
          <div className="grid md:grid-cols-2 gap-3 mt-5">
            {initiative.pro && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-[11px] uppercase tracking-wider text-emerald-700 font-medium">Pro</p>
                <ul className="mt-2 space-y-1.5">
                  {initiative.pro.map((p) => (
                    <li key={p} className="text-[13px] text-emerald-900 flex items-start gap-1.5">
                      <span>+</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {initiative.contra && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <p className="text-[11px] uppercase tracking-wider text-rose-700 font-medium">Kontra</p>
                <ul className="mt-2 space-y-1.5">
                  {initiative.contra.map((p) => (
                    <li key={p} className="text-[13px] text-rose-900 flex items-start gap-1.5">
                      <span>−</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {initiative.supporters !== undefined && (
            <button
              onClick={onSupport}
              className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-colors ${
                supported
                  ? "bg-burgundy text-paper"
                  : "bg-burgundy text-paper hover:bg-burgundy-dark"
              }`}
            >
              {supported ? "✓ Du unterstützt" : `Unterstützen (${initiative.supporters.toLocaleString("de-CH")})`}
            </button>
          )}
          <button
            onClick={() => push("Mit Politiker:in geteilt (Demo)", "success")}
            className="px-5 py-2.5 rounded-full text-[13px] border border-line hover:border-burgundy"
          >
            Mit Politiker:in teilen
          </button>
        </div>

        <p className="text-[11px] text-ink-faint mt-3">
          {initiative.comments_count.toLocaleString("de-CH")} Kommentare · Kommentar-Thread folgt in Phase 4 (Demo)
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 3: ZÜRICH-INDEX
// ─────────────────────────────────────────────────────────────

function IndexTab() {
  const [myScore, setMyScore] = useState<number | null>(null);
  const [myMood, setMyMood] = useState<"pos" | "neu" | "neg" | null>(null);
  const { push } = useToast();

  function submitScore(v: number) {
    setMyScore(v);
    push(`✓ Lebensqualität bewertet: ${v} / 10 (Demo)`, "success");
  }

  function submitMood(m: "pos" | "neu" | "neg") {
    setMyMood(m);
    push("✓ Stimmung abgegeben (Demo)", "success");
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4 md:gap-5">
      {/* Quality of Life */}
      <div className="bg-card border border-line rounded-2xl p-6 card-shadow lg:col-span-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Lebensqualität · diese Woche</p>
            <div className="flex items-end gap-3 mt-2">
              <p className="font-display text-6xl">{QUALITY_INDEX.score}</p>
              <p className="text-ink-muted text-lg mb-2">/ 10</p>
              <p
                className={`inline-flex items-center gap-1 text-[13px] mb-3 ${
                  QUALITY_INDEX.trend > 0
                    ? "text-emerald-700"
                    : QUALITY_INDEX.trend < 0
                    ? "text-rose-700"
                    : "text-ink-muted"
                }`}
              >
                {QUALITY_INDEX.trend > 0 ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : QUALITY_INDEX.trend < 0 ? (
                  <TrendingDown className="w-3.5 h-3.5" />
                ) : null}
                {QUALITY_INDEX.trend > 0 ? "+" : ""}
                {QUALITY_INDEX.trend} vs. Vormonat
              </p>
            </div>
            <p className="text-[12px] text-ink-faint mt-1">
              Basiert auf <strong className="text-ink-muted">{QUALITY_INDEX.submissions.toLocaleString("de-CH")}</strong> Antworten
            </p>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-line">
          <p className="text-[13px] text-ink-muted">
            Wie zufrieden bist du diese Woche mit Zürich?
          </p>
          <div className="mt-3 grid grid-cols-10 gap-1">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((v) => (
              <button
                key={v}
                onClick={() => submitScore(v)}
                className={`py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                  myScore === v
                    ? "bg-burgundy text-paper"
                    : "bg-paper hover:bg-paper-dim border border-line"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Safety */}
      <div className="bg-card border border-line rounded-2xl p-6 card-shadow">
        <p className="eyebrow">Sicherheits-Index nach Stadtteil</p>
        <table className="w-full mt-3 text-[13px]">
          <tbody>
            {SAFETY_BY_DISTRICT.map((d) => (
              <tr key={d.name} className="border-b border-line last:border-b-0">
                <td className="py-2">{d.name}</td>
                <td className="py-2 text-right tabular-nums">
                  <span className="font-medium">{d.score}</span>
                  <span className="text-ink-faint"> / 10</span>
                </td>
                <td className="py-2 pl-3 text-[11px] w-16 text-right">
                  {d.trend > 0 ? (
                    <span className="text-emerald-700">▲ {d.trend.toFixed(1)}</span>
                  ) : d.trend < 0 ? (
                    <span className="text-rose-700">▼ {d.trend.toFixed(1)}</span>
                  ) : (
                    <span className="text-ink-faint">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Restaurants */}
      <div className="bg-card border border-line rounded-2xl p-6 card-shadow">
        <p className="eyebrow">Restaurant-Qualität · Stadtteil</p>
        <table className="w-full mt-3 text-[13px]">
          <tbody>
            {RESTAURANT_BY_DISTRICT.map((d) => (
              <tr key={d.name} className="border-b border-line last:border-b-0">
                <td className="py-2">{d.name}</td>
                <td className="py-2 text-right tabular-nums">
                  <span className="font-medium">⭐ {d.rating}</span>
                </td>
                <td className="py-2 pl-3 text-[11px] text-ink-faint w-24 text-right">
                  {d.reviews} Bewertungen
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[11px] text-ink-faint mt-3">
          Top-Qualität: <strong className="text-burgundy">Kreis 5</strong>
        </p>
      </div>

      {/* Top Tags */}
      <div className="bg-card border border-line rounded-2xl p-6 card-shadow">
        <p className="eyebrow">Was Zürcher diese Woche beschäftigt</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {TOP_TAGS.map((t, i) => {
            const size = 18 - i * 1.5;
            return (
              <span
                key={t.tag}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-paper-dim text-ink-muted"
                style={{ fontSize: `${Math.max(11, size)}px` }}
              >
                #{t.tag}
                <span className="ml-1.5 text-[10.5px] text-ink-faint">{t.count}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Mood Barometer */}
      <div className="bg-card border border-line rounded-2xl p-6 card-shadow">
        <p className="eyebrow">Stimmungs-Barometer · diese Woche</p>
        <div className="mt-4 flex items-center gap-2 h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500"
            style={{ width: `${MOOD_BAROMETER.positive}%` }}
            title={`${MOOD_BAROMETER.positive}% positiv`}
          />
          <div
            className="h-full bg-amber-400 -mx-2"
            style={{ width: `${MOOD_BAROMETER.neutral}%` }}
            title={`${MOOD_BAROMETER.neutral}% neutral`}
          />
          <div
            className="h-full bg-rose-500"
            style={{ width: `${MOOD_BAROMETER.negative}%` }}
            title={`${MOOD_BAROMETER.negative}% negativ`}
          />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-[12px]">
          <div><span className="text-emerald-700">😀 {MOOD_BAROMETER.positive}%</span> positiv</div>
          <div className="text-center"><span className="text-amber-700">😐 {MOOD_BAROMETER.neutral}%</span> neutral</div>
          <div className="text-right"><span className="text-rose-700">😞 {MOOD_BAROMETER.negative}%</span> negativ</div>
        </div>

        <div className="mt-5 pt-5 border-t border-line">
          <p className="text-[13px] text-ink-muted">Wie fühlst du dich diese Woche?</p>
          <div className="mt-2 flex gap-2">
            {([
              { key: "pos", icon: <Smile className="w-4 h-4" />, label: "Positiv" },
              { key: "neu", icon: <Meh className="w-4 h-4" />, label: "Neutral" },
              { key: "neg", icon: <Frown className="w-4 h-4" />, label: "Negativ" },
            ] as const).map((m) => (
              <button
                key={m.key}
                onClick={() => submitMood(m.key)}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12.5px] font-medium transition-colors ${
                  myMood === m.key
                    ? "bg-burgundy text-paper"
                    : "border border-line hover:border-burgundy"
                }`}
              >
                {m.icon} {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
