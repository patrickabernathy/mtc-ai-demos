import { useState } from "react";
import type { MenuItem as MenuItemType } from "../types/coffee";

export function MenuItem({
  item,
  onAdd,
}: {
  item: MenuItemType;
  onAdd: (item: MenuItemType, qty: number) => void;
}) {
  const [qty, setQty] = useState(1);

  return (
    <article className="menu-item">
      <div className="menu-item-info">
        <h3>{item.name}</h3>
        <p className="price">${item.price.toFixed(2)}</p>
      </div>
      <div className="qty-control">
        <button type="button" className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>
          -
        </button>
        <span className="qty">{qty}</span>
        <button type="button" className="qty-btn" onClick={() => setQty((q) => q + 1)}>
          +
        </button>
      </div>
      <button type="button" className="add-btn" onClick={() => onAdd(item, qty)}>
        Add to cart
      </button>
    </article>
  );
}
