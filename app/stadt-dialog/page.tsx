import Link from "next/link";
import {
  ShieldCheck,
  Vote,
  ScrollText,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ArrowRight,
  BarChart3,
} from "lucide-react";

export const metadata = {
  title: "Stadt-Dialog · ZurichTonight",
  description: "Bürger-Initiativen, Fragen, Diskussionen — die Stadt im Dialog.",
};

const INITIATIVES = [
  { title: "[Initiative 1 — Phase 2]", supporters: "1'247", days: 8 },
  { title: "[Initiative 2 — Phase 2]", supporters: "842", days: 14 },
  { title: "[Initiative 3 — Phase 2]", supporters: "503", days: 21 },
];

const POLL_OPTIONS = [
  { label: "[Option A]", pct: 42 },
  { label: "[Option B]", pct: 31 },
  { label: "[Option C]", pct: 27 },
];

const INDEX_BLOCKS = [
  { label: "Wirtschaft", value: "+2.4%", trend: "up" },
  { label: "Mobilität", value: "Stabil", trend: "flat" },
  { label: "Lebensqualität", value: "8.6/10", trend: "up" },
];

const PAST_VOTES = [
  { title: "[Vergangene Abstimmung 1]", result: "Angenommen", year: "2026" },
  { title: "[Vergangene Abstimmung 2]", result: "Abgelehnt", year: "2026" },
  { title: "[Vergangene Abstimmung 3]", result: "Angenommen", year: "2025" },
];

export default function StadtDialogPage() {
  return (
    <div className="bg-[#1c1f24] text-paper min-h-screen">
      {/* HERO ─────────────────────────────────────────────── */}
      <section className="border-b border-white/10">
        <div className="container-editorial pt-16 pb-12">
          <div className="flex items-center gap-2 text-paper-dim">
            <ShieldCheck className="w-4 h-4" strokeWidth={1.8} />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium">
              Verifizierte Stadt-Quellen
            </span>
          </div>
          <h1
            className="font-display text-5xl md:text-7xl mt-4 leading-[0.95] tracking-tight max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Der Stadt-Dialog.
          </h1>
          <p className="text-paper-dim text-[16px] md:text-[18px] mt-5 max-w-2xl leading-relaxed">
            Bürger-Initiativen, Stadt-Fragen, Diskussionen aus den Quartieren —
            zentral, transparent, demokratisch.
          </p>
        </div>
      </section>

      {/* AKTUELLE INITIATIVEN ─────────────────────────────── */}
      <section className="border-b border-white/10">
        <div className="container-editorial py-14">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-paper-dim">
                Aktuell
              </p>
              <h2
                className="font-display text-3xl md:text-4xl mt-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Bürger-Initiativen
              </h2>
            </div>
            <Link
              href="#"
              className="text-[12.5px] text-paper hover:underline font-medium"
            >
              Alle ansehen →
            </Link>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {INITIATIVES.map((i, idx) => (
              <li
                key={idx}
                className="py-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 md:items-center"
              >
                <div>
                  <h3
                    className="font-display text-xl md:text-2xl leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {i.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-[12px] text-paper-dim">
                    <span className="inline-flex items-center gap-1.5">
                      <ScrollText className="w-3 h-3" strokeWidth={1.8} />
                      Initiative
                    </span>
                    <span>·</span>
                    <span>noch {i.days} Tage</span>
                  </div>
                </div>
                <div className="text-[13px] text-paper-dim md:text-right">
                  <strong className="text-paper tabular-nums">
                    {i.supporters}
                  </strong>{" "}
                  Unterstützer
                </div>
                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-paper text-[12.5px] font-medium hover:bg-white/10 transition-colors justify-self-start md:justify-self-auto">
                  Unterstützen <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FRAGE DES TAGES ─────────────────────────────────── */}
      <section className="border-b border-white/10">
        <div className="container-editorial py-14 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-paper-dim">
              Frage des Tages
            </p>
            <h2
              className="font-display text-3xl md:text-4xl mt-2 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              [Frage folgt in Phase 2]
            </h2>
            <p className="text-paper-dim mt-3 text-[14px] max-w-md leading-relaxed">
              Jeden Tag eine neue Frage an alle Zürcherinnen und Zürcher.
              Klick zum Abstimmen.
            </p>
          </div>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <div className="space-y-4">
              {POLL_OPTIONS.map((o, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between text-[13px]">
                    <span className="font-medium">{o.label}</span>
                    <span className="text-paper-dim tabular-nums">
                      {o.pct}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-paper/80"
                      style={{ width: `${o.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-paper-dim mt-5">
              4'238 Stimmen heute · Klick zum Abstimmen
            </p>
          </div>
        </div>
      </section>

      {/* STADT-INDEX ─────────────────────────────────────── */}
      <section className="border-b border-white/10">
        <div className="container-editorial py-14">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-paper-dim">
                Stadt-Index
              </p>
              <h2
                className="font-display text-3xl md:text-4xl mt-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Zürich in Zahlen
              </h2>
            </div>
            <span className="text-[12px] text-paper-dim inline-flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" strokeWidth={1.8} />
              Mock-Charts
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {INDEX_BLOCKS.map((b) => (
              <div
                key={b.label}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-6"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-paper-dim">
                  {b.label}
                </p>
                <p
                  className="font-display text-4xl mt-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {b.value}
                </p>
                <div className="mt-4 h-12 flex items-end gap-1">
                  {[12, 18, 14, 22, 19, 26, 30].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-paper/30 rounded-sm"
                      style={{ height: `${h * 2.5}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERGANGENE ABSTIMMUNGEN ─────────────────────────── */}
      <section className="border-b border-white/10">
        <div className="container-editorial py-14">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-paper-dim">
                Archiv
              </p>
              <h2
                className="font-display text-3xl md:text-4xl mt-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Vergangene Abstimmungen
              </h2>
            </div>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {PAST_VOTES.map((v, i) => {
              const Icon = v.result === "Angenommen" ? CheckCircle2 : XCircle;
              return (
                <li
                  key={i}
                  className="py-5 grid grid-cols-[auto_1fr_auto] gap-4 items-center"
                >
                  <Icon
                    className={`w-5 h-5 ${
                      v.result === "Angenommen"
                        ? "text-emerald-300"
                        : "text-rose-300"
                    }`}
                    strokeWidth={1.6}
                  />
                  <div>
                    <h3
                      className="font-display text-lg leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {v.title}
                    </h3>
                    <p className="text-[11.5px] text-paper-dim mt-1">
                      {v.year} · {v.result}
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="text-[12px] text-paper-dim hover:text-paper transition-colors"
                  >
                    Details →
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA ─────────────────────────────────────────────── */}
      <section>
        <div className="container-editorial py-14 text-center max-w-2xl mx-auto">
          <Vote className="w-8 h-8 mx-auto text-paper-dim" strokeWidth={1.6} />
          <h2
            className="font-display text-3xl md:text-4xl mt-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Zürich ist, was wir daraus machen.
          </h2>
          <p className="text-paper-dim mt-3 text-[14px]">
            Konto erstellen, mitreden, abstimmen.
          </p>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-paper text-ink text-[13px] font-medium hover:bg-paper-dim transition-colors"
          >
            Konto erstellen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
