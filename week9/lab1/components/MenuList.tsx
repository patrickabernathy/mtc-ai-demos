import { menu, type MenuItem } from "../types/coffee";
import { ProductCard } from "./ProductCard";

export function MenuList({ onAdd }: { onAdd: (drink: MenuItem) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      {/* Phone first: one column with no prefix, three from md (768px) up. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {menu.map((drink) => (
          <ProductCard key={drink.id} drink={drink} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}
