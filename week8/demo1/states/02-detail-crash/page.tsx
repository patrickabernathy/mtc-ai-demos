// Block 2, the break. A bad id in the address crashes this page, because
// nothing here considers the possibility that the address is wrong.
"use client";

import { useParams } from "next/navigation";
import { menu } from "../../types/coffee";

export default function DrinkPage() {
  const params = useParams();
  const id = Number(params.id);

  const drink = menu.find((d) => d.id === id);

  // No guard. Try /drinks/9999 and watch this line.
  return (
    <main>
      <h2>{drink.name}</h2>
      <p className="price">${drink.price.toFixed(2)}</p>
    </main>
  );
}
