import type { CartLine } from "../types/coffee";
import { Button } from "./Button";

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
      <Button colour="red" onClick={() => onRemove(line.name)}>
        Remove
      </Button>
    </li>
  );
}
