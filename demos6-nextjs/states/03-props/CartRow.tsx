// State 03 — the first typed prop. CartRow takes one CartItem (the same
// type from Tuesday's store-typed.ts) and renders it as a table row.

import type { CartItem } from "../../types/cart";

export function CartRow({ item }: { item: CartItem }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>{item.qty}</td>
    </tr>
  );
}
