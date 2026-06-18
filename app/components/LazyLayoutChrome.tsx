"use client";

import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/app/components/Footer"));

const FloatingContactBar = dynamic(
  () => import("@/app/components/FloatingContactBar"),
  { ssr: false }
);

export function LazyFooter() {
  return <Footer />;
}

export function LazyFloatingContactBar() {
  return <FloatingContactBar />;
}
