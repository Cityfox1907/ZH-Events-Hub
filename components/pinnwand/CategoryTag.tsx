import { categoryTagBackground, getCategory } from "@/lib/pinnwand/categories";
import type { PostCategoryId } from "@/lib/pinnwand/types";

interface Props {
  id: PostCategoryId;
  size?: "sm" | "md";
  onLight?: boolean;
}

export function CategoryTag({ id, size = "md", onLight = false }: Props) {
  const cat = getCategory(id);
  const padding = size === "sm" ? "px-2 py-[3px] text-[10px]" : "px-2.5 py-1 text-[11px]";
  return (
    <span
      className={`inline-flex items-center rounded-sm font-medium uppercase tracking-[0.08em] ${padding}`}
      style={{
        color: onLight ? cat.color : cat.color,
        backgroundColor: categoryTagBackground(cat.color, onLight ? 0.12 : 0.14),
      }}
    >
      {cat.label}
    </span>
  );
}
