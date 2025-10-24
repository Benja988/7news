// components/ui/HeaderMobile.tsx
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
  Menu,
  X,
  ChevronRight,
  Home,
  TrendingUp,
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
import { ROUTES } from "@/lib/routes";

interface Category {
  _id: string;
  name: string;
  slug: string;
  articleCount?: number;
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
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      router.push("/");
      setMenuOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  // Generate random icon for categories
  const getRandomIcon = (index: number) => {
    const icons = [BookOpen, Camera, Code, Coffee, Gamepad2, Heart, Music, Zap];
    return icons[index % icons.length];
  };

  return (
    <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
              HintFlow
            </span>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="pb-4 animate-in slide-in-from-top duration-300">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-in slide-in-from-top duration-300 max-h-screen overflow-y-auto">
          <div className="container mx-auto px-4 py-4">
            
            {/* User Info */}
            {user && (
              <div className="px-4 py-3 mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            )}

            <nav className="space-y-1">
              {/* Main Navigation */}
              <Link
                href="/"
                className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </div>
              </Link>

              {/* Categories Submenu */}
              <div>
                <button
                  onClick={() => toggleSubmenu('categories')}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    <Grid3X3 className="w-5 h-5" />
                    <span>Categories</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    activeSubmenu === 'categories' ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {activeSubmenu === 'categories' && (
                  <div className="ml-4 mt-1 space-y-1 animate-in slide-in-from-left duration-200">
                    <Link
                      href="/categories"
                      className="flex items-center justify-between px-4 py-3 text-blue-600 dark:text-blue-400 font-medium rounded-lg bg-blue-50 dark:bg-blue-900/20"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>All Categories</span>
                      <Grid3X3 className="w-4 h-4" />
                    </Link>

                    {/* All Categories List */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">All Categories</h4>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {categories.map((category, index) => {
                          const IconComponent = getRandomIcon(index);
                          return (
                            <Link
                              key={category._id}
                              href={`/categories/${category.slug}`}
                              className="flex items-center justify-between px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                              onClick={() => setMenuOpen(false)}
                            >
                              <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                  <IconComponent className="w-2.5 h-2.5 text-gray-600 dark:text-gray-400" />
                                </div>
                                <span className="text-sm">{category.name}</span>
                              </div>
                              {category.articleCount && (
                                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded-full">
                                  {category.articleCount}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/articles"
                className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <Newspaper className="w-5 h-5" />
                  <span>All Articles</span>
                </div>
              </Link>

              {/*<Link
                href="/trending"
                className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5" />
                  <span>Trending</span>
                </div>
              </Link>*/}

              {/* Auth Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                {user ? (
                  <>
                    <Link
                      href={ROUTES.PROFILE}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    {(user.role === 'admin' || user.role === 'editor') && (
                      <Link
                        href={ROUTES.ADMIN}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium rounded-lg"
                      onClick={() => setMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center justify-center mt-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}