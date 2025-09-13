"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
      logout();
      router.push("/");
    } catch (err) {
      console.error("❌ Error logging out:", err);
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight hover:text-blue-400 transition-colors"
        >
          📰 My News App
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Nav links */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent md:flex flex-col md:flex-row md:items-center md:gap-6 border-t md:border-none`}
        >
          <Link
            href="/articles"
            className="block px-4 py-2 md:p-0 hover:text-blue-400 transition-colors"
          >
            Articles
          </Link>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="block px-4 py-2 md:p-0 hover:text-blue-400 transition-colors"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {user ? (
            <>
              <Link
                href="/create"
                className="block px-4 py-2 md:p-0 hover:text-blue-400 transition-colors"
              >
                Create
              </Link>

              <span className="block px-4 py-2 md:p-0 text-sm italic text-gray-300">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="mx-4 md:mx-0 my-2 md:my-0 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-4 py-2 md:p-0 hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 md:p-0 hover:text-blue-400 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
