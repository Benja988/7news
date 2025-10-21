"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, FileText, Folder, Users, Settings, Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-light-bg dark:bg-dark-surface rounded-md shadow-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-light-bg dark:bg-dark-surface shadow-md p-4 flex flex-col transition-all duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <h2 className="text-xl font-bold mb-6 text-light-heading dark:text-dark-heading mt-12 md:mt-0">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-2">
          {menuItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
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
    </>
  );
}
