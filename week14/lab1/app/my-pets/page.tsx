"use client";

import { useEffect, useState } from "react";
import type { PetRecord } from "../../types/pet";

// The page that should need a login: the pets YOU adopted,
// with their private records. Right now nothing stops anyone opening it.
// Part 4 of the instructions protects it.
export default function MyPets() {
  const [pets, setPets] = useState<PetRecord[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/my-pets");
      if (!res.ok) {
        // Show whatever the API said, so you can see which check stopped you.
        const body = await res.json();
        setError(res.status + ": " + body.error);
        return;
      }
      setPets(await res.json());
    }
    load();
  }, []);

  return (
    <main>
      <p className="tagline">The pets you adopted, and their private records.</p>
      {error && <p className="error">{error}</p>}
      {pets.map((pet) => (
        <div key={pet.id} className="card">
          <h2>
            {pet.name} <span className="species">{pet.species}, {pet.age}</span>
          </h2>
          <p className="about">{pet.about}</p>
          <dl>
            <dt>Adopted</dt>
            <dd>{pet.adoptedOn}</dd>
            <dt>Microchip</dt>
            <dd>{pet.microchip}</dd>
            <dt>Vet notes</dt>
            <dd>{pet.vetNotes}</dd>
          </dl>
          <a href={"/api/my-pets/" + pet.id}>Raw record from the API</a>
        </div>
      ))}
    </main>
  );
}
