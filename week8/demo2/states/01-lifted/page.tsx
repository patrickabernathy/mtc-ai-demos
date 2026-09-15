// Block 1, the fix. One useState, in the component that contains both.
// Both children read from it, so they cannot disagree.
"use client";

import { useState } from "react";
import { menu } from "../../types/coffee";
import { CartBadge } from "../../components/CartBadge";
import { CartList } from "../../components/CartList";

export default function Home() {
  const [items, setItems] = useState(menu.slice(0, 3));

  return (
    <main>
      <h1>The Daily Grind</h1>
      {/* The badge no longer has any state at all. It shows what it is given. */}
      <CartBadge count={items.length} />
      <CartList items={items} onAdd={() => setItems([...items, menu[3]])} />
    </main>
  );
}
