import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paws & Whiskers",
  description: "The shelter's pets, and a private page for the people who adopted one",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>
            <Link href="/">Paws &amp; Whiskers</Link>
          </h1>
          <nav>
            <Link href="/">At the shelter</Link> &middot; <Link href="/my-pets">My pets</Link>{" "}
            &middot; <Link href="/login">Log in</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
