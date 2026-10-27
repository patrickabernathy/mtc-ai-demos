"use client";

import { useState } from "react";

// A search box. It sends whatever you type to /api/items/search
// and shows whatever comes back -- including an error, word for word.
export default function Search() {
  const [words, setWords] = useState("");
  const [answer, setAnswer] = useState("");

  async function search(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/items/search?q=" + encodeURIComponent(words));
    const body = await res.json();
    setAnswer(JSON.stringify(body, null, 2));
  }

  return (
    <main>
      <form onSubmit={search} className="card">
        <label>
          Search the menu
          <input value={words} onChange={(e) => setWords(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      <pre className="answer">{answer}</pre>
    </main>
  );
}
