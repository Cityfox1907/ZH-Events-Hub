import Link from "next/link";
import { Cake, Globe2, UserRound, ShieldCheck } from "lucide-react";
import type { HubCommunity } from "@/lib/hub";
import { HUB_COMMUNITIES, HUB_POSTS, formatMembers } from "@/lib/hub";
import { JoinButton } from "./JoinButton";

/** Rechte Hub-Spalte für die Startseite: Über-Karte + Top-Communities. */
export function HubRightRail() {
  const top = [...HUB_COMMUNITIES]
    .sort((a, b) => b.members - a.members)
    .slice(0, 5);
  const totalMembers = HUB_COMMUNITIES.reduce((acc, c) => acc + c.members, 0);
  const totalOnline = HUB_COMMUNITIES.reduce((acc, c) => acc + c.online, 0);

  return (
    <div className="space-y-4">
      <div className="bg-card border border-line rounded-xl overflow-hidden">
        <div className="h-14 bg-gradient-to-r from-burgundy to-brass" />
        <div className="px-4 pb-4">
          <h2 className="font-body font-bold text-[15px] -mt-3">
            <span className="inline-grid place-items-center w-10 h-10 rounded-full bg-card border-2 border-card text-[20px] mr-2 align-middle shadow-sm">
              🦁
            </span>
            Zürich Hub
          </h2>
          <p className="text-[12.5px] text-ink-muted leading-snug mt-2">
            Der Community-Bereich von ZurichTonight: Quartiere, Themen und
            Leidenschaften — gegründet und moderiert von Zürcherinnen und
            Zürchern.
          </p>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <Stat value={formatMembers(totalMembers)} label="Mitglieder" />
            <Stat value={formatMembers(totalOnline)} label="Online" />
            <Stat value={String(HUB_COMMUNITIES.length)} label="Communities" />
          </div>
          <div className="mt-3 space-y-2">
            <button className="w-full px-4 py-2 rounded-full bg-burgundy text-white text-[13px] font-bold hover:bg-burgundy-dark transition-colors">
              Beitrag erstellen
            </button>
            <Link
              href="/communities"
              className="block w-full px-4 py-2 rounded-full border border-line text-center text-[13px] font-bold text-ink-muted hover:border-burgundy hover:text-burgundy transition-colors"
            >
              Community gründen
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-card border border-line rounded-xl p-4">
        <p className="eyebrow mb-3">Top-Communities</p>
        <ol className="space-y-1">
          {top.map((c, i) => (
            <li key={c.slug}>
              <Link
                href={`/hub/${c.slug}`}
                className="flex items-center gap-2.5 py-1.5 rounded-lg hover:bg-paper-dim/60 transition-colors px-1.5 -mx-1.5"
              >
                <span className="text-[12px] font-bold text-ink-faint w-3 shrink-0">
                  {i + 1}
                </span>
                <span
                  className="w-7 h-7 rounded-full grid place-items-center text-[14px] shrink-0"
                  style={{ backgroundColor: `${c.color}22` }}
                >
                  {c.emoji}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[13px] font-medium truncate">
                    {c.name}
                  </span>
                  <span className="block text-[11px] text-ink-faint">
                    {formatMembers(c.members)} Mitglieder
                  </span>
                </span>
                <JoinButton slug={c.slug} size="sm" />
              </Link>
            </li>
          ))}
        </ol>
        <Link
          href="/communities"
          className="block mt-2 text-[12.5px] font-bold text-burgundy hover:underline"
        >
          Alle Communities anzeigen
        </Link>
      </div>
    </div>
  );
}

/** Rechte Spalte für eine Community-Seite: Über-Karte + Regeln. */
export function CommunityAboutRail({ community }: { community: HubCommunity }) {
  const postCount = HUB_POSTS.filter(
    (p) => p.community === community.slug,
  ).length;

  return (
    <div className="space-y-4">
      <div className="bg-card border border-line rounded-xl p-4">
        <p className="eyebrow mb-2">Über die Community</p>
        <p className="text-[13px] text-ink-muted leading-snug">
          {community.description}
        </p>
        <div className="grid grid-cols-3 gap-2 mt-3 text-center">
          <Stat value={formatMembers(community.members)} label="Mitglieder" />
          <Stat value={formatMembers(community.online)} label="Online" />
          <Stat value={String(postCount)} label="Beiträge" />
        </div>
        <div className="mt-3 space-y-1.5 text-[12.5px] text-ink-muted">
          <p className="flex items-center gap-2">
            <Cake className="w-4 h-4 text-ink-faint" strokeWidth={1.8} />
            Gegründet im {community.founded}
          </p>
          <p className="flex items-center gap-2">
            <UserRound className="w-4 h-4 text-ink-faint" strokeWidth={1.8} />
            Gegründet von {community.founder}
          </p>
          <p className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-ink-faint" strokeWidth={1.8} />
            Öffentlich · {community.category}
          </p>
        </div>
        <button className="mt-3 w-full px-4 py-2 rounded-full bg-burgundy text-white text-[13px] font-bold hover:bg-burgundy-dark transition-colors">
          Beitrag erstellen
        </button>
      </div>

      <div className="bg-card border border-line rounded-xl p-4">
        <p className="eyebrow mb-3 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
          Regeln von {community.name}
        </p>
        <ol className="space-y-2">
          {community.rules.map((rule, i) => (
            <li key={i} className="flex gap-2.5 text-[12.5px] leading-snug">
              <span className="font-bold text-ink-faint shrink-0">{i + 1}.</span>
              <span className="text-ink-muted">{rule}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-paper-dim/60 rounded-lg py-2">
      <p className="text-[14px] font-bold tabular-nums">{value}</p>
      <p className="text-[10.5px] text-ink-faint">{label}</p>
    </div>
  );
}
