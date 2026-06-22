import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import {
  LazyFloatingContactBar,
  LazyFooter,
} from "@/app/components/LazyLayoutChrome";
import LazyScrollToTop from "@/app/components/LazyScrollToTop";
import DeferredGoogleTagManager from "@/app/components/DeferredGoogleTagManager";
import VisitorTracker from "@/app/components/VisitorTracker";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["400", "500", "700"],
});

const gveretLevin = localFont({
  src: "./fonts/GveretLevin-Regular.ttf",
  variable: "--font-gveret-levin",
  display: "swap",
  weight: "400",
  preload: false, // decorative tagline font — not needed for FCP
});

export const metadata: Metadata = {
  title: {
    default: "יהודה חכמוב | הנדסאי חשמל מוסמך - חשמלאי יצאת צדיק",
    template: "%s | ח.י שירותי חשמל",
  },
  description:
    "יהודה חכמוב — הנדסאי חשמל, בעל רישיון ראשי וחשמלאי מוסמך. חשמלאי יצאת צדיק עם חיים אתגר. זמין 24 שעות לחירום. חשמלאי מומלץ ומדורג.",
  keywords: [
    "חשמלאי מוסמך",
    "חשמלאי מומלץ מידרג",
    "חשמלאי יצאת צדיק",
    "חשמלאי 24 שעות",
    "הנדסאי חשמל",
    "יהודה חכמוב",
    "רישיון ראשי",
  ],
  // TODO: Replace with real domain before launch
  metadataBase: new URL("https://hi-electrical.co.il"),
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "ח.י שירותי חשמל",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const isAdmin = h.get("x-is-admin") === "1";

  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${gveretLevin.variable} h-full`}
    >
      {isAdmin ? (
        // Admin pages — bare body, no site chrome
        <body className="h-full bg-gray-50 text-slate-900 antialiased">{children}</body>
      ) : (
        // Public site — full layout with navbar/footer
        <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
          <DeferredGoogleTagManager />
          <Suspense fallback={null}>
            <VisitorTracker />
          </Suspense>

          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[200] focus:bg-emerald-600 focus:text-white focus:font-bold focus:px-5 focus:py-3 focus:rounded-xl focus:shadow-lg"
          >
            דלג לתוכן הראשי
          </a>

          <Navbar />
          <LazyScrollToTop />

          <main id="main-content" className="flex-1 pb-24 md:pb-0" tabIndex={-1}>
            {children}
          </main>

          <LazyFooter />
          <LazyFloatingContactBar />
        </body>
      )}
    </html>
  );
}
