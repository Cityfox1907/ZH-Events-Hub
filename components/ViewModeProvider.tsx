"use client";

import { ViewModeContext, useViewModeProvider } from "@/lib/viewMode";

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const value = useViewModeProvider();
  return (
    <ViewModeContext.Provider value={value}>
      {children}
    </ViewModeContext.Provider>
  );
}
