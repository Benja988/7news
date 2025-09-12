// app/api/articles/author/[id]/route.ts
import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");

  const filter = { author: id, status: "published" };
  const total = await Article.countDocuments(filter);

  const articles = await Article.find(filter)
    .populate("author", "name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return Response.json({ articles, totalPages: Math.ceil(total / limit), currentPage: page });
}
