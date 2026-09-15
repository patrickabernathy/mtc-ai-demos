"use client";

import { useState } from "react";

export function Header() {
  // Stamped once, when the app first starts. The Header lives in layout.tsx,
  // so it survives moving between pages -- unless the whole application gets
  // thrown away and started again. If this time ever changes, that happened.
  const [startedAt] = useState(() => new Date().toLocaleTimeString());

  return (
    <header>
      <h1>The Daily Grind</h1>
      <p className="tagline">Coffee cart, order online.</p>
      <nav>
        <a href="/">Menu</a>
        <a href="/cart">Cart</a>
      </nav>
      <p className="session">App started at {startedAt}</p>
    </header>
  );
}
