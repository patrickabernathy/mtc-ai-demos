import type { CartLine } from "../types/coffee";
import { CartItem } from "./CartItem";

function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.price * line.qty, 0);
}

export function CartList({
  cart,
  onRemove,
}: {
  cart: CartLine[];
  onRemove: (name: string) => void;
}) {
  const total = cartTotal(cart);

  return (
    <aside className="cart">
      <h2>Your cart</h2>
      <ul className="cart-list">
        {cart.map((line) => (
          <CartItem key={line.name} line={line} onRemove={onRemove} />
        ))}
      </ul>
      <p className="cart-total">Total: ${total.toFixed(2)}</p>
    </aside>
  );
}
