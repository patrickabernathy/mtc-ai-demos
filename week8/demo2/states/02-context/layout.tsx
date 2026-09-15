// 3a. Wrap once, here, so every page is inside it.
import type { Metadata } from "next";
import { CartProvider } from "./CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Daily Grind",
  description: "The Daily Grind — the cart lives in a context",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
