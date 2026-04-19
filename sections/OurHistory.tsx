"use client";

import { FloralDivider } from "@/components/Ornaments";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useT } from "@/lib/i18n";

export function OurHistory() {
  const t = useT();

  return (
    <Section
      id="history"
      title={t.story.title}
      eyebrow={t.story.eyebrow}
      variant="terracotta"
      fullBleed
      className="flex min-h-[100dvh] flex-col justify-center !py-16 sm:!py-24"
    >
      <Container>
        <div className="mx-auto max-w-[26rem] text-center">
          <p
            data-reveal
            className="font-body text-[0.8125rem] font-light leading-[1.95] text-[var(--color-ink)] sm:text-[0.875rem]"
          >
            {t.story.p1}
          </p>
          <p
            data-reveal
            className="mt-8 font-body text-[0.8125rem] font-light leading-[1.95] text-[var(--color-ink)] sm:text-[0.875rem]"
          >
            {t.story.p2}
          </p>
          <div data-reveal>
            <FloralDivider className="py-7 sm:py-9" size="md" />
          </div>
          <p
            data-reveal
            className="font-body text-[0.8125rem] font-light leading-[1.95] text-[var(--color-ink)] sm:text-[0.875rem]"
          >
            {t.story.p3}
          </p>
          <p
            data-reveal
            className="mt-8 font-body text-[0.8125rem] font-light leading-[1.95] text-[var(--color-ink)] sm:text-[0.875rem]"
          >
            {t.story.p4}
          </p>
          <p
            data-reveal
            className="mt-8 font-body text-[0.8125rem] font-light leading-[1.95] text-[var(--color-ink)] sm:text-[0.875rem]"
          >
            {t.story.p5}
          </p>
        </div>
      </Container>
    </Section>
  );
}
