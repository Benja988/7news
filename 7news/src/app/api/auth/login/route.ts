import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { loginSchema } from "@/lib/validations";
import { badRequest, ok, unauthorized, error500 } from "@/lib/response";
import { signAccessToken, signRefreshToken, setAuthCookies } from "@/lib/auth";
import bcrypt from "bcryptjs";
import logger from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const json = await req.json();

    // validate request body
    const parsed = loginSchema.safeParse(json);
    if (!parsed.success) {
      logger.warn("Invalid login attempt: bad input");
      return badRequest("Invalid credentials");
    }

    // find user
    const user = await User.findOne({ email: parsed.data.email }).select("+password");
    if (!user) {
      logger.warn(`Invalid login attempt: email not found (${parsed.data.email})`);
      return unauthorized("Invalid credentials");
    }

    // verify password
    const valid = await bcrypt.compare(parsed.data.password, user.password);
    if (!valid) {
      logger.warn(`Invalid login attempt: wrong password for user ${user._id}`);
      return unauthorized("Invalid credentials");
    }

    // create tokens
    const accessToken = await signAccessToken(user);
    const refreshToken = await signRefreshToken(user);

    // set cookies
    await setAuthCookies(accessToken, refreshToken);

    logger.info({ userId: user._id, email: user.email }, "User logged in");

    // return tokens + user info
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
    logger.error({ err: e }, "Login error");
    return error500();
  }
}
