// components/ui/HeaderDesktop.tsx
"use client";

import Header from "./Header";

interface Category {
  _id: string;
  name: string;
  slug: string;
  articleCount?: number;
  parent?: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface HeaderDesktopProps {
  user: User | null;
  scrolled: boolean;
  categories: Category[];
  loading?: boolean;
}

export default function HeaderDesktop({ user, scrolled, categories, loading = false }: HeaderDesktopProps) {
  return <Header user={user} scrolled={scrolled} categories={categories} loading={loading} isMobile={false} />;
}