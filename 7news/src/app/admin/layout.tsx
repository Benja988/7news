// app/admin/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import { Home, FileText, Folder, Users, Settings } from "lucide-react";
import AuthGuard from "@/context/AuthGuard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

          <nav className="flex flex-col gap-3">
            <Link href="/admin" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <Home size={18} /> Dashboard
            </Link>
            <Link href="/admin/articles" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <FileText size={18} /> Articles
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <Folder size={18} /> Categories
            </Link>
            <Link href="/admin/users" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <Users size={18} /> Users
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <Settings size={18} /> Settings
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </AuthGuard>
  );
}
