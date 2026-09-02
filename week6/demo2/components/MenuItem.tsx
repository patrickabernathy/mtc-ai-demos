import type { MenuItem as MenuItemType } from "../types/coffee";

export function MenuItem({
  item,
  qty,
  onIncrement,
  onDecrement,
  onAdd,
}: {
  item: MenuItemType;
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onAdd: () => void;
}) {
  return (
    <article className="menu-item">
      <div className="menu-item-info">
        <h3>{item.name}</h3>
        <p className="price">${item.price.toFixed(2)}</p>
      </div>
      <div className="qty-control">
        <button type="button" className="qty-btn" onClick={onDecrement}>-</button>
        <span className="qty">{qty}</span>
        <button type="button" className="qty-btn" onClick={onIncrement}>+</button>
      </div>
      <button type="button" className="add-btn" onClick={onAdd}>Add to cart</button>
    </article>
  );
}
