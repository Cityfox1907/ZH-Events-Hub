import type { VerificationBadge as VB } from "@/lib/types";

const MAP: Record<VB, { color: string; label: string; emoji: string }> = {
  verified: { color: "bg-emerald-100 text-emerald-800", label: "Verifiziert", emoji: "🟢" },
  "local-hero": { color: "bg-sky-100 text-sky-800", label: "Local Hero", emoji: "🔵" },
  "stadt-stimme": { color: "bg-amber-100 text-amber-800", label: "Stadt-Stimme", emoji: "🟡" },
  team: { color: "bg-purple-100 text-purple-800", label: "ZurichTonight Team", emoji: "🟣" },
};

export function VerificationBadge({ badge, compact = false }: { badge?: VB; compact?: boolean }) {
  if (!badge) return null;
  const cfg = MAP[badge];
  if (compact) {
    return (
      <span className="text-[11px]" title={cfg.label}>
        {cfg.emoji}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${cfg.color}`}
    >
      <span>{cfg.emoji}</span>
      {cfg.label}
    </span>
  );
}
