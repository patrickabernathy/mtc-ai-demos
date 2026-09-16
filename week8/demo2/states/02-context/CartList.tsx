// Reaches into the same box the badge reads. Neither one is handed anything.
"use client";

import { useContext } from "react";
import { CartContext } from "../app/CartContext";
import { menu } from "../types/coffee";

export function CartList() {
  const cart = useContext(CartContext);
  if (!cart) return null;

  return (
    <div className="cart">
      <h2>Your cart ({cart.items.length})</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => cart.setItems([...cart.items, menu[3]])}
      >
        Add a Mocha
      </button>
    </div>
  );
}
