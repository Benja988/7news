"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArticleDetail() {
  const params = useParams();
  const { data: article, error } = useSWR(`/api/articles/${params?.id}`, fetcher);

  if (error) return <div>Error loading</div>;
  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <small>Category: {article.category}</small>
    </div>
  );
}
