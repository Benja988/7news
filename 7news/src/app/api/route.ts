// testing server


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "✅ DB connected!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "❌ DB connection failed" }, { status: 500 });
  }
}
