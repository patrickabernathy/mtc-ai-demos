import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Corner Store",
  description: "The Corner Store menu, straight from the database",
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
          <p className="tagline">The menu, straight from the database.</p>
        </header>
        {children}
      </body>
    </html>
  );
}
