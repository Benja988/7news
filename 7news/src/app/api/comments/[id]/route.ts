// app/api/comments/[id]/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/lib/models/Comment";
import { ok, notFound, unauthorized, forbidden, error500 } from "@/lib/response";
import { getUserFromCookies, requireRole } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;
    const user = await getUserFromCookies();
    if (!user) return unauthorized();

    const json = await req.json();
    const allowedFields = ["content", "status"];
    const update: any = {};
    for (const key of allowedFields) if (key in json) update[key] = json[key];

    const comment = await Comment.findById(id);
    if (!comment) return notFound();

    // Ownership check
    if (user.role !== "admin" && user.role !== "editor" && comment.author.toString() !== user.sub)
      return forbidden();

    comment.set(update);
    await comment.save();

    return ok(await comment.populate("author", "name"));
  } catch {
    return error500();
  }
}


export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin", "editor"], user.role)) return forbidden();

    const del = await Comment.findByIdAndDelete(id);
    if (!del) return notFound();

    return ok({ deleted: true });
  } catch (e) {
    return error500();
  }
}

