"use client";

import { useEffect } from "react";
import { ensureGsapPlugins, ScrollTrigger } from "@/lib/gsap-client";

/** Refresh ScrollTrigger on resize / orientation (fonts, breakpoints). */
export function GsapScrollInit() {
  useEffect(() => {
    ensureGsapPlugins();
    const refresh = () => {
      ScrollTrigger.refresh();
    };
    refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => refresh();
    mq.addEventListener?.("change", onMotion);
    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
      mq.removeEventListener?.("change", onMotion);
    };
  }, []);
  return null;
}
