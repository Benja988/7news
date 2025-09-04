// src/app/api/auth/register/route.ts
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { registerSchema } from "@/lib/validations";
import { badRequest, created } from "@/lib/response";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    // connect to DB
    await connectDB();

    // parse request body
    const json = await req.json();

    // validate with Zod
    const parsed = registerSchema.safeParse(json);
    if (!parsed.success) {
      const errors = parsed.error.flatten().formErrors.join(", ");
      return badRequest(errors || "Invalid input");
    }

    // check for existing user
    const exists = await User.findOne({ email: parsed.data.email });
    if (exists) {
      return badRequest("Email already in use");
    }

    // create user
    const user = await User.create({ ...parsed.data, role: "user" });

    // log success
    logger.info({ userId: user._id }, "✅ User registered");

    // return response
    return created({
      id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (e: any) {
    // log error
    logger.error(e, "❌ Register error");

    // return detailed error in JSON
    return new Response(
      JSON.stringify({
        error: e.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? e.stack : undefined,
      }),
      { status: 500 }
    );
  }
}
