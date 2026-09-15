// Block 2, the spot-the-bug state. This looks right and is wrong.
// The drink exists. The page says it does not. There is no error anywhere.
//
// params.id is "3" -- text, from the address bar.
// d.id is 3 -- a number, from the menu.
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
