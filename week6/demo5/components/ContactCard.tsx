import type { Order } from "../types/order";

// Two props doing opposite jobs:
//   order    — data coming DOWN, so the fields show what's already been typed
//   onChange — a function coming down that sends data BACK UP when it's called
export function ContactCard({
  order,
  onChange,
  onNext,
}: {
  order: Order;
  onChange: (field: keyof Order, value: string) => void;
  onNext: () => void;
}) {
  // This card checks its own two fields. Nothing else in the app has to know
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
          onChange={(event) => onChange("name", event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={order.email}
          onChange={(event) => onChange("email", event.target.value)}
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
