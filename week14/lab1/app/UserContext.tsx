"use client";

// UserContext: who is logged in, handed to every page and component
// without passing it down as a prop through each one.
// The layout fills it in on the server, from Better Auth's real check.
import { createContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
};

// null means nobody is logged in.
export const UserContext = createContext<User | null>(null);

// The wrapper. The layout is a server component, and server components
// can't hold a context, so this small client component does it for them.
export function UserProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  return <UserContext value={user}>{children}</UserContext>;
}
