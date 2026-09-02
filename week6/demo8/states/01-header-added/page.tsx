"use client";

import { useEffect, useState } from "react";
import type { CartLine, MenuItem } from "../types/coffee";
import { Header } from "../components/Header";
import { MenuList } from "../components/MenuList";
import { CartList } from "../components/CartList";

// This one is behind a door. The server wants to see a header called
// "x-auth" before it will hand anything over -- which is how almost every
// real API on earth behaves.
const MENU_URL = "https://n8n.aseglave.net/webhook/mtc-menu-auth";

export default function Home() {
  const [cart, setCart] = useState<CartLine[]>([]);

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Empty string means "nothing has gone wrong". Any text in here is a
  // sentence we are willing to show a customer.
  const [error, setError] = useState("");


  // Pulled out of the effect so the Try again button can call the same code.
  async function loadMenu() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(MENU_URL, {
        headers: {
          "x-auth": "mtc-fall-2026",
        },
      });

      // fetch does NOT throw on a 404 or a 500. As far as it is concerned,
      // the round trip worked -- the server answered. We have to look at the
      // answer ourselves and decide it was bad news.
      if (!res.ok) {
        throw new Error("The server said " + res.status + ".");
      }

      const data = await res.json();
      setMenu(data);
    } catch (err) {
      console.error(err);
      setError("We could not load the menu. That one is on us, not you.");
    } finally {
      // finally runs whether we succeeded or blew up, and either way we
      // are no longer waiting.
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <MenuList
          menu={menu}
          loading={loading}
          error={error}
          onRetry={loadMenu}
          onAdd={handleAdd}
        />
        <CartList cart={cart} onRemove={handleRemove} />
      </main>
    </div>
  );
}
