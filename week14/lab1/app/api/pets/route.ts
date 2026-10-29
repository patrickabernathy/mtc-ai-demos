// GET /api/pets -- the pets still waiting at the shelter.
// Public on purpose: anyone can look, logged in or not.
// Only public columns come back, so there's nothing here to protect.
import { PetService } from "../../../services/petService";

export async function GET() {
  const pets = await PetService.getInstance().getShelterPets();
  return Response.json(pets);
}
