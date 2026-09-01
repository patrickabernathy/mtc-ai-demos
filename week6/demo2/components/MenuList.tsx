import { menu } from "../types/coffee";
import { MenuItem } from "./MenuItem";

export function MenuList() {
  return (
    <section className="menu">
      <h2>Menu</h2>
      <div className="menu-list">
        {menu.map((item) => (
          <MenuItem key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
