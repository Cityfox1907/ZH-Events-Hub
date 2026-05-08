import type { PinnwandPost } from "@/lib/pinnwand/types";
import { PostCard } from "./PostCard";

interface Props {
  posts: PinnwandPost[];
  anchorIso?: string;
}

export function FeaturedStrip({ posts, anchorIso }: Props) {
  if (posts.length === 0) return null;
  return (
    <section className="relative" aria-label="Featured Posts diese Woche">
      <div className="container-editorial flex items-baseline justify-between mb-3 md:mb-4">
        <h2 className="font-display text-[20px] md:text-[24px] tracking-[-0.01em] text-ink">
          Diese Woche aufgefallen
        </h2>
        <span className="text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          Featured
        </span>
      </div>
      <div className="container-editorial">
        <div
          className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: "thin" }}
        >
          {posts.map((post) => (
            <div key={post.id} className="snap-start">
              <PostCard post={post} variant="featured" anchorIso={anchorIso} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
