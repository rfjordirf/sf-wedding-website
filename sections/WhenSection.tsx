"use client";

import { DotDiamond, FloralDivider } from "@/components/Ornaments";
import { RevealStagger } from "@/components/RevealStagger";
import { Container } from "@/components/ui/Container";
import { useT } from "@/lib/i18n";

export function WhenSection() {
  const t = useT();

  return (
    <section
      id="when"
      className="scroll-mt-24 flex min-h-[100dvh] flex-col justify-center bg-[var(--color-cream)] px-5 py-16 sm:px-8 sm:py-20"
      aria-labelledby="when-heading"
    >
      <Container>
        <h2 id="when-heading" className="sr-only">
          {t.whenWhere.when}
        </h2>
        <RevealStagger stagger={0.07}>
          <div data-reveal className="flex justify-center">
            <DotDiamond
              size="lg"
              className="text-[var(--color-ink)]"
            />
          </div>
          <p
            data-reveal
            className="mt-6 text-center font-ui text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[var(--color-muted)]"
          >
            {t.whenWhere.when}
          </p>
          <p
            data-reveal
            className="mt-6 text-center font-display text-[clamp(1.35rem,4vw,1.75rem)] font-semibold uppercase leading-snug tracking-[0.12em] text-[var(--color-ink)]"
          >
            {t.whenWhere.saturday}
          </p>
          <p
            data-reveal
            className="mt-3 text-center font-display text-[clamp(1.75rem,5vw,2.25rem)] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink)]"
          >
            {t.whenWhere.weddingDatePrimary}
          </p>
          <p
            data-reveal
            className="mt-2 text-center font-display text-[clamp(1.35rem,4vw,1.75rem)] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink)]"
          >
            {t.whenWhere.weddingDateYear}
          </p>
          <p
            data-reveal
            className="mt-10 text-center font-body text-[0.8125rem] font-light leading-[1.85] text-[var(--color-ink)] sm:text-[0.875rem]"
          >
            {t.whenWhere.timeDetail}
          </p>
          <p
            data-reveal
            className="mt-2 text-center font-display text-[clamp(0.95rem,2.8vw,1.1rem)] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]"
          >
            {t.whenWhere.cityLine}
          </p>
          <FloralDivider className="py-8 text-[var(--color-ink)]/90" size="md" />
          <p
            data-reveal
            className="mx-auto max-w-[22rem] text-center font-body text-[0.8125rem] font-light leading-[1.9] text-[var(--color-ink)]/90 sm:text-[0.875rem]"
          >
            {t.whenWhere.whenBlurb}
          </p>
        </RevealStagger>
      </Container>
    </section>
  );
}
