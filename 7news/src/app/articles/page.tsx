"use client";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArticlesPage() {
  const { data: articles, error } = useSWR("/api/articles", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!articles) return <div>Loading...</div>;

  return (
    <div>
      <h1>Articles</h1>
      <Link href="/create">Create New</Link>
      <ul>
        {articles.map((a: any) => (
          <li key={a._id}>
            <Link href={`/articles/${a._id}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
