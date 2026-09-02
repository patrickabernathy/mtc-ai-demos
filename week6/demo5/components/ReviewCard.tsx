import type { Order } from "../types/order";

// Proof that the data really did make it up to the parent: this card never saw
// the other two cards, it only got the finished order.
export function ReviewCard({
  order,
  onBack,
  onPlace,
}: {
  order: Order;
  onBack: () => void;
  onPlace: () => void;
}) {
  return (
    <section className="card">
      <h2>Review</h2>

      <dl className="review">
        <dt>Name</dt>
        <dd>{order.name}</dd>
        <dt>Email</dt>
        <dd>{order.email}</dd>
        <dt>Phone</dt>
        <dd>{order.phone}</dd>
        <dt>Pickup time</dt>
        <dd>{order.pickup}</dd>
      </dl>

      <div className="card-actions">
        <button type="button" className="back-btn" onClick={onBack}>
          Back
        </button>
        <button type="button" className="next-btn" onClick={onPlace}>
          Place order
        </button>
      </div>
    </section>
  );
}
