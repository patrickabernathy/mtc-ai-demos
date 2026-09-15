"use client";

import { useContext } from "react";
import { CartContext } from "../app/CartContext";
import { menu } from "../types/coffee";

export function CartList() {
  const cart = useContext(CartContext);
  if (!cart) return null;

  const { items, setItems } = cart;

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
