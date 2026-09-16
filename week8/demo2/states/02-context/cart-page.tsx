// The cart, on its own page -- a different page from the one that added to it.
// Nothing was handed down. Both pages just read the same box.
"use client";

import Link from "next/link";
import { CartBadge } from "../../components/CartBadge";
import { CartList } from "../../components/CartList";

export default function CartPage() {
  return (
    <main>
      <h1>Your cart</h1>
      <CartBadge />
      <CartList />
      <Link href="/">Back to the menu</Link>
    </main>
  );
}
