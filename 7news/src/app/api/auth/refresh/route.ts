// src/app/api/auth/refresh/route.ts

import { cookies } from "next/headers";
import { verifyToken, signAccessToken, setAuthCookies } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { unauthorized, ok, error500 } from "@/lib/response";
import logger from "@/lib/logger";
import { NextRequest } from "next/server";

const authLogger = logger.child("auth:refresh");

export async function POST(req: NextRequest) {
  const requestId = req.headers.get("x-request-id") || undefined;
  try {
    await connectDB();

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) {
      authLogger.warn("Missing refresh token", { requestId });
      return unauthorized("Missing refresh token");
    }

    // Verify refresh token
    const payload: any = verifyToken(refreshToken);
    if (!payload || !payload.sub) {
      authLogger.warn("Invalid refresh token", { requestId });
      return unauthorized("Invalid refresh token");
    }

    // Check if user still exists
    const user = await User.findById(payload.sub);
    if (!user) {
      authLogger.warn(`User not found: ${payload.sub}`, { requestId });
      return unauthorized("User not found");
    }

    // Issue new access token
    const newAccessToken = await signAccessToken(user);

    // Update cookies
    await setAuthCookies(newAccessToken, refreshToken);

    authLogger.info(`Token refreshed for user: ${user.email}`, { userId: user._id.toString(), requestId });

    return ok({ accessToken: newAccessToken });
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    authLogger.error(error, { requestId, context: "Refresh token error" });
    return error500("Internal server error");
  }
}