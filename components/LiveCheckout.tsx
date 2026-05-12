"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import { addBooking } from "@/lib/storage";
import { Check } from "lucide-react";

type Step = "select" | "details" | "done";

export function LiveCheckout({
  eventId,
  eventTitle,
  priceMin,
  priceMax,
}: {
  eventId: string;
  eventTitle: string;
  priceMin: number;
  priceMax: number;
}) {
  const [step, setStep] = useState<Step>("select");
  const [tickets, setTickets] = useState(2);
  const [tier, setTier] = useState<"min" | "max">("min");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { push } = useToast();

  const unit = tier === "min" ? priceMin : priceMax;
  const total = unit * tickets;

  function reserve(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) {
      push("Bitte Name und E-Mail ausfüllen (Demo)");
      return;
    }
    addBooking({
      module: "live",
      itemId: eventId,
      itemTitle: eventTitle,
      detail: `${tickets} Tickets · CHF ${total}`,
    });
    push("✓ Demo-Buchung abgeschlossen", "success");
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="bg-card border border-line rounded-2xl p-6 card-shadow text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-burgundy/10 flex items-center justify-center mb-3">
          <Check className="w-6 h-6 text-burgundy" />
        </div>
        <p className="font-display text-2xl">Bestätigt (Demo)</p>
        <p className="text-[14px] text-ink-muted mt-2">
          {tickets} Tickets · CHF {total}
        </p>
        <p className="text-[13px] text-ink-muted mt-3">
          Eine Bestätigungs-E-Mail würde jetzt an {email} gehen — aber das ist ein
          Demo-Prototyp.
        </p>
        <button
          onClick={() => {
            setStep("select");
            setName("");
            setEmail("");
          }}
          className="mt-4 text-[13px] text-burgundy hover:underline"
        >
          Nochmal durchgehen
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-line rounded-2xl p-6 card-shadow space-y-4">
      <p className="eyebrow">Tickets</p>
      <p className="font-display text-2xl">CHF {priceMin === priceMax ? priceMin : `${priceMin}–${priceMax}`}</p>

      {step === "select" && (
        <>
          {priceMin !== priceMax && (
            <div>
              <p className="text-[12px] uppercase tracking-wider text-ink-faint mb-2">
                Kategorie
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTier("min")}
                  className={`px-3 py-2 rounded-lg border text-[13px] ${
                    tier === "min"
                      ? "bg-ink text-paper border-ink"
                      : "border-line bg-paper hover:border-burgundy"
                  }`}
                >
                  Standard · CHF {priceMin}
                </button>
                <button
                  onClick={() => setTier("max")}
                  className={`px-3 py-2 rounded-lg border text-[13px] ${
                    tier === "max"
                      ? "bg-ink text-paper border-ink"
                      : "border-line bg-paper hover:border-burgundy"
                  }`}
                >
                  Premium · CHF {priceMax}
                </button>
              </div>
            </div>
          )}

          <label className="block">
            <span className="text-[12px] text-ink-muted">Anzahl Tickets</span>
            <select
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2.5 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Ticket" : "Tickets"}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center justify-between pt-2 border-t border-line">
            <span className="text-[13px] text-ink-muted">Total</span>
            <span className="font-display text-xl">CHF {total}</span>
          </div>

          <button
            onClick={() => setStep("details")}
            className="w-full py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark transition-colors"
          >
            Tickets reservieren
          </button>
          <p className="text-[11px] text-ink-faint text-center">
            Keine echte Zahlung — alles Demo
          </p>
        </>
      )}

      {step === "details" && (
        <form onSubmit={reserve} className="space-y-3">
          <p className="text-[13px] text-ink-muted">
            {tickets} {tickets === 1 ? "Ticket" : "Tickets"} ·{" "}
            <span className="font-medium text-ink">CHF {total}</span>
          </p>
          <label className="block">
            <span className="text-[12px] text-ink-muted">Name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[12px] text-ink-muted">E-Mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep("select")}
              className="px-4 py-3 rounded-lg border border-line text-[13px] hover:border-burgundy"
            >
              Zurück
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark transition-colors"
            >
              Reservieren — CHF {total}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
