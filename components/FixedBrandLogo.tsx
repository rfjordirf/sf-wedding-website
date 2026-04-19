"use client";

import { type CSSProperties } from "react";
import { useTerracottaAtProbe } from "@/hooks/use-terracotta-at-probe";
import { BRAND_LOGO_LINK_URL, BRAND_LOGO_PNG_PATH } from "@/lib/brand-assets";

const maskStyle = (src: string): CSSProperties => ({
  backgroundColor: "var(--color-ink)",
  maskImage: `url("${src}")`,
  WebkitMaskImage: `url("${src}")`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
});

type Props = {
  /** While the splash overlay is visible, the logo stays hidden so it doesn’t compete with it. */
  hidden?: boolean;
};

export function FixedBrandLogo({ hidden = false }: Props) {
  const onTerracotta = useTerracottaAtProbe("bottomLeft", !hidden);

  if (hidden) return null;

  const boxClass =
    "h-4 w-auto max-w-[min(32vw,4.25rem)] sm:h-5 sm:max-w-[4.75rem] opacity-[0.9] drop-shadow-[0_1px_2px_rgba(46,58,31,0.1)]";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-start pl-[max(0.65rem,env(safe-area-inset-left,0px))] pr-4 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pt-2">
      <a
        href={BRAND_LOGO_LINK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto block rounded-sm transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-olive)]"
        aria-label="Nurah Events"
      >
        {onTerracotta ? (
          // eslint-disable-next-line @next/next/no-img-element -- static PNG, filename encodes `&`
          <img
            src={BRAND_LOGO_PNG_PATH}
            alt=""
            width={200}
            height={60}
            className={`${boxClass} object-contain`}
            decoding="async"
            draggable={false}
          />
        ) : (
          <div
            className="h-4 max-w-[min(32vw,4.25rem)] aspect-[200/60] opacity-[0.9] drop-shadow-[0_1px_2px_rgba(46,58,31,0.1)] sm:h-5 sm:max-w-[4.75rem]"
            style={maskStyle(BRAND_LOGO_PNG_PATH)}
            aria-hidden
          />
        )}
      </a>
    </div>
  );
}
