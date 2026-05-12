"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { isBookmarked, onStorageChange, toggleBookmark } from "@/lib/storage";
import type { ModuleKey } from "@/lib/types";
import { useToast } from "./Toast";

export function BookmarkButton({
  module,
  id,
  title,
  variant = "icon",
}: {
  module: ModuleKey;
  id: string;
  title: string;
  variant?: "icon" | "pill";
}) {
  const [marked, setMarked] = useState(false);
  const [pop, setPop] = useState(false);
  const { push } = useToast();

  useEffect(() => {
    setMarked(isBookmarked(module, id));
    return onStorageChange(() => setMarked(isBookmarked(module, id)));
  }, [module, id]);

  function handle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleBookmark({ module, id, title });
    setPop(true);
    setTimeout(() => setPop(false), 360);
    push(added ? "✓ Gespeichert (Demo)" : "Entfernt", "success");
  }

  if (variant === "pill") {
    return (
      <button
        onClick={handle}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-medium transition-colors ${
          marked
            ? "bg-burgundy text-paper border-burgundy"
            : "border-line hover:border-burgundy hover:text-burgundy"
        }`}
      >
        <Heart
          className={`w-4 h-4 ${pop ? "zb-heart-pop" : ""} ${
            marked ? "fill-paper" : ""
          }`}
        />
        {marked ? "Gespeichert" : "Speichern"}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      aria-label={marked ? "Favorit entfernen" : "Speichern"}
      className={`p-2 rounded-full backdrop-blur transition-colors ${
        marked
          ? "bg-burgundy text-paper"
          : "bg-paper/85 text-ink hover:bg-paper"
      }`}
    >
      <Heart
        className={`w-4 h-4 ${pop ? "zb-heart-pop" : ""} ${
          marked ? "fill-paper" : ""
        }`}
      />
    </button>
  );
}

export function useFavoriteCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    function read() {
      if (typeof window === "undefined") return;
      try {
        const raw = window.localStorage.getItem("zt:bookmarks");
        setCount(raw ? JSON.parse(raw).length : 0);
      } catch {
        setCount(0);
      }
    }
    read();
    return onStorageChange(read);
  }, []);
  return count;
}
