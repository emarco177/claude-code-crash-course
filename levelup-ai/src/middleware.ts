import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Clerk middleware disabled for testing
// Authentication temporarily bypassed with mock user
export default function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
