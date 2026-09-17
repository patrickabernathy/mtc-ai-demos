"use client";

import Link from "next/link";
import { useUser } from "../UserContext";

export default function AccountPage() {
  const { user, logout } = useUser();

  if (!user) {
    return (
      <main>
        <h2>Your account</h2>
        <p>
          Nobody&apos;s logged in. <Link href="/login">Log in</Link> to see your account.
        </p>
      </main>
    );
  }

  return (
    <main>
      <div className="account-card">
        <h2>Welcome back, {user.name}</h2>
        <p>{user.email}</p>
        <button type="button" onClick={logout}>
          Log out
        </button>
      </div>
    </main>
  );
}
