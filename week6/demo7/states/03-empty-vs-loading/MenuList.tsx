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

      {/* Three different situations, three different sentences. The bug we
          just fixed was showing the third one during the first one. */}
      {loading ? (
        <p className="menu-status">Loading the menu&hellip;</p>
      ) : menu.length === 0 ? (
        <p className="menu-status">Nothing on the menu today. Try back tomorrow.</p>
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
