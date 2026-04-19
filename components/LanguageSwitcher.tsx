"use client";

import { useLocale } from "@/lib/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={`inline-flex rounded-none border border-[var(--color-ink)]/25 ${className}`}
      role="group"
      aria-label={t.lang.aria}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`min-h-[44px] min-w-[44px] px-3 font-ui text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
          locale === "en"
            ? "bg-[var(--color-ink)] text-[var(--color-cream)]"
            : "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)]/5"
        }`}
      >
        {t.lang.en}
      </button>
      <button
        type="button"
        onClick={() => setLocale("uz")}
        className={`min-h-[44px] min-w-[44px] border-l border-[var(--color-ink)]/25 px-3 font-ui text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
          locale === "uz"
            ? "bg-[var(--color-ink)] text-[var(--color-cream)]"
            : "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)]/5"
        }`}
      >
        {t.lang.uz}
      </button>
    </div>
  );
}
