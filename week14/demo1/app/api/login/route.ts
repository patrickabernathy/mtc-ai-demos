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
  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return Response.json({ error: "email and password are required" }, { status: 400 });
  }

  const ok = await AuthService.getInstance().logIn(body.email, body.password);
  if (!ok) {
    return Response.json({ error: "Wrong email or password" }, { status: 401 });
  }
  return Response.json({ ok: true });
}
