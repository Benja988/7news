import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import { articleUpdateSchema } from "@/lib/validations";
import { sanitizeContent } from "@/lib/sanitize";
import { ok, notFound, badRequest, error500, unauthorized, forbidden } from "@/lib/response";
import { getUserFromCookies, requireRole } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const a = await Article.findById(params.id)
    .populate("author", "name")
    .populate("category", "name slug");
  if (!a) return notFound();
  return ok(a);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin","editor","writer"], user.role)) return forbidden();

    const json = await req.json();
    const parsed = articleUpdateSchema.safeParse(json);
    if (!parsed.success) return badRequest("Invalid update payload");

    const update: any = { ...parsed.data };
    if (update.content) update.content = sanitizeContent(update.content);
    if (update.status === "published" && !update.publishedAt) update.publishedAt = new Date();

    const doc = await Article.findByIdAndUpdate(params.id, update, { new: true });
    if (!doc) return notFound();

    logger.info({ articleId: params.id, by: user.sub }, "Article updated");
    return ok(doc);
  } catch (e) {
    logger.error(e, "Article update error");
    return error500();
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin","editor"], user.role)) return forbidden();

    const del = await Article.findByIdAndDelete(params.id);
    if (!del) return notFound();

    logger.warn({ articleId: params.id, by: user.sub }, "Article deleted");
    return ok({ deleted: true });
  } catch (e) {
    logger.error(e, "Article delete error");
    return error500();
  }
}
