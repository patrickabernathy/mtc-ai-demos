// The nav, written the way links have been written since 1993.
// This is the version that destroys the whole application on every click.
"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [startedAt, setStartedAt] = useState("");

  useEffect(() => {
    setStartedAt(new Date().toLocaleTimeString());
  }, []);

  return (
    <header>
      <h1>The Daily Grind</h1>
      <p className="tagline">Coffee cart, order online.</p>
      <nav>
        <a href="/">Menu</a>
        <a href="/about">About</a>
      </nav>
      <p className="session">App started at {startedAt}</p>
    </header>
  );
}
