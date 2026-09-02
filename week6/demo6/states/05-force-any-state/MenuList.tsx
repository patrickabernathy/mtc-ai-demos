import type { MenuItem as MenuItemType } from "../types/coffee";
import { MenuItem } from "./MenuItem";

export function MenuList({
  menu,
  loading,
  error,
  onRetry,
  onAdd,
}: {
  menu: MenuItemType[];
  loading: boolean;
  error: string;
  onRetry: () => void;
  onAdd: (item: MenuItemType, qty: number) => void;
}) {
  return (
    <div className="menu">
      <h2>Menu</h2>

      {/* Four situations the menu can be in. Each one gets its own sentence,
          and the one that is somebody's fault also gets a way out. */}
      {loading ? (
        <p className="menu-status">Loading the menu&hellip;</p>
      ) : error ? (
        <div className="menu-error">
          <p>{error}</p>
          <button type="button" className="retry-btn" onClick={onRetry}>
            Try again
          </button>
        </div>
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
