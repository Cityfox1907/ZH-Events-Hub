"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Eye, Sparkles, ChevronDown, Lock, Check } from "lucide-react";
import { useViewMode, DEMO_PROFILES, type ProfileKey } from "@/lib/viewMode";

export function ViewSwitcher() {
  const { state, setMode, setProfile } = useViewMode();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function chooseMode(mode: "public" | "dashboard") {
    setMode(mode);
    setOpen(false);
    if (mode === "dashboard" && pathname === "/") router.push("/app");
    if (mode === "public" && pathname === "/app") router.push("/");
  }

  function chooseProfile(p: ProfileKey) {
    if (!DEMO_PROFILES[p].available) return;
    setProfile(p);
    setOpen(false);
  }

  const current =
    state.mode === "dashboard"
      ? `Mein Züri (${DEMO_PROFILES[state.profile].name})`
      : "Public Sicht";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line bg-card hover:border-burgundy text-[12px] font-medium transition-colors"
        aria-label="Sicht wechseln"
      >
        {state.mode === "dashboard" ? (
          <Sparkles className="w-3.5 h-3.5 text-burgundy" strokeWidth={1.8} />
        ) : (
          <Eye className="w-3.5 h-3.5 text-ink-muted" strokeWidth={1.8} />
        )}
        <span className="hidden sm:inline">{current}</span>
        <span className="sm:hidden">Sicht</span>
        <ChevronDown className="w-3 h-3 text-ink-faint" strokeWidth={2} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-line rounded-2xl card-shadow z-50 overflow-hidden fade-in">
          <div className="px-4 pt-4 pb-2">
            <p className="eyebrow">Prototyp-Sicht</p>
          </div>

          <button
            onClick={() => chooseMode("public")}
            className="w-full text-left px-4 py-3 hover:bg-paper-dim flex items-start gap-3 transition-colors"
          >
            <Eye
              className="w-4 h-4 mt-0.5 text-ink-muted shrink-0"
              strokeWidth={1.6}
            />
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-medium leading-tight">
                Public Sicht
              </p>
              <p className="text-[11.5px] text-ink-faint mt-0.5">
                Für Besucher ohne Account
              </p>
            </div>
            {state.mode === "public" && (
              <Check className="w-4 h-4 text-burgundy shrink-0" />
            )}
          </button>

          <button
            onClick={() => chooseMode("dashboard")}
            className="w-full text-left px-4 py-3 hover:bg-paper-dim flex items-start gap-3 transition-colors border-t border-line"
          >
            <Sparkles
              className="w-4 h-4 mt-0.5 text-burgundy shrink-0"
              strokeWidth={1.6}
            />
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-medium leading-tight">
                Mein Züri (Dashboard)
              </p>
              <p className="text-[11.5px] text-ink-faint mt-0.5">
                Personalisiert für eingeloggten Nutzer
              </p>
            </div>
            {state.mode === "dashboard" && (
              <Check className="w-4 h-4 text-burgundy shrink-0" />
            )}
          </button>

          <div className="border-t border-line bg-paper-dim/40">
            <div className="px-4 pt-3 pb-1">
              <p className="eyebrow">Demo-Profil</p>
            </div>
            {(Object.keys(DEMO_PROFILES) as ProfileKey[]).map((key) => {
              const p = DEMO_PROFILES[key];
              const active = state.profile === key;
              return (
                <button
                  key={key}
                  onClick={() => chooseProfile(key)}
                  disabled={!p.available}
                  className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                    p.available
                      ? "hover:bg-paper"
                      : "opacity-40 cursor-not-allowed"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium shrink-0 ${
                      active ? "bg-burgundy text-white" : "bg-paper-dim text-ink-muted"
                    }`}
                  >
                    {p.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium leading-tight flex items-center gap-1.5">
                      {p.name}
                      {!p.available && (
                        <Lock
                          className="w-3 h-3 text-ink-faint"
                          strokeWidth={1.8}
                        />
                      )}
                    </p>
                    <p className="text-[11px] text-ink-faint mt-0.5">
                      {p.short}
                      {!p.available && " · kommt in Phase 2"}
                    </p>
                  </div>
                  {active && p.available && (
                    <Check className="w-4 h-4 text-burgundy shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
