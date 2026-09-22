import { menu, type MenuItem } from "../types/coffee";
import { ProductCard } from "./ProductCard";

export function MenuList({ onAdd }: { onAdd: (drink: MenuItem) => void }) {
  return (
    <div>
      <h2>Menu</h2>
      <div className="menu-list">
        {menu.map((drink) => (
          <ProductCard key={drink.id} drink={drink} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}
