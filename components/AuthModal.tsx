"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { loginMock } from "@/lib/storage";
import { useToast } from "./Toast";

type Mode = "login" | "register";

export function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("demo@zurichtonight.ch");
  const [password, setPassword] = useState("demo");
  const { push } = useToast();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    loginMock(email);
    push(
      mode === "login"
        ? "✓ Eingeloggt (Demo)"
        : "✓ Konto erstellt — eingeloggt (Demo)",
      "success"
    );
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-ink/40 fade-in"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-md bg-card md:rounded-2xl rounded-t-2xl border border-line p-6 md:p-8 relative"
        style={{ boxShadow: "var(--shadow-modal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Schliessen"
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-muted hover:text-ink"
        >
          <X className="w-5 h-5" />
        </button>
        <p className="eyebrow">ZurichTonight</p>
        <h2 className="font-display text-3xl mt-1">
          {mode === "login" ? "Anmelden" : "Registrieren"}
        </h2>
        <p className="text-[14px] text-ink-muted mt-1">
          Demo-Auth — keine echte Speicherung. Bookmarks und Buchungen werden
          lokal im Browser gehalten.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-[12px] text-ink-muted">E-Mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[12px] text-ink-muted">Passwort</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-line bg-paper focus:border-burgundy focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-burgundy text-paper font-medium hover:bg-burgundy-dark transition-colors"
          >
            {mode === "login" ? "Anmelden" : "Konto erstellen"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="w-full mt-4 text-[14px] text-ink-muted hover:text-burgundy"
        >
          {mode === "login"
            ? "Noch kein Konto? Registrieren"
            : "Bereits ein Konto? Anmelden"}
        </button>
      </div>
    </div>
  );
}
