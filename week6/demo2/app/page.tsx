"use client";

import { useState } from "react";
import { Header } from "../components/Header";
import { MenuList } from "../components/MenuList";
import { CartList } from "../components/CartList";
import type { CartLine, MenuItem } from "@/types/coffee";
import { sampleCart } from "@/types/coffee";

export default function Home() {
  const [cart, setCart] = useState<CartLine[]>(sampleCart);

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
        <MenuList onAdd={handleAdd} />
        <CartList cart={cart} onRemove={handleRemove} />
      </main>
    </div>
  );
}
