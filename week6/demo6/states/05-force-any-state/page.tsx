"use client";

import { useEffect, useState } from "react";
import type { CartLine, MenuItem } from "../types/coffee";
import { Header } from "../components/Header";
import { MenuList } from "../components/MenuList";
import { CartList } from "../components/CartList";

const MENU_URL = "https://n8n.aseglave.net/webhook/mtc-menu";

// Every situation the menu can be in, and the query string that forces it.
// This row of buttons is a demo prop -- it would not ship. It exists so we can
// prove all four states work without waiting for a bad day to arrive.
const SITUATIONS = [
  { key: "ok", label: "Normal", query: "" },
  { key: "slow", label: "Slow (4s)", query: "?delay=4000" },
  { key: "empty", label: "Empty menu", query: "?state=empty" },
  { key: "error", label: "Server broken", query: "?state=error" },
];

export default function Home() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [situation, setSituation] = useState("ok");

  async function loadMenu() {
    setLoading(true);
    setError("");
    const found = SITUATIONS.find((s) => s.key === situation);
    const query = found ? found.query : "";
    try {
      const res = await fetch(MENU_URL + query);
      if (!res.ok) {
        throw new Error("The server said " + res.status + ".");
      }
      const data = await res.json();
      setMenu(data);
    } catch (err) {
      console.error(err);
      setError("We could not load the menu. That one is on us, not you.");
    } finally {
      setLoading(false);
    }
  }

  // situation is in the dependency array, so picking a different button
  // re-runs this effect. That is what the array is for: not "run once",
  // but "run again when one of these changes".
  useEffect(() => {
    loadMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [situation]);

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
        <div className="state-switcher">
          <span>Force a situation:</span>
          {SITUATIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              className={s.key === situation ? "on" : ""}
              onClick={() => setSituation(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
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
