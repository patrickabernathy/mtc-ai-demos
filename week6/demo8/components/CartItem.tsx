import type { CartLine } from "../types/coffee";

export function CartItem({
  line,
  onRemove,
}: {
  line: CartLine;
  onRemove: (name: string) => void;
}) {
  return (
    <li className="cart-item">
      <span className="cart-item-name">{line.name}</span>
      <span className="cart-item-qty">x{line.qty}</span>
      <span className="cart-item-price">${(line.price * line.qty).toFixed(2)}</span>
      <button type="button" className="remove-btn" onClick={() => onRemove(line.name)}>
        Remove
      </button>
    </li>
  );
}
