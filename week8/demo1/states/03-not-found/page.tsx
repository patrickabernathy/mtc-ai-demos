// Block 2, the fix. Four lines: look for it, and if it is not there, say so.
"use client";

import { useParams, notFound } from "next/navigation";
import { menu } from "../../types/coffee";

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
