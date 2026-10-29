import type { Metadata } from "next";
import Link from "next/link";
import { AuthService } from "../services/authService";
import { UserProvider } from "./UserContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paws & Whiskers",
  description: "The shelter's pets, and a private page for the people who adopted one",
};

// async now: before drawing any page, ask Better Auth who this is.
// That's the real check -- cookie, session table, expiry -- once per page.
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await AuthService.getInstance().getCurrentUser();

  return (
    <html lang="en">
      <body>
        <UserProvider user={user ?? null}>
          <header>
            <h1>
              <Link href="/">Paws &amp; Whiskers</Link>
            </h1>
            <nav>
              <Link href="/">At the shelter</Link> &middot; <Link href="/my-pets">My pets</Link>{" "}
              &middot; <Link href="/login">{user ? "Hi, " + user.name : "Log in"}</Link>
            </nav>
          </header>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
