// app/api/articles/[id]/route.ts
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";
import Article from "@/lib/models/Article";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const article = await Article.findById(id).populate("author", "name");
  if (!article) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json(article);
}

export const PUT = requireAuth(["admin", "editor"])(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const article = await Article.findByIdAndUpdate(id as string, body, { new: true });
  if (!article) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json(article);
});

export const DELETE = requireAuth(["admin"])(async (_: Request, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();
  const { id } = await params;
  await Article.findByIdAndDelete(id as string);
  return Response.json({ message: "Deleted" });
});

