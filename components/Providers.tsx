"use client";

import type { ReactNode } from "react";
import { GsapScrollInit } from "@/components/GsapScrollInit";
import { LocaleProvider } from "@/lib/i18n";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <GsapScrollInit />
      {children}
    </LocaleProvider>
  );
}
