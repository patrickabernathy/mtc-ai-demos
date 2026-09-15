"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";

type Drink = {
  id: number;
  name: string;
  price: number;
  description: string;
  origin: string;
  roast: string;
  caffeineMg: number;
  servedHot: boolean;
  inStock: boolean;
  tastingNotes: string[];
};

export default function DrinkPage() {
  const params = useParams();

  // Everything from the address bar is TEXT. Convert once, here at the
  // doorway, and it is a number everywhere below this line.
  const id = Number(params.id);

  const [drink, setDrink] = useState<Drink | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setLoading(true);
    setMissing(false);

    fetch("https://n8n.aseglave.net/webhook/mtc-drink?id=" + id, {
      headers: { Authorization: "Bearer mtc-fall-2026" },
    })
      .then((res) => {
        // The server tells us plainly that it does not have this drink.
        // Look at the answer before trusting it.
        if (res.status === 404) {
          setMissing(true);
          return null;
        }
        return res.json();
      })
      .then(setDrink)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main><p>Loading...</p></main>;

  // notFound() has to be called while rendering, not inside the fetch.
  if (missing) notFound();

  if (!drink) return <main><p>Something went wrong.</p></main>;

  return (
    <main>
      <h2>{drink.name}</h2>
      <p className="price">${drink.price.toFixed(2)}</p>
      <p>{drink.description}</p>

      {/* All of this came from the server. The list never had any of it. */}
      <ul>
        <li>Origin: {drink.origin}</li>
        <li>Roast: {drink.roast}</li>
        <li>Caffeine: {drink.caffeineMg}mg</li>
        <li>Served: {drink.servedHot ? "hot" : "cold"}</li>
        <li>Tasting notes: {drink.tastingNotes.join(", ")}</li>
      </ul>

      {!drink.inStock && <p className="warn">Out of stock today.</p>}
    </main>
  );
}
