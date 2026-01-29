import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, email } = await request.json();

    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const user = await getOrCreateUser({ username, email });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Mock login failed", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
