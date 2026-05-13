"use client";

import Link from "next/link";
import { MessageCircle, HandHelping, ArrowRight } from "lucide-react";
import {
  quartierPostsByDistrict,
  helpersByDistrict,
} from "@/lib/phase3-data";

interface Props {
  district: string;
}

export function PlaceCrossModule({ district }: Props) {
  const posts = quartierPostsByDistrict(district);
  const helpers = helpersByDistrict(district);
  if (posts.length === 0 && helpers.length === 0) return null;

  return (
    <div className="bg-card border border-line rounded-2xl p-5 card-shadow">
      <p className="eyebrow mb-3">Aus diesem Quartier</p>
      <ul className="space-y-2">
        {posts.length > 0 && (
          <li>
            <Link
              href="/puls/quartier"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl border bg-amber-50 border-amber-200 text-amber-900 hover:opacity-90"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span className="text-[13px] flex-1">
                <strong className="tabular-nums">{posts.length}</strong> Posts diese Woche
                aus {district}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </li>
        )}
        {helpers.length > 0 && (
          <li>
            <Link
              href="/markt/nachbarschaft"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-900 hover:opacity-90"
            >
              <HandHelping className="w-4 h-4 shrink-0" />
              <span className="text-[13px] flex-1">
                <strong className="tabular-nums">{helpers.length}</strong> Helfer-Anfragen
                in der Nähe
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
