// app/api/articles/search/route.ts
import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");

  const filter = q
    ? { $text: { $search: q }, status: "published" }
    : { status: "published" };

  const total = await Article.countDocuments(filter);

  const articles = await Article.find(filter, q ? { score: { $meta: "textScore" } } : {})
    .populate("author", "name")
    .sort(q ? { score: { $meta: "textScore" } } : { createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return Response.json({ articles, totalPages: Math.ceil(total / limit), currentPage: page });
}
