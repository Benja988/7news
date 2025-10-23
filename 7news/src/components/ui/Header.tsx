// components/ui/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";

type Category = {
  _id: string;
  name: string;
  slug: string;
  articleCount?: number;
};

export default function Header() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });

        const data = await res.json();

        const categoryArray = Array.isArray(data)
          ? data
          : data.data || data.categories || [];

        setCategories(categoryArray);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    fetchCategories();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <HeaderDesktop
        user={user}
        scrolled={scrolled}
        categories={categories}
        loading={loading}
      />
      <HeaderMobile 
        user={user} 
        scrolled={scrolled} 
        categories={categories}
      />
      
      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}