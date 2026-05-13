"use client";

import Link from "next/link";
import { ArrowUpRight, Eye, MessageCircle, Sparkles } from "lucide-react";
import { PROVIDER_INQUIRIES } from "@/lib/data";
import { useToast } from "@/components/Toast";

const STATUS_COLOR: Record<string, string> = {
  Neu: "bg-burgundy text-paper",
  Beantwortet: "bg-paper-dim text-ink-muted",
  Konvertiert: "bg-brass/15 text-brass",
};

export default function ProviderDashboardPage() {
  const { push } = useToast();
  return (
    <section className="container-editorial pt-10 pb-20">
      <p className="eyebrow">Anbieter-Dashboard · Demo</p>
      <div className="flex flex-wrap items-end justify-between gap-3 mt-2">
        <h1 className="font-display text-4xl md:text-5xl leading-tight">
          Hi, Pottery-Atelier Kreis 5.
        </h1>
        <Link
          href="/for-providers"
          className="text-[13px] text-ink-muted hover:text-burgundy"
        >
          Anbieter-Info →
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <KPI
          label="Anfragen diesen Monat"
          value="87"
          delta="+12 vs. letzter Monat"
          Icon={MessageCircle}
        />
        <KPI label="Profil-Aufrufe" value="4'320" delta="+38% MoM" Icon={Eye} />
        <KPI label="Conversion" value="18%" delta="Branchenschnitt 11%" Icon={Sparkles} />
      </div>

      <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-6">
        <div>
          <h2 className="font-display text-2xl mb-4">Inquiries</h2>
          <div className="bg-card border border-line rounded-2xl overflow-hidden">
            <ul className="divide-y divide-line">
              {PROVIDER_INQUIRIES.map((i) => (
                <li
                  key={i.id}
                  className="px-5 py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 hover:bg-paper-dim transition-colors"
                >
                  <span
                    className={`inline-block w-fit px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${STATUS_COLOR[i.status]}`}
                  >
                    {i.status}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[14px]">{i.customer}</p>
                    <p className="text-[13px] text-ink-muted truncate mt-0.5">
                      {i.message}
                    </p>
                  </div>
                  <span className="text-[12px] text-ink-faint shrink-0">
                    {i.receivedAt}
                  </span>
                  <button
                    onClick={() => push(`Antwort an ${i.customer} gesendet (Demo)`, "success")}
                    className="px-3 py-1.5 rounded-full border border-line text-[12px] hover:border-burgundy hover:text-burgundy"
                  >
                    Antworten
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-card border border-line rounded-2xl p-5 card-shadow">
            <p className="eyebrow">Profil</p>
            <h3 className="font-display text-xl mt-1">Pottery für Anfänger</h3>
            <p className="text-[13px] text-ink-muted mt-1">Atelier Kreis 5</p>
            <button
              onClick={() => push("Profil-Editor öffnet sich (Demo)")}
              className="mt-4 w-full py-2.5 rounded-lg border border-line text-[13px] hover:border-burgundy"
            >
              Profil bearbeiten
            </button>
          </div>

          <div
            className="rounded-2xl p-6 text-paper"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #0a1733 0%, #093a82 55%, #5b7db0 100%)",
            }}
          >
            <p className="eyebrow text-paper-dim">Spotlight-Stufe</p>
            <h3 className="font-display text-2xl mt-1 leading-tight">
              5× mehr Sichtbarkeit
            </h3>
            <p className="text-[13px] text-paper-dim mt-2">
              Featured-Position in deinem Quartier. Newsletter-Plätze.
            </p>
            <button
              onClick={() => push("Upgrade auf Spotlight (Demo)", "success")}
              className="mt-4 w-full py-2.5 rounded-lg bg-paper text-ink font-medium text-[13px] hover:bg-paper-dim inline-flex items-center justify-center gap-2"
            >
              Upgrade auf Spotlight <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function KPI({
  label,
  value,
  delta,
  Icon,
}: {
  label: string;
  value: string;
  delta: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="p-5 bg-card border border-line rounded-2xl card-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] uppercase tracking-wider text-ink-faint">{label}</span>
        <Icon className="w-4 h-4 text-burgundy" />
      </div>
      <p className="font-display text-4xl">{value}</p>
      <p className="text-[12px] text-ink-muted mt-1">{delta}</p>
    </div>
  );
}
