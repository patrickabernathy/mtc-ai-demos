"use client";

import { useEffect, useState } from "react";

export function Header() {
  // Stamped once, when the app first starts running in the browser, and never
  // again. If this time ever changes, the app you were using was thrown away
  // and a new one started in its place — the same trick week8/demo1 used.
  const [startedAt, setStartedAt] = useState("");

  useEffect(() => {
    setStartedAt(new Date().toLocaleTimeString());
  }, []);

  return (
    <header>
      <h1>Backspin Records</h1>
      <p className="tagline">Used vinyl, bought and sold.</p>
      {/* No nav yet. We add it once there is somewhere to go. */}
      <p className="session">App started at {startedAt}</p>
    </header>
  );
}
