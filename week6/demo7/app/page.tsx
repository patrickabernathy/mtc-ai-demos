"use client";

import { useState } from "react";
import { menu as hardcodedMenu, type CartLine, type MenuItem } from "../types/coffee";
import { Header } from "../components/Header";
import { MenuList } from "../components/MenuList";
import { CartList } from "../components/CartList";

export default function Home() {
  const [cart, setCart] = useState<CartLine[]>([]);

  // The menu is sitting in a file on this machine. Nothing has to travel
  // anywhere, so it is on screen before the page has finished painting.
  // That is the thing that is about to change.
  const menu = hardcodedMenu;

  function handleAdd(item: MenuItem, qty: number) {
    setCart((prev) => {
      const existing = prev.find((line) => line.name === item.name);
      if (existing) {
        return prev.map((line) =>
          line.name === item.name ? { ...line, qty: line.qty + qty } : line
        );
      }
      return [...prev, { name: item.name, price: item.price, qty }];
    });
  }

  function handleRemove(name: string) {
    setCart((prev) => prev.filter((line) => line.name !== name));
  }

  return (
    <div>
      <Header />
      <main>
        <MenuList menu={menu} onAdd={handleAdd} />
        <CartList cart={cart} onRemove={handleRemove} />
      </main>
    </div>
  );
}
