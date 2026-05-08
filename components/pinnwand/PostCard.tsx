"use client";

import Link from "next/link";
import { useState } from "react";
import { Bookmark, Heart, MessageCircle, BadgeCheck, Sparkles } from "lucide-react";
import { categoryTagBackground, getCategory } from "@/lib/pinnwand/categories";
import { getQuartier } from "@/lib/pinnwand/quartiere";
import { formatRelativeTime } from "@/lib/pinnwand/filters";
import type { PinnwandPost } from "@/lib/pinnwand/types";
import { CategoryTag } from "./CategoryTag";
import { QuartierTag } from "./QuartierTag";

interface Props {
  post: PinnwandPost;
  variant?: "standard" | "featured" | "compact";
  anchorIso?: string;
}

export function PostCard({ post, variant = "standard", anchorIso }: Props) {
  if (variant === "compact") return <CompactCard post={post} anchorIso={anchorIso} />;
  if (variant === "featured") return <FeaturedCard post={post} anchorIso={anchorIso} />;
  return <StandardCard post={post} anchorIso={anchorIso} />;
}

function StandardCard({ post, anchorIso }: { post: PinnwandPost; anchorIso?: string }) {
  const cat = getCategory(post.category);
  return (
    <Link
      href={`/pinnwand/${post.id}`}
      className="block group break-inside-avoid mb-5"
    >
      <article
        className="relative bg-card border border-line rounded-lg overflow-hidden card-shadow card-shadow-hover transition-shadow duration-200"
        style={{ borderLeft: `4px solid ${cat.color}` }}
      >
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <CategoryTag id={post.category} />
            <QuartierTag id={post.quartier} />
            <span className="text-ink-faint text-[12px] ml-auto">
              {formatRelativeTime(post.createdAt, anchorIso)}
            </span>
          </div>

          {post.headline ? (
            <h3 className="font-display text-[20px] sm:text-[22px] leading-[1.2] tracking-[-0.015em] text-ink mb-2 group-hover:text-burgundy transition-colors">
              {post.headline}
            </h3>
          ) : null}

          <p className="text-[14.5px] leading-[1.6] text-ink-muted line-clamp-4">
            {post.body}
          </p>

          {post.body.length > 220 ? (
            <span className="inline-block mt-2 text-[12px] font-medium text-burgundy uppercase tracking-[0.08em]">
              Mehr lesen →
            </span>
          ) : null}
        </div>

        {post.photos && post.photos.length > 0 ? (
          <div className="px-5 sm:px-6 pb-5">
            <div
              className="aspect-[16/10] w-full rounded-md overflow-hidden bg-paper-dim"
              style={{
                backgroundImage: `url(${post.photos[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              role="img"
              aria-label={post.headline ?? "Pinnwand-Bild"}
            />
          </div>
        ) : null}

        <CardFooter post={post} />
      </article>
    </Link>
  );
}

function FeaturedCard({ post, anchorIso }: { post: PinnwandPost; anchorIso?: string }) {
  const cat = getCategory(post.category);
  const hasPhoto = (post.photos?.length ?? 0) > 0;
  return (
    <Link
      href={`/pinnwand/${post.id}`}
      className="group block w-[280px] sm:w-[320px] shrink-0"
    >
      <article
        className="relative w-full h-[380px] rounded-lg overflow-hidden card-shadow card-shadow-hover transition-shadow duration-200 flex flex-col"
        style={{
          backgroundColor: hasPhoto ? "#000" : cat.color,
        }}
      >
        {hasPhoto ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${post.photos![0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />
        ) : (
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.25), transparent 50%)",
            }}
            aria-hidden
          />
        )}

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15"
          aria-hidden
        />

        <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card text-brass text-[10px] uppercase tracking-[0.12em] font-medium">
          <Sparkles className="w-3 h-3" strokeWidth={2} />
          Diese Woche
        </div>

        <div className="relative z-10 mt-auto p-5 text-paper">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="inline-flex items-center px-2 py-[3px] rounded-sm text-[10px] uppercase tracking-[0.08em] font-medium bg-white/15 backdrop-blur-sm"
            >
              {cat.label}
            </span>
            <span className="text-[11px] tracking-[0.04em] opacity-85">
              {getQuartier(post.quartier).label}
            </span>
            <span className="text-[11px] opacity-70 ml-auto">
              {formatRelativeTime(post.createdAt, anchorIso)}
            </span>
          </div>

          {post.headline ? (
            <h3 className="font-display text-[22px] leading-[1.15] tracking-[-0.015em] mb-2 line-clamp-3">
              {post.headline}
            </h3>
          ) : null}

          <p className="text-[13px] leading-[1.55] opacity-85 line-clamp-3">
            {post.body}
          </p>

          <div className="flex items-center gap-3 mt-4 text-[12px] opacity-90">
            <span className="inline-flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" strokeWidth={1.75} />
              {post.likes}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
              {post.comments}
            </span>
            <span className="ml-auto truncate max-w-[140px] text-[11px]">
              {post.author.name}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function CompactCard({ post, anchorIso }: { post: PinnwandPost; anchorIso?: string }) {
  const cat = getCategory(post.category);
  return (
    <Link
      href={`/pinnwand/${post.id}`}
      className="group flex items-start gap-3 p-3 rounded-md hover:bg-paper-dim/70 transition-colors"
    >
      <span
        className="w-1 self-stretch rounded-full shrink-0"
        style={{ backgroundColor: cat.color }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[10px] uppercase tracking-[0.08em] font-medium"
            style={{ color: cat.color }}
          >
            {cat.label}
          </span>
          <span className="text-[10px] text-ink-faint">·</span>
          <span className="text-[10px] text-ink-muted">
            {getQuartier(post.quartier).short}
          </span>
        </div>
        <p className="text-[13px] leading-[1.5] text-ink line-clamp-2">
          {post.headline ?? post.body}
        </p>
        <div className="text-[10px] text-ink-faint mt-1">
          {formatRelativeTime(post.createdAt, anchorIso)}
        </div>
      </div>
      <div className="flex items-center gap-1 text-[11px] text-ink-faint shrink-0 mt-1 tabular-nums">
        <Heart className="w-3 h-3" strokeWidth={1.75} />
        {post.likes}
      </div>
    </Link>
  );
}

function CardFooter({ post }: { post: PinnwandPost }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="px-5 sm:px-6 py-3 border-t border-line flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[11px] text-paper font-medium shrink-0"
          style={{ backgroundColor: post.author.avatarColor }}
          aria-hidden
        >
          {post.author.name.charAt(0)}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-[12px] text-ink leading-tight">
            <span className="font-medium truncate">{post.author.name}</span>
            {post.author.verified ? (
              <BadgeCheck className="w-3.5 h-3.5 text-burgundy shrink-0" strokeWidth={2} />
            ) : null}
          </div>
          <div className="text-[10px] text-ink-faint">
            {getQuartier(post.author.quartier).label}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <ActionButton
          ariaLabel="Liken"
          active={liked}
          onClick={(e) => {
            e.preventDefault();
            setLiked((v) => !v);
          }}
          activeColor="text-burgundy"
          count={post.likes + (liked ? 1 : 0)}
        >
          <Heart
            className="w-4 h-4"
            strokeWidth={1.75}
            fill={liked ? "currentColor" : "none"}
          />
        </ActionButton>
        <ActionButton ariaLabel="Kommentare" count={post.comments}>
          <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
        </ActionButton>
        <ActionButton
          ariaLabel="Speichern"
          active={bookmarked}
          onClick={(e) => {
            e.preventDefault();
            setBookmarked((v) => !v);
          }}
          activeColor="text-ink"
        >
          <Bookmark
            className="w-4 h-4"
            strokeWidth={1.75}
            fill={bookmarked ? "currentColor" : "none"}
          />
        </ActionButton>
      </div>
    </div>
  );
}

function ActionButton({
  ariaLabel,
  count,
  active = false,
  onClick,
  activeColor = "text-burgundy",
  children,
}: {
  ariaLabel: string;
  count?: number;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  activeColor?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-full text-[12px] tabular-nums transition-colors ${
        active ? activeColor : "text-ink-muted hover:text-ink"
      }`}
    >
      {children}
      {typeof count === "number" ? <span>{count}</span> : null}
    </button>
  );
}

// keeps tag-color helper in scope for future composability
void categoryTagBackground;
