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
    <div className="border border-gray-300 rounded-lg p-4 mt-8">
      <h2>Your cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="list-none p-0 m-0">
          {cart.map((line) => (
            <CartItem key={line.name} line={line} onRemove={onRemove} />
          ))}
        </ul>
      )}
      <p className="font-bold border-t border-gray-300 mt-3 pt-3">
        Total: ${total.toFixed(2)}
      </p>
    </div>
  );
}
