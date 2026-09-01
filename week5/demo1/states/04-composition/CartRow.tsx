// Carried over from state 03, unchanged.

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
