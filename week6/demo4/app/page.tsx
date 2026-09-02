export default function Home() {
  return (
    <div>
      <header>
        <h1>The Daily Grind</h1>
        <p className="tagline">Order in, pick up at the window.</p>
      </header>

      <main>
        <form className="order-form">
          <h2>Pickup order</h2>

          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" />
          </div>

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

          <button type="submit" className="submit-btn">
            Place order
          </button>
        </form>
      </main>
    </div>
  );
}
