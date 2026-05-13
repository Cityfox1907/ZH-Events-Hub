import type { IdentityTier } from "@/lib/types";
import { IDENTITY_META } from "@/lib/phase3-data";

interface Props {
  tier: IdentityTier;
  compact?: boolean;
  withLabel?: boolean;
}

export function IdentityBadge({ tier, compact = false, withLabel = true }: Props) {
  const m = IDENTITY_META[tier];
  if (compact) {
    return (
      <span className="text-[11px]" title={m.label}>
        {m.dot}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10.5px] font-medium ${m.bg} ${m.text}`}
      title={m.label}
    >
      <span aria-hidden>{m.dot}</span>
      {withLabel && m.label}
    </span>
  );
}

export function IdentityPyramidLegend() {
  const order: IdentityTier[] = ["wohnsitz", "member", "standard", "anonym"];
  return (
    <div className="rounded-xl border border-line bg-paper-dim/60 p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-burgundy mb-2">
        Identitäts-Pyramide
      </p>
      <ul className="space-y-1.5">
        {order.map((t) => {
          const m = IDENTITY_META[t];
          return (
            <li key={t} className="flex items-center gap-2 text-[12.5px]">
              <span>{m.dot}</span>
              <span className="font-medium">{m.label}</span>
              <span className="text-ink-faint">
                {t === "wohnsitz" && "— Adresse bestätigt"}
                {t === "member" && "— Email + Telefon"}
                {t === "standard" && "— nur Email"}
                {t === "anonym" && "— nur Beichtstuhl & Verschenken"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
