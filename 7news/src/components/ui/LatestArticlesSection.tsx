// components/home/LatestArticlesSection.tsx
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { NewsCard } from "@/components/ui/NewsCard";
import { Article } from "@/types/article";
import { EmptyState } from "./EmptyState";

interface LatestArticlesSectionProps {
  articles: Article[];
  loading: boolean;
  hasMoreArticles: boolean;
}

export default function LatestArticlesSection({ 
  articles, 
  loading, 
  hasMoreArticles 
}: LatestArticlesSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <SectionHeader articleCount={articles.length} />
        
        <ArticlesGrid 
          articles={articles} 
          loading={loading} 
        />

        {/* Load More Button */}
        {!loading && hasMoreArticles && <LoadMoreButton />}
      </div>
    </section>
  );
}

// Sub-component for section header
function SectionHeader({ articleCount }: { articleCount: number }) {
  return (
    <div className="flex justify-between items-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        Latest News
      </h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {articleCount} articles
        </span>
      </div>
    </div>
  );
}

// Sub-component for articles grid
function ArticlesGrid({ articles, loading }: { articles: Article[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return <EmptyState message="No articles found. Try a different search or category." />;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articles.map((article) => (
        <NewsCard key={article._id} article={article} />
      ))}
    </div>
  );
}

// Sub-component for load more button
function LoadMoreButton() {
  return (
    <div className="text-center mt-12">
      <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
        Load More Articles
      </button>
    </div>
  );
}