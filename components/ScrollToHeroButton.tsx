"use client";

import { useEffect, useState } from "react";
import { useTerracottaAtProbe } from "@/hooks/use-terracotta-at-probe";
import { prefersReducedMotion } from "@/lib/gsap-config";
import { useT } from "@/lib/i18n";

type Props = {
  /** Hidden while splash overlay is visible */
  hidden?: boolean;
};

export function ScrollToHeroButton({ hidden = false }: Props) {
  const t = useT();
  const [pastHero, setPastHero] = useState(false);
  const onTerracotta = useTerracottaAtProbe(
    "topCenter",
    !hidden && pastHero,
  );

  useEffect(() => {
    if (hidden) return;

    const hero = document.getElementById("hero");
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    io.observe(hero);
    return () => io.disconnect();
  }, [hidden]);

  if (hidden || !pastHero) return null;

  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`fixed left-1/2 top-[max(0.25rem,env(safe-area-inset-top,0px))] z-[65] flex min-h-[44px] min-w-[44px] -translate-x-1/2 items-center justify-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        onTerracotta
          ? "text-[var(--color-cream)]/95 hover:text-[var(--color-cream)] focus-visible:outline-[var(--color-cream)]"
          : "text-[var(--color-ink)]/85 hover:text-[var(--color-ink)] focus-visible:outline-[var(--color-olive)]"
      }`}
      aria-label={t.nav.backToTop}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
