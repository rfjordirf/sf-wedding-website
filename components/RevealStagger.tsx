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

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Stagger between each `[data-reveal]` node (seconds). */
  stagger?: number;
  /** ScrollTrigger start override. */
  start?: string;
};

/**
 * Staggers every descendant with `data-reveal` when the container enters view.
 */
export function RevealStagger({
  children,
  className,
  style,
  stagger = GSAP.stagger.md,
  start = GSAP.scrollTrigger.start,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    ensureGsapPlugins();
    const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: GSAP.y });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: GSAP.duration.md,
        stagger,
        ease: GSAP.ease.entrance,
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: GSAP.scrollTrigger.repeat,
          invalidateOnRefresh: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [locale, stagger, start]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
