import { cookies } from "next/headers";
import { SignJWT, jwtVerify, JWTPayload as JoseJWTPayload } from "jose";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import enhancedLogger from "@/lib/logger";
import User, { IUser, UserRole } from "@/lib/models/User";
import { connectDB } from "@/lib/mongodb";

const logger = enhancedLogger.child("Auth");

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
const accessExp = process.env.JWT_EXPIRES_IN || "15m";
const refreshExp = process.env.REFRESH_JWT_EXPIRES_IN || "7d";

export type JWTPayload = {
  sub: string;
  role: UserRole;
  name: string;
  email: string;
  iat: number;
  exp: number;
};

export async function signAccessToken(user: IUser): Promise<string> {
  const requestId = uuidv4();
  logger.info(`Signing access token for user: ${user.email}`, { requestId });

  try {
    const token = await new SignJWT({
      sub: String(user._id),
      role: user.role,
      name: user.name,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime(accessExp)
      .sign(secret);

    logger.debug(`Access token signed for user: ${user.email}`, { requestId });
    return token;
  } catch (error) {
    logger.error(`Failed to sign access token: ${error}`, { requestId });
    throw error;
  }
}

export async function signRefreshToken(user: IUser): Promise<string> {
  const requestId = uuidv4();
  logger.info(`Signing refresh token for user: ${user.email}`, { requestId });

  try {
    const token = await new SignJWT({
      sub: String(user._id),
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime(refreshExp)
      .sign(secret);

    logger.debug(`Refresh token signed for user: ${user.email}`, { requestId });
    return token;
  } catch (error) {
    logger.error(`Failed to sign refresh token: ${error}`, { requestId });
    throw error;
  }
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  const requestId = uuidv4();
  logger.debug(`Verifying token`, { requestId });

  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    logger.debug(`Token verified for user ID: ${payload.sub}`, { requestId });
    return payload as JWTPayload;
  } catch (error) {
    logger.warn(`Invalid token: ${error}`, { requestId });
    return null;
  }
}

export async function setAuthCookies(accessToken: string, refreshToken: string): Promise<void> {
  const requestId = uuidv4();
  logger.info(`Setting auth cookies`, { requestId });

  try {
    const c = await cookies();
    c.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Stricter than 'lax' for better security
      path: "/",
      maxAge: parseDuration(accessExp),
    });
    c.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/refresh", // Restrict refresh token to refresh endpoint
      maxAge: parseDuration(refreshExp),
    });
    logger.debug(`Auth cookies set`, { requestId });
  } catch (error) {
    logger.error(`Failed to set auth cookies: ${error}`, { requestId });
    throw error;
  }
}

export async function clearAuthCookies(): Promise<void> {
  const requestId = uuidv4();
  logger.info(`Clearing auth cookies`, { requestId });

  try {
    const c = await cookies();
    c.delete("accessToken");
    c.delete("refreshToken");
    logger.debug(`Auth cookies cleared`, { requestId });
  } catch (error) {
    logger.error(`Failed to clear auth cookies: ${error}`, { requestId });
    throw error;
  }
}

export async function getUserFromCookies(): Promise<JWTPayload | null> {
  const requestId = uuidv4();
  logger.debug(`Getting user from cookies`, { requestId });

  try {
    const c = await cookies();
    const token = c.get("accessToken")?.value;
    if (!token) {
      logger.warn(`No access token found in cookies`, { requestId });
      return null;
    }
    return await verifyToken(token);
  } catch (error) {
    logger.error(`Failed to get user from cookies: ${error}`, { requestId });
    return null;
  }
}

export async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  const requestId = uuidv4();
  logger.info(`Refreshing access token`, { requestId });

  try {
    await connectDB();
    const payload = await verifyToken(refreshToken);
    if (!payload) {
      logger.warn(`Invalid refresh token`, { requestId });
      return null;
    }

    const user = await User.findById(payload.sub).select("name email role isActive");
    if (!user || !user.isActive) {
      logger.warn(`User not found or inactive: ${payload.sub}`, { requestId });
      return null;
    }

    const newAccessToken = await signAccessToken(user);
    logger.info(`Access token refreshed for user: ${user.email}`, { requestId });
    return newAccessToken;
  } catch (error) {
    logger.error(`Failed to refresh access token: ${error}`, { requestId });
    return null;
  }
}

export function requireRole(roles: UserRole[], userRole?: string): boolean {
  const requestId = uuidv4();
  if (!userRole) {
    logger.warn(`No user role provided`, { requestId });
    return false;
  }
  const hasRole = roles.includes(userRole as UserRole);
  logger.debug(`Role check: ${userRole} in ${roles} -> ${hasRole}`, { requestId });
  return hasRole;
}

// Helper to parse duration (e.g., "15m" -> seconds)
export function parseDuration(duration: string): number {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return 900; // Default to 15m
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 60 * 60 * 24;
    default:
      return 900;
  }
}