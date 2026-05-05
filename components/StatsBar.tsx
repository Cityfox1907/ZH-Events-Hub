interface Props {
  goingCount: number;
  eventCount: number;
}

export function StatsBar({ goingCount, eventCount }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-card border border-line card-shadow min-w-[180px]">
        <span className="relative flex w-2.5 h-2.5">
          <span className="absolute inset-0 rounded-full bg-emerald-500/50 zb-pulse" aria-hidden />
          <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </span>
        <div>
          <div className="font-display text-[26px] leading-none tabular-nums text-ink">
            {goingCount.toLocaleString("de-CH").replace(/,/g, "'")}
          </div>
          <div className="text-[11px] text-ink-muted mt-1">gehen heute hin</div>
        </div>
      </div>

      <div className="flex items-center gap-4 px-5 py-3.5 rounded-xl bg-card border border-line card-shadow min-w-[180px]">
        <span className="w-9 h-9 rounded-md bg-burgundy text-paper flex items-center justify-center text-[15px] font-medium tabular-nums">
          {eventCount}
        </span>
        <div>
          <div className="text-[14px] font-medium text-ink leading-tight">Events heute</div>
          <div className="text-[11px] text-ink-muted mt-0.5">Kuratiert für dich</div>
        </div>
      </div>
    </div>
  );
}
