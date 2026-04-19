"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatCountdownValue,
  getCountdownParts,
} from "@/lib/countdown-parts";
import { WEDDING_ISO } from "@/lib/constants";
import { useT } from "@/lib/i18n";

export function CountdownBlock() {
  const t = useT();
  const target = useMemo(() => new Date(WEDDING_ISO), []);
  /** Avoid hydration mismatch: real clock only after mount (SSR + first client paint match). */
  const [now, setNow] = useState<Date | null>(null);

  const labels = useMemo(
    () => ({
      days: t.countdown.days,
      hours: t.countdown.hours,
      minutes: t.countdown.minutes,
      seconds: t.countdown.seconds,
    }),
    [
      t.countdown.days,
      t.countdown.hours,
      t.countdown.minutes,
      t.countdown.seconds,
    ],
  );

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, []);

  const parts = getCountdownParts(target, now ?? target, labels);
  const showLive = now !== null;

  return (
    <div
      className="countdown-grid"
      role="timer"
      aria-live="polite"
      aria-busy={!showLive}
    >
      {parts.map((p) => (
        <div key={p.label} className="countdown-cell">
          <span className="countdown-value" aria-hidden="true">
            {showLive
              ? formatCountdownValue(p.label, p.value, labels.days)
              : "\u2014"}
          </span>
          <span className="countdown-label">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
