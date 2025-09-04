"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link href="/" className="text-xl font-bold hover:text-blue-400">
        📰 My News App
      </Link>

      <nav className="flex gap-4 items-center">
        <Link href="/articles" className="hover:text-blue-400">
          Articles
        </Link>

        {isLoggedIn ? (
          <>
            <Link href="/create" className="hover:text-blue-400">
              Create
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link href="/register" className="hover:text-blue-400">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
