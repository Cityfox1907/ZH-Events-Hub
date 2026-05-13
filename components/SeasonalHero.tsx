"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  href: string;
  targetISO: string;
  image: string;
}

function diffDays(iso: string) {
  const target = new Date(iso).getTime();
  const now = Date.now();
  return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
}

export function SeasonalHero({ title, subtitle, href, targetISO, image }: Props) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(diffDays(targetISO));
    const t = setInterval(() => setDays(diffDays(targetISO)), 60 * 1000);
    return () => clearInterval(t);
  }, [targetISO]);

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-3xl border border-line card-shadow-hover transition-shadow"
    >
      <div className="aspect-[16/9] md:aspect-[21/9] relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-paper">
          <p className="eyebrow text-paper-dim">Bald in Zürich</p>
          <h3 className="font-display text-4xl md:text-6xl mt-2 leading-[0.95]">
            {title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-paper-dim">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" strokeWidth={1.8} />
              {days !== null ? `in ${days} Tagen` : "demnächst"}
            </span>
            <span className="hidden md:inline">·</span>
            <span>{subtitle}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-medium group-hover:gap-2.5 transition-all">
            Zum Jahres-Kalender <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
