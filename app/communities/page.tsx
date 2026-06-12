import type { Metadata } from "next";
import { HUB_COMMUNITIES, formatMembers } from "@/lib/hub";
import { CommunityDirectory } from "@/components/hub/CommunityDirectory";

export const metadata: Metadata = {
  title: "Communities · ZurichTonight",
  description:
    "Alle Communities des Zürich Hub — gegründet von Zürcherinnen und Zürchern, von Quartier-Foren bis Nischen-Themen.",
};

export default function CommunitiesPage() {
  const totalMembers = HUB_COMMUNITIES.reduce((acc, c) => acc + c.members, 0);

  return (
    <div className="container-editorial py-8">
      <header className="max-w-2xl mb-8">
        <p className="eyebrow mb-2">Zürich Hub</p>
        <h1 className="text-[30px] md:text-[38px] leading-tight">
          Communities
        </h1>
        <p className="text-[14.5px] text-ink-muted mt-2 leading-relaxed">
          Alle Räume des Hubs auf einen Blick — {HUB_COMMUNITIES.length}{" "}
          Communities mit zusammen {formatMembers(totalMembers)} Mitgliedern,
          jede einzelne von Nutzerinnen und Nutzern gegründet und moderiert.
          Tritt bei, diskutiere mit oder gründe deine eigene.
        </p>
      </header>

      <CommunityDirectory />
    </div>
  );
}
