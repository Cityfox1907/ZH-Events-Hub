"use client";

import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { StarRating } from "./StarRating";
import { createReview } from "@/lib/reviews";
import { storage } from "@/lib/storage";
import { useToast } from "./Toast";

interface Props {
  eventId: string;
}

export function ReviewForm({ eventId }: Props) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [seat, setSeat] = useState("");
  const [acoustics, setAcoustics] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const { push } = useToast();

  useEffect(() => {
    setAuthorName(storage.readAuthorName());
  }, []);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (rating < 1) e.rating = "Bitte gib eine Bewertung ab.";
    if (text.trim().length < 8) e.text = "Schreib mindestens zwei Sätze.";
    if (authorName.trim().length < 2) e.authorName = "Wie sollen wir dich nennen?";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (!validate()) return;
    storage.writeAuthorName(authorName.trim());
    createReview({
      eventId,
      rating,
      text,
      seat,
      acoustics,
      authorName,
    });
    push("Review veröffentlicht", "success");
    setRating(0);
    setText("");
    setSeat("");
    setAcoustics("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-line-strong text-[13px] text-ink hover:border-ink hover:bg-paper-dim transition-colors"
      >
        <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
        Review schreiben
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="fade-in border border-line rounded-md bg-card p-6 md:p-8 space-y-6"
      noValidate
    >
      <div>
        <label className="eyebrow block mb-3">Wie war's</label>
        <StarRating value={rating} onChange={setRating} />
        {errors.rating ? <p className="mt-2 text-[12px] text-burgundy">{errors.rating}</p> : null}
      </div>

      <div>
        <label htmlFor="review-text" className="eyebrow block mb-3">
          Dein Review
        </label>
        <textarea
          id="review-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          maxLength={800}
          placeholder="Akustik, Stimmung, Sitzplätze, der Moment der den Abend gemacht hat …"
          className="w-full px-4 py-3 rounded-md border border-line bg-paper text-[15px] leading-relaxed placeholder:text-ink-faint focus:border-ink focus:outline-none transition-colors"
        />
        <div className="flex items-center justify-between mt-2">
          {errors.text ? <span className="text-[12px] text-burgundy">{errors.text}</span> : <span />}
          <span className="text-[11px] text-ink-faint tabular-nums">{text.length}/800</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="review-seat" className="eyebrow block mb-2">
            Sitzplatz · optional
          </label>
          <input
            id="review-seat"
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
            placeholder="z. B. Sektor C5, Reihe 14"
            className="w-full px-4 py-3 rounded-md border border-line bg-paper text-[14px] placeholder:text-ink-faint focus:border-ink focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="review-acoustics" className="eyebrow block mb-2">
            Akustik · optional
          </label>
          <input
            id="review-acoustics"
            value={acoustics}
            onChange={(e) => setAcoustics(e.target.value)}
            placeholder="z. B. Klar, balanciert"
            className="w-full px-4 py-3 rounded-md border border-line bg-paper text-[14px] placeholder:text-ink-faint focus:border-ink focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="review-author" className="eyebrow block mb-2">
          Dein Name
        </label>
        <input
          id="review-author"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="z. B. Lea M."
          className="w-full md:w-1/2 px-4 py-3 rounded-md border border-line bg-paper text-[14px] placeholder:text-ink-faint focus:border-ink focus:outline-none transition-colors"
        />
        {errors.authorName ? <p className="mt-2 text-[12px] text-burgundy">{errors.authorName}</p> : null}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="px-5 py-2.5 rounded-full bg-burgundy text-card text-[14px] font-medium hover:bg-burgundy-dark transition-colors"
        >
          Review veröffentlichen
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-5 py-2.5 rounded-full border border-line-strong text-[14px] text-ink-muted hover:text-ink hover:border-ink transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
