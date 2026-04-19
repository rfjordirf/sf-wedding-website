"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { DotDiamond } from "@/components/Ornaments";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { COUPLE_NAMES } from "@/lib/constants";
import { GSAP, prefersReducedMotion } from "@/lib/gsap-config";
import { ensureGsapPlugins, gsap } from "@/lib/gsap-client";
import { useLocale, useT } from "@/lib/i18n";

type Props = {
  onComplete: () => void;
};

export function SplashScreen({ onComplete }: Props) {
  const t = useT();
  const { locale } = useLocale();
  const [leaving, setLeaving] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const overlay = overlayRef.current;
    const inner = innerRef.current;
    const lang = langRef.current;
    if (!overlay || !inner) return;
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const lines = inner.querySelectorAll(".splash-anim");
      gsap.set(overlay, { opacity: 0 });
      if (lang) gsap.set(lang, { opacity: 0, y: -10 });
      gsap.set(lines, { opacity: 0, y: GSAP.ySmall });

      const tl = gsap.timeline({ defaults: { ease: GSAP.ease.entrance } });
      tl.to(overlay, { opacity: 1, duration: GSAP.duration.xs });
      if (lang)
        tl.to(lang, { opacity: 1, y: 0, duration: GSAP.duration.sm }, "-=0.12");
      tl.to(
        lines,
        {
          opacity: 1,
          y: 0,
          duration: GSAP.duration.md,
          stagger: GSAP.stagger.tight,
        },
        "-=0.18",
      );
    }, overlay);

    return () => ctx.revert();
  }, [locale]);

  const finish = useCallback(() => {
    if (leaving) return;
    if (prefersReducedMotion()) {
      onComplete();
      return;
    }
    setLeaving(true);
  }, [leaving, onComplete]);

  useLayoutEffect(() => {
    if (!leaving) return;
    if (prefersReducedMotion()) return;

    const overlay = overlayRef.current;
    if (!overlay) return;
    ensureGsapPlugins();

    let completed = false;
    const safeComplete = () => {
      if (completed) return;
      completed = true;
      onComplete();
    };

    const ctx = gsap.context(() => {
      const inner = innerRef.current;
      const lines = inner?.querySelectorAll(".splash-anim") ?? [];
      const lang = langRef.current;
      const terra = overlay.querySelector(".splash-overlay__terra");

      const tl = gsap.timeline({ onComplete: safeComplete });
      if (lang) {
        tl.to(
          lang,
          { opacity: 0, y: -8, duration: 0.28, ease: GSAP.ease.exit },
          0,
        );
      }
      tl.to(
        lines,
        {
          opacity: 0,
          y: -14,
          duration: 0.4,
          stagger: 0.03,
          ease: GSAP.ease.exit,
        },
        0.02,
      );
      if (terra) {
        tl.to(
          terra,
          { scaleY: 0, duration: 0.36, ease: GSAP.ease.exit },
          0.05,
        );
      }
      tl.to(
        overlay,
        { opacity: 0, duration: 0.64, ease: GSAP.ease.exitSmooth },
        0.1,
      );
    }, overlay);

    return () => ctx.revert();
  }, [leaving, onComplete]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className={`splash-overlay ${leaving ? "is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="splash-title"
    >
      <div
        ref={langRef}
        className="absolute right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-10"
      >
        <LanguageSwitcher />
      </div>

      <div className="splash-overlay__inner" ref={innerRef}>
        <div className="splash-anim flex justify-center">
          <DotDiamond size="md" className="text-[var(--color-ink)]" />
        </div>
        <p className="splash-anim font-ui mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">
          {t.splash.line}
        </p>
        <p
          id="splash-title"
          className="splash-anim font-display mt-6 text-[clamp(1.85rem,8vw,2.8rem)] font-semibold uppercase leading-[1.08] tracking-[0.1em] text-[var(--color-ink)]"
        >
          {COUPLE_NAMES.short}
        </p>
        <p className="splash-anim font-ui mt-5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[var(--color-olive)]">
          {t.footer}
        </p>
        <div className="splash-anim mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            className="splash-overlay__btn"
            disabled={leaving}
            onClick={finish}
          >
            {t.splash.cta}
          </button>
          <p className="font-ui max-w-[16rem] text-center text-[0.58rem] leading-relaxed tracking-[0.16em] text-[var(--color-muted)]">
            {t.splash.hint}
          </p>
        </div>
      </div>

      <div className="splash-overlay__terra" aria-hidden />
    </div>
  );
}
