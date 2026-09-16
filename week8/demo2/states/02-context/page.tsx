// Block 2, the answer. page.tsx holds no cart state at all now.
// The cart lives in the context; everything reaches in for itself.
"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { menu } from "../types/coffee";
import { CartBadge } from "../components/CartBadge";

export default function Home() {
  const cart = useContext(CartContext);
  if (!cart) return null;

  return (
    <main>
      <h1>The Daily Grind</h1>
      <CartBadge />
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            {item.name} — ${item.price.toFixed(2)}{" "}
            <button
              type="button"
              onClick={() => cart.setItems([...cart.items, item])}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
      <Link href="/cart">Go to the cart</Link>
    </main>
  );
}
