import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "The Daily Grind — Menu Search",
  description: "The Daily Grind — filter a list as you type",
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
