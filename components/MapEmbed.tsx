"use client";

import { useEffect, useRef, useState } from "react";
import { VENUE } from "@/lib/constants";
import { useT } from "@/lib/i18n";

export function MapEmbed() {
  const t = useT();
  const [active, setActive] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true);
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const src = `https://maps.google.com/maps?q=${VENUE.embedQuery}&output=embed`;

  return (
    <div
      ref={hostRef}
      className="flex h-full min-h-[220px] w-full items-stretch bg-[var(--color-linen)]"
    >
      {active ? (
        <iframe
          title={`Map: ${VENUE.name}`}
          className="h-full min-h-[220px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={src}
          allowFullScreen
        />
      ) : (
        <div className="flex w-full items-center justify-center font-ui text-sm font-light text-[var(--color-muted)]">
          {t.map.loading}
        </div>
      )}
    </div>
  );
}
