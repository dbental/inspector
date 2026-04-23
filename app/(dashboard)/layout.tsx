import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="mr-64 min-h-screen">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
