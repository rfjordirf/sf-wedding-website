/** Editorial line-art venue facade — matches wedding-invitation line style. */
export function VenueIllustration({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto w-full max-w-[min(100%,20rem)] text-[var(--color-ink)]/85 ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
      >
        {/* Ground */}
        <path
          d="M16 176H304"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* Building silhouette */}
        <path
          d="M40 176V72L96 40h128l56 32v104"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <path
          d="M56 176V84l48-28h112l48 28v92"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinejoin="round"
          opacity="0.55"
        />
        {/* Roof accent */}
        <path
          d="M152 40v-12l8-8 8 8v12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Awning */}
        <path
          d="M72 104h176"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M68 104c4-8 12-12 24-12h136c12 0 20 4 24 12"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.65"
        />
        {/* Windows */}
        <path
          d="M88 120h36v36H88z"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path d="M106 120v36" stroke="currentColor" strokeWidth="0.55" opacity="0.4" />
        <path
          d="M196 120h36v36h-36z"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path d="M214 120v36" stroke="currentColor" strokeWidth="0.55" opacity="0.4" />
        <path
          d="M142 116h36v44h-36z"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path d="M160 116v44" stroke="currentColor" strokeWidth="0.55" opacity="0.4" />
        {/* Door */}
        <path
          d="M136 176V132h48v44"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <circle cx="176" cy="156" r="2" fill="currentColor" opacity="0.5" />
        {/* Planters */}
        <path
          d="M56 176v-12h20v12M244 176v-12h20v12"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
