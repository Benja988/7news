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
      total,
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

    // Validate the input
    const { articleCreateSchema } = await import("@/lib/validations");
    const validatedData = articleCreateSchema.parse(body);

    // Process tags and keywords
    const tagsArray = Array.isArray(validatedData.tags)
      ? validatedData.tags
      : [];

    const keywordsArray = Array.isArray(validatedData.seo?.keywords)
      ? validatedData.seo.keywords
      : [];

    const articleData = {
      ...validatedData,
      tags: tagsArray,
      seo: {
        ...validatedData.seo,
        keywords: keywordsArray,
      },
      scheduledPublishAt: validatedData.scheduledPublishAt ? new Date(validatedData.scheduledPublishAt) : undefined,
      author: req.user.sub,
    };

    const article = await Article.create(articleData);

    articleLogger.info("Created article", { requestId, articleId: article._id, title: article.title });
    return Response.json(article, { status: 201 });
  } catch (err: unknown) {
    articleLogger.error("Error creating article", { err, requestId });
    console.log("Full error object:", err);
    if (err && typeof err === 'object' && 'name' in err && err.name === 'ZodError') {
      console.log("Zod validation errors:", (err as any).errors);
      return Response.json({ message: "Validation failed", errors: (err as any).errors }, { status: 400 });
    }
    return error500("Failed to create article");
  }
});
