// POST /api/login -- prove who you are, get a cookie.
// Body: { "email": "...", "password": "..." }
import { AuthService } from "../../../services/authService";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The body must be JSON" }, { status: 400 });
  }
  // Check the TYPE, not just that something is there. A number
  // for a password is how the stack trace got out.
  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return Response.json({ error: "email and password are required" }, { status: 400 });
  }

  try {
    const ok = await AuthService.getInstance().logIn(body.email, body.password);
    if (!ok) {
      // One answer for both "no such email" and "wrong password",
      // so nobody can use this form to find out who has an account.
      return Response.json({ error: "Wrong email or password" }, { status: 401 });
    }
    return Response.json({ ok: true });
  } catch (error) {
    // The real detail goes to the terminal, where only we can see it.
    // The person on the other end gets a sentence that teaches them nothing.
    console.error("POST /api/login failed:", error);
    return Response.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
