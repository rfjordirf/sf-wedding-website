/** Shared motion tokens — scroll entrances & hero / splash timelines */

export const GSAP = {
  ease: {
    entrance: "power2.out",
    entranceStrong: "power3.out",
    smooth: "sine.out",
    /** Exit / dismiss (splash, modals) */
    exit: "power2.in",
    exitSmooth: "power2.inOut",
  },
  duration: {
    xs: 0.4,
    sm: 0.58,
    md: 0.78,
    lg: 0.95,
  },
  stagger: {
    tight: 0.055,
    md: 0.09,
    loose: 0.13,
  },
  /** Vertical offset (px) for scroll reveals */
  y: 30,
  ySmall: 14,
  scrollTrigger: {
    /** Start when block nears viewport */
    start: "top 82%",
    /** Play on enter; reverse on leave so scrolling back can replay */
    repeat: "play reverse play reverse" as const,
  },
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
