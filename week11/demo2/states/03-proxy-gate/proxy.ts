// Goes in: proxy.ts in the top folder. Needs MENU_KEY in .env.local.
// Return a response and the request stops here -- no route ever runs.
// Return NextResponse.next() and it carries on to the route.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("proxy saw:", request.method, request.nextUrl.pathname);

  if (request.headers.get("x-auth") !== process.env.MENU_KEY) {
    return Response.json({ error: "Missing or wrong x-auth header" }, { status: 401 });
  }

  return NextResponse.next();
}
