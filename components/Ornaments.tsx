/** Stable SVG coords — avoids SSR/client float drift in trig math */
function svgCoord(n: number): string {
  return n.toFixed(3);
}

const DIAMOND_SIZES = {
  sm: 28,
  md: 34,
  lg: 40,
  xl: 46,
  hero: 52,
} as const;

export type DotDiamondSize = keyof typeof DIAMOND_SIZES;

type DotDiamondProps = {
  className?: string;
  /** Default `lg`; `md` header bar, `hero` splash. */
  size?: DotDiamondSize;
};

export function DotDiamond({
  className = "",
  size = "lg",
}: DotDiamondProps) {
  const px = DIAMOND_SIZES[size];
  return (
    <svg
      className={className}
      width={px}
      height={px}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14 4L24 14L14 24L4 14L14 4Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="14" cy="10" r="1.35" fill="currentColor" />
      <circle cx="18" cy="14" r="1.35" fill="currentColor" />
      <circle cx="14" cy="18" r="1.35" fill="currentColor" />
      <circle cx="10" cy="14" r="1.35" fill="currentColor" />
    </svg>
  );
}

type FloralProps = { className?: string; size?: "md" | "lg" };

export function FloralDivider({ className = "", size = "lg" }: FloralProps) {
  const px = size === "lg" ? 48 : 40;
  return (
    <div
      className={`mx-auto flex justify-center py-10 text-[var(--color-ink)] ${className}`}
      aria-hidden
    >
      <svg width={px} height={px} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="3" fill="currentColor" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="24"
            y1="24"
            x2={svgCoord(24 + 18 * Math.cos((deg * Math.PI) / 180))}
            y2={svgCoord(24 + 18 * Math.sin((deg * Math.PI) / 180))}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        ))}
        {[0, 72, 144, 216, 288].map((deg) => (
          <circle
            key={`p-${deg}`}
            cx={svgCoord(24 + 12 * Math.cos((deg * Math.PI) / 180))}
            cy={svgCoord(24 + 12 * Math.sin((deg * Math.PI) / 180))}
            r="1.5"
            fill="currentColor"
          />
        ))}
      </svg>
    </div>
  );
}
