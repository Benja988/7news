// app/api/articles/slug/[slug]/route.ts
import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";
import { error500 } from "@/lib/response";
import logger from "@/lib/logger";

const articleLogger = logger.child("articles:by-slug");

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  await connectDB();
  const requestId = req.headers.get("x-request-id") || undefined;
  const slug = await params;

  try {
    const article = await Article.findOneAndUpdate(
      { slug: slug, status: "published" },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate("author", "name")
      .populate("category", "name")
      .populate("relatedArticles", "title slug coverImage excerpt");

    if (!article) {
      articleLogger.warn("Article not found by slug", { requestId, slug: slug });
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    articleLogger.info("Fetched article by slug", { requestId, slug: slug });
    return Response.json(article);
  } catch (err: unknown) {
    articleLogger.error("Error fetching article by slug", { err, requestId });
    return error500("Failed to fetch article");
  }
}
