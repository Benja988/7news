// app/api/comments/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/lib/models/Comment";
import { commentCreateSchema } from "@/lib/validations";
import { ok, created, badRequest, error500, unauthorized } from "@/lib/response";
import { getUserFromCookies } from "@/lib/auth";
import logger from "@/lib/logger";


export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("articleId");
  const q: any = {};
  if (articleId) q.article = articleId;
  const items = await Comment.find(q).sort({ createdAt: -1 }).limit(100).populate("user", "name");
  return ok(items);
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getUserFromCookies();
    if (!user) return unauthorized();

    const json = await req.json();
    const parsed = commentCreateSchema.safeParse(json);
    if (!parsed.success) return badRequest("Invalid comment");

    const doc = await Comment.create({ article: parsed.data.articleId, user: user.sub, content: parsed.data.content });
    logger.info({ commentId: doc._id, by: user.sub }, "Comment created");
    return created(doc);
  } catch (e) {
    logger.error("Comment create error");
    return error500();
  }
}
