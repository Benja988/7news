// src/app/api/me/route.ts
import { NextRequest } from "next/server";
import { getUserFromCookies } from "@/lib/auth";
import { ok, unauthorized } from "@/lib/response";
import { connectDB } from "@/lib/mongodb";
import User, { IUser } from "@/lib/models/User";
import logger from "@/lib/logger";

const userLogger = logger.child("user:me");

export async function GET(req: NextRequest) {
  const requestId = req.headers.get("x-request-id") || undefined;
  try {
    await connectDB();

    const payload = await getUserFromCookies();
    if (!payload || !payload.sub) {
      userLogger.warn("Unauthenticated access attempt", { requestId });
      return unauthorized("Not authenticated");
    }

    // Find a single user by ID
    const user = await User.findById(payload.sub).lean<IUser | null>();
    if (!user) {
      userLogger.warn(`User not found: ${payload.sub}`, { requestId });
      return unauthorized("User not found");
    }

    // Only return safe fields
    const safeUser = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      profile: user.profile,
      preferences: user.preferences,
      lastLogin: user.lastLogin,
    };

    userLogger.info(`User profile retrieved: ${user.email}`, { userId: user._id.toString(), requestId });

    return ok(safeUser);
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    userLogger.error(error, { requestId, context: "Error retrieving user profile" });
    return unauthorized("Invalid session");
  }
}
