import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "The Corner Store",
  description: "The Corner Store — a React demo for class",
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
