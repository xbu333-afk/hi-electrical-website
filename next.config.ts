import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // מאפשר גלישה מהטלפון ברשת הביתית (npm run dev / next dev -H 0.0.0.0)
  allowedDevOrigins: ["192.168.1.122"],
};

export default nextConfig;
