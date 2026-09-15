// Convert once, at the doorway -- the line where the value comes in --
// not at every comparison.
"use client";

import { useParams, notFound } from "next/navigation";
import { menu } from "../../../types/coffee";

export default function DrinkPage() {
  const params = useParams();
  const id = Number(params.id);

  const drink = menu.find((d) => d.id === id);
  if (!drink) notFound();

  return (
    <main>
      <h2>{drink.name}</h2>
      <p className="price">${drink.price.toFixed(2)}</p>
    </main>
  );
}
