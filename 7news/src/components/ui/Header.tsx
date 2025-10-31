// components/ui/Header.tsx
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
  ChevronDown,
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
  Settings,
  Globe,
  List,
  LayoutGrid
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ROUTES } from "@/lib/routes";
import { getCategoryIcon } from "@/lib/categoryIcons";

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

interface HeaderProps {
  user: User | null;
  scrolled: boolean;
  categories: Category[];
  loading?: boolean;
  isMobile?: boolean;
}

export default function Header({ user, scrolled, categories, loading = false, isMobile = false }: HeaderProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [stickyDropdowns, setStickyDropdowns] = useState<Set<string>>(new Set());
  const [headerCategories, setHeaderCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const dropdownTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Fetch categories for header dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        const data = await res.json();
        const categoryArray = Array.isArray(data)
          ? data
          : data.data || data.categories || [];
        // Filter out categories with 0 articles
        const filteredCategories = categoryArray.filter((cat: any) => cat.articleCount > 0);
        setHeaderCategories(filteredCategories);
      } catch (err) {
        console.error("Failed to load categories for header:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      router.push("/");
      setMenuOpen(false);
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

  const handleDropdownEnter = (dropdown: string) => {
    // Clear any existing timeout for this dropdown
    const existingTimeout = dropdownTimeouts.current.get(dropdown);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      dropdownTimeouts.current.delete(dropdown);
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = (dropdown: string) => {
    if (stickyDropdowns.has(dropdown)) {
      // If sticky, set a 1-minute timeout
      const timeout = setTimeout(() => {
        setActiveDropdown(null);
        setStickyDropdowns(prev => {
          const newSet = new Set(prev);
          newSet.delete(dropdown);
          return newSet;
        });
        dropdownTimeouts.current.delete(dropdown);
      }, 60000); // 1 minute
      dropdownTimeouts.current.set(dropdown, timeout);
    } else {
      setActiveDropdown(null);
    }
  };

  const handleDropdownClick = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
      setStickyDropdowns(prev => {
        const newSet = new Set(prev);
        newSet.delete(dropdown);
        return newSet;
      });
    } else {
      setActiveDropdown(dropdown);
      setStickyDropdowns(prev => new Set(prev).add(dropdown));
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      dropdownTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Generate random icon for categories
  const getRandomIcon = (index: number) => {
    const icons = [BookOpen, Camera, Code, Coffee, Gamepad2, Heart, Music, Zap];
    return icons[index % icons.length];
  };

  // Use headerCategories instead of prop categories for dropdown
  const displayCategories = headerCategories;

  if (isMobile) {
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
                          {displayCategories.map((category, index) => {
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

  // Desktop Header
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
                HintFlow
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

            <Link
              href="/about"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              About
            </Link>

            <Link
              href="/newsroom"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Newsroom
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('categories')}
              onMouseLeave={() => handleDropdownLeave('categories')}
              onClick={() => handleDropdownClick('categories')}
            >
              <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  activeDropdown === 'categories' ? 'rotate-180' : ''
                }`} />
              </button>

              {activeDropdown === 'categories' && (
                <div className="absolute top-full left-0 mt-2 w-screen bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden" style={{ left: 'calc(-50vw + 50%)', width: '100vw', height: '70vh' }}>
                  <div className="container mx-auto px-6 py-8 h-full overflow-y-scroll">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Explore Categories
                      </h3>
                      <div className="flex items-center space-x-3">
                        {/* View Toggle */}
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                          <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${
                              viewMode === 'list'
                                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                            title="List view"
                          >
                            <List className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${
                              viewMode === 'grid'
                                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                            title="Grid view"
                          >
                            <LayoutGrid className="w-4 h-4" />
                          </button>
                        </div>
                        <Link
                          href="/categories"
                          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-base font-medium transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <Grid3X3 className="w-5 h-5" />
                          <span>View All Categories</span>
                        </Link>
                      </div>
                    </div>

                    {/* Categories Display */}
                    {viewMode === 'grid' ? (
                      <div className="space-y-8">
                        {loading ? (
                          // Loading skeleton
                          [...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-4">
                              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48"></div>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                {[...Array(6)].map((_, j) => (
                                  <div key={j} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm animate-pulse">
                                    <div className="aspect-square bg-gray-300 dark:bg-gray-700 rounded-t-xl"></div>
                                    <div className="p-4">
                                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          Array.isArray(categories) && (() => {
                            // Group categories by parent
                            const groupedCategories = categories.reduce((acc, cat) => {
                              const parentId = cat.parent || 'root';
                              if (!acc[parentId]) acc[parentId] = [];
                              acc[parentId].push(cat);
                              return acc;
                            }, {} as Record<string, Category[]>);

                            // Get parent categories (those with null parent)
                            const parentCategories = displayCategories.filter(cat => !cat.parent);

                            return parentCategories.map(parentCat => {
                              const childCategories = groupedCategories[parentCat._id] || [];
                              const IconComponent = getCategoryIcon(parentCat.name);

                              return (
                                <div key={parentCat._id} className="space-y-4">
                                  {/* Parent Category Header */}
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                      <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                      {parentCat.name}
                                    </h4>
                                    {parentCat.articleCount !== undefined && parentCat.articleCount > 0 && (
                                      <div className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                        {parentCat.articleCount}
                                      </div>
                                    )}
                                  </div>

                                  {/* Child Categories Grid */}
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                    {/* Parent category card */}
                                    <Link
                                      href={`/categories/${parentCat.slug}`}
                                      className="group block rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                          <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                      </div>
                                      <div className="p-3">
                                        <h5 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                                          All {parentCat.name}
                                        </h5>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                          Browse all {parentCat.name.toLowerCase()} topics
                                        </p>
                                      </div>
                                    </Link>

                                    {/* Child categories */}
                                    {childCategories.map((childCat) => {
                                      const ChildIconComponent = getCategoryIcon(childCat.name);
                                      return (
                                        <Link
                                          key={childCat._id}
                                          href={`/categories/${childCat.slug}`}
                                          className="group block rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800"
                                          onClick={() => setActiveDropdown(null)}
                                        >
                                          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                              <ChildIconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            {childCat.articleCount !== undefined && childCat.articleCount > 0 && (
                                              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow-lg">
                                                {childCat.articleCount}
                                              </div>
                                            )}
                                          </div>
                                          <div className="p-3">
                                            <h5 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                                              {childCat.name}
                                            </h5>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                              {childCat.name.toLowerCase()} updates
                                            </p>
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            });
                          })()
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {loading ? (
                          // Loading skeleton for list - two columns
                          [0, 1].map((colIndex) => (
                            <div key={colIndex} className="space-y-6">
                              {[...Array(10)].map((_, i) => (
                                <div key={i} className="space-y-3">
                                  <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg animate-pulse">
                                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                    <div className="flex-1">
                                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                                    </div>
                                  </div>
                                  <div className="ml-11 space-y-2">
                                    {[...Array(3)].map((_, j) => (
                                      <div key={j} className="flex items-center space-x-3 p-2 bg-white dark:bg-gray-800 rounded-lg animate-pulse">
                                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                        <div className="flex-1">
                                          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))
                        ) : (
                          Array.isArray(categories) && (() => {
                            // Group categories by parent
                            const groupedCategories = categories.reduce((acc, cat) => {
                              const parentId = cat.parent || 'root';
                              if (!acc[parentId]) acc[parentId] = [];
                              acc[parentId].push(cat);
                              return acc;
                            }, {} as Record<string, Category[]>);

                            // Get parent categories (those with null parent)
                            const parentCategories = displayCategories.filter(cat => !cat.parent);

                            // Split parent categories into two columns
                            const midPoint = Math.ceil(parentCategories.length / 2);
                            const leftColumn = parentCategories.slice(0, midPoint);
                            const rightColumn = parentCategories.slice(midPoint);

                            const renderColumn = (columnCategories: Category[]) => (
                              <div className="space-y-6">
                                {columnCategories.map(parentCat => {
                                  const childCategories = groupedCategories[parentCat._id] || [];
                                  const IconComponent = getCategoryIcon(parentCat.name);

                                  return (
                                    <div key={parentCat._id} className="space-y-3">
                                      {/* Parent Category */}
                                      <Link
                                        href={`/categories/${parentCat.slug}`}
                                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                        onClick={() => setActiveDropdown(null)}
                                      >
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                          <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {parentCat.name}
                                          </h4>
                                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                            All {parentCat.name.toLowerCase()} topics
                                          </p>
                                        </div>
                                        {parentCat.articleCount !== undefined && parentCat.articleCount > 0 && (
                                          <div className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0">
                                            {parentCat.articleCount}
                                          </div>
                                        )}
                                      </Link>

                                      {/* Child Categories */}
                                      <div className="ml-11 space-y-2">
                                        {childCategories.map((childCat) => {
                                          const ChildIconComponent = getCategoryIcon(childCat.name);
                                          return (
                                            <Link
                                              key={childCat._id}
                                              href={`/categories/${childCat.slug}`}
                                              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                              onClick={() => setActiveDropdown(null)}
                                            >
                                              <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                                <ChildIconComponent className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                  {childCat.name}
                                                </h5>
                                              </div>
                                              {childCat.articleCount !== undefined && childCat.articleCount > 0 && (
                                                <div className="bg-blue-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0">
                                                  {childCat.articleCount}
                                                </div>
                                              )}
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );

                            return (
                              <>
                                <div>{renderColumn(leftColumn)}</div>
                                <div>{renderColumn(rightColumn)}</div>
                              </>
                            );
                          })()
                        )}
                      </div>
                    )}

                    {/* Empty State */}
                    {(!Array.isArray(displayCategories) || displayCategories.length === 0) && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Grid3X3 className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Categories Yet</h4>
                        <p className="text-gray-600 dark:text-gray-400">Categories will appear here once they're created.</p>
                      </div>
                    )}

                    {/* Footer */}
                    {Array.isArray(displayCategories) && displayCategories.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600 dark:text-gray-400">
                            Showing {displayCategories.length} categorie{displayCategories.length !== 1 ? 's' : ''}
                          </p>
                          <Link
                            href="/categories"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Browse All Categories
                          </Link>
                        </div>
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

            <Link
              href="/careers"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Careers
            </Link>

            <Link
              href="/contact"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
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
                onMouseEnter={() => handleDropdownEnter('user')}
                onMouseLeave={() => handleDropdownLeave('user')}
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