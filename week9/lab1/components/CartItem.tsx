import type { CartLine } from "../types/coffee";

export function CartItem({
  line,
  onRemove,
}: {
  line: CartLine;
  onRemove: (name: string) => void;
}) {
  return (
    <li className="flex items-center justify-between gap-2 py-1">
      <span>{line.name}</span>
      <span> x{line.qty}</span>
      <span> ${(line.price * line.qty).toFixed(2)}</span>
      <button type="button" className="text-red-600 hover:underline" onClick={() => onRemove(line.name)}>
        Remove
      </button>
    </li>
  );
}
