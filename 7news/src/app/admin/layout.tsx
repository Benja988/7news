// app/admin/layout.tsx
import { ReactNode } from "react";
import AuthGuard from "@/context/AuthGuard";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </AuthGuard>
  );
}
