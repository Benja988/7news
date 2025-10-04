// components/home/HeroSection.tsx
import CategorySearchBar from "@/components/ui/CategorySearchBar";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onCategorySelect: (slug: string) => void;
  activeCategory: string;
}

export default function HeroSection({ 
  onSearch, 
  onCategorySelect, 
  activeCategory 
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Stay Informed with{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Latest News
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover trending stories, in-depth analysis, and breaking news from trusted sources
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto">
            <CategorySearchBar
              onSearch={onSearch}
              onCategorySelect={onCategorySelect}
              activeCategory={activeCategory}
            />
          </div>
        </div>
      </div>
    </section>
  );
}