"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import { addBooking } from "@/lib/storage";

export function ReservationForm({
  venueId,
  venueName,
}: {
  venueId: string;
  venueName: string;
}) {
  const [form, setForm] = useState({
    date: "",
    time: "19:30",
    people: 2,
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const { push } = useToast();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.date || !form.name || !form.email) {
      push("Bitte Datum, Name und E-Mail ausfüllen (Demo)");
      return;
    }
    addBooking({
      module: "dine",
      itemId: venueId,
      itemTitle: venueName,
      detail: `${form.date} · ${form.time} · ${form.people} P.`,
    });
    push(
      "✓ Anfrage über ZurichTonight gesendet — der Anbieter meldet sich innerhalb 24h (Demo)",
      "success"
    );
    setForm({ ...form, name: "", email: "", phone: "", notes: "" });
  }

  function field<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <form
      onSubmit={submit}
      className="bg-card border border-line rounded-2xl p-6 card-shadow space-y-3"
    >
      <div>
        <p className="eyebrow">Reservierung anfragen</p>
        <h3 className="font-display text-2xl mt-1">Tisch sichern</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Datum"
          type="date"
          value={form.date}
          onChange={(v) => field("date", v)}
        />
        <Input
          label="Zeit"
          type="time"
          value={form.time}
          onChange={(v) => field("time", v)}
        />
      </div>
      <label className="block">
        <span className="text-[12px] text-ink-muted">Personen</span>
        <select
          value={form.people}
          onChange={(e) => field("people", Number(e.target.value))}
          className="mt-1 w-full px-3 py-2.5 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "Person" : "Personen"}
            </option>
          ))}
        </select>
      </label>
      <Input
        label="Name"
        value={form.name}
        onChange={(v) => field("name", v)}
        required
      />
      <Input
        label="E-Mail"
        type="email"
        value={form.email}
        onChange={(v) => field("email", v)}
        required
      />
      <Input
        label="Telefon (optional)"
        value={form.phone}
        onChange={(v) => field("phone", v)}
      />
      <label className="block">
        <span className="text-[12px] text-ink-muted">Anmerkungen</span>
        <textarea
          value={form.notes}
          onChange={(e) => field("notes", e.target.value)}
          rows={2}
          placeholder="Allergien, Anlass, besondere Wünsche…"
          className="mt-1 w-full px-3 py-2.5 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none resize-none"
        />
      </label>
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark transition-colors"
      >
        Anfrage senden
      </button>
      <p className="text-[11px] text-ink-faint text-center">
        Keine echte Reservierung — alles Demo
      </p>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[12px] text-ink-muted">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 py-2.5 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none"
      />
    </label>
  );
}
