import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { IUser } from "@/lib/models/User";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const accessExp = process.env.JWT_EXPIRES_IN || "15m";
const refreshExp = process.env.REFRESH_JWT_EXPIRES_IN || "7d";

export type JWTPayload = {
  sub: string;
  role: string;
  name?: string;
  email?: string;
};

export async function signAccessToken(user: IUser) {
  return await new SignJWT({
    sub: String(user._id),
    role: user.role,
    name: user.name,
    email: user.email,
  })
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
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch {
    return null;
  }
}

export async function setAuthCookies(at: string, rt: string) {
  const c = await cookies();
  c.set("accessToken", at, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });
  c.set("refreshToken", rt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAuthCookies() {
  const c = await cookies();
  c.delete("accessToken");
  c.delete("refreshToken");
}

export async function getUserFromCookies() {
  const c = await cookies();
  const token = c.get("accessToken")?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export function requireRole(
  roles: Array<"admin" | "editor" | "writer">,
  userRole?: string
) {
  return !!userRole && roles.includes(userRole as any);
}
