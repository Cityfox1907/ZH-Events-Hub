"use client";

import { useEffect, useState } from "react";
import { Sun, MoonStar } from "lucide-react";

const STORAGE_KEY = "zt:theme";

type Theme = "light" | "dim";

function applyTheme(theme: Theme) {
  if (theme === "dim") {
    document.documentElement.setAttribute("data-theme", "dim");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

/**
 * Umschalter zwischen hellem und gedimmtem Modus.
 * variant "icon" → runder Icon-Button (Header),
 * variant "row"  → Zeile mit Label (Feed-Sidebar).
 */
export function ThemeToggle({ variant = "icon" }: { variant?: "icon" | "row" }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "dim") setTheme("dim");
    } catch {
      /* ignore */
    }
  }, []);

  function toggle() {
    const next: Theme = theme === "dim" ? "light" : "dim";
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }

  const label = theme === "dim" ? "Heller Modus" : "Gedimmter Modus";
  const Icon = theme === "dim" ? Sun : MoonStar;

  if (variant === "row") {
    return (
      <button
        onClick={toggle}
        className="group flex items-center w-fit rounded-full hover:bg-paper-dim transition-colors"
        aria-label={label}
        title={label}
      >
        <span className="p-3">
          <Icon className="w-[26px] h-[26px]" strokeWidth={1.7} />
        </span>
        <span className="hidden xl:inline text-[19px] pr-6">{label}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full border border-line hover:border-burgundy hover:text-burgundy transition-colors"
      aria-label={label}
      title={label}
    >
      <Icon className="w-4 h-4" strokeWidth={1.8} />
    </button>
  );
}
