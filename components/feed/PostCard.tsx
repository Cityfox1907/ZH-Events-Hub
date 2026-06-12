"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Repeat2,
  Heart,
  BarChart2,
  Bookmark,
  Share,
  BadgeCheck,
  MoreHorizontal,
} from "lucide-react";
import type { FeedPost } from "@/lib/feed";

/** 15734 → "15,7 K" */
export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")} Mio`;
  if (n >= 10_000) return `${(n / 1000).toFixed(1).replace(".", ",")} K`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".", ",")} K`;
  return String(n);
}

const BADGE_COLOR: Record<string, string> = {
  verified: "text-burgundy",
  "local-hero": "text-amber-500",
  "stadt-stimme": "text-emerald-600",
  team: "text-burgundy",
};

export function PostCard({ post }: { post: FeedPost }) {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const likes = post.stats.likes + (liked ? 1 : 0);
  const reposts = post.stats.reposts + (reposted ? 1 : 0);

  return (
    <article className="flex gap-3 px-4 py-3 border-b border-line hover:bg-paper-dim/40 transition-colors cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.avatar}
        alt={post.name}
        className="w-10 h-10 rounded-full bg-paper-dim shrink-0 object-cover"
      />

      <div className="flex-1 min-w-0">
        {/* Kopfzeile: Name · @handle · Zeit */}
        <div className="flex items-center gap-1 text-[14px] leading-tight">
          <span className="font-bold truncate hover:underline">{post.name}</span>
          {post.badge && (
            <BadgeCheck
              className={`w-4 h-4 shrink-0 ${BADGE_COLOR[post.badge] ?? "text-burgundy"}`}
              strokeWidth={2}
            />
          )}
          <span className="text-ink-faint truncate">@{post.handle}</span>
          <span className="text-ink-faint">·</span>
          <span className="text-ink-faint whitespace-nowrap hover:underline">
            {post.time}
          </span>
          <button
            className="ml-auto p-1.5 -mr-1.5 rounded-full text-ink-faint hover:text-burgundy hover:bg-burgundy/10 transition-colors shrink-0"
            aria-label="Mehr"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Text */}
        <p className="text-[14.5px] leading-snug mt-0.5 whitespace-pre-line break-words">
          {post.text}
        </p>

        {/* Hashtags */}
        {post.tags.length > 0 && (
          <p className="mt-1 text-[14px] leading-snug">
            {post.tags.map((t) => (
              <span key={t} className="text-burgundy mr-2">
                #{t}
              </span>
            ))}
          </p>
        )}

        {/* Bild */}
        {post.image && (
          <div className="mt-3 rounded-2xl overflow-hidden border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt=""
              className="w-full max-h-[420px] object-cover"
            />
          </div>
        )}

        {/* Aktionsleiste */}
        <div className="flex items-center justify-between mt-2 -ml-2 max-w-[460px] text-ink-faint">
          <ActionButton
            Icon={MessageCircle}
            label="Antworten"
            count={post.stats.replies}
            tone="group-hover/a:text-burgundy group-hover/a:bg-burgundy/10"
          />
          <ActionButton
            Icon={Repeat2}
            label="Reposten"
            count={reposts}
            active={reposted}
            activeClass="text-emerald-600"
            tone="group-hover/a:text-emerald-600 group-hover/a:bg-emerald-600/10"
            onClick={() => setReposted((v) => !v)}
          />
          <ActionButton
            Icon={Heart}
            label="Gefällt mir"
            count={likes}
            active={liked}
            activeClass="text-rose-600"
            fillWhenActive
            tone="group-hover/a:text-rose-600 group-hover/a:bg-rose-600/10"
            onClick={() => setLiked((v) => !v)}
          />
          <ActionButton
            Icon={BarChart2}
            label="Aufrufe"
            count={post.stats.views}
            tone="group-hover/a:text-burgundy group-hover/a:bg-burgundy/10"
          />
          <div className="flex items-center">
            <IconOnlyButton
              Icon={Bookmark}
              label="Lesezeichen"
              active={bookmarked}
              activeClass="text-burgundy"
              fillWhenActive
              onClick={() => setBookmarked((v) => !v)}
            />
            <IconOnlyButton Icon={Share} label="Teilen" />
          </div>
        </div>
      </div>
    </article>
  );
}

function ActionButton({
  Icon,
  label,
  count,
  active,
  activeClass = "",
  fillWhenActive,
  tone,
  onClick,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; fill?: string }>;
  label: string;
  count: number;
  active?: boolean;
  activeClass?: string;
  fillWhenActive?: boolean;
  tone: string;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`group/a flex items-center gap-0.5 text-[12.5px] tabular-nums transition-colors ${
        active ? activeClass : ""
      }`}
    >
      <span className={`p-2 rounded-full transition-colors ${tone}`}>
        <Icon
          className="w-[18px] h-[18px]"
          strokeWidth={1.8}
          fill={fillWhenActive && active ? "currentColor" : "none"}
        />
      </span>
      <span className={tone.split(" ")[0]}>{formatCount(count)}</span>
    </button>
  );
}

function IconOnlyButton({
  Icon,
  label,
  active,
  activeClass = "",
  fillWhenActive,
  onClick,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; fill?: string }>;
  label: string;
  active?: boolean;
  activeClass?: string;
  fillWhenActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`p-2 rounded-full transition-colors hover:text-burgundy hover:bg-burgundy/10 ${
        active ? activeClass : ""
      }`}
    >
      <Icon
        className="w-[18px] h-[18px]"
        strokeWidth={1.8}
        fill={fillWhenActive && active ? "currentColor" : "none"}
      />
    </button>
  );
}
