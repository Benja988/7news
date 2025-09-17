// app/api/comments/route.ts
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/lib/models/Comment";
import { commentCreateSchema } from "@/lib/validations";
import { unauthorized, badRequest, error500, created } from "@/lib/response";
import { getUserFromCookies } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get("articleId");

    const query: any = {};
    if (articleId) query.article = articleId;

    const comments = await Comment.find(query)
      .sort({ createdAt: -1 })
      .limit(100)
      .populate("author", "name"); // ✅ correct field

    return Response.json({ comments });
  } catch (e) {
    return error500();
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getUserFromCookies();
    if (!user) return unauthorized();

    const json = await req.json();
    const parsed = commentCreateSchema.safeParse(json);
    if (!parsed.success) return badRequest("Invalid comment");

    const comment = await Comment.create({
      article: parsed.data.articleId,
      author: user.sub, // ✅ correct field
      content: parsed.data.content,
    });

    return created(comment);
  } catch (e) {
    return error500();
  }
}
