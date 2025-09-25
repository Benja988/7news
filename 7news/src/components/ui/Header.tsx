// components/ui/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
export default function Header() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data.categories || data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
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