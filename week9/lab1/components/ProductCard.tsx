import type { MenuItem } from "../types/coffee";

export function ProductCard({
  drink,
  onAdd,
}: {
  drink: MenuItem;
  onAdd: (drink: MenuItem) => void;
}) {
  return (
    <article className="relative border border-gray-300 p-4 hover:bg-gray-100">
      {drink.isNew && (
        <span className="absolute top-2 right-2 bg-amber-900 text-white text-xs px-2 py-1 rounded">
          New
        </span>
      )}
      <h2 className="text-xl pr-14">{drink.name}</h2>
      <p className="text-gray-500 mb-3">${drink.price.toFixed(2)}</p>
      <button
        type="button"
        className="bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-800"
        onClick={() => onAdd(drink)}
      >
        Add to cart
      </button>
    </article>
  );
}
