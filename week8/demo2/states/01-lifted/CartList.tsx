import type { MenuItem } from "../../types/coffee";

export function CartList({
  items,
  onAdd,
}: {
  items: MenuItem[];
  onAdd: () => void;
}) {
  return (
    <div className="cart">
      <h2>Your cart ({items.length})</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button type="button" onClick={onAdd}>
        Add a Mocha
      </button>
    </div>
  );
}
