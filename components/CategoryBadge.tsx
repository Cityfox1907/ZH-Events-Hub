import type { CategoryId } from "@/lib/types";
import { categoryLabel } from "@/lib/categories";

interface Props {
  category: CategoryId;
  variant?: "default" | "muted";
  className?: string;
}

export function CategoryBadge({ category, variant = "default", className = "" }: Props) {
  const base =
    variant === "muted"
      ? "text-ink-faint"
      : "text-ink-muted";
  return (
    <span className={`inline-block text-[10px] font-medium uppercase tracking-[0.18em] ${base} ${className}`}>
      {categoryLabel(category)}
    </span>
  );
}
