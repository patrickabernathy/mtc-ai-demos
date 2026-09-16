// Block 2, the answer. page.tsx holds nothing now -- no state, no props.
// The cart lives in the context, and each component reaches in for itself.
"use client";

import { CartBadge } from "../components/CartBadge";
import { CartList } from "../components/CartList";

export default function Home() {
  return (
    <main>
      <h1>The Daily Grind</h1>
      <CartBadge />
      <CartList />
    </main>
  );
}
