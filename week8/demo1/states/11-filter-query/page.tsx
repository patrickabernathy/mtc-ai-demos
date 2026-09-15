// The same filter, living in the address instead. Now the link can be sent,
// bookmarked, and survives a refresh.
//
// NOTE FOR LATER: this works under `npm run dev` and fails `npm run build`
// with a message about a Suspense boundary, because the query string is not
// known until somebody actually visits. Not tonight's lesson -- the fix is
// in the session notes.
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { menu } from "../../types/coffee";

export default function MenuPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const shown = menu.filter((d) =>
    d.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main>
      <p>
        Filter:{" "}
        {menu.map((d) => (
          <Link key={d.id} href={"/menu?q=" + d.name}>
            {d.name}{" "}
          </Link>
        ))}
        <Link href="/menu">clear</Link>
      </p>
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
