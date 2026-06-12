"use client";

import { useEffect, useState } from "react";
import { readJoined, toggleJoined, onJoinedChange } from "@/lib/hub";

/**
 * "Beitreten"-Button mit localStorage-Persistenz, damit
 * Hub-Sidebar und Communities-Verzeichnis denselben Stand zeigen.
 */
export function JoinButton({
  slug,
  size = "md",
}: {
  slug: string;
  size?: "sm" | "md";
}) {
  const [joined, setJoined] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setJoined(readJoined().includes(slug));
    setHydrated(true);
    return onJoinedChange(() => setJoined(readJoined().includes(slug)));
  }, [slug]);

  const base =
    size === "sm"
      ? "px-3 py-1 text-[12px]"
      : "px-5 py-1.5 text-[13px]";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleJoined(slug);
      }}
      className={`${base} rounded-full font-bold transition-colors ${
        hydrated && joined
          ? "border border-line text-ink-muted hover:border-rose-400 hover:text-rose-600"
          : "bg-burgundy text-white hover:bg-burgundy-dark"
      }`}
    >
      {hydrated && joined ? "Beigetreten" : "Beitreten"}
    </button>
  );
}
