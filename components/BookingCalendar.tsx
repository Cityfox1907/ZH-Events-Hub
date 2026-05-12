"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import { addBooking } from "@/lib/storage";

interface Slot {
  date: string;
  time: string;
  spots_left: number;
}

export function BookingCalendar({
  experienceId,
  experienceTitle,
  pricePerPerson,
  slots,
}: {
  experienceId: string;
  experienceTitle: string;
  pricePerPerson: number;
  slots: Slot[];
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [people, setPeople] = useState(2);
  const { push } = useToast();

  function book() {
    if (selected === null) {
      push("Bitte einen Termin wählen (Demo)");
      return;
    }
    const slot = slots[selected];
    addBooking({
      module: "experience",
      itemId: experienceId,
      itemTitle: experienceTitle,
      detail: `${slot.date} · ${slot.time} · ${people} P. · CHF ${
        pricePerPerson * people
      }`,
    });
    push("✓ Buchung reserviert (Demo)", "success");
  }

  return (
    <div className="bg-card border border-line rounded-2xl p-6 card-shadow space-y-4">
      <div>
        <p className="eyebrow">Buchen</p>
        <p className="font-display text-2xl mt-1">
          CHF {pricePerPerson}
          <span className="text-[13px] text-ink-muted font-body"> / Person</span>
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-[12px] uppercase tracking-wider text-ink-faint">
          Verfügbare Termine
        </p>
        {slots.map((s, i) => {
          const active = selected === i;
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors text-left ${
                active
                  ? "bg-ink text-paper border-ink"
                  : "border-line bg-paper hover:border-burgundy"
              }`}
            >
              <span className="text-[13px] font-medium">
                {new Date(s.date).toLocaleDateString("de-CH", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}{" "}
                · {s.time}
              </span>
              <span
                className={`text-[11px] ${
                  active ? "text-paper-dim" : "text-ink-faint"
                }`}
              >
                {s.spots_left} Plätze frei
              </span>
            </button>
          );
        })}
      </div>

      <label className="block">
        <span className="text-[12px] text-ink-muted">Personen</span>
        <select
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          className="mt-1 w-full px-3 py-2.5 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-center justify-between pt-2 border-t border-line">
        <span className="text-[13px] text-ink-muted">Total</span>
        <span className="font-display text-xl">
          CHF {pricePerPerson * people}
        </span>
      </div>

      <button
        onClick={book}
        className="w-full py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark transition-colors"
      >
        Buchen
      </button>
      <p className="text-[11px] text-ink-faint text-center">
        Keine echte Buchung — alles Demo
      </p>
    </div>
  );
}
