export function ContactCard() {
  return (
    <section className="card">
      <h2>Your info</h2>

      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
      </div>

      <div className="card-actions">
        <button type="button" className="next-btn">
          Next
        </button>
      </div>
    </section>
  );
}
