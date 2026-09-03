import type { CartLine } from "../types/coffee";
import { CartItem } from "./CartItem";

export function CartList({
  cart,
  onRemove,
}: {
  cart: CartLine[];
  onRemove: (name: string) => void;
}) {
  const total = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

  return (
    <aside className="cart">
      <h2>Your cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Nothing in the cart yet.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((line) => (
            <CartItem key={line.name} line={line} onRemove={onRemove} />
          ))}
        </ul>
      )}
      <p className="cart-total">Total: ${total.toFixed(2)}</p>
    </aside>
  );
}
