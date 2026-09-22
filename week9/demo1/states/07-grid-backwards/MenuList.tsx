import { menu, type MenuItem } from "../types/coffee";
import { ProductCard } from "./ProductCard";

export function MenuList({ onAdd }: { onAdd: (drink: MenuItem) => void }) {
  return (
    <div>
      <h2>Menu</h2>
      {/* Backwards: the class with no prefix is the phone. At 375px this is three columns. */}
      <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
        {menu.map((drink) => (
          <ProductCard key={drink.id} drink={drink} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}
