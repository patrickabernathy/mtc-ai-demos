"use client";

import { useState } from "react";
import { drinks } from "../types/drinks";
import { DrinkRow } from "../components/DrinkRow";

export default function Home() {
  const [query, setQuery] = useState("");

  // Everything below is worked out fresh on every render, from the query and
  // the full list. Nothing derived is stored in state, so nothing can go stale.
  const q = query.trim().toLowerCase();

  // We decide what "matches" means. Here: the name or the category.
  const results = drinks.filter(
    (drink) =>
      drink.name.toLowerCase().includes(q) ||
      drink.category.toLowerCase().includes(q)
  );

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
            placeholder="try: latte, or tea"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query !== "" && (
            <button type="button" className="clear-btn" onClick={() => setQuery("")}>
              Clear
            </button>
          )}
        </div>

        <p className="count">
          {results.length} of {drinks.length} drinks
        </p>

        {results.length === 0 ? (
          <p className="no-matches">
            Nothing matches &ldquo;{query}&rdquo;. We might still be able to make it &mdash; just ask.
          </p>
        ) : (
          <ul className="drink-list">
            {results.map((drink) => (
              <DrinkRow key={drink.name} drink={drink} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
