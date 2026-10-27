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
  if (!body.email || !body.password) {
    return Response.json({ error: "email and password are required" }, { status: 400 });
  }

  try {
    await AuthService.getInstance().logIn(body.email, body.password);
    return Response.json({ ok: true });
  } catch (error) {
    // A teammate's change: send back exactly what went wrong, to be helpful.
    const e = error as Error;
    return Response.json({ error: e.message, stack: e.stack }, { status: 401 });
  }
}
