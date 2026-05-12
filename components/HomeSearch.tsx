"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "./Toast";

export function HomeSearch() {
  const [q, setQ] = useState("");
  const { push } = useToast();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    push(
      q
        ? `✓ Suche "${q}" gesendet (Demo) — Resultate folgen`
        : "Suche bitte mit Stichwort (Demo)"
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex items-center gap-2 px-4 py-3 rounded-full border border-line bg-card card-shadow"
    >
      <Search className="w-5 h-5 text-ink-faint shrink-0" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Restaurant, Konzert, Erlebnis…"
        className="bg-transparent flex-1 text-[14px] focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-1.5 rounded-full bg-burgundy text-paper text-[13px] font-medium hover:bg-burgundy-dark transition-colors"
      >
        Suchen
      </button>
    </form>
  );
}
