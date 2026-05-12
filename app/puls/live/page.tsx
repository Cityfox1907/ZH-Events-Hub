"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Radio,
  TrendingUp,
  MapPin,
  Eye,
  Users,
  MessageCircle,
} from "lucide-react";
import { PulsSubNav } from "@/components/PulsSubNav";
import {
  PULS_POSTS,
  PULS_ACTIVE_NOW,
  PULS_WEEK_STATS,
  LISTINGS_ALL,
} from "@/lib/data";
import { PULS_DISTRICTS } from "@/lib/data";
import { PulsPostCard } from "@/components/PulsPostCard";
import { getDistrict, onStorageChange } from "@/lib/storage";

export default function PulsLivePage() {
  const [myDistrict, setMyDistrict] = useState<string | null>(null);
  const [filterDistrict, setFilterDistrict] = useState<string>("Alle");

  useEffect(() => {
    setMyDistrict(getDistrict());
    return onStorageChange(() => setMyDistrict(getDistrict()));
  }, []);

  // Pulse: visual refresh tick every 30s
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 30000);
    return () => clearInterval(t);
  }, []);

  // "Last 60 min" → posts with "vor Xmin" or "gerade eben"
  const recent = useMemo(() => {
    return PULS_POSTS.filter((p) => /min|gerade|sec/i.test(p.ago));
  }, []);

  const filtered = filterDistrict === "Alle"
    ? recent
    : recent.filter((p) => p.district === filterDistrict);

  const trendingHour = useMemo(
    () => PULS_POSTS.slice().sort((a, b) => b.upvotes - a.upvotes).slice(0, 5),
    [],
  );

  const districtPosts =
    myDistrict !== null
      ? PULS_POSTS.filter((p) => p.district === myDistrict).slice(0, 4)
      : [];

  const trendingListings = useMemo(
    () =>
      LISTINGS_ALL.filter((l) => l.trending || (l.views_24h ?? 0) > 100).slice(0, 5),
    [],
  );

  return (
    <>
      <PulsSubNav />

      <section className="container-editorial pt-8 pb-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="eyebrow inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-burgundy zb-pulse" />
              Live · jetzt in Zürich
            </p>
            <h1 className="font-display text-3xl md:text-4xl mt-2 leading-tight">
              Was passiert{" "}
              <span className="italic text-burgundy">gerade jetzt</span>.
            </h1>
            <p className="text-ink-muted text-[14px] mt-2 max-w-xl">
              Posts der letzten 60 Minuten, trending Threads, Live-Trefferpunkte
              aus der Stadt.
            </p>
          </div>
          <div className="text-[11px] text-ink-faint">
            Auto-refresh · Tick {tick}
          </div>
        </div>
      </section>

      {/* LIVE COUNTER */}
      <section className="container-editorial pb-4">
        <div className="grid grid-cols-3 gap-3">
          <Stat
            value={PULS_ACTIVE_NOW.toLocaleString("de-CH")}
            label="Zürcher online"
            Icon={Users}
            pulse
          />
          <Stat value="247" label="Posts heute" Icon={MessageCircle} />
          <Stat
            value={PULS_WEEK_STATS.comments.toLocaleString("de-CH")}
            label="Kommentare diese Woche"
            Icon={Radio}
          />
        </div>
      </section>

      <section className="container-editorial pb-20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* LIVE FEED */}
          <div>
            <div className="flex items-baseline justify-between mb-4 gap-3 flex-wrap">
              <h2 className="font-display text-2xl">Live-Feed · letzte 60 Min</h2>
              <select
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                className="text-[12px] px-3 py-1.5 rounded-full bg-card border border-line focus:border-burgundy focus:outline-none"
              >
                {PULS_DISTRICTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="p-8 text-center bg-card border border-line rounded-2xl">
                  <p className="font-display text-xl">Ruhig gerade.</p>
                  <p className="text-[14px] text-ink-muted mt-2">
                    In diesem Stadtteil ist in den letzten 60 Min nichts gepostet
                    worden.
                  </p>
                </div>
              ) : (
                filtered.map((p) => (
                  <div key={p.id} className="relative">
                    <span className="absolute -left-1 top-5 w-2 h-2 rounded-full bg-burgundy zb-pulse" />
                    <PulsPostCard post={p} onOpenComments={() => undefined} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4">
            <div className="bg-card border border-line rounded-2xl p-5 card-shadow">
              <div className="flex items-center gap-2 mb-3 text-burgundy">
                <TrendingUp className="w-4 h-4" />
                <p className="font-medium text-[12px] uppercase tracking-wider">
                  Trending letzte Stunden
                </p>
              </div>
              <ol className="space-y-3">
                {trendingHour.map((p, i) => (
                  <li key={p.id} className="flex items-start gap-2 text-[13px]">
                    <span className="font-display text-burgundy w-4 shrink-0">
                      {i + 1}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="leading-tight line-clamp-2">{p.text}</p>
                      <p className="text-[11px] text-ink-faint mt-0.5">
                        +{p.upvotes} Up · {p.comments_count} Kommentare
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {myDistrict && districtPosts.length > 0 && (
              <div className="bg-card border border-line rounded-2xl p-5 card-shadow">
                <div className="flex items-center gap-2 mb-3 text-burgundy">
                  <MapPin className="w-4 h-4" />
                  <p className="font-medium text-[12px] uppercase tracking-wider">
                    In deinem Stadtteil — {myDistrict}
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {districtPosts.map((p) => (
                    <li key={p.id} className="text-[13px] leading-tight line-clamp-2">
                      {p.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-card border border-line rounded-2xl p-5 card-shadow">
              <div className="flex items-center gap-2 mb-3 text-burgundy">
                <Eye className="w-4 h-4" />
                <p className="font-medium text-[12px] uppercase tracking-wider">
                  Was gerade angesehen wird
                </p>
              </div>
              <ul className="space-y-2.5">
                {trendingListings.map((l) => (
                  <li key={l.id}>
                    <Link
                      href={l.href}
                      className="block py-1.5 border-b border-line last:border-b-0 hover:text-burgundy transition-colors"
                    >
                      <p className="text-[13px] leading-tight line-clamp-1">{l.title}</p>
                      <p className="text-[11px] text-ink-faint mt-0.5">
                        {l.category_label} · {l.district}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Stat({
  value,
  label,
  Icon,
  pulse,
}: {
  value: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  pulse?: boolean;
}) {
  return (
    <div className="bg-card border border-line rounded-xl p-4 card-shadow">
      <div className="flex items-center gap-2 text-burgundy mb-2">
        <Icon className="w-4 h-4" />
        {pulse && <span className="w-1.5 h-1.5 rounded-full bg-burgundy zb-pulse" />}
      </div>
      <p className="font-display text-2xl tabular-nums">{value}</p>
      <p className="text-[11px] text-ink-faint uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  );
}
