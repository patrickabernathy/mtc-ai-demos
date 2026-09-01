import type { MenuItem as MenuItemType } from "../types/coffee";

export function MenuItem({ item }: { item: MenuItemType }) {
  return (
    <article className="menu-item">
      <div className="menu-item-info">
        <h3>{item.name}</h3>
        <p className="price">${item.price.toFixed(2)}</p>
      </div>
      <div className="qty-control">
        <button type="button" className="qty-btn">-</button>
        <span className="qty">1</span>
        <button type="button" className="qty-btn">+</button>
      </div>
      <button type="button" className="add-btn">Add to cart</button>
    </article>
  );
}
