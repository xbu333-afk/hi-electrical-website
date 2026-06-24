import type { Metadata } from "next";
import PwaRegister from "./PwaRegister";

export const metadata: Metadata = {
  manifest: "/manifest-admin.json",
  appleWebApp: {
    capable: true,
    title: "HI Admin",
    statusBarStyle: "default",
  },
  icons: {
    apple: "/icon-192.png",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 antialiased">
      <PwaRegister />
      {children}
    </div>
  );
}
