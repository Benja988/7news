// app/api/articles/route.ts
import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";
import { error500 } from "@/lib/response";
import logger from "@/lib/logger";
import { SortOrder } from "mongoose";

const articleLogger = logger.child("articles:list-create");

export async function GET(req: Request) {
  await connectDB();
  const requestId = req.headers.get("x-request-id") || undefined;

  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, parseInt(searchParams.get("limit") || "6", 10));
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const tag = searchParams.get("tag") || "";
    const sort = searchParams.get("sort") || "createdAt";
    const order = parseInt(searchParams.get("order") || "-1", 10);
    const featuredOnly = searchParams.get("featured") === "true";

    const filter: any = { status: "published" };
    if (search) filter.$text = { $search: search };
    if (category) filter.category = category;
    if (tag) filter.tags = { $in: [tag] };
    if (featuredOnly) filter.isFeatured = true;

    const total = await Article.countDocuments(filter);

    const sortField = sort;
    const sortOrder: SortOrder = order == -1 ? -1 : 1;

    const articles = await Article.find(filter)
      .populate("author", "name")
      .populate("category", "name")
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    articleLogger.info("Fetched articles list", { requestId, page, limit, filter });
    return Response.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err: unknown) {
    articleLogger.error("Error listing articles", { err, requestId });
    return error500("Failed to fetch articles");
  }
}

export const POST = requireAuth(["admin", "editor"])(async (req: any) => {
  await connectDB();
  const requestId = req.headers.get("x-request-id") || undefined;

  try {
    const body = await req.json();
    const article = await Article.create({ ...body, author: req.user.sub });

    articleLogger.info("Created article", { requestId, articleId: article._id });
    return Response.json(article, { status: 201 });
  } catch (err: unknown) {
    articleLogger.error("Error creating article", { err, requestId });
    return error500("Failed to create article");
  }
});
