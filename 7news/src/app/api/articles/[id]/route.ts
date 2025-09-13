// app/api/articles/[id]/route.ts
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";
import Article from "@/lib/models/Article";
import { error500 } from "@/lib/response";
import logger from "@/lib/logger";

const articleLogger = logger.child( "articles:by-id" );

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const requestId = req.headers.get("x-request-id") || undefined;

  try {
    const article = await Article.findById(params.id)
      .populate("author", "name")
      .populate("category", "name")
      .populate("relatedArticles", "title slug coverImage excerpt");

    if (!article) {
      articleLogger.warn("Article not found", { requestId, id: params.id });
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    articleLogger.info("Fetched article by ID", { requestId, id: params.id });
    return Response.json(article);
  } catch (err: unknown) {
    articleLogger.error("Error fetching article by ID", { err, requestId });
    return error500("Failed to fetch article");
  }
}

export const PUT = requireAuth(["admin", "editor"])(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  const requestId = req.headers.get("x-request-id") || undefined;

  try {
    const body = await req.json();

    // If scheduling, set publishedAt from scheduledPublishAt
    if (body.status === "published" && body.scheduledPublishAt) {
      body.publishedAt = body.scheduledPublishAt;
      delete body.scheduledPublishAt;
    }

    const article = await Article.findByIdAndUpdate(params.id, body, { new: true });
    if (!article) {
      articleLogger.warn("Article not found for update", { requestId, id: params.id });
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    articleLogger.info("Updated article", { requestId, id: params.id });
    return Response.json(article);
  } catch (err: unknown) {
    articleLogger.error("Error updating article", { err, requestId });
    return error500("Failed to update article");
  }
});

export const DELETE = requireAuth(["admin"])(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  const requestId = req.headers.get("x-request-id") || undefined;

  try {
    await Article.findByIdAndDelete(params.id);

    articleLogger.info("Deleted article", { requestId, id: params.id });
    return Response.json({ message: "Deleted" });
  } catch (err: unknown) {
    articleLogger.error("Error deleting article", { err, requestId });
    return error500("Failed to delete article");
  }
});
