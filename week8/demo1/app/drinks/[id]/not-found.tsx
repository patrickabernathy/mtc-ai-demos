import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h2>We don&apos;t have that drink.</h2>
      <Link href="/">Back to the menu</Link>
    </main>
  );
}
