import Link from "next/link";

type NewsCardProps = {
  id: string;
  slug: string;
  title: string;
  coverImage?: string;
  publishedAt: string;
  excerpt?: string;
};

export default function NewsCard({
  id,
  slug,
  title,
  coverImage,
  publishedAt,
  excerpt,
}: NewsCardProps) {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition bg-white">
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-4">
        <Link
          href={`/articles/${slug}`}
          className="text-xl font-semibold hover:text-blue-600"
        >
          {title}
        </Link>
        <p className="text-sm text-gray-500">
          {new Date(publishedAt).toLocaleDateString()}
        </p>
        {excerpt && <p className="mt-2 text-gray-700">{excerpt}</p>}
      </div>
    </div>
  );
}
