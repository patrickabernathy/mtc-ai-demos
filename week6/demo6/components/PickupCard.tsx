import { pickupTimes, type Order } from "../types/order";

export function PickupCard({
  order,
  onChange,
  onBack,
  onNext,
}: {
  order: Order;
  onChange: (order: Order) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const ready =
    order.phone.replace(/[^0-9]/g, "").length === 10 && order.pickup !== "";

  return (
    <section className="card">
      <h2>Pickup</h2>

      <div className="field">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          value={order.phone}
          onChange={(event) => onChange({ ...order, phone: event.target.value })}
        />
      </div>

      <div className="field">
        <label htmlFor="pickup">Pickup time</label>
        <select
          id="pickup"
          value={order.pickup}
          onChange={(event) => onChange({ ...order, pickup: event.target.value })}
        >
          <option value="">Choose a time</option>
          {pickupTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div className="card-actions">
        <button type="button" className="back-btn" onClick={onBack}>
          Back
        </button>
        <button type="button" className="next-btn" onClick={onNext} disabled={!ready}>
          Next
        </button>
      </div>
    </section>
  );
}
