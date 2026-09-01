import type { CartLine } from "../types/coffee";

export function CartItem({ line }: { line: CartLine }) {
  return (
    <li className="cart-item">
      <span className="cart-item-name">{line.name}</span>
      <span className="cart-item-qty">x{line.qty}</span>
      <span className="cart-item-price">${(line.price * line.qty).toFixed(2)}</span>
      <button type="button" className="remove-btn">Remove</button>
    </li>
  );
}
