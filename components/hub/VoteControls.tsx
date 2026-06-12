"use client";

import { useState } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { formatMembers } from "@/lib/hub";

/** Vertikale Upvote/Downvote-Spalte im Forum-Stil. */
export function VoteControls({ upvotes }: { upvotes: number }) {
  const [vote, setVote] = useState<-1 | 0 | 1>(0);
  const count = upvotes + vote;

  return (
    <div className="flex flex-col items-center gap-0.5 w-10 py-2 shrink-0 bg-paper-dim/40">
      <button
        aria-label="Hochwählen"
        onClick={() => setVote((v) => (v === 1 ? 0 : 1))}
        className={`p-1 rounded transition-colors hover:bg-burgundy/10 ${
          vote === 1 ? "text-burgundy" : "text-ink-faint hover:text-burgundy"
        }`}
      >
        <ArrowBigUp
          className="w-5 h-5"
          strokeWidth={1.6}
          fill={vote === 1 ? "currentColor" : "none"}
        />
      </button>
      <span
        className={`text-[12px] font-bold tabular-nums ${
          vote === 1
            ? "text-burgundy"
            : vote === -1
              ? "text-rose-600"
              : "text-ink-muted"
        }`}
      >
        {formatMembers(count)}
      </span>
      <button
        aria-label="Runterwählen"
        onClick={() => setVote((v) => (v === -1 ? 0 : -1))}
        className={`p-1 rounded transition-colors hover:bg-rose-600/10 ${
          vote === -1 ? "text-rose-600" : "text-ink-faint hover:text-rose-600"
        }`}
      >
        <ArrowBigDown
          className="w-5 h-5"
          strokeWidth={1.6}
          fill={vote === -1 ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
}
