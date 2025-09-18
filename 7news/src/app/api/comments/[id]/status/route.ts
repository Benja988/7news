// app/api/comments/[id]/status/route.ts
import { requireRole } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/lib/models/Comment";
import { ok, notFound, unauthorized, forbidden, error500 } from "@/lib/response";
import { getUserFromCookies } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin", "editor"], user.role)) return forbidden();

    const { id } = await params;
    const { status } = await req.json();

    const updated = await Comment.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return notFound();

    return ok(updated);
  } catch (e) {
    return error500();
  }
}
