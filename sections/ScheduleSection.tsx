"use client";

import { RevealStagger } from "@/components/RevealStagger";
import { Container } from "@/components/ui/Container";
import { venueGoogleMapsSearchUrl } from "@/lib/constants";
import { useT } from "@/lib/i18n";

const TIMELINE_KEYS = ["arrival", "main", "evening"] as const;

/** “The day” — timeline, dress code, note (full-width terracotta band). */
export function ScheduleSection() {
  const t = useT();

  return (
    <section
      id="schedule"
      className="full-bleed terracotta-band scroll-mt-24 flex min-h-[100dvh] flex-col justify-center px-5 py-16 sm:px-8 sm:py-20"
      aria-labelledby="schedule-heading"
    >
      <Container>
        <RevealStagger stagger={0.08}>
          <h2
            data-reveal
            id="schedule-heading"
            className="text-center font-display text-[clamp(1.35rem,4vw,1.75rem)] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink)]"
          >
            {t.schedule.title}
          </h2>
          <p
            data-reveal
            className="font-body mx-auto mt-6 max-w-xl text-center text-[0.8125rem] font-light leading-[1.9] text-[var(--color-ink)] sm:text-[0.875rem]"
          >
            {t.schedule.intro}
          </p>

          <ul
            data-reveal
            className="mx-auto mt-12 max-w-md space-y-5 border-l border-[var(--color-ink)]/25 pl-5"
          >
            {TIMELINE_KEYS.map((key) => (
              <li
                key={key}
                className="font-body text-[0.8125rem] font-light leading-[1.85] text-[var(--color-ink)] sm:text-[0.875rem]"
              >
                {t.schedule[key]}
              </li>
            ))}
          </ul>

          <p
            data-reveal
            className="font-body mx-auto mt-10 max-w-xl text-center text-[0.8125rem] font-light leading-[1.9] text-[var(--color-ink)] sm:text-[0.875rem]"
          >
            {t.schedule.dress}
          </p>
          <p
            data-reveal
            className="font-body mx-auto mt-5 max-w-xl text-center text-[0.8125rem] font-light leading-[1.85] text-[var(--color-ink)]/95 sm:text-[0.875rem]"
          >
            {t.schedule.note}
          </p>
          <a
            data-reveal
            className="font-ui mt-10 inline-block w-full text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-ink)]/90 underline-offset-4 transition hover:underline"
            href={venueGoogleMapsSearchUrl()}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t.map.openMaps}
          </a>
        </RevealStagger>
      </Container>
    </section>
  );
}
