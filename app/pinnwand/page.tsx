import { ComposeBox } from "@/components/pinnwand/ComposeBox";
import { FeaturedStrip } from "@/components/pinnwand/FeaturedStrip";
import { FilterBar } from "@/components/pinnwand/FilterBar";
import { PinnwandEmptyState } from "@/components/pinnwand/EmptyState";
import { PinnwandHeader } from "@/components/pinnwand/PinnwandHeader";
import { PostGrid } from "@/components/pinnwand/PostGrid";
import { TrendingSidebar } from "@/components/pinnwand/TrendingSidebar";
import { PINNWAND_POSTS } from "@/lib/pinnwand/posts";
import {
  applyFilters,
  latestPostAnchor,
  parseFiltersFromSearchParams,
} from "@/lib/pinnwand/filters";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PinnwandPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const filters = parseFiltersFromSearchParams(sp);
  const anchorIso = latestPostAnchor(PINNWAND_POSTS);
  const filtered = applyFilters(PINNWAND_POSTS, filters, anchorIso);

  const featuredPool = filters.quartiere.length === 0 && filters.kategorien.length === 0
    ? PINNWAND_POSTS.filter((p) => p.featured)
    : filtered.filter((p) => p.featured);

  const trending = [...PINNWAND_POSTS]
    .sort(
      (a, b) =>
        b.likes + b.comments * 2 + b.bookmarks - (a.likes + a.comments * 2 + a.bookmarks)
    )
    .slice(0, 5);

  return (
    <div>
      <PinnwandHeader />

      {featuredPool.length > 0 ? (
        <FeaturedStrip posts={featuredPool} anchorIso={anchorIso} />
      ) : null}

      <FilterBar filters={filters} resultCount={filtered.length} />

      <section className="container-editorial pb-24">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <div className="mb-6 mt-2">
              <ComposeBox />
            </div>

            {filtered.length === 0 ? (
              <PinnwandEmptyState />
            ) : (
              <PostGrid posts={filtered} anchorIso={anchorIso} />
            )}
          </div>

          <TrendingSidebar
            posts={trending}
            anchorIso={anchorIso}
            title="Trending"
            subtitle="Beliebt in der Stadt"
          />
        </div>
      </section>

      <FloatingComposeButton />
    </div>
  );
}

function FloatingComposeButton() {
  return (
    <a
      href="#"
      aria-label="Neuen Beitrag erstellen"
      className="sm:hidden fixed bottom-5 right-5 z-30 inline-flex items-center justify-center w-14 h-14 rounded-full bg-burgundy text-paper shadow-[0_8px_24px_rgba(124,31,31,0.35)]"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </a>
  );
}
