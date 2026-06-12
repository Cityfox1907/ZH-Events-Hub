import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  HUB_COMMUNITIES,
  getCommunity,
  postsForCommunity,
  formatMembers,
} from "@/lib/hub";
import { HubFeed } from "@/components/hub/HubFeed";
import { HubLeftSidebar } from "@/components/hub/HubLeftSidebar";
import { CommunityAboutRail } from "@/components/hub/HubRightRail";
import { JoinButton } from "@/components/hub/JoinButton";

export function generateStaticParams() {
  return HUB_COMMUNITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) return { title: "Community · ZurichTonight" };
  return {
    title: `${community.name} · Zürich Hub`,
    description: community.tagline,
  };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) notFound();

  const posts = postsForCommunity(slug);

  return (
    <div>
      {/* Banner */}
      <div
        className="h-24 md:h-32"
        style={{
          background: `linear-gradient(120deg, ${community.color}, ${community.color}99)`,
        }}
      />

      {/* Community-Kopf */}
      <div className="bg-card border-b border-line">
        <div className="container-editorial">
          <div className="flex items-end gap-4 -mt-5 pb-4">
            <span
              className="w-16 h-16 md:w-20 md:h-20 rounded-full grid place-items-center text-[30px] md:text-[36px] border-4 border-card shadow-sm shrink-0"
              style={{ backgroundColor: `${community.color}26` }}
            >
              {community.emoji}
            </span>
            <div className="flex-1 min-w-0 pb-0.5">
              <h1 className="font-body font-bold text-[22px] md:text-[26px] leading-tight truncate">
                {community.name}
              </h1>
              <p className="text-[12.5px] text-ink-faint">
                {formatMembers(community.members)} Mitglieder ·{" "}
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 align-middle mr-1" />
                {formatMembers(community.online)} online
              </p>
            </div>
            <div className="pb-1 shrink-0">
              <JoinButton slug={community.slug} />
            </div>
          </div>
          <p className="text-[13.5px] text-ink-muted pb-4 max-w-2xl -mt-1">
            {community.tagline}
          </p>
        </div>
      </div>

      {/* Inhalt */}
      <div className="container-editorial py-5">
        <div className="flex gap-5 items-start">
          <aside className="hidden lg:block w-[250px] shrink-0 sticky top-20">
            <HubLeftSidebar />
          </aside>

          <section className="flex-1 min-w-0 max-w-[720px] mx-auto">
            <HubFeed posts={posts} showCommunity={false} />
          </section>

          <aside className="hidden xl:block w-[310px] shrink-0 sticky top-20">
            <CommunityAboutRail community={community} />
          </aside>
        </div>
      </div>
    </div>
  );
}
