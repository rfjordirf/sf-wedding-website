"use client";

import { DotDiamond } from "@/components/Ornaments";
import { VenueIllustration } from "@/components/VenueIllustration";
import { MapEmbed } from "@/components/MapEmbed";
import { RevealStagger } from "@/components/RevealStagger";
import { Container } from "@/components/ui/Container";
import { VENUE } from "@/lib/constants";
import { useT } from "@/lib/i18n";

/** Venue + illustration + map — cream background. */
export function WhereSection() {
  const t = useT();

  return (
    <section
      id="where"
      className="scroll-mt-24 flex min-h-[100dvh] flex-col justify-center bg-[var(--color-cream)] px-5 py-16 sm:px-8 sm:py-20"
      aria-labelledby="where-heading"
    >
      <Container>
        <h2 id="where-heading" className="sr-only">
          {t.whenWhere.where}
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
            {t.whenWhere.where}
          </p>
          <p
            data-reveal
            className="mt-6 text-center font-display text-[clamp(1.25rem,3.8vw,1.65rem)] font-semibold uppercase leading-snug tracking-[0.08em] text-[var(--color-ink)]"
          >
            {VENUE.name}
          </p>
          <p
            data-reveal
            className="font-body mx-auto mt-5 max-w-[18rem] text-center text-[0.8125rem] font-light leading-[1.85] text-[var(--color-ink)] sm:text-[0.875rem]"
          >
            {VENUE.addressLine}
            <br />
            {VENUE.cityStateZip}
          </p>
        </RevealStagger>

        <RevealStagger stagger={0.06} start="top 90%">
          <div data-reveal className="mt-10">
            <VenueIllustration />
            <p className="mt-5 text-center font-ui text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
              {t.whenWhere.whereIllustrationCaption}
            </p>
          </div>
          <div
            data-reveal
            className="mt-12 overflow-hidden border border-[var(--color-rule)]"
          >
            <div className="aspect-[16/10] min-h-[220px] w-full sm:aspect-[21/9]">
              <MapEmbed />
            </div>
          </div>
        </RevealStagger>
      </Container>
    </section>
  );
}
