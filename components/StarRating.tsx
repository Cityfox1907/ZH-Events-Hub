"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface Props {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  readOnly?: boolean;
  ariaLabel?: string;
}

export function StarRating({ value, onChange, size = 22, readOnly = false, ariaLabel = "Bewertung" }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  if (readOnly) {
    return (
      <div className="inline-flex items-center gap-0.5" aria-label={`${value} von 5 Sternen`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            width={size}
            height={size}
            strokeWidth={1.5}
            className={i <= value ? "fill-burgundy text-burgundy" : "fill-transparent text-line-strong"}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1"
      onMouseLeave={() => setHover(null)}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} ${i === 1 ? "Stern" : "Sterne"}`}
          onMouseEnter={() => setHover(i)}
          onClick={() => onChange?.(i)}
          className="p-1 -m-1 transition-transform duration-150 hover:scale-110"
        >
          <Star
            width={size}
            height={size}
            strokeWidth={1.5}
            className={`transition-colors ${
              i <= display ? "fill-burgundy text-burgundy" : "fill-transparent text-line-strong"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
