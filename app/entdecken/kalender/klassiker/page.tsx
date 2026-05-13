"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Calendar as CalendarIcon,
  CalendarPlus,
  Share2,
  Star,
  X,
} from "lucide-react";
import {
  KLASSIKER,
  type Klassiker,
  TODAY_DATE,
} from "@/lib/eventkalender";
import { useToast } from "@/components/Toast";

const MONATE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

const CURRENT_MONTH = TODAY_DATE.getMonth() + 1;

export default function KlassikerPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const monthsWith = useMemo(
    () => Array.from(new Set(KLASSIKER.map((k) => k.monatNum))).sort((a, b) => a - b),
    [],
  );

  return (
    <>
      <IntroHero />

      <div className="relative flex">
        {/* Sticky month-nav */}
        <aside className="hidden lg:block sticky top-[150px] self-start w-44 shrink-0 ml-6 mt-12">
          <p className="eyebrow mb-3">Monate</p>
          <ol className="space-y-1.5 text-[12.5px]">
            {monthsWith.map((m) => {
              const count = KLASSIKER.filter((k) => k.monatNum === m).length;
              const active = m === CURRENT_MONTH;
              return (
                <li key={m}>
                  <a
                    href={`#monat-${m}`}
                    className={`flex items-baseline justify-between py-1 border-l-2 pl-2 transition-colors ${
                      active
                        ? "border-l-burgundy text-burgundy font-medium"
                        : "border-l-line text-ink-muted hover:text-ink hover:border-l-ink"
                    }`}
                  >
                    <span>{MONATE[m - 1]}</span>
                    <span className="text-ink-faint tabular-nums text-[11px]">{count}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </aside>

        <div className="flex-1 min-w-0">
          {KLASSIKER.map((k, i) => (
            <KlassikerSection key={k.id} k={k} index={i} onImage={setLightbox} />
          ))}
        </div>
      </div>

      <OutroSection />

      {lightbox && (
        <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// INTRO
// ─────────────────────────────────────────────────────────────

function IntroHero() {
  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-ink text-paper -mt-[110px] pt-[110px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={KLASSIKER.find((k) => k.slug === "sechselaeuten")?.bild}
        alt=""
        className="absolute inset-0 w-full h-full object-cover zb-kenburns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/85" />

      <div className="relative h-full container-editorial flex flex-col justify-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="eyebrow text-paper-dim"
        >
          Eine filmische Reise
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl md:text-[96px] mt-3 leading-[0.92] tracking-tight"
        >
          Das Zürcher Jahr.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="font-display italic text-[17px] md:text-[20px] mt-5 text-paper-dim/95 max-w-xl"
        >
          24 Geschichten, die diese Stadt prägen — vom ersten Konfetti im Januar bis zum letzten Funken Silvester.
        </motion.p>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-paper-dim flex flex-col items-center gap-2 text-[11px] uppercase tracking-wider"
      >
        Scrollen
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PER-KLASSIKER SECTION (Parallax + Slow-Reveal)
// ─────────────────────────────────────────────────────────────

function KlassikerSection({
  k,
  index,
  onImage,
}: {
  k: Klassiker;
  index: number;
  onImage: (src: string) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const { push } = useToast();

  const isFirstOfMonth =
    !KLASSIKER.slice(0, index).some((p) => p.monatNum === k.monatNum);

  return (
    <section
      ref={ref}
      id={`k-${k.slug}`}
      className="relative w-full min-h-screen overflow-hidden bg-ink text-paper"
    >
      {isFirstOfMonth && <div id={`monat-${k.monatNum}`} className="absolute -top-24" />}

      {/* Parallax bg */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 -top-[12%] -bottom-[12%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={k.bild}
          alt={k.titel}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,23,51,0.2) 0%, rgba(10,23,51,0.05) 30%, rgba(10,23,51,0.4) 70%, rgba(10,23,51,0.92) 100%)",
        }}
      />

      <motion.div style={{ y: titleY }} className="relative container-editorial pt-32 pb-20 min-h-screen flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-paper-dim mb-3">
            {k.datumLabel}{k.big ? " · DER GROSSE ANLASS" : ""}
          </p>
          <h2 className={`font-display ${k.big ? "text-6xl md:text-[96px]" : "text-5xl md:text-7xl"} leading-[0.92] tracking-tight max-w-3xl`}>
            {k.titel}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="font-display italic text-[17px] md:text-[20px] mt-6 text-paper-dim max-w-2xl leading-relaxed"
          >
            {k.reveal}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-6 inline-block self-start border-l-2 border-burgundy pl-4 max-w-xl text-[14.5px] text-paper"
          >
            {k.geste}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-8 grid grid-cols-3 sm:grid-cols-4 gap-2 max-w-xl"
        >
          {k.galerie.map((src, i) => (
            <button
              key={i}
              onClick={() => onImage(src)}
              className="relative aspect-square rounded-lg overflow-hidden bg-paper-dim/20 hover:opacity-90 transition-opacity group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl"
        >
          {k.quotes.map((q, i) => (
            <div
              key={i}
              className="rounded-xl bg-paper/8 backdrop-blur border border-paper/15 p-3"
            >
              <p className="font-display italic text-[13px] leading-relaxed text-paper">
                „{q.text}"
              </p>
              <p className="text-[10.5px] text-paper-dim mt-2">
                — {q.author}, {q.district}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => push(`${k.titel} in deinem Zürch-Jahr (Demo)`, "success")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-paper text-ink text-[13px] font-medium hover:bg-paper-dim transition-colors"
          >
            <CalendarPlus className="w-4 h-4" />
            In meinen Kalender
          </button>
          {k.linkedEventSlug && (
            <Link
              href={`/entdecken/event/${k.linkedEventSlug}`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-paper/10 backdrop-blur border border-paper/25 text-paper text-[13px] font-medium hover:bg-paper/20 transition-colors"
            >
              Event-Detail <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <button
            onClick={() => push(`${k.titel} geteilt (Demo)`, "success")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-paper/10 backdrop-blur border border-paper/25 text-paper text-[13px] font-medium hover:bg-paper/20 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Teilen
          </button>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// OUTRO
// ─────────────────────────────────────────────────────────────

function OutroSection() {
  const [count, setCount] = useState(0);
  const { push } = useToast();

  return (
    <section className="container-editorial py-20">
      <div className="rounded-3xl bg-paper-dim border border-line p-8 md:p-12">
        <p className="eyebrow">Outro</p>
        <h2 className="font-display text-3xl md:text-5xl mt-2 leading-tight">
          Du hast <span className="text-burgundy tabular-nums">{count}</span> von {KLASSIKER.length} in deinem Kalender.
        </h2>
        <p className="text-[14px] text-ink-muted mt-3 max-w-xl">
          Speichere alle 24 Klassiker auf einmal in dein persönliches Zürch-Jahr — wir erinnern dich rechtzeitig.
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => {
              setCount(KLASSIKER.length);
              push(`Alle ${KLASSIKER.length} Klassiker in deinem Zürch-Jahr (Demo)`, "success");
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink text-paper text-[13px] font-medium hover:bg-burgundy transition-colors"
          >
            <Star className="w-4 h-4" />
            Alle Klassiker speichern
          </button>
          <button
            onClick={() => push("Newsletter abonniert (Demo)", "success")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-line bg-card text-ink text-[13px] font-medium hover:border-burgundy transition-colors"
          >
            <CalendarIcon className="w-4 h-4" />
            Newsletter: Klassiker-Updates
          </button>
        </div>
      </div>
    </section>
  );
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full bg-paper/15 backdrop-blur border border-paper/30 text-paper"
        aria-label="Schliessen"
      >
        <X className="w-5 h-5" />
      </button>
      <motion.img
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        src={src}
        alt=""
        className="max-w-[92vw] max-h-[88vh] rounded-2xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}
