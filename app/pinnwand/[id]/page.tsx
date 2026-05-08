import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { getCategory } from "@/lib/pinnwand/categories";
import { getQuartier } from "@/lib/pinnwand/quartiere";
import {
  getCommentsForPost,
  getPostById,
  getRelatedPosts,
  PINNWAND_POSTS,
} from "@/lib/pinnwand/posts";
import { formatRelativeTime, latestPostAnchor } from "@/lib/pinnwand/filters";
import { CategoryTag } from "@/components/pinnwand/CategoryTag";
import { QuartierTag } from "@/components/pinnwand/QuartierTag";
import { PostCard } from "@/components/pinnwand/PostCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PinnwandDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) notFound();

  const cat = getCategory(post.category);
  const quartier = getQuartier(post.quartier);
  const comments = getCommentsForPost(post.id);
  const related = getRelatedPosts(post, 3);
  const anchorIso = latestPostAnchor(PINNWAND_POSTS);

  return (
    <div className="pb-24">
      <div className="container-editorial pt-6 md:pt-8">
        <Link
          href="/pinnwand"
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-ink-muted hover:text-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
          Zurück zur Pinnwand
        </Link>
      </div>

      <article className="container-editorial mt-6 md:mt-10 max-w-[760px]">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <CategoryTag id={post.category} />
          <QuartierTag id={post.quartier} />
          <span className="text-ink-faint text-[12px]">
            {formatRelativeTime(post.createdAt, anchorIso)}
          </span>
          {post.featured ? (
            <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-brass">
              ✦ Featured
            </span>
          ) : null}
        </div>

        {post.headline ? (
          <h1
            className="font-display text-[32px] md:text-[42px] leading-[1.05] tracking-[-0.02em] text-ink mb-6"
            style={{ borderLeft: `4px solid ${cat.color}`, paddingLeft: "16px" }}
          >
            {post.headline}
          </h1>
        ) : null}

        <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-line">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-11 h-11 rounded-full inline-flex items-center justify-center text-[15px] text-paper font-medium shrink-0"
              style={{ backgroundColor: post.author.avatarColor }}
              aria-hidden
            >
              {post.author.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-ink text-[14px] leading-tight">
                  {post.author.name}
                </span>
                {post.author.verified ? (
                  <BadgeCheck
                    className="w-4 h-4 text-burgundy shrink-0"
                    strokeWidth={2}
                  />
                ) : null}
              </div>
              <div className="text-[12px] text-ink-muted">
                {getQuartier(post.author.quartier).label} · ZB-Mitglied
              </div>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 h-9 rounded-full border border-line text-[12px] text-ink-muted hover:bg-paper-dim transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.75} />
            Teilen
          </button>
        </div>

        <div className="prose-pinnwand">
          <p className="text-[17px] leading-[1.7] text-ink whitespace-pre-line">
            {post.body}
          </p>
        </div>

        {post.photos && post.photos.length > 0 ? (
          <div className="mt-8 space-y-4">
            {post.photos.map((src, i) => (
              <div
                key={i}
                className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-paper-dim"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label={post.headline ?? `Bild ${i + 1}`}
              />
            ))}
          </div>
        ) : null}

        <div className="mt-10 flex items-center gap-2 pb-6 border-b border-line">
          <ActionPill ariaLabel="Liken" count={post.likes}>
            <Heart className="w-4 h-4" strokeWidth={1.75} />
          </ActionPill>
          <ActionPill ariaLabel="Kommentare" count={post.comments}>
            <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
          </ActionPill>
          <ActionPill ariaLabel="Speichern" count={post.bookmarks}>
            <Bookmark className="w-4 h-4" strokeWidth={1.75} />
          </ActionPill>
          <span className="ml-auto text-[12px] text-ink-faint">
            {comments.length} {comments.length === 1 ? "Kommentar" : "Kommentare"}
          </span>
        </div>

        {/* Comments */}
        <section className="mt-8" aria-label="Kommentare">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-display text-[22px] tracking-[-0.01em] text-ink">
              Aus dem Quartier
            </h2>
            <span className="text-[10px] uppercase tracking-[0.18em] text-ink-faint">
              {comments.length} Antworten
            </span>
          </div>

          <CommentForm />

          <ul className="mt-6 space-y-5">
            {comments.map((c) => (
              <li
                key={c.id}
                className="flex gap-3 pb-5 border-b border-line last:border-0"
              >
                <span
                  className="w-8 h-8 rounded-full bg-paper-dim text-ink inline-flex items-center justify-center text-[12px] font-medium shrink-0"
                  aria-hidden
                >
                  {c.authorName.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[13px] leading-tight">
                    <span className="font-medium text-ink">{c.authorName}</span>
                    {c.authorVerified ? (
                      <BadgeCheck
                        className="w-3.5 h-3.5 text-burgundy"
                        strokeWidth={2}
                      />
                    ) : null}
                    <span className="text-ink-faint text-[11px] ml-1">
                      · {formatRelativeTime(c.createdAt, anchorIso)}
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-[1.55] text-ink-muted mt-1">
                    {c.body}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-ink-faint">
                    <span className="inline-flex items-center gap-1">
                      <Heart className="w-3 h-3" strokeWidth={1.75} />
                      {c.likes}
                    </span>
                    <button
                      type="button"
                      className="hover:text-burgundy transition-colors"
                    >
                      Antworten
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </article>

      {related.length > 0 ? (
        <section className="container-editorial mt-16 md:mt-24">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-display text-[24px] tracking-[-0.01em] text-ink">
              Mehr aus {quartier.label}
            </h2>
            <Link
              href={`/pinnwand?quartier=${post.quartier}`}
              className="text-[12px] uppercase tracking-[0.14em] text-ink-muted hover:text-burgundy transition-colors"
            >
              Alles aus {quartier.label} →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((p) => (
              <div key={p.id}>
                <PostCard post={p} anchorIso={anchorIso} />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function generateStaticParams() {
  return PINNWAND_POSTS.map((p) => ({ id: p.id }));
}

function ActionPill({
  ariaLabel,
  count,
  children,
}: {
  ariaLabel: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full border border-line text-[13px] text-ink-muted hover:text-ink hover:bg-paper-dim transition-colors tabular-nums"
    >
      {children}
      <span>{count}</span>
    </button>
  );
}

function CommentForm() {
  return (
    <form className="bg-card border border-line rounded-xl p-4 flex items-start gap-3">
      <span
        className="w-9 h-9 rounded-full bg-burgundy text-paper inline-flex items-center justify-center font-display text-[13px] shrink-0"
        aria-hidden
      >
        D
      </span>
      <div className="flex-1 min-w-0">
        <textarea
          rows={2}
          placeholder="Etwas dazu schreiben — sachlich, konstruktiv …"
          className="w-full text-[14px] leading-relaxed text-ink placeholder:text-ink-faint bg-transparent outline-none resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] text-ink-faint">
            Du postest als verifiziertes Mitglied.
          </span>
          <button
            type="button"
            className="px-4 h-8 rounded-full bg-ink text-paper text-[12px] font-medium hover:bg-burgundy transition-colors"
          >
            Antworten
          </button>
        </div>
      </div>
    </form>
  );
}
