"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Item } from "../types/item";

// This page is finished. It only knows the addresses under /api/coffees.
// It never finds out how the API gets its answers. Tonight that's your job.
export default function CoffeeList() {
  const router = useRouter();
  const [coffees, setCoffees] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [asked, setAsked] = useState("");
  const [error, setError] = useState("");

  // Turns the two boxes into an address like /api/coffees?search=lat&maxPrice=4
  // and asks for it. Empty boxes are left out of the address.
  async function loadCoffees() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (maxPrice) params.set("maxPrice", maxPrice);
    const query = params.toString();
    const address = query ? "/api/coffees?" + query : "/api/coffees";

    setAsked(address);
    setError("");
    const res = await fetch(address);
    if (!res.ok) {
      // Our routes answer {"error": "..."}. A crash (500) has no body,
      // so then the only place that knows why is the terminal.
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "The API answered " + res.status + ". Check the terminal.");
      setCoffees([]);
      return;
    }
    setCoffees(await res.json());
  }

  // Once, when the page opens. After that, the Search button asks again.
  useEffect(() => {
    loadCoffees();
  }, []);

  async function deleteCoffee(coffee: Item) {
    if (!confirm("Delete " + coffee.name + "?")) return;

    setError("");
    const res = await fetch("/api/coffees/" + coffee.id, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "The API answered " + res.status + ". Check the terminal.");
      return;
    }
    loadCoffees();
  }

  return (
    <main>
      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          loadCoffees();
        }}
      >
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Max price"
          size={8}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <p className="asked">Asked: {asked}</p>

      <Link href="/new" className="new">+ New coffee</Link>

      {error && <p className="error">{error}</p>}
      {!error && coffees.length === 0 && <p className="empty">No coffees found.</p>}

      {coffees.map((coffee) => (
        <article key={coffee.id} className="card">
          <h2>
            {coffee.name}
            {!coffee.isAvailable && <span className="sold-out">Sold out</span>}
          </h2>
          {coffee.description && <p className="description">{coffee.description}</p>}
          <p className="price">${coffee.price.toFixed(2)}</p>
          <div className="actions">
            <button type="button" onClick={() => router.push("/edit/" + coffee.id)}>
              Edit
            </button>
            <button type="button" onClick={() => deleteCoffee(coffee)}>
              Delete
            </button>
          </div>
        </article>
      ))}
    </main>
  );
}
