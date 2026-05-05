import type { SizeId } from "@/lib/types";
import { sizeLabel } from "@/lib/categories";

const VARIANT: Record<SizeId, string> = {
  mega: "bg-burgundy text-card",
  major: "bg-ink text-card",
  mid: "bg-card text-ink border border-line-strong",
  intimate: "bg-paper-dim text-ink-muted border border-line",
};

interface Props {
  size: SizeId;
  className?: string;
}

export function SizeBadge({ size, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] rounded-sm ${VARIANT[size]} ${className}`}
    >
      {sizeLabel(size)}
    </span>
  );
}
