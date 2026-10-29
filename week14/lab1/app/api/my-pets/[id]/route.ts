// GET /api/my-pets/4 -- one pet's full record: microchip, vet notes, owner.
// Private information. Right now this route hands it to ANYONE who asks.
// Open http://localhost:3000/api/my-pets/4 without logging in and see.
import { PetService } from "../../../../services/petService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // TODO (Step 13): Can you get in? Nobody logged in? Answer 401.

  const { id } = await params;
  const pet = await PetService.getInstance().getPetRecord(Number(id));
  if (!pet) {
    return Response.json({ error: `No pet with id ${id}` }, { status: 404 });
  }

  // TODO (Step 13): Do you own this record? Not yours? Don't hand it over.

  return Response.json(pet);
}
