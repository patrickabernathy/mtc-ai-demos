import type { Order } from "../types/order";

// Two props doing opposite jobs:
//   order    — the order coming DOWN, so the boxes show what's already typed
//   onChange — a function coming down that we call to send a new order BACK UP
export function ContactCard({
  order,
  onChange,
  onNext,
}: {
  order: Order;
  onChange: (order: Order) => void;
  onNext: () => void;
}) {
  // This card checks its own two fields. Nothing else in the app needs to know
  // what makes a name or an email good enough.
  const ready = order.name.trim() !== "" && order.email.includes("@");

  return (
    <section className="card">
      <h2>Your info</h2>

      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={order.name}
          // Copy the whole order, then overwrite one field, and hand the copy
          // back. We never edit `order` itself — the parent owns it.
          onChange={(event) => onChange({ ...order, name: event.target.value })}
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={order.email}
          onChange={(event) => onChange({ ...order, email: event.target.value })}
        />
      </div>

      <div className="card-actions">
        <button type="button" className="next-btn" onClick={onNext} disabled={!ready}>
          Next
        </button>
      </div>
    </section>
  );
}
