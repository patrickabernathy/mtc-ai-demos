"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// This page is finished. It POSTs the form to /api/coffees and, when the
// API answers 201, goes back to the list.
export default function NewCoffee() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/coffees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // price goes as a number, so "4.50" in the box is sent as 4.5.
      body: JSON.stringify({ name, description, price: Number(price) }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "The API answered " + res.status + ". Check the terminal.");
      return;
    }
    router.push("/");
  }

  return (
    <main>
      <h2>New coffee</h2>
      <form className="coffee" onSubmit={save}>
        <label>
          Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Description (leave empty for none)
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Price
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button type="submit">Save</button>
          <Link href="/" className="back">Cancel</Link>
        </div>
      </form>
    </main>
  );
}
