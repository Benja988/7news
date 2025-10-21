// components/ui/HeaderDesktop.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Newspaper,
  Sun,
  Moon,
  User,
  LogOut,
  Edit3,
  Search,
  ChevronDown,
  Menu,
  Grid3X3,
  BookOpen,
  Camera,
  Code,
  Coffee,
  Gamepad2,
  Heart,
  Music,
  Zap,
  Settings
} from "lucide-react";
import { useState } from "react";
import { Category } from "@/types/category";
import { ROUTES } from "@/lib/routes";

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
}

export default function HeaderDesktop({ user, scrolled, categories }: HeaderDesktopProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
      router.push("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Generate random icon for categories
  const getRandomIcon = (index: number) => {
    const icons = [BookOpen, Camera, Code, Coffee, Gamepad2, Heart, Music, Zap];
    return icons[index % icons.length];
  };

  // Generate random image URL from Picsum
  const getRandomImage = (id: string) => {
    const seed = id.replace(/[^a-zA-Z0-9]/g, '');
    return `https://picsum.photos/seed/${seed}/300/200`;
  };

  return (
    <header className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                NewsFlow
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Stay Informed
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1 flex-1 justify-center">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('categories')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  activeDropdown === 'categories' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeDropdown === 'categories' && (
                <div className="absolute top-full left-0 mt-2 w-[800px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Article Categories
                      </h3>
                      <Link
                        href="/categories"
                        className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                      >
                        <Grid3X3 className="w-4 h-4" />
                        <span>View All Categories</span>
                      </Link>
                    </div>

                    {/* Featured Categories (max 7) */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {Array.isArray(categories) && categories.slice(0, 7).map((category, index) => {
                        const IconComponent = getRandomIcon(index);
                        return (
                          <Link
                            key={category._id}
                            href={`/categories/${category.slug}`}
                            className="group block rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {/* Category Image */}
                            <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                              <img
                                src={getRandomImage(category._id)}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                              {/* Icon Overlay */}
                              <div className="absolute top-3 left-3 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-md">
                                <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                            </div>

                            {/* Category Info */}
                            <div className="p-3">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                                  {category.name}
                                </span>
                                {category.articleCount && (
                                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full min-w-[20px] text-center">
                                    {category.articleCount}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* All Categories List */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">All Categories</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Array.isArray(categories) && categories.map((category, index) => {
                          const IconComponent = getRandomIcon(index);
                          return (
                            <Link
                              key={category._id}
                              href={`/categories/${category.slug}`}
                              className="flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                              </div>
                              <span className="text-sm font-medium truncate">{category.name}</span>
                              {category.articleCount && (
                                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded-full ml-auto">
                                  {category.articleCount}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer */}
                    {categories.length > 8 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Link
                          href="/categories"
                          className="flex items-center justify-center w-full py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          View all {categories.length} categories
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/articles"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              All Articles
            </Link>

            {/* <Link
              href="/trending"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Trending
            </Link> */}
          </nav>

          {/* Right Side Actions - Rest of the code remains the same */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Search */}
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            {user ? (
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('user')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300 max-w-32 truncate">
                    {user.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    activeDropdown === 'user' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* User Dropdown */}
                {activeDropdown === 'user' && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        href={ROUTES.PROFILE}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      {(user.role === 'admin' || user.role === 'editor') && (
                        <Link
                          href={ROUTES.ADMIN}
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}