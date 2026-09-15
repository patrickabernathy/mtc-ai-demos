// app/menu/page.tsx
//
// The filter works perfectly and cannot be sent to anybody. Type "oat",
// look at the address bar: unchanged. Copy that link, open it elsewhere,
// and you get the whole menu.
"use client";

import { useState } from "react";
import Link from "next/link";
import { menu } from "../../types/coffee";

export default function MenuPage() {
  const [q, setQ] = useState("");

  const shown = menu.filter((d) =>
    d.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter the menu"
      />
      <ul>
        {shown.map((d) => (
          <li key={d.id}>
            <Link href={"/drinks/" + d.id}>{d.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
