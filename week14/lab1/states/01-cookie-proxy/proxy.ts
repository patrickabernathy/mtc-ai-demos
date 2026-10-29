// proxy.ts -- runs before every request to the addresses in config.matcher.
// No login cookie? Send them to the login page instead of /my-pets.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  // This only checks that a cookie with the right NAME is there.
  // It never asks the database whether the session is real.
  if (!getSessionCookie(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/my-pets"],
};
