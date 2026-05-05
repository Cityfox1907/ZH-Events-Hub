import type { SizeId } from "@/lib/types";
import { sizeLabel } from "@/lib/categories";

const VARIANT: Record<SizeId, { className: string; dots: number }> = {
  mega: { className: "bg-burgundy text-paper", dots: 4 },
  major: { className: "bg-ink text-paper", dots: 3 },
  mid: { className: "bg-paper-dim text-ink border border-line", dots: 2 },
  intimate: { className: "bg-transparent text-ink-muted border border-line", dots: 1 },
};

interface Props {
  size: SizeId;
  className?: string;
}

export function SizeBadge({ size, className = "" }: Props) {
  const v = VARIANT[size];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-[2px] text-[10px] font-medium uppercase tracking-[0.15em] rounded-full ${v.className} ${className}`}
    >
      <span className="inline-flex items-center gap-[2px] mr-0.5">
        {Array.from({ length: v.dots }).map((_, i) => (
          <span
            key={i}
            className="block w-[3px] h-[3px] rounded-full bg-current opacity-70"
            aria-hidden
          />
        ))}
      </span>
      {sizeLabel(size)}
    </span>
  );
}
