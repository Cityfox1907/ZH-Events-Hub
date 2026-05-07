"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, MessageCircle, Send, Timer, TrendingUp } from "lucide-react";
import {
  addComment,
  castVote,
  expiresAt,
  getActiveSurveys,
  getTotalVotes,
  getUserVotes,
  type Survey,
} from "@/lib/surveys";
import { STORAGE_EVENT, storage } from "@/lib/storage";
import { relativeTime } from "@/lib/format";
import { EmptyState } from "@/components/EmptyState";

function timeRemaining(survey: Survey, nowMs: number): string {
  const end = new Date(expiresAt(survey)).getTime();
  const diff = end - nowMs;
  if (diff <= 0) return "läuft ab";
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  if (days >= 1) return `noch ${days} ${days === 1 ? "Tag" : "Tage"}`;
  if (hours >= 1) return `noch ${hours} Std.`;
  const minutes = Math.max(1, Math.floor(diff / 60_000));
  return `noch ${minutes} Min.`;
}

export function UmfragenView() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [now, setNow] = useState<number>(() => Date.now());
  const [authorName, setAuthorName] = useState<string>("");

  useEffect(() => {
    const sync = () => {
      setSurveys(getActiveSurveys());
      setUserVotes(getUserVotes());
    };
    sync();
    setAuthorName(storage.readAuthorName());
    window.addEventListener(STORAGE_EVENT, sync);
    const tick = window.setInterval(() => setNow(Date.now()), 60_000);
    const refresh = window.setInterval(sync, 5 * 60_000);
    return () => {
      window.removeEventListener(STORAGE_EVENT, sync);
      window.clearInterval(tick);
      window.clearInterval(refresh);
    };
  }, []);

  const handleVote = (surveyId: string, optionId: string) => {
    castVote(surveyId, optionId);
  };

  const handleAuthorChange = (value: string) => {
    setAuthorName(value);
    storage.writeAuthorName(value);
  };

  if (surveys.length === 0) {
    return (
      <section className="container-editorial pb-24">
        <EmptyState
          title="Keine offenen Umfragen"
          description="Sobald jemand eine Frage zur Stadt stellt, erscheint sie hier. Umfragen laufen sieben Tage und werden danach automatisch entfernt."
        />
      </section>
    );
  }

  return (
    <section className="container-editorial pb-24">
      <div className="flex flex-col gap-6">
        {surveys.map((survey, index) => (
          <SurveyCard
            key={survey.id}
            survey={survey}
            rank={index + 1}
            now={now}
            userOption={userVotes[survey.id]}
            authorName={authorName}
            onVote={handleVote}
            onAuthorChange={handleAuthorChange}
          />
        ))}
      </div>
    </section>
  );
}

interface CardProps {
  survey: Survey;
  rank: number;
  now: number;
  userOption?: string;
  authorName: string;
  onVote: (surveyId: string, optionId: string) => void;
  onAuthorChange: (name: string) => void;
}

function SurveyCard({ survey, rank, now, userOption, authorName, onVote, onAuthorChange }: CardProps) {
  const [showComments, setShowComments] = useState(false);
  const [draft, setDraft] = useState("");

  const total = useMemo(() => getTotalVotes(survey), [survey]);
  const voted = Boolean(userOption);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    addComment({ surveyId: survey.id, author: authorName, text: draft });
    setDraft("");
  };

  const sortedComments = [...survey.comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <article className="bg-card border border-line rounded-md card-shadow overflow-hidden">
      <header className="px-5 md:px-7 pt-6 pb-4 border-b border-line">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            <span className="font-display text-[20px] tracking-normal text-burgundy normal-case">
              #{rank}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3" strokeWidth={1.5} />
              {total} Stimmen
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-muted">
            <Timer className="w-3.5 h-3.5" strokeWidth={1.5} />
            {timeRemaining(survey, now)}
          </span>
        </div>
        <h2 className="font-display text-[22px] md:text-[26px] leading-snug text-ink">
          {survey.question}
        </h2>
        {survey.description ? (
          <p className="mt-2 text-[14px] leading-relaxed text-ink-muted max-w-2xl">
            {survey.description}
          </p>
        ) : null}
        <p className="mt-3 text-[12px] text-ink-faint">
          Von {survey.author} · {relativeTime(survey.createdAt, now)}
        </p>
      </header>

      <div className="px-5 md:px-7 py-5 flex flex-col gap-2.5">
        {survey.options.map((option) => {
          const pct = total > 0 ? Math.round((option.votes / total) * 100) : 0;
          const isUserChoice = userOption === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onVote(survey.id, option.id)}
              className={`group relative w-full text-left rounded-md border transition-colors duration-200 overflow-hidden ${
                isUserChoice
                  ? "border-burgundy bg-paper-dim"
                  : "border-line hover:border-line-strong bg-paper"
              }`}
            >
              <div
                aria-hidden
                className={`absolute inset-y-0 left-0 transition-[width] duration-500 ease-out ${
                  isUserChoice ? "bg-burgundy/15" : "bg-paper-dim"
                }`}
                style={{ width: `${pct}%` }}
              />
              <div className="relative flex items-center justify-between gap-4 px-4 py-3">
                <span className="flex items-center gap-2 text-[14px] text-ink">
                  {isUserChoice ? (
                    <Check className="w-4 h-4 text-burgundy" strokeWidth={2} />
                  ) : null}
                  {option.label}
                </span>
                <span className="flex items-center gap-3 text-[13px] tabular-nums">
                  <span className="text-ink-muted">{option.votes}</span>
                  <span className={`font-medium ${isUserChoice ? "text-burgundy" : "text-ink"}`}>
                    {pct}%
                  </span>
                </span>
              </div>
            </button>
          );
        })}
        {!voted ? (
          <p className="text-[11px] text-ink-faint mt-1">
            Klicke eine Option, um abzustimmen. Du kannst deine Stimme jederzeit ändern.
          </p>
        ) : null}
      </div>

      <footer className="border-t border-line bg-paper/40">
        <button
          type="button"
          onClick={() => setShowComments((v) => !v)}
          className="w-full flex items-center justify-between px-5 md:px-7 py-3 text-[13px] text-ink-muted hover:text-ink transition-colors"
        >
          <span className="inline-flex items-center gap-2">
            <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
            {survey.comments.length} {survey.comments.length === 1 ? "Kommentar" : "Kommentare"}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em]">
            {showComments ? "Schliessen" : "Anzeigen"}
          </span>
        </button>

        {showComments ? (
          <div className="px-5 md:px-7 pb-6 pt-1 flex flex-col gap-4">
            <ul className="flex flex-col gap-3">
              {sortedComments.length === 0 ? (
                <li className="text-[13px] text-ink-faint italic">
                  Noch keine Kommentare. Mach den Anfang.
                </li>
              ) : (
                sortedComments.map((c) => (
                  <li
                    key={c.id}
                    className="rounded-md border border-line bg-card px-4 py-3"
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <span className="text-[13px] font-medium text-ink">{c.author}</span>
                      <span className="text-[11px] text-ink-faint">
                        {relativeTime(c.createdAt, now)}
                      </span>
                    </div>
                    <p className="text-[14px] leading-relaxed text-ink-muted whitespace-pre-wrap">
                      {c.text}
                    </p>
                  </li>
                ))
              )}
            </ul>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 pt-2">
              <input
                type="text"
                value={authorName}
                onChange={(e) => onAuthorChange(e.target.value)}
                placeholder="Dein Name (optional)"
                className="w-full md:w-1/2 rounded-md border border-line bg-card px-3 py-2 text-[13px] text-ink placeholder:text-ink-faint focus:outline-none focus:border-burgundy"
              />
              <div className="flex gap-2">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Kommentar schreiben…"
                  rows={2}
                  className="flex-1 rounded-md border border-line bg-card px-3 py-2 text-[14px] text-ink placeholder:text-ink-faint focus:outline-none focus:border-burgundy resize-none"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="self-end inline-flex items-center gap-1.5 rounded-md bg-burgundy text-card px-4 py-2 text-[13px] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-burgundy-dark transition-colors"
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={1.75} />
                  Senden
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </footer>
    </article>
  );
}
