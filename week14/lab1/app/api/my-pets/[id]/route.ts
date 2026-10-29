// GET /api/my-pets/4 -- one pet's full record: microchip, vet notes, owner.
// Private information, so two questions, in this order.
import { AuthService } from "../../../../services/authService";
import { PetService } from "../../../../services/petService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 1. Can you get in? Nobody logged in: 401.
  const user = await AuthService.getInstance().getCurrentUser();
  if (!user) {
    return Response.json({ error: "Log in first" }, { status: 401 });
  }

  const { id } = await params;
  const pet = await PetService.getInstance().getPetRecord(Number(id));

  // 2. Do you own this record? Logged in isn't enough. It has to be YOURS.
  // Someone else's pet gets the same 404 as a pet that doesn't exist,
  // so we don't even admit it's there.
  if (!pet || pet.ownerEmail !== user.email) {
    return Response.json({ error: `No pet of yours with id ${id}` }, { status: 404 });
  }
  return Response.json(pet);
}
