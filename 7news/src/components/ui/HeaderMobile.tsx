// components/ui/HeaderMobile.tsx
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

interface HeaderMobileProps {
  user: User | null;
  scrolled: boolean;
  categories: Category[];
}

export default function HeaderMobile({ user, scrolled, categories }: HeaderMobileProps) {
  return <Header user={user} scrolled={scrolled} categories={categories} isMobile={true} />;
}