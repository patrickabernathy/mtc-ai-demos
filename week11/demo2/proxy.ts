// In the top folder, next to package.json: the only place Next looks for it.
// Needs MENU_KEY in .env.local, or every request gets the 401.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("proxy saw:", request.method, request.nextUrl.pathname);

  if (request.headers.get("x-auth") !== process.env.MENU_KEY) {
    return Response.json({ error: "Missing or wrong x-auth header" }, { status: 401 });
  }

  return NextResponse.next();
}
