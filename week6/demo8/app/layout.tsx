import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "The Daily Grind",
  description: "The Daily Grind — client-state coffee cart demo for class",
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
