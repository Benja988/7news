import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import { ok, notFound, badRequest, error500, unauthorized, forbidden } from "@/lib/response";
import { getUserFromCookies, requireRole } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const cat = await Category.findById(params.id);
  if (!cat) return notFound();
  return ok(cat);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin", "editor"], user.role)) return forbidden();

    const json = await req.json();
    const cat = await Category.findByIdAndUpdate(params.id, json, { new: true });
    if (!cat) return notFound();
    logger.info({ categoryId: cat._id, by: user.sub }, "Category updated");
    return ok(cat);
  } catch (e) {
    logger.error(e, "Category update error");
    return error500();
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin"], user.role)) return forbidden();

    const del = await Category.findByIdAndDelete(params.id);
    if (!del) return notFound();
    logger.warn({ categoryId: params.id, by: user.sub }, "Category deleted");
    return ok({ deleted: true });
  } catch (e) {
    logger.error(e, "Category delete error");
    return error500();
  }
}
