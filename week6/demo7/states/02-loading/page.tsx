"use client";

import { useEffect, useState } from "react";
import type { CartLine, MenuItem } from "../types/coffee";
import { Header } from "../components/Header";
import { MenuList } from "../components/MenuList";
import { CartList } from "../components/CartList";

// The coffee cart's menu, served by a real server out on the internet.
// Swap this for "/api/menu" to use the copy running on this machine instead.
const MENU_URL = "https://n8n.aseglave.net/webhook/mtc-menu";

export default function Home() {
  const [cart, setCart] = useState<CartLine[]>([]);

  const [menu, setMenu] = useState<MenuItem[]>([]);

  // "Have we heard back yet?" is a different question from "what did we get?"
  // The page needs both answers, so it needs both pieces of state.
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadMenu() {
      const res = await fetch(MENU_URL);
      const data = await res.json();
      setMenu(data);
      setLoading(false);
    }
    loadMenu();
  }, []);

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
        <MenuList menu={menu} loading={loading} onAdd={handleAdd} />
        <CartList cart={cart} onRemove={handleRemove} />
      </main>
    </div>
  );
}
