// app/api/articles/[id]/route.ts
import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const article = await Article.findById(params.id).populate("author", "name");
  if (!article) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json(article);
}

export const PUT = requireAuth(["admin", "editor"])(async (req: any, { params }: { params: { id: string } }) => {
  await connectDB();
  const body = await req.json();
  const article = await Article.findByIdAndUpdate(params.id, body, { new: true });
  if (!article) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json(article);
});

export const DELETE = requireAuth(["admin"])(async (_: any, { params }: { params: { id: string } }) => {
  await connectDB();
  await Article.findByIdAndDelete(params.id);
  return Response.json({ message: "Deleted" });
});
