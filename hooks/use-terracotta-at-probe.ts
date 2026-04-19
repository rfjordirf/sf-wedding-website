"use client";

import { useEffect, useState } from "react";
import {
  probeViewportBottomCenterTerracotta,
  probeViewportTopCenterTerracotta,
} from "@/lib/viewport-surface";

export type TerracottaProbe = "topCenter" | "bottomCenter";

/**
 * Tracks whether a fixed UI point (top or bottom center) sits over a `.terracotta-band` section.
 * Updates on scroll/resize (rAF-throttled).
 */
export function useTerracottaAtProbe(
  variant: TerracottaProbe,
  enabled: boolean,
): boolean {
  const [probeMatch, setProbeMatch] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const probe =
      variant === "topCenter"
        ? probeViewportTopCenterTerracotta
        : probeViewportBottomCenterTerracotta;

    let rafId = 0;
    const tick = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setProbeMatch(probe()));
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [variant, enabled]);

  return enabled && probeMatch;
}
