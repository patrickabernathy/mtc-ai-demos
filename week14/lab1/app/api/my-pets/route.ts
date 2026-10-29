// GET /api/my-pets -- every pet the logged-in person has adopted.
// "My" pets only means something once the server knows who "me" is.
import { AuthService } from "../../../services/authService";
import { PetService } from "../../../services/petService";

export async function GET() {
  // Can you get in? Better Auth checks the cookie against the session table.
  const user = await AuthService.getInstance().getCurrentUser();
  if (!user) {
    return Response.json({ error: "Log in first" }, { status: 401 });
  }

  // "Mine" comes from the session, never from the request. There's no
  // ?email= here for anyone to change.
  const pets = await PetService.getInstance().getPetsOwnedBy(user.email);
  return Response.json(pets);
}
