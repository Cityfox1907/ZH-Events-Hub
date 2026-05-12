"use client";

import { useState } from "react";
import { useToast } from "./Toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const { push } = useToast();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    push("✓ Eingetragen (Demo) — Donnerstags in deinem Postfach", "success");
    setDone(true);
    setEmail("");
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        placeholder="deine@email.ch"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark transition-colors"
      >
        {done ? "Nochmal" : "Abonnieren"}
      </button>
    </form>
  );
}
