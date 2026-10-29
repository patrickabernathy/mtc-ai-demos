"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { authClient } from "../../lib/auth-client";
import { UserContext } from "../UserContext";

// The login screen. authClient sends each button's request to Better Auth
// at /api/auth/..., and Better Auth sets (or clears) the cookie.
// Who is logged in now comes from UserContext, not from a message we set.
export default function Login() {
  const user = useContext(UserContext);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function signUp() {
    const { error } = await authClient.signUp.email({ name, email, password });
    if (error) {
      setMessage(error.message ?? "Could not sign up");
      return;
    }
    setMessage("");
    // The layout read the user before this login happened. refresh()
    // runs it again, so UserContext (and the header) catch up.
    router.refresh();
  }

  async function logIn(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      setMessage(error.message ?? "Could not log in");
      return;
    }
    setMessage("");
    router.refresh();
  }

  async function logOut() {
    await authClient.signOut();
    router.refresh();
  }

  return (
    <main>
      <p className="status">
        {user ? "Logged in as " + user.name + " (" + user.email + ")" : "Not logged in"}
      </p>
      {message && <p className="error">{message}</p>}
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
