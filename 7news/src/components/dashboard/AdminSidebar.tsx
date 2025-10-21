"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, FileText, Folder, Users, Settings, Menu, X, BarChart3, Bell } from "lucide-react";
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
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-dark-surface rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
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

      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-surface shadow-xl border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col transition-all duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="mb-8 mt-12 md:mt-0">
          <h2 className="text-xl font-bold text-light-heading dark:text-dark-heading flex items-center">
            <BarChart3 className="mr-2 text-primary" size={24} />
            Admin Panel
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Management Dashboard</p>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {menuItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || (href !== ROUTES.ADMIN && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-primary-light/10 dark:text-primary-light font-medium shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg hover:text-primary dark:hover:text-primary-light"
                }`}
              >
                <Icon size={20} className={`transition-colors ${isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'}`} />
                <span>{label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"></div>}
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Last Login</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
