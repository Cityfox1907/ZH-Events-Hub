"use client";

import { useEffect, useState } from "react";
import { Armchair, Volume2 } from "lucide-react";
import { StarRating } from "./StarRating";
import { getReviewsForEvent, ensureSeedReviews, averageRating } from "@/lib/reviews";
import { STORAGE_EVENT } from "@/lib/storage";
import { relativeTime } from "@/lib/format";
import type { Review } from "@/lib/types";

interface Props {
  eventId: string;
}

export function ReviewList({ eventId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avg, setAvg] = useState<number | null>(null);

  useEffect(() => {
    ensureSeedReviews();
    const sync = () => {
      setReviews(getReviewsForEvent(eventId));
      setAvg(averageRating(eventId));
    };
    sync();
    window.addEventListener(STORAGE_EVENT, sync);
    return () => window.removeEventListener(STORAGE_EVENT, sync);
  }, [eventId]);

  if (reviews.length === 0) {
    return (
      <div className="border border-dashed border-line-strong rounded-md p-8 text-center bg-card">
        <p className="font-display text-xl text-ink mb-2">Noch keine Reviews.</p>
        <p className="text-[14px] text-ink-muted">Sei die erste Person, die hier vom Abend erzählt.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl text-ink tabular-nums">{avg?.toFixed(1)}</span>
          {avg !== null ? <StarRating value={Math.round(avg)} readOnly size={16} /> : null}
          <span className="text-[12px] text-ink-faint">
            · {reviews.length} {reviews.length === 1 ? "Stimme" : "Stimmen"}
          </span>
        </div>
      </div>

      <ul className="space-y-7">
        {reviews.map((review) => (
          <li key={review.id} className="fade-in border-l-2 border-burgundy pl-5">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <Avatar name={review.authorName} />
                <div>
                  <div className="text-[14px] font-medium text-ink">{review.authorName}</div>
                  <div className="text-[11px] text-ink-faint">{relativeTime(review.createdAt)}</div>
                </div>
              </div>
              <StarRating value={review.rating} readOnly size={14} />
            </div>
            <p className="text-[15px] leading-relaxed text-ink whitespace-pre-line">{review.text}</p>
            {(review.seat || review.acoustics) && (
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-ink-muted">
                {review.seat ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Armchair className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {review.seat}
                  </span>
                ) : null}
                {review.acoustics ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {review.acoustics}
                  </span>
                ) : null}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
  return (
    <div className="w-9 h-9 rounded-full bg-paper-dim border border-line flex items-center justify-center text-[12px] font-medium text-ink-muted">
      {initials || "·"}
    </div>
  );
}
