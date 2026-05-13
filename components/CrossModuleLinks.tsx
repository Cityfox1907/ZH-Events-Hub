import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CrossLink {
  label: string;
  href: string;
  count?: number;
}

interface Props {
  links: CrossLink[];
  className?: string;
}

export function CrossModuleLinks({ links, className = "" }: Props) {
  return (
    <div
      className={`mt-3 pt-3 border-t border-line/70 flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className}`}
    >
      {links.map((l) => (
        <Link
          key={l.label}
          href={l.href}
          className="inline-flex items-center gap-1 text-[11px] text-ink-muted hover:text-burgundy transition-colors group"
        >
          {l.count !== undefined && (
            <span className="font-medium tabular-nums">{l.count}</span>
          )}
          <span>{l.label}</span>
          <ArrowRight
            className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
            strokeWidth={2}
          />
        </Link>
      ))}
    </div>
  );
}
