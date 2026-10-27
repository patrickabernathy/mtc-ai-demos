"use client";

import { useEffect, useState } from "react";
import { authClient } from "../../lib/auth-client";

// The same login form as Tuesday. The difference is who it talks to:
// authClient sends the email and password to Better Auth, not to our
// own /api/login. /api/me is still ours.
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Ask the server who it thinks we are.
  async function whoAmI() {
    const res = await fetch("/api/me");
    if (res.ok) {
      const me = await res.json();
      setMessage("Logged in as " + me.firstName + " (user " + me.id + ")");
    } else {
      setMessage("Not logged in");
    }
  }

  useEffect(() => {
    whoAmI();
  }, []);

  async function logIn(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      setMessage(error.message ?? "Could not log in");
      return;
    }
    whoAmI();
  }

  async function logOut() {
    await authClient.signOut();
    whoAmI();
  }

  return (
    <main>
      <p className="status">{message}</p>
      <form onSubmit={logIn} className="card">
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Log in</button>
      </form>
      <p>
        <button onClick={logOut}>Log out</button> <a href="/api/receipts">My receipts</a>
      </p>
    </main>
  );
}
