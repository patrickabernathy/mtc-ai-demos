import type { MenuItem } from "../types/coffee";

export function ProductCard({
  drink,
  onAdd,
}: {
  drink: MenuItem;
  onAdd: (drink: MenuItem) => void;
}) {
  return (
    <article className="product-card">
      <h2>{drink.name}</h2>
      <p className="price">${drink.price.toFixed(2)}</p>
      <button type="button" className="add-btn" onClick={() => onAdd(drink)}>
        Add to cart
      </button>
    </article>
  );
}
