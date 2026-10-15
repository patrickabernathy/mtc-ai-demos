"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Item } from "../../../types/item";

// This page is finished. It GETs one coffee from /api/coffees/3, fills the
// form with it, and PUTs the whole form back when you press Save.
export default function EditCoffee() {
  const params = useParams();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCoffee() {
      const res = await fetch("/api/coffees/" + params.id);
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error ?? "The API answered " + res.status + ". Check the terminal.");
        return;
      }
      const coffee: Item = await res.json();
      setName(coffee.name);
      setDescription(coffee.description ?? "");
      setPrice(String(coffee.price));
      setIsAvailable(coffee.isAvailable);
      setLoaded(true);
    }
    loadCoffee();
  }, [params.id]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // PUT sends every field, even the ones you didn't change.
    const res = await fetch("/api/coffees/" + params.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price: Number(price), isAvailable }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "The API answered " + res.status + ". Check the terminal.");
      return;
    }
    router.push("/");
  }

  if (!loaded) {
    return (
      <main>
        {error && <p className="error">{error}</p>}
        <Link href="/" className="back">Back to the list</Link>
      </main>
    );
  }

  return (
    <main>
      <h2>Edit coffee {params.id}</h2>
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
        <label>
          <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
          {" "}On sale (untick to mark it sold out)
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
