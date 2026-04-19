"use client";

import type { ReactNode } from "react";
import { RevealStagger } from "@/components/RevealStagger";

type Props = {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  variant?: "cream" | "terracotta";
  /** Span full viewport width (breaks out of centered column). */
  fullBleed?: boolean;
};

export function Section({
  id,
  title,
  eyebrow,
  children,
  className = "",
  variant = "cream",
  fullBleed = false,
}: Props) {
  const isTerra = variant === "terracotta";
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-14 sm:py-16 ${isTerra ? "terracotta-band" : ""} ${fullBleed ? "full-bleed" : ""} ${className}`}
    >
      <RevealStagger>
        <header
          className={`mb-10 px-5 text-center sm:px-8 ${isTerra ? "text-[var(--color-ink)]" : ""}`}
        >
          {eyebrow ? (
            <p
              data-reveal
              className={`font-ui text-[0.65rem] font-semibold uppercase tracking-[0.35em] ${isTerra ? "text-[var(--color-ink)]/75" : "text-[var(--color-muted)]"}`}
            >
              {eyebrow}
            </p>
          ) : null}
          <h2
            data-reveal
            className="font-display mt-4 text-[clamp(1.5rem,5vw,2rem)] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink)]"
          >
            {title}
          </h2>
          <div
            data-reveal
            className={`mx-auto mt-6 h-px w-12 ${isTerra ? "bg-[var(--color-ink)]/25" : "bg-[var(--color-ink)]/15"}`}
          />
        </header>
        {children}
      </RevealStagger>
    </section>
  );
}
