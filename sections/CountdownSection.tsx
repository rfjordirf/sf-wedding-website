"use client";

import { DotDiamond } from "@/components/Ornaments";
import { CountdownBlock } from "@/components/CountdownBlock";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { COUPLE_NAMES } from "@/lib/constants";
import { useT } from "@/lib/i18n";

export function CountdownSection() {
  const t = useT();

  return (
    <Section
      id="countdown"
      title={t.countdown.title}
      eyebrow={t.countdown.eyebrow}
      variant="terracotta"
      fullBleed
      className="flex min-h-[100dvh] flex-col justify-center !py-16 sm:!py-24"
    >
      <Container>
        <div className="text-center">
          <p
            data-reveal
            className="font-body text-[0.8125rem] font-light leading-[1.9] text-[var(--color-ink)] sm:text-[0.875rem]"
          >
            {t.countdown.sub}
          </p>
          <p
            data-reveal
            className="mt-4 font-display text-[clamp(0.78rem,2.2vw,0.9rem)] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]"
          >
            {t.countdown.dateLine}
          </p>
          <p
            data-reveal
            className="mx-auto mt-8 max-w-[24rem] font-body text-[0.8125rem] font-light leading-[1.9] text-[var(--color-ink)]/95 sm:text-[0.875rem]"
          >
            {t.countdown.detail}
          </p>
          <div data-reveal className="mt-10 flex justify-center">
            <DotDiamond size="lg" className="text-[var(--color-ink)]/70" />
          </div>
          <div
            data-reveal
            className="mt-10 flex justify-center px-2"
          >
            <CountdownBlock />
          </div>
          <p
            data-reveal
            className="mt-12 font-display text-[clamp(0.95rem,3vw,1.15rem)] font-semibold uppercase tracking-[0.35em] text-[var(--color-ink)]/80"
          >
            {COUPLE_NAMES.monogram}
          </p>
        </div>
      </Container>
    </Section>
  );
}
