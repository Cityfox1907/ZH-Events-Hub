"use client";

import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useToast } from "./Toast";
import { addBooking } from "@/lib/storage";

interface Slot {
  date: string;
  time: string;
  spots_left: number;
}

const TIME_BLOCKS = ["10:00", "12:30", "15:00", "17:30", "19:30", "21:00"];

function buildMonths(start = new Date()) {
  const months: { label: string; year: number; month: number; days: { iso: string; day: number; weekday: number }[] }[] = [];
  for (let m = 0; m < 3; m++) {
    const ref = new Date(start.getFullYear(), start.getMonth() + m, 1);
    const days: { iso: string; day: number; weekday: number }[] = [];
    const last = new Date(ref.getFullYear(), ref.getMonth() + 1, 0).getDate();
    for (let d = 1; d <= last; d++) {
      const date = new Date(ref.getFullYear(), ref.getMonth(), d);
      const iso = date.toISOString().slice(0, 10);
      days.push({ iso, day: d, weekday: (date.getDay() + 6) % 7 });
    }
    months.push({
      label: ref.toLocaleDateString("de-CH", { month: "long", year: "numeric" }),
      year: ref.getFullYear(),
      month: ref.getMonth(),
      days,
    });
  }
  return months;
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
  const months = useMemo(() => buildMonths(), []);
  const [monthIdx, setMonthIdx] = useState(0);
  const [pickedDate, setPickedDate] = useState<string | null>(slots[0]?.date ?? null);
  const [pickedTime, setPickedTime] = useState<string | null>(slots[0]?.time ?? null);
  const [people, setPeople] = useState(2);
  const { push } = useToast();

  // simulate availability: time blocks "ausgebucht" if not in slots OR if random by date+time hash
  function isSoldOut(date: string, time: string) {
    const matched = slots.find((s) => s.date === date && s.time === time);
    if (matched) return false;
    // pseudo-random based on hash
    let h = 0;
    for (const ch of date + time) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return h % 5 === 0;
  }

  const month = months[monthIdx];

  function book() {
    if (!pickedDate || !pickedTime) {
      push("Bitte Datum und Zeit wählen (Demo)");
      return;
    }
    if (isSoldOut(pickedDate, pickedTime)) {
      push("Dieser Slot ist ausgebucht (Demo)");
      return;
    }
    addBooking({
      module: "experience",
      itemId: experienceId,
      itemTitle: experienceTitle,
      detail: `${pickedDate} · ${pickedTime} · ${people} P. · CHF ${pricePerPerson * people}`,
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

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] uppercase tracking-wider text-ink-faint capitalize">
            {month.label}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setMonthIdx(Math.max(0, monthIdx - 1))}
              disabled={monthIdx === 0}
              className="px-2 py-1 text-[12px] rounded border border-line disabled:opacity-30"
            >
              ‹
            </button>
            <button
              onClick={() => setMonthIdx(Math.min(months.length - 1, monthIdx + 1))}
              disabled={monthIdx === months.length - 1}
              className="px-2 py-1 text-[12px] rounded border border-line disabled:opacity-30"
            >
              ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {["M", "D", "M", "D", "F", "S", "S"].map((d, i) => (
            <span key={i} className="text-[10px] text-ink-faint">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: month.days[0]?.weekday ?? 0 }).map((_, i) => (
            <span key={`p-${i}`} />
          ))}
          {month.days.map((d) => {
            const active = pickedDate === d.iso;
            const today = d.iso === new Date().toISOString().slice(0, 10);
            return (
              <button
                key={d.iso}
                onClick={() => setPickedDate(d.iso)}
                className={`aspect-square text-[12px] rounded-lg transition-colors ${
                  active
                    ? "bg-ink text-paper"
                    : today
                    ? "bg-paper-dim text-ink"
                    : "hover:bg-paper-dim text-ink-muted"
                }`}
              >
                {d.day}
              </button>
            );
          })}
        </div>
      </div>

      {pickedDate && (
        <div>
          <p className="text-[12px] uppercase tracking-wider text-ink-faint mb-2">
            Zeitfenster
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {TIME_BLOCKS.map((t) => {
              const sold = isSoldOut(pickedDate, t);
              const active = pickedTime === t;
              return (
                <button
                  key={t}
                  disabled={sold}
                  onClick={() => setPickedTime(t)}
                  className={`px-2 py-1.5 rounded-lg border text-[12px] transition-colors ${
                    sold
                      ? "border-line bg-paper-dim text-burgundy/50 line-through cursor-not-allowed"
                      : active
                      ? "bg-ink text-paper border-ink"
                      : "border-line bg-paper hover:border-burgundy"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <p className="text-[12px] uppercase tracking-wider text-ink-faint mb-2">
          Personen
        </p>
        <div className="flex items-center justify-between bg-paper rounded-lg border border-line">
          <button
            onClick={() => setPeople(Math.max(1, people - 1))}
            className="px-4 py-2.5 hover:bg-paper-dim rounded-l-lg"
            aria-label="Weniger"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-medium text-[15px]">{people}</span>
          <button
            onClick={() => setPeople(Math.min(8, people + 1))}
            className="px-4 py-2.5 hover:bg-paper-dim rounded-r-lg"
            aria-label="Mehr"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

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
