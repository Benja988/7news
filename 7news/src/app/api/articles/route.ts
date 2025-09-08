// app/api/articles/route.ts
import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");

  const filter: any = { status: "published" };
  const total = await Article.countDocuments(filter);

  const articles = await Article.find(filter)
    .populate("author", "name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return Response.json({
    articles,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
}

// 🔹 Protected: create article
export const POST = requireAuth(["admin", "editor"])(async (req: any) => {
  await connectDB();
  const body = await req.json();
  const article = await Article.create({ ...body, author: req.user.id });
  return Response.json(article, { status: 201 });
});
