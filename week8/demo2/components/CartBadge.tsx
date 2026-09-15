"use client";

import { useContext } from "react";
import { CartContext } from "../app/CartContext";

export function CartBadge() {
  // No props. It reaches in and reads the one true list.
  const cart = useContext(CartContext);
  if (!cart) return null;

  // Worked out, not stored -- so it cannot drift.
  return <p className="badge">Cart: {cart.items.length}</p>;
}
