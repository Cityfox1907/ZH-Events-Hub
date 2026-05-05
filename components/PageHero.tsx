interface Props {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, lede, children }: Props) {
  return (
    <section className="container-editorial pt-8 md:pt-12 pb-8 md:pb-10">
      <div className="flex items-baseline justify-between gap-6 mb-2">
        <h1 className="font-display text-[36px] leading-[1] md:text-[56px] md:leading-[1] tracking-[-0.02em] text-ink font-light">
          {title}
        </h1>
        <div className="hidden md:block text-[10px] uppercase tracking-[0.25em] text-ink-faint shrink-0">
          {eyebrow}
        </div>
      </div>
      <div className="md:hidden text-[10px] uppercase tracking-[0.25em] text-ink-faint mb-3">
        {eyebrow}
      </div>
      {lede ? (
        <p className="mt-2 text-[16px] leading-relaxed text-ink-muted max-w-xl">{lede}</p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
