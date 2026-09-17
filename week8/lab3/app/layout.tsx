import type { Metadata } from "next";
import { Header } from "../components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Backspin Records",
  description: "Backspin Records — login lab",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
