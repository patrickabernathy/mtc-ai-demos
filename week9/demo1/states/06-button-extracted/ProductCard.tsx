import type { MenuItem } from "../types/coffee";
import { Button } from "./Button";

export function ProductCard({
  drink,
  onAdd,
}: {
  drink: MenuItem;
  onAdd: (drink: MenuItem) => void;
}) {
  return (
    <article className="border border-gray-300 p-4 mb-4">
      <h2 className="text-xl">{drink.name}</h2>
      <p className="text-gray-500 mb-3">${drink.price.toFixed(2)}</p>
      <Button onClick={() => onAdd(drink)}>Add to cart</Button>
    </article>
  );
}
