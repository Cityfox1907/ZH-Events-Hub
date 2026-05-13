import { Info } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="bg-paper-dim/70 border-b border-line">
      <div className="container-editorial py-1.5 flex items-center justify-center gap-2 text-[11px] text-ink-faint">
        <Info className="w-3 h-3" strokeWidth={1.8} />
        <span>
          Visions-Prototyp — Demonstriert den Endzustand der Plattform nach
          10–20 Jahren Reife.
        </span>
      </div>
    </div>
  );
}
