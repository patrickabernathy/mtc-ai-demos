"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { menu } from "../../types/coffee";

// The part that reads the address. Split out on purpose -- see the note
// under the page component.
function FilteredMenu() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const shown = menu.filter((d) =>
    d.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
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
    </>
  );
}

export default function MenuPage() {
  // In class we wrote this without the <Suspense> wrapper, and it worked --
  // because `npm run dev` never has to prepare the page in advance.
  //
  // `npm run build` does, and it cannot prepare anything that depends on the
  // query string, because the query string does not exist until somebody
  // actually visits. So it asks you to mark the part that has to wait.
  //
  // That is the whole fix. Nothing else changes.
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <FilteredMenu />
      </Suspense>
    </main>
  );
}
