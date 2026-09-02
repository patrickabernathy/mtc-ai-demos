"use client";

import { useState } from "react";
import { menu, type MenuItem as MenuItemType } from "../types/coffee";
import { MenuItem } from "./MenuItem";

export function MenuList({
  onAdd,
}: {
  onAdd: (item: MenuItemType, qty: number) => void;
}) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(menu.map((item) => [item.name, 1]))
  );

  function increment(name: string) {
    setQuantities((prev) => ({ ...prev, [name]: prev[name] + 1 }));
  }

  function decrement(name: string) {
    setQuantities((prev) => ({
      ...prev,
      [name]: prev[name] === 1 ? 1 : prev[name] - 1,
    }));
  }

  function resetQty(name: string) {
    setQuantities((prev) => ({ ...prev, [name]: 1 }));
  }

  return (
    <section className="menu">
      <h2>Menu</h2>
      <div className="menu-list">
        {menu.map((item) => (
          <MenuItem
            key={item.name}
            item={item}
            qty={quantities[item.name]}
            onIncrement={() => increment(item.name)}
            onDecrement={() => decrement(item.name)}
            onAdd={() => {
              onAdd(item, quantities[item.name]);
              resetQty(item.name);
            }}
          />
        ))}
      </div>
    </section>
  );
}
