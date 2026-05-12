"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
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
  const { push } = useToast();

  useEffect(() => {
    setMarked(isBookmarked(module, id));
    return onStorageChange(() => setMarked(isBookmarked(module, id)));
  }, [module, id]);

  function handle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleBookmark({ module, id, title });
    push(added ? "✓ Gespeichert (Demo)" : "Entfernt", "success");
  }

  if (variant === "pill") {
    return (
      <button
        onClick={handle}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-medium transition-colors ${
          marked
            ? "bg-ink text-paper border-ink"
            : "border-line hover:border-burgundy hover:text-burgundy"
        }`}
      >
        {marked ? (
          <BookmarkCheck className="w-4 h-4" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
        {marked ? "Gespeichert" : "Speichern"}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      aria-label={marked ? "Bookmark entfernen" : "Bookmarken"}
      className={`p-2 rounded-full backdrop-blur transition-colors ${
        marked
          ? "bg-ink/85 text-paper"
          : "bg-paper/85 text-ink hover:bg-paper"
      }`}
    >
      {marked ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
    </button>
  );
}
