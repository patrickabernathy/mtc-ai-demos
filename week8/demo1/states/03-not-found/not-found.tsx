// Optional: your own not-found page. Without this you get the framework's
// plain one, which is still infinitely better than a crash.
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h2>We don&apos;t have that drink.</h2>
      <Link href="/">Back to the menu</Link>
    </main>
  );
}
