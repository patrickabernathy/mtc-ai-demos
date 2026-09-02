import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "The Daily Grind — Pickup Order",
  description: "Three-card pickup wizard — passing data between components, demo for class",
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
