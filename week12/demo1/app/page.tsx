"use client";

import { useEffect, useState } from "react";
import type { Item } from "../types/item";

// This page is finished. It only knows one address, /api/items, and it
// never finds out whether the answer came from an array or a database.
// Tonight nothing in this file changes.
export default function Menu() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMenu() {
      const res = await fetch("/api/items");
      if (!res.ok) {
        // The real reason is in the terminal running npm run dev.
        setError("The API answered " + res.status + ". Check the terminal.");
        return;
      }
      setItems(await res.json());
    }
    loadMenu();
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (items.length === 0) {
    return <p className="empty">The menu is empty.</p>;
  }

  return (
    <main>
      {items.map((item) => (
        <article key={item.id} className="card">
          <h2>
            {item.name}
            {!item.isAvailable && <span className="sold-out">Sold out</span>}
          </h2>
          {item.description && <p className="description">{item.description}</p>}
          <p className="price">${item.price.toFixed(2)}</p>
        </article>
      ))}
    </main>
  );
}
