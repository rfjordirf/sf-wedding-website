import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sadriddin & Feruzabonu — May 9, 2026",
  description:
    "You are invited to celebrate our wedding on May 9, 2026 in Cincinnati, Ohio.",
  openGraph: {
    title: "Sadriddin & Feruzabonu",
    description: "May 9, 2026 · Cincinnati, Ohio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="site-body">
        <Providers>
          <div className="site-shell">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
