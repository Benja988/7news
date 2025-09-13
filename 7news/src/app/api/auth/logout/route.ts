// src/app/api/auth/logout/route.ts

import { clearAuthCookies } from "@/lib/auth";
import { error500, ok } from "@/lib/response";
import logger from "@/lib/logger";
import { NextRequest } from "next/server";

const authLogger = logger.child("auth:logout");

export async function POST(req: NextRequest) {
  const requestId = req.headers.get("x-request-id") || undefined;
  try {
    await clearAuthCookies();
    authLogger.info("User logged out", { requestId });
    return ok({ message: "Logged out successfully" });
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error(String(e));
    authLogger.error(error, { requestId, context: "Logout error" });
    return error500("Internal server error");
  }
}