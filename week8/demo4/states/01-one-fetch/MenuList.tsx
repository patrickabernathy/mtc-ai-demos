import type { MenuItem } from "../types/coffee";

// No fetch, no effect, no state. It shows what it is handed.
export function MenuList({ menu }: { menu: MenuItem[] }) {
  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            {item.name} — ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
