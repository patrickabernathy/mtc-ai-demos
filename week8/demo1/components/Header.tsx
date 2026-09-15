"use client";

import { useEffect, useState } from "react";

export function Header() {
  // Stamped once, when the app first starts running in the browser, and never
  // again. So if this time ever changes, the app you were using stopped existing.
  // It has to be an effect: the server renders this component too, a second
  // earlier, and React complains when the server's text and the browser's differ.
  const [startedAt, setStartedAt] = useState("");

  useEffect(() => {
    setStartedAt(new Date().toLocaleTimeString());
  }, []);

  return (
    <header>
      <h1>The Daily Grind</h1>
      <p className="tagline">Coffee cart, order online.</p>
      {/* No nav yet. We add it once there is somewhere to go. */}
      <p className="session">App started at {startedAt}</p>
    </header>
  );
}
