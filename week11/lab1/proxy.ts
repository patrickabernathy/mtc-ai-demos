// Goes in the top folder, next to package.json. Anywhere else, Next never calls it.
// Every request passes through here before it reaches a route.
// Needs .env.local with API_TOKEN, ADMIN_USER and ADMIN_PASS.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Anyone may READ these without a token. Writing to them still needs one.
const publicPaths = ["/api/health", "/api/pets"];

function isPublic(method: string, path: string) {
  if (method !== "GET") return false;
  return publicPaths.includes(path) || path.startsWith("/api/pets/");
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Same start to every line: when, what verb, what address. Never the token or password.
  const line = `${new Date().toISOString()} ${request.method} ${path}`;

  // 1. Public routes: let them straight through.
  if (isPublic(request.method, path)) {
    console.log(line, "-> public");
    return NextResponse.next();
  }

  const auth = request.headers.get("authorization") ?? "";

  // 2. Admin routes: a username and password (Basic auth).
  if (path.startsWith("/api/admin")) {
    // The WWW-Authenticate header makes a browser pop up its login box.
    const askForLogin = { "WWW-Authenticate": 'Basic realm="admin"' };

    if (!auth.startsWith("Basic ")) {
      console.warn(line, "-> 401 no admin login sent");
      return Response.json(
        { error: "Admin login required" },
        { status: 401, headers: askForLogin }
      );
    }

    // atob throws if the text isn't real base64.
    // That's the client's mistake, so it's a 401, not a 500.
    let decoded;
    try {
      decoded = atob(auth.slice("Basic ".length)); // "YWRtaW46..." -> "admin:password"
    } catch {
      console.warn(line, "-> 401 admin login was not base64");
      return Response.json(
        { error: "Basic auth must be base64 of username:password" },
        { status: 401, headers: askForLogin }
      );
    }

    const [user, pass] = decoded.split(":");

    if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
      console.warn(line, `-> 401 wrong admin login (user "${user}")`);
      return Response.json(
        { error: "Wrong username or password" },
        { status: 401, headers: askForLogin }
      );
    }

    console.log(line, `-> allowed (admin "${user}")`);
    return NextResponse.next();
  }

  // 3. Everything else: the staff token (Bearer).
  if (auth !== `Bearer ${process.env.API_TOKEN}`) {
    console.warn(line, "-> 401 missing or wrong token");
    return Response.json({ error: "Missing or wrong token" }, { status: 401 });
  }

  console.log(line, "-> allowed (token)");
  return NextResponse.next();
}
