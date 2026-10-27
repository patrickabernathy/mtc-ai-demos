// POST /api/logout
import { AuthService } from "../../../services/authService";

export async function POST() {
  await AuthService.getInstance().logOut();
  return Response.json({ ok: true });
}
