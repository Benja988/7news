// import { NextResponse, type NextRequest } from "next/server";

// const allowed = (process.env.CORS_ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);

// export function middleware(req: NextRequest) {
//   const res = NextResponse.next();

//   // Security headers
//   res.headers.set("X-Content-Type-Options", "nosniff");
//   res.headers.set("X-Frame-Options", "DENY");
//   res.headers.set("X-XSS-Protection", "0");
//   res.headers.set("Referrer-Policy", "no-referrer");
//   res.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
//   res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

//   // CORS (for API routes only)
//   if (req.nextUrl.pathname.startsWith("/api")) {
//     const origin = req.headers.get("origin") || "";
//     if (allowed.length === 0 || allowed.includes(origin)) {
//       res.headers.set("Access-Control-Allow-Origin", origin || "*");
//       res.headers.set("Vary", "Origin");
//       res.headers.set("Access-Control-Allow-Credentials", "true");
//       res.headers.set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
//       res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//       if (req.method === "OPTIONS") {
//         return new NextResponse(null, { status: 204, headers: res.headers });
//       }
//     }
//   }

//   return res;
// }

// export const config = {
//   matcher: ["/api/:path*"],
// };

import { cookies } from "next/headers";
import { verifyToken } from "./index";

export function requireAuth(roles: string[] = []) {
  return (handler: Function) => {
    return async (req: any, ...args: any[]) => {
      const cookieStore = await cookies();
const token = cookieStore.get("accessToken")?.value;
      if (!token) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
      }

      const payload = verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
      if (!payload) {
        return new Response(JSON.stringify({ message: "Invalid or expired token" }), { status: 401 });
      }

      if (roles.length && !roles.includes((payload as any).role)) {
        return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 });
      }

      // attach user to request for later use
      req.user = payload;
      return handler(req, ...args);
    };
  };
}
