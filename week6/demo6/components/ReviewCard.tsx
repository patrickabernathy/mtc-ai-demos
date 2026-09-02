export function ReviewCard() {
  return (
    <section className="card">
      <h2>Review</h2>

      <dl className="review">
        <dt>Name</dt>
        <dd>—</dd>
        <dt>Email</dt>
        <dd>—</dd>
        <dt>Phone</dt>
        <dd>—</dd>
        <dt>Pickup time</dt>
        <dd>—</dd>
      </dl>

      <div className="card-actions">
        <button type="button" className="back-btn">
          Back
        </button>
        <button type="button" className="next-btn">
          Place order
        </button>
      </div>
    </section>
  );
}
