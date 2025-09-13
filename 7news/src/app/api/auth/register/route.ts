// src/app/api/auth/register/route.ts


import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { registerSchema } from "@/lib/validations";
import { badRequest, created, error500 } from "@/lib/response";
import logger from "@/lib/logger";

const authLogger = logger.child("auth:register");

export async function POST(req: NextRequest) {
  const requestId = req.headers.get("x-request-id") || undefined;
  try {
    await connectDB();
    const json = await req.json();

    // Validate with Zod
    const parsed = registerSchema.safeParse(json);
    if (!parsed.success) {
      const errors = parsed.error.flatten().formErrors.join(", ");
      authLogger.warn(`Invalid registration attempt: ${errors}`, { requestId });
      return badRequest(errors || "Invalid input");
    }

    // Check for existing user
    const exists = await User.findOne({ email: parsed.data.email });
    if (exists) {
      authLogger.warn(`Registration failed: Email already in use (${parsed.data.email})`, { requestId });
      return badRequest("Email already in use");
    }

    // Create user
    const user = await User.create({ ...parsed.data, role: "user" });

    authLogger.info(`User registered: ${user.email}`, { userId: user._id.toString(), requestId });

    return created({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (e: any) {
    authLogger.error(e, { requestId, context: "Register error" });
    return error500(e.message || "Internal server error");
  }
}