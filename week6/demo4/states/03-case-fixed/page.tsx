"use client";

import { useState } from "react";
import { drinks } from "../types/drinks";
import { DrinkRow } from "../components/DrinkRow";

export default function Home() {
  const [query, setQuery] = useState("");

  // Flatten BOTH sides before comparing. Neither one is trustworthy on its
  // own: the data was typed by us, the query was typed by a customer.
  const q = query.toLowerCase();
  const results = drinks.filter((drink) => drink.name.toLowerCase().includes(q));

  return (
    <div>
      <header>
        <h1>The Daily Grind</h1>
        <p className="tagline">Full menu &mdash; find what you want.</p>
      </header>

      <main>
        <div className="search">
          <label htmlFor="q">Search the menu</label>
          <input
            id="q"
            className="search-input"
            placeholder="try: latte"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <p className="count">
          {results.length} of {drinks.length} drinks
        </p>

        <ul className="drink-list">
          {results.map((drink) => (
            <DrinkRow key={drink.name} drink={drink} />
          ))}
        </ul>
      </main>
    </div>
  );
}
