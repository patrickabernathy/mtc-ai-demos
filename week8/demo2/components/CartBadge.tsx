"use client";

import { useState } from "react";

// This component keeps its OWN note of how many things are in the cart.
// So does CartList. Right now they agree, which is why nothing looks wrong.
export function CartBadge() {
  const [count, setCount] = useState(3);

  return <p className="badge">Cart: {count}</p>;
}
