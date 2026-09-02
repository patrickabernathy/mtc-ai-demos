export function PickupCard() {
  return (
    <section className="card">
      <h2>Pickup</h2>

      <div className="field">
        <label htmlFor="phone">Phone</label>
        <input id="phone" />
      </div>

      <div className="field">
        <label htmlFor="pickup">Pickup time</label>
        <select id="pickup">
          <option value="">Choose a time</option>
          <option value="7:30 am">7:30 am</option>
          <option value="8:00 am">8:00 am</option>
          <option value="8:30 am">8:30 am</option>
          <option value="9:00 am">9:00 am</option>
          <option value="9:30 am">9:30 am</option>
        </select>
      </div>

      <div className="card-actions">
        <button type="button" className="back-btn">
          Back
        </button>
        <button type="button" className="next-btn">
          Next
        </button>
      </div>
    </section>
  );
}
