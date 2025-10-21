"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Folder, Users, Settings } from "lucide-react";
import { ROUTES } from "@/lib/routes";

const menuItems = [
  { href: ROUTES.ADMIN, icon: Home, label: "Dashboard" },
  { href: ROUTES.ADMIN_ARTICLES, icon: FileText, label: "Articles" },
  { href: ROUTES.ADMIN_CATEGORIES, icon: Folder, label: "Categories" },
  { href: ROUTES.ADMIN_USERS, icon: Users, label: "Users" },
  { href: ROUTES.ADMIN_SETTINGS, icon: Settings, label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-light-bg dark:bg-dark-surface shadow-md p-4 flex flex-col transition-colors duration-300">
      <h2 className="text-xl font-bold mb-6 text-light-heading dark:text-dark-heading">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2">
        {menuItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light font-medium"
                  : "text-light-text dark:text-dark-text hover:bg-light-bg hover:text-primary dark:hover:bg-dark-bg dark:hover:text-primary-light"
              }`}
            >
              <Icon size={18} /> {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
