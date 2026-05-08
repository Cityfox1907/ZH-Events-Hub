import { MapPin } from "lucide-react";
import { getQuartier } from "@/lib/pinnwand/quartiere";
import type { QuartierId } from "@/lib/pinnwand/types";

interface Props {
  id: QuartierId;
  variant?: "default" | "compact";
  withIcon?: boolean;
}

export function QuartierTag({ id, variant = "default", withIcon = true }: Props) {
  const q = getQuartier(id);
  if (variant === "compact") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.04em] text-ink-muted">
        {withIcon ? <MapPin className="w-3 h-3" strokeWidth={1.75} /> : null}
        <span>{q.short}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[12px] tracking-[0.02em] text-ink-muted">
      {withIcon ? <MapPin className="w-3 h-3" strokeWidth={1.75} /> : null}
      <span>{q.label}</span>
    </span>
  );
}
