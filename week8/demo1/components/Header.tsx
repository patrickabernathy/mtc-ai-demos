"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Header() {
  // Stamped once, when the app first starts running in the browser. With <Link>
  // this now holds still while you move between pages -- the app is never torn
  // down. It has to be an effect: the server renders this component too, a
  // second earlier, and React complains when the two do not match.
  const [startedAt, setStartedAt] = useState("");

  useEffect(() => {
    setStartedAt(new Date().toLocaleTimeString());
  }, []);

  return (
    <header>
      <h1>The Daily Grind</h1>
      <p className="tagline">Coffee cart, order online.</p>
      <nav>
        <Link href="/">Menu</Link>
        <Link href="/menu">Filter</Link>
        <Link href="/drinks/hot">Hot</Link>
        <Link href="/about">About</Link>
      </nav>
      <p className="session">App started at {startedAt}</p>
    </header>
  );
}
