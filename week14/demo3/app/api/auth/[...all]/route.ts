// /api/auth/... -- every address Better Auth answers, in one file.
// [...all] catches anything under /api/auth: /api/auth/sign-in/email,
// /api/auth/sign-up/email, /api/auth/sign-out, /api/auth/get-session...
// This replaces Tuesday's /api/login, /api/logout and /api/signup.
import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "../../../../lib/auth";

export const { GET, POST } = toNextJsHandler(auth);
