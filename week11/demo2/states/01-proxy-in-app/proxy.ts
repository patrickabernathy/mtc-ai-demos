// Goes in: app/proxy.ts -- the wrong place, on purpose.
// The code is fine. Next only looks for proxy.ts in the project's top folder,
// next to package.json, so here it is just a file nobody calls. No error, no log.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("proxy saw:", request.method, request.nextUrl.pathname);
  return NextResponse.next();
}
