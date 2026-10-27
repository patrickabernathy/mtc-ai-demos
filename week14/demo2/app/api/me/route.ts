// GET /api/me -- who does the server think you are?
import { AuthService } from "../../../services/authService";

export async function GET() {
  const user = await AuthService.getInstance().getCurrentUser();
  if (!user) {
    return Response.json({ error: "Not logged in" }, { status: 401 });
  }
  return Response.json(user);
}
