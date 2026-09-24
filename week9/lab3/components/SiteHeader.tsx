"use client";

import { useState } from "react";

const links = ["Our coffee", "Locations", "Catering", "About"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-200">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <p className="text-xl md:text-2xl font-bold">The Daily Grind</p>

        {/* The laptop nav: display none on a phone, a flex row from md up. */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link} href="#" className="text-amber-900 font-semibold hover:underline">
              {link}
            </a>
          ))}
          <a href="#" className="bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-800">
            Order online
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden border border-gray-300 rounded px-3 py-1"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* md:hidden keeps this off a laptop even if open is still true. */}
      {open && (
        <nav className="flex flex-col gap-3 px-4 pb-4 md:hidden">
          {links.map((link) => (
            <a key={link} href="#" className="text-amber-900 font-semibold">
              {link}
            </a>
          ))}
          <a href="#" className="self-start bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-800">
            Order online
          </a>
        </nav>
      )}
    </header>
  );
}
