"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Folder, Users, Settings } from "lucide-react";

const menuItems = [
  { href: "/admin", icon: Home, label: "Dashboard" },
  { href: "/admin/articles", icon: FileText, label: "Articles" },
  { href: "/admin/categories", icon: Folder, label: "Categories" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-3">
        {menuItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 rounded px-2 py-1 transition ${
              pathname === href
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            <Icon size={18} /> {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
