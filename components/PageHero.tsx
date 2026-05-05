interface Props {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, lede, children }: Props) {
  return (
    <section className="container-editorial pt-12 md:pt-20 pb-10 md:pb-14">
      <div className="max-w-3xl">
        <div className="eyebrow mb-5">{eyebrow}</div>
        <h1 className="font-display text-[44px] leading-[1.02] md:text-[72px] md:leading-[1.0] tracking-[-0.02em] text-ink">
          {title}
        </h1>
        {lede ? (
          <p className="mt-6 text-[16px] md:text-[18px] leading-relaxed text-ink-muted max-w-2xl">{lede}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
