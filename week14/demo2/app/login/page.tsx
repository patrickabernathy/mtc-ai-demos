"use client";

import { useEffect, useState } from "react";

// A plain login form. All the real work happens in /api/login;
// this page only sends the two boxes and shows what came back.
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
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const body = await res.json();
      setMessage(body.error);
      return;
    }
    whoAmI();
  }

  async function logOut() {
    await fetch("/api/logout", { method: "POST" });
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
