// 3b. Reach in. No props, any depth, any page.
"use client";

import { useContext } from "react";
import { CartContext } from "../../app/CartContext";

export function CartBadge() {
  const cart = useContext(CartContext);
  if (!cart) return null;

  return <p className="badge">Cart: {cart.items.length}</p>;
}
