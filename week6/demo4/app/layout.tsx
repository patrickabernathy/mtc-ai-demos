import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "The Daily Grind — Pickup Order",
  description: "One-page pickup order form — CSS states and validation demo for class",
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
