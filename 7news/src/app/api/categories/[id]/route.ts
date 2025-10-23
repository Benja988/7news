// app/api/categories/[id]/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import { ok, notFound, badRequest, error500, unauthorized, forbidden } from "@/lib/response";
import { getUserFromCookies, requireRole } from "@/lib/auth";
import logger from "@/lib/logger";


export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  const { id } = await params;
  const cat = await Category.findById(id);
  if (!cat) return notFound();
  return ok(cat);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin", "editor"], user.role)) return forbidden();

    const json = await req.json();
    const cat = await Category.findByIdAndUpdate(id, json, { new: true });
    if (!cat) return notFound();
    logger.info("Category updated", { categoryId: cat._id.toString(), by: user.sub });
    return ok(cat);
  } catch (e) {
    logger.error("Category update error");
    return error500();
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin"], user.role)) return forbidden();

    const del = await Category.findByIdAndDelete(id);
    if (!del) return notFound();
    logger.warn("Category deleted", { categoryId: id, by: user.sub });
    return ok({ deleted: true });
  } catch (e) {
    logger.error("Category delete error");
    return error500();
  }
}
