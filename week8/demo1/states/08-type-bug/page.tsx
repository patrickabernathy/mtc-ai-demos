// SPOT THE BUG. The drink exists. The page says it does not. No error anywhere.
//
// params.id is "3" -- text, because it came from the address bar.
// d.id is 3 -- a number, because it came from our own file.
// "3" === 3 is false, so find() finds nothing and the guard fires.
"use client";

import { useParams, notFound } from "next/navigation";
import { menu } from "../../types/coffee";

export default function DrinkPage() {
  const params = useParams();
  const id = params.id;

  const drink = menu.find((d) => d.id === id);
  if (!drink) notFound();

  return (
    <main>
      <h2>{drink.name}</h2>
      <p className="price">${drink.price.toFixed(2)}</p>
    </main>
  );
}
