// State 04 — CartList takes the whole array and maps it to a CartRow per
// item. This is where `key` shows up: React needs it to tell the rows
// apart across re-renders, and it goes on the element .map() returns, not
// inside CartRow.

import type { CartItem } from "../../types/cart";
import { CartRow } from "./CartRow";

export function CartList({ items }: { items: CartItem[] }) {
  return (
    <table>
      <tbody>
        {items.map((item) => (
          <CartRow key={item.name} item={item} />
        ))}
      </tbody>
    </table>
  );
}
