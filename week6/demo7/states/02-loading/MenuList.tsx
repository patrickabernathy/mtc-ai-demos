import type { MenuItem as MenuItemType } from "../types/coffee";
import { MenuItem } from "./MenuItem";

export function MenuList({
  menu,
  loading,
  onAdd,
}: {
  menu: MenuItemType[];
  loading: boolean;
  onAdd: (item: MenuItemType, qty: number) => void;
}) {
  return (
    <div className="menu">
      <h2>Menu</h2>
      {loading ? (
        <p className="menu-status">Loading the menu&hellip;</p>
      ) : (
        <div className="menu-list">
          {menu.map((item) => (
            <MenuItem key={item.name} item={item} onAdd={onAdd} />
          ))}
        </div>
      )}
    </div>
  );
}
