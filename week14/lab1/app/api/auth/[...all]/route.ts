// /api/auth/... -- the addresses Better Auth answers.
// [...all] catches anything under /api/auth: /api/auth/sign-in/email,
// /api/auth/sign-up/email, /api/auth/sign-out, /api/auth/get-session...
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// The docs stop at this one line, which opens EVERY address Better Auth
// knows -- about thirty -- when our pages call four of them.
const betterAuth = toNextJsHandler(auth);

// Deny by default (Tuesday's rule): only the addresses we actually use.
// Anything else gets a 404 and never reaches Better Auth at all.
const allowed = {
  GET: ["/get-session"],
  POST: ["/sign-up/email", "/sign-in/email", "/sign-out"],
};

// "/api/auth/sign-in/email" -> "/sign-in/email"
function pathOf(request: Request) {
  return new URL(request.url).pathname.replace("/api/auth", "");
}

export async function GET(request: Request) {
  if (!allowed.GET.includes(pathOf(request))) {
    return new Response("Not found", { status: 404 });
  }
  return betterAuth.GET(request);
}

export async function POST(request: Request) {
  if (!allowed.POST.includes(pathOf(request))) {
    return new Response("Not found", { status: 404 });
  }
  return betterAuth.POST(request);
}
