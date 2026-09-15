"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "../types/coffee";

// Also sensible on its own. Also goes and gets the menu.
// Two components, two requests, and nothing is coordinating them.
export function PriceSummary() {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then(setMenu);
  }, []);

  if (menu.length === 0) return <p>Working out prices...</p>;

  const cheapest = Math.min(...menu.map((m) => m.price));

  return <p>{menu.length} drinks, from ${cheapest.toFixed(2)}</p>;
}
