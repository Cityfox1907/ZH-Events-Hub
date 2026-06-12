"use client";

import Link from "next/link";
import {
  MessageSquare,
  Share,
  Bookmark,
  MoreHorizontal,
  Pin,
} from "lucide-react";
import { useState } from "react";
import type { HubPost } from "@/lib/hub";
import { getCommunity, hubTime, formatMembers } from "@/lib/hub";
import { VoteControls } from "./VoteControls";

/**
 * Beitragskarte im Forum-Stil: links die Vote-Spalte,
 * rechts Community-Zeile, Titel, Vorschau und Aktionsleiste.
 */
export function HubPostCard({
  post,
  showCommunity = true,
}: {
  post: HubPost;
  showCommunity?: boolean;
}) {
  const [saved, setSaved] = useState(false);
  const community = getCommunity(post.community);

  return (
    <article className="flex bg-card border border-line hover:border-line-strong rounded-xl overflow-hidden transition-colors">
      <VoteControls upvotes={post.upvotes} />

      <div className="flex-1 min-w-0 px-3 py-2.5">
        {/* Meta-Zeile */}
        <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 text-[12px] text-ink-faint leading-tight">
          {showCommunity && community && (
            <>
              <Link
                href={`/hub/${community.slug}`}
                className="flex items-center gap-1.5 font-bold text-ink hover:underline"
              >
                <span
                  className="w-5 h-5 rounded-full grid place-items-center text-[11px] shrink-0"
                  style={{ backgroundColor: `${community.color}22` }}
                >
                  {community.emoji}
                </span>
                {community.name}
              </Link>
              <span>·</span>
            </>
          )}
          <span>
            Gepostet von <span className="hover:underline cursor-pointer">{post.author}</span>
          </span>
          <span>·</span>
          <span className="whitespace-nowrap">{hubTime(post.minutesAgo)}</span>
          {post.pinned && (
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <Pin className="w-3 h-3" strokeWidth={2} />
              Angepinnt
            </span>
          )}
        </div>

        {/* Titel + Flair */}
        <h3 className="font-body font-bold text-[16px] leading-snug mt-1.5 text-ink">
          {post.flair && (
            <span
              className="inline-block align-middle mr-2 px-2 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: community?.color ?? "#0f4da8" }}
            >
              {post.flair}
            </span>
          )}
          {post.title}
        </h3>

        {/* Text-Vorschau */}
        {post.body && (
          <p className="text-[13.5px] text-ink-muted leading-snug mt-1 line-clamp-3">
            {post.body}
          </p>
        )}

        {/* Bild */}
        {post.image && (
          <div className="mt-2.5 rounded-lg overflow-hidden border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt=""
              className="w-full max-h-[380px] object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Aktionsleiste */}
        <div className="flex items-center gap-1 mt-2 -ml-2 text-ink-faint">
          <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-paper-dim hover:text-ink transition-colors text-[12.5px] font-bold">
            <MessageSquare className="w-4 h-4" strokeWidth={1.8} />
            {formatMembers(post.comments)} Kommentare
          </button>
          <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-paper-dim hover:text-ink transition-colors text-[12.5px] font-bold">
            <Share className="w-4 h-4" strokeWidth={1.8} />
            Teilen
          </button>
          <button
            onClick={() => setSaved((v) => !v)}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-paper-dim transition-colors text-[12.5px] font-bold ${
              saved ? "text-burgundy" : "hover:text-ink"
            }`}
          >
            <Bookmark
              className="w-4 h-4"
              strokeWidth={1.8}
              fill={saved ? "currentColor" : "none"}
            />
            {saved ? "Gespeichert" : "Speichern"}
          </button>
          <button
            className="p-1.5 rounded-md hover:bg-paper-dim hover:text-ink transition-colors"
            aria-label="Mehr"
          >
            <MoreHorizontal className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </article>
  );
}
