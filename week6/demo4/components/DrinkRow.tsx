import type { Drink } from "../types/drinks";

export function DrinkRow({ drink }: { drink: Drink }) {
  return (
    <li className="drink-row">
      <span className="drink-name">{drink.name}</span>
      <span className="drink-cat">{drink.category}</span>
      <span className="drink-price">${drink.price.toFixed(2)}</span>
    </li>
  );
}
