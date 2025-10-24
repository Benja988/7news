import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parseDuration, refreshAccessToken, verifyToken } from "@/lib/auth";
import enhancedLogger from "@/lib/logger";
import { v4 as uuidv4 } from "uuid";

const logger = enhancedLogger.child("AuthMiddleware");
const accessExp = process.env.JWT_EXPIRES_IN || "15m";

export async function middleware(req: NextRequest) {
  const requestId = uuidv4();
  const { pathname } = req.nextUrl;

  logger.debug(`Processing request for ${pathname}`, { requestId });

  // Redirect logged-in users away from login page
  if (pathname === "/login") {
    const token = req.cookies.get("accessToken")?.value;
    if (token) {
      try {
        const payload = await verifyToken(token);
        if (payload) {
          logger.debug(`Redirecting authenticated user from login to home`, { requestId });
          return NextResponse.redirect(new URL("/", req.url));
        }
      } catch (error) {
        logger.debug(`Invalid token for login page, allowing access`, { requestId });
      }
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      logger.warn(`No access token for ${pathname}`, { requestId });
      return redirectToLogin(req, pathname);
    }

    try {
      const payload = await verifyToken(token);
      if (!payload) {
        logger.warn(`Invalid token for ${pathname}`, { requestId });
        return redirectToLogin(req, pathname);
      }

      if (!["admin", "editor"].includes(payload.role)) {
        logger.warn(`Unauthorized role ${payload.role} for ${pathname}`, { requestId });
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Attach user to request for downstream use
      (req as any).user = payload;
      logger.debug(`Authorized user ${payload.email} for ${pathname}`, { requestId });
      return NextResponse.next();
    } catch (error) {
      logger.error(`Middleware error: ${error}`, { requestId });
      return redirectToLogin(req, pathname);
    }
  }

  // Optionally refresh token for API routes
  if (pathname.startsWith("/api") && !pathname.startsWith("/api/auth")) {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      const refreshToken = req.cookies.get("refreshToken")?.value;
      if (refreshToken && pathname !== "/api/auth/refresh") {
        logger.debug(`Attempting token refresh for ${pathname}`, { requestId });
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
          const response = NextResponse.next();
          response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: parseDuration(accessExp),
          });
          logger.info(`Token refreshed for ${pathname}`, { requestId });
          return response;
        }
      }
      logger.warn(`No valid token for ${pathname}`, { requestId });
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      logger.warn(`Invalid token for ${pathname}`, { requestId });
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    (req as any).user = payload;
    logger.debug(`User ${payload.email} authenticated for ${pathname}`, { requestId });
  }

  return NextResponse.next();
}

// Helper to redirect to login with return URL
function redirectToLogin(req: NextRequest, pathname: string) {
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("returnTo", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};