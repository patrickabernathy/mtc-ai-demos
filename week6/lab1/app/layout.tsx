import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "Ridgeline Bakery",
  description: "Ridgeline Bakery — Lab 1, a single-file ordering page",
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
