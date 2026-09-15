"use client";

import { useState } from "react";

export function Header() {
  // Stamped once, when the app first starts running, and never again.
  // So if this time ever changes, the app you were using stopped existing.
  const [startedAt] = useState(() => new Date().toLocaleTimeString());

  return (
    <header>
      <h1>The Daily Grind</h1>
      <p className="tagline">Coffee cart, order online.</p>
      {/* No nav yet. We add it once there is somewhere to go. */}
      <p className="session">App started at {startedAt}</p>
    </header>
  );
}
