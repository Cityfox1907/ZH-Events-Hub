"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FEED_POSTS, FEED_ME, type FeedPost } from "@/lib/feed";
import { Composer } from "./Composer";
import { PostCard } from "./PostCard";

type Tab = "fuer-dich" | "folge-ich";

const TABS: { key: Tab; label: string }[] = [
  { key: "fuer-dich", label: "Für dich" },
  { key: "folge-ich", label: "Folge ich" },
];

export function Timeline() {
  const [tab, setTab] = useState<Tab>("fuer-dich");
  const [ownPosts, setOwnPosts] = useState<FeedPost[]>([]);

  const posts = useMemo(() => {
    const base =
      tab === "folge-ich"
        ? FEED_POSTS.filter((p) => p.following)
        : FEED_POSTS;
    return [...ownPosts, ...base];
  }, [tab, ownPosts]);

  function handlePost(text: string) {
    setOwnPosts((prev) => [
      {
        id: `own-${Date.now()}`,
        name: FEED_ME.name,
        handle: FEED_ME.handle,
        avatar: FEED_ME.avatar,
        district: "Kreis 5",
        time: "Jetzt",
        text,
        tags: [],
        stats: { replies: 0, reposts: 0, likes: 0, views: 1 },
        following: true,
      },
      ...prev,
    ]);
  }

  return (
    <div className="min-h-screen">
      {/* Sticky-Kopf: Wortmarke (mobil) + Tabs */}
      <div className="sticky top-0 z-30 bg-paper/85 backdrop-blur border-b border-line">
        <div className="md:hidden flex items-center justify-center pt-3">
          <Link href="/" className="font-display text-[20px] tracking-tight">
            ZurichTonight
          </Link>
        </div>
        <div className="grid grid-cols-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="relative py-3.5 text-[14.5px] hover:bg-paper-dim/60 transition-colors"
            >
              <span
                className={
                  tab === t.key ? "font-bold" : "text-ink-muted font-medium"
                }
              >
                {t.label}
              </span>
              {tab === t.key && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 rounded-full bg-burgundy" />
              )}
            </button>
          ))}
        </div>
      </div>

      <Composer onPost={handlePost} />

      {/* Feed */}
      <div>
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>

      <div className="px-4 py-8 text-center text-[13px] text-ink-faint border-b border-line">
        Du bist auf dem aktuellen Stand — Stadtfeste und Events findest du
        unter{" "}
        <Link href="/entdecken" className="text-burgundy hover:underline">
          Entdecken
        </Link>
        .
      </div>
    </div>
  );
}
