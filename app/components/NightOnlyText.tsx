"use client";

import { useEffect, useState } from "react";
import { isNightServiceHours } from "@/lib/night-service";

type NightOnlyTextProps = {
  children: React.ReactNode;
};

export default function NightOnlyText({ children }: NightOnlyTextProps) {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const update = () => setIsNight(isNightServiceHours());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!isNight) return null;

  return <>{children}</>;
}
