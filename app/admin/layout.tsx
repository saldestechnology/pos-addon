import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-14">
        {/* Sidebar */}
        <Sidebar />

        <main className="ml-64 flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
