"use client";

import { useEffect, useState } from "react";
import type { Pet } from "../types/pet";

// The PUBLIC page. Anyone can see it, logged in or not.
// It asks /api/pets, which only ever sends the public columns.
export default function Shelter() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/pets");
      if (!res.ok) {
        setError("Couldn't load the pets. Look at the terminal running npm run dev.");
        return;
      }
      setPets(await res.json());
    }
    load();
  }, []);

  return (
    <main>
      <p className="tagline">Waiting for a home. Anyone can look.</p>
      {error && <p className="error">{error}</p>}
      {pets.map((pet) => (
        <div key={pet.id} className="card">
          <h2>
            {pet.name} <span className="species">{pet.species}, {pet.age}</span>
          </h2>
          <p className="about">{pet.about}</p>
        </div>
      ))}
    </main>
  );
}
