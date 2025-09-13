// app/api/articles/my-articles/route.ts (New: For authors to manage their drafts/published)

import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";

export const GET = requireAuth(["admin", "editor"])(async (req: any) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "10", 10));
  const status = searchParams.get("status") || "";

  const filter: any = { author: req.user.sub };
  if (status) filter.status = status;

  const total = await Article.countDocuments(filter);

  const articles = await Article.find(filter)
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
});