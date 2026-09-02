"use client";

import { useState } from "react";

const pickupTimes = ["7:30 am", "8:00 am", "8:30 am", "9:00 am", "9:30 am"];

export default function Home() {
  // One piece of state per field. No components, no shared types — everything
  // this page needs lives on this page.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");

  // Don't nag before they've tried. This flips to true on the first submit.
  const [showErrors, setShowErrors] = useState(false);
  const [placed, setPlaced] = useState(false);

  // Errors are WORKED OUT while we render, not stored in state. Every keystroke
  // re-runs this with the current values, so the messages can never go stale.
  const errors: { [field: string]: string } = {};

  if (name.trim() === "") {
    errors.name = "We need a name for the cup.";
  }
  if (!email.includes("@")) {
    errors.email = "That doesn't look like an email address.";
  }
  // Strip everything that isn't a digit, then count what's left, so
  // (555) 123-4567 and 5551234567 both pass.
  if (phone.replace(/[^0-9]/g, "").length !== 10) {
    errors.phone = "Phone number needs 10 digits.";
  }
  if (pickup === "") {
    errors.pickup = "Pick a pickup time.";
  }

  const hasErrors = Object.keys(errors).length > 0;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setShowErrors(true);
    if (!hasErrors) {
      setPlaced(true);
    }
  }

  // Adds the "invalid" class only once they've tried to submit. That class is
  // what turns the input red in globals.css.
  function fieldClass(field: string) {
    return showErrors && errors[field] ? "invalid" : "";
  }

  if (placed) {
    return (
      <div>
        <header>
          <h1>The Daily Grind</h1>
          <p className="tagline">Order in, pick up at the window.</p>
        </header>
        <main>
          <p className="success">
            Thanks, {name}! We'll have it ready at {pickup}.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>The Daily Grind</h1>
        <p className="tagline">Order in, pick up at the window.</p>
      </header>

      <main>
        <form className="order-form" onSubmit={handleSubmit} noValidate>
          <h2>Pickup order</h2>

          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className={fieldClass("name")}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {showErrors && errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={fieldClass("email")}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {showErrors && errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              className={fieldClass("phone")}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            {showErrors && errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="field">
            <label htmlFor="pickup">Pickup time</label>
            <select
              id="pickup"
              className={fieldClass("pickup")}
              value={pickup}
              onChange={(event) => setPickup(event.target.value)}
            >
              <option value="">Choose a time</option>
              {pickupTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {showErrors && errors.pickup && <p className="error">{errors.pickup}</p>}
          </div>

          <button type="submit" className="submit-btn" disabled={showErrors && hasErrors}>
            Place order
          </button>

          {showErrors && hasErrors && (
            <p className="error">Fix the fields above, then try again.</p>
          )}
        </form>
      </main>
    </div>
  );
}
