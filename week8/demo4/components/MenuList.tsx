"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "../types/coffee";

// Sensible on its own: it needs the menu, so it goes and gets the menu.
export function MenuList() {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then(setMenu);
  }, []);

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
