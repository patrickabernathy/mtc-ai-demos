"use client";

import { useState } from "react";
import { drinks } from "../types/drinks";
import { DrinkRow } from "../components/DrinkRow";

export default function Home() {
  const [query, setQuery] = useState("");

  // THE TRAP. The results are kept in their own piece of state and updated by
  // hand in the onChange. It looks fine. Then a second thing changes the list
  // -- here, the Sold out button -- and the results remember the old world.
  const [results, setResults] = useState(drinks);
  const [menu, setMenu] = useState(drinks);

  function handleSearch(value: string) {
    setQuery(value);
    setResults(menu.filter((d) => d.name.toLowerCase().includes(value.toLowerCase())));
  }

  function sellOutLattes() {
    // The menu changes. Nobody told `results`.
    setMenu((prev) => prev.filter((d) => !d.name.toLowerCase().includes("latte")));
  }

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
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button type="button" className="clear-btn" onClick={sellOutLattes}>
            We sold out of lattes
          </button>
        </div>

        <p className="count">
          {results.length} of {menu.length} drinks
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
