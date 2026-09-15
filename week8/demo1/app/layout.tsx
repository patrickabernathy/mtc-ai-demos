import type { Metadata } from "next";
import { Header } from "../components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Daily Grind",
  description: "The Daily Grind — routing demo for class",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* The Header is here, not on a page, so it stays put while pages
            swap underneath it. */}
        <Header />
        {children}
      </body>
    </html>
  );
}
