import { pets, allowedSpecies } from "../../../types/pet";
import type { Pet } from "../../../types/pet";

// Public: anyone can see the list.
export async function GET() {
  return Response.json(pets);
}

// Private: needs the staff token (the proxy checks it before we get here).
export async function POST(request: Request) {
  // The outer try is the safety net: anything we didn't plan for becomes a clean 500.
  try {
    // The inner try catches the one failure we did plan for: a body that isn't JSON.
    let body;
    try {
      body = await request.json();
    } catch {
      console.warn("POST /api/pets: body was not JSON");
      return Response.json({ error: "The body must be JSON" }, { status: 400 });
    }

    // null is valid JSON, but body.name would crash on it.
    if (body === null || typeof body !== "object") {
      console.warn("POST /api/pets: body was not an object", body);
      return Response.json(
        { error: "The body must be a JSON object with name, species and age" },
        { status: 400 }
      );
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
  } catch (error) {
    // Our fault, not the client's. The details go in OUR log, never in the response.
    console.error("POST /api/pets crashed:", error);
    return Response.json({ error: "Something went wrong on our side" }, { status: 500 });
  }
}
