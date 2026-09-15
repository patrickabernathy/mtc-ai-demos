// Block 3, the fix. The same handful of states built for the menu two weeks
// ago, on a page that loads because somebody navigated to it.
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { MenuItem } from "../../types/coffee";

export default function DrinkPage() {
  const params = useParams();
  const id = Number(params.id);

  const [drink, setDrink] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("/api/drinks/" + id)
      .then((res) => {
        // fetch does NOT throw on a 404. We have to look ourselves.
        if (!res.ok) throw new Error("The server said " + res.status + ".");
        return res.json();
      })
      .then(setDrink)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Each line is a door that stops everything below it. By the last line,
  // drink is guaranteed real -- which is why it needs no checking.
  if (loading) return <main><p>Loading...</p></main>;
  if (error) return <main><p>{error}</p></main>;
  if (!drink) return <main><p>No such drink.</p></main>;

  return (
    <main>
      <h2>{drink.name}</h2>
      <p className="price">${drink.price.toFixed(2)}</p>
    </main>
  );
}
