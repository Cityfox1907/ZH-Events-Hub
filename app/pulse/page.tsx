"use client";

import { useEffect, useState } from "react";
import { Check, Crown } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { PULSE_EVENTS } from "@/lib/data";
import { getUser, onStorageChange, setTier } from "@/lib/storage";
import type { MockUser } from "@/lib/types";
import { useToast } from "@/components/Toast";

const TIERS = [
  {
    key: "Free" as const,
    name: "Free",
    price: "CHF 0",
    period: "",
    perks: [
      "1 Pulse-Event pro Monat sichtbar",
      "Newsletter",
      "Plattform-Basics",
    ],
    cta: "Aktueller Plan",
  },
  {
    key: "Premium" as const,
    name: "Premium",
    price: "CHF 89",
    period: "/ Monat",
    perks: [
      "Alle Premium-Events",
      "Founders' Table & Salons",
      "RSVP vor Öffentlichkeit",
      "Curator-Notizen",
    ],
    cta: "Premium beantragen",
    highlight: true,
  },
  {
    key: "VIP" as const,
    name: "VIP",
    price: "CHF 290",
    period: "/ Monat",
    perks: [
      "Alle Premium-Vorteile",
      "VIP-Galerien & Private Previews",
      "Persönlicher Concierge",
      "Limousine-Shuttle bei Top-Events",
    ],
    cta: "VIP beantragen",
  },
];

export default function PulsePage() {
  const [user, setUser] = useState<MockUser | null>(null);
  const { push } = useToast();

  useEffect(() => {
    setUser(getUser());
    return onStorageChange(() => setUser(getUser()));
  }, []);

  function joinTier(tier: "Premium" | "VIP") {
    if (user) {
      setTier(tier);
      push(`✓ ${tier}-Membership-Anfrage gesendet (Demo)`, "success");
    } else {
      push("Bitte zuerst anmelden (Demo)");
    }
  }

  const tier = user?.tier ?? "Free";

  return (
    <>
      <PageHero
        eyebrow="Pulse"
        title="Der Kreis, nicht die Liste."
        subtitle="Kuratierte Dinners, Salons und Galerie-Previews für Zürcher, die das Hintergrund­geräusch der Stadt mitgestalten. Keine Pitches, keine Massen."
      />

      <section className="container-editorial pb-12">
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {TIERS.map((t) => {
            const isCurrent = tier === t.key;
            return (
              <div
                key={t.key}
                className={`relative p-6 md:p-8 rounded-2xl border ${
                  t.highlight
                    ? "border-burgundy bg-card"
                    : "border-line bg-card"
                } card-shadow`}
              >
                {t.highlight && (
                  <span className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 rounded-full bg-burgundy text-paper text-[11px] font-medium uppercase tracking-wider">
                    Empfohlen
                  </span>
                )}
                <div className="flex items-center gap-2 mb-2">
                  {t.key === "VIP" && (
                    <Crown className="w-4 h-4 text-brass" />
                  )}
                  <p className="eyebrow">{t.name}</p>
                </div>
                <p className="font-display text-4xl">
                  {t.price}
                  <span className="text-[14px] text-ink-muted font-body">
                    {t.period}
                  </span>
                </p>
                <ul className="mt-5 space-y-2">
                  {t.perks.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-[14px] text-ink-muted"
                    >
                      <Check className="w-4 h-4 text-burgundy mt-0.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                {t.key === "Free" ? (
                  <div
                    className={`mt-6 w-full py-2.5 text-center text-[13px] rounded-lg ${
                      isCurrent
                        ? "bg-paper-dim text-ink-muted"
                        : "border border-line text-ink-muted"
                    }`}
                  >
                    {isCurrent ? "Aktueller Plan" : "Free"}
                  </div>
                ) : (
                  <button
                    onClick={() => joinTier(t.key)}
                    className={`mt-6 w-full py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                      isCurrent
                        ? "bg-paper-dim text-ink-muted cursor-default"
                        : "bg-burgundy text-paper hover:bg-burgundy-dark"
                    }`}
                  >
                    {isCurrent ? "Aktueller Plan" : t.cta}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-editorial pb-20">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-3xl md:text-4xl">
            Kommende Pulse-Events
          </h2>
          {!user && (
            <Link
              href="#"
              className="text-[13px] text-ink-muted hover:text-burgundy"
              onClick={(e) => {
                e.preventDefault();
                push("Bitte oben anmelden (Demo)");
              }}
            >
              Anmelden für mehr →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {PULSE_EVENTS.map((ev) => {
            const locked =
              (ev.required_tier === "Premium" && tier === "Free") ||
              (ev.required_tier === "VIP" && tier !== "VIP");
            return (
              <Card
                key={ev.id}
                module="pulse"
                id={ev.id}
                title={ev.title}
                href={`/pulse/${ev.id}`}
                cover={ev.cover_image}
                eyebrow={`${ev.type} · ${ev.required_tier}`}
                meta={`${ev.datetime} · ${ev.venue}`}
                price={`${ev.current_rsvp} / ${ev.max_attendees} RSVP`}
                badge={ev.required_tier === "VIP" ? "VIP" : undefined}
                locked={locked}
                showBookmark={!locked}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
