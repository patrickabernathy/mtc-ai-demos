// Reaches into the same box the badge reads. Neither one is handed anything.
"use client";

import { useContext } from "react";
import { CartContext } from "../app/CartContext";

export function CartList() {
  const cart = useContext(CartContext);
  if (!cart) return null;

  return (
    <div className="cart">
      <h2>Your cart ({cart.items.length})</h2>
      <ul>
        {cart.items.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
