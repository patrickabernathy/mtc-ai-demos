"use client";

import { useState } from "react";
import { Greeting } from "../components/Greeting";
import { Card } from "../components/Card";

export default function Home() {
  const [person, setPerson] = useState("Sam");

  return (
    <main>
      <h1>Props, properly</h1>

      {/* The child cannot reach up. It can only be handed a way to ask. */}
      <Greeting name={person} onRename={setPerson} />

      <p>Back in the parent, person is: {person}</p>

      {/* Composition: put things inside it rather than describing them
          through a long list of props. */}
      <Card>
        <h3>Latte</h3>
        <p>Oat milk &middot; $4.00</p>
        <button type="button">Add</button>
      </Card>
    </main>
  );
}
