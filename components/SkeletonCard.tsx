export function SkeletonCard() {
  return (
    <div className="bg-card border border-line rounded-2xl overflow-hidden card-shadow">
      <div className="aspect-[5/4] zb-shimmer-bg" />
      <div className="p-4 md:p-5 space-y-2">
        <div className="h-2.5 w-16 zb-shimmer-bg rounded" />
        <div className="h-5 w-3/4 zb-shimmer-bg rounded" />
        <div className="h-3 w-1/2 zb-shimmer-bg rounded" />
        <div className="flex gap-1.5 pt-2">
          <div className="h-5 w-12 zb-shimmer-bg rounded-full" />
          <div className="h-5 w-16 zb-shimmer-bg rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ n = 6 }: { n?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {Array.from({ length: n }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
