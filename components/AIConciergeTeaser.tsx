"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Music,
  Wine,
  Palette,
  ArrowRight,
} from "lucide-react";

const EXAMPLES = [
  "Wo gehe ich mit Eltern essen?",
  "Bestes Date-Restaurant unter 100 CHF?",
  "Was läuft Samstag bei Regen?",
];

interface AnswerCard {
  Icon: typeof Music;
  iconColor: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}

interface Answer {
  intro: string;
  cards: AnswerCard[];
  outro?: string;
}

const DEFAULT_ANSWER: Answer = {
  intro:
    "Heute Abend, 13. Mai 2026 — leichter Regen ab 19 Uhr, Temperatur 11°. Drei Vorschläge, die zu dir passen:",
  cards: [
    {
      Icon: Music,
      iconColor: "text-burgundy",
      eyebrow: "🎵 Konzert · Kreis 1",
      title: "Klang & Kerzenschein im Schauspielhaus",
      body: "Vivaldi bei 800 Kerzen, 20:00, noch 14 Plätze. CHF 39–79.",
      href: "/tonight/klang-kerzenschein",
      cta: "Reservation möglich",
    },
    {
      Icon: Wine,
      iconColor: "text-brass",
      eyebrow: "🍷 Cocktailbar · Kreis 1",
      title: "Old Crow Cocktailbar",
      body: "Neues Frühlings-Menu, intim, regenfest. Reservation empfohlen.",
      href: "/entdecken",
      cta: "Direkt buchen",
    },
    {
      Icon: Palette,
      iconColor: "text-burgundy",
      eyebrow: "🎨 Vernissage · Kreis 5",
      title: "'Stille Stadt' bei Photobastei",
      body: "Gratis, 19 Uhr, danach Bar bis 24 Uhr. Künstlerin Anna Berger anwesend.",
      href: "/tonight/vernissage-stille-stadt",
      cta: "Mehr Info",
    },
  ],
  outro: "Möchtest du, dass ich dir einen Abend mit allen drei kombiniere?",
};

const ANSWERS: Record<string, Answer> = {
  "Wo gehe ich mit Eltern essen?": {
    intro:
      "Drei Tische, die fast jede Generation glücklich machen — klassisch, mit Service und keiner Lärmkulisse:",
    cards: [
      {
        Icon: Wine,
        iconColor: "text-burgundy",
        eyebrow: "🍷 Klassiker · Kreis 1",
        title: "Kronenhalle",
        body: "Brasserie-Klassiker mit Chagall an den Wänden, CHF 80–160. Ruhig genug für gute Gespräche.",
        href: "/dine/kronenhalle",
        cta: "Reservation",
      },
      {
        Icon: Music,
        iconColor: "text-brass",
        eyebrow: "🍴 Bündner Spitzenkoch · Kreis 1",
        title: "IGNIV by Andreas Caminada",
        body: "Sharing-Konzept, CHF 180–280. Wenn Eltern besonders verwöhnt werden sollen.",
        href: "/dine/igniv",
        cta: "Tisch sichern",
      },
      {
        Icon: Palette,
        iconColor: "text-burgundy",
        eyebrow: "🌿 Vegetarisch · Kreis 1",
        title: "Hiltl",
        body: "Ältestes vegetarisches Restaurant der Welt, CHF 25–45. Funktioniert auch für Skeptiker.",
        href: "/entdecken",
        cta: "Mehr",
      },
    ],
    outro: "Soll ich für eine der drei direkt Verfügbarkeit prüfen?",
  },
  "Bestes Date-Restaurant unter 100 CHF?": {
    intro:
      "Drei Optionen unter CHF 100 für zwei — alle mit Reservation noch heute möglich:",
    cards: [
      {
        Icon: Wine,
        iconColor: "text-burgundy",
        eyebrow: "🍝 Italienisch · Kreis 8",
        title: "Cesare",
        body: "Tische am Wasser, ehrliche italienische Küche. Pasta + Wein zu zweit unter CHF 90.",
        href: "/entdecken",
        cta: "Reservation",
      },
      {
        Icon: Music,
        iconColor: "text-brass",
        eyebrow: "🥗 Modern Schweizer · Kreis 4",
        title: "Maison Manesse",
        body: "Set-Menü 4 Gänge CHF 65 pro Person, kreativ und entspannt.",
        href: "/dine/maison-manesse",
        cta: "Tisch buchen",
      },
      {
        Icon: Palette,
        iconColor: "text-burgundy",
        eyebrow: "🌅 Saisonal · Kreis 4",
        title: "Marktküche",
        body: "Frühlingskarte mit Spargel-Risotto, CHF 55–95. Kleine Karte, viel Liebe.",
        href: "/entdecken",
        cta: "Mehr",
      },
    ],
  },
  "Was läuft Samstag bei Regen?": {
    intro:
      "Samstag 16. Mai — Wetter wechselhaft. Drei Pläne, die drinnen bleiben:",
    cards: [
      {
        Icon: Palette,
        iconColor: "text-burgundy",
        eyebrow: "🎨 Ausstellung · Kreis 1",
        title: "Sammlung Bührle im Kunsthaus",
        body: "Neue Sonderführungen ab 14 Uhr, danach Café im Foyer.",
        href: "/entdecken",
        cta: "Tickets",
      },
      {
        Icon: Music,
        iconColor: "text-brass",
        eyebrow: "🎤 Comedy · Kreis 6",
        title: "Stand-Up Casinotheater",
        body: "Sechs Comedians, 20:30, CHF 39. Noch 12 Plätze.",
        href: "/tonight/stand-up-casinotheater",
        cta: "Sichern",
      },
      {
        Icon: Wine,
        iconColor: "text-burgundy",
        eyebrow: "🍴 Pop-up · Kreis 1",
        title: "Frühstück mit Sterne-Koch Cadonau",
        body: "Sonntag 09:30, 7 Gänge zum Frühstück, nur noch 3 Plätze.",
        href: "/tonight/fruehstueck-cadonau",
        cta: "Tisch",
      },
    ],
  },
};

interface Props {
  variant?: "hero" | "compact";
  placeholder?: string;
}

export function AIConciergeTeaser({
  variant = "hero",
  placeholder,
}: Props) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [loading, setLoading] = useState(false);

  function ask(q: string) {
    setQuestion(q);
    setSubmitted(q);
    setOpen(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  }

  const answer = ANSWERS[submitted] ?? DEFAULT_ANSWER;

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
            placeholder={placeholder ?? "Was tu ich heute Abend?"}
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
            className="bg-card rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[90vh] overflow-y-auto card-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-card border-b border-line px-5 py-4 flex items-center justify-between z-10">
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
              <p className="text-[12px] uppercase tracking-[0.18em] text-ink-faint">
                Du fragst
              </p>
              <p className="font-display text-2xl mt-1">{submitted}</p>

              <div className="mt-6 bg-paper-dim rounded-2xl p-5 md:p-6">
                {loading ? (
                  <div className="flex items-center gap-2 text-ink-muted">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-[13px]">
                      Züri denkt nach — durchsucht 1'247 Events, 380 Orte und
                      den Puls…
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="text-[14.5px] leading-relaxed text-ink">
                      {answer.intro}
                    </p>
                    <div className="mt-5 space-y-3">
                      {answer.cards.map((c) => (
                        <Link
                          key={c.title}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="group flex gap-4 p-4 bg-card rounded-xl border border-line hover:border-burgundy transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-paper-dim flex items-center justify-center shrink-0">
                            <c.Icon
                              className={`w-5 h-5 ${c.iconColor}`}
                              strokeWidth={1.6}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="eyebrow">{c.eyebrow}</p>
                            <p className="font-display text-lg leading-tight mt-1">
                              {c.title}
                            </p>
                            <p className="text-[13px] text-ink-muted mt-1.5">
                              {c.body}
                            </p>
                            <span className="inline-flex items-center gap-1 mt-2 text-[12.5px] font-medium text-burgundy group-hover:gap-2 transition-all">
                              → {c.cta}
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {answer.outro && (
                      <p className="text-[13.5px] text-ink-muted mt-5 italic">
                        {answer.outro}
                      </p>
                    )}
                    <p className="text-[11px] text-ink-faint mt-4">
                      (Demo) Antworten sind kuratiert für den Visions-Prototyp.
                    </p>
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
