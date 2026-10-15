import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Corner Store coffee bar",
  description: "Add, change and remove the coffees on the Corner Store menu",
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
            <Link href="/">The Corner Store coffee bar</Link>
          </h1>
          <p className="tagline">Every coffee on the menu, straight from the database.</p>
        </header>
        {children}
      </body>
    </html>
  );
}
