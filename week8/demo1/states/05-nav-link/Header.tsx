// The same nav, with the reload cancelled. Two changes: the import, and
// capital-L Link instead of a.
"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [startedAt] = useState(() => new Date().toLocaleTimeString());

  return (
    <header>
      <h1>The Daily Grind</h1>
      <p className="tagline">Coffee cart, order online.</p>
      <nav>
        <Link href="/">Menu</Link>
        <Link href="/about">About</Link>
      </nav>
      {/* This time now holds still when you move between pages -- the app
          survived. The cart still empties, because the cart lives on the
          menu page and we left the menu page. That is Wednesday. */}
      <p className="session">App started at {startedAt}</p>
    </header>
  );
}
