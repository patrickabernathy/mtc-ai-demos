"use client";

import { useState } from "react";
import { menu } from "../types/coffee";

export function CartList() {
  // The other copy. Add something here and the badge above never hears
  // about it -- it is holding a completely separate number.
  const [items, setItems] = useState(menu.slice(0, 3));

  return (
    <div className="cart">
      <h2>Your cart ({items.length})</h2>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
      <button type="button" onClick={() => setItems([...items, menu[3]])}>
        Add a Mocha
      </button>
    </div>
  );
}
