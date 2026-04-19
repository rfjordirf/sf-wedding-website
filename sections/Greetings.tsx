"use client";

import { DotDiamond, FloralDivider } from "@/components/Ornaments";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useT } from "@/lib/i18n";

export function Greetings() {
  const t = useT();

  return (
    <Section
      id="greetings"
      title={t.greetings.eyebrow}
      className="flex min-h-[100dvh] flex-col justify-center !pb-28 !pt-16 sm:!pb-32 sm:!pt-24"
    >
      <Container>
        <div className="mx-auto flex max-w-[24rem] flex-col items-center text-center">
          <div data-reveal className="flex justify-center">
            <DotDiamond size="lg" className="text-[var(--color-ink)]/80" />
          </div>
          <p
            data-reveal
            className="mt-10 font-display text-[clamp(1.35rem,4vw,1.85rem)] font-medium italic leading-snug text-[var(--color-ink)]"
          >
            {t.greetings.quote}
          </p>
          <div data-reveal>
            <FloralDivider className="py-8 sm:py-10" size="md" />
          </div>
          <p
            data-reveal
            className="font-body text-[0.8125rem] font-light leading-[1.95] text-[var(--color-ink)] sm:text-[0.875rem]"
          >
            {t.greetings.body}
          </p>
          <p
            data-reveal
            className="font-ui mt-14 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-[var(--color-muted)]"
          >
            {t.greetings.monogram}
          </p>
        </div>
      </Container>
    </Section>
  );
}
