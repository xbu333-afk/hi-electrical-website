"use client";

import { useIsNight } from "@/lib/use-is-night";

type NightOnlyTextProps = {
  children: React.ReactNode;
};

export default function NightOnlyText({ children }: NightOnlyTextProps) {
  const isNight = useIsNight();
  if (!isNight) return null;
  return <>{children}</>;
}
