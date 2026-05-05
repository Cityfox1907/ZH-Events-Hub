"use client";

import { useEffect, useState } from "react";

/**
 * Render children only after first client mount.
 * Used wherever a component reads localStorage and would otherwise produce a
 * Server/Client hydration mismatch.
 */
export function ClientOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}
