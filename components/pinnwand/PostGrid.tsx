import type { PinnwandPost } from "@/lib/pinnwand/types";
import { PostCard } from "./PostCard";

interface Props {
  posts: PinnwandPost[];
  anchorIso?: string;
}

export function PostGrid({ posts, anchorIso }: Props) {
  return (
    <div className="columns-1 sm:columns-2 xl:columns-3 gap-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} anchorIso={anchorIso} />
      ))}
    </div>
  );
}
