"use client";

import { useState } from "react";
import { drinks } from "../types/drinks";
import { DrinkRow } from "../components/DrinkRow";

export default function Home() {
  const [query, setQuery] = useState("");

  // The box works. The list ignores it. That is tonight's job.
  console.log("query is:", query);

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

        <p className="count">{drinks.length} drinks</p>

        <ul className="drink-list">
          {drinks.map((drink) => (
            <DrinkRow key={drink.name} drink={drink} />
          ))}
        </ul>
      </main>
    </div>
  );
}
