"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // import our hook

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

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
