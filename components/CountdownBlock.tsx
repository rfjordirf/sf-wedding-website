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
  const [now, setNow] = useState(() => new Date());

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
    const id = window.setInterval(() => setNow(new Date()), 250);
    return () => window.clearInterval(id);
  }, []);

  const parts = getCountdownParts(target, now, labels);

  return (
    <div className="countdown-grid" role="timer" aria-live="polite">
      {parts.map((p) => (
        <div key={p.label} className="countdown-cell">
          <span className="countdown-value" aria-hidden="true">
            {formatCountdownValue(p.label, p.value, labels.days)}
          </span>
          <span className="countdown-label">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
