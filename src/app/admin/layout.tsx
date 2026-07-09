export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell dark min-h-screen bg-black text-[#ededed]">
      {children}
    </div>
  );
}
