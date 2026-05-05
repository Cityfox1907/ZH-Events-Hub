"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, SIZES } from "@/lib/categories";
import { createUserEvent } from "@/lib/events";
import type { CategoryId, SizeId } from "@/lib/types";
import { useToast } from "./Toast";

interface FormState {
  title: string;
  subtitle: string;
  category: CategoryId;
  size: SizeId;
  date: string;
  time: string;
  venue: string;
  neighborhood: string;
  description: string;
  priceFromChf: string;
  tags: string;
}

const INITIAL: FormState = {
  title: "",
  subtitle: "",
  category: "konzert",
  size: "mid",
  date: "2026-05-18",
  time: "20:00",
  venue: "",
  neighborhood: "",
  description: "",
  priceFromChf: "",
  tags: "",
};

export function EventForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { push } = useToast();

  function update<K extends keyof FormState>(key: K, value: FormState[K]): void {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.title.trim().length < 3) e.title = "Mindestens drei Zeichen.";
    if (!form.date) e.date = "Datum fehlt.";
    if (!form.time) e.time = "Uhrzeit fehlt.";
    if (form.venue.trim().length < 2) e.venue = "Wo findet das statt?";
    if (form.neighborhood.trim().length < 2) e.neighborhood = "Quartier fehlt.";
    if (form.description.trim().length < 20) e.description = "Mindestens 20 Zeichen.";
    if (form.description.length > 500) e.description = "Maximal 500 Zeichen.";
    if (form.priceFromChf && Number.isNaN(Number(form.priceFromChf))) {
      e.priceFromChf = "Bitte eine Zahl in CHF.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const result = createUserEvent({
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      category: form.category,
      size: form.size,
      date: form.date,
      time: form.time,
      venue: form.venue.trim(),
      neighborhood: form.neighborhood.trim(),
      description: form.description.trim(),
      priceFromChf: form.priceFromChf ? Number(form.priceFromChf) : undefined,
      tags,
    });
    if (result.duplicate) {
      push("Dieser Event existiert schon", "info");
    } else {
      push("Event erstellt — wird in der Wochen-Übersicht angezeigt", "success");
    }
    router.push(`/event/${result.event.slug}`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <FieldRow>
        <Field label="Titel" error={errors.title} required>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="z. B. Pop-up Dinner mit Sven Wassmer"
            className={inputClass}
          />
        </Field>
      </FieldRow>

      <FieldRow>
        <Field label="Untertitel · optional" error={errors.subtitle}>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => update("subtitle", e.target.value)}
            placeholder="z. B. 3-Abend-Pop-up des 7Pines-Sterne-Kochs"
            className={inputClass}
          />
        </Field>
      </FieldRow>

      <FieldRow cols={2}>
        <Field label="Kategorie" required>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value as CategoryId)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Größe" required>
          <select
            value={form.size}
            onChange={(e) => update("size", e.target.value as SizeId)}
            className={inputClass}
          >
            {SIZES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label} · {s.capacity}
              </option>
            ))}
          </select>
        </Field>
      </FieldRow>

      <FieldRow cols={2}>
        <Field label="Datum" error={errors.date} required>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Uhrzeit" error={errors.time} required>
          <input
            type="time"
            value={form.time}
            onChange={(e) => update("time", e.target.value)}
            className={inputClass}
          />
        </Field>
      </FieldRow>

      <FieldRow cols={2}>
        <Field label="Venue-Name" error={errors.venue} required>
          <input
            type="text"
            value={form.venue}
            onChange={(e) => update("venue", e.target.value)}
            placeholder="z. B. Kaufleuten"
            className={inputClass}
          />
        </Field>
        <Field label="Quartier" error={errors.neighborhood} required>
          <input
            type="text"
            value={form.neighborhood}
            onChange={(e) => update("neighborhood", e.target.value)}
            placeholder="z. B. Kreis 5"
            className={inputClass}
          />
        </Field>
      </FieldRow>

      <FieldRow>
        <Field
          label="Beschreibung"
          error={errors.description}
          required
          hint={`${form.description.length}/500`}
        >
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={5}
            maxLength={500}
            placeholder="Was macht diesen Abend besonders? Programm, Stimmung, Hinweise."
            className={inputClass}
          />
        </Field>
      </FieldRow>

      <FieldRow cols={2}>
        <Field label="Preis ab · CHF, optional" error={errors.priceFromChf}>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={form.priceFromChf}
            onChange={(e) => update("priceFromChf", e.target.value)}
            placeholder="z. B. 65"
            className={inputClass}
          />
        </Field>
        <Field label="Tags · kommasepariert, optional">
          <input
            type="text"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            placeholder="z. B. Sterne, Pop-up, Pairing"
            className={inputClass}
          />
        </Field>
      </FieldRow>

      <div className="flex items-center gap-3 pt-4 border-t border-line">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 rounded-full bg-burgundy text-paper text-[15px] font-medium hover:bg-burgundy-dark transition-colors disabled:opacity-60"
        >
          Event veröffentlichen
        </button>
        <span className="text-[12px] text-ink-faint">
          Wird sofort in der Wochen-Übersicht und im Aftermath sichtbar
        </span>
      </div>
    </form>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-md border border-line bg-card text-[15px] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none transition-colors";

function FieldRow({ children, cols = 1 }: { children: React.ReactNode; cols?: 1 | 2 }) {
  return (
    <div className={`grid gap-6 ${cols === 2 ? "md:grid-cols-2" : "grid-cols-1"}`}>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow flex items-center justify-between mb-2">
        <span>
          {label}
          {required ? <span className="text-burgundy ml-1">·</span> : null}
        </span>
        {hint ? <span className="text-ink-faint normal-case tracking-normal">{hint}</span> : null}
      </span>
      {children}
      {error ? <span className="block mt-2 text-[12px] text-burgundy">{error}</span> : null}
    </label>
  );
}
