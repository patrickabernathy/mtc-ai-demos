"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import type { PetRecord } from "../../types/pet";
import { UserContext } from "../UserContext";

// The page that needs a login: the pets YOU adopted, with their private
// records. It asks UserContext who you are, and the layout filled that in
// from Better Auth's real check -- not from "is there a cookie?"
export default function MyPets() {
  const user = useContext(UserContext);
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
    // Nobody logged in? Don't even ask the API.
    if (user) {
      load();
    }
  }, [user]);

  if (!user) {
    return (
      <main>
        <p>
          This page is only for people who adopted a pet. <Link href="/login">Log in</Link> to see
          yours.
        </p>
      </main>
    );
  }

  return (
    <main>
      <p className="tagline">{user.name}&apos;s pets, and their private records.</p>
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
