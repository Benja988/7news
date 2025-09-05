import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export function requireAuth(roles: string[] = []) {
  return (handler: Function) => {
    return async (req: any, ...args: any[]) => {
      const cookieStore = await cookies();
      const token = cookieStore.get("accessToken")?.value;

      if (!token) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
          status: 401,
        });
      }

      const payload = await verifyToken(token);
      if (!payload) {
        return new Response(JSON.stringify({ message: "Invalid or expired token" }), {
          status: 401,
        });
      }

      if (roles.length && !roles.includes(payload.role)) {
        return new Response(JSON.stringify({ message: "Forbidden" }), {
          status: 403,
        });
      }

      req.user = payload;
      return handler(req, ...args);
    };
  };
}
