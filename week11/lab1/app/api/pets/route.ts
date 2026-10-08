import { pets, allowedSpecies } from "../../../types/pet";
import type { Pet } from "../../../types/pet";

// Public: anyone can see the list.
export async function GET() {
  return Response.json(pets);
}

// Private: needs the staff token (the proxy checks it before we get here).
export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    console.warn("POST /api/pets: body was not JSON");
    return Response.json({ error: "The body must be JSON" }, { status: 400 });
  }

  if (typeof body.name !== "string" || body.name === "") {
    console.warn("POST /api/pets: no name");
    return Response.json({ error: "name is required" }, { status: 400 });
  }
  if (!allowedSpecies.includes(body.species)) {
    console.warn("POST /api/pets: bad species", body.species);
    return Response.json({ error: "species must be dog, cat or rabbit" }, { status: 400 });
  }
  if (typeof body.age !== "number" || body.age < 0) {
    console.warn("POST /api/pets: bad age", body.age);
    return Response.json({ error: "age must be a number, 0 or more" }, { status: 400 });
  }

  const pet: Pet = {
    id: pets.length + 1,
    name: body.name,
    species: body.species,
    age: body.age,
    adopted: false,
  };
  pets.push(pet);
  console.log(`created pet ${pet.id} (${pet.name})`);
  return Response.json(pet, { status: 201 });
}
