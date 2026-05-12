"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
} from "lucide-react";
import type { PulsPost } from "@/lib/types";
import {
  getPulsVotes,
  setPulsVote,
  getPulsBookmarks,
  togglePulsBookmark,
  onStorageChange,
} from "@/lib/storage";
import { useToast } from "./Toast";
import { VerificationBadge } from "./VerificationBadge";
import { PULS_POST_TYPES } from "@/lib/data";
import { ShareModal } from "./ShareModal";

const TYPE_MAP: Record<string, { label: string; icon: string }> = Object.fromEntries(
  PULS_POST_TYPES.map((t) => [t.key, { label: t.label, icon: t.icon }])
);

export function PulsPostCard({
  post,
  onOpenComments,
}: {
  post: PulsPost;
  onOpenComments?: (p: PulsPost) => void;
}) {
  const [vote, setVote] = useState<1 | -1 | 0>(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { push } = useToast();
  const typeMeta = TYPE_MAP[post.type] ?? { label: post.type, icon: "💬" };

  useEffect(() => {
    function refresh() {
      setVote((getPulsVotes()[post.id] as 1 | -1 | 0) ?? 0);
      setBookmarked(getPulsBookmarks().includes(post.id));
    }
    refresh();
    return onStorageChange(refresh);
  }, [post.id]);

  function handleVote(v: 1 | -1) {
    const next = vote === v ? 0 : v;
    setPulsVote(post.id, next);
    setVote(next);
  }

  function handleBookmark() {
    const added = togglePulsBookmark(post.id);
    push(added ? "✓ Gespeichert (Demo)" : "Entfernt (Demo)", "success");
  }

  const displayUpvotes = post.upvotes + vote;

  return (
    <article className="bg-card border border-line rounded-2xl card-shadow hover:card-shadow-hover transition-shadow overflow-hidden">
      <div className="p-4 md:p-5">
        {/* Author row */}
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.avatar}
            alt={post.author}
            className="w-9 h-9 rounded-full bg-paper-dim shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-medium text-[13px]">@{post.author}</span>
              <VerificationBadge badge={post.badge} compact />
              <span className="text-[11px] text-ink-faint">·</span>
              <span className="text-[11px] text-ink-muted">{post.district}</span>
              <span className="text-[11px] text-ink-faint">·</span>
              <span className="text-[11px] text-ink-faint">{post.ago}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[12px] inline-flex items-center gap-1 text-ink-muted">
                <span>{typeMeta.icon}</span>
                {typeMeta.label}
              </span>
            </div>
          </div>
        </div>

        {/* Text */}
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink whitespace-pre-line">
          {post.text}
        </p>

        {/* Image (optional) */}
        {post.image && (
          <div className="mt-3 rounded-xl overflow-hidden bg-paper-dim">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt=""
              className="w-full h-56 md:h-72 object-cover"
            />
          </div>
        )}

        {/* Link */}
        {post.link && (
          <Link
            href={`/${post.link.module}/${post.link.id}`}
            className="mt-3 inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-full bg-paper-dim text-ink-muted hover:text-burgundy"
          >
            🔗 {post.link.label}
          </Link>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2 py-0.5 rounded-full bg-paper-dim text-ink-muted"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 md:px-5 py-3 border-t border-line flex items-center gap-1 text-ink-muted text-[12px]">
        <button
          onClick={() => handleVote(1)}
          className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-paper-dim transition-colors ${
            vote === 1 ? "text-burgundy" : ""
          }`}
          aria-label="Upvote"
        >
          <ArrowBigUp className={`w-4 h-4 ${vote === 1 ? "fill-burgundy" : ""}`} />
          <span className="tabular-nums font-medium">{displayUpvotes}</span>
        </button>
        <button
          onClick={() => handleVote(-1)}
          className={`p-1.5 rounded-md hover:bg-paper-dim transition-colors ${
            vote === -1 ? "text-burgundy" : ""
          }`}
          aria-label="Downvote"
        >
          <ArrowBigDown className={`w-4 h-4 ${vote === -1 ? "fill-burgundy" : ""}`} />
        </button>
        <button
          onClick={() => onOpenComments?.(post)}
          className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-paper-dim transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{post.comments_count}</span>
        </button>
        <button
          onClick={() => setShareOpen(true)}
          className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-paper-dim transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Teilen</span>
        </button>
        <button
          onClick={handleBookmark}
          className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-md hover:bg-paper-dim transition-colors ml-auto ${
            bookmarked ? "text-burgundy" : ""
          }`}
        >
          <Bookmark
            className={`w-3.5 h-3.5 ${bookmarked ? "fill-burgundy" : ""}`}
          />
        </button>
      </div>

      {shareOpen && (
        <ShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          title={post.text.slice(0, 60)}
          url={`/puls?p=${post.id}`}
        />
      )}
    </article>
  );
}
