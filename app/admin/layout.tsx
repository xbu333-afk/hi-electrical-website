// Bare layout for the /admin section.
// Auth is enforced at the /admin/analytics sub-layout to allow
// the /admin/login and /admin/unauthorized pages to render freely.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
