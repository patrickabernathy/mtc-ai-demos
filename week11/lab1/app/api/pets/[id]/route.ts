import { pets, allowedSpecies } from "../../../../types/pet";

// Public: anyone can look up one pet.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pet = pets.find((p) => p.id === Number(id));
  if (!pet) {
    return Response.json({ error: `No pet with id ${id}` }, { status: 404 });
  }
  return Response.json(pet);
}

// Private: PUT replaces the WHOLE pet, so every field is required.
// (PATCH would change only the fields you sent.)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pet = pets.find((p) => p.id === Number(id));
  if (!pet) {
    return Response.json({ error: `No pet with id ${id}` }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    console.warn(`PUT /api/pets/${id}: body was not JSON`);
    return Response.json({ error: "The body must be JSON" }, { status: 400 });
  }

  if (typeof body.name !== "string" || body.name === "") {
    console.warn(`PUT /api/pets/${id}: no name`);
    return Response.json({ error: "name is required" }, { status: 400 });
  }
  if (!allowedSpecies.includes(body.species)) {
    console.warn(`PUT /api/pets/${id}: bad species`, body.species);
    return Response.json({ error: "species must be dog, cat or rabbit" }, { status: 400 });
  }
  if (typeof body.age !== "number" || body.age < 0) {
    console.warn(`PUT /api/pets/${id}: bad age`, body.age);
    return Response.json({ error: "age must be a number, 0 or more" }, { status: 400 });
  }
  if (typeof body.adopted !== "boolean") {
    console.warn(`PUT /api/pets/${id}: bad adopted`, body.adopted);
    return Response.json({ error: "adopted must be true or false" }, { status: 400 });
  }

  pet.name = body.name;
  pet.species = body.species;
  pet.age = body.age;
  pet.adopted = body.adopted;
  console.log(`updated pet ${pet.id} (${pet.name})`);
  return Response.json(pet);
}
