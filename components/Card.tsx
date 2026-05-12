import Link from "next/link";
import { Star } from "lucide-react";
import { BookmarkButton } from "./BookmarkButton";
import type { ModuleKey, Vibe } from "@/lib/types";

interface CardProps {
  module: ModuleKey;
  id: string;
  title: string;
  href: string;
  cover: string;
  eyebrow?: string;
  meta?: string;
  price?: string;
  rating?: number;
  vibe_tags?: Vibe[];
  showBookmark?: boolean;
  badge?: string;
  locked?: boolean;
}

export function Card({
  module,
  id,
  title,
  href,
  cover,
  eyebrow,
  meta,
  price,
  rating,
  vibe_tags,
  showBookmark = true,
  badge,
  locked,
}: CardProps) {
  return (
    <Link
      href={href}
      className="group block bg-card rounded-2xl overflow-hidden border border-line card-shadow card-shadow-hover transition-shadow"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-paper-dim">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            locked ? "grayscale" : ""
          }`}
        />
        {badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-burgundy text-paper text-[11px] font-medium uppercase tracking-wider">
            {badge}
          </span>
        )}
        {locked && (
          <div className="absolute inset-0 bg-ink/40 flex items-center justify-center">
            <span className="px-4 py-2 rounded-full bg-paper text-ink text-[12px] font-medium">
              Premium-Member only
            </span>
          </div>
        )}
        {showBookmark && (
          <div className="absolute top-3 right-3">
            <BookmarkButton module={module} id={id} title={title} />
          </div>
        )}
      </div>
      <div className="p-4 md:p-5">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h3 className="font-display text-lg leading-tight group-hover:text-burgundy transition-colors">
          {title}
        </h3>
        {meta && <p className="text-[13px] text-ink-muted mt-1">{meta}</p>}
        <div className="flex items-center justify-between mt-3 gap-2">
          {price && <span className="text-[13px] font-medium">{price}</span>}
          {typeof rating === "number" && (
            <span className="flex items-center gap-1 text-[13px]">
              <Star className="w-3.5 h-3.5 fill-brass text-brass" />
              {rating.toFixed(1)}
            </span>
          )}
        </div>
        {vibe_tags && vibe_tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {vibe_tags.slice(0, 3).map((v) => (
              <span
                key={v}
                className="px-2 py-0.5 rounded-full bg-paper-dim text-[11px] text-ink-muted"
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
