"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Shopper = { name: string; email: string };

type UserContextValue = {
  user: Shopper | null;
  login: (shopper: Shopper) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

const COOKIE_NAME = "mtc_user";

function readUserCookie(): Shopper | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Shopper | null>(null);

  // The cookie is what lets a logged-in shopper survive a refresh — context
  // alone lives only in the running app's memory, and a refresh throws that
  // away. This has to be an effect: `document` doesn't exist while this
  // component is rendered on the server, only once it's running in the browser.
  useEffect(() => {
    const saved = readUserCookie();
    if (saved) setUser(saved);
  }, []);

  function login(shopper: Shopper) {
    setUser(shopper);
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(shopper))}; path=/; max-age=604800`;
  }

  function logout() {
    setUser(null);
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const value = useContext(UserContext);
  if (!value) throw new Error("useUser must be used inside a UserProvider");
  return value;
}
