// components/ui/Breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  // Add home as first item if not present
  const allItems = items[0]?.href === '/' ? items : [
    { label: 'Home', href: '/' },
    ...items
  ];

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      {allItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          )}

          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
            >
              {index === 0 && <Home className="w-4 h-4 mr-1" />}
              <span className={index === allItems.length - 1 ? 'font-medium text-gray-900 dark:text-white' : ''}>
                {item.label}
              </span>
            </Link>
          ) : (
            <span className="font-medium text-gray-900 dark:text-white flex items-center">
              {index === 0 && <Home className="w-4 h-4 mr-1" />}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Structured Data for Breadcrumbs
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const allItems = items[0]?.href === '/' ? items : [
    { label: 'Home', href: '/' },
    ...items
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://hintflow.site${item.href}` : undefined
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}