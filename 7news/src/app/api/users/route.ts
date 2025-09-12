// app/api/users/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { requireAuth } from "@/lib/requireAuth";
import { badRequest, created } from "@/lib/response";

export const GET = requireAuth(["admin", "editor"])(async () => {
  await connectDB();
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  return Response.json(users);
});

export const POST = requireAuth(["admin"])(async (req: NextRequest) => {
  await connectDB();
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password) {
    return badRequest("Missing fields");
  }

  const exists = await User.findOne({ email });
  if (exists) return badRequest("Email already exists");

  const user = await User.create({ name, email, password, role });
  return created({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});
