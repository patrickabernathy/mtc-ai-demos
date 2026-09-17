import type { Metadata } from "next";
import { Header } from "../components/Header";
import { UserProvider } from "./UserContext";
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
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
