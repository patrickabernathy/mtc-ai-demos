"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Header() {
  // Stamped once, when the app first starts running in the browser, and never
  // again. If this time ever changes, the app you were using was thrown away
  // and a new one started in its place — including whatever a refresh does to
  // whoever was logged in.
  const [startedAt, setStartedAt] = useState("");

  useEffect(() => {
    setStartedAt(new Date().toLocaleTimeString());
  }, []);

  return (
    <header>
      <h1>Backspin Records</h1>
      <p className="tagline">Used vinyl, bought and sold.</p>
      <nav>
        <Link href="/">Catalog</Link>
        <Link href="/about">About</Link>
        <Link href="/help/shipping">Help</Link>
        {/* No login link yet. Add one once there's somewhere for it to point. */}
      </nav>
      <p className="session">App started at {startedAt}</p>
    </header>
  );
}
