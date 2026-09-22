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
      <span>{line.name}</span>
      <span> x{line.qty}</span>
      <span> ${(line.price * line.qty).toFixed(2)}</span>
      <button type="button" className="remove-btn" onClick={() => onRemove(line.name)}>
        Remove
      </button>
    </li>
  );
}
