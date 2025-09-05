// app/components/ui/Header.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (!res.ok) return; // not logged in
        const data = await res.json();
        setUser(data.data); // because your ok() helper likely wraps in { data }
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {
      // ignore logout error
    }
    setUser(null);
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

        {user ? (
          <>
            <Link href="/create" className="hover:text-blue-400">
              Create
            </Link>
            <span className="text-sm italic">Hi, {user.name}</span>
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
