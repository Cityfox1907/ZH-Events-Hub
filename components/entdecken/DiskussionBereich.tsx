"use client";

import { useState } from "react";
import { Send, HandHelping, MessageCircleQuestion } from "lucide-react";
import { useToast } from "@/components/Toast";
import type { EntdeckenKommentar } from "@/lib/entdecken-data";

const AVATAR = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=f7f2ea,efe7d8,fdfaf3`;

interface Props {
  /** Name des Fests / der Organisation für Beschriftungen */
  name: string;
  kommentare: EntdeckenKommentar[];
  hilfeThemen: string[];
}

export function DiskussionBereich({ name, kommentare, hilfeThemen }: Props) {
  const [comments, setComments] = useState<EntdeckenKommentar[]>(kommentare);
  const [draft, setDraft] = useState("");
  const [frage, setFrage] = useState("");
  const { push } = useToast();

  function postComment() {
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [
      {
        autor: "Du",
        quartier: "Dein Quartier",
        text,
        ago: "Gerade eben",
        avatar: AVATAR("DuSelbst"),
      },
      ...prev,
    ]);
    setDraft("");
    push("✓ Beitrag veröffentlicht (Demo)", "success");
  }

  function sendFrage() {
    if (!frage.trim()) return;
    setFrage("");
    push("✓ Deine Frage wurde an die Organisator:innen gesendet (Demo)", "success");
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-10">
      {/* Diskussion */}
      <section>
        <h2 className="font-display text-2xl mb-1">Diskussion</h2>
        <p className="text-[13px] text-ink-muted mb-5">
          Besprechen, abklären, Tipps austauschen — alles rund um {name}.
        </p>

        {/* Composer */}
        <div className="bg-card border border-line rounded-2xl p-4 mb-6">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder={`Was möchtest du zu ${name} sagen oder fragen?`}
            className="w-full bg-transparent text-[14px] placeholder:text-ink-faint focus:outline-none resize-none"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={postComment}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy text-paper text-[13px] font-medium hover:bg-burgundy-dark transition-colors disabled:opacity-40"
              disabled={!draft.trim()}
            >
              <Send className="w-3.5 h-3.5" /> Posten
            </button>
          </div>
        </div>

        {/* Beiträge */}
        <ul className="space-y-4">
          {comments.map((k, i) => (
            <li
              key={`${k.autor}-${i}`}
              className="flex items-start gap-3 bg-card border border-line rounded-2xl p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={k.avatar}
                alt={k.autor}
                className="w-10 h-10 rounded-full bg-paper-dim object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[12.5px] text-ink-faint">
                  <span className="font-bold text-ink">{k.autor}</span> ·{" "}
                  {k.quartier} · {k.ago}
                </p>
                <p className="text-[14px] leading-relaxed mt-1">{k.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Hilfe & Fragen */}
      <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
        <div className="bg-card border border-line rounded-2xl p-5 card-shadow">
          <p className="eyebrow mb-3">Hilfe holen</p>
          <p className="text-[13px] text-ink-muted mb-3">
            Häufige Themen rund um {name}:
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {hilfeThemen.map((t) => (
              <button
                key={t}
                onClick={() =>
                  push(`Infos zu «${t}» werden geladen (Demo)`)
                }
                className="px-3 py-1.5 rounded-full bg-paper-dim border border-line text-[12px] text-ink-muted hover:border-burgundy hover:text-burgundy transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
          <div className="border-t border-line pt-4">
            <p className="flex items-center gap-2 text-[13px] font-medium mb-2">
              <MessageCircleQuestion className="w-4 h-4 text-burgundy" />
              Direkte Frage an die Organisator:innen
            </p>
            <textarea
              value={frage}
              onChange={(e) => setFrage(e.target.value)}
              rows={3}
              placeholder="Deine Frage…"
              className="w-full bg-paper-dim border border-line rounded-xl p-3 text-[13px] placeholder:text-ink-faint focus:outline-none focus:border-burgundy resize-none"
            />
            <button
              onClick={sendFrage}
              disabled={!frage.trim()}
              className="mt-2 w-full py-2.5 rounded-lg bg-burgundy text-paper text-[13px] font-medium hover:bg-burgundy-dark transition-colors disabled:opacity-40"
            >
              Frage senden
            </button>
          </div>
        </div>

        <div className="bg-paper-dim border border-line rounded-2xl p-5">
          <p className="flex items-center gap-2 text-[13px] font-medium mb-1.5">
            <HandHelping className="w-4 h-4 text-burgundy" /> Mithelfen
          </p>
          <p className="text-[13px] text-ink-muted leading-relaxed">
            Viele Feste leben von Freiwilligen. Melde dich, wenn du anpacken
            willst.
          </p>
          <button
            onClick={() => push("✓ Interesse gemeldet — danke! (Demo)", "success")}
            className="mt-3 w-full py-2.5 rounded-lg border border-line bg-card text-[13px] font-medium hover:border-burgundy hover:text-burgundy transition-colors"
          >
            Als Helfer:in melden
          </button>
        </div>
      </aside>
    </div>
  );
}
