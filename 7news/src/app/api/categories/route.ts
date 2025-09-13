// app/api/categories/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import { categoryCreateSchema } from "@/lib/validations";
import { ok, created, badRequest, error500, unauthorized, forbidden } from "@/lib/response";
import { getUserFromCookies, requireRole } from "@/lib/auth";
import logger from "@/lib/logger";


export async function GET() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 });
  return ok(categories);
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin", "editor"], user.role)) return forbidden();

    const json = await req.json();
    const parsed = categoryCreateSchema.safeParse(json);
    if (!parsed.success) return badRequest("Invalid category data");

    const exists = await Category.findOne({ $or: [{ name: parsed.data.name }, { slug: parsed.data.slug }] });
    if (exists) return badRequest("Category name/slug already exists");

    const cat = await Category.create(parsed.data);
    // logger.info({ categoryId: cat._id, by: user.sub }, "Category created");
    return created(cat);
  } catch (e) {
    logger.error("Category create error");
    return error500();
  }
}
