"use client";

import { useLayoutEffect, useRef } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { DotDiamond, FloralDivider } from "@/components/Ornaments";
import { Container } from "@/components/ui/Container";
import { COUPLE_NAMES } from "@/lib/constants";
import { GSAP, prefersReducedMotion } from "@/lib/gsap-config";
import { ensureGsapPlugins, gsap } from "@/lib/gsap-client";
import { useT } from "@/lib/i18n";

type HeroProps = {
  /** While true, entrance is frozen so it runs after splash (not under the overlay). */
  deferEntrance?: boolean;
};

export function Hero({ deferEntrance = false }: HeroProps) {
  const t = useT();
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const root = rootRef.current;
    if (!root) return;
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      if (deferEntrance) {
        gsap.set(".hero-top", { opacity: 0, y: -12 });
        gsap.set(".hero-pretag", { opacity: 0, y: 20 });
        gsap.set(".hero-title", { opacity: 0, y: 36, scale: 0.96 });
        gsap.set(".hero-sub", { opacity: 0, y: 22 });
        gsap.set(".hero-body", { opacity: 0, y: 24 });
        gsap.set(".hero-sign", { opacity: 0, y: 16 });
        gsap.set(".hero-floral", { opacity: 0, y: 22 });
        return;
      }

      const tl = gsap.timeline({
        delay: 0.07,
        defaults: { ease: GSAP.ease.entranceStrong },
      });
      tl.from(".hero-top", {
        opacity: 0,
        y: -12,
        duration: GSAP.duration.sm,
      });
      tl.from(
        ".hero-pretag",
        { opacity: 0, y: 20, duration: GSAP.duration.sm },
        "-=0.15",
      );
      tl.from(
        ".hero-title",
        {
          opacity: 0,
          y: 36,
          scale: 0.96,
          duration: GSAP.duration.lg,
        },
        "-=0.1",
      );
      tl.from(
        ".hero-sub",
        { opacity: 0, y: 22, duration: GSAP.duration.md },
        "-=0.5",
      );
      tl.from(
        ".hero-body",
        { opacity: 0, y: 24, duration: GSAP.duration.md },
        "-=0.35",
      );
      tl.from(
        ".hero-sign",
        { opacity: 0, y: 16, duration: GSAP.duration.sm },
        "-=0.3",
      );
      tl.from(
        ".hero-floral",
        { opacity: 0, y: 22, duration: GSAP.duration.md },
        "-=0.25",
      );
    }, root);

    return () => ctx.revert();
  }, [deferEntrance]);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
    >
      <Container className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="hero-top flex shrink-0 items-start justify-between gap-3 pt-[max(1.25rem,env(safe-area-inset-top))]">
            <DotDiamond
              size="md"
              className="mt-1 shrink-0 text-[var(--color-ink)]"
            />
            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
              <LanguageSwitcher />
              <a href="#rsvp" className="btn-header-rsvp">
                {t.nav.rsvp}
              </a>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center py-10 text-center sm:py-12">
            <p className="hero-pretag font-ui text-[0.65rem] font-semibold uppercase leading-relaxed tracking-[0.28em] text-[var(--color-olive)] sm:text-[0.7rem]">
              {t.hero.pretag}
            </p>
            <h1 className="hero-title font-display mt-10 text-[clamp(2rem,7.5vw,3.25rem)] font-semibold uppercase leading-[1.08] tracking-[0.14em] text-[var(--color-ink)]">
              {COUPLE_NAMES.short}
            </h1>
            <p className="hero-sub font-display mt-6 text-[clamp(1.15rem,3.5vw,1.35rem)] font-medium uppercase tracking-[0.28em] text-[var(--color-ink)]">
              {t.hero.marryLine}
            </p>
            <p className="hero-body font-body mx-auto mt-10 max-w-[28rem] text-[0.8125rem] font-light leading-[1.9] text-[var(--color-ink)] sm:text-[0.875rem]">
              {t.hero.body}
            </p>
            <p className="hero-sign font-display mt-12 text-base font-medium italic text-[var(--color-ink)] sm:text-lg">
              {t.hero.signature}
            </p>
          </div>
        </div>
      </Container>

      <div className="hero-floral shrink-0 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <FloralDivider />
      </div>
    </section>
  );
}
