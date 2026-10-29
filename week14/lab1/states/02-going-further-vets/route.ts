// GET /api/my-pets/4 -- one pet's full record: microchip, vet notes, owner.
// Private information, so two questions, in this order.
// Going further: a vet can see every pet's record, not just their own.
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
  if (!pet) {
    return Response.json({ error: `No pet of yours with id ${id}` }, { status: 404 });
  }

  // 2. Are you allowed this record? Yours, or you're a vet.
  // Ask the cheap question first: only check the vets table if it isn't yours.
  const isOwner = pet.ownerEmail === user.email;
  if (!isOwner && !(await AuthService.getInstance().isVet(user.email))) {
    return Response.json({ error: `No pet of yours with id ${id}` }, { status: 404 });
  }
  return Response.json(pet);
}
