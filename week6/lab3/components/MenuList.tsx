import { menu, type MenuItem as MenuItemType } from "../types/coffee";
import { MenuItem } from "./MenuItem";

export function MenuList({
  onAdd,
}: {
  onAdd: (item: MenuItemType, qty: number) => void;
}) {
  return (
    <section className="menu">
      <h2>Menu</h2>
      <div className="menu-list">
        {menu.map((item) => (
          <MenuItem key={item.name} item={item} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
