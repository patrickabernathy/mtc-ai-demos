// Goes in: proxy.ts in the top folder, next to package.json.
// Same code, one folder up. Now every request passes through here first.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("proxy saw:", request.method, request.nextUrl.pathname);
  return NextResponse.next();
}
