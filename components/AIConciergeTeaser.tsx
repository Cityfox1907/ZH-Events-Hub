"use client";

import { useState } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";

const EXAMPLES = [
  "Was tu ich heute Abend?",
  "Wo gehe ich mit Eltern essen?",
  "Welcher Markt findet Samstag statt?",
];

interface Props {
  variant?: "hero" | "compact";
}

export function AIConciergeTeaser({ variant = "hero" }: Props) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  function ask(q: string) {
    setQuestion(q);
    setOpen(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  }

  return (
    <>
      <div
        className={`bg-card border border-line rounded-2xl card-shadow ${
          variant === "hero" ? "p-6 md:p-8" : "p-4"
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-burgundy" strokeWidth={1.8} />
          <p className="eyebrow">Züri Concierge</p>
        </div>
        {variant === "hero" && (
          <h3 className="font-display text-3xl md:text-4xl leading-tight">
            Frag Züri.
          </h3>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (question.trim()) ask(question);
          }}
          className="mt-4 relative"
        >
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Frag was — Heute Abend? Wochenende? Geheim-Tipp?"
            className="w-full px-4 py-3 pr-12 bg-paper border border-line rounded-full text-[14px] focus:border-burgundy outline-none transition-colors"
          />
          <button
            type="submit"
            aria-label="Senden"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-burgundy text-white flex items-center justify-center hover:bg-burgundy-dark transition-colors"
          >
            <Send className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((q) => (
            <button
              key={q}
              onClick={() => ask(q)}
              className="px-3 py-1.5 bg-paper-dim rounded-full text-[12px] text-ink-muted hover:text-burgundy hover:bg-paper transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-card rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[85vh] overflow-y-auto card-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-card border-b border-line px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles
                  className="w-4 h-4 text-burgundy"
                  strokeWidth={1.8}
                />
                <p className="eyebrow">Züri Concierge</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Schliessen"
                className="w-8 h-8 rounded-full hover:bg-paper-dim flex items-center justify-center"
              >
                <X className="w-4 h-4" strokeWidth={1.8} />
              </button>
            </div>
            <div className="p-5 md:p-6">
              <p className="text-[13px] text-ink-faint">Du fragst</p>
              <p className="font-display text-2xl mt-1">{question}</p>

              <div className="mt-6 bg-paper-dim rounded-2xl p-5 md:p-6">
                {loading ? (
                  <div className="flex items-center gap-2 text-ink-muted">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-[13px]">
                      Züri denkt nach — durchsucht 1247 Events, 380 Orte und
                      den Puls…
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="text-[14px] leading-relaxed text-ink-muted">
                      <em>
                        Antwort-Inhalte folgen in Phase 2. Diese Modal-Struktur
                        zeigt, wie der Concierge funktionieren wird: Eingabe,
                        kontextuelle Antwort mit Events, Orten und
                        Community-Tipps verlinkt — alles aus einer Hand.
                      </em>
                    </p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="p-3 bg-card rounded-xl border border-line">
                        <p className="text-[10px] uppercase tracking-wider text-ink-faint">
                          Event
                        </p>
                        <p className="text-[12.5px] mt-1">[Platzhalter]</p>
                      </div>
                      <div className="p-3 bg-card rounded-xl border border-line">
                        <p className="text-[10px] uppercase tracking-wider text-ink-faint">
                          Ort
                        </p>
                        <p className="text-[12.5px] mt-1">[Platzhalter]</p>
                      </div>
                      <div className="p-3 bg-card rounded-xl border border-line">
                        <p className="text-[10px] uppercase tracking-wider text-ink-faint">
                          Community
                        </p>
                        <p className="text-[12.5px] mt-1">[Platzhalter]</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
