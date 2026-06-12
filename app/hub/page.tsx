import type { Metadata } from "next";
import { HUB_POSTS } from "@/lib/hub";
import { HubFeed } from "@/components/hub/HubFeed";
import { HubLeftSidebar } from "@/components/hub/HubLeftSidebar";
import { HubRightRail } from "@/components/hub/HubRightRail";

export const metadata: Metadata = {
  title: "Hub · ZurichTonight",
  description:
    "Der Zürich Hub — Communities, Diskussionen und Fundstücke aus allen Quartieren der Stadt.",
};

export default function HubPage() {
  return (
    <div className="container-editorial py-5">
      <div className="flex gap-5 items-start">
        <aside className="hidden lg:block w-[250px] shrink-0 sticky top-20">
          <HubLeftSidebar />
        </aside>

        <section className="flex-1 min-w-0 max-w-[720px] mx-auto">
          <HubFeed posts={HUB_POSTS} showCommunity showCommunityChips />
        </section>

        <aside className="hidden xl:block w-[310px] shrink-0 sticky top-20">
          <HubRightRail />
        </aside>
      </div>
    </div>
  );
}
