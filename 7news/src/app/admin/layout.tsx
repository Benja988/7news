// app/admin/layout.tsx
import { ReactNode } from "react";
import AuthGuard from "@/context/AuthGuard";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import AdminHeader from "@/components/dashboard/AdminHeader";
import AdminFooter from "@/components/dashboard/AdminFooter";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300 flex flex-col">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-4 md:p-6 overflow-x-auto">{children}</main>
        </div>
        <AdminFooter />
      </div>
    </AuthGuard>
  );
}
