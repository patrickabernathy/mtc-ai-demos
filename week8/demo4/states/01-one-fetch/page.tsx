// The fix, and it is demo 2 again in different clothes: fetch once, where the
// data is owned, and hand it down. One request. One copy. Nothing to disagree.
"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "../../types/coffee";
import { MenuList } from "../../components/MenuList";
import { PriceSummary } from "../../components/PriceSummary";

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then(setMenu);
  }, []);

  return (
    <main>
      <h1>The Daily Grind</h1>
      <PriceSummary menu={menu} />
      <MenuList menu={menu} />
    </main>
  );
}
