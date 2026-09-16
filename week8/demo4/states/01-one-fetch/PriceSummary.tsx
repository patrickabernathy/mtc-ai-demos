import type { MenuItem } from "../types/coffee";

export function PriceSummary({ menu }: { menu: MenuItem[] }) {
  if (menu.length === 0) return <p>Working out prices...</p>;

  const cheapest = Math.min(...menu.map((m) => m.price));

  return <p>{menu.length} drinks, from ${cheapest.toFixed(2)}</p>;
}
