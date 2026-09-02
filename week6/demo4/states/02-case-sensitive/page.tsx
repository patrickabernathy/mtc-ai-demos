"use client";

import { useState } from "react";
import { drinks } from "../types/drinks";
import { DrinkRow } from "../components/DrinkRow";

export default function Home() {
  const [query, setQuery] = useState("");

  // The filtered list is worked out fresh on every render, from the query and
  // the full list. It is NOT stored in its own useState -- there is nothing to
  // keep in sync, so there is nothing to get out of sync.
  const results = drinks.filter((drink) => drink.name.includes(query));

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
