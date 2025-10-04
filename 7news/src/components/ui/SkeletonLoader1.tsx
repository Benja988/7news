// components/ui/SkeletonLoader.tsx
export function SkeletonCard({ type = 'default' }: { type?: 'default' | 'list' | 'featured' }) {
  if (type === 'list') {
    return (
      <div className="flex items-start space-x-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    );
  }
  
  // ... existing skeleton implementations ...
}