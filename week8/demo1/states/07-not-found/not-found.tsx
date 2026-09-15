// app/drinks/[id]/not-found.tsx
//
// Another special filename. Put this next to a page and notFound() shows it.
// Without it you get the framework's plain version, which is still infinitely
// better than a crash.
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h2>We don&apos;t have that drink.</h2>
      <Link href="/">Back to the menu</Link>
    </main>
  );
}
