// app/api/Comments/[id]/like/route.ts

import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";
import Comment from "@/lib/models/Comment";

export const POST = requireAuth([])(
  async (_req: Request, { params }: { params: { id: string } }) => {
    await connectDB();

    const { id } = params;

    const comment = await Comment.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!comment) {
      return Response.json({ message: "Comment not found" }, { status: 404 });
    }

    return Response.json({ likes: comment.likes }, { status: 200 });
  }
);

