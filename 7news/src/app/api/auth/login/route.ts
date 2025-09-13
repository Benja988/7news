// src/app/api/auth/login/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { loginSchema } from "@/lib/validations";
import { badRequest, ok, unauthorized, error500 } from "@/lib/response";
import { signAccessToken, signRefreshToken, setAuthCookies } from "@/lib/auth";
import logger from "@/lib/logger";

const authLogger = logger.child("auth:login");

export async function POST(req: NextRequest) {
  const requestId = req.headers.get("x-request-id") || undefined;
  try {
    await connectDB();
    const json = await req.json();

    // Validate request body
    const parsed = loginSchema.safeParse(json);
    if (!parsed.success) {
      authLogger.warn("Invalid login attempt: bad input", { requestId });
      return badRequest("Invalid credentials");
    }

    // Find user
    const user = await User.findOne({ email: parsed.data.email }).select("+password");
    if (!user) {
      authLogger.warn(`Invalid login attempt: email not found (${parsed.data.email})`, { requestId });
      return unauthorized("Invalid credentials");
    }

    // Verify password
    const valid = await user.comparePassword(parsed.data.password);
    if (!valid) {
      authLogger.warn(`Invalid login attempt: wrong password for user ${user._id}`, { requestId });
      return unauthorized("Invalid credentials");
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Create tokens
    const accessToken = await signAccessToken(user);
    const refreshToken = await signRefreshToken(user);

    // Set cookies
    await setAuthCookies(accessToken, refreshToken);

    authLogger.info(`User logged in: ${user.email}`, { userId: user._id.toString(), requestId });

    // Return tokens + user info
    return ok({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (e) {
    authLogger.error(`Login error: ${e instanceof Error ? e.message : String(e)}`, { requestId });
    return error500("Internal server error");
  }
}