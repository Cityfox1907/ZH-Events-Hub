import Link from "next/link";
import { Star, TrendingUp, Eye, Clock } from "lucide-react";
import { BookmarkButton } from "./BookmarkButton";
import { ShareButton } from "./ShareModal";
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
  showShare?: boolean;
  badge?: string;
  locked?: boolean;
  trending?: boolean;
  soldOut?: boolean;
  views24h?: number;
  ticketsLeft?: number;
  addedAt?: string;
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
  showShare = false,
  badge,
  locked,
  trending,
  soldOut,
  views24h,
  ticketsLeft,
  addedAt,
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
            locked || soldOut ? "grayscale" : ""
          }`}
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {trending && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-burgundy text-paper text-[10px] font-medium uppercase tracking-wider">
              <TrendingUp className="w-3 h-3" /> Trending
            </span>
          )}
          {badge && !soldOut && (
            <span className="px-2.5 py-1 rounded-full bg-ink text-paper text-[10px] font-medium uppercase tracking-wider">
              {badge}
            </span>
          )}
          {addedAt && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-paper/85 text-ink text-[10px] font-medium backdrop-blur">
              <Clock className="w-3 h-3" /> Neu
            </span>
          )}
          {soldOut && (
            <span className="px-2.5 py-1 rounded-full bg-ink/80 text-paper text-[10px] font-medium uppercase tracking-wider">
              Ausverkauft
            </span>
          )}
        </div>

        {locked && (
          <div className="absolute inset-0 bg-ink/40 flex items-center justify-center">
            <span className="px-4 py-2 rounded-full bg-paper text-ink text-[12px] font-medium">
              Premium-Member only
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex gap-1.5">
          {showShare && <ShareButton title={title} variant="icon" />}
          {showBookmark && (
            <BookmarkButton module={module} id={id} title={title} />
          )}
        </div>

        {(views24h || ticketsLeft !== undefined) && !soldOut && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {views24h !== undefined && views24h > 50 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ink/75 text-paper text-[10px] backdrop-blur">
                <Eye className="w-3 h-3" /> {views24h} in 24h
              </span>
            )}
            {ticketsLeft !== undefined && ticketsLeft > 0 && ticketsLeft < 15 && (
              <span className="px-2 py-0.5 rounded-full bg-burgundy/90 text-paper text-[10px] font-medium backdrop-blur">
                Nur noch {ticketsLeft} Plätze
              </span>
            )}
          </div>
        )}
      </div>
      <div className="p-4 md:p-5">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h3 className="font-display text-lg leading-tight group-hover:text-burgundy transition-colors line-clamp-2">
          {title}
        </h3>
        {meta && <p className="text-[13px] text-ink-muted mt-1 line-clamp-2">{meta}</p>}
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
                className={`px-2 py-0.5 rounded-full text-[11px] ${
                  v === "Premium" || v === "Fine Dining" || v === "Magical"
                    ? "bg-burgundy/10 text-burgundy"
                    : v === "Trending"
                    ? "bg-brass/10 text-brass"
                    : "bg-paper-dim text-ink-muted"
                }`}
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
