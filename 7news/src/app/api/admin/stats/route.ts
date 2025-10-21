import { connectDB } from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import Category from "@/lib/models/Category";
import User from "@/lib/models/User";
import Comment from "@/lib/models/Comment";
import { requireAuth } from "@/lib/requireAuth";
import { error500 } from "@/lib/response";
import logger from "@/lib/logger";

const statsLogger = logger.child("admin:stats");

export const GET = requireAuth(["admin"])(async (req: Request) => {
  await connectDB();
  const requestId = req.headers.get("x-request-id") || undefined;

  try {
    const totalArticles = await Article.countDocuments();
    const publishedArticles = await Article.countDocuments({ status: "published" });
    const draftArticles = await Article.countDocuments({ status: "draft" });
    const totalCategories = await Category.countDocuments();
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalComments = await Comment.countDocuments();

    // Simple analytics: total views, likes
    const articles = await Article.find({}, "views likes").lean();
    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
    const totalLikes = articles.reduce((sum, a) => sum + (a.likes || 0), 0);

    statsLogger.info("Fetched admin stats", { requestId });

    return Response.json({
      totalArticles,
      publishedArticles,
      draftArticles,
      totalCategories,
      totalUsers,
      activeUsers,
      totalComments,
      totalViews,
      totalLikes,
    });
  } catch (err: unknown) {
    statsLogger.error("Error fetching admin stats", { err, requestId });
    return error500("Failed to fetch stats");
  }
});