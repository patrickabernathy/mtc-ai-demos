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
    <li className="flex items-center justify-between gap-2 py-1">
      <span>
        {line.name} x{line.qty} — ${(line.price * line.qty).toFixed(2)}
      </span>
      {/* Same Button as "Add to cart" and "Order now" — a destructive action
          that looks identical to every other action on the page. */}
      <Button onClick={() => onRemove(line.name)}>Remove</Button>
    </li>
  );
}
