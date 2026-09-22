import type { MenuItem } from "../types/coffee";

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
      <button
        type="button"
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => onAdd(drink)}
      >
        Add to cart
      </button>
    </article>
  );
}
