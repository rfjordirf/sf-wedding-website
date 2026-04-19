"use client";

import { useEffect, useState } from "react";
import {
  probeViewportBottomLeftTerracotta,
  probeViewportTopCenterTerracotta,
} from "@/lib/viewport-surface";

export type TerracottaProbe = "topCenter" | "bottomLeft";

/**
 * Tracks whether a fixed UI point sits over a `.terracotta-band` section.
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
        : probeViewportBottomLeftTerracotta;

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
