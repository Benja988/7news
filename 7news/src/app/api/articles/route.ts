import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import { articleCreateSchema } from "@/lib/validations";
import { sanitizeContent } from "@/lib/sanitize";
import { ok, created, badRequest, error500, unauthorized, forbidden } from "@/lib/response";
import { getUserFromCookies, requireRole } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || 10)));
  const status = searchParams.get("status") || undefined;
  const category = searchParams.get("category") || undefined;

  const q: any = {};
  if (status) q.status = status;
  if (category) q.category = category;

  const total = await Article.countDocuments(q);
  const items = await Article.find(q)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("author", "name")
    .populate("category", "name slug");

  return ok({ items, page, limit, total });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin","editor","writer"], user.role)) return forbidden();

    const json = await req.json();
    const parsed = articleCreateSchema.safeParse(json);
    if (!parsed.success) return badRequest("Invalid article data");

    const exists = await Article.findOne({ $or: [{ slug: parsed.data.slug }, { title: parsed.data.title }] });
    if (exists) return badRequest("Article with same slug/title exists");

    const content = sanitizeContent(parsed.data.content);

    const doc = await Article.create({
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      content,
      coverImage: parsed.data.coverImage,
      author: user.sub,
      category: parsed.data.categoryId,
      tags: parsed.data.tags || [],
      status: parsed.data.status ?? "draft",
      publishedAt: parsed.data.status === "published" ? new Date() : undefined,
    });

    logger.info({ articleId: doc._id, by: user.sub }, "Article created");
    return created(doc);
  } catch (e) {
    logger.error(e, "Article create error");
    return error500();
  }
}
