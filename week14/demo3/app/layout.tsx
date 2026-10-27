import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Corner Store",
  description: "The Corner Store, logins by Better Auth",
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
          <h1>The Corner Store</h1>
          <p className="tagline">
            <a href="/">Menu</a> &middot; <a href="/login">Log in</a> &middot; <a href="/search">Search</a>
          </p>
        </header>
        {children}
      </body>
    </html>
  );
}
