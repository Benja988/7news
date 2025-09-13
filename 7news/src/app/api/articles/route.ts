// app/api/articles/route.ts (Enhanced with search, filters, and featured)

import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "6", 10));
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const tag = searchParams.get("tag") || "";
  const sort = searchParams.get("sort") || "createdAt"; // Options: createdAt, views, likes
  const order = searchParams.get("order") || "-1"; // -1 desc, 1 asc
  const featuredOnly = searchParams.get("featured") === "true";

  const filter: any = { status: "published" };
  if (search) filter.$text = { $search: search };
  if (category) filter.category = category;
  if (tag) filter.tags = { $in: [tag] };
  if (featuredOnly) filter.isFeatured = true;

  const total = await Article.countDocuments(filter);

  const articles = await Article.find(filter)
    .populate("author", "name")
    .populate("category", "name")
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

// 🔹 Protected: create article (unchanged, but can add validation for new fields)
export const POST = requireAuth(["admin", "editor"])(async (req: any) => {
  await connectDB();
  const body = await req.json();
  const article = await Article.create({ ...body, author: req.user.sub });
  return Response.json(article, { status: 201 });
});