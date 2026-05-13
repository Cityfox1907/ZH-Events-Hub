"use client";

import { useEffect, useState } from "react";

function getSeasonGradient(month: number): string {
  // 0=Jan
  if (month <= 1 || month === 11) {
    // Winter — cool steel-blue
    return "linear-gradient(180deg, rgba(10,23,51,0.65) 0%, rgba(15,77,168,0.25) 60%, transparent 100%)";
  }
  if (month <= 4) {
    // Spring — fresh
    return "linear-gradient(180deg, rgba(10,23,51,0.55) 0%, rgba(91,125,176,0.15) 60%, transparent 100%)";
  }
  if (month <= 7) {
    // Summer — warm
    return "linear-gradient(180deg, rgba(10,23,51,0.60) 0%, rgba(180,140,80,0.18) 60%, transparent 100%)";
  }
  // Autumn — orange-brown
  return "linear-gradient(180deg, rgba(10,23,51,0.65) 0%, rgba(160,90,40,0.22) 60%, transparent 100%)";
}

export function SeasonalOverlay() {
  const [gradient, setGradient] = useState(getSeasonGradient(4));

  useEffect(() => {
    setGradient(getSeasonGradient(new Date().getMonth()));
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: gradient }}
      aria-hidden
    />
  );
}
