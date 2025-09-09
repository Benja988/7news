// app/api/articles/route.ts
import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";
import User from "@/lib/models/User";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "6", 10));

  const filter = { status: "published" };
  const total = await Article.countDocuments(filter);

  const articles = await Article.find(filter)
    .populate("author", "name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return Response.json({
    articles,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
}

// 🔹 Protected: create article
export const POST = requireAuth(["admin", "editor"])(async (req: any) => {
  await connectDB();
  const body = await req.json();
  const article = await Article.create({ ...body, author: req.user.sub });
  console.log("REQ USER:", req.user.sub);
  // const article = await Article.create({ ...body, author: "68c025ef605cf538a476381a" });
  return Response.json(article, { status: 201 });
});
