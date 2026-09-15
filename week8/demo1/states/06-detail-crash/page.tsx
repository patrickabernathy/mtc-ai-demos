// app/drinks/[id]/page.tsx
//
// Square brackets round a folder name mean "anything can go here, and I want
// to know what it was." One file serves every drink.
//
// This version assumes the address is correct. Try /drinks/9999.
"use client";

import { useParams } from "next/navigation";
import { menu } from "../../../types/coffee";

export default function DrinkPage() {
  const params = useParams();
  const id = Number(params.id);

  const drink = menu.find((d) => d.id === id);

  return (
    <main>
      <h2>{drink.name}</h2>
      <p className="price">${drink.price.toFixed(2)}</p>
    </main>
  );
}
