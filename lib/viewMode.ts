"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ProfileKey = "fiko" | "sarah" | "tom";

export interface DemoProfile {
  key: ProfileKey;
  name: string;
  short: string;
  district: string;
  interests: string[];
  bookmarks: { events: number; places: number };
  available: boolean;
}

export const DEMO_PROFILES: Record<ProfileKey, DemoProfile> = {
  fiko: {
    key: "fiko",
    name: "Fiko",
    short: "Lokaler Nutzer",
    district: "Zürich-Nord / Regensdorf",
    interests: ["Konzerte", "Restaurants", "Stadt-Politik"],
    bookmarks: { events: 12, places: 8 },
    available: true,
  },
  sarah: {
    key: "sarah",
    name: "Sarah",
    short: "Expat",
    district: "Kreis 4",
    interests: ["Networking", "Cafés", "Yoga"],
    bookmarks: { events: 0, places: 0 },
    available: false,
  },
  tom: {
    key: "tom",
    name: "Tom",
    short: "Tourist",
    district: "Kreis 1",
    interests: ["Sightseeing", "Food-Touren"],
    bookmarks: { events: 0, places: 0 },
    available: false,
  },
};

export type ViewMode = "public" | "dashboard";

export interface ViewState {
  mode: ViewMode;
  profile: ProfileKey;
}

const STORAGE_KEY = "zt:view-mode";
const CHANGE_EVENT = "zt:view-mode-change";

const DEFAULT_STATE: ViewState = { mode: "public", profile: "fiko" };

export function readViewState(): ViewState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<ViewState>;
    return {
      mode: parsed.mode === "dashboard" ? "dashboard" : "public",
      profile:
        parsed.profile && DEMO_PROFILES[parsed.profile as ProfileKey]?.available
          ? (parsed.profile as ProfileKey)
          : "fiko",
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function writeViewState(state: ViewState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  } catch {
    /* ignore */
  }
}

export function onViewChange(handler: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

const ViewModeContext = createContext<{
  state: ViewState;
  setMode: (mode: ViewMode) => void;
  setProfile: (profile: ProfileKey) => void;
} | null>(null);

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) {
    return {
      state: DEFAULT_STATE,
      setMode: () => {},
      setProfile: () => {},
    };
  }
  return ctx;
}

export function useCurrentProfile() {
  const { state } = useViewMode();
  return DEMO_PROFILES[state.profile];
}

export { ViewModeContext, DEFAULT_STATE };

export function useViewModeProvider() {
  const [state, setState] = useState<ViewState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readViewState());
    setHydrated(true);
    return onViewChange(() => setState(readViewState()));
  }, []);

  function setMode(mode: ViewMode) {
    const next = { ...state, mode };
    setState(next);
    writeViewState(next);
  }

  function setProfile(profile: ProfileKey) {
    if (!DEMO_PROFILES[profile]?.available) return;
    const next = { ...state, profile };
    setState(next);
    writeViewState(next);
  }

  return { state, setMode, setProfile, hydrated };
}
