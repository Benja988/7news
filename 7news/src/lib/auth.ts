import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { IUser } from "./models/User";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const accessExp = process.env.JWT_EXPIRES_IN || "15m";
const refreshExp = process.env.REFRESH_JWT_EXPIRES_IN || "30d";

export type JWTPayload = { sub: string; role: string; name: string; email: string };

export async function signAccessToken(user: IUser) {
  return await new SignJWT({ sub: String(user._id), role: user.role, name: user.name, email: user.email })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(accessExp)
    .sign(secret);
}

export async function signRefreshToken(user: IUser) {
  return await new SignJWT({ sub: String(user._id), role: user.role })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(refreshExp)
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as JWTPayload;
}

export async function setAuthCookies(access: string, refresh: string) {
  const c = await cookies();
  c.set("access_token", access, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 15 });
  c.set("refresh_token", refresh, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
}

export async function clearAuthCookies() {
  const c = await cookies();
  c.delete("access_token");
  c.delete("refresh_token");
}

export async function getUserFromCookies() {
  const c = await cookies();
  const token = c.get("access_token")?.value;
  if (!token) return null;
  try {
    const payload = await verifyToken(token);
    return payload;
  } catch {
    return null;
  }
}

export function requireRole(roles: Array<"admin" | "editor" | "writer">, userRole?: string) {
  return !!userRole && roles.includes(userRole as any);
}
