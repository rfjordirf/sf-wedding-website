"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { GSAP, prefersReducedMotion } from "@/lib/gsap-config";
import { useLocale } from "@/lib/i18n";
import { ensureGsapPlugins, gsap } from "@/lib/gsap-client";

export type RevealVariant = "fade-up" | "fade" | "rise-soft";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  variant?: RevealVariant;
  duration?: number;
  start?: string;
};

const variantY: Record<RevealVariant, number> = {
  "fade-up": GSAP.y,
  fade: 0,
  "rise-soft": GSAP.ySmall,
};

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  variant = "fade-up",
  duration = GSAP.duration.md,
  start = GSAP.scrollTrigger.start,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    ensureGsapPlugins();
    const y = variantY[variant];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: GSAP.ease.entranceStrong,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: GSAP.scrollTrigger.repeat,
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [locale, delay, variant, duration, start]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
