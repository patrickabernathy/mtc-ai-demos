import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "Ridgeline Bakery",
  description: "Ridgeline Bakery — Lab 3, fetching reviews from an authenticated API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
