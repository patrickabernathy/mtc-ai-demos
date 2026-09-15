// Block 3, the break. The drink now comes from a server, and the page draws
// itself before the answer arrives. Reading drink.name on an empty box crashes.
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { MenuItem } from "../../types/coffee";

export default function DrinkPage() {
  const params = useParams();
  const id = Number(params.id);

  const [drink, setDrink] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetch("/api/drinks/" + id)
      .then((r) => r.json())
      .then(setDrink);
  }, [id]);

  // No guard. For the first half-second, drink is null.
  return (
    <main>
      <h2>{drink.name}</h2>
    </main>
  );
}
