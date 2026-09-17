"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../UserContext";

export default function LoginPage() {
  const { login } = useUser();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    login({ name: name.trim(), email: email.trim() });
    router.push("/account");
  }

  return (
    <main>
      <h2>Log in</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log in</button>
      </form>
    </main>
  );
}
