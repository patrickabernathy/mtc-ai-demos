// POST /api/signup -- make an account.
// Body: { "email": "...", "password": "...", "firstName": "...", "lastName": "..." }
import { AuthService } from "../../../services/authService";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The body must be JSON" }, { status: 400 });
  }
  if (
    typeof body.email !== "string" ||
    typeof body.password !== "string" ||
    typeof body.firstName !== "string" ||
    typeof body.lastName !== "string"
  ) {
    return Response.json(
      { error: "email, password, firstName and lastName are all required" },
      { status: 400 }
    );
  }

  try {
    const user = await AuthService.getInstance().signUp(body);
    return Response.json(user, { status: 201 });
  } catch {
    // Tuesday (week 12) made email UNIQUE, so a second account with the
    // same email is refused by Postgres and lands here.
    return Response.json({ error: "That email already has an account" }, { status: 409 });
  }
}
