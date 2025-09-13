// app/api/articles/[id]/like/route.ts

import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";
import Article from "@/lib/models/Article";

export const POST = requireAuth([])(
  async (req: Request, { params }: { params: { id: string } }) => {
    await connectDB();

    const { id } = params;

    const article = await Article.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!article) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json({ likes: article.likes });
  }
);
