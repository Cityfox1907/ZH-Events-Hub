"use client";

import { useEffect, useState } from "react";

const BASE = 1247;

export function LiveCounter({ className = "" }: { className?: string }) {
  const [count, setCount] = useState(BASE);

  useEffect(() => {
    const id = setInterval(() => {
      const delta = Math.floor(Math.random() * 11) - 5;
      setCount((c) => Math.max(900, Math.min(1600, c + delta)));
    }, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-burgundy zb-pulse" />
      <span className="tabular-nums">
        <strong className="text-ink font-medium">{count.toLocaleString("de-CH")}</strong>
        <span className="hidden sm:inline"> Zürcher online</span>
      </span>
    </span>
  );
}
