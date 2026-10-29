"use client";

import { useState } from "react";

// The login screen. The form is done; what each button DOES is Step 11.
// Better Auth isn't installed yet, so nothing here can log anyone in.
export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function signUp() {
    // TODO (Step 11): make a new account with authClient.signUp.email(...)
    setMessage("Not built yet. That's Step 11.");
  }

  async function logIn(e: React.FormEvent) {
    e.preventDefault();
    // TODO (Step 11): log in with authClient.signIn.email(...)
    setMessage("Not built yet. That's Step 11.");
  }

  async function logOut() {
    // TODO (Step 11): log out with authClient.signOut()
    setMessage("Not built yet. That's Step 11.");
  }

  return (
    <main>
      <p className="status">{message}</p>
      <form onSubmit={logIn} className="card login">
        <label>
          Name <span className="hint">(only needed to sign up)</span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div className="actions">
          <button type="submit">Log in</button>
          <button type="button" onClick={signUp}>
            Sign up
          </button>
        </div>
      </form>
      <p>
        <button onClick={logOut}>Log out</button>
      </p>
    </main>
  );
}
