import { TrendingUp } from "lucide-react";
import type { PinnwandPost } from "@/lib/pinnwand/types";
import { PostCard } from "./PostCard";

interface Props {
  posts: PinnwandPost[];
  anchorIso?: string;
  title?: string;
  subtitle?: string;
}

export function TrendingSidebar({
  posts,
  anchorIso,
  title = "Trending",
  subtitle = "Beliebt in der Stadt",
}: Props) {
  if (posts.length === 0) return null;
  return (
    <aside
      aria-label={title}
      className="hidden xl:block w-[320px] shrink-0"
    >
      <div className="sticky top-[88px]">
        <div className="bg-card border border-line rounded-xl p-5 card-shadow">
          <div className="flex items-center gap-2 pb-4 mb-2 border-b border-line">
            <TrendingUp className="w-4 h-4 text-burgundy" strokeWidth={1.75} />
            <div>
              <div className="font-display text-[16px] tracking-[-0.01em] text-ink">
                {title}
              </div>
              <div className="text-[11px] text-ink-faint uppercase tracking-[0.12em]">
                {subtitle}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                variant="compact"
                anchorIso={anchorIso}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 px-5 text-[11px] text-ink-faint leading-relaxed">
          Verifizierte Zürcher:innen posten hier echte Beobachtungen aus dem Quartier.
          Unkommerziell, kuratiert.
        </div>
      </div>
    </aside>
  );
}
