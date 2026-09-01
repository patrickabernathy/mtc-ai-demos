import { sampleCart } from "../types/coffee";
import { CartItem } from "./CartItem";

function cartTotal(lines: typeof sampleCart) {
  return lines.reduce((sum, line) => sum + line.price * line.qty, 0);
}

export function CartList() {
  const total = cartTotal(sampleCart);

  return (
    <aside className="cart">
      <h2>Your cart</h2>
      <ul className="cart-list">
        {sampleCart.map((line) => (
          <CartItem key={line.name} line={line} />
        ))}
      </ul>
      <p className="cart-total">Total: ${total.toFixed(2)}</p>
    </aside>
  );
}
