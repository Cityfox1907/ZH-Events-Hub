"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, X } from "lucide-react";
import { PROVIDER_TESTIMONIALS } from "@/lib/data";
import { useToast } from "@/components/Toast";

const STEPS = [
  {
    n: 1,
    title: "Profil erstellen",
    desc: "Kostenlos. Dauert 10 Minuten. Fotos, Beschreibung, Öffnungszeiten — fertig.",
  },
  {
    n: 2,
    title: "Listings einstellen",
    desc: "Events, Tische, Erlebnisse. Du steuerst Verfügbarkeit, Preis und Kapazität.",
  },
  {
    n: 3,
    title: "Anfragen empfangen",
    desc: "Über die Plattform. Sicher, ohne dass deine Telefonnummer rausgeht.",
  },
];

const FREE_TIER = {
  name: "Aktuell · 100% Gratis",
  price: "CHF 0",
  period: "",
  perks: [
    "Vollständiges Listing",
    "Unbegrenzt Fotos",
    "Maximale Sichtbarkeit",
    "Anfragen über Plattform",
    "Analytics-Dashboard",
    "Alle Spotlight-Features",
    "Premium-Features kommen später als Option",
  ],
  cta: "Kostenlos starten",
};

export default function ForProvidersPage() {
  const [onboardOpen, setOnboardOpen] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="container-editorial pt-12 pb-16 md:pt-20 md:pb-20">
        <p className="eyebrow">Für Anbieter</p>
        <h1 className="font-display text-5xl md:text-7xl mt-3 leading-[0.95] tracking-tight">
          Werde sichtbar in Zürich.
          <br />
          <span className="italic text-burgundy">Auf der einen Plattform, die alle nutzen.</span>
        </h1>
        <p className="text-ink-muted text-[18px] mt-5 max-w-2xl">
          Restaurant, Bar, Workshop-Host, Galerist, Veranstalter — egal was du
          machst. ZurichTonight bringt dich zu denen, die in Zürich aktiv
          ausgehen, essen und erleben.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <button
            onClick={() => setOnboardOpen(true)}
            className="px-6 py-3 rounded-full bg-burgundy text-paper font-medium text-[14px] hover:bg-burgundy-dark inline-flex items-center gap-2"
          >
            Jetzt Anbieter werden <ArrowRight className="w-4 h-4" />
          </button>
          <Link
            href="#pricing"
            className="px-6 py-3 rounded-full border border-line text-[14px] font-medium hover:border-burgundy hover:text-burgundy"
          >
            Pricing ansehen
          </Link>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-6 max-w-3xl">
          <Stat n="2'400+" l="Anbieter aktiv" />
          <Stat n="180k+" l="Profil-Aufrufe / Monat" />
          <Stat n="92%" l="Anbieter empfehlen uns weiter" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-editorial pb-16">
        <h2 className="font-display text-3xl md:text-4xl mb-8">Wie es funktioniert</h2>
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {STEPS.map((s) => (
            <div key={s.n} className="p-6 bg-card border border-line rounded-2xl card-shadow">
              <div className="font-display text-5xl text-burgundy">{s.n}</div>
              <h3 className="font-display text-xl mt-4">{s.title}</h3>
              <p className="text-[14px] text-ink-muted mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="container-editorial pb-16 scroll-mt-20">
        <h2 className="font-display text-3xl md:text-4xl mb-2">Pricing</h2>
        <p className="text-[14px] text-ink-muted mb-8">
          Aktuell gratis listen. Premium-Features kommen später als optionaler Layer.
        </p>
        <div className="max-w-2xl">
          <div className="relative p-8 rounded-2xl border border-burgundy bg-card card-shadow">
            <span className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 rounded-full bg-burgundy text-paper text-[10px] font-medium uppercase tracking-wider">
              Aktuell · Phase 1
            </span>
            <p className="eyebrow">{FREE_TIER.name}</p>
            <p className="font-display text-5xl mt-2">
              {FREE_TIER.price}
              <span className="text-[14px] text-ink-muted font-body"> · Phase 1 (12 Monate)</span>
            </p>
            <p className="text-[13.5px] text-ink-muted mt-3 max-w-md">
              Wir bauen die Zürcher Community auf. Solange Phase 1 läuft, ist alles
              kostenlos — für User wie für dich als Anbieter.
            </p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-2">
              {FREE_TIER.perks.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[13px] text-ink-muted">
                  <Check className="w-4 h-4 text-burgundy mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setOnboardOpen(true)}
              className="mt-6 w-full py-3 rounded-lg text-[14px] font-medium bg-burgundy text-paper hover:bg-burgundy-dark"
            >
              {FREE_TIER.cta}
            </button>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section id="stories" className="container-editorial pb-16 scroll-mt-20">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-5 h-5 text-burgundy" />
          <h2 className="font-display text-3xl md:text-4xl">Erfolgsstorys</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {PROVIDER_TESTIMONIALS.map((t) => (
            <div key={t.name} className="p-6 bg-card border border-line rounded-2xl card-shadow">
              <span className="inline-block px-2.5 py-1 rounded-full bg-burgundy/10 text-burgundy text-[11px] font-medium">
                {t.metric}
              </span>
              <p className="text-[15px] text-ink-muted mt-4 leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-[14px]">{t.name}</p>
                  <p className="text-[12px] text-ink-faint">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-editorial pb-20">
        <div
          className="rounded-3xl p-8 md:p-12 text-paper grid md:grid-cols-[1fr_auto] gap-6 items-center"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #093a82 0%, #0f4da8 55%, #5b7db0 100%)",
          }}
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl">
              Bereit, sichtbar zu werden?
            </h2>
            <p className="text-paper-dim text-[15px] mt-2">
              Profil in 10 Minuten erstellt. Erste Anfragen meistens am gleichen
              Tag.
            </p>
          </div>
          <button
            onClick={() => setOnboardOpen(true)}
            className="px-6 py-3 rounded-full bg-paper text-ink font-medium text-[14px] hover:bg-paper-dim shrink-0 inline-flex items-center gap-2"
          >
            Jetzt starten <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {onboardOpen && <OnboardingModal onClose={() => setOnboardOpen(false)} />}
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-4xl text-burgundy">{n}</p>
      <p className="text-[13px] text-ink-muted mt-1">{l}</p>
    </div>
  );
}

function OnboardingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", category: "", email: "" });
  const { push } = useToast();

  function done() {
    push("✓ Demo-Onboarding abgeschickt — wir würden uns innerhalb 24h melden", "success");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-ink/40 fade-in" onClick={onClose}>
      <div
        className="w-full md:max-w-md bg-card md:rounded-2xl rounded-t-2xl border border-line p-6 md:p-8 relative"
        style={{ boxShadow: "var(--shadow-modal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button aria-label="Schliessen" onClick={onClose} className="absolute top-4 right-4 text-ink-muted hover:text-ink">
          <X className="w-5 h-5" />
        </button>
        <p className="eyebrow">Anbieter-Onboarding (Demo) · Schritt {step}/3</p>
        <div className="h-1 bg-paper-dim rounded-full mt-3 mb-5">
          <div className="h-full bg-burgundy rounded-full transition-all" style={{ width: `${(step / 3) * 100}%` }} />
        </div>

        {step === 1 && (
          <>
            <h2 className="font-display text-2xl">Wie heisst dein Business?</h2>
            <input
              autoFocus
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="z.B. Maison Manesse"
              className="mt-4 w-full px-4 py-3 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none"
            />
            <button
              disabled={!form.name}
              onClick={() => setStep(2)}
              className="mt-5 w-full py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark disabled:opacity-40 disabled:hover:bg-burgundy"
            >
              Weiter
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-display text-2xl">Was bietest du an?</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {["Restaurant", "Bar", "Workshop", "Event-Location", "Tour-Guide", "Anderes"].map((c) => (
                <button
                  key={c}
                  onClick={() => setForm({ ...form, category: c })}
                  className={`px-3 py-3 rounded-lg border text-[13px] ${
                    form.category === c
                      ? "bg-ink text-paper border-ink"
                      : "border-line hover:border-burgundy"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <button
              disabled={!form.category}
              onClick={() => setStep(3)}
              className="mt-5 w-full py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark disabled:opacity-40 disabled:hover:bg-burgundy"
            >
              Weiter
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="font-display text-2xl">Wohin sollen wir uns melden?</h2>
            <input
              autoFocus
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="anbieter@example.ch"
              className="mt-4 w-full px-4 py-3 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none"
            />
            <button
              disabled={!form.email}
              onClick={done}
              className="mt-5 w-full py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark disabled:opacity-40 disabled:hover:bg-burgundy"
            >
              Profil-Anfrage senden (Demo)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
